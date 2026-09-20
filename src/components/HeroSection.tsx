import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Award, Sparkles, ArrowRight, ChevronRight, Star, ShieldCheck, Truck } from "lucide-react";

type HeroBanner = {
  id: string;
  headline: string;
  highlight: string;
  subtext: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  image: string;
  imageAlt: string;
  accent: string;
  accentText: string;
  align: "left" | "right";
};

const HERO_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1200&auto=format&fit=crop";

const heroBanners: HeroBanner[] = [
  {
    id: "barn-fresh",
    headline: "তাজা আম,",
    highlight: "সরাসরি বাগান",
    subtext:
      "চাঁপাইনবাবগঞ্জ ও রাজশাহীর সেরা বাগান থেকে বাছাই করা মিষ্টি ও রসালো আম — ফরমালিনমুক্ত, সারা দেশে হোম ডেলিভারি।",
    ctaLabel: "আম দেখুন",
    ctaHref: "#varieties",
    secondaryLabel: "অর্ডার করতে কল করুন",
    secondaryHref: "tel:+8801700000000",
    image: "/generated/d316e30b-b40-hero-banner.jpg",
    imageAlt: "বাগানে ঝুলে থাকা পাকা সোনালি আম",
    accent: "from-[#F6B800] via-[#F6B800]/70 to-[#F6B800]/30",
    accentText: "bg-[#F6B800] text-[#174A2E]",
    align: "left",
  },
  {
    id: "season-offer",
    headline: "মৌসুমি অফার,",
    highlight: "১০% ছাড়",
    subtext:
      "সীমিত সময়ের জন্য সব ভ্যারাইটিতে ১০% ছাড়। ক্যাশ অন ডেলিভারি — আম হাতে পেয়ে যাচাই করে টাকা দিন, কোনো অগ্রিম লাগবে না।",
    ctaLabel: "অফার নিয়ে অর্ডার",
    ctaHref: "#order",
    secondaryLabel: "ভ্যারাইটি দেখুন",
    secondaryHref: "#varieties",
    image: "/generated/d316e30b-b40-hero-banner-2.jpg",
    imageAlt: "কাঠের ঝুড়িতে সাজানো তাজা পাকা আম",
    accent: "from-[#2E7D32] via-[#2E7D32]/70 to-[#2E7D32]/30",
    accentText: "bg-[#2E7D32] text-white",
    align: "right",
  },
  {
    id: "quality-promise",
    headline: "১০০% ফরমালিনমুক্ত,",
    highlight: "মানের নিশ্চয়তা",
    subtext:
      "প্রতিটি আম হাতে বাছাই, ওজনে সঠিক আর প্যাকেজিংয়ের আগে কঠোর মান যাচাই। পছন্দ না হলে সম্পূর্ণ টাকা ফেরত।",
    ctaLabel: "কোয়ালিটি দেখুন",
    ctaHref: "#order",
    secondaryLabel: "কল করুন",
    secondaryHref: "tel:+8801700000000",
    image: "/generated/d316e30b-b40-hero-banner-3.jpg",
    imageAlt: "হাতে বাছাই করা পাকা আমের কাছাকাছি দৃশ্য",
    accent: "from-[#174A2E] via-[#174A2E]/70 to-[#174A2E]/30",
    accentText: "bg-[#174A2E] text-[#F6B800]",
    align: "left",
  },
];

