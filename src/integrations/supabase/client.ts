import { createClient } from "@supabase/supabase-js";

// 1. CREDENCIAIS DIRETAS DO SEU SUPABASE (Elimina a dependência de variáveis da Vercel/Lovable)
const SUPABASE_URL = import.meta.env?.["VITE_SUPABASE_URL"] || "https://lhncoaaqitzneyazptam.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env?.["VITE_SUPABASE_PUBLISHABLE_KEY"] || "sb_publishable_yE1Me6bZ8teP5e56H6k08g_GhTiGTIN";

// 2. INSTÂNCIA PRINCIPAL RESILIENTE (Sem throw new Error)
export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Foto padrão caso o link do Storage falhe ou a imagem seja nula
export const FOTO_PADRAO =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80";

// 3. FUNÇÕES AUXILIARES UNIFICADAS PARA ANÚNCIOS E IMAGENS
export const imoveisApi = {
  // Buscar anúncios ativos para a vitrine do site
  async buscarAnunciosPublicados() {
    try {
      const { data, error } = await supabase.from("anuncios").select("*").order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.warn("Aviso ao carregar vitrine, verificando cache:", err);
      const cache = localStorage.getItem("@territorial_anuncios");
      return cache ? JSON.parse(cache) : [];
    }
  },

  // Salvar novo anúncio com foto (com contingência em Base64 caso o Storage falhe)
  async criarAnuncio(dados: any, arquivosFotos: File[] = []) {
    try {
      let fotosUrls: string[] = [];

      // Tenta upload no Storage
      if (arquivosFotos.length > 0) {
        for (const file of arquivosFotos) {
          const nomeArquivo = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from("imoveis-imagens")
            .upload(nomeArquivo, file);

          if (!uploadError && uploadData) {
            const { data: urlData } = supabase.storage.from("imoveis-imagens").getPublicUrl(nomeArquivo);
            fotosUrls.push(urlData.publicUrl);
          } else {
            // Fallback: se o bucket falhar, converte para Base64 persistente
            const base64 = await new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(file);
            });
            fotosUrls.push(base64);
          }
        }
      }

      const fotoPrincipal = fotosUrls[0] || dados.imagem_url || FOTO_PADRAO;

      const payload = {
        ...dados,
        imagens: fotosUrls.length > 0 ? fotosUrls : [fotoPrincipal],
        imagem_url: fotoPrincipal,
        status: dados.status || "ativo",
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase.from("anuncios").insert([payload]).select();
      if (error) throw error;

      // Atualiza cópia local de segurança
      const cacheAtual = JSON.parse(localStorage.getItem("@territorial_anuncios") || "[]");
      localStorage.setItem("@territorial_anuncios", JSON.stringify([payload, ...cacheAtual]));

      return { success: true, data };
    } catch (err: any) {
      console.error("Erro ao salvar anúncio:", err);
      return { success: false, error: err.message };
    }
  },

  // Excluir anúncio pelo Painel do CEO
  async excluirAnuncio(id: string) {
    try {
      const { error } = await supabase.from("anuncios").delete().eq("id", id);
      if (error) throw error;

      const cache = JSON.parse(localStorage.getItem("@territorial_anuncios") || "[]");
      localStorage.setItem("@territorial_anuncios", JSON.stringify(cache.filter((item: any) => item.id !== id)));

      return { success: true };
    } catch (err: any) {
      console.error("Erro ao excluir anúncio:", err);
      return { success: false, error: err.message };
    }
  },
};
