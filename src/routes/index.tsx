import { createFileRoute } from "@tanstack/react-router";
import { 
  Building2, 
  Map, 
  Camera, 
  UserCheck, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare,
  ChevronDown,
  Upload,
  CheckCircle2,
  Share2,
  Globe,
  Link,
  Search,
  Bed,
  Bath,
  Maximize,
  ArrowRight,
  Filter,
  Ruler,
  Compass,
  Zap,
  Layers,
  Activity,
  Plus
} from "lucide-react";
import { useState } from "react";
import logo2 from "@/assets/logo_2.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TECHNICAL_SERVICES = [
  {
    id: 1,
    title: "Administração de Condomínios",
    description: "Gestão completa de administração condominial com transparência.",
    icon: <Building2 className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    id: 2,
    title: "Avaliação Mercadológica",
    description: "Perícia técnica e avaliações rigorosas de mercado imobiliário.",
    icon: <UserCheck className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    id: 8,
    title: "Laudo Pericial",
    description: "Perícia judicial e laudos técnicos para fins legais e usucapião.",
    icon: <Activity className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    id: 3,
    title: "Compra, Venda e Locação",
    description: "Intermediação especializada para compra, venda, locação e permuta de imóveis.",
    icon: <Search className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    id: 4,
    title: "Topografia e Medição",
    description: "Levantamento planialtimétrico, georreferenciamento e medição de precisão.",
    icon: <Ruler className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    id: 5,
    title: "Mapeamento Aéreo com Drone",
    description: "Sobrevôo especializado para avaliações e mapeamento técnico de precisão.",
    icon: <Zap className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    id: 6,
    title: "Demolição e Terraplanagem",
    description: "Serviços de limpeza de terrenos, demolição técnica e preparação de solo.",
    icon: <Activity className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    id: 7,
    title: "Estruturação Imobiliária",
    description: "Regularização documental e estrutura planejada para empreendimentos.",
    icon: <Layers className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    id: 9,
    title: "Despachante Imobiliário",
    description: "Consultoria especializada e agilidade em trâmites documentais imobiliários.",
    icon: <CheckCircle2 className="w-8 h-8 text-[var(--color-accent)]" />,
  }
];

const PROJETOS_3D = [
  {
    id: 1,
    title: "Modelagem 3D Urbana e Rural",
    description: "Visualização tridimensional de glebas, fazendas e áreas urbanas para planejamento estratégico e análise de impacto.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
    tech: "Precisão Territorial"
  },
  {
    id: 2,
    title: "Mapeamento Aéreo com Drone",
    description: "Nuvem de pontos e modelos 3D gerados a partir de fotogrametria aérea para alta precisão em grandes áreas.",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80",
    tech: "Fotogrametria"
  },
  {
    id: 3,
    title: "Precisão e Simulação Comercial",
    description: "Modelagem técnica e projeção 3D de empreendimentos comerciais de alta complexidade com rigor pericial.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
    tech: "Inteligência Comercial"
  }
];

