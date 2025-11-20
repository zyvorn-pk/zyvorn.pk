### E-commerce Admin — Copilot helper guide

This project uses Next.js App Router, Prisma, and a small collection of utility libraries. These notes are targeted at AI agents (Copilot/Code assistants) so they can be effective contributors at first touch.

High-level architecture
- The app is a Next.js 16 app using the App Router. Entry points are in `src/app/*` and use special folders with parentheses to define layout groups (e.g. `(admin)`, `(store)`, `(auth)`). See `src/app/layout.tsx` and `src/app/(admin)/layout.tsx`.
- Data layer: Prisma + PostgreSQL. Schema located at `prisma/schema.prisma`. Generated client is in `src/lib/prisma` and the exported `db` client is in `src/lib/db.ts`.
- Auth: Uses `better-auth` with the Prisma adapter. Check `src/lib/auth/index.ts` for provider and plugin config and `src/app/api/auth/[...all]/route.ts` for API mapping.
- Client state & data fetching: React Query (TanStack Query) is configured in `src/lib/tanstack` and provided at the app root (`src/app/layout.tsx`). Server layer uses Next.js server components and the `cache` helpers in `src/lib/dal.ts`.

Key development patterns & conventions
- Layout groups: app routes use `(group)` folders to share layout and middleware across routes — e.g. move UI for admin behind `(admin)` and protect it with server-side checks via `getAdminSession` from `src/lib/auth/server.ts`.
- Client vs server components: `"use client"` appears in the UI and hooks files. Prefer server components for pages and server API functions where possible to keep bundle size small.
- UI components: All shared UI primitives live in `src/components/ui/`. These follow patterns using Radix and Tailwind — use the `Form` helpers in `src/components/ui/form.tsx` for consistent form structure.
- Query & cache: Use `@tanstack/react-query` for client-side caching and `next/cache` for server-side caching. See `src/lib/dal.ts` for `cacheLife` and `cacheTag` usage.

Environment & developer workflows
- Local dev: run `npm run dev` — this calls `next dev --turbopack`. Production build is `npm run build` then `npm run start`.
- Database: Use `npx prisma generate` to refresh the client after schema changes. For migration locally, run `npx prisma migrate dev`. The DB connection is `DATABASE_URL` (also supported: `DATABASE_URL_UNPOOLED`).
- Auth providers: Google social auth expects `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`. ImageKit keys used in `src/lib/auth/image-kit.ts` require `IMAGE_KIT_PUBLIC_KEY`/`IMAGE_KIT_PRIVATE_KEY`.
- Headless test guidance: there are no tests in repo; suggest running linting and type checks locally: `npx tsc --noEmit` and `npx prettier --check .` if needed.

Project-specific code hints (examples)
- Add a new server-backed route: create a file under `src/app/api/` with `route.ts`. Use `cache()` and `headers()` as helpers for server code — see `src/lib/auth/server.ts`.
- Adding a new Prisma model: update `prisma/schema.prisma`, run `npx prisma migrate dev`, and import `db` from `src/lib/db.ts`. To call from server components, use `db.model.findMany()` or `db.model.create()`.
- Forms & validation: Use `react-hook-form` + `zod` for schema validation and the `Form` components in `src/components/ui/form.tsx`. See `src/components/auth/login/*` for existing examples.
- React Query usage: create a client hook that uses `useQuery` and ensure `getQueryClient()` is available from `src/lib/tanstack/get-query-client.ts` for devtools.

Conventions to preserve
- Keep UI primitives in `src/components/ui`. Anything used across features should live here.
- Avoid heavy client bundles in page-level code; prefer server components where possible then add client components as required.
- Only store secrets in environment variables; this repo expects `DATABASE_URL` and several other keys in `.env`.

Integration & external systems
- PostgreSQL via `DATABASE_URL` (Prisma). The project likely expects a dev DB running on Docker or external host.
- `better-auth` handles auth flows and connects to Prisma; OAuth keys are configured with environment variables.
- `ImageKit` is used for image upload operations; see `src/lib/auth/image-kit.ts`.

When editing code (how Copilot should act)
- Keep changes small and local: update a single feature at a time.
- Prefer reusing `ui` components when adding new pages to maintain consistent styling.
- If adding DB queries, update `prisma/schema.prisma` first then `npx prisma generate` to refresh the client.

Files of primary interest
- `src/app/layout.tsx`, `src/app/(admin)/layout.tsx`
- `src/lib/db.ts`, `prisma/schema.prisma`
- `src/lib/auth/index.ts`, `src/app/api/auth/[...all]/route.ts`
- `src/components/ui/*` and `src/components/dashboard/*`
- `src/lib/tanstack` (query provider and query client)

Wrap-up
- If anything here is missing or unclear, call out the specific gap (e.g., missing env var details for local DB). If local DB instructions are preferred, I can add a short Docker Compose snippet.

-- End of Copilot project tips