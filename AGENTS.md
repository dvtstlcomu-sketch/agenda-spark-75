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
- Listing photos live in the private `property-photos` bucket; signed URLs are generated only server-side (`src/lib/listings.server.ts`: public = approved listings only, staff = any listing). Direct Storage reads are staff-only by policy; never re-add an anon SELECT policy or call `createSignedUrls` from browser code. The first account to sign up becomes admin via a DB trigger.
