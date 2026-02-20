# AGENTS.md

## Objetivo del repositorio
Sitio web del **Centro de Estetica Lucy Lara** (React + Express) con:
- landing y paginas de tratamientos
- catalogo de productos
- formulario de solicitud de cita
- chatbot conectado a OpenAI

## Stack y arquitectura
- Frontend: `React 18 + TypeScript + Vite + Tailwind + Wouter + Framer Motion`
- Backend: `Express + TypeScript`
- Tipos compartidos: `shared/schema.ts`
- Build:
  - cliente -> `dist/public`
  - servidor -> `dist/index.js`

### Estructura principal
- `client/`: app frontend
- `server/`: API y servidor
- `shared/`: tipos/schema compartidos
- `attached_assets/`, `images/`, `public/`: assets estaticos

## Flujo real de datos (estado actual)
- La mayor parte del contenido (tratamientos, productos, textos, precios) esta **hardcoded en frontend**.
- El backend expone APIs para reservas/chatbot y algunos datos de ejemplo.
- Persistencia actual:
  - `server/storage-factory-simple.ts` usa `MemStorage`
  - **no hay persistencia real en Postgres por ahora**
- Chatbot con base dinamica (nuevo):
  - Puede leer desde Supabase (`public.chatbot_knowledge_items`) via RPC `search_chatbot_knowledge`
  - El contexto dinamico se inyecta en `server/routes.ts` para responder con precios/tiempos reales

## Endpoints backend relevantes
- `GET /api/health`
- `POST /api/booking`
- `POST /api/bookings` (legacy, duplicado intencional)
- `GET /api/services`
- `GET /api/testimonials`
- `GET /api/db/status`
- `POST /api/chatbot`
- `POST /api/admin/clear-cache` (sin auth)
- `GET /api/admin/stats` (sin auth)

## Variables de entorno importantes
Basado en `.env.example` y server:
- `OPENAI_API_KEY` (chatbot)
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (chatbot knowledge)
- `CHATBOT_KNOWLEDGE_MAX_RESULTS` (top resultados por consulta)
- `GMAIL_USER`, `GMAIL_PASS`, `SALON_EMAIL` (emails)
- `NODE_ENV`, `PORT`
- `DATABASE_URL` (definida pero no usada para persistencia actual)

## Comandos de trabajo
- Desarrollo: `npm run dev`
- Build: `npm run build`
- Build produccion (Windows): `npm run build:production`
- Start produccion: `npm run start`
- Typecheck: `npm run check`

## Deploy / imagenes
Hay logica explicita para copiar imagenes en build:
- script: `copy-images.mjs`
- script postbuild Windows: `copy-images-postbuild.cmd`
- objetivo: asegurar imagenes en `dist/public/images` y `dist/images`
- Render configurado en `render.yaml`

## Puntos criticos antes de tocar codigo
1. **Reserva mejorada con desalineacion de campo**
   - `client/src/components/BookingImproved.tsx` envia `notes`
   - backend espera `message`
   - consecuencia: el comentario extra del usuario no llega al backend
2. **Persistencia en memoria**
   - reiniciar servidor borra reservas/test data
3. **Contenido duplicado en paginas**
   - datos similares repartidos en varios componentes/paginas (riesgo de inconsistencia)
4. **Endpoints admin sin proteccion**
   - `clear-cache` y `stats` no tienen autenticacion

## Donde editar segun el tipo de cambio
- Home y secciones: `client/src/components/*`
- Rutas/paginas: `client/src/pages/*`
- Formulario principal home: `client/src/components/BookingImproved.tsx`
- Formulario reutilizado en paginas internas: `client/src/components/Booking.tsx`
- Chatbot UI: `client/src/components/ChatbotImproved.tsx`
- Logica chatbot/API: `server/routes.ts`
- Busqueda de conocimiento chatbot (Supabase): `server/chatbot/knowledge.ts`
- Correos: `server/email/emailService.ts`
- Seguridad HTTP/CORS/CSP: `server/index.ts`

## Importacion de Excel para chatbot
- Script reutilizable: `scripts/export_chatbot_knowledge_sql.py`
- Entrada esperada:
  - Excel de productos (cabeceras tipo Producto/Subtitulo/Precio/Descripcion/...)
  - Excel de tratamientos (multiples pestañas con columnas Tratamiento/Precio/Informacion/Frecuencia o Duracion)
- Salida:
  - SQL de carga para `public.chatbot_knowledge_items`
  - JSON preview opcional

## Reglas practicas para futuras mejoras
- Mantener sincronizados nombres de campos entre frontend y backend (`message`, etc).
- Si se cambia un texto/precio/tratamiento, buscar duplicados en todas las paginas antes de cerrar.
- Validar siempre:
  - `npm run check`
  - `npm run build`
- Si hay cambios de assets, verificar que esten en build final (`dist/images` y `dist/public/images`).

## Estado de analisis
Contexto tecnico revisado y documentado. Listo para iterar en mejoras concretas.
