import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet, ScrollRestoration } from "@tanstack/react-router";
import { HeadContent, Scripts } from "@tanstack/react-router";
import * as React from "react";
import "@/styles.css";

const queryClient = new QueryClient();

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "Territorial" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "theme-color", content: "#0f172a" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&family=Inter:wght@100..900&family=Syne:wght@400..800&family=Bebas+Neue&display=swap" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ]
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}