import { Head, Scripts } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet, ScrollRestoration } from "@tanstack/react-router";
import * as React from "react";
import "@/styles.css";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Giovanni Sanches 2026" },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="pt-BR">
      <head>
        <Head />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
