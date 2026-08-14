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
    title: "Administração de Imóveis e Condomínios",
    description: "Gestão completa de patrimônio imobiliário e administração condominial com transparência.",
    icon: <Building2 className="w-8 h-8 text-[var(--color-accent)]" />,
  },
  {
    id: 2,
    title: "Avaliação Mercadológica e Laudo Pericial",
    description: "Perícia judicial, laudos para usucapião e avaliações técnicas rigorosas.",
    icon: <UserCheck className="w-8 h-8 text-[var(--color-accent)]" />,
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
    title: "Drone para Avaliação Imobiliária",
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
    title: "Estruturação Imobiliária e Despachante",
    description: "Regularização documental, estrutura planejada e consultoria especializada de despachante.",
    icon: <Layers className="w-8 h-8 text-[var(--color-accent)]" />,
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
          <div className="flex justify-between items-center h-20 md:h-32">
            <div className="flex items-center gap-0">
              <div className="w-16 h-16 md:w-32 md:h-32 flex items-center justify-center overflow-visible">
                <img 
                  src={logo2.url} 
                  alt="Territorial Imóveis Logo" 
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-slate-900 font-black text-lg md:text-3xl lg:text-4xl tracking-tighter uppercase font-brand drop-shadow-sm leading-tight">TERRITORIAL IMÓVEIS</span>
                <span className="text-[var(--color-accent)] font-black text-[10px] md:text-xs uppercase tracking-[0.2em] leading-none">CRECI 38258-J</span>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-10 text-xs font-black uppercase tracking-[0.25em] text-slate-900">
              <a href="#inicio" className="hover:text-[var(--color-accent)] transition-all relative group py-2">
                Início
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent)] transition-all group-hover:w-full"></span>
              </a>
              <a href="#projetos" className="hover:text-[var(--color-accent)] transition-all relative group py-2">
                Projetos
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent)] transition-all group-hover:w-full"></span>
              </a>
              <a href="#imoveis" className="hover:text-[var(--color-accent)] transition-all relative group py-2">
                Imóveis
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent)] transition-all group-hover:w-full"></span>
              </a>
              <a href="#sobre" className="hover:text-[var(--color-accent)] transition-all relative group py-2">
                Nossa História
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent)] transition-all group-hover:w-full"></span>
              </a>
              <a href="#anuncie" className="hover:text-[var(--color-accent)] transition-all relative group py-2">
                Anunciar
              </a>
            </div>

            <div className="flex items-center gap-4">
              <Button 
                onClick={() => window.open('https://wa.me/551124050300', '_blank')}
                className="hidden md:flex bg-slate-900 text-white hover:bg-[var(--color-accent)] hover:text-slate-900 rounded-2xl px-8 h-12 border-none font-black transition-all duration-500 shadow-xl hover:scale-105 active:scale-95 uppercase tracking-[0.1em] text-xs"
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
              <a href="#projetos" onClick={() => setIsMenuOpen(false)} className="p-4 hover:bg-black/5 rounded-xl">Projetos</a>
              <a href="#imoveis" onClick={() => setIsMenuOpen(false)} className="p-4 hover:bg-black/5 rounded-xl">Imóveis</a>
              <a href="#sobre" onClick={() => setIsMenuOpen(false)} className="p-4 hover:bg-black/5 rounded-xl">Nossa História</a>
              <a href="#anuncie" onClick={() => setIsMenuOpen(false)} className="p-4 hover:bg-black/5 rounded-xl">Anunciar</a>
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
      <section id="inicio" className="relative pt-24 pb-16 md:pt-56 md:pb-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://ofjnackhyavgpkfwbacx.supabase.co/storage/v1/object/public/prompt-images/2026-08-13/c14a5ede-f10c-463a-84f2-86a49ec04d10.jpg" 
            alt="Skyline da Cidade de Guarulhos" 
            className="w-full h-full object-cover opacity-20 transition-all duration-700" 
          />
          <div className="absolute inset-0 bg-slate-900/2" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6 md:mb-8 space-y-4">
              <span className="inline-block px-4 py-1.5 md:px-6 md:py-2 bg-slate-900/10 text-slate-900 font-black text-[10px] md:text-xs uppercase tracking-[0.4em] rounded-full border border-slate-900/20 shadow-sm">
                Inteligência e Precisão
              </span>
              <p className="text-slate-900 font-black uppercase tracking-[0.05em] md:tracking-[0.1em] text-xs md:text-sm drop-shadow-sm animate-pulse max-w-lg mx-auto leading-relaxed px-4">
                "A chave da sua casa própria não abre apenas uma porta, ela realiza o seu maior sonho e constrói o seu futuro."
              </p>
            </div>
            <h1 className="text-lg md:text-3xl font-bold text-foreground mb-6 md:mb-8 tracking-tighter uppercase leading-tight font-heading drop-shadow-2xl opacity-90 px-4">
              "Tudo posso naquele que me fortalece"
            </h1>
            <p className="text-base md:text-2xl text-foreground/70 mb-10 md:mb-14 font-medium tracking-tight max-w-2xl mx-auto leading-relaxed px-4">
              A inteligência imobiliária em primeiro lugar. Especialistas em Perícia Judicial e Inteligência de alta precisão.
            </p>

            {/* Search Bar Premium */}
            <div className="bg-white/60 backdrop-blur-2xl p-4 md:p-4 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/40 flex flex-col md:flex-row gap-3 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] ring-1 ring-black/5 mx-2 md:mx-0">
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
        </div>
      </section>

      {/* Technical Areas Section (Moved up) */}
      <section className="py-16 md:py-24 bg-[#e2e2e2] border-b border-black/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-[var(--color-accent)] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-sm mb-4 md:mb-6 block drop-shadow-sm">Expertise Técnica</span>
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
        </div>
      </section>


      {/* Property Showcase */}
      <section id="imoveis" className="py-20 md:py-32 bg-transparent relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 uppercase tracking-tighter font-heading">Curadoria Técnica</h2>
              <p className="text-slate-600 font-medium text-base md:text-lg px-4 md:px-0">Ativos imobiliários selecionados sob rigorosa análise pericial e potencial de valorização estratégica.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 md:px-0">
              <Button 
                onClick={() => document.getElementById('anuncie')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-full bg-[var(--color-accent)] text-slate-900 hover:scale-105 transition-all px-8 h-12 md:h-14 font-black uppercase tracking-wider shadow-lg w-full sm:w-auto"
              >
                Incluir Imóvel <Plus size={18} className="ml-2" />
              </Button>
              <Button variant="outline" className="rounded-full border-slate-200 text-slate-900 hover:bg-white/50 transition-colors bg-white/30 px-8 h-12 md:h-14 w-full sm:w-auto">
                Catálogo Completo <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2 md:px-0">
            {PROPERTIES.slice(0, 6).map((property) => (
              <div key={property.id} className="group bg-white/60 backdrop-blur-md rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/40 hover:border-[var(--color-accent)] transition-all duration-700 shadow-xl hover:-translate-y-3">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-[var(--color-navy)] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                      {property.status}
                    </span>
                    <span className="bg-white/90 backdrop-blur-sm text-[var(--color-navy)] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-gray-200">
                      {property.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 text-slate-400 text-sm mb-2 font-medium">
                    <MapPin size={14} />
                    <span>{property.location}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 leading-tight group-hover:text-[var(--color-accent)] transition-colors font-heading tracking-wide">
                    {property.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-8 line-clamp-2 leading-relaxed font-medium">{property.description}</p>
                  
                  <div className="flex items-center justify-between pt-8 border-t border-slate-100">
                    <div className="flex gap-4 text-slate-400 text-sm font-bold uppercase tracking-wider">
                      {property.beds > 0 && (
                        <div className="flex items-center gap-1.5">
                          <Bed size={16} className="text-[var(--color-accent)]" />
                          <span>{property.beds}</span>
                        </div>
                      )}
                      {property.baths > 0 && (
                        <div className="flex items-center gap-1.5">
                          <Bath size={16} className="text-[var(--color-accent)]" />
                          <span>{property.baths}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <Maximize size={16} className="text-[var(--color-accent)]" />
                        <span>{property.area}</span>
                      </div>
                    </div>
                    <span className="text-lg font-black text-slate-900">
                      {property.price}
                    </span>
                  </div>
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
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-12 lg:mb-0 text-center lg:text-left px-4">
              <span className="text-[var(--color-accent)] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-sm mb-4 block">Consultoria Técnica</span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tighter leading-tight">Análise e Perícia Profissional</h2>
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed font-medium">
                Deseja vender ou avaliar seu terreno/imóvel? Nossa equipe técnica realiza o levantamento completo com segurança jurídica.
              </p>
              <div className="space-y-4 md:space-y-6 flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="text-[var(--color-accent)]" size={20} />
                  </div>
                  <p className="text-base md:text-lg">Análise técnica profissional</p>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 md:w-12 md:h-12 bg-black/5 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="text-[var(--color-accent)]" size={20} />
                  </div>
                  <p className="text-base md:text-lg">Sigilo e segurança jurídica</p>
                </div>
              </div>
            </div>

            <div className="bg-white/40 backdrop-blur-3xl p-6 md:p-14 rounded-[2rem] md:rounded-[3rem] border border-black/5 shadow-2xl mx-4 md:mx-0">
              <form className="space-y-6 md:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                  <div className="space-y-3">
                    <label className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em]">Nome do Requerente</label>
                    <input type="text" className="w-full h-16 px-6 rounded-2xl bg-white/40 border border-black/5 text-slate-900 focus:ring-2 focus:ring-[var(--color-accent)] outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="Ex: Silvio Moura" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em]">Contato Estratégico</label>
                    <input type="tel" className="w-full h-16 px-6 rounded-2xl bg-white/40 border border-black/5 text-slate-900 focus:ring-2 focus:ring-[var(--color-accent)] outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="(11) 2405-0300" />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em]">Categoria do Ativo</label>
                    <select className="w-full h-16 px-6 rounded-2xl bg-white/40 border border-black/5 text-slate-900 focus:ring-2 focus:ring-[var(--color-accent)] outline-none cursor-pointer font-bold appearance-none">
                      <option className="bg-white">Terreno / Gleba</option>
                      <option className="bg-white">Residência Alto Padrão</option>
                      <option className="bg-white">Industrial / Logístico</option>
                      <option className="bg-white">Comercial</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em]">Objetivo da Perícia</label>
                    <select className="w-full h-16 px-6 rounded-2xl bg-white/40 border border-black/5 text-slate-900 focus:ring-2 focus:ring-[var(--color-accent)] outline-none cursor-pointer font-bold appearance-none text-[9px] sm:text-xs md:text-sm">
                      <option className="bg-white">Avaliação Mercadológica e Laudo Judicial</option>
                      <option className="bg-white">Usucapião / Regularização</option>
                      <option className="bg-white">Projetos de Inteligência</option>
                      <option className="bg-white">Venda Estratégica</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em]">Descrição Estratégica</label>
                  <textarea className="w-full p-5 rounded-2xl bg-white/40 border border-black/5 text-slate-900 focus:ring-2 focus:ring-[var(--color-accent)] outline-none min-h-[120px] transition-all placeholder:text-slate-400" placeholder="Detalhes técnicos ou localização específica..."></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em]">Upload de Documentação/Fotos</label>
                  <div className="border-2 border-dashed border-black/10 rounded-2xl p-10 text-center hover:border-[var(--color-accent)] transition-all cursor-pointer bg-white/40 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-accent)]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Upload className="mx-auto text-gray-500 mb-4 group-hover:text-[var(--color-accent)] transition-colors" size={32} />
                    <p className="text-white font-bold text-lg mb-1 tracking-tight">Anexar arquivos técnicos</p>
                    <p className="text-gray-500 text-xs uppercase tracking-widest font-black">Escrituras, Projetos ou Fotos (Até 50MB)</p>
                  </div>
                </div>

                <Button className="w-full bg-[var(--color-accent)] text-slate-900 h-16 md:h-20 rounded-xl md:rounded-2xl font-black text-lg md:text-xl shadow-xl border-none cursor-pointer uppercase tracking-[0.1em] md:tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center text-center whitespace-normal leading-tight px-4">
                  Solicitar Perícia
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CEO & Story */}
      <section id="sobre" className="py-20 md:py-40 bg-transparent relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-200/50 -skew-x-12 translate-x-1/2 opacity-30 z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-24 items-center">
            <div className="order-2 lg:order-1 relative h-full min-h-[300px] md:min-h-[500px] flex items-center mb-12 lg:mb-0">
              <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                <img 
                  src="https://ofjnackhyavgpkfwbacx.supabase.co/storage/v1/object/public/prompt-images/2026-08-13/ab71f7bc-c10f-429e-b905-e3aa2e2c6943.jpg" 
                  alt="Background Silvio Moura"
                  className="w-full h-full object-cover opacity-40 transition-all duration-1000 grayscale-[30%] rounded-3xl"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 mb-12 lg:mb-0 text-center lg:text-left">
              <span className="text-[var(--color-accent)] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-sm mb-4 md:mb-6 block drop-shadow-sm">Trajetória de Liderança</span>
              <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 md:mb-10 uppercase tracking-tighter leading-tight font-heading px-4 lg:px-0">
                Nossa História
              </h2>
              <div className="space-y-6 md:space-y-10 text-slate-600 text-lg md:text-xl leading-relaxed font-medium px-4 lg:px-0">
                <p className="border-l-4 border-[var(--color-accent)] pl-6 md:pl-8 py-4 bg-white/30 backdrop-blur-sm rounded-r-[1.5rem] md:rounded-r-[2rem] text-left">
                  A <strong>Territorial Imóveis</strong> nasceu da necessidade de um mercado exigente que busca, em seus fornecedores de serviços, algo além do básico, tais como confiança, sigilo e segurança nas negociações imobiliárias.
                </p>
                <div className="space-y-4 text-left">
                  <p className="text-sm md:text-xl">
                    Nossa história foi construída ao longo de anos de experiência, atuando em diversos segmentos imobiliários. A Territorial Imóveis tem amplo conhecimento em laudo pericial para usucapião, laudo de avaliação mercadológica, estruturação imobiliária e despachante imobiliário na área documental.
                  </p>
                  <div className="mt-8 flex flex-col items-center lg:items-start text-center lg:text-left">
                    <p className="text-slate-900 font-bold text-2xl md:text-4xl font-brand tracking-tighter inline-block border-b-4 border-[var(--color-accent)] pb-1 mb-2">
                      PERITO JUDICIAL E CEO
                    </p>
                    <p className="text-slate-900 font-black text-[7px] min-[320px]:text-[8px] sm:text-[10px] md:text-sm uppercase tracking-normal sm:tracking-widest block opacity-90 max-w-full overflow-hidden break-words whitespace-normal leading-tight text-center lg:text-left">
                      OBJETIVO DA PERÍCIA AVALIAÇÃO MERCADOLÓGICA E LAUDO JUDICIAL
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 px-4 lg:px-0">
                <Button 
                  onClick={() => window.open('https://wa.me/551124050300', '_blank')}
                  className="w-full sm:w-auto bg-slate-900 text-white hover:bg-[var(--color-accent)] hover:text-slate-900 h-16 md:h-20 px-10 md:px-14 rounded-xl md:rounded-2xl font-black uppercase tracking-[0.2em] border-none transition-all duration-500 shadow-xl"
                >
                  Fale com o CEO
                </Button>
              </div>
              
              <div className="mt-12 md:mt-16 p-6 md:p-10 bg-white/40 backdrop-blur-md border border-black/5 rounded-[2rem] md:rounded-[2.5rem] border-l-8 border-[var(--color-accent)] relative overflow-hidden group mx-4 lg:mx-0 text-left">
                <p className="text-slate-700 italic text-xl md:text-2xl font-light mb-6 leading-relaxed relative z-10 font-heading">"Minha missão é elevar o padrão do mercado imobiliário, integrando tecnologia de ponta à segurança jurídica."</p>
                <p className="text-[var(--color-accent)] font-black uppercase tracking-[0.4em] text-[10px] md:text-xs relative z-10 font-heading">— Silvio Moura</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" className="py-32 bg-transparent relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-200/20 via-transparent to-slate-200/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-24">
            <span className="text-[var(--color-accent)] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-sm mb-4 md:mb-6 block drop-shadow-sm">Credibilidade & Vozes</span>
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

      {/* FAQ */}
      <section id="faq" className="py-32 bg-[#e2e2e2] relative overflow-hidden border-y border-black/5">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-black/5 -skew-x-12 translate-x-1/2 opacity-20 z-0" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <span className="text-[var(--color-accent)] font-black uppercase tracking-[0.4em] text-sm mb-6 block drop-shadow-sm">Suporte & Consultoria</span>
            <h2 className="text-5xl md:text-7xl font-bold text-foreground uppercase tracking-tighter font-heading leading-none">Dúvidas Frequentes</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "Como funciona o processo de Perícia e Avaliação Imobiliária?",
                a: "A perícia realizada pelo Silvio Moura envolve vistorias técnicas, levantamento documental, análise de mercado e parecer fundamentado conforme as normas da ABNT, emitindo um laudo com valor legal."
              },
              {
                q: "Qual a importância da medição topográfica ao comprar ou vender um terreno?",
                a: "A topografia garante que as metragens reais do imóvel correspondem exatamente ao registrado na escritura pública, evitando litígios e garantindo aprovação de projetos."
              },
              {
                q: "Como posso cadastrar meu imóvel para venda no site?",
                a: "Basta utilizar a seção 'Anuncie Seu Imóvel', preencher os dados de contato e realizar o upload das fotos. Nossa equipe entrará em contato para agendar uma vistoria."
              }
            ].map((faq, i) => (
              <div key={i} className="border border-black/5 rounded-[2rem] overflow-hidden bg-white/40 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-[var(--color-accent)]/30">
                <button 
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between p-8 hover:bg-black/5 transition-all text-left border-none cursor-pointer bg-transparent group"
                >
                  <span className="text-xl font-bold text-foreground font-heading tracking-wide group-hover:text-[var(--color-accent)] transition-colors">{faq.q}</span>
                  <ChevronDown className={cn("text-[var(--color-accent)] transition-transform duration-500", activeFaq === i && "rotate-180")} />
                </button>
                {activeFaq === i && (
                  <div className="px-8 pb-8 pt-0 text-slate-600 border-t border-black/5 leading-relaxed font-medium animate-in fade-in slide-in-from-top-4 duration-500">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Projects Section (Moved to end) */}
      <section id="projetos" className="py-32 bg-[#e2e2e2] border-t border-black/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-black/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <span className="text-[var(--color-accent)] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-sm mb-4 md:mb-6 block drop-shadow-sm">Portfólio de Inteligência</span>
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


      {/* Footer */}
      <footer className="bg-[#e2e2e2] py-16 md:py-24 border-t border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="text-center md:text-left">
              <div className="flex flex-col items-center gap-0 mb-8 text-center">
                <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center overflow-visible">
                  <img 
                    src={logo2.url} 
                    alt="Territorial Imóveis Logo" 
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
                <span className="text-foreground font-black text-2xl md:text-3xl tracking-tighter uppercase font-brand">TERRITORIAL IMÓVEIS</span>
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
              © 2026 Territorial Imóveis - CRECI 38258-J. Inteligência de Precisão & Segurança Jurídica.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}