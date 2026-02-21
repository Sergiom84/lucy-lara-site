# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start both server (tsx) and client (vite) concurrently on port 5000
npm run build        # Build client (dist/public) + server (dist/index.js) + copy images
npm run start        # Run production build
npm run check        # TypeScript typecheck only (no tests configured)
npm run db:push      # Push Drizzle schema to DB (not used in practice — see Storage section)
```

No test framework is configured.

## Architecture

**Monorepo layout:**
- `client/` — React 18 SPA (Vite, TypeScript, Tailwind, Wouter routing, Framer Motion)
- `server/` — Express server (TypeScript via tsx, serves API + static files in production)
- `shared/` — Drizzle schema and Zod types shared by both sides
- Path aliases: `@` → `client/src`, `@shared` → `shared`, `@assets` → `attached_assets`

**Dev server:** Both processes run on port 5000 (Vite proxies API calls to Express). In production, Express serves the built SPA from `dist/public` via `serveStatic`.

**Deploy:** Render.com (`render.yaml`). Build runs `npm run build`; images are additionally copied to `dist/public/images` and `dist/images` by `copy-images.mjs`.

## Chatbot (most actively developed feature)

The chatbot (`POST /api/chatbot`) uses OpenAI `gpt-4o-mini` and pulls knowledge from Supabase.

**Key files:**
- `server/chatbot/knowledge.ts` — Supabase queries: `searchChatbotKnowledge` (RPC `search_chatbot_knowledge`), `fetchTreatmentOverview` (RPC `get_treatment_overview`), context builders
- `server/routes.ts` — `getChatbotResponse()` function with the full system prompt, caching (30 min in-memory), and call logic
- `client/src/components/ChatbotImproved.tsx` — Chat UI with quick-prompts
- `server/data/productos_lucy_lara.md` — Full product/treatment catalogue (source of truth for content)

**Supabase tables (real tables, accessed via RPCs):**
- `Tratamientos` (Tratamiento, Precio, Información, Frecuencia, Tipo)
- `Productos` (Producto, Subtítulo, Precio, Descripcion, Benefícios, Ingredientes_activos, etc.)
- `Info` (Dirección, Contacto, Detalles)

**RPCs used:** `search_chatbot_knowledge(query_text, max_results)` and `get_treatment_overview(max_per_category)` — both exist in the schema and are the only interface the code uses.

**Key logic:** `isTreatmentOverviewQuery()` determines whether to call `get_treatment_overview` (returns category list) vs. `search_chatbot_knowledge` (returns specific items). Regex in `routes.ts` `chatbotValidation` must include `¿` and `¡` for Spanish questions.

**Required env vars:**
```
OPENAI_API_KEY
SUPABASE_URL
SUPABASE_ANON_KEY      # Preferred for reads (service_role key may be invalid)
SUPABASE_SERVICE_ROLE_KEY  # Fallback
```

`getSupabaseConfig()` in `knowledge.ts` resolves the key as `SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY`.

## Storage

Bookings and services use **in-memory storage** (`server/storage.ts` + `server/storage-factory-simple.ts`). Data resets on server restart. Drizzle schema (`shared/schema.ts`) and `DATABASE_URL` are defined but not wired up — `StorageFactory` always returns `MemStorage`.

## Known field misalignment

`BookingImproved.tsx` sends `notes` but the backend booking schema expects `message`. The note field is silently dropped.

## Email

`server/email/emailService.ts` — nodemailer + Gmail SMTP. Requires `GMAIL_USER`, `GMAIL_PASS`, `SALON_EMAIL`. Email failure does **not** fail the booking request — it logs a warning only.

## Admin endpoints (no auth)

`POST /api/admin/clear-cache` and `GET /api/admin/stats` are unprotected.

## Content location

Most UI content (treatment descriptions, prices, gallery) is **hardcoded in frontend components**, not fetched from an API. The canonical reference for all treatments and products is `server/data/productos_lucy_lara.md`.
