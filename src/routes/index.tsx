import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Accessibility,
  ArrowRight,
  Building2,
  CheckCircle2,
  Droplets,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Leaf,
  Menu,
  Puzzle,
  Stethoscope,
  Users,
  X,
} from "lucide-react";

import brasao from "@/assets/brasao-guarulhos.png";
import heroCidade from "@/assets/hero-cidade.jpg";
import thiagoFoto from "@/assets/thiago-surfista.jpg.asset.json";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Thiago Surfista & Giovanni Sanches | Dobradinha PL 22 - SP" },
      {
        name: "description",
        content:
          "Pré-campanha PL 22: Thiago Surfista (Deputado Federal) e Giovanni Sanches (Deputado Estadual). Causa autista, saneamento básico, saúde sem filas e educação técnica.",
      },
      { property: "og:title", content: "Dobradinha PL 22 — Thiago Surfista & Giovanni Sanches" },
      {
        property: "og:description",
        content:
          "Trabalho comprovado na Prefeitura, voz forte em Brasília e na ALESP. Conheça as propostas e participe.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  { href: "#inicio", label: "Início" },
  { href: "#dobradinha", label: "A Dobradinha" },
  { href: "#autismo", label: "Causa Autista" },
  { href: "#saneamento", label: "Saneamento" },
  { href: "#saude-educacao", label: "Saúde & Educação" },
  { href: "#participe", label: "Participe" },
];

