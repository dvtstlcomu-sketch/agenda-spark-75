import { supabase } from "@/integrations/supabase/client";
import { signPublicImages, signStaffImages } from "@/lib/listings.functions";

export const BUCKET = "property-photos";
export const MAX_LISTINGS = 6;

export type Listing = {
  id: string;
  title: string;
  type: string;
  status: string;
  price: string;
  location: string;
  image: string;
  beds: number;
  baths: number;
  area: string;
  description: string;
};

async function signPaths(paths: string[], staff = false): Promise<Record<string, string>> {
  // O bucket é privado: ninguém baixa fotos direto pelo Storage.
  // Os links temporários são gerados no servidor (verificado e limitado lá).
  const clean = paths.filter((p): p is string => !!p && !p.startsWith("http"));
  if (!clean.length) return {};
  try {
    const map = staff ? await signStaffImages({ data: { paths: clean } }) : await signPublicImages({ data: { paths: clean } });
    if (Object.keys(map).length) return map;
  } catch (e) {
    console.warn("Assinatura no servidor falhou, usando o navegador", e);
  }
  // Fallback (ex.: Vercel sem chave do servidor): o RLS só libera fotos de
  // anúncios aprovados ao público, e qualquer foto à equipe.
  const { data } = await supabase.storage.from(BUCKET).createSignedUrls(clean, 60 * 60 * 24 * 7);
  const map: Record<string, string> = {};
  data?.forEach((d) => { if (d.path && d.signedUrl) map[d.path] = d.signedUrl; });
  return map;
}

export async function resolveImages<T extends { image_url: string | null; images: string[] | null }>(rows: T[], staff = false) {
  const paths = rows.flatMap((r) => [r.image_url, ...(r.images ?? [])]).filter((p): p is string => !!p && !p.startsWith("http"));
  const map = await signPaths([...new Set(paths)], staff);
  const url = (p: string | null) => (p ? (p.startsWith("http") ? p : map[p] ?? "") : "");
  return rows.map((r) => ({ ...r, imageSrc: url(r.image_url), imageSrcs: [...new Set([r.image_url, ...(r.images ?? [])])].map(url).filter(Boolean) }));
}

const { dados, erro } = await supabase
  .de("propriedades")
  .selecionar("*")
  if (error) throw error;
  const rows = await resolveImages(data ?? []);
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    type: r.type ?? "Imóvel",
    status: r.status ?? "Venda e Locação",
    price: r.price ?? "Sob Consulta",
return linhas.map((r) => ({
      id: r.id,
      titulo: r.titulo,
      title: r.titulo,
      tipo: r.tipo ?? "Imóvel",
      status: r.status ?? "Venda e Locação",
      preco: r.preco ?? "Sob Consulta",
      price: r.preco ?? "Sob Consulta",
      localizacao: r.localizacao ?? "Consultar",
      imagem: r.fonte_de_imagem || r.URL_de_imagem || "/placeholder.svg",
      image: r.fonte_de_imagem || r.URL_de_imagem || "/placeholder.svg",
      fotos: (Array.isArray(r.imagens) && r.imagens.length > 0 ? r.imagens : null) ||
             (Array.isArray(r.fotos) && r.fotos.length > 0 ? r.fotos : null) ||
             (r.URL_de_imagem ? [r.URL_de_imagem] : []),
      images: (Array.isArray(r.imagens) && r.imagens.length > 0 ? r.imagens : null) ||
              (Array.isArray(r.fotos) && r.fotos.length > 0 ? r.fotos : null) ||
              (r.URL_de_imagem ? [r.URL_de_imagem] : []),
      quartos: r.quartos ?? 0,
      banheiros: r.banhos ?? 0,
      area: r.area ?? "--",
      descricao: r.descricao ?? "",
    }));
  type: string;
  location: string;
  area: string;
  beds: number;
  baths: number;
  price: string;
  documentation: string;
  description: string;
  files: File[];
};

export async function submitListing(input: SubmitInput) {
  const paths: string[] = [];
  for (const file of input.files.slice(0, 10)) {
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, { contentType: file.type });
    if (error) throw error;
    paths.push(path);
  }
  const { data: sess } = await supabase.auth.getSession();
  const { error } = await supabase.from("properties").insert({
    title: input.title.slice(0, 120),
    type: input.type,
    status: "Venda e Locação",
   URL_de_imagem: caminhos[0] ?? null,
      imagens: caminhos,
      fotos: caminhos,hs ? `, ${input.baths} banheiro(s)` : ""}. ${input.documentation}.`,
    owner_name: input.ownerName,
    owner_phone: input.ownerPhone,
    image_url: paths[0] ?? null,
    images: paths,
    created_by: sess.session?.user.id ?? null,
  });
  if (error) throw error;
}
