import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Puzzle, Droplets, Stethoscope, GraduationCap, ShieldCheck, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Giovanni Sanches 22 | Impacto e Gestão para São Paulo" },
      { name: "description", content: "Giovanni Sanches, pré-candidato a deputado estadual (PL 22). Gestão comprovada em Guarulhos agora para todo o estado de São Paulo." }
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden surface-hero text-navy-foreground">
        <div className="container mx-auto px-4 z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
            <span className="inline-block px-4 py-1.5 rounded-full border border-gold/50 bg-gold/10 text-gold text-xs font-bold uppercase tracking-widest">
              Liderança e Gestão
            </span>
            <h1 className="text-7xl sm:text-8xl font-display leading-[0.9] tracking-tight">
              GIOVANNI <br />
              <span className="text-gold">SANCHES</span>
            </h1>
            <p className="text-xl opacity-90 max-w-lg leading-relaxed">
              Ex-secretário municipal em Guarulhos, Giovanni leva a experiência de quem já entregou resultados reais para a Assembleia Legislativa de São Paulo.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="surface-gold text-gold-foreground text-lg px-8 shadow-lift">
                Conheça as Bandeiras <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3 px-6 py-2 border border-navy-foreground/20 rounded-lg bg-navy-foreground/5 backdrop-blur-sm">
                <span className="font-display text-4xl text-gold leading-none">22</span>
                <span className="text-xs font-bold uppercase tracking-tighter opacity-70">Deputado<br/>Estadual</span>
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block animate-in fade-in zoom-in duration-1000 delay-300">
             {/* Placeholder for photo until restored */}
             <div className="aspect-[4/5] bg-navy/40 rounded-3xl border border-gold/20 shadow-lift flex items-center justify-center text-gold/20 overflow-hidden">
                <span className="font-display text-9xl">GS</span>
             </div>
             <div className="absolute -bottom-6 -right-6 w-32 h-32 surface-gold rounded-2xl flex items-center justify-center text-gold-foreground font-display text-6xl shadow-lift">
               22
             </div>
          </div>
        </div>
      </section>

      {/* Bandeiras Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-5xl font-display mb-6">Compromisso com o Futuro</h2>
            <p className="text-muted-foreground text-lg">Soluções reais para os desafios que São Paulo enfrenta hoje.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Puzzle, title: "Causa Autista", text: "Centros de referência regionais e diagnóstico precoce na rede pública." },
              { icon: Droplets, title: "Saneamento", text: "Infraestrutura nos bairros que mais precisam e prevenção de enchentes." },
              { icon: Stethoscope, title: "Saúde sem Fila", text: "Descentralização de exames e mutirões permanentes de cirurgias." },
              { icon: GraduationCap, title: "Educação Técnica", text: "Expansão de ETECs focadas nas vocações regionais de cada cidade." },
              { icon: ShieldCheck, title: "Segurança", text: "Integração tecnológica e fortalecimento do policiamento preventivo." },
              { icon: Building2, title: "Gestão Eficiente", text: "Menos burocracia e mais investimentos diretos onde o cidadão vive." }
            ].map((b, i) => (
              <div key={i} className="group p-8 rounded-2xl border border-border bg-card hover:shadow-lift transition-all duration-300 hover:-translate-y-2">
                <div className="w-14 h-14 rounded-xl bg-navy/5 flex items-center justify-center mb-6 group-hover:surface-gold group-hover:text-gold-foreground transition-colors">
                  <b.icon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-display mb-3">{b.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-navy text-navy-foreground py-12 border-t border-gold/20">
        <div className="container mx-auto px-4 text-center">
          <p className="font-display text-4xl mb-4 tracking-widest opacity-20">GIOVANNI SANCHES 22</p>
          <div className="h-1 w-24 surface-gold mx-auto mb-6"></div>
          <p className="text-xs uppercase tracking-widest opacity-60">Pré-campanha Deputado Estadual • PL 22</p>
        </div>
      </footer>
    </main>
  );
}
