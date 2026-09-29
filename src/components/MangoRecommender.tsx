import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Sparkles, Loader2 } from "lucide-react";
import { getMangoRecommendation } from "@/lib/recommend.functions";

const NAMES: Record<string, string> = {
  himsagar: "হিমসাগর",
  langra: "ল্যাংড়া",
  amrapali: "আম্রপালি",
  fazli: "ফজলি",
};

export function MangoRecommender() {
  const recommend = useServerFn(getMangoRecommendation);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ text: string; ids: string[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (text.trim().length < 3 || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const r = await recommend({ data: { preferences: text } });
      if (r.ok) setResult({ text: r.text, ids: r.ids });
      else setError(r.error);
    } catch {
      setError("সুপারিশ আনতে সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="recommend" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="rounded-3xl border-2 border-[#F6B800]/40 bg-[#FFF9E8] p-6 sm:p-10">
        <div className="flex items-center gap-2 text-[#174A2E]">
          <Sparkles className="h-6 w-6 text-[#F6B800]" aria-hidden="true" />
          <h2 className="text-2xl font-black sm:text-3xl">আপনার স্বাদে কোন আম?</h2>
        </div>
        <p className="mt-2 text-sm text-[#174A2E]/70">
          আপনি কেমন স্বাদ পছন্দ করেন লিখুন — AI আপনার জন্য সেরা আম বেছে দেবে।
        </p>
        <form onSubmit={submit} className="mt-5 space-y-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={500}
            rows={3}
            placeholder="যেমন: খুব মিষ্টি, আঁশ ছাড়া, বাচ্চাদের জন্য…"
            aria-label="আপনার স্বাদের পছন্দ"
            className="w-full rounded-xl border border-[#174A2E]/20 bg-white p-3 text-sm text-[#174A2E] outline-none focus:border-[#F6B800]"
          />
          <button
            type="submit"
            disabled={loading || text.trim().length < 3}
            className="inline-flex items-center gap-2 rounded-full bg-[#174A2E] px-6 py-3 text-sm font-bold text-white disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {loading ? "খুঁজছি…" : "সুপারিশ দেখুন"}
          </button>
        </form>
        {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}
        {result && (
          <div className="mt-5 rounded-2xl bg-white p-5 text-sm leading-relaxed text-[#174A2E] shadow-sm">
            <p className="whitespace-pre-line">{result.text}</p>
            {result.ids.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {result.ids.map((id) => (
                  <a
                    key={id}
                    href="#order"
                    className="rounded-full bg-[#F6B800] px-4 py-2 text-xs font-bold text-[#174A2E]"
                  >
                    {NAMES[id]} অর্ডার করুন
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
