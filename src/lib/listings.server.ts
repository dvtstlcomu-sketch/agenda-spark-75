import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const BUCKET = "property-photos";
const TTL = 60 * 60 * 24 * 7; // 7 dias

async function signPaths(paths: string[]): Promise<Record<string, string>> {
  // Assinatura de URLs é operação privilegiada: o armazenamento é privado e
  // nenhuma policy de leitura é aberta ao público.
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin.storage.from(BUCKET).createSignedUrls(paths, TTL);
  const map: Record<string, string> = {};
  data?.forEach((d) => {
    if (d.path && d.signedUrl) map[d.path] = d.signedUrl;
  });
  return map;
}

function sanitizePaths(input: { paths?: unknown }) {
  const paths = Array.isArray(input?.paths)
    ? (input!.paths as unknown[]).filter((p): p is string => typeof p === "string" && p.length > 0 && !p.startsWith("http"))
    : [];
  return { paths: [...new Set(paths)].slice(0, 120) };
}

/**
 * Público: assina apenas fotos que pertencem a anúncios já aprovados.
 * A leitura usa o client publishable, então o RLS limita às linhas validadas.
 */
export const signPublicImages = createServerFn({ method: "POST" })
  .inputValidator(sanitizePaths)
  .handler(async ({ data }) => {
    const { paths } = data;
    if (!paths.length) return {};
    const { createClient } = await import("@supabase/supabase-js");
    const url = process.env['SUPABASE_URL'];
    const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
    if (!url || !key) throw new Error("Configuração do servidor ausente.");
    const client = createClient(url, key, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    });
    const { data: rows } = await client.from("properties").select("image_url, images").eq("validated", true);
    const allowed = new Set(
      (rows ?? []).flatMap((r) => [r.image_url, ...(r.images ?? [])]).filter((p): p is string => !!p),
    );
    const wanted = paths.filter((p) => allowed.has(p));
    if (!wanted.length) return {};
    return signPaths(wanted);
  });

/**
 * Equipe (CEO/gestor): assina fotos de qualquer anúncio, inclusive pendentes.
 */
export const signStaffImages = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(sanitizePaths)
  .handler(async ({ data, context }) => {
    const { paths } = data;
    if (!paths.length) return {};
    const { data: staff } = await context.supabase.rpc("is_staff", { _user_id: context.userId });
    if (!staff) throw new Error("Acesso restrito à equipe.");
    return signPaths(paths);
  });
