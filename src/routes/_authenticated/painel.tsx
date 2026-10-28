import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { resolveImages, BUCKET } from "@/lib/listings";

export const Route = createFileRoute("/_authenticated/painel")({
  head: () => ({
    meta: [
      { title: "Painel do CEO | Territorial Imóveis" },
      { name: "description", content: "Aprovação e gestão dos anúncios enviados." },
      { property: "og:title", content: "Painel do CEO | Territorial Imóveis" },
      { property: "og:description", content: "Aprovação e gestão dos anúncios enviados." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Painel,
});

function Painel() {
  const qc = useQueryClient();
  const navigate = useNavigate();

  const { data: isAdmin, isLoading: loadingRole } = useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      const { data } = await supabase.rpc("has_role", { _user_id: u.user!.id, _role: "admin" });
      return !!data;
    },
  });

  const { data: rows, isLoading } = useQuery({
    queryKey: ["admin-properties"],
    enabled: !!isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase.from("properties").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return resolveImages(data ?? []);
    },
  });

  async function setValidated(id: string, validated: boolean) {
    await supabase.from("properties").update({ validated }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin-properties"] });
    qc.invalidateQueries({ queryKey: ["listings"] });
  }

  async function remove(id: string, paths: string[]) {
    if (!confirm("Excluir este anúncio definitivamente?")) return;
    if (paths.length) await supabase.storage.from(BUCKET).remove(paths);
    await supabase.from("properties").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin-properties"] });
    qc.invalidateQueries({ queryKey: ["listings"] });
  }

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const pending = rows?.filter((r) => !r.validated).length ?? 0;

  return (
    <div className="min-h-screen bg-slate-200 p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-slate-900">Painel do CEO</h1>
            <p className="text-sm text-slate-600 font-medium">
              {rows ? `${rows.length} anúncio(s) · ${pending} oculto(s)` : ""} · O site mostra os 6 mais recentes publicados.
            </p>
          </div>
          <div className="flex gap-2">
            <a href="/" className="px-4 h-11 flex items-center rounded-xl bg-white font-bold text-sm">Ver site</a>
            <button onClick={signOut} className="px-4 h-11 rounded-xl bg-slate-900 text-white font-bold text-sm">Sair</button>
          </div>
        </div>

        {loadingRole || isLoading ? (
          <p className="text-slate-600">Carregando...</p>
        ) : !isAdmin ? (
          <p className="bg-white rounded-2xl p-6 font-bold text-slate-700">Sua conta não tem permissão de administrador.</p>
        ) : rows?.length === 0 ? (
          <p className="bg-white rounded-2xl p-6 text-slate-700">Nenhum anúncio enviado ainda.</p>
        ) : (
          <div className="grid gap-4">
            {rows?.map((r) => (
              <div key={r.id} className="bg-white/80 rounded-2xl p-4 flex flex-col md:flex-row gap-4 shadow">
                <div className="flex gap-2 overflow-x-auto md:w-72 shrink-0">
                  {(r.imageSrcs.length ? r.imageSrcs : [r.imageSrc]).filter(Boolean).map((src, i) => (
                    <a key={i} href={src} target="_blank" rel="noreferrer"><img src={src} alt="" className="w-24 h-24 object-cover rounded-lg shrink-0" /></a>
                  ))}
                </div>
                <div className="flex-1 min-w-0 text-sm text-slate-700 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-black text-slate-900 text-lg">{r.title}</h2>
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${r.validated ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                      {r.validated ? "Publicado" : "Oculto"}
                    </span>
                  </div>
                  <p>{r.type} · {r.location} · {r.area ?? "-"} · {r.beds ?? 0} qto · {r.baths ?? 0} banh · {r.price}</p>
                  <p>Documentação: {r.documentation ?? "-"}</p>
                  <p>Proprietário: {r.owner_name ?? "-"} · {r.owner_phone ?? "-"}</p>
                  <p className="text-slate-500">{r.description}</p>
                  <p className="text-xs text-slate-400">{r.created_at ? new Date(r.created_at).toLocaleString("pt-BR") : ""}</p>
                </div>
                <div className="flex md:flex-col gap-2 shrink-0">
                  {r.validated ? (
                    <button onClick={() => setValidated(r.id, false)} className="px-4 h-10 rounded-xl bg-amber-500 text-white font-bold text-sm">Reprovar / Ocultar</button>
                  ) : (
                    <button onClick={() => setValidated(r.id, true)} className="px-4 h-10 rounded-xl bg-green-600 text-white font-bold text-sm">Aprovar</button>
                  )}
                  <button onClick={() => remove(r.id, (r.images?.length ? r.images : [r.image_url]).filter((p): p is string => !!p && !p.startsWith("http")))} className="px-4 h-10 rounded-xl bg-red-600 text-white font-bold text-sm">Excluir</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
