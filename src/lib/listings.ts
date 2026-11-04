import { supabase } from "@/integrations/supabase/client";
import { sinalizarImagensPublicas, signStaffImages } from "@/lib/listings.functions";

export const BALDE = "fotos de imóveis";
export const LISTAGENS_MAXIMAS = 12;

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
};

async function sinalizarCaminhos(caminhos: string[], staff = false): Promise<Record<string, string>> {
  const limpar = caminhos.filter((p) => p && !p.startsWith("http"));
  if (limpar.length === 0) return {};
  try {
    const mapa = staff 
      ? await signStaffImages({ dados: { caminhos: limpar } }) 
      : await sinalizarImagensPublicas({ dados: { caminhos: limpar } });
    if (mapa && Object.keys(mapa).length > 0) return mapa;
  } catch (e) {
    console.warn("Assinatura via função falhou, gerando url pública direta:", e);
  }
  const mapa: Record<string, string> = {};
  for (const c of limpar) {
    const { data } = supabase.storage.from(BALDE).getPublicUrl(c);
    mapa[c] = data.publicUrl;
  }
  return mapa;
}

export async function resolverImagens<T extends { URL_de_imagem?: string | null; imagens?: any; fotos?: any }>(
  linhas: T[],
  staff = false
): Promise<T[]> {
  const todosCaminhos: string[] = [];
  linhas.forEach((r) => {
    if (r.URL_de_imagem && !r.URL_de_imagem.startsWith("http")) todosCaminhos.push(r.URL_de_imagem);
    const lista = Array.isArray(r.imagens) ? r.imagens : Array.isArray(r.fotos) ? r.fotos : [];
    lista.forEach((img: any) => {
      const path = typeof img === "string" ? img : img?.url;
      if (path && !path.startsWith("http")) todosCaminhos.push(path);
    });
  });

  const mapa = await sinalizarCaminhos(todosCaminhos, staff);

  return linhas.map((r) => {
    const getUrl = (p?: string | null) => (!p ? "/placeholder.svg" : p.startsWith("http") ? p : mapa[p] || p);
    const listaCrua = Array.isArray(r.imagens) && r.imagens.length > 0 
      ? r.imagens 
      : Array.isArray(r.fotos) && r.fotos.length > 0 
      ? r.fotos 
      : r.URL_de_imagem ? [r.URL_de_imagem] : [];
      
    const listaResolvida = listaCrua.map((item: any) => getUrl(typeof item === "string" ? item : item?.url));

    return {
      ...r,
      fonte_de_imagem: getUrl(r.URL_de_imagem),
      lista_de_imagens: listaResolvida,
    };
  });
}

export async function buscarListagensPublicadas(): Promise<Anuncio[]> {
  // Busca todas as propriedades aprovadas
  const { data: dados, error: erro } = await supabase
    .from("propriedades")
    .select("*")
    .or("validado.eq.true,aprovado.eq.true,status.eq.Publicado")
    .order("criado_em", { ascending: false })
    .limit(LISTAGENS_MAXIMAS);

  if (erro) {
    console.error("Erro na busca de listagens:", erro);
    // Fallback: se falhar por coluna ausente, busca geral simples
    const { data: fallbackDados } = await supabase.from("propriedades").select("*").limit(LISTAGENS_MAXIMAS);
    if (!fallbackDados) return [];
    return mapearAnuncios(await resolverImagens(fallbackDados));
  }

  return mapearAnuncios(await resolverImagens(dados ?? []));
}

function mapearAnuncios(linhas: any[]): Anuncio[] {
  return linhas.map((r) => {
    const galeria = r.lista_de_imagens && r.lista_de_imagens.length > 0 
      ? r.lista_de_imagens 
      : [r.fonte_de_imagem || "/placeholder.svg"];

    return {
      id: r.id,
      titulo: r.titulo || r.title || "Imóvel Disponível",
      title: r.titulo || r.title || "Imóvel Disponível",
      tipo: r.tipo ?? "Imóvel",
      status: r.status ?? "Venda e Locação",
      preco: r.preco ?? "Sob Consulta",
      price: r.preco ?? "Sob Consulta",
      localizacao: r.localizacao ?? "Consultar",
      imagem: galeria[0],
      image: galeria[0],
      fotos: galeria,
      images: galeria,
      quartos: r.quartos ?? 0,
      banhos: r.banhos ?? r.banheiros ?? 0,
      area: r.area ?? "--",
      descricao: r.descricao ?? "",
    };
  });
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

export async function enviarAnuncio(entrada: EnviarEntrada) {
  const listaArquivos = entrada.arquivos || entrada.files || entrada.fotos || [];
  const caminhos: string[] = [];

  for (const arquivo of listaArquivos.slice(0, 10)) {
    const extensao = arquivo.name.split(".").pop() || "jpg";
    const caminho = `${crypto.randomUUID()}.${extensao}`;
    const { error: erro } = await supabase.storage.from(BALDE).upload(caminho, arquivo, {
      contentType: arquivo.type,
    });
    if (erro) console.error("Erro ao subir foto:", erro);
    else caminhos.push(caminho);
  }

  const { data: sessao } = await supabase.auth.getSession();

  const payload: any = {
    titulo: entrada.titulo.slice(0, 120),
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
    URL_de_imagem: caminhos[0] ?? null,
    imagens: caminhos,
    fotos: caminhos,
    validado: true, // Já salva aprovado para ir direto para a vitrine
    criado_por: sessao?.session?.user?.id ?? null,
  };

  const { error: erro } = await supabase.from("propriedades").insert(payload);
  if (erro) throw erro;
}
