import { createFileRoute } from "@tanstack/react-router";
import {
  Building2,
  Home,
  Briefcase,
  Search,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  FileText,
  Upload,
  Calendar,
  Layers,
  Award,
  Globe,
  Bath,
  Maximize,
  Filter,
  Check,
  Share2,
} from "lucide-react";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { buscarListagensPublicadas, LISTAGENS_MAXIMAS } from "@/lib/listings";
import { SubmitListingForm } from "@/components/SubmitListingForm";
import { Button } from "@/components/ui/button";

const INSURERS = [
  { name: "Porto Seguro", color: "#00529B", URL: "https://www.portoseguro.com.br/seguro-fianca/" },
  { name: "Tokio Marine", color: "#0072CE", URL: "https://www.tokiomarine.com.br/seguro-fianca-locaticia/" },
  { name: "Velum (Ex-Liberty)", color: "#00A859", URL: "https://www.velumseguros.com.br/" },
  { name: "Sompo Seguros", color: "#ED1C24", URL: "https://www.sompo.com.br/" },
  { name: "Pottencial Seguradora", color: "#FF5C00", URL: "https://www.pottencialseguradora.com.br/seguro-fianca/" },
];

const TECHNICAL_SERVICES = [
  {
    title: "Administração de Condomínios",
    desc: "Gestão completa de administração condominial com transparência.",
    icon: Building2,
  },
  {
    title: "Avaliação Mercadológica",
    desc: "Perícia técnica e avaliações rigorosas de mercado imobiliário.",
    icon: Award,
  },
  {
    title: "Laudo Pericial",
    desc: "Perícia judicial e laudos técnicos para fins legais e usucapião.",
    icon: FileText,
  },
  {
    title: "Compra, Venda e Locação",
    desc: "Intermediação especializada para compra, venda, locação e permuta de imóveis.",
    icon: Home,
  },
  {
    title: "Topografia e Medição",
    desc: "Levantamento planialtimétrico, georreferenciamento e medição de precisão.",
    icon: Layers,
  },
  {
    title: "Mapeamento Aéreo com Drone",
    desc: "Sobrevôo especializado para avaliações e mapeamento técnico de precisão.",
    icon: Globe,
  },
  {
    title: "Demolição e Terraplanagem",
    desc: "Serviços de limpeza de terrenos, demolição técnica e preparação de solo.",
    icon: Briefcase,
  },
  {
    title: "Estruturação Imobiliária",
    desc: "Regularização documental e estrutura planejada para empreendimentos.",
    icon: ShieldCheck,
  },
];

export const Route = createFileRoute("/rotas/")({
  component: IndexComponent,
});

