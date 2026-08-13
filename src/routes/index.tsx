import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <div className="flex min-h-screen items-center justify-center bg-navy text-navy-foreground p-8">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-6xl font-display text-gold animate-in fade-in slide-in-from-bottom-4 duration-1000">
          PROJETO REINICIADO
        </h1>
        <p className="text-xl opacity-80 leading-relaxed">
          Pronto para construir a nova presença digital impactante de Giovanni Sanches.
        </p>
      </div>
    </div>
  ),
});
