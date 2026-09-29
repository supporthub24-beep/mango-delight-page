import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getMangoRecommendation = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ preferences: z.string().trim().min(3).max(500) }).parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env['LOVABLE_API_KEY'];
    if (!apiKey) return { ok: false as const, error: "AI সেবা এখন চালু নেই।" };
    try {
      const { recommendMangoes } = await import("./recommend.server");
      const r = await recommendMangoes(data.preferences, apiKey);
      return { ok: true as const, ...r };
    } catch (e) {
      const status = (e as { statusCode?: number }).statusCode;
      const error =
        status === 429
          ? "অনেক অনুরোধ এসেছে, একটু পরে আবার চেষ্টা করুন।"
          : status === 402
            ? "AI ক্রেডিট শেষ হয়ে গেছে।"
            : "সুপারিশ আনতে সমস্যা হয়েছে, আবার চেষ্টা করুন।";
      console.error(e);
      return { ok: false as const, error };
    }
  });