function IndexComponent() {
  const [tipoFiltro, setTipoFiltro] = useState<string>("todos");
  const [operacaoFiltro, setOperacaoFiltro] = useState<string>("todos");
  const [buscaTexto, setBuscaTexto] = useState<string>("");

  const { data: listings = [], isLoading } = useQuery({
    queryKey: ["public-listings"],
    queryFn: () => buscarListagensPublicadas(),
  });

  const listingsFiltrados = listings.filter((item: any) => {
    const matchTipo = tipoFiltro === "todos" || item.tipo?.toLowerCase() === tipoFiltro.toLowerCase();
    const matchOperacao = operacaoFiltro === "todos" || item.status?.toLowerCase() === operacaoFiltro.toLowerCase();
    const matchBusca =
      !buscaTexto ||
      item.titulo?.toLowerCase().includes(buscaTexto.toLowerCase()) ||
      item.localizacao?.toLowerCase().includes(buscaTexto.toLowerCase());
    return matchTipo && matchOperacao && matchBusca;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Secção de Consulta e Vitrine */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Portfólio de Imóveis
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-slate-500">
            Encontre o imóvel ideal com segurança técnica e jurídica especializada.
          </p>
        </div>

        {/* Barra de Filtros */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Pesquisar por título, bairro..."
              value={buscaTexto}
              onChange={(e) => setBuscaTexto(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <select
              value={tipoFiltro}
              onChange={(e) => setTipoFiltro(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium"
            >
              <option value="todos">Todos os Tipos</option>
              <option value="Casa">Casa</option>
              <option value="Apartamento">Apartamento</option>
              <option value="Terreno">Terreno</option>
              <option value="Comercial">Comercial</option>
              <option value="Chácara / Sítio">Chácara / Sítio</option>
            </select>

            <select
              value={operacaoFiltro}
              onChange={(e) => setOperacaoFiltro(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium"
            >
              <option value="todos">Todas Operações</option>
              <option value="Venda e Locação">Venda e Locação</option>
              <option value="Venda">Venda</option>
              <option value="Locação">Locação</option>
            </select>
          </div>
        </div>

        {/* Grelha de Imóveis */}
        {isLoading ? (
          <div className="text-center py-12 text-slate-500 text-sm">A carregar imóveis...</div>
        ) : listingsFiltrados.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">Nenhum imóvel encontrado nesta categoria.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listingsFiltrados.slice(0, LISTAGENS_MAXIMAS).map((property: any) => {
              // Extração de todas as fotos disponíveis
              const fotosCruas =
                (Array.isArray(property.fotos) && property.fotos.length > 0 ? property.fotos : null) ||
                (Array.isArray(property.images) && property.images.length > 0 ? property.images : null) ||
                (property.image ? [property.image] : null) ||
                (property.imagem ? [property.imagem] : null) ||
                ["/placeholder.svg"];

              const listaFotos = fotosCruas.map((f: any) =>
                typeof f === "string" ? f : f?.url || "/placeholder.svg"
              );

              const galeriaId = `galeria-${property.id || Math.random()}`;

              return (
                <div
                  key={property.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Área da Galeria com Carrossel e Setas */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 group/img">
                      <div
                        id={galeriaId}
                        className="w-full h-full flex overflow-x-auto scroll-smooth snap-x snap-mandatory"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                      >
                        {listaFotos.map((url: string, idx: number) => (
                          <img
                            key={idx}
                            src={url}
                            alt={`${property.titulo || property.title || "Imóvel"} - Foto ${idx + 1}`}
                            className="w-full h-full object-cover shrink-0 snap-center select-none"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/placeholder.svg";
                            }}
                          />
                        ))}
                      </div>

                      {/* Botões de Navegação (só se tiver mais de 1 foto) */}
                      {listaFotos.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              const container = document.getElementById(galeriaId);
                              if (container) container.scrollLeft -= container.clientWidth;
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center text-sm font-bold z-20 shadow transition-all cursor-pointer"
                          >
                            &#10094;
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              const container = document.getElementById(galeriaId);
                              if (container) container.scrollLeft += container.clientWidth;
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center text-sm font-bold z-20 shadow transition-all cursor-pointer"
                          >
                            &#10095;
                          </button>

                          <span className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded-md z-20 pointer-events-none">
                            {listaFotos.length} fotos
                          </span>
                        </>
                      )}

                      {/* Etiqueta de Categoria */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
                        <span className="bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {property.tipo || "Imóvel"}
                        </span>
                        {property.status && (
                          <span className="bg-[#d4a017] text-white text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase tracking-wider">
                            {property.status}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Dados do Imóvel */}
                    <div className="p-5">
                      <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide line-clamp-1">
                        {property.titulo || property.title || "Imóvel Disponível"}
                      </h3>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#d4a017] shrink-0" />
                        <span className="truncate">{property.localizacao || "Localização sob consulta"}</span>
                      </div>

                      {property.descricao && (
                        <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                          {property.descricao}
                        </p>
                      )}

                      <div className="grid grid-cols-3 gap-2 py-3 mt-4 border-t border-b border-slate-100 text-slate-600 text-xs text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Home className="w-3.5 h-3.5 text-slate-400" />
                          <span>{property.quartos || 0} qtos</span>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <Bath className="w-3.5 h-3.5 text-slate-400" />
                          <span>{property.banhos || property.banheiros || 0} banhos</span>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <Maximize className="w-3.5 h-3.5 text-slate-400" />
                          <span>{property.area ? `${property.area}m²` : "--"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preço e Botão de Ação */}
                  <div className="p-5 pt-0 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Valor</span>
                      <span className="text-base font-bold text-slate-900">
                        {property.preco || property.price || "Sob Consulta"}
                      </span>
                    </div>

                    <a
                      href={`https://wa.me/551124050300?text=${encodeURIComponent(
                        `Olá! Gostaria de mais informações sobre o imóvel: ${property.titulo || property.title}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center transition-colors shadow-sm"
                      title="Falar sobre este imóvel"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Formulário de Envio de Imóvel */}
      <section className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">
              Anuncie Seu Imóvel
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Preencha os dados e anexe as fotos para avaliação e publicação técnica.
            </p>
          </div>
          <SubmitListingForm />
        </div>
      </section>
    </div>
  );
}

export default IndexComponent;
