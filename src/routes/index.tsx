import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Droplets,
  GraduationCap,
  HeartHandshake,
  Instagram,
  Landmark,
  Menu,
  Puzzle,
  ShieldCheck,
  Stethoscope,
  Users,
  X,
} from "lucide-react";

import heroCidade from "@/assets/hero-cidade.jpg";
import giovanniFoto from "@/assets/giovanni-sanches.jpg.asset.json";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Giovanni Sanches 22 | Pré-candidato a Deputado Estadual" },
      {
        name: "description",
        content:
          "Giovanni Sanches (PL 22), ex-secretário municipal de Guarulhos, é pré-candidato a deputado estadual de São Paulo. Conheça as bandeiras: causa autista, saneamento, saúde e educação técnica.",
      },
      { property: "og:title", content: "Giovanni Sanches 22 — Deputado Estadual" },
      {
        property: "og:description",
        content:
          "Gestão comprovada em Guarulhos, agora com voz forte na Assembleia Legislativa de São Paulo. Conheça as propostas e participe.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  { href: "#inicio", label: "Início" },
  { href: "#trajetoria", label: "Trajetória" },
  { href: "#bandeiras", label: "Bandeiras" },
  { href: "#autismo", label: "Causa Autista" },
  { href: "#entregas", label: "Entregas" },
  { href: "#participe", label: "Participe" },
];

const NUMEROS = [
  { valor: "22", label: "Partido Liberal" },
  { valor: "+15", label: "Anos de vida pública" },
  { valor: "1,4M", label: "Guarulhenses representados" },
  { valor: "94", label: "Vagas na ALESP" },
];

const BANDEIRAS = [
  {
    icon: Puzzle,
    titulo: "Causa Autista",
    texto:
      "Diagnóstico precoce pela rede pública, centros de referência regionais e formação obrigatória de professores para o atendimento de crianças atípicas.",
    destaque: true,
  },
  {
    icon: Droplets,
    titulo: "Saneamento e Enchentes",
    texto:
      "Recursos estaduais para redes de esgoto nos bairros esquecidos, canalização de córregos e piscinões que tirem famílias do risco de alagamento.",
  },
  {
    icon: Stethoscope,
    titulo: "Saúde sem Fila",
    texto:
      "Mutirões de cirurgias eletivas, novos leitos regionais e exames de imagem descentralizados para acabar com a espera de meses.",
  },
  {
    icon: GraduationCap,
    titulo: "Educação que Emprega",
    texto:
      "Novas ETECs e FATECs na região, período integral e cursos técnicos alinhados às vagas reais da indústria e da logística.",
  },
  {
    icon: ShieldCheck,
    titulo: "Segurança de Verdade",
    texto:
      "Integração entre GCM, Polícia Militar e videomonitoramento estadual, com foco em iluminação e presença nas periferias.",
  },
  {
    icon: Building2,
    titulo: "Emprego e Renda",
    texto:
      "Desburocratização para o pequeno empreendedor, crédito acessível e atração de indústrias com contrapartida de vagas locais.",
  },
];

const TRAJETORIA = [
  {
    marco: "Gestão pública",
    titulo: "Secretário municipal em Guarulhos",
    texto:
      "Atuação na linha de frente da administração, com execução de obras, orçamento e atendimento direto às demandas dos bairros.",
  },
  {
    marco: "Articulação",
    titulo: "Braço direito do prefeito Lucas Sanches",
    texto:
      "Referência de confiança do grupo político que governa Guarulhos, com trânsito entre lideranças de bairro, entidades e o poder público.",
  },
  {
    marco: "Abril de 2026",
    titulo: "Lançamento da pré-candidatura",
    texto:
      "Pré-candidatura a deputado estadual pelo PL, com apoio declarado do Executivo municipal e forte repercussão nas redes.",
  },
  {
    marco: "2026",
    titulo: "Rumo à ALESP",
    texto:
      "Levar para a Assembleia Legislativa de São Paulo a experiência de quem já executou: verba estadual chegando na ponta.",
  },
];