const PROPERTIES = [
  {
    id: 1,
    title: "Gleba Prime",
    type: "Terreno / Expansão",
    status: "Venda Técnica",
    price: "Sob Consulta",
    location: "Eixo Guarulhos-SP",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80",
    beds: 0,
    baths: 0,
    area: "85.000m²",
    description: "Área com alto potencial de valorização, zoneamento favorável e análise pericial completa."
  },
  {
    id: 2,
    title: "Loteamento Santa Isabel",
    type: "Loteamento / Gleba",
    status: "Oportunidade",
    price: "Sob Consulta",
    location: "Santa Isabel - SP",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80",
    beds: 0,
    baths: 0,
    area: "120.000m²",
    description: "Excelente gleba para loteamento residencial ou industrial em Santa Isabel, com topografia favorável e acesso facilitado."
  },
  {
    id: 3,
    title: "Residência de Autoridade Alphaville",
    type: "Alto Padrão",
    status: "Venda",
    price: "R$ 6.800.000",
    location: "Alphaville, Barueri",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
    beds: 5,
    baths: 7,
    area: "650m²",
    description: "Projeto arquitetônico premiado com automação total e segurança fortificada."
  },
  {
    id: 4,
    title: "Casa de Vila Jardim Europa",
    type: "Residencial",
    status: "Venda",
    price: "R$ 3.200.000",
    location: "Jardim Europa, São Paulo",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&q=80",
    beds: 3,
    baths: 3,
    area: "180m²",
    description: "Charme e exclusividade em uma das vilas mais cobiçadas."
  },
  {
    id: 5,
    title: "Office Boutique Faria Lima",
    type: "Comercial",
    status: "Locação",
    price: "R$ 15.000/mês",
    location: "Av. Faria Lima, São Paulo",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80",
    beds: 0,
    baths: 2,
    area: "120m²",
    description: "Laje corporativa pronta para uso em edifício Triple A."
  },
  {
    id: 6,
    title: "Residência Minimalista Swiss Park",
    type: "Residencial",
    status: "Venda",
    price: "R$ 2.800.000",
    location: "Swiss Park, Campinas",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
    beds: 4,
    baths: 5,
    area: "320m²",
    description: "Conceito aberto com piscina de borda infinita."
  },
  {
    id: 7,
    title: "Gleba para Loteamento",
    type: "Terreno",
    status: "Venda",
    price: "R$ 8.000.000",
    location: "Atibaia, SP",
    image: "https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&q=80",
    beds: 0,
    baths: 0,
    area: "50.000m²",
    description: "Área ideal para desenvolvimento urbano de alto padrão."
  },
  {
    id: 8,
    title: "Apartamento Garden Moema",
    type: "Apartamento",
    status: "Locação",
    price: "R$ 12.000/mês",
    location: "Moema, São Paulo",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80",
    beds: 2,
    baths: 3,
    area: "150m²",
    description: "Terraço privativo amplo em rua arborizada."
  },
  {
    id: 9,
    title: "Vila Toscana em Condomínio",
    type: "Residencial",
    status: "Venda",
    price: "R$ 5.900.000",
    location: "Quinta da Baronesa, Bragança",
    image: "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80",
    beds: 6,
    baths: 8,
    area: "800m²",
    description: "Arquitetura clássica com vista permanente para o golf."
  },
  {
    id: 10,
    title: "Loft Design Pinheiros",
    type: "Apartamento",
    status: "Locação",
    price: "R$ 8.500/mês",
    location: "Pinheiros, São Paulo",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80",
    beds: 1,
    baths: 2,
    area: "95m²",
    description: "Pé direito duplo e acabamento em concreto aparente."
  },
  {
    id: 11,
    title: "Sítio de Lazer em Ibiúna",
    type: "Residencial",
    status: "Venda",
    price: "R$ 1.500.000",
    location: "Ibiúna, SP",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80",
    beds: 4,
    baths: 3,
    area: "5.000m²",
    description: "Casa de campo completa com pomar e piscina."
  },
  {
    id: 12,
    title: "Lote em Condomínio Fechado",
    type: "Terreno",
    status: "Venda",
    price: "R$ 850.000",
    location: "Arujá, SP",
    image: "https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&q=80",
    beds: 0,
    baths: 0,
    area: "600m²",
    description: "Terreno com leve aclive e vista privilegiada."
  },
  {
    id: 13,
    title: "Apartamento Alto Padrão Perdizes",
    type: "Apartamento",
    status: "Venda",
    price: "R$ 2.400.000",
    location: "Perdizes, São Paulo",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80",
    beds: 3,
    baths: 4,
    area: "165m²",
    description: "Próximo à futura estação do metrô e Parque da Água Branca."
  },
  {
    id: 14,
    title: "Showroom Comercial",
    type: "Comercial",
    status: "Venda",
    price: "R$ 4.000.000",
    location: "Vila Olímpia, São Paulo",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80",
    beds: 0,
    baths: 4,
    area: "400m²",
    description: "Fachada em vidro e localização de alta visibilidade."
  },
  {
    id: 15,
    title: "Casa de Praia Juquehy",
    type: "Residencial",
    status: "Venda",
    price: "R$ 3.800.000",
    location: "Juquehy, São Sebastião",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80",
    beds: 4,
    baths: 5,
    area: "250m²",
    description: "Pé na areia com deck privativo e projeto náutico."
  },
  {
    id: 16,
    title: "Flat Design Jardins",
    type: "Apartamento",
    status: "Locação",
    price: "R$ 6.000/mês",
    location: "Jardins, São Paulo",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80",
    beds: 1,
    baths: 1,
    area: "45m²",
    description: "Mobiliado por designer renomado, pronto para morar."
  },
  {
    id: 17,
    title: "Chácara Próxima a São Paulo",
    type: "Residencial",
    status: "Venda",
    price: "R$ 1.200.000",
    location: "Santa Isabel, SP",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80",
    beds: 3,
    baths: 2,
    area: "2.000m²",
    description: "Fácil acesso pela Rodovia Dutra, ideal para lazer."
  },
  {
    id: 18,
    title: "Apartamento Studio Vila Madalena",
    type: "Apartamento",
    status: "Venda",
    price: "R$ 750.000",
    location: "Vila Madalena, São Paulo",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80",
    beds: 1,
    baths: 1,
    area: "35m²",
    description: "Condomínio com lazer completo e rooftop."
  },
  {
    id: 19,
    title: "Prédio Inteiro para Investimento",
    type: "Comercial",
    status: "Venda",
    price: "R$ 12.000.000",
    location: "Centro, São Paulo",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80",
    beds: 0,
    baths: 10,
    area: "2.500m²",
    description: "Ideal para retrofit ou sede corporativa."
  },
  {
    id: 20,
    title: "Casa Suspensa Campo Belo",
    type: "Apartamento",
    status: "Venda",
    price: "R$ 3.500.000",
    location: "Campo Belo, São Paulo",
    image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80",
    beds: 4,
    baths: 5,
    area: "240m²",
    description: "Varanda gourmet integrada e 4 suítes plenas."
  },
  {
    id: 21,
    title: "Refúgio na Serra da Mantiqueira",
    type: "Residencial",
    status: "Venda",
    price: "R$ 2.100.000",
    location: "Campos do Jordão, SP",
    image: "https://images.unsplash.com/photo-1449156003053-c304209c11e5?auto=format&fit=crop&q=80",
    beds: 4,
    baths: 4,
    area: "300m²",
    description: "Arquitetura em madeira e pedra com vista para o vale."
  }
];

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    title: "Territorial | Perícia Judicial & Inteligência em Guarulhos",
    links: [
      {
        rel: "canonical",
        href: "https://territorialimoveis.com.br"
      }
    ],
    meta: [
      { name: "description", content: "Liderança em Perícia Judicial e Inteligência em Guarulhos. Administração, Avaliação e Consultoria Técnica com excelência. CRECI 38258J | Silvio Moura CRECI 151545." },
      { property: "og:title", content: "Territorial | Excelência em Inteligência Imobiliária" },
      { property: "og:description", content: "Especialistas em Perícia Judicial e Soluções de Alto Padrão em Guarulhos e Região." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "keywords",
        content: "perícia judicial guarulhos, avaliação imobiliária, topografia guarulhos, inteligência, administração de imóveis alto padrão, silvio moura creci 151545"
      }
    ],
    script: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Territorial",
          "image": "https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&q=80",
          "@id": "",
          "url": "https://territorialimoveis.com.br",
          "telephone": "+551124050300",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Avenida Otávio Braga de Mesquita, 3935",
            "addressLocality": "Guarulhos",
            "addressRegion": "SP",
            "postalCode": "07191-000",
            "addressCountry": "BR"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": -23.444,
            "longitude": -46.508
          }
        })
      }
    ]
  })
});

