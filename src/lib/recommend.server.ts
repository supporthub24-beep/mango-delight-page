import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const RUN_ID = "X-Lovable-AIG-Run-ID";

const CATALOG = `
- himsagar (হিমসাগর): আঁশহীন, খুব মিষ্টি ও রসালো, মাঝারি আকার। ১২০ টাকা/কেজি
- langra (ল্যাংড়া): তীব্র সুগন্ধ, মিষ্টি সাথে হালকা টক ভাব, পাতলা খোসা। ১১০ টাকা/কেজি
- amrapali (আম্রপালি): গাঢ় কমলা শাঁস, অত্যন্ত মিষ্টি, ছোট আকার, পুষ্টিকর। ১০০ টাকা/কেজি
- fazli (ফজলি): বড় আকার, আঁশবিহীন, হালকা মিষ্টি, দীর্ঘদিন সংরক্ষণযোগ্য, সাশ্রয়ী। ৯০ টাকা/কেজি`;

export async function recommendMangoes(preferences: string, apiKey: string) {
  let runId: string | undefined;
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: async (input, init) => {
      const headers = new Headers(init?.headers);
      if (runId) headers.set(RUN_ID, runId);
      const res = await fetch(input, { ...init, headers });
      runId ??= res.headers.get(RUN_ID) ?? undefined;
      return res;
    },
  });

  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    system: `তুমি একটি আমের দোকানের সহকারী। শুধু নিচের তালিকা থেকে ১-২টি আম সুপারিশ করো:${CATALOG}
উত্তর বাংলায়, সংক্ষেপে (সর্বোচ্চ ৮০ শব্দ)। প্রতিটি সুপারিশের জন্য নাম ও কেন উপযুক্ত তা বলো। শেষ লাইনে লিখো: IDS: <কমা দিয়ে id গুলো>`,
    prompt: preferences,
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  const text = await result.text;
  const match = text.match(/IDS:\s*(.+)\s*$/i);
  const ids = match
    ? (match[1] ?? "").split(",").map((s) => s.trim().toLowerCase()).filter((s) => /^(himsagar|langra|amrapali|fazli)$/.test(s))
    : [];
  return { text: text.replace(/IDS:.*$/i, "").replace(/\*\*/g, "").trim(), ids };
}