const ENTREGAS = [
  "Escuta permanente com associações de moradores e coletivos autistas",
  "Prestação de contas pública de cada emenda destinada à região",
  "Gabinete itinerante nos bairros, sem intermediário",
  "Defesa das mães atípicas na formulação das políticas públicas",
];

const PAUTAS = ["Autismo / PCD", "Saneamento", "Saúde", "Educação", "Segurança", "Emprego"];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-gold/50 bg-gold/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-gold">
      {children}
    </span>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    whatsapp: "",
    bairro: "",
    atuacao: "Voluntário de Bairro",
    pautas: [] as string[],
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const togglePauta = (pauta: string) =>
    setForm((prev) => ({
      ...prev,
      pautas: prev.pautas.includes(pauta)
        ? prev.pautas.filter((p) => p !== pauta)
        : [...prev.pautas, pauta],
    }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Olá Giovanni! Meu nome é ${form.nome}, moro em ${form.bairro}. Quero apoiar como ${form.atuacao}. Pautas de interesse: ${form.pautas.join(", ") || "geral"}. Meu contato: ${form.whatsapp}`;
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="overflow-x-hidden">
      {/* Faixa superior */}
      <div className="bg-navy text-navy-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em]">
          <span className="flex items-center gap-2">
            <Landmark className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            Pré-campanha • Deputado Estadual
          </span>
          <span className="hidden opacity-70 sm:inline">Partido Liberal — PL 22 • São Paulo</span>
        </div>
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
          scrolled
            ? "border-border/60 bg-background/90 backdrop-blur-xl"
            : "border-transparent bg-background/60 backdrop-blur"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <a href="#inicio" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl surface-gold font-display text-2xl leading-none text-gold-foreground shadow-card">
              22
            </span>
            <span className="leading-tight">
              <span className="block font-display text-2xl tracking-wide text-foreground">
                Giovanni Sanches
              </span>
              <span className="block text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                Deputado Estadual
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild className="hidden sm:inline-flex">
              <a href="#participe">
                Quero apoiar <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <button
              type="button"
              className="rounded-md p-2 text-foreground lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Abrir menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="border-t border-border bg-background px-4 pb-4 lg:hidden">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-border/60 py-3 text-sm font-semibold text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="inicio" className="relative isolate overflow-hidden surface-hero">
        <img
          src={heroCidade}
          alt="Vista da cidade ao amanhecer"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          loading="eager"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,color-mix(in_oklab,var(--sky)_38%,transparent),transparent_60%)]"
          aria-hidden="true"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="text-navy-foreground">
            <Reveal>
              <SectionLabel>Pré-candidato • ALESP 2026</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 font-display text-5xl leading-[0.95] tracking-wide sm:text-6xl lg:text-7xl">
                Giovanni Sanches
                <span className="mt-2 block bg-gradient-to-r from-gold to-gold/60 bg-clip-text text-transparent">
                  22 • Deputado Estadual
                </span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-90">
                Ex-secretário municipal de Guarulhos e nome de confiança do grupo político do
                prefeito Lucas Sanches. Agora, a experiência de quem já executou obra e política
                pública vai defender a nossa região na Assembleia Legislativa de São Paulo.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="surface-gold text-gold-foreground shadow-lift">
                  <a href="#participe">
                    Some com a gente <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-navy-foreground/40 bg-transparent text-navy-foreground hover:bg-navy-foreground/10"
                >
                  <a href="#bandeiras">Ver as bandeiras</a>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <dl className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {NUMEROS.map((n) => (
                  <div
                    key={n.label}
                    className="rounded-xl border border-navy-foreground/15 bg-navy-foreground/5 p-3 backdrop-blur-sm"
                  >
                    <dt className="font-display text-3xl text-gold">{n.valor}</dt>
                    <dd className="text-[11px] font-bold uppercase tracking-[0.14em] opacity-80">
                      {n.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={200} className="relative">
            <div className="relative mx-auto max-w-sm">
              <div
                className="absolute -inset-4 rounded-[2rem] surface-gold opacity-30 blur-2xl"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-navy-foreground/20 bg-card shadow-lift">
                <img
                  src={giovanniFoto.url}
                  alt="Retrato de Giovanni Sanches, pré-candidato a deputado estadual pelo PL"
                  className="aspect-4/5 w-full object-cover object-top"
                  loading="eager"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/80 to-transparent p-5 text-navy-foreground">
                  <p className="font-display text-3xl tracking-wide">Giovanni Sanches</p>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                    Partido Liberal • 22
                  </p>
                </div>
              </div>
              <span className="absolute -right-3 -top-3 flex h-20 w-20 items-center justify-center rounded-full surface-gold font-display text-4xl text-gold-foreground shadow-lift">
                22
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-border bg-navy py-3 text-navy-foreground">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-xl tracking-widest">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex gap-10">
              {[
                "CAUSA AUTISTA",
                "SANEAMENTO",
                "SAÚDE SEM FILA",
                "EDUCAÇÃO TÉCNICA",
                "SEGURANÇA",
                "EMPREGO",
              ].map((t) => (
                <span key={t} className="flex items-center gap-10">
                  <span>{t}</span>
                  <span className="text-gold">•</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* TRAJETÓRIA */}
      <section id="trajetoria" className="mx-auto max-w-7xl px-4 py-20">
        <Reveal className="max-w-2xl">
          <SectionLabel>Trajetória</SectionLabel>
          <h2 className="mt-4 font-display text-4xl tracking-wide text-foreground sm:text-5xl">
            Quem já entregou, sabe cobrar
          </h2>
          <p className="mt-4 text-muted-foreground">
            Giovanni construiu sua história dentro da gestão pública, resolvendo problema de bairro
            com orçamento, prazo e responsabilidade. É essa régua que ele quer levar para o
            Legislativo estadual.
          </p>
        </Reveal>

        <div className="relative mt-12 grid gap-6 md:grid-cols-2">
          {TRAJETORIA.map((item, i) => (
            <Reveal key={item.titulo} delay={i * 90}>
              <article className="group h-full rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky">
                  {item.marco}
                </span>
                <h3 className="mt-2 font-display text-2xl tracking-wide text-card-foreground">
                  {item.titulo}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.texto}</p>
                <div
                  className="mt-5 h-1 w-12 rounded-full surface-gold transition-all duration-300 group-hover:w-24"
                  aria-hidden="true"
                />
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BANDEIRAS */}
      <section id="bandeiras" className="border-y border-border bg-secondary/60 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="max-w-2xl">
            <SectionLabel>Bandeiras</SectionLabel>
            <h2 className="mt-4 font-display text-4xl tracking-wide text-foreground sm:text-5xl">
              Seis compromissos, zero enrolação
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BANDEIRAS.map((b, i) => (
              <Reveal key={b.titulo} delay={i * 70}>
                <article
                  className={`h-full rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
                    b.destaque
                      ? "border-sky/40 autism-pattern shadow-card"
                      : "border-border bg-card shadow-card"
                  }`}
                >
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${
                      b.destaque ? "bg-sky text-sky-foreground" : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <b.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-2xl tracking-wide text-foreground">
                    {b.titulo}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.texto}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AUTISMO */}
      <section id="autismo" className="relative overflow-hidden py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2">
          <Reveal>
            <SectionLabel>Prioridade absoluta</SectionLabel>
            <h2 className="mt-4 font-display text-4xl tracking-wide text-foreground sm:text-5xl">
              A causa autista no centro do mandato
            </h2>
            <p className="mt-4 text-muted-foreground">
              Nenhuma família deve esperar anos por um diagnóstico ou brigar na Justiça por terapia.
              Giovanni assume o compromisso de transformar a rede estadual em uma rede que acolhe:
              atendimento, escola preparada e apoio real para mães e pais atípicos.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Centros regionais de diagnóstico e terapia (ABA, fono, TO)",
                "Formação continuada obrigatória para professores da rede estadual",
                "Fila única transparente e prazo máximo para primeira consulta",
                "Apoio às associações de mães atípicas com repasse fiscalizado",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={140}>
            <div className="rounded-3xl border border-sky/30 autism-pattern p-8 shadow-card">
              <Puzzle className="h-12 w-12 text-sky" aria-hidden="true" />
              <p className="mt-5 font-display text-3xl leading-tight tracking-wide text-foreground">
                “Política pública boa é aquela que chega antes do desespero da família.”
              </p>
              <p className="mt-4 text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Giovanni Sanches
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ENTREGAS */}
      <section id="entregas" className="border-y border-border bg-navy py-20 text-navy-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionLabel>Compromisso de mandato</SectionLabel>
            <h2 className="mt-4 font-display text-4xl tracking-wide sm:text-5xl">
              Mandato aberto, contas na mesa
            </h2>
            <p className="mt-4 opacity-85">
              Transparência não é promessa de campanha, é método de trabalho. Cada real de emenda,
              cada agenda e cada voto ficam registrados e acessíveis para qualquer cidadão conferir.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {ENTREGAS.map((t) => (
                <li
                  key={t}
                  className="rounded-2xl border border-navy-foreground/15 bg-navy-foreground/5 p-5 text-sm leading-relaxed backdrop-blur-sm"
                >
                  <HeartHandshake className="mb-3 h-6 w-6 text-gold" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* PARTICIPE */}
      <section id="participe" className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <SectionLabel>Participe</SectionLabel>
            <h2 className="mt-4 font-display text-4xl tracking-wide text-foreground sm:text-5xl">
              Campanha se faz com gente
            </h2>
            <p className="mt-4 text-muted-foreground">
              Preencha seus dados e fale direto com a equipe pelo WhatsApp. Voluntário de bairro,
              apoiador de pauta ou liderança comunitária: tem lugar para você.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground">
                <Users className="h-4 w-4 text-sky" aria-hidden="true" /> Grupos de bairro
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground">
                <Instagram className="h-4 w-4 text-sky" aria-hidden="true" /> Redes sociais
              </span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-border bg-card p-6 shadow-lift sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-semibold text-foreground">
                  Nome completo
                  <input
                    required
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-normal outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Seu nome"
                  />
                </label>
                <label className="text-sm font-semibold text-foreground">
                  WhatsApp
                  <input
                    required
                    value={form.whatsapp}
                    onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-normal outline-none focus:ring-2 focus:ring-ring"
                    placeholder="(11) 90000-0000"
                  />
                </label>
                <label className="text-sm font-semibold text-foreground">
                  Bairro / cidade
                  <input
                    required
                    value={form.bairro}
                    onChange={(e) => setForm({ ...form, bairro: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-normal outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Ex.: Cumbica, Guarulhos"
                  />
                </label>
                <label className="text-sm font-semibold text-foreground">
                  Como quer ajudar
                  <select
                    value={form.atuacao}
                    onChange={(e) => setForm({ ...form, atuacao: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-normal outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option>Voluntário de Bairro</option>
                    <option>Liderança Comunitária</option>
                    <option>Apoio nas Redes Sociais</option>
                    <option>Apenas acompanhar</option>
                  </select>
                </label>
              </div>

              <fieldset className="mt-6">
                <legend className="text-sm font-semibold text-foreground">
                  Pautas de interesse
                </legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {PAUTAS.map((p) => {
                    const active = form.pautas.includes(p);
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => togglePauta(p)}
                        aria-pressed={active}
                        className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                          active
                            ? "border-transparent bg-primary text-primary-foreground"
                            : "border-border bg-background text-muted-foreground hover:border-sky hover:text-foreground"
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <Button type="submit" size="lg" className="mt-8 w-full">
                Enviar pelo WhatsApp <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Seus dados são usados apenas para contato da equipe de pré-campanha.
              </p>
            </form>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-navy py-12 text-navy-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-2">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl surface-gold font-display text-2xl text-gold-foreground">
                22
              </span>
              <span className="font-display text-3xl tracking-wide">Giovanni Sanches</span>
            </div>
            <p className="mt-4 max-w-md text-sm opacity-80">
              Pré-candidato a Deputado Estadual por São Paulo — Partido Liberal (PL 22). Portal de
              divulgação de pré-campanha, em conformidade com a legislação eleitoral (TSE).
            </p>
          </div>
          <nav className="sm:justify-self-end">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Navegue</p>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="opacity-85 transition-opacity hover:opacity-100">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mx-auto mt-10 max-w-7xl px-4 text-xs opacity-60">
          © 2026 Giovanni Sanches. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
