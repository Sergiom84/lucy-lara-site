type KnowledgeKind = "product" | "treatment" | "center_info";

export interface KnowledgeItem {
  id: string;
  kind: KnowledgeKind;
  name: string;
  category: string | null;
  price_text: string | null;
  frequency: string | null;
  duration: string | null;
  details: string | null;
  source_sheet: string | null;
  score?: number;
}

export interface TreatmentOverviewItem {
  category: string;
  name: string;
  price_text: string | null;
  frequency: string | null;
  duration: string | null;
  item_order: number;
}

const DEFAULT_MAX_RESULTS = 8;

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  return { url, key };
}

function truncateText(value: string, maxLength = 280): string {
  const compact = value.replace(/\s+/g, " ").trim();
  if (compact.length <= maxLength) return compact;
  return `${compact.slice(0, maxLength - 1)}…`;
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function extractQueryTerms(queryText: string): string[] {
  const baseTerms = normalizeText(queryText)
    .split(/[^a-z0-9]+/g)
    .map((term) => term.trim())
    .filter((term) => term.length >= 3);

  const expanded = new Set<string>();
  for (const term of baseTerms) {
    expanded.add(term);
    // "hombres" -> "hombre" para mejorar match de singular/plural
    if (term.endsWith("es") && term.length > 4) {
      expanded.add(term.slice(0, -2));
    } else if (term.endsWith("s") && term.length > 3) {
      expanded.add(term.slice(0, -1));
    }
  }

  return Array.from(expanded).sort((a, b) => b.length - a.length);
}

function buildRelevantDetailSnippet(details: string, queryText: string): string {
  const compact = details.replace(/\s+/g, " ").trim();
  if (!compact) return compact;

  const terms = extractQueryTerms(queryText);
  if (terms.length === 0) {
    return truncateText(compact, 520);
  }

  const normalizedDetails = normalizeText(compact);
  let bestIndex = -1;
  for (const term of terms) {
    const idx = normalizedDetails.indexOf(term);
    if (idx >= 0) {
      bestIndex = idx;
      break;
    }
  }

  if (bestIndex < 0) {
    return truncateText(compact, 520);
  }

  const start = Math.max(0, bestIndex - 220);
  const end = Math.min(compact.length, bestIndex + 420);
  const window = compact.slice(start, end).trim();

  if (start === 0 && end === compact.length) {
    return window;
  }

  if (start === 0) return `${window}…`;
  if (end === compact.length) return `…${window}`;
  return `…${window}…`;
}

export async function searchChatbotKnowledge(
  queryText: string,
  maxResults = DEFAULT_MAX_RESULTS,
): Promise<KnowledgeItem[]> {
  const { url, key } = getSupabaseConfig();

  if (!url || !key) {
    return [];
  }

  try {
    const response = await fetch(`${url}/rest/v1/rpc/search_chatbot_knowledge`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        query_text: queryText,
        max_results: maxResults,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.warn("⚠️ Supabase knowledge search failed:", response.status, errorBody);
      return [];
    }

    const payload = await response.json();
    if (!Array.isArray(payload)) {
      return [];
    }

    return payload as KnowledgeItem[];
  } catch (error) {
    console.error("❌ Error querying Supabase chatbot knowledge:", error);
    return [];
  }
}

export async function fetchTreatmentOverview(maxPerCategory = 2): Promise<TreatmentOverviewItem[]> {
  const { url, key } = getSupabaseConfig();

  if (!url || !key) {
    return [];
  }

  try {
    const response = await fetch(`${url}/rest/v1/rpc/get_treatment_overview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        max_per_category: maxPerCategory,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.warn("⚠️ Supabase treatment overview failed:", response.status, errorBody);
      return [];
    }

    const payload = await response.json();
    if (!Array.isArray(payload)) {
      return [];
    }

    return payload as TreatmentOverviewItem[];
  } catch (error) {
    console.error("❌ Error querying Supabase treatment overview:", error);
    return [];
  }
}

export function isTreatmentOverviewQuery(queryText: string): boolean {
  const q = normalizeText(queryText);
  const asksAboutProducts = q.includes("producto") || q.includes("productos");

  const mentionsTreatmentArea =
    q.includes("tratamiento") ||
    q.includes("tratamientos") ||
    q.includes("servicio") ||
    q.includes("servicios") ||
    q.includes("facial") ||
    q.includes("faciales") ||
    q.includes("faciles") ||
    q.includes("corporal") ||
    q.includes("corporales") ||
    q.includes("masaje") ||
    q.includes("masajes") ||
    q.includes("laser") ||
    q.includes("depil") ||
    q.includes("micropigment") ||
    q.includes("carta") ||
    q.includes("menu");

  const asksListOrOffer =
    q.includes("que ") ||
    q.includes("cuales") ||
    q.includes("dispon") ||
    q.includes("teneis") ||
    q.includes("ofreceis") ||
    q.includes("haceis") ||
    q.includes("lista") ||
    q.includes("hay");

  const asksAboutTreatments = mentionsTreatmentArea || asksListOrOffer;

  const isSpecific =
    q.includes("precio") ||
    q.includes("cuanto") ||
    q.includes("incluye") ||
    q.includes("que lleva") ||
    q.includes("duracion") ||
    q.includes("frecuencia") ||
    q.includes("horario") ||
    q.includes("direccion");

  return asksAboutTreatments && asksListOrOffer && !asksAboutProducts && !isSpecific;
}

export function buildTreatmentOverviewContext(items: TreatmentOverviewItem[]): string {
  if (items.length === 0) {
    return "No hay datos de resumen de tratamientos disponibles en Supabase.";
  }

  const grouped = new Map<string, TreatmentOverviewItem[]>();
  for (const item of items) {
    if (!grouped.has(item.category)) {
      grouped.set(item.category, []);
    }
    grouped.get(item.category)!.push(item);
  }

  const lines: string[] = [
    "CATEGORÍAS DE TRATAMIENTOS DISPONIBLES (resumen para orientar al cliente):",
  ];
  grouped.forEach((categoryItems, category) => {
    const priceRange = categoryItems
      .map((i) => i.price_text)
      .filter(Boolean);
    const priceHint = priceRange.length > 0 ? ` (desde ${priceRange[0]})` : "";
    lines.push(`- ${category}: ${categoryItems.length} opciones${priceHint}`);
  });
  lines.push("");
  lines.push(
    "INSTRUCCIÓN: NO listes todos los tratamientos. Menciona solo las categorías y pregunta al cliente cuál le interesa para darle detalle.",
  );

  return lines.join("\n");
}

export function buildKnowledgeContext(items: KnowledgeItem[], queryText = ""): string {
  if (items.length === 0) {
    return "No hay coincidencias directas en la base dinámica para esta consulta.";
  }

  return items
    .map((item, index) => {
      const parts: string[] = [];
      parts.push(`[${index + 1}] ${item.name}`);
      if (item.kind === "product") {
        parts.push("Tipo: producto");
      } else if (item.kind === "treatment") {
        parts.push("Tipo: tratamiento");
      } else {
        parts.push("Tipo: información general");
      }
      if (item.category) parts.push(`Categoría: ${item.category}`);
      if (item.price_text) parts.push(`Precio: ${item.price_text}`);
      if (item.frequency) parts.push(`Frecuencia: ${item.frequency}`);
      if (item.duration) parts.push(`Duración: ${item.duration}`);
      if (item.details) parts.push(`Detalle: ${buildRelevantDetailSnippet(item.details, queryText)}`);
      if (item.source_sheet) parts.push(`Origen: ${item.source_sheet}`);
      return parts.join(" | ");
    })
    .join("\n");
}
