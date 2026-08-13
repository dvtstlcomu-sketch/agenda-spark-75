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
  Filter
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PROPERTIES = [
  {
    id: 1,
    title: "Mansão Contemporânea Alphaville",
    type: "Residencial",
    status: "Venda",
    price: "R$ 4.500.000",
    location: "Alphaville, Barueri",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
    beds: 5,
    baths: 6,
    area: "450m²",
    description: "Projeto assinado com acabamentos em mármore e integração total."
  },
  {
    id: 2,
    title: "Cobertura Duplex Itaim Bibi",
    type: "Apartamento",
    status: "Locação",
    price: "R$ 25.000/mês",
    location: "Itaim Bibi, São Paulo",
    image: "https://images.unsplash.com/photo-1600607687940-4e524cb35a36?auto=format&fit=crop&q=80",
    beds: 3,
    baths: 4,
    area: "280m²",
    description: "Vista panorâmica 360º para o skyline de São Paulo."
  },
  {
    id: 3,
    title: "Terreno Industrial Estratégico",
    type: "Terreno",
    status: "Venda",
    price: "Sob Consulta",
    location: "Guarulhos, SP",
    image: "https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&q=80",
    beds: 0,
    baths: 0,
    area: "12.000m²",
    description: "Localização privilegiada próximo ao Aeroporto Internacional."
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
    title: "Loft Industrial Pinheiros",
    type: "Apartamento",
    status: "Locação",
    price: "R$ 8.500/mês",
    location: "Pinheiros, São Paulo",
    image: "https://images.unsplash.com/photo-1536376074432-a7ab1e07c84a?auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
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
    title: "Territorial Imóveis | Silvio Moura - Perito Imobiliário",
    meta: [
      { name: "description", content: "Excelência na Compra, Venda e Avaliação de Imóveis. Especialistas em intermediação imobiliária de alto e médio porte, topografia e perícia judicial." },
      { property: "og:title", content: "Territorial Imóveis | Silvio Moura" },
      { property: "og:description", content: "Excelência na Compra, Venda e Avaliação de Imóveis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ]
  })
});

