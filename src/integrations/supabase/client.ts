import { createClient } from "@supabase/supabase-js";

// Conexão com o banco de dados do site (Lovable Cloud).
// Usa as variáveis de ambiente quando existem; caso contrário, usa o endereço
// público do projeto como fallback (necessário para hosts externos como Vercel).
export const SUPABASE_URL =
  import.meta.env["VITE_SUPABASE_URL"] || "https://lhncoaaqitzneyazptam.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] || "sb_publishable_yE1Me6bZ8teP5e56H6k08g_GhTiGTIN";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Foto imobiliária padrão caso o imóvel não tenha imagem
export const FOTO_PADRAO =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80";

// API Unificada para Imóveis e Painel do CEO
export const imoveisApi = {
  async buscarAnunciosPublicados() {
    try {
      const { data, error } = await supabase.from("anuncios").select("*").order("created_at", { ascending: false });

      if (error) throw error;
      if (data && data.length > 0) {
        localStorage.setItem("@territorial_anuncios", JSON.stringify(data));
        return data;
      }
      const cache = localStorage.getItem("@territorial_anuncios");
      return cache ? JSON.parse(cache) : [];
    } catch (err) {
      const cache = localStorage.getItem("@territorial_anuncios");
      return cache ? JSON.parse(cache) : [];
    }
  },

  async excluirAnuncio(id: string) {
    try {
      await supabase.from("anuncios").delete().eq("id", id);
      const cache = JSON.parse(localStorage.getItem("@territorial_anuncios") || "[]");
      localStorage.setItem("@territorial_anuncios", JSON.stringify(cache.filter((i: any) => i.id !== id)));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },
};
