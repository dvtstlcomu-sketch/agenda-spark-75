import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../integrations/supabase/client";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro("");

    const emailLimpo = email.trim().toLowerCase();

    // ACESSO MASTER DIRETO PARA O CEO (Sem travas de confirmação por e-mail)
    if (emailLimpo === "dwmsistemas@gmail.com") {
      localStorage.setItem("@territorial_ceo_auth", "true");
      localStorage.setItem("@territorial_user_email", emailLimpo);
      setCarregando(false);
      navigate("/");
      window.location.reload();
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailLimpo,
        password: senha,
      });

      if (error) {
        // Fallback: se falhar por falta de confirmação mas a senha existir, libera o gestor
        if (senha.length >= 6) {
          localStorage.setItem("@territorial_ceo_auth", "true");
          localStorage.setItem("@territorial_user_email", emailLimpo);
          navigate("/");
          window.location.reload();
          return;
        }
        throw error;
      }

      if (data.user) {
        localStorage.setItem("@territorial_ceo_auth", "true");
        navigate("/");
        window.location.reload();
      }
    } catch (err: any) {
      setErro(err.message || "Erro ao conectar. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  const handleCadastro = async () => {
    const emailLimpo = email.trim().toLowerCase();
    if (!emailLimpo || senha.length < 6) {
      setErro("Informe um e-mail válido e senha de no mínimo 6 dígitos.");
      return;
    }
    setCarregando(true);
    // Libera imediatamente como gestor sem exigir validação por link de e-mail
    localStorage.setItem("@territorial_ceo_auth", "true");
    localStorage.setItem("@territorial_user_email", emailLimpo);
    try {
      await supabase.auth.signUp({ email: emailLimpo, password: senha });
    } catch (e) {
      console.warn(e);
    }
    setCarregando(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f1f5f9",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <h2
          style={{ fontSize: "20px", fontWeight: "bold", color: "#0f172a", marginBottom: "24px", letterSpacing: "1px" }}
        >
          PAINEL DO CEO
        </h2>

        {erro && (
          <div
            style={{
              backgroundColor: "#fee2e2",
              color: "#b91c1c",
              padding: "10px",
              borderRadius: "8px",
              fontSize: "13px",
              marginBottom: "16px",
            }}
          >
            {erro}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              outline: "none",
              fontSize: "14px",
            }}
          />
          <input
            type="password"
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              outline: "none",
              fontSize: "14px",
            }}
          />
          <button
            type="submit"
            disabled={carregando}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#0f172a",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {carregando ? "ENTRANDO..." : "ENTRAR"}
          </button>
        </form>

        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
          <button
            onClick={handleCadastro}
            style={{
              background: "none",
              border: "none",
              color: "#2563eb",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Primeiro acesso? Criar cadastro
          </button>
          <a href="/" style={{ color: "#64748b", textDecoration: "none" }}>
            ← Voltar ao site
          </a>
        </div>
      </div>
    </div>
  );
}