function Index() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen font-sans bg-[var(--color-background)]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <img 
                src="/favicon.png" 
                alt="Territorial Logo" 
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="w-12 h-12 bg-[var(--color-navy)] hidden items-center justify-center rounded-lg">
                <Building2 className="text-[var(--color-accent)] w-7 h-7" />
              </div>
              <span className="text-[var(--color-navy)] font-bold text-xl tracking-tight uppercase">TERRITORIAL</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <a href="#inicio" className="hover:text-[var(--color-navy)] transition-colors">Início</a>
              <a href="#imoveis" className="hover:text-[var(--color-navy)] transition-colors">Imóveis</a>
              <a href="#sobre" className="hover:text-[var(--color-navy)] transition-colors">Quem Somos</a>
              <a href="#depoimentos" className="hover:text-[var(--color-navy)] transition-colors">Testemunhos</a>
            </div>

            <Button className="bg-[var(--color-navy)] text-white hover:bg-[var(--color-navy)]/90 rounded-full px-6">
              Fale Conosco
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative pt-32 pb-20 lg:pt-48 overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-extrabold text-[var(--color-navy)] mb-6 tracking-tight">
              Encontre o seu imóvel de <span className="text-[var(--color-accent)]">alto padrão</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10">
              A melhor curadoria de terrenos, casas e investimentos imobiliários.
            </p>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-2xl shadow-xl shadow-slate-200/50 flex flex-col md:flex-row gap-4 border border-slate-100">
              <input type="text" placeholder="O que você procura?" className="flex-1 h-14 px-6 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--color-accent)] outline-none" />
              <select className="h-14 px-4 rounded-xl border border-slate-200 text-slate-600 outline-none bg-white">
                <option>Tipo de Imóvel</option>
                <option>Residencial</option>
                <option>Apartamento</option>
                <option>Comercial</option>
                <option>Terreno</option>
              </select>
              <select className="h-14 px-4 rounded-xl border border-slate-200 text-slate-600 outline-none bg-white">
                <option>Finalidade</option>
                <option>Compra</option>
                <option>Venda</option>
                <option>Locação</option>
              </select>
              <Button className="h-14 px-8 bg-[var(--color-navy)] rounded-xl font-bold gap-2">
                <Search size={20} /> Buscar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Property Showcase */}
      <section id="imoveis" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-navy)] mb-4 tracking-tight">Imóveis em Destaque</h2>
              <p className="text-slate-600">Uma seleção exclusiva de propriedades disponíveis para venda e locação.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-full border-slate-200 hover:bg-slate-50 transition-colors">
                Ver todos os imóveis <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROPERTIES.map((property) => (
              <div key={property.id} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-[var(--color-navy)] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                      {property.status}
                    </span>
                    <span className="bg-white/90 backdrop-blur-sm text-[var(--color-navy)] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/20">
                      {property.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 text-slate-400 text-sm mb-2">
                    <MapPin size={14} />
                    <span>{property.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-navy)] mb-3 leading-tight group-hover:text-[var(--color-accent)] transition-colors">
                    {property.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2">{property.description}</p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div className="flex gap-4 text-slate-600 text-sm font-medium">
                      {property.beds > 0 && (
                        <div className="flex items-center gap-1.5">
                          <Bed size={16} className="text-slate-400" />
                          <span>{property.beds}</span>
                        </div>
                      )}
                      {property.baths > 0 && (
                        <div className="flex items-center gap-1.5">
                          <Bath size={16} className="text-slate-400" />
                          <span>{property.baths}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <Maximize size={16} className="text-slate-400" />
                        <span>{property.area}</span>
                      </div>
                    </div>
                    <span className="text-lg font-extrabold text-[var(--color-navy)]">
                      {property.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Area / Form */}
      <section id="anuncie" className="py-24 bg-[var(--color-navy)] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-12 lg:mb-0">
              <span className="text-[var(--color-gold)] font-bold uppercase tracking-widest mb-4 block">Área do Cliente</span>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Envie as Fotos e Dados do seu Imóvel</h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Deseja vender ou avaliar seu terreno/imóvel? Preencha o formulário e anexe as fotos. Nosso perito analisará seu material.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="text-[var(--color-gold)]" />
                  </div>
                  <p className="text-lg">Análise técnica profissional</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="text-[var(--color-gold)]" />
                  </div>
                  <p className="text-lg">Sigilo e segurança jurídica</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl">
              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[var(--color-navy)] font-semibold text-sm">Seu Nome Completo</label>
                    <input type="text" className="w-full h-12 px-4 rounded-xl border border-gray-200 text-[var(--color-navy)] focus:ring-2 focus:ring-[var(--color-gold)] outline-none" placeholder="Ex: João Silva" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[var(--color-navy)] font-semibold text-sm">Telefone / WhatsApp</label>
                    <input type="tel" className="w-full h-12 px-4 rounded-xl border border-gray-200 text-[var(--color-navy)] focus:ring-2 focus:ring-[var(--color-gold)] outline-none" placeholder="(11) 99999-9999" />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[var(--color-navy)] font-semibold text-sm">Tipo de Imóvel</label>
                    <select className="w-full h-12 px-4 rounded-xl border border-gray-200 text-[var(--color-navy)] focus:ring-2 focus:ring-[var(--color-gold)] outline-none bg-white">
                      <option>Terreno / Gleba</option>
                      <option>Imóvel de Médio Porte</option>
                      <option>Residência de Alto Padrão</option>
                      <option>Comercial</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[var(--color-navy)] font-semibold text-sm">Finalidade</label>
                    <select className="w-full h-12 px-4 rounded-xl border border-gray-200 text-[var(--color-navy)] focus:ring-2 focus:ring-[var(--color-gold)] outline-none bg-white">
                      <option>Quero Vender</option>
                      <option>Quero Avaliação / Perícia</option>
                      <option>Projetos / Topografia</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[var(--color-navy)] font-semibold text-sm">Descrição / Localização</label>
                  <textarea className="w-full p-4 rounded-xl border border-gray-200 text-[var(--color-navy)] focus:ring-2 focus:ring-[var(--color-gold)] outline-none min-h-[100px]" placeholder="Conte-nos mais sobre o imóvel..."></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-[var(--color-navy)] font-semibold text-sm">Fotos do Imóvel</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[var(--color-gold)] transition-colors cursor-pointer bg-gray-50 group">
                    <Upload className="mx-auto text-gray-400 mb-2 group-hover:text-[var(--color-gold)]" />
                    <p className="text-[var(--color-navy)] font-medium">Clique aqui para carregar as fotos</p>
                    <p className="text-gray-400 text-xs">PNG, JPG ou JPEG até 10MB</p>
                  </div>
                </div>

                <Button className="w-full bg-[var(--color-gold)] hover:bg-[var(--color-gold)]/90 text-white h-14 rounded-xl font-bold text-lg shadow-lg border-none cursor-pointer">
                  Enviar Informações ao Perito
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Trajectory */}
      <section id="sobre" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80" 
                  alt="Silvio Moura - Perito Imobiliário"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-[var(--color-navy)] p-8 rounded-3xl text-white hidden md:block">
                <p className="text-[var(--color-gold)] font-bold text-3xl mb-1 tracking-tighter">CRECI</p>
                <p className="text-4xl font-black mb-1">15145 F</p>
                <p className="text-gray-400 text-sm uppercase font-bold tracking-widest">Silvio Moura - Perito</p>
              </div>
            </div>

            <div className="order-1 lg:order-2 mb-16 lg:mb-0">
              <span className="text-[var(--color-gold)] font-bold uppercase tracking-widest mb-4 block">Nossa Trajetória</span>
              <h2 className="text-4xl lg:text-5xl font-bold text-[var(--color-navy)] mb-8">Silvio Moura: Tradição e Excelência</h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  A história de Silvio Moura no mercado imobiliário é marcada por uma busca incessante pela perfeição técnica e ética profissional. Com o CRECI 15145 F, Silvio consolidou-se como um dos peritos mais respeitados da região, unindo o conhecimento profundo da legislação territorial à paixão por realizar sonhos através de imóveis exclusivos.
                </p>
                <p>
                  Ao longo de décadas, Silvio transformou a Territorial Imóveis em um hub de soluções sofisticadas, onde cada terreno é analisado com precisão cirúrgica e cada mansão é selecionada por seu design e valor intrínseco. Sua expertise como Perito Judicial traz uma camada de segurança que poucos no mercado podem oferecer.
                </p>
                <p>
                  Mais do que vender propriedades, Silvio Moura constrói relacionamentos baseados na confiança absoluta, garantindo que cada investimento seja sólido e cada transação, impecável.
                </p>
              </div>
              
              <div className="mt-10 p-8 bg-white shadow-xl shadow-slate-200/50 rounded-2xl border-l-4 border-[var(--color-gold)]">
                <p className="text-[var(--color-navy)] italic text-xl font-medium mb-4">"Minha missão é elevar o padrão do mercado imobiliário, integrando tecnologia de ponta, como topografia avançada e drones, à segurança jurídica de uma perícia especializada."</p>
                <p className="text-[var(--color-gold)] font-bold uppercase tracking-widest text-sm">— Silvio Moura</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" className="py-24 bg-[var(--color-navy)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[var(--color-gold)] font-bold uppercase tracking-widest mb-4 block">Depoimentos</span>
            <h2 className="text-4xl md:text-5xl font-bold">O Que Dizem Nossos Clientes</h2>
          </div>

            <div className="grid md:grid-cols-3 gap-8">
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
              }
            ].map((t, i) => (
              <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 group">
                <MessageSquare className="text-[var(--color-accent)] mb-6 w-10 h-10 group-hover:scale-110 transition-transform" />
                <p className="text-lg text-slate-300 italic mb-8">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[var(--color-accent)]/30 group-hover:border-[var(--color-accent)] transition-colors">
                    <img src={t.image} alt={t.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">{t.author}</p>
                    <p className="text-[var(--color-accent)] text-sm font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[var(--color-navy)] font-bold text-4xl mb-4">Esclareça Suas Dúvidas</h2>
            <p className="text-[var(--color-gold)] font-bold uppercase tracking-widest">Perguntas Frequentes (FAQ)</p>
          </div>

          <div className="space-y-4">
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
              <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors text-left border-none cursor-pointer"
                >
                  <span className="text-lg font-bold text-[var(--color-navy)]">{faq.q}</span>
                  <ChevronDown className={cn("text-[var(--color-accent)] transition-transform", activeFaq === i && "rotate-180")} />
                </button>
                {activeFaq === i && (
                  <div className="p-6 bg-slate-50 text-slate-600 border-t border-slate-100 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <img 
                  src="/favicon.png" 
                  alt="Territorial Logo" 
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="w-12 h-12 bg-[var(--color-navy)] hidden items-center justify-center rounded-lg">
                  <Building2 className="text-[var(--color-accent)] w-7 h-7" />
                </div>
                <span className="text-[var(--color-navy)] font-bold text-xl tracking-tight uppercase">TERRITORIAL</span>
              </div>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Referência em intermediação imobiliária de alto padrão, loteamentos, topografia e perícia judicial.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center text-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-white transition-all">
                  <Share2 size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center text-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-white transition-all">
                  <Globe size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center text-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-white transition-all">
                  <Link size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-[var(--color-navy)] font-bold text-xl mb-6">Atendimento</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <Phone className="text-[var(--color-accent)] shrink-0 mt-1" size={20} />
                  <div className="text-slate-600">
                    <p className="font-bold text-[var(--color-navy)]">(11) 2407-6900</p>
                    <p className="text-sm">Linha Fixa</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <MessageSquare className="text-[var(--color-accent)] shrink-0 mt-1" size={20} />
                  <div className="text-slate-600">
                    <p className="font-bold text-[var(--color-navy)]">(11) 96462-4491</p>
                    <p className="text-sm">WhatsApp / Celular</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <UserCheck className="text-[var(--color-accent)] shrink-0 mt-1" size={20} />
                  <div className="text-slate-600">
                    <p className="font-bold text-[var(--color-navy)]">CRECI 15145 F</p>
                    <p className="text-sm">Silvio Moura - Perito</p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[var(--color-navy)] font-bold text-xl mb-6">Localização</h4>
              <div className="flex items-start gap-4">
                <MapPin className="text-[var(--color-accent)] shrink-0 mt-1" size={20} />
                <p className="text-slate-600 leading-relaxed">
                  Avenida Otávio Braga de Mesquita, Nº 3935<br />
                  Guarulhos / SP
                </p>
              </div>
              <div className="mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&q=80&w=600" 
                  alt="Office Location Map"
                  className="w-full h-32 object-cover rounded-xl grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-gray-200 text-center">
            <p className="text-gray-400 text-sm">
              © 2026 Territorial Imóveis - Silvio Moura CRECI 15145 F. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}