const PAUTAS = ["Autismo / PNE", "Saneamento Básico", "Saúde Pública", "Educação / ETECs"];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-gold/40 bg-gold/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-gold-foreground">
      {children}
    </span>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bigText, setBigText] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    whatsapp: "",
    bairro: "",
    atuacao: "Voluntário de Bairro",
    pautas: [] as string[],
  });

  const togglePauta = (pauta: string) =>
    setForm((prev) => ({
      ...prev,
      pautas: prev.pautas.includes(pauta)
        ? prev.pautas.filter((p) => p !== pauta)
        : [...prev.pautas, pauta],
    }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Olá! Meu nome é ${form.nome}, moro em ${form.bairro}. Quero apoiar como ${form.atuacao}. Pautas de interesse: ${form.pautas.join(", ") || "geral"}. Telefone: ${form.whatsapp}`;
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className={bigText ? "text-[1.075rem]" : ""}>
      {/* Barra de acessibilidade */}
      <div className="bg-navy text-navy-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs">
          <p className="flex items-center gap-2 opacity-90">
            <Accessibility className="h-4 w-4 text-gold" aria-hidden="true" />
            Portal acessível
            <span className="hidden opacity-70 sm:inline">
              | Partido Liberal (PL 22) — São Paulo &amp; Guarulhos
            </span>
          </p>
          <div className="flex items-center gap-3 font-bold">
            <button
              type="button"
              onClick={() => setBigText(true)}
              className="rounded px-2 py-0.5 hover:bg-primary-foreground/15"
              aria-label="Aumentar tamanho do texto"
            >
              A+
            </button>
            <button
              type="button"
              onClick={() => setBigText(false)}
              className="rounded px-2 py-0.5 hover:bg-primary-foreground/15"
              aria-label="Diminuir tamanho do texto"
            >
              A-
            </button>
            <span className="opacity-60">Pré-campanha oficial</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-primary-foreground/10 bg-primary/95 text-primary-foreground backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <a href="#inicio" className="flex items-center gap-3">
            <img
              src={brasao}
              alt="Brasão da cidade de Guarulhos, São Paulo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain drop-shadow"
            />
            <span>
              <span className="block font-display text-2xl leading-none tracking-wide">
                São Paulo Avança
              </span>
              <span className="block text-xs font-semibold uppercase tracking-[0.15em] text-gold">
                Thiago Surfista &amp; Giovanni Sanches · PL 22
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm font-semibold lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="opacity-85 transition hover:text-gold hover:opacity-100"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="default" className="hidden surface-gold text-gold-foreground hover:opacity-90 sm:inline-flex">
              <a href="#participe">Apoie a campanha</a>
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded p-2 lg:hidden"
              aria-label="Abrir menu"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="space-y-3 border-t border-primary-foreground/10 px-4 py-4 text-sm font-semibold lg:hidden">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block hover:text-gold"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* Hero */}
      <section id="inicio" className="relative isolate surface-hero text-primary-foreground">
        <img
          src={heroCidade}
          alt="Vista da cidade ao amanhecer com bairros residenciais"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25"
        />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
          <div className="max-w-3xl">
            <SectionLabel>A dobradinha do trabalho por São Paulo</SectionLabel>
            <h1 className="mt-5 font-display text-5xl leading-[0.95] sm:text-7xl">
              Trabalho comprovado na prefeitura, voz forte em Brasília e na ALESP
            </h1>
            <p className="mt-5 max-w-2xl text-base opacity-90 sm:text-lg">
              A união da experiência em gestão pública com a defesa firme das famílias atípicas,
              saúde de qualidade, educação moderna e saneamento básico para todos.
            </p>
          </div>

          {/* Cards dos candidatos */}
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-primary-foreground/15 bg-card p-6 text-card-foreground shadow-lift">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                <span className="rounded-full bg-primary px-3 py-1 text-primary-foreground">
                  Deputado Federal
                </span>
                <span className="rounded-full surface-gold px-3 py-1 text-gold-foreground">
                  Pré-candidato
                </span>
              </div>
              <div className="mt-5 flex items-center gap-4">
                <img
                  src={thiagoFoto.url}
                  alt="Retrato de Thiago Surfista"
                  loading="lazy"
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-2xl object-cover shadow-card"
                />
                <div>
                  <h2 className="font-display text-3xl leading-none">Thiago Surfista</h2>
                  <p className="text-sm font-semibold text-sky">Vice-Prefeito &amp; Biólogo</p>
                  <p className="text-xs text-muted-foreground">
                    Ex-Secretário do Meio Ambiente de Guarulhos
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Defensor incansável da causa autista e das famílias atípicas. Biólogo comprometido
                com a universalização do saneamento básico e a preservação ambiental no Estado.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex gap-2">
                  <Puzzle className="mt-0.5 h-4 w-4 shrink-0 text-sky" aria-hidden="true" />
                  Garantia de direitos e diagnóstico precoce para autistas
                </li>
                <li className="flex gap-2">
                  <Droplets className="mt-0.5 h-4 w-4 shrink-0 text-sky" aria-hidden="true" />
                  Água potável e tratamento de esgoto em 100% dos bairros
                </li>
              </ul>
              <Button asChild className="mt-6 w-full">
                <a href="#autismo">
                  Conhecer as pautas <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </article>

            <article className="rounded-2xl border border-primary-foreground/15 bg-card p-6 text-card-foreground shadow-lift">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                <span className="rounded-full bg-primary px-3 py-1 text-primary-foreground">
                  Deputado Estadual
                </span>
                <span className="rounded-full surface-gold px-3 py-1 text-gold-foreground">
                  Pré-candidato
                </span>
              </div>
              <div className="mt-5 flex items-center gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary font-display text-4xl text-primary-foreground shadow-card">
                  GS
                </div>
                <div>
                  <h2 className="font-display text-3xl leading-none">Giovanni Sanches</h2>
                  <p className="text-sm font-semibold text-sky">Gestor Público &amp; Liderança</p>
                  <p className="text-xs text-muted-foreground">
                    Ex-Secretário das Administrações Regionais (SAR)
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Especialista em resolver os problemas reais do bairro. Foco total na expansão da
                saúde pública sem filas, no ensino técnico e na zeladoria urbana eficiente.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex gap-2">
                  <Stethoscope className="mt-0.5 h-4 w-4 shrink-0 text-sky" aria-hidden="true" />
                  Fim das filas do CROSS e apoio aos AMEs
                </li>
                <li className="flex gap-2">
                  <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-sky" aria-hidden="true" />
                  Expansão de ETECs e FATECs para os jovens
                </li>
              </ul>
              <Button asChild className="mt-6 w-full">
                <a href="#saude-educacao">
                  Conhecer as pautas <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </article>
          </div>
        </div>
      </section>

      {/* Dobradinha */}
      <section id="dobradinha" className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-3xl">
            <SectionLabel>União por resultados</SectionLabel>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">
              Por que Thiago Surfista e Giovanni Sanches juntos?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Duas trajetórias marcadas pela presença constante nas ruas, ouvindo a população e
              entregando obras e serviços públicos de verdade.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Building2,
                title: "Experiência real de gestão",
                text: "Ambos atuaram no alto escalão do governo municipal em Guarulhos. Conhecem os gargalos orçamentários e como fazer a máquina pública funcionar com agilidade.",
              },
              {
                icon: Users,
                title: "Compromisso social e humano",
                text: "Foco permanente na inclusão neurodivergente, no apoio às mães atípicas, na dignidade das periferias e no acesso universal à saúde e ao saneamento.",
              },
              {
                icon: Landmark,
                title: "Conexão Brasília – ALESP",
                text: "Recursos federais trazidos por Thiago Surfista combinados com a destinação estratégica de emendas estaduais por Giovanni Sanches.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-2xl border bg-card p-6 shadow-card transition hover:shadow-lift"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-2xl">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Causa autista */}
      <section id="autismo" className="autism-pattern py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 rounded-3xl border bg-card/90 p-6 shadow-card backdrop-blur sm:p-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <SectionLabel>Bandeira prioritária — Thiago Surfista</SectionLabel>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl">
                Defesa, diagnóstico e respeito aos autistas e famílias atípicas
              </h2>
              <p className="mt-4 text-muted-foreground">
                A inclusão não é um favor, é um direito assegurado pela Constituição. O compromisso
                é levar a Brasília projetos de lei e verbas federais direcionadas para:
              </p>
              <ul className="mt-6 space-y-4">
                {[
                  "Ampliação do diagnóstico precoce no SUS para início imediato das terapias de apoio.",
                  "Suporte psicológico e financeiro contínuo às mães atípicas e cuidadores principais.",
                  "Financiamento para criação e manutenção de Centros de Acolhimento Multidisciplinar.",
                  "Mediadores capacitados e sala de recursos em todas as escolas públicas.",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="flex flex-col justify-center rounded-2xl bg-primary p-8 text-primary-foreground">
              <HeartHandshake className="h-10 w-10 text-gold" aria-hidden="true" />
              <h3 className="mt-4 font-display text-3xl">Um abraço atípico</h3>
              <p className="mt-3 text-sm opacity-90">
                “Como homem público e gestor, compreendi que uma sociedade só é justa quando cuida
                com carinho e prioridade das suas pessoas neurodivergentes.”
              </p>
              <p className="mt-4 text-sm font-bold text-gold">— Thiago Surfista</p>
            </aside>
          </div>
        </div>
      </section>

      {/* Saneamento */}
      <section id="saneamento" className="bg-background py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:items-center">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { big: "100%", small: "Meta de saneamento básico nas periferias" },
              { big: "Biólogo", small: "Visão técnica e soluções sustentáveis" },
              { big: "R$ 1 → R$ 4", small: "Cada real em saneamento economiza quatro no SUS" },
              { big: "Zero", small: "Esgoto a céu aberto nos bairros vulneráveis" },
            ].map((stat) => (
              <div key={stat.big} className="rounded-2xl border bg-card p-6 shadow-card">
                <p className="font-display text-3xl text-primary">{stat.big}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.small}</p>
              </div>
            ))}
          </div>
          <div>
            <SectionLabel>Saneamento &amp; meio ambiente</SectionLabel>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">
              Saneamento básico é dignidade, saúde e respeito
            </h2>
            <p className="mt-4 text-muted-foreground">
              Como biólogo e ex-Secretário do Meio Ambiente, Thiago Surfista defende que água
              encanada e tratamento de esgoto não são privilégios, mas direitos humanos
              fundamentais.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Fim dos esgotos a céu aberto nos bairros mais vulneráveis.",
                "Preservação dos mananciais e recursos hídricos do Estado de São Paulo.",
                "Obras de macrodrenagem para combate definitivo às enchentes.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <Leaf className="mt-0.5 h-5 w-5 shrink-0 text-sky" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Saúde e educação */}
      <section id="saude-educacao" className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-primary-foreground/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-gold">
              Pautas estaduais — Giovanni Sanches
            </span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">
              Saúde pública ágil e educação conectada ao futuro
            </h2>
            <p className="mt-4 opacity-90">
              A experiência à frente das Administrações Regionais mostrou que o cidadão precisa de
              serviços públicos funcionando perto de sua casa.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {[
              {
                icon: Stethoscope,
                title: "Saúde sem filas & reformulação do CROSS",
                intro:
                  "Compromisso na ALESP para descentralizar atendimentos e agilizar consultas e cirurgias:",
                items: [
                  "Ampliação dos Ambulatórios Médicos de Especialidades (AMEs).",
                  "Fim da demora excessiva do sistema estadual CROSS.",
                  "Verbas diretas para prontos-socorros e UPAs regionais.",
                ],
              },
              {
                icon: GraduationCap,
                title: "Educação técnica & primeiro emprego",
                intro: "Preparar os jovens paulistas para as oportunidades reais do mercado:",
                items: [
                  "Expansão de novas unidades das ETECs e FATECs.",
                  "Mediadores e auxiliares capacitados para alunos autistas.",
                  "Incentivos fiscais para empresas que contratarem recém-formados.",
                ],
              },
            ].map(({ icon: Icon, title, intro, items }) => (
              <article
                key={title}
                className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-6"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl surface-gold text-gold-foreground">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-2xl">{title}</h3>
                <p className="mt-2 text-sm opacity-85">{intro}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Participe */}
      <section id="participe" className="bg-background py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center">
            <SectionLabel>Junte-se ao time</SectionLabel>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">
              Faça parte da nossa pré-campanha
            </h2>
            <p className="mt-3 text-muted-foreground">
              Preencha os dados e venha construir essa história com a gente.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5 rounded-3xl border bg-card p-6 shadow-card sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-semibold">
                Nome completo
                <input
                  required
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className="mt-2 w-full rounded-xl border bg-background px-4 py-3 text-sm font-normal outline-none focus:border-ring"
                  placeholder="Seu nome"
                />
              </label>
              <label className="block text-sm font-semibold">
                WhatsApp / Telefone
                <input
                  required
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  className="mt-2 w-full rounded-xl border bg-background px-4 py-3 text-sm font-normal outline-none focus:border-ring"
                  placeholder="(11) 90000-0000"
                />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-semibold">
                Bairro / Cidade
                <input
                  required
                  value={form.bairro}
                  onChange={(e) => setForm({ ...form, bairro: e.target.value })}
                  className="mt-2 w-full rounded-xl border bg-background px-4 py-3 text-sm font-normal outline-none focus:border-ring"
                  placeholder="Ex.: Bom Clima, Guarulhos"
                />
              </label>
              <label className="block text-sm font-semibold">
                Como deseja participar?
                <select
                  value={form.atuacao}
                  onChange={(e) => setForm({ ...form, atuacao: e.target.value })}
                  className="mt-2 w-full rounded-xl border bg-background px-4 py-3 text-sm font-normal outline-none focus:border-ring"
                >
                  <option>Voluntário de Bairro</option>
                  <option>Receber material de campanha</option>
                  <option>Apoiador digital / redes sociais</option>
                  <option>Liderança comunitária</option>
                </select>
              </label>
            </div>

            <fieldset>
              <legend className="text-sm font-semibold">Suas pautas de interesse</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {PAUTAS.map((pauta) => (
                  <label
                    key={pauta}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border bg-background px-4 py-3 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={form.pautas.includes(pauta)}
                      onChange={() => togglePauta(pauta)}
                      className="h-4 w-4 accent-[var(--sky)]"
                    />
                    {pauta}
                  </label>
                ))}
              </div>
            </fieldset>

            <Button type="submit" size="lg" className="w-full surface-gold text-gold-foreground hover:opacity-90">
              Confirmar cadastro e enviar no WhatsApp
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy py-12 text-navy-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <img
            src={brasao}
            alt="Brasão da cidade de Guarulhos"
            loading="lazy"
            width={64}
            height={64}
            className="mx-auto h-16 w-16 object-contain"
          />
          <p className="mt-3 font-display text-2xl tracking-wide">
            PL 22 · Partido Liberal — São Paulo
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-xs opacity-75">
            Portal de divulgação de pré-campanha eleitoral. Conteúdo informativo produzido em
            conformidade com as diretrizes da legislação eleitoral vigente (TSE).
          </p>
          <p className="mt-4 text-xs opacity-60">
            © 2026 Thiago Surfista &amp; Giovanni Sanches. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