export function HeroSection() {
  const [activeBanner, setActiveBanner] = useState(0);
  const [bannerPaused, setBannerPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (bannerPaused || reduceMotion) return;
    const interval = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % heroBanners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [bannerPaused, reduceMotion]);

  const goToBanner = (index: number) => {
    setActiveBanner((index + heroBanners.length) % heroBanners.length);
  };

  const handleImageFallback = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
    fallbackUrl: string,
  ) => {
    const target = e.currentTarget;
    if (target.src !== fallbackUrl) {
      target.src = fallbackUrl;
    }
  };

  return (
    <section
      className="relative overflow-hidden"
      aria-roledescription="ক্যারোসেল"
      aria-label="আমঘর হিরো ব্যানার"
      onMouseEnter={() => setBannerPaused(true)}
      onMouseLeave={() => setBannerPaused(false)}
      onFocusCapture={() => setBannerPaused(true)}
      onBlurCapture={() => setBannerPaused(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#F6B800]/30 via-[#FFF9E8] to-[#FFF9E8]" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(65%_65%_at_50%_0%,rgba(246,184,0,0.38),transparent_72%)]" aria-hidden="true" />
      <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#F6B800]/40 blur-3xl sm:h-[28rem] sm:w-[28rem]" aria-hidden="true" />
      <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#2E7D32]/20 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="relative">
          <div className="relative overflow-hidden rounded-[28px] border-2 border-white bg-white/70 shadow-2xl shadow-[#174A2E]/20 ring-1 ring-[#F6B800]/25 backdrop-blur-xl sm:rounded-[32px]">
            <div className="relative min-h-[560px] sm:min-h-[520px] lg:min-h-[480px]">
              {heroBanners.map((banner, index) => {
                const isActive = index === activeBanner;
                return (
                  <div
                    key={banner.id}
                    role="group"
                    aria-roledescription="স্লাইড"
                    aria-label={`${index + 1} / ${heroBanners.length} — ${banner.headline} ${banner.highlight}`}
                    aria-hidden={!isActive}
                    className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                      isActive ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                  >
                    <img
                      src={banner.image}
                      onError={(e) => handleImageFallback(e, HERO_FALLBACK_IMAGE)}
                      alt={banner.imageAlt}
                      className="absolute inset-0 h-full w-full object-cover object-center"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-[#174A2E]/92 via-[#174A2E]/70 to-[#174A2E]/25"
                      aria-hidden="true"
                    />
                    <div
                      className={`relative flex h-full min-h-[560px] items-center px-5 py-12 sm:min-h-[520px] sm:px-10 sm:py-14 lg:min-h-[480px] lg:px-14 ${
                        banner.align === "right" ? "justify-end text-right" : "justify-start text-left"
                      }`}
                    >
                      <div className={`max-w-xl ${banner.align === "right" ? "ml-auto" : ""}`}>
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3.5 py-2 shadow-md backdrop-blur">
                          <span className={`flex h-6 w-6 items-center justify-center rounded-full shadow-sm ${banner.accentText}`}>
                            <Award className="h-3.5 w-3.5" aria-hidden="true" />
                          </span>
                          <span className="text-xs font-bold tracking-wide text-white sm:text-sm">
                            আমঘর — বিশ্বস্ত আম বিক্রেতা ২০১৮ থেকে
                          </span>
                          <Sparkles className="hidden h-3.5 w-3.5 text-[#F6B800] sm:block" aria-hidden="true" />
                        </div>

                        {index === 0 ? (
                          <h1 className="mt-6 text-balance text-[34px] font-black uppercase leading-[1.02] tracking-tighter text-white sm:mt-7 sm:text-[52px] lg:text-[64px]">
                            {banner.headline}
                            <span className="relative inline-block">
                              <span className="relative z-10 px-1"> {banner.highlight}</span>
                              <span
                                className={`absolute bottom-1 left-0 -z-0 h-4 w-full rounded-full bg-gradient-to-r sm:h-6 ${banner.accent}`}
                                aria-hidden="true"
                              />
                            </span>{" "}
                            থেকে আপনার ঘরে
                          </h1>
                        ) : (
                          <p className="mt-6 text-balance text-[34px] font-black uppercase leading-[1.02] tracking-tighter text-white sm:mt-7 sm:text-[52px] lg:text-[64px]">
                            {banner.headline}
                            <span className="relative inline-block">
                              <span className="relative z-10 px-1"> {banner.highlight}</span>
                              <span
                                className={`absolute bottom-1 left-0 -z-0 h-4 w-full rounded-full bg-gradient-to-r sm:h-6 ${banner.accent}`}
                                aria-hidden="true"
                              />
                            </span>
                          </p>
                        )}

                        <p className="mt-5 max-w-xl text-pretty text-[15px] font-medium leading-relaxed text-white/85 sm:mt-6 sm:text-lg sm:leading-8">
                          {banner.subtext}
                        </p>

                        <div
                          className={`mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row ${
                            banner.align === "right" ? "sm:justify-end" : "sm:justify-start"
                          }`}
                        >
                          <Button
                            size="lg"
                            className="group h-[60px] w-full rounded-2xl bg-gradient-to-b from-[#2E7D32] to-[#174A2E] px-9 text-base font-extrabold tracking-wide text-white shadow-xl shadow-[#174A2E]/30 ring-1 ring-[#174A2E]/20 transition-all hover:-translate-y-0.5 hover:from-[#256628] hover:to-[#123A24] hover:shadow-2xl hover:shadow-[#174A2E]/40 sm:w-auto"
                            asChild
                          >
                            <a href={banner.ctaHref}>
                              {banner.ctaLabel}
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </a>
                          </Button>
                          <Button
                            size="lg"
                            variant="outline"
                            className="h-[60px] w-full rounded-2xl border-2 border-white/40 bg-white/10 px-9 text-base font-bold text-white shadow-md backdrop-blur transition-all hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/20 hover:text-white sm:w-auto"
                            asChild
                          >
                            <a href={banner.secondaryHref}>
                              <Phone className="h-4 w-4" aria-hidden="true" />
                              {banner.secondaryLabel}
                            </a>
                          </Button>
                        </div>

                        <div
                          className={`mt-9 flex flex-wrap items-center gap-2 sm:gap-3 ${
                            banner.align === "right" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-2 text-xs font-bold text-[#174A2E] shadow-md ring-1 ring-white/40 sm:px-4">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F6B800]/25">
                              <Star className="h-3.5 w-3.5 fill-[#F6B800] text-[#F6B800]" aria-hidden="true" />
                            </span>
                            ৪.৮/৫ রেটিং • ৩০০+ রিভিউ
                          </div>
                          <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-2 text-xs font-bold text-[#174A2E] shadow-md ring-1 ring-white/40 sm:px-4">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2E7D32]/15">
                              <ShieldCheck className="h-3.5 w-3.5 text-[#2E7D32]" aria-hidden="true" />
                            </span>
                            ১০০% ফরমালিনমুক্ত
                          </div>
                          <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-2 text-xs font-bold text-[#174A2E] shadow-md ring-1 ring-white/40 sm:px-4">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2E7D32]/15">
                              <Truck className="h-3.5 w-3.5 text-[#2E7D32]" aria-hidden="true" />
                            </span>
                            সারা দেশে ডেলিভারি
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => goToBanner(activeBanner - 1)}
              aria-label="আগের ব্যানার"
              className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/85 text-[#174A2E] shadow-lg backdrop-blur transition-all hover:-translate-y-1/2 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B800] focus-visible:ring-offset-2 sm:left-5"
            >
              <ChevronRight className="h-5 w-5 rotate-180" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => goToBanner(activeBanner + 1)}
              aria-label="পরের ব্যানার"
              className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/85 text-[#174A2E] shadow-lg backdrop-blur transition-all hover:-translate-y-1/2 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B800] focus-visible:ring-offset-2 sm:right-5"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>

            <div
              className="absolute inset-x-0 bottom-4 z-20 flex items-center justify-center gap-2"
              role="tablist"
              aria-label="ব্যানার নির্বাচন"
            >
              {heroBanners.map((banner, index) => (
                <button
                  key={banner.id}
                  type="button"
                  role="tab"
                  aria-selected={index === activeBanner}
                  aria-label={`ব্যানার ${index + 1}: ${banner.headline} ${banner.highlight}`}
                  onClick={() => goToBanner(index)}
                  className={`h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B800] focus-visible:ring-offset-2 ${
                    index === activeBanner
                      ? "w-8 bg-[#F6B800]"
                      : "w-2.5 bg-white/60 hover:bg-white/90"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute -right-2 -top-2 z-20 hidden rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-xl ring-1 ring-[#174A2E]/5 backdrop-blur-xl sm:flex sm:items-center sm:gap-3">
            <div className="flex -space-x-2">
              <span className="h-7 w-7 rounded-full border-2 border-white bg-[#F6B800]" aria-hidden="true" />
              <span className="h-7 w-7 rounded-full border-2 border-white bg-[#2E7D32]" aria-hidden="true" />
              <span className="h-7 w-7 rounded-full border-2 border-white bg-[#174A2E]" aria-hidden="true" />
            </div>
            <p className="text-xs font-semibold leading-tight text-[#174A2E]">
              ১২০০+ পরিবার
              <br />
              <span className="font-normal text-[#174A2E]/60">আমঘরকে বিশ্বাস করে</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