function Index() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen font-sans bg-[#e2e2e2] text-foreground selection:bg-[var(--color-accent)] selection:text-[var(--color-navy)]">
      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/551124050300" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
        aria-label="Fale conosco no WhatsApp"
      >
        <MessageSquare className="w-6 h-6 md:w-7 md:h-7" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 font-bold whitespace-nowrap hidden md:inline">Fale Conosco</span>
      </a>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#e2e2e2] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24 md:h-32 relative">
            {/* Logo and Branding - Left */}
            {/* Branding - Left */}
            <div className="flex items-center gap-2 md:gap-4 shrink-0 max-w-[70%] sm:max-w-none">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 flex items-center justify-center overflow-visible">
                <img 
                  src={logo2.url} 
                  alt="Territorial Imóveis Logo" 
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>
              <div className="flex flex-col items-center -ml-2 md:-ml-4 overflow-hidden">
                <span className="text-slate-900 font-black text-sm sm:text-base md:text-3xl tracking-tighter uppercase font-brand drop-shadow-sm leading-tight whitespace-nowrap overflow-hidden text-ellipsis">TERRITORIAL IMÓVEIS</span>
                <span className="text-slate-900 font-bold text-[7px] sm:text-[9px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em] leading-none mt-0.5 w-full text-center">CRECI 38258-J</span>
              </div>
            </div>

            {/* Desktop Menu - Right */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6 whitespace-nowrap">
              <a href="#inicio" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 hover:text-[var(--color-accent)] transition-colors">Início</a>
              <a href="#sobre" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 hover:text-[var(--color-accent)] transition-colors">Nossa História</a>
              <a href="#especialidades" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 hover:text-[var(--color-accent)] transition-colors">Especialidades</a>
              <a href="#projetos" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 hover:text-[var(--color-accent)] transition-colors">Projetos</a>
              <a href="#anuncie" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 hover:text-[var(--color-accent)] transition-colors">Perícia</a>
              <a href="#depoimentos" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 hover:text-[var(--color-accent)] transition-colors">Vozes</a>
              <a href="#imoveis" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 hover:text-[var(--color-accent)] transition-colors">Imóveis</a>
              <a href="#faq" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 hover:text-[var(--color-accent)] transition-colors">Dúvidas</a>
            </div>

            {/* Contact - Right */}
            <div className="flex items-center gap-4 shrink-0">
              <Button 
                onClick={() => window.open('https://wa.me/551124050300', '_blank')}
                className="hidden md:flex bg-slate-900 text-white hover:bg-[var(--color-accent)] hover:text-slate-900 rounded-2xl px-6 lg:px-8 h-12 border-none font-black transition-all duration-500 shadow-xl hover:scale-105 active:scale-95 uppercase tracking-[0.1em] text-xs"
              >
                (11) 2405-0300
              </Button>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-slate-900"
              >
                {isMenuOpen ? <Plus className="rotate-45 w-8 h-8" /> : <Layers className="w-8 h-8" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#e2e2e2] border-t border-black/5 p-4 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-4 text-xs font-black uppercase tracking-[0.25em] text-slate-900">
              <a href="#inicio" onClick={() => setIsMenuOpen(false)} className="p-4 hover:bg-black/5 rounded-xl">Início</a>
              <a href="#sobre" onClick={() => setIsMenuOpen(false)} className="p-4 hover:bg-black/5 rounded-xl">Nossa História</a>
              <a href="#especialidades" onClick={() => setIsMenuOpen(false)} className="p-4 hover:bg-black/5 rounded-xl">Especialidades</a>
              <a href="#imoveis" onClick={() => setIsMenuOpen(false)} className="p-4 hover:bg-black/5 rounded-xl">Imóveis</a>
              <a href="#projetos" onClick={() => setIsMenuOpen(false)} className="p-4 hover:bg-black/5 rounded-xl">Projetos</a>
              <a href="#faq" onClick={() => setIsMenuOpen(false)} className="p-4 hover:bg-black/5 rounded-xl">Dúvidas Frequentes</a>
              <Button 
                onClick={() => {
                  window.open('https://wa.me/551124050300', '_blank');
                  setIsMenuOpen(false);
                }}
                className="bg-slate-900 text-white rounded-xl h-14 font-black uppercase tracking-widest text-xs mt-2"
              >
                (11) 2405-0300
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-start justify-center pt-32 md:pt-48 bg-[#e2e2e2]">
        <div className="absolute inset-0 z-0 flex items-start justify-center pointer-events-none overflow-hidden">
          <img 
            src={logo2.url} 
            alt="Territorial Imóveis Fundo" 
            className="w-[85%] md:w-[70%] lg:w-[60%] h-auto object-contain opacity-10 mix-blend-multiply transition-all duration-1000 p-4 md:p-8 mt-24 md:mt-32 lg:mt-40" 
          />
        </div>


        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* CEO & Story Content Moved Here */}
          <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
            <div className="w-full mb-12">
              <span className="text-[var(--color-accent)] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-sm mb-4 md:mb-6 block drop-shadow-sm">Trajetória de Sucesso</span>
              <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 md:mb-10 uppercase tracking-tighter leading-tight font-heading px-4">
                Nossa História
              </h2>
              <div className="space-y-6 md:space-y-8 text-slate-600 text-lg md:text-xl leading-relaxed font-medium px-4 text-center">
                <p>
                  A Territorial Imóveis nasceu da necessidade de um mercado exigente que busca, em seus fornecedores de serviços, algo além do básico, tais como confiança, sigilo e segurança nas negociações imobiliárias.
                </p>
                <p>
                  Nossa história foi construída ao longo de anos de experiência, atuando em diversos segmentos imobiliários. A Territorial Imóveis tem amplo conhecimento em laudo pericial para usucapião, laudo de avaliação mercadológica e estruturação imobiliária.
                </p>
                <p>
                  Com foco em resultados e transparência, desenvolvemos metodologias próprias para análise de terrenos e glebas, garantindo que cada projeto seja executado com o máximo de precisão nós possibilitando o atendimento a clientes de perfis variados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* Mission, Vision, Values Section */}
      <section className="py-16 bg-[#e2e2e2] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 bg-white/40 backdrop-blur-md rounded-[2rem] border border-black/5 shadow-lg">
              <h3 className="text-[var(--color-navy)] font-black uppercase tracking-wider mb-4 text-xl">Missão</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Temos a missão de levar o que há de melhor e mais sofisticado ao mercado imobiliário digital, comodidade, segurança e agilidade sem perca de tempo e dinheiro.
              </p>
            </div>
            <div className="p-8 bg-white/40 backdrop-blur-md rounded-[2rem] border border-black/5 shadow-lg">
              <h3 className="text-[var(--color-navy)] font-black uppercase tracking-wider mb-4 text-xl">Visão</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Revolucionar o mercado imobiliário, facilitando o dia a dia dos clientes e investidores trazendo para um só lugar o que ele buscaria em várias plataformas de serviços.
              </p>
            </div>
            <div className="p-8 bg-white/40 backdrop-blur-md rounded-[2rem] border border-black/5 shadow-lg">
              <h3 className="text-[var(--color-navy)] font-black uppercase tracking-wider mb-4 text-xl">Valores</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Somos o que o mercado imobiliário precisa e temos o que o mercado imobiliário deseja, tratamos dos nossos clientes com segurança e total sigilo nas negociações imobiliárias.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Areas Section (Section Order 2) */}
      <section id="especialidades" className="py-16 md:py-24 bg-[#e2e2e2] border-y border-black/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-5xl font-bold text-foreground uppercase tracking-tighter font-heading leading-tight px-4">Nossas Especialidades</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {TECHNICAL_SERVICES.map((service) => (
              <div key={service.id} className="group p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-white/40 backdrop-blur-md border border-black/5 hover:border-[var(--color-accent)] transition-all duration-700 relative overflow-hidden shadow-xl hover:-translate-y-2 flex flex-col items-center text-center">
                <div className="mb-4 md:mb-6 bg-[var(--color-accent)]/10 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-[1.25rem] flex items-center justify-center border border-[var(--color-accent)]/10 group-hover:bg-[var(--color-accent)] transition-all duration-500 scale-100 group-hover:scale-110">
                  <div className="scale-75 md:scale-100">{service.icon}</div>
                </div>
                <h3 className={cn("text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3 leading-tight group-hover:text-[var(--color-navy)] transition-colors font-heading tracking-tight", service.id === 2 && "text-base sm:text-lg md:text-xl")}>{service.title}</h3>
                <p className="text-slate-600 text-[10px] md:text-xs leading-relaxed font-medium">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Button 
              onClick={() => window.open('https://wa.me/551124050300', '_blank')}
              className="bg-slate-900 text-white hover:bg-[var(--color-accent)] hover:text-slate-900 rounded-2xl px-10 h-16 border-none font-black transition-all duration-500 shadow-xl hover:scale-105 active:scale-95 uppercase tracking-[0.15em] text-sm md:text-base flex items-center gap-3"
            >
              <MessageSquare className="w-5 h-5 md:w-6 h-6" />
              Fale com nossos especialistas
            </Button>
          </div>
        </div>
      </section>

      {/* Technical Projects Section (Section Order 3) */}
      <section id="projetos" className="py-32 bg-[#e2e2e2] border-t border-black/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-black/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 md:mb-24">
            
            <h2 className="text-2xl md:text-5xl font-bold text-foreground uppercase tracking-tighter font-heading leading-tight px-4">Projetos & Tecnologia</h2>
            <p className="text-slate-900 mt-6 max-w-2xl mx-auto font-black text-lg md:text-2xl uppercase tracking-tight px-4 font-brand">Simulação de Construção e Modelagem 3D Urbana e Rural</p>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROJETOS_3D.map((projeto) => (
              <div key={projeto.id} className="group bg-white/40 backdrop-blur-md rounded-[2.5rem] overflow-hidden border border-black/5 hover:border-[var(--color-accent)] transition-all duration-700 shadow-xl hover:-translate-y-3">
                <div className="relative aspect-video overflow-hidden">
                  {projeto.id === 3 ? (
                    <div className="w-full h-full relative">
                      <video 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        poster={projeto.image}
                      >
                        <source src="https://assets.mixkit.co/videos/preview/mixkit-building-a-house-in-a-time-lapse-12347-large.mp4" type="video/mp4" />
                      </video>
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                  ) : (
                    <img 
                      src={projeto.image} 
                      alt={projeto.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-[var(--color-navy)] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                      {projeto.tech}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black text-slate-900 mb-4 font-brand tracking-tighter uppercase">{projeto.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">{projeto.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>




      {/* Lead Generation Premium */}
      <section id="anuncie" className="py-20 md:py-32 bg-[#e2e2e2] text-slate-900 overflow-hidden relative border-y border-black/5">
        <div className="absolute inset-0 z-0 opacity-5">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05),transparent_70%)]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Form 1: Solicitar Serviços */}
            <div className="bg-white/40 backdrop-blur-3xl p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-black/5 shadow-2xl h-full">
              <div className="mb-8">
                <span className="text-[var(--color-accent)] font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs mb-2 block">Consultoria Técnica</span>
                <h3 className="text-xl md:text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Solicitar Serviços</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Avaliação completa com segurança jurídica para o seu patrimônio.
                </p>
              </div>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" className="w-full h-14 px-6 rounded-2xl bg-white/40 border border-black/5 text-slate-900 focus:ring-2 focus:ring-[var(--color-accent)] outline-none placeholder:text-slate-400 font-medium text-sm" placeholder="Nome do Requerente" />
                  <input type="tel" className="w-full h-14 px-6 rounded-2xl bg-white/40 border border-black/5 text-slate-900 focus:ring-2 focus:ring-[var(--color-accent)] outline-none placeholder:text-slate-400 font-medium text-sm" placeholder="Contato" />
                </div>
                <select className="w-full h-14 px-6 rounded-2xl bg-white/40 border border-black/5 text-slate-900 focus:ring-2 focus:ring-[var(--color-accent)] outline-none cursor-pointer font-bold appearance-none text-xs">
                  <option className="bg-white">Avaliação Mercadológica</option>
                  <option className="bg-white">Laudo Judicial para Usucapião</option>
                  <option className="bg-white">Regularização</option>
                  <option className="bg-white">Topografia e Medição</option>
                  <option className="bg-white">Mapeamento Aéreo</option>
                  <option className="bg-white">Demolição e Terraplanagem</option>
                  <option className="bg-white">Estruturação Imobiliária</option>
                  <option className="bg-white">Despachante Imobiliário</option>
                  <option className="bg-white">Compra</option>
                  <option className="bg-white">Locação</option>
                  <option className="bg-white">Permuta</option>
                </select>
                <Button className="w-full bg-[var(--color-accent)] text-slate-900 h-14 rounded-xl font-black text-sm shadow-xl border-none uppercase tracking-widest hover:scale-[1.02] transition-all">
                  Solicitar
                </Button>
              </form>
            </div>

            {/* Form 2: Enviar Imóvel para Venda */}
            <div className="bg-white/40 backdrop-blur-3xl p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-black/5 shadow-2xl h-full">
              <div className="mb-8">
                <span className="text-[var(--color-accent)] font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs mb-2 block">Imóvel & Glebas</span>
                <h3 className="text-xl md:text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Enviar Imóvel para Venda</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Deseja vender seu imóvel? Nossa equipe realiza a análise técnica com sigilo e segurança.
                </p>
              </div>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" className="w-full h-14 px-6 rounded-2xl bg-white/40 border border-black/5 text-slate-900 focus:ring-2 focus:ring-[var(--color-accent)] outline-none placeholder:text-slate-400 font-medium text-sm" placeholder="Nome Completo" />
                  <input type="tel" className="w-full h-14 px-6 rounded-2xl bg-white/40 border border-black/5 text-slate-900 focus:ring-2 focus:ring-[var(--color-accent)] outline-none placeholder:text-slate-400 font-medium text-sm" placeholder="WhatsApp / Contato" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" className="w-full h-14 px-6 rounded-2xl bg-white/40 border border-black/5 text-slate-900 focus:ring-2 focus:ring-[var(--color-accent)] outline-none placeholder:text-slate-400 font-medium text-sm" placeholder="Metragem (m²)" />
                  <select className="w-full h-14 px-6 rounded-2xl bg-white/40 border border-black/5 text-slate-900 focus:ring-2 focus:ring-[var(--color-accent)] outline-none cursor-pointer font-bold appearance-none text-xs">
                    <option className="bg-white">Documentação Regularizada</option>
                    <option className="bg-white">Em Processo de Regularização</option>
                    <option className="bg-white">Contrato de Compra e Venda</option>
                  </select>
                </div>
                
                {/* File Upload Field */}
                <div className="relative group">
                  <div className="w-full h-32 rounded-2xl bg-white/40 border-2 border-dashed border-black/10 flex flex-col items-center justify-center gap-2 group-hover:border-[var(--color-accent)]/50 transition-colors cursor-pointer relative overflow-hidden">
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      onChange={(e) => {
                        // Logic for file handling could go here
                        console.log(e.target.files);
                      }}
                    />
                    <Upload className="w-8 h-8 text-slate-400 group-hover:text-[var(--color-accent)] transition-colors" />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Subir fotos do imóvel</span>
                    <span className="text-[10px] text-slate-400 font-medium">JPEG, PNG até 10MB</span>
                  </div>
                </div>

                <Button className="w-full bg-slate-900 text-white h-14 rounded-xl font-black text-sm shadow-xl border-none uppercase tracking-widest hover:scale-[1.02] transition-all">
                  Enviar Imóvel
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>


      {/* Imóveis Section (Section Order 6) */}
      <section id="imoveis" className="py-24 bg-[#e2e2e2] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-8">Portfólio de Imóveis</h2>
            
            {/* Search Bar Premium - Relocated here */}
            <div className="bg-white/60 backdrop-blur-2xl p-4 md:p-4 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/40 flex flex-col md:flex-row gap-3 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] ring-1 ring-black/5 mx-auto max-w-4xl mb-16">
              <div className="flex-1 relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--color-accent)] transition-colors" size={20} />
                <input type="text" placeholder="Pesquisar..." className="w-full h-14 md:h-16 pl-16 pr-8 rounded-xl md:rounded-2xl bg-white/70 text-slate-900 border-none focus:ring-2 focus:ring-[var(--color-accent)] outline-none placeholder:text-slate-400 font-medium transition-all shadow-inner text-sm md:text-base" />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <select className="h-14 md:h-16 px-6 rounded-xl md:rounded-2xl bg-white/70 text-slate-900 border border-white/20 outline-none focus:border-[var(--color-accent)] transition-all cursor-pointer font-bold appearance-none min-w-full sm:min-w-[160px] shadow-sm text-sm md:text-base">
                  <option>Residencial</option>
                  <option>Apartamento</option>
                  <option>Comercial</option>
                  <option>Terreno</option>
                </select>
                <select className="h-14 md:h-16 px-6 rounded-xl md:rounded-2xl bg-white/50 text-slate-900 border border-white/20 outline-none focus:border-[var(--color-accent)] transition-all cursor-pointer font-bold appearance-none min-w-full sm:min-w-[160px] text-sm md:text-base">
                  <option>Compra</option>
                  <option>Venda</option>
                  <option>Locação</option>
                  <option>Permuta</option>
                </select>
              </div>
              <Button className="h-14 md:h-16 px-10 bg-[var(--color-accent)] text-[var(--color-navy)] rounded-xl md:rounded-2xl font-black uppercase tracking-[0.2em] border-none shadow-[0_10px_20px_-5px_var(--color-accent)] hover:scale-[1.02] transition-transform text-xs md:text-sm">
                Consultar
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROPERTIES.map((property) => (
              <div key={property.id} className="group bg-white/40 backdrop-blur-md rounded-[2.5rem] overflow-hidden border border-black/5 hover:border-[var(--color-accent)] transition-all duration-700 shadow-xl hover:-translate-y-3">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                      {property.type}
                    </span>
                    <span className="bg-[var(--color-accent)] text-[var(--color-navy)] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                      {property.status}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 font-brand tracking-tighter uppercase leading-none mb-2">{property.title}</h3>
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                        <MapPin size={12} className="text-[var(--color-accent)]" /> {property.location}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium line-clamp-2">{property.description}</p>
                  <div className="grid grid-cols-3 gap-4 py-6 border-y border-black/5 mb-6">
                    <div className="flex flex-col items-center gap-1">
                      <Bed size={16} className="text-[var(--color-accent)]" />
                      <span className="text-xs font-black text-slate-900">{property.beds}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Bath size={16} className="text-[var(--color-accent)]" />
                      <span className="text-xs font-black text-slate-900">{property.baths}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Maximize size={16} className="text-[var(--color-accent)]" />
                      <span className="text-xs font-black text-slate-900">{property.area}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-slate-900 font-brand tracking-tighter">{property.price}</span>
                    <Button className="bg-slate-900 text-white hover:bg-[var(--color-accent)] hover:text-slate-900 h-12 w-12 rounded-xl flex items-center justify-center border-none transition-all shadow-lg p-0">
                      <ArrowRight size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vozes da Experiência (Section Order 7) */}
      <section id="depoimentos" className="py-32 bg-transparent relative overflow-hidden border-t border-black/5">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-200/20 via-transparent to-slate-200/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-24">
            
            <h2 className="text-2xl md:text-5xl font-bold text-foreground uppercase tracking-tighter font-heading px-4">Vozes da Experiência</h2>
          </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                text: "O Silvio Moura foi fundamental na venda da nossa propriedade em Alphaville. Sua análise técnica nos deu a segurança necessária para fechar um negócio complexo.",
                author: "Beatriz Oliveira",
                role: "Proprietária em Alphaville",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
              },
              {
                text: "Excepcional! A avaliação imobiliária foi precisa e o atendimento sofisticado. Encontramos o imóvel perfeito com a curadoria da Territorial.",
                author: "Dr. Marcos Vinícius",
                role: "Neurocirurgião",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150"
              },
              {
                text: "A transparência do Silvio e sua equipe é o que os diferencia. O uso de drones para mostrar nosso terreno fez toda a diferença na valorização.",
                author: "Helena Castro",
                role: "Empresária",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150"
              },
              {
                text: "Trabalho técnico impecável na regularização da nossa fazenda. Silvio é a maior autoridade que conhecemos em perícia territorial.",
                author: "Ricardo Mendes",
                role: "Investidor Agronegócio",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150"
              },
              {
                text: "Gestão condominial de outro nível. A Territorial trouxe tecnologia e clareza para nossa administração.",
                author: "Patrícia Lima",
                role: "Síndica Profissional",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150"
              }
            ].map((t, i) => (
              <div key={i} className="bg-white/40 backdrop-blur-md p-8 rounded-3xl border border-black/5 hover:border-[var(--color-accent)]/50 transition-all duration-500 hover:-translate-y-2 group shadow-xl">
                <MessageSquare className="text-[var(--color-accent)] mb-6 w-10 h-10 group-hover:scale-110 transition-transform" />
                <p className="text-lg text-slate-600 mb-8 font-medium">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[var(--color-accent)]/30 group-hover:border-[var(--color-accent)] transition-colors">
                    <img src={t.image} alt={t.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-lg">{t.author}</p>
                    <p className="text-[var(--color-accent)] text-sm font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#e2e2e2] py-16 md:py-24 border-t border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="text-center md:text-left">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center overflow-visible">
                    <img 
                      src={logo2.url} 
                      alt="Territorial Imóveis Logo" 
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-foreground font-black text-xl md:text-3xl tracking-tighter uppercase font-brand leading-tight whitespace-nowrap">TERRITORIAL IMÓVEIS</span>
                    <span className="text-foreground font-bold text-[9px] md:text-xs uppercase tracking-[0.25em] leading-none mt-1 w-full text-center">CRECI 38258-J</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center md:justify-start gap-4">
                <a href="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-slate-900 hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all">
                  <Share2 size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-slate-900 hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all">
                  <Globe size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-slate-900 hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all">
                  <Link size={20} />
                </a>
              </div>
            </div>

            <div className="text-center md:text-left">
              <h4 className="text-foreground font-bold text-xl mb-6 md:mb-8 uppercase tracking-widest font-heading">Atendimento</h4>
              <ul className="space-y-6 flex flex-col items-center md:items-start">
                <li className="flex flex-col md:flex-row items-center md:items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-black/5 rounded-2xl flex items-center justify-center text-[var(--color-accent)] shadow-inner">
                    <Phone size={24} className="scale-75 md:scale-100" />
                  </div>
                  <div className="text-slate-600 font-medium">
                    <p className="font-bold text-foreground text-lg md:text-xl tracking-tighter leading-none">(11) 2405-0300 / 2407-6900</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] mt-1 font-black opacity-50">Fixo Comercial</p>
                  </div>
                </li>
                <li className="flex flex-col md:flex-row items-center md:items-start gap-4 group">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-black/5 rounded-2xl flex items-center justify-center text-[var(--color-accent)] shadow-inner shrink-0">
                    <MessageSquare size={24} className="scale-75 md:scale-100" />
                  </div>
                  <div className="text-slate-600 font-medium flex-1 flex flex-col items-center md:items-start">
                    <div className="flex flex-col gap-2 items-center md:items-start">
                      <div>
                        <p className="font-bold text-foreground text-lg md:text-xl tracking-tighter leading-none">(11) 2405-0300</p>
                      </div>
                      <Button 
                        onClick={() => window.open('https://wa.me/551124050300', '_blank')}
                        className="bg-[#25D366] text-white hover:bg-white hover:text-slate-900 rounded-xl px-4 h-10 border-none font-black transition-all duration-300 shadow-lg text-[10px] uppercase tracking-widest flex items-center gap-2 w-fit"
                      >
                        <MessageSquare size={14} />
                        WhatsApp
                      </Button>
                    </div>
                  </div>
                </li>
                <li className="flex flex-col md:flex-row items-center md:items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-black/5 rounded-2xl flex items-center justify-center text-[var(--color-accent)] shadow-inner shrink-0">
                    <UserCheck size={24} className="scale-75 md:scale-100" />
                  </div>
                  <div className="text-slate-600 font-medium flex flex-col items-center md:items-start">
                    <div className="flex flex-col gap-2">
                      <p className="font-bold text-foreground text-xs md:text-sm uppercase tracking-wider leading-tight text-center md:text-left">CRECI 151545-F (Perito)</p>
                      <p className="font-bold text-foreground text-[10px] md:text-xs uppercase tracking-[0.1em] opacity-70 text-center md:text-left">CNAE 49386</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="text-center md:text-left">
              <h4 className="text-foreground font-bold text-xl mb-6 md:mb-8 uppercase tracking-widest font-heading">Localização</h4>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4 px-4 md:px-0">
                <MapPin className="text-[var(--color-accent)] shrink-0 mt-1" size={20} />
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=Avenida+Otávio+Braga+de+Mesquita+3935+Parque+São+Geraldo+Guarulhos+SP" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-600 leading-relaxed font-medium text-sm md:text-base text-center md:text-left hover:text-[var(--color-accent)] transition-colors group"
                >
                  Avenida Otávio Braga de Mesquita, Nº 3935<br />
                  Parque São Geraldo - Guarulhos / SP
                  <span className="block text-[10px] uppercase tracking-wider text-[var(--color-accent)] mt-2 font-bold group-hover:underline">Ver no Google Maps / Traçar Rota</span>
                </a>
              </div>
              <div className="mt-8 rounded-xl overflow-hidden border border-white/10 shadow-lg h-48">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3660.366479155255!2d-46.51065792471616!3d-23.4472097788816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce8b598d73b0a7%3A0x633d74c8b6b15805!2sAv.%20Ot%C3%A1vio+Braga+de+Mesquita%2C+3935+-+Vila+Florida%2C+Guarulhos+-+SP%2C+07191-000!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa de Localização Territorial Imóveis"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 text-center">
            <p className="text-slate-600 text-sm font-medium tracking-wide">
              © 2026 Territorial Imóveis - CRECI 38258-J. Segurança Jurídica.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}