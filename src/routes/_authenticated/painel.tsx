import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { resolveImages, BUCKET } from "@/lib/listings";
import { listManagers, createManager, removeManager } from "@/lib/managers.functions";

export const Route = createFileRoute("/_authenticated/painel")({
  head: () => ({
    meta: [
      { title: "Painel do Gestor | Territorial Imóveis" },
      { name: "description", content: "Aprovação, respostas e gestão dos anúncios enviados." },
      { property: "og:title", content: "Painel do Gestor | Territorial Imóveis" },
      { property: "og:description", content: "Aprovação, respostas e gestão dos anúncios enviados." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Painel,
});

type Filter = "pending" | "published" | "all" | "contacts";

const COMPANY_WA = "551124050300";

function waLink(phone: string | null, text: string) {
  let d = (phone ?? "").replace(/\D/g, "");
  if (!d) return null;
  if (d.length <= 11) d = "55" + d;
  return `https://wa.me/${d}?text=${encodeURIComponent(text)}`;
}

function Painel() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>("pending");
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [savedId, setSavedId] = useState<string | null>(null);

  const { data: role, isLoading: loadingRole } = useQuery({
    queryKey: ["my-role"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      const id = u.user!.id;
      const [{ data: a }, { data: m }] = await Promise.all([
        supabase.rpc("has_role", { _user_id: id, _role: "admin" }),
        supabase.rpc("has_role", { _user_id: id, _role: "moderator" }),
      ]);
      return a ? "admin" : m ? "moderator" : null;
    },
  });

  const { data: rows, isLoading } = useQuery({
    queryKey: ["admin-properties"],
    enabled: !!role,
    queryFn: async () => {
      const { data, error } = await supabase.from("properties").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return resolveImages(data ?? []);
    },
  });

  function refresh() {
    qc.invalidateQueries({ queryKey: ["admin-properties"] });
    qc.invalidateQueries({ queryKey: ["listings"] });
  }

  async function setValidated(id: string, validated: boolean) {
    await supabase.from("properties").update({ validated }).eq("id", id);
    refresh();
  }

  async function remove(id: string, paths: string[]) {
    if (!confirm("Excluir este anúncio definitivamente? Esta ação não pode ser desfeita.")) return;
    if (paths.length) await supabase.storage.from(BUCKET).remove(paths);
    await supabase.from("properties").delete().eq("id", id);
    refresh();
  }

  async function saveReply(id: string, text: string) {
    await supabase.from("properties").update({ manager_reply: text, replied_at: new Date().toISOString() }).eq("id", id);
    setSavedId(id);
    setTimeout(() => setSavedId(null), 2500);
    refresh();
  }

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const pending = rows?.filter((r) => !r.validated).length ?? 0;
  const published = rows?.filter((r) => r.validated).length ?? 0;
  const shown = rows?.filter((r) => (filter === "all" ? true : filter === "pending" ? !r.validated : r.validated)) ?? [];

  return (
    <div className="min-h-screen bg-slate-200 p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-slate-900">
              {role === "admin" ? "Painel do CEO" : "Painel do Gestor"}
            </h1>
            <p className="text-sm text-slate-600 font-medium">O site mostra os 6 anúncios aprovados mais recentes.</p>
          </div>
          <div className="flex gap-2">
            <a href="/" className="px-4 h-11 flex items-center rounded-xl bg-white font-bold text-sm">Ver site</a>
            <button onClick={signOut} className="px-4 h-11 rounded-xl bg-slate-900 text-white font-bold text-sm">Sair</button>
          </div>
        </div>

        {loadingRole ? (
          <p className="text-slate-600">Carregando...</p>
        ) : !role ? (
          <p className="bg-white rounded-2xl p-6 font-bold text-slate-700">Sua conta não tem permissão de acesso ao painel.</p>
        ) : (
          <>
            {role === "admin" && <ManagersBox />}

            <div className="flex flex-wrap gap-2 mb-4">
              {([
                ["pending", `Aguardando aprovação (${pending})`],
                ["published", `Publicados (${published})`],
                ["all", `Todos (${rows?.length ?? 0})`],
                ["contacts", `Contatos / CRM (${rows?.length ?? 0})`],
              ] as [Filter, string][]).map(([k, label]) => (
                <button
                  key={k}
                  onClick={() => setFilter(k)}
                  className={`px-4 h-10 rounded-xl font-bold text-sm ${filter === k ? "bg-slate-900 text-white" : "bg-white text-slate-700"}`}
                >
                  {label}
                </button>
              ))}
            </div>

            {filter === "contacts" ? (
              isLoading ? (
                <p className="text-slate-600">Carregando contatos...</p>
              ) : (rows?.length ?? 0) === 0 ? (
                <p className="bg-white rounded-2xl p-6 text-slate-700">Nenhum contato ainda.</p>
              ) : (
                <div className="grid gap-3">
                  {rows!.map((r) => {
                    const wa = waLink(r.owner_phone, `Olá ${r.owner_name ?? ""}, aqui é da Territorial Imóveis sobre o seu anúncio "${r.title}".`);
                    return (
                      <div key={r.id} className="bg-white/80 rounded-2xl p-4 shadow flex flex-col md:flex-row md:items-center gap-3">
                        <div className="flex-1 min-w-0 text-sm text-slate-700">
                          <p className="font-black text-slate-900 text-lg break-words">{r.owner_name ?? "Sem nome"}</p>
                          <p>{r.owner_phone ?? "Sem telefone"}</p>
                          <p className="text-slate-500">Anúncio: {r.title} · {r.location}</p>
                          <p className="text-xs text-slate-400">
                            {r.created_at ? new Date(r.created_at).toLocaleString("pt-BR") : ""} ·{" "}
                            {r.validated ? "Publicado" : "Aguardando aprovação"} ·{" "}
                            {r.replied_at ? `Respondido em ${new Date(r.replied_at).toLocaleString("pt-BR")}` : "Ainda não respondido"}
                          </p>
                        </div>
                        <div className="flex gap-2 shrink-0 flex-wrap">
                          {wa && (
                            <a href={wa} target="_blank" rel="noreferrer" className="px-4 h-10 flex items-center rounded-xl bg-green-600 text-white font-bold text-sm">Chamar no WhatsApp</a>
                          )}
                          <button onClick={() => setFilter("all")} className="px-4 h-10 rounded-xl bg-slate-900 text-white font-bold text-sm">Ver anúncio</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            ) : isLoading ? (
              <p className="text-slate-600">Carregando anúncios...</p>
            ) : shown.length === 0 ? (
              <p className="bg-white rounded-2xl p-6 text-slate-700">Nenhum anúncio nesta lista.</p>
            ) : (
              <div className="grid gap-4">
                {shown.map((r) => {
                  const reply = drafts[r.id] ?? r.manager_reply ?? "";
                  const wa = waLink(r.owner_phone, `Olá ${r.owner_name ?? ""}, aqui é da Territorial Imóveis sobre o seu anúncio "${r.title}":\n\n${reply}`);
                  return (
                    <div key={r.id} className="bg-white/80 rounded-2xl p-4 flex flex-col md:flex-row gap-4 shadow">
                      <div className="flex gap-2 overflow-x-auto md:w-72 shrink-0">
                        {(r.imageSrcs.length ? r.imageSrcs : [r.imageSrc]).filter(Boolean).map((src, i) => (
                          <a key={i} href={src} target="_blank" rel="noreferrer"><img src={src} alt="" className="w-24 h-24 object-cover rounded-lg shrink-0" /></a>
                        ))}
                      </div>
                      <div className="flex-1 min-w-0 text-sm text-slate-700 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="font-black text-slate-900 text-lg break-words">{r.title}</h2>
                          <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${r.validated ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                            {r.validated ? "Publicado" : "Aguardando aprovação"}
                          </span>
                        </div>
                        <p>{r.type} · {r.location} · {r.area ?? "-"} · {r.beds ?? 0} qto · {r.baths ?? 0} banh · {r.price}</p>
                        <p>Documentação: {r.documentation ?? "-"}</p>
                        <p>Anunciante: {r.owner_name ?? "-"} · {r.owner_phone ?? "-"}</p>
                        <p className="text-slate-500">{r.description}</p>
                        <p className="text-xs text-slate-400">{r.created_at ? new Date(r.created_at).toLocaleString("pt-BR") : ""}</p>

                        <div className="pt-3">
                          <label className="text-xs font-black uppercase text-slate-500">Resposta ao anunciante</label>
                          <textarea
                            value={reply}
                            onChange={(e) => setDrafts((d) => ({ ...d, [r.id]: e.target.value }))}
                            rows={3}
                            placeholder="Ex.: Seu anúncio foi aprovado! / Precisamos de fotos melhores da cozinha..."
                            className="w-full mt-1 rounded-xl border border-slate-300 bg-white p-3 text-sm"
                          />
                          <div className="flex flex-wrap gap-2 mt-2 items-center">
                            <button onClick={() => saveReply(r.id, reply)} disabled={!reply.trim()} className="px-4 h-10 rounded-xl bg-slate-900 text-white font-bold text-sm disabled:opacity-40">Salvar resposta</button>
                            {wa && reply.trim() && (
                              <a href={wa} target="_blank" rel="noreferrer" onClick={() => saveReply(r.id, reply)} className="px-4 h-10 flex items-center rounded-xl bg-green-600 text-white font-bold text-sm">Enviar pelo WhatsApp</a>
                            )}
                            {savedId === r.id && <span className="text-green-700 font-bold text-xs">Resposta salva ✓</span>}
                            {r.replied_at && savedId !== r.id && <span className="text-xs text-slate-400">Última resposta: {new Date(r.replied_at).toLocaleString("pt-BR")}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex md:flex-col gap-2 shrink-0 flex-wrap">
                        {r.validated ? (
                          <button onClick={() => setValidated(r.id, false)} className="px-4 h-10 rounded-xl bg-amber-500 text-white font-bold text-sm">Ocultar do site</button>
                        ) : (
                          <>
                            <button onClick={() => setValidated(r.id, true)} className="px-4 h-10 rounded-xl bg-green-600 text-white font-bold text-sm">Aprovar e publicar</button>
                            <a
                              href={`https://wa.me/${COMPANY_WA}?text=${encodeURIComponent(`Novo anúncio aguardando aprovação no painel:\n\n"${r.title}" — ${r.type} em ${r.location}\nAnunciante: ${r.owner_name ?? "-"} (${r.owner_phone ?? "-"})\nValor: ${r.price ?? "Sob consulta"}`)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-4 h-10 flex items-center rounded-xl bg-[#25D366] text-white font-bold text-sm"
                            >
                              Avisar no WhatsApp
                            </a>
                          </>
                        )}
                        <button onClick={() => remove(r.id, (r.images?.length ? r.images : [r.image_url]).filter((p): p is string => !!p && !p.startsWith("http")))} className="px-4 h-10 rounded-xl bg-red-600 text-white font-bold text-sm">Excluir</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ManagersBox() {
  const list = useServerFn(listManagers);
  const create = useServerFn(createManager);
  const del = useServerFn(removeManager);
  const qc = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const { data: managers } = useQuery({ queryKey: ["managers"], queryFn: () => list() });

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      await create({ data: { email, password } });
      setMsg({ ok: true, text: `Gestor ${email} cadastrado. Ele já pode entrar em "Acesso CEO" no rodapé do site.` });
      setEmail("");
      setPassword("");
      qc.invalidateQueries({ queryKey: ["managers"] });
    } catch (err) {
      setMsg({ ok: false, text: err instanceof Error ? err.message : "Erro ao cadastrar." });
    } finally {
      setBusy(false);
    }
  }

  async function onRemove(id: string, mail: string) {
    if (!confirm(`Remover o acesso de ${mail}?`)) return;
    await del({ data: { id } });
    qc.invalidateQueries({ queryKey: ["managers"] });
  }

  return (
    <div className="bg-white/80 rounded-2xl p-4 md:p-6 shadow mb-6">
      <h2 className="font-black uppercase text-slate-900 mb-3">Gestores com acesso</h2>
      <form onSubmit={onCreate} className="flex flex-col md:flex-row gap-2">
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email do gestor" className="flex-1 h-11 rounded-xl border border-slate-300 px-3 text-sm" />
        <input type="text" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha (mín. 8 caracteres)" className="flex-1 h-11 rounded-xl border border-slate-300 px-3 text-sm" />
        <button disabled={busy} className="px-5 h-11 rounded-xl bg-slate-900 text-white font-bold text-sm disabled:opacity-50">{busy ? "Cadastrando..." : "Cadastrar gestor"}</button>
      </form>
      {msg && <p className={`mt-2 text-sm font-bold ${msg.ok ? "text-green-700" : "text-red-600"}`}>{msg.text}</p>}
      <ul className="mt-4 divide-y divide-slate-200">
        {managers?.length === 0 && <li className="py-2 text-sm text-slate-500">Nenhum gestor cadastrado ainda.</li>}
        {managers?.map((m) => (
          <li key={m.id} className="py-2 flex items-center justify-between gap-2 text-sm">
            <span className="break-all">{m.email}</span>
            <button onClick={() => onRemove(m.id, m.email)} className="px-3 h-9 rounded-lg bg-red-100 text-red-700 font-bold text-xs">Remover acesso</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
