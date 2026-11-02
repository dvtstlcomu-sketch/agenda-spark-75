// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Public (non-secret) backend address and publishable key. Used only as a fallback
// when an external host (e.g. Vercel) builds without these env vars set.
const PUBLIC_URL = "https://lhncoaaqitzneyazptam.supabase.co";
const PUBLIC_KEY = "sb_publishable_yE1Me6bZ8teP5e56H6k08g_GhTiGTIN";

const define: Record<string, string> = {};
if (!process.env['VITE_SUPABASE_URL']) define["import.meta.env.VITE_SUPABASE_URL"] = JSON.stringify(PUBLIC_URL);
if (!process.env['VITE_SUPABASE_PUBLISHABLE_KEY'])
  define["import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY"] = JSON.stringify(PUBLIC_KEY);

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: { define },
});
