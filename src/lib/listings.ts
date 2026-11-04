import { supabase } from "@/integrations/supabase/client";

export const BALDE = "fotos de imóveis";
export const LISTAGENS_MAXIMAS = 20;

export type Anuncio = {
  id: string;
  titulo: string;
  title?: string;
  tipo: string;
  status: string;
  preco: string;
  price?: string;
  localizacao: string;
  imagem: string;
  image?: string;
  fotos?: string[];
  images?: string[];
  quartos: number;
  banhos: number;
  area: string;
  descricao: string;
  validado?: boolean;
};

// Converte os nomes dos arquivos salvos em links públicos acessíveis
export async function resolverImagens<T extends Record<string, any>>(linhas: T[]): Promise<T[]> {
  return linhas.map((r) => {
    const rawFotos = Array.isArray(r.imagens) && r.imagens.length > 0 
      ? r.imagens 
      : Array.isArray(r.fotos) && r.fotos.length > 0 
      ? r.fotos 
      : r.URL_de_imagem ? [r.URL_de_imagem] : [];

    const listaResolvida = rawFotos.map((caminho: any) => {
      const p = typeof caminho === "string" ? caminho : caminho?.url;
      if (!p) return "/placeholder.svg";
      if (p.startsWith("http")) return p;
      const { data } = supabase.storage.from(BALDE).getPublicUrl(p);
      return data.publicUrl;
    });

    const fotoCapa = listaResolvida[0] || (r.URL_de_imagem?.startsWith("http") ? r.URL_de_imagem : "/placeholder.svg");

    return {
      ...r,
      fonte_de_imagem: fotoCapa,
      lista_de_imagens: listaResolvida.length > 0 ? listaResolvida : [fotoCapa],
    };
  });
}

// Busca todos os imóveis aprovados para exibir na vitrine inicial
export async function buscarListagensPublicadas(): Promise<Anuncio[]> {
  try {
    const { data: dados, error } = await supabase
      .from("propriedades")
      .select("*")
      .order("criado_em", { ascending: false })
      .limit(LISTAGENS_MAXIMAS);

    if (error) throw error;
    if (!dados || dados.length === 0) return [];

    const dadosComImagens = await resolverImagens(dados);

    return dadosComImagens.map((r: any) => {
      const galeria = r.lista_de_imagens && r.lista_de_imagens.length > 0 
        ? r.lista_de_imagens 
        : [r.fonte_de_imagem || "/placeholder.svg"];

      return {
        id: String(r.id),
        titulo: r.titulo || r.title || "Imóvel Disponível",
        title: r.titulo || r.title || "Imóvel Disponível",
        tipo: r.tipo || "Imóvel",
        status: r.status || "Venda e Locação",
        preco: r.preco || "Sob Consulta",
        price: r.preco || "Sob Consulta",
        localizacao: r.localizacao || r.bairro || "Consultar",
        imagem: galeria[0],
        image: galeria[0],
        fotos: galeria,
        images: galeria,
        quartos: Number(r.quartos || 0),
        banhos: Number(r.banhos || r.banheiros || 0),
        area: String(r.area || "--"),
        descricao: r.descricao || "",
        validado: r.validado ?? true,
      };
    });
  } catch (err) {
    console.error("Erro ao carregar anúncios:", err);
    return [];
  }
}

export type EnviarEntrada = {
  nome_do_proprietario: string;
  telefone_do_proprietário: string;
  titulo: string;
  tipo: string;
  localizacao: string;
  area?: string;
  quartos?: number;
  banhos?: number;
  documentacao?: string;
  preco?: string;
  descricao?: string;
  arquivos?: File[];
  files?: File[];
  fotos?: File[];
};

// Faz o upload das fotos selecionadas e grava o anúncio já com as URLs
export async function enviarAnuncio(entrada: EnviarEntrada) {
  const listaArquivos = entrada.arquivos || entrada.files || entrada.fotos || [];
  const caminhos: string[] = [];

  for (const arquivo of listaArquivos.slice(0, 10)) {
    const extensao = arquivo.name.split(".").pop() || "jpg";
    const nomeUnico = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${extensao}`;
    
    const { error: uploadErro } = await supabase.storage
      .from(BALDE)
      .upload(nomeUnico, arquivo, {
        contentType: arquivo.type,
        upsert: true,
      });

    if (uploadErro) {
      console.error("Falha ao subir imagem:", uploadErro);
    } else {
      caminhos.push(nomeUnico);
    }
  }

  const { data: authData } = await supabase.auth.getSession();

  const payload: any = {
    titulo: entrada.titulo,
    tipo: entrada.tipo,
    status: "Venda e Locação",
    localizacao: entrada.localizacao,
    area: entrada.area,
    quartos: entrada.quartos,
    banhos: entrada.banhos,
    preco: entrada.preco || "Sob Consulta",
    documentacao: entrada.documentacao,
    descricao: entrada.descricao,
    nome_do_proprietario: entrada.nome_do_proprietario,
    telefone_do_proprietário: entrada.telefone_do_proprietário,
    URL_de_imagem: caminhos[0] || null,
    imagens: caminhos,
    fotos: caminhos,
    validado: true,
    criado_por: authData?.session?.user?.id || null,
  };

  const { error: insertErro } = await supabase.from("propriedades").insert(payload);
  if (insertErro) throw insertErro;
}
