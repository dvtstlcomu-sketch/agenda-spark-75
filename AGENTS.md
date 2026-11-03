<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Resolve Lovable-hosted logo asset pointers against the published Lovable origin for image sources, because relative asset-serving paths do not exist on external hosts such as Vercel.
- Listing photos live in the private `property-photos` bucket; signed URLs are generated through statically imported `src/lib/listings.functions.ts` RPCs (public = approved listings only, staff = any listing); callable RPCs must not use the `.server.ts` suffix because that blocks client imports. Direct Storage reads: staff any photo, public only photos of approved listings (RLS); browser `createSignedUrls` is only a fallback when server signing fails (e.g. Vercel lacks the service key). The first account to sign up becomes admin via a DB trigger.
- vite.config.ts defines public backend URL/publishable key fallbacks so external hosts (Vercel) build without env vars; never put secret keys there.
