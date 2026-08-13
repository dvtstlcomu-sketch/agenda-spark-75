import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="text-center space-y-6 animate-pulse">
        <h1 className="text-6xl font-bold tracking-tighter">GIOVANNI SANCHES</h1>
        <div className="h-1 w-32 bg-yellow-500 mx-auto"></div>
        <p className="text-xl uppercase tracking-widest opacity-50">Projeto Reiniciado</p>
      </div>
    </div>
  );
}
