import { Quote, Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type TestimonialCardProps = {
  quote: string;
  author: string;
  role: string;
  rating: number;
  accent: string;
  initials: string;
};

export function TestimonialCard({ quote, author, role, rating, accent, initials }: TestimonialCardProps) {
  return (
    <Card className="group relative flex flex-col overflow-hidden rounded-2xl border-white/40 bg-white/90 shadow-xl shadow-[#174A2E]/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#F6B800]/60 hover:shadow-2xl hover:shadow-[#174A2E]/15">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[#F6B800]/20 to-transparent blur-2xl transition-opacity duration-300 group-hover:opacity-100 sm:opacity-70" aria-hidden="true" />
      <Quote className="absolute right-5 top-5 h-10 w-10 text-[#F6B800]/30 transition-all duration-300 group-hover:scale-110 group-hover:text-[#F6B800]/50" aria-hidden="true" />
      <CardHeader className="relative p-6 pb-4">
        <div className="flex items-center gap-1" aria-label={`${rating} স্টার রেটিং`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 transition-colors ${i < rating ? "fill-[#F6B800] text-[#F6B800]" : "text-[#174A2E]/15"}`}
              aria-hidden="true"
            />
          ))}
        </div>
      </CardHeader>
      <CardContent className="relative flex flex-1 flex-col p-6 pt-0">
        <p className="flex-1 text-sm font-medium leading-relaxed text-[#174A2E]/80 sm:text-base">"{quote}"</p>
        <div className="mt-5 flex items-center gap-3 border-t border-[#174A2E]/10 pt-4">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-extrabold shadow-md ${accent}`}
            aria-hidden="true"
          >
            {initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-extrabold text-[#174A2E]">{author}</p>
            <p className="truncate text-xs font-medium text-[#174A2E]/50">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
