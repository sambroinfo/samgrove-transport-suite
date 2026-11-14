<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- Signed-in pages live under `src/routes/_authenticated/` (client-only gate in `route.tsx`); auth screens (`/auth`, `/forgot-password`, `/reset-password`) are public top-level routes. Why: the session lives in browser storage, so a server-side gate would loop.
- Data reads go through the browser Supabase client with RLS and `queryOptions` factories in `src/lib/queries.ts`, always scoped by the current organization from `useOrg()`. Why: multi-tenant isolation is enforced by RLS plus explicit `organization_id` filters.
- Only query tables/columns that exist in `src/integrations/supabase/types.ts`; never read keys out of jsonb snapshot columns without confirming their shape. Why: the schema is owned by the user's existing Supabase project.
- Embeds across composite foreign keys must name the constraint (e.g. `vehicles!trips_vehicle_id_organization_id_fkey`). Why: tables carry both org and entity FKs, so unhinted embeds are ambiguous.
- Unbuilt modules render `ModulePlaceholder` with no sample data; dashboards show "—" or empty states instead of invented figures. Why: the user forbids placeholder data presented as live.
- UI strings go through `useI18n().t()` with keys in `src/lib/i18n.tsx` (every language must define every key). Why: the header language selector switches the whole app.
- Navigation items are defined once in `src/lib/navigation.ts`; each `to` needs a matching route file.
