import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Acesso do CEO | Territorial Imóveis" },
      { name: "description", content: "Área restrita para gestão e aprovação de anúncios da Territorial Imóveis." },
      { property: "og:title", content: "Acesso do CEO | Territorial Imóveis" },
      { property: "og:description", content: "Área restrita para gestão de anúncios." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const field = "w-full h-12 px-4 rounded-xl bg-white border border-black/10 text-slate-900 outline-none focus:ring-2 focus:ring-[var(--color-accent)]";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMsg("E-mail ou senha incorretos (ou e-mail ainda não confirmado).");
      else navigate({ to: "/painel", replace: true });
    } else {
      const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + "/auth" } });
      setMsg(error ? error.message : "Cadastro feito! Confirme pelo link enviado ao seu e-mail e depois entre.");
    }
    setBusy(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-200">
      <form onSubmit={submit} className="w-full max-w-sm bg-white/70 backdrop-blur rounded-3xl p-8 shadow-xl space-y-4">
        <h1 className="text-2xl font-black uppercase tracking-tighter text-slate-900 text-center">Painel do CEO</h1>
        <p className="text-xs text-center text-slate-500 font-bold uppercase">{mode === "login" ? "Entrar" : "Criar cadastro"}</p>
        <input className={field} type="email" required placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className={field} type="password" required minLength={6} placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
        {msg && <p className="text-sm text-slate-700 font-medium">{msg}</p>}
        <button disabled={busy} className="w-full h-12 rounded-xl bg-slate-900 text-white font-black uppercase tracking-widest hover:bg-[var(--color-accent)] hover:text-slate-900 transition disabled:opacity-60">
          {busy ? "Aguarde..." : mode === "login" ? "Entrar" : "Cadastrar"}
        </button>
        <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")} className="w-full text-xs font-bold text-slate-600 underline">
          {mode === "login" ? "Primeiro acesso? Criar cadastro" : "Já tenho cadastro"}
        </button>
        <Link to="/" className="block text-center text-xs text-slate-500">← Voltar ao site</Link>
      </form>
    </div>
  );
}
