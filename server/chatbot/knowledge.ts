type KnowledgeKind = "product" | "treatment";

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

const DEFAULT_MAX_RESULTS = 8;

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  return { url, key };
}

function truncateText(value: string, maxLength = 280): string {
  const compact = value.replace(/\s+/g, " ").trim();
  if (compact.length <= maxLength) return compact;
  return `${compact.slice(0, maxLength - 1)}…`;
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

export function buildKnowledgeContext(items: KnowledgeItem[]): string {
  if (items.length === 0) {
    return "No hay coincidencias directas en la base dinámica para esta consulta.";
  }

  return items
    .map((item, index) => {
      const parts: string[] = [];
      parts.push(`[${index + 1}] ${item.name}`);
      parts.push(`Tipo: ${item.kind === "product" ? "producto" : "tratamiento"}`);
      if (item.category) parts.push(`Categoría: ${item.category}`);
      if (item.price_text) parts.push(`Precio: ${item.price_text}`);
      if (item.frequency) parts.push(`Frecuencia: ${item.frequency}`);
      if (item.duration) parts.push(`Duración: ${item.duration}`);
      if (item.details) parts.push(`Detalle: ${truncateText(item.details)}`);
      if (item.source_sheet) parts.push(`Origen: ${item.source_sheet}`);
      return parts.join(" | ");
    })
    .join("\n");
}
