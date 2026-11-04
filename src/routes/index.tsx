import React, { useEffect, useState } from "react";
import { buscarListagensPublicadas, Anuncio } from "@/lib/listings";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Bed, Bath, Maximize } from "lucide-react";

export default function IndexPage() {
  const [imoveis, setImoveis] = useState<Anuncio[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [busca, setBusca] = useState<string>("");
  const [tipoFiltro, setTipoFiltro] = useState<string>("todos");
  const [operacaoFiltro, setOperacaoFiltro] = useState<string>("todos");

  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true);
        const lista = await buscarListagensPublicadas();
        setImoveis(lista);
      } catch (e) {
        console.error("Erro ao carregar vitrine:", e);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  // Filtro inteligente para nunca ocultar imóveis indevidamente
  const imoveisFiltrados = imoveis.filter((item) => {
    const textoMatch = busca.trim() === "" || 
      item.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      item.localizacao.toLowerCase().includes(busca.toLowerCase());

    const tipoMatch = tipoFiltro === "todos" || 
      tipoFiltro === "Residencial" || 
      item.tipo.toLowerCase() === tipoFiltro.toLowerCase();

    const operacaoMatch = operacaoFiltro === "todos" || 
      operacaoFiltro === "Compra" || 
      item.status.toLowerCase().includes("venda");

    return textoMatch && tipoMatch && operacaoMatch;
  });

  return (
    <div className="w-full flex flex-col items-center">
      {/* Barra de Filtros e Pesquisa */}
      <div className="w-full max-w-5xl px-4 py-8">
        <div className="bg-white p-4 rounded-xl shadow-md border flex flex-col md:flex-row gap-3 items-center">
          <Input
            placeholder="Pesquisar por bairro, cidade ou título..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="flex-1"
          />

          <Select value={tipoFiltro} onValueChange={setTipoFiltro}>
            <SelectTrigger className="w-full md:w-44">
              <SelectValue placeholder="Tipo de imóvel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os tipos</SelectItem>
              <SelectItem value="Residencial">Residencial</SelectItem>
              <SelectItem value="Casa">Casa</SelectItem>
              <SelectItem value="Chácara">Chácara</SelectItem>
              <SelectItem value="Apartamento">Apartamento</SelectItem>
              <SelectItem value="Terreno">Terreno</SelectItem>
            </SelectContent>
          </Select>

          <Select value={operacaoFiltro} onValueChange={setOperacaoFiltro}>
            <SelectTrigger className="w-full md:w-44">
              <SelectValue placeholder="Finalidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todas finalidades</SelectItem>
              <SelectItem value="Compra">Comprar</SelectItem>
              <SelectItem value="Locação">Alugar</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid de Imóveis ou Mensagem de Nenhum Imóvel */}
      <div className="w-full max-w-6xl px-4 pb-16">
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">
          Portfólio de Imóveis
        </h2>

        {carregando ? (
          <div className="text-center py-12 text-slate-500 font-medium">
            Carregando imóveis disponíveis...
          </div>
        ) : imoveisFiltrados.length === 0 ? (
          <div className="bg-slate-100 rounded-xl p-8 text-center border border-dashed border-slate-300">
            <h3 className="text-lg font-bold text-slate-700">NENHUM IMÓVEL DISPONÍVEL NO MOMENTO</h3>
            <p className="text-sm text-slate-500 mt-1">Seja o primeiro a anunciar! Envie seu imóvel pelo formulário.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {imoveisFiltrados.map((imovel) => (
              <CardImovel key={imovel.id} imovel={imovel} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Componente do Card com Carrossel de Fotos Interativo
function CardImovel({ imovel }: { imovel: Anuncio }) {
  const fotos = imovel.fotos && imovel.fotos.length > 0 ? imovel.fotos : [imovel.imagem || "/placeholder.svg"];
  const [indiceFoto, setIndiceFoto] = useState(0);

  const anterior = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndiceFoto((prev) => (prev === 0 ? fotos.length - 1 : prev - 1));
  };

  const proximo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndiceFoto((prev) => (prev === fotos.length - 1 ? 0 : prev + 1));
  };

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 rounded-xl border border-slate-200 flex flex-col justify-between">
      <div>
        {/* Carrossel de Fotos */}
        <div className="relative w-full h-56 bg-slate-900 group">
          <img
            src={fotos[indiceFoto]}
            alt={imovel.titulo}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />

          {fotos.length > 1 && (
            <>
              <button
                type="button"
                onClick={anterior}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-1.5 rounded-full opacity-80 group-hover:opacity-100 transition"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={proximo}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-1.5 rounded-full opacity-80 group-hover:opacity-100 transition"
                aria-label="Próxima foto"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-2 py-0.5 rounded-full">
                {indiceFoto + 1} / {fotos.length}
              </div>
            </>
          )}

          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow">
            {imovel.tipo}
          </div>
        </div>

        {/* Informações do Imóvel */}
        <CardContent className="p-4">
          <div className="text-xs uppercase font-bold text-blue-600 tracking-wide mb-1">
            {imovel.status}
          </div>
          <h3 className="text-lg font-bold text-slate-900 line-clamp-1 mb-1">
            {imovel.titulo}
          </h3>
          <p className="text-sm text-slate-500 mb-3 line-clamp-1">
            {imovel.localizacao}
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-600 mb-4 border-y py-2 border-slate-100">
            <span className="flex items-center gap-1">
              <Bed className="w-4 h-4 text-slate-400" />
              {imovel.quartos} qts
            </span>
            <span className="flex items-center gap-1">
              <Bath className="w-4 h-4 text-slate-400" />
              {imovel.banhos} banhos
            </span>
            <span className="flex items-center gap-1">
              <Maximize className="w-4 h-4 text-slate-400" />
              {imovel.area} m²
            </span>
          </div>

          <div className="text-xl font-extrabold text-slate-900">
            {imovel.preco}
          </div>
        </CardContent>
      </div>

      <div className="p-4 pt-0">
        <Button className="w-full bg-slate-900 hover:bg-blue-600 text-white font-medium transition-colors">
          Ver Detalhes
        </Button>
      </div>
    </Card>
  );
}
