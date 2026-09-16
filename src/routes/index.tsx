import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ShoppingCart,
  Check,
  Leaf,
  Truck,
  ShieldCheck,
  Phone,
  Star,
  Clock,
  MapPin,
  Award,
  Package,
  ChevronRight,
  Facebook,
  Instagram,
  Youtube,
  Sparkles,
  ArrowRight,
  Quote,
  MousePointerClick,
  ClipboardList,
  PackageCheck,
  BadgeCheck,
  Sprout,
  HeartHandshake,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "আমঘর | তাজা আম সরাসরি বাগান থেকে" },
      {
        name: "description",
        content:
          "আমঘর থেকে সরাসরি বাগান থেকে তাজা, মিষ্টি ও রসালো আম কিনুন। হিমসাগর, ল্যাংড়া, আম্রপালি ও ফজলি — সারা দেশে হোম ডেলিভারি, ক্যাশ অন ডেলিভারি।",
      },
      { property: "og:title", content: "আমঘর | তাজা আম সরাসরি বাগান থেকে" },
      {
        property: "og:description",
        content:
          "সরাসরি বাগান থেকে তাজা, মিষ্টি ও রসালো আম কিনুন। সারা দেশে হোম ডেলিভারি, ক্যাশ অন ডেলিভারি।",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: LOGO_PATH },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: LOGO_PATH },
    ],
    links: [
      { rel: "icon", href: LOGO_PATH, type: "image/jpeg" },
      { rel: "apple-touch-icon", href: LOGO_PATH },
    ],
  }),
  component: MangoLandingPage,
});

type MangoVariety = {
  id: string;
  name: string;
  banglaName: string;
  pricePerKg: number;
  unit: string;
  description: string;
  image: string;
  fallbackImage: string;
  tag?: string;
  rating: number;
  reviews: number;
};

const HERO_IMAGE_PATH = "/generated/85faab0c-736-mango-hero.png";
const HERO_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1200&auto=format&fit=crop";
const QUALITY_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1200&auto=format&fit=crop";
const LOGO_PATH = "/generated/67535dc2-354-mango-delight-logo.jpg";

const mangoVarieties: MangoVariety[] = [
  {
    id: "himsagar",
    name: "Himsagar",
    banglaName: "হিমসাগর",
    pricePerKg: 120,
    unit: "প্রতি কেজি",
    description: "চাঁপাইনবাবগঞ্জের বিখ্যাত হিমসাগর — আঁশহীন, মিষ্টি ও রসালো।",
    image: HERO_IMAGE_PATH,
    fallbackImage:
      "https://images.unsplash.com/photo-1591073113125-e46713c829ed?q=80&w=1000&auto=format&fit=crop",
    tag: "বেস্ট সেলার",
    rating: 4.9,
    reviews: 128,
  },
  {
    id: "langra",
    name: "Langra",
    banglaName: "ল্যাংড়া",
    pricePerKg: 110,
    unit: "প্রতি কেজি",
    description: "সুগন্ধি ও মিষ্টি ল্যাংড়া আম, পাকলে সোনালি রঙ ধারণ করে।",
    image:
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=1000&auto=format&fit=crop",
    fallbackImage:
      "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
    reviews: 96,
  },
  {
    id: "amrapali",
    name: "Amrapali",
    banglaName: "আম্রপালি",
    pricePerKg: 100,
    unit: "প্রতি কেজি",
    description: "গাঢ় কমলা রঙের আম্রপালি, অত্যন্ত মিষ্টি ও পুষ্টিকর।",
    image:
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?q=80&w=1000&auto=format&fit=crop",
    fallbackImage:
      "https://images.unsplash.com/photo-1591073113125-e46713c829ed?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    reviews: 74,
  },
  {
    id: "fazli",
    name: "Fazli",
    banglaName: "ফজলি",
    pricePerKg: 90,
    unit: "প্রতি কেজি",
    description: "বড় আকারের ফজলি আম, আঁশবিহীন ও দীর্ঘদিন সংরক্ষণযোগ্য।",
    image:
      "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1000&auto=format&fit=crop",
    fallbackImage:
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=1000&auto=format&fit=crop",
    rating: 4.6,
    reviews: 58,
  },
];

const weightOptions = [3, 5, 10];

const whyUs = [
  {
    icon: Leaf,
    title: "সরাসরি বাগান থেকে",
    description: "মাঝখানে কোনো ফড়িয়া নেই — বাগান থেকে সরাসরি আপনার ঘরে।",
  },
  {
    icon: ShieldCheck,
    title: "১০০% ফরমালিনমুক্ত",
    description: "কোনো কেমিক্যাল বা কার্বাইড ব্যবহার করা হয় না, সম্পূর্ণ প্রাকৃতিক পদ্ধতিতে পাকানো।",
  },
  {
    icon: Truck,
    title: "সারা দেশে ডেলিভারি",
    description: "ঢাকায় ২৪ ঘণ্টায়, দেশের যেকোনো জায়গায় ৪৮–৭২ ঘণ্টায় পৌঁছে যাবে।",
  },
  {
    icon: Check,
    title: "মানের নিশ্চয়তা",
    description: "আম পছন্দ না হলে সম্পূর্ণ টাকা ফেরত — কোনো প্রশ্ন ছাড়াই।",
  },
];

const qualityChecks = [
  "প্রতিটি আম হাতে বাছাই করা হয়",
  "পাকার আগে কোনো কেমিক্যাল ব্যবহার করা হয় না",
  "ওজনে সঠিকতা নিশ্চিত করা হয়",
  "প্যাকেজিংয়ের আগে মান যাচাই করা হয়",
  "ডেলিভারির সময় তাপমাত্রা নিয়ন্ত্রণ করা হয়",
  "ক্ষতিগ্রস্ত আম বিনামূল্যে প্রতিস্থাপন",
];

const howItWorks = [
  {
    step: "১",
    icon: MousePointerClick,
    title: "আম বাছাই করুন",
    description: "আপনার পছন্দের ভ্যারাইটি ও ওজন নির্বাচন করুন।",
  },
  {
    step: "২",
    icon: ClipboardList,
    title: "অর্ডার ফর্ম পূরণ করুন",
    description: "নাম, ফোন নম্বর ও ঠিকানা দিয়ে অর্ডার নিশ্চিত করুন।",
  },
  {
    step: "৩",
    icon: PackageCheck,
    title: "ডেলিভারি নিন",
    description: "আম হাতে পেয়ে যাচাই করুন, তারপর টাকা দিন।",
  },
];

const reviews = [
  {
    name: "রাহিম উদ্দিন",
    location: "ঢাকা",
    rating: 5,
    comment: "হিমসাগর আমের স্বাদ অসাধারণ! একদম বাগান থেকে তোলা তাজা আম পেয়েছি।",
    date: "২ দিন আগে",
    initials: "রাউ",
    accent: "bg-[#F6B800] text-[#174A2E]",
  },
  {
    name: "সাবিনা ইয়াসমিন",
    location: "চট্টগ্রাম",
    rating: 5,
    comment: "ফরমালিনমুক্ত আমের কোনো তুলনা হয় না। বাচ্চারা খুব পছন্দ করেছে।",
    date: "৫ দিন আগে",
    initials: "সাই",
    accent: "bg-[#2E7D32] text-white",
  },
  {
    name: "কামরুল হাসান",
    location: "রাজশাহী",
    rating: 4,
    comment: "ডেলিভারি সময়মতো পেয়েছি, আমগুলো খুব মিষ্টি ছিল। আবার অর্ডার করব।",
    date: "১ সপ্তাহ আগে",
    initials: "কাহা",
    accent: "bg-[#174A2E] text-white",
  },
];

const deliveryInfo = [
  {
    icon: Truck,
    title: "ঢাকার ভিতরে",
    description: "২৪ ঘণ্টার মধ্যে ডেলিভারি",
  },
  {
    icon: MapPin,
    title: "ঢাকার বাইরে",
    description: "৪৮–৭২ ঘণ্টার মধ্যে ডেলিভারি",
  },
  {
    icon: Package,
    title: "ডেলিভারি চার্জ",
    description: "ঢাকায় ৬০ টাকা, বাইরে ১২০ টাকা",
  },
  {
    icon: ShieldCheck,
    title: "ক্যাশ অন ডেলিভারি",
    description: "পণ্য হাতে পেয়ে টাকা দিন",
  },
];

function MangoLandingPage() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [selectedWeights, setSelectedWeights] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    variety: "",
    weight: 3,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds -= 1;
        if (seconds < 0) {
          seconds = 59;
          minutes -= 1;
        }
        if (minutes < 0) {
          minutes = 59;
          hours -= 1;
        }
        if (hours < 0) {
          hours = 23;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const totalPrice = useMemo(() => {
    return Object.entries(cart).reduce((sum, [id, qty]) => {
      const variety = mangoVarieties.find((v) => v.id === id);
      if (!variety) return sum;
      const weight = selectedWeights[id] ?? 3;
      return sum + variety.pricePerKg * weight * qty;
    }, 0);
  }, [cart, selectedWeights]);

  const addToCart = (variety: MangoVariety) => {
    const weight = selectedWeights[variety.id] ?? 3;
    setCart((prev) => ({ ...prev, [variety.id]: (prev[variety.id] ?? 0) + 1 }));
    toast.success("কার্টে যোগ হয়েছে", {
      description: `${variety.banglaName} (${variety.name}) ${weight} কেজি কার্টে যোগ করা হয়েছে।`,
    });
  };

  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/[\s-]/g, "");
    return /^01[3-9]\d{8}$/.test(cleaned);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "আপনার নাম লিখুন";
    }
    if (!validatePhone(formData.phone)) {
      errors.phone = "সঠিক মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)";
    }
    if (!formData.address.trim()) {
      errors.address = "ডেলিভারির ঠিকানা লিখুন";
    }
    if (!formData.variety) {
      errors.variety = "আমের ভ্যারাইটি নির্বাচন করুন";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success("অর্ডার সফলভাবে গ্রহণ করা হয়েছে!", {
          description: "আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।",
        });
        setFormData({ name: "", phone: "", address: "", variety: "", weight: 3 });
      }, 1500);
    }
  };

  const formatPrice = (price: number) => `৳${price.toLocaleString("bn-BD")}`;

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
    <div className="min-h-screen bg-[#FFF9E8] antialiased">
      {/* Header / Brand */}
      <header className="sticky top-0 z-40 border-b border-[#174A2E]/10 bg-[#FFF9E8]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5" aria-label="Mango Delight হোমপেজ">
            <img
              src={LOGO_PATH}
              alt="Mango Delight লোগো"
              width={40}
              height={40}
              className="h-9 w-9 shrink-0 rounded-xl object-contain ring-1 ring-[#174A2E]/10 sm:h-10 sm:w-10"
              loading="eager"
            />
            <span className="text-lg font-extrabold tracking-tight text-[#174A2E] sm:text-xl">
              Mango Delight
            </span>
          </Link>
          <nav aria-label="প্রধান নেভিগেশন" className="flex items-center gap-1 sm:gap-2">
            <a
              href="#varieties"
              className="rounded-lg px-2.5 py-2 text-xs font-semibold text-[#174A2E]/80 transition-colors hover:bg-[#174A2E]/5 hover:text-[#174A2E] sm:px-3 sm:text-sm"
            >
              আমের ভ্যারাইটি
            </a>
            <a
              href="#order"
              className="rounded-lg px-2.5 py-2 text-xs font-semibold text-[#174A2E]/80 transition-colors hover:bg-[#174A2E]/5 hover:text-[#174A2E] sm:px-3 sm:text-sm"
            >
              অর্ডার
            </a>
            <Button
              size="sm"
              className="ml-1 h-9 rounded-xl bg-[#2E7D32] px-3 text-xs font-bold text-white hover:bg-[#256628] sm:px-4 sm:text-sm"
              asChild
            >
              <a href="tel:+8801700000000">
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                কল করুন
              </a>
            </Button>
          </nav>
        </div>
      </header>

      {/* Top Offer Bar */}
      <div className="relative bg-[#174A2E] text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-3 sm:flex-row sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 text-xs font-medium sm:text-sm">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F6B800]/20">
              <Clock className="h-3.5 w-3.5 text-[#F6B800]" aria-hidden="true" />
            </span>
            <span className="tracking-wide">মৌসুমি অফার — ১০% ছাড় শেষ হতে বাকি</span>
          </p>
          <div className="flex items-center gap-1.5" role="timer" aria-label="অফার শেষ হওয়ার সময়">
            <span className="rounded-lg bg-[#F6B800] px-2 py-1 font-mono text-xs font-bold tracking-widest text-[#174A2E] sm:px-2.5 sm:text-sm">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="font-bold text-[#F6B800]">:</span>
            <span className="rounded-lg bg-[#F6B800] px-2 py-1 font-mono text-xs font-bold tracking-widest text-[#174A2E] sm:px-2.5 sm:text-sm">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="font-bold text-[#F6B800]">:</span>
            <span className="rounded-lg bg-[#F6B800] px-2 py-1 font-mono text-xs font-bold tracking-widest text-[#174A2E] sm:px-2.5 sm:text-sm">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F6B800]/30 via-[#FFF9E8] to-[#FFF9E8]" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(65%_65%_at_50%_0%,rgba(246,184,0,0.38),transparent_72%)]" aria-hidden="true" />
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#F6B800]/40 blur-3xl sm:h-[28rem] sm:w-[28rem]" aria-hidden="true" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#2E7D32]/20 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#174A2E]/15 bg-white/90 px-3.5 py-2 shadow-md shadow-[#174A2E]/5 backdrop-blur">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F6B800] shadow-sm">
                  <Award className="h-3.5 w-3.5 text-[#174A2E]" aria-hidden="true" />
                </span>
                <span className="text-xs font-bold tracking-wide text-[#174A2E] sm:text-sm">
                  আমঘর — বিশ্বস্ত আম বিক্রেতা ২০১৮ থেকে
                </span>
                <Sparkles className="hidden h-3.5 w-3.5 text-[#F6B800] sm:block" aria-hidden="true" />
              </div>

              <h1 className="mt-6 text-balance text-[40px] font-black uppercase leading-[0.98] tracking-tighter text-[#174A2E] sm:mt-7 sm:text-[64px] lg:text-[80px]">
                তাজা আম,
                <span className="relative inline-block">
                  <span className="relative z-10 px-1"> সরাসরি বাগান</span>
                  <span className="absolute bottom-1 left-0 -z-0 h-4 w-full rounded-full bg-gradient-to-r from-[#F6B800] via-[#F6B800]/70 to-[#F6B800]/30 sm:h-6" aria-hidden="true" />
                </span>{" "}
                থেকে আপনার ঘরে
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-pretty text-[15px] font-medium leading-relaxed text-[#174A2E]/80 sm:mt-6 sm:text-lg sm:leading-8 lg:mx-0">
                চাঁপাইনবাবগঞ্জ ও রাজশাহীর সেরা বাগান থেকে বাছাই করা মিষ্টি ও রসালো আম — ফরমালিনমুক্ত, সারা দেশে হোম ডেলিভারি।
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="group h-[60px] w-full rounded-2xl bg-gradient-to-b from-[#2E7D32] to-[#174A2E] px-9 text-base font-extrabold tracking-wide text-white shadow-xl shadow-[#174A2E]/30 ring-1 ring-[#174A2E]/20 transition-all hover:-translate-y-0.5 hover:from-[#256628] hover:to-[#123A24] hover:shadow-2xl hover:shadow-[#174A2E]/40 sm:w-auto"
                  asChild
                >
                  <a href="#varieties">
                    আম দেখুন
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-[60px] w-full rounded-2xl border-2 border-[#174A2E]/20 bg-white px-9 text-base font-bold text-[#174A2E] shadow-md shadow-[#174A2E]/5 transition-all hover:-translate-y-0.5 hover:border-[#174A2E]/40 hover:bg-[#FFF9E8] sm:w-auto"
                  asChild
                >
                  <a href="tel:+8801700000000">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    অর্ডার করতে কল করুন
                  </a>
                </Button>
              </div>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-2 sm:gap-3 lg:justify-start">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-[#174A2E] shadow-md shadow-[#174A2E]/5 ring-1 ring-[#174A2E]/10 sm:px-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F6B800]/25">
                    <Star className="h-3.5 w-3.5 fill-[#F6B800] text-[#F6B800]" aria-hidden="true" />
                  </span>
                  ৪.৮/৫ রেটিং • ৩০০+ রিভিউ
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-[#174A2E] shadow-md shadow-[#174A2E]/5 ring-1 ring-[#174A2E]/10 sm:px-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2E7D32]/15">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#2E7D32]" aria-hidden="true" />
                  </span>
                  ১০০% ফরমালিনমুক্ত
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-[#174A2E] shadow-md shadow-[#174A2E]/5 ring-1 ring-[#174A2E]/10 sm:px-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2E7D32]/15">
                    <Truck className="h-3.5 w-3.5 text-[#2E7D32]" aria-hidden="true" />
                  </span>
                  সারা দেশে ডেলিভারি
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[520px] lg:mx-0 lg:max-w-none">
              <div className="relative overflow-hidden rounded-[28px] border-2 border-white bg-white/80 p-2 shadow-2xl shadow-[#174A2E]/25 ring-1 ring-[#F6B800]/30 backdrop-blur-xl sm:rounded-[32px] sm:p-3">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-[#2E7D32]/10 sm:rounded-[24px]">
                  <img
                    src={HERO_IMAGE_PATH}
                    onError={(e) => handleImageFallback(e, HERO_FALLBACK_IMAGE)}
                    alt="বাগানে ঝুলে থাকা পাকা সোনালি আম"
                    className="h-full w-full object-cover object-center"
                    loading="eager"
                  />
                </div>
                <div className="absolute -bottom-2 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-xl backdrop-blur-xl sm:left-6 sm:right-6 sm:px-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F6B800] text-[#174A2E] shadow-sm">
                      <Award className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-none text-[#174A2E]">মৌসুমি অফার</p>
                      <p className="text-[11px] font-medium text-[#174A2E]/60">সীমিত সময়ের জন্য ১০% ছাড়</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#174A2E] px-3 py-1.5 text-xs font-bold text-white">১০% OFF</span>
                </div>
              </div>
              <div className="pointer-events-none absolute -right-2 -top-2 hidden rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-xl ring-1 ring-[#174A2E]/5 backdrop-blur-xl sm:flex sm:items-center sm:gap-3">
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
        </div>
      </section>

      {/* Varieties Section */}
      <section id="varieties" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="rounded-full bg-[#174A2E] px-3.5 py-1.5 text-xs font-bold tracking-widest uppercase text-[#F6B800] shadow-md shadow-[#174A2E]/20 hover:bg-[#174A2E]">
            আমাদের সংগ্রহ
          </Badge>
          <h2 className="mt-4 text-3xl font-black tracking-tighter text-[#174A2E] sm:text-5xl">
            আমাদের আমের ভ্যারাইটি
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#174A2E]/70 sm:text-base">
            প্রতিটি আম হাতে বাছাই করা — ওজন নির্বাচন করে লাইভ মূল্য দেখুন এবং এক ক্লিকে কার্টে যোগ করুন।
          </p>
        </div>

        {loading ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="overflow-hidden rounded-2xl border-[#174A2E]/10">
                <Skeleton className="h-48 w-full" />
                <CardHeader className="space-y-3 p-5">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-3 p-5 pt-0">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-9 w-full rounded-xl" />
                </CardContent>
                <CardFooter className="p-5 pt-0">
                  <Skeleton className="h-11 w-full rounded-xl" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : mangoVarieties.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-[#2E7D32]/20 bg-white p-10 text-center sm:p-14">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF9E8]">
              <Package className="h-6 w-6 text-[#174A2E]/40" aria-hidden="true" />
            </div>
            <p className="mt-4 text-sm font-medium text-[#174A2E] sm:text-base">এই মুহূর্তে কোনো আম স্টকে নেই</p>
            <p className="mt-1 text-xs text-[#174A2E]/60 sm:text-sm">অনুগ্রহ করে পরে আবার দেখুন — নতুন স্টক শীঘ্রই আসছে।</p>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            {mangoVarieties.map((variety) => {
              const selectedWeight = selectedWeights[variety.id] ?? 3;
              const livePrice = variety.pricePerKg * selectedWeight;
              return (
                <Card
                  key={variety.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border-white/60 bg-white/70 shadow-md shadow-[#174A2E]/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#F6B800]/40 hover:shadow-2xl hover:shadow-[#174A2E]/10"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FFF9E8]">
                    <img
                      src={variety.image}
                      onError={(e) => handleImageFallback(e, variety.fallbackImage)}
                      alt={`${variety.banglaName} (${variety.name}) আম`}
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                    {variety.tag && (
                      <Badge className="absolute left-3 top-3 rounded-full bg-[#F6B800] px-2.5 py-1 text-[11px] font-bold tracking-wide text-[#174A2E] shadow-md hover:bg-[#F6B800]">
                        {variety.tag}
                      </Badge>
                    )}
                    <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-white/60 bg-white/80 px-2.5 py-1 text-xs font-bold text-[#174A2E] shadow-sm backdrop-blur-xl">
                      <Star className="h-3.5 w-3.5 fill-[#F6B800] text-[#F6B800]" aria-hidden="true" />
                      {variety.rating}
                    </div>
                  </div>
                  <CardHeader className="p-5 pb-3">
                    <CardTitle className="flex items-baseline justify-between gap-2 text-[17px] font-extrabold leading-none text-[#174A2E]">
                      <span>
                        {variety.banglaName}
                        <span className="ml-1.5 text-xs font-medium text-[#174A2E]/50">({variety.name})</span>
                      </span>
                    </CardTitle>
                    <p className="text-xs font-medium text-[#174A2E]/60">{variety.reviews} রিভিউ • {variety.unit}</p>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col p-5 pt-0">
                    <p className="line-clamp-2 text-xs leading-relaxed text-[#174A2E]/70 sm:text-[13px]">{variety.description}</p>

                    <div className="mt-4">
                      <label
                        htmlFor={`weight-${variety.id}`}
                        className="mb-2 block text-xs font-semibold tracking-wide text-[#174A2E]"
                      >
                        ওজন নির্বাচন করুন
                      </label>
                      <div
                        className="grid grid-cols-3 gap-2 rounded-xl bg-[#FFF9E8]/80 p-1 ring-1 ring-[#174A2E]/5"
                        role="radiogroup"
                        aria-label={`${variety.banglaName} ওজন`}
                      >
                        {weightOptions.map((weight) => (
                          <button
                            key={weight}
                            type="button"
                            role="radio"
                            aria-checked={selectedWeight === weight}
                            onClick={() => setSelectedWeights((prev) => ({ ...prev, [variety.id]: weight }))}
                            className={`rounded-lg py-2.5 text-xs font-bold transition-all ${
                              selectedWeight === weight
                                ? "bg-[#174A2E] text-white shadow-sm"
                                : "bg-white text-[#174A2E]/70 hover:bg-white hover:text-[#174A2E] hover:shadow-sm"
                            }`}
                          >
                            {weight} কেজি
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex items-end justify-between gap-2 border-t border-[#174A2E]/5 pt-4">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#174A2E]/40">মোট মূল্য</p>
                        <p className="text-xl font-extrabold tracking-tight text-[#174A2E]">
                          {formatPrice(livePrice)}
                          <span className="ml-1 text-xs font-medium text-[#174A2E]/50">/ {selectedWeight} কেজি</span>
                        </p>
                      </div>
                      <p className="text-right text-xs font-medium leading-tight text-[#174A2E]/50">
                        {formatPrice(variety.pricePerKg)}
                        <br />
                        {variety.unit}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-5 pt-0">
                    <Button
                      className="h-11 w-full rounded-xl bg-[#2E7D32] text-sm font-bold text-white shadow-md shadow-[#2E7D32]/15 transition-all hover:-translate-y-0.5 hover:bg-[#256628] hover:shadow-lg"
                      onClick={() => addToCart(variety)}
                    >
                      <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                      কার্টে যোগ করুন
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* Why Us Section */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black tracking-tighter text-[#174A2E] sm:text-5xl">কেন আমঘর থেকে কিনবেন?</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#174A2E]/70 sm:text-base">
              আমরা সরাসরি বাগান থেকে আম সংগ্রহ করি, তাই মান ও দাম দুটোই সেরা — প্রতিটি ধাপে স্বচ্ছতা।
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            {whyUs.map((item) => (
              <Card
                key={item.title}
                className="group rounded-2xl border-2 border-[#174A2E]/5 bg-[#FFF9E8]/70 p-6 text-left shadow-none transition-all duration-300 hover:-translate-y-1.5 hover:border-[#F6B800]/50 hover:bg-white hover:shadow-2xl hover:shadow-[#174A2E]/10 sm:text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md shadow-[#174A2E]/5 ring-1 ring-[#174A2E]/10 transition-transform duration-300 group-hover:scale-110 group-hover:ring-[#F6B800]/60 sm:mx-auto">
                  <item.icon className="h-7 w-7 text-[#2E7D32] transition-colors duration-300 group-hover:text-[#174A2E]" aria-hidden="true" />
                </div>
                <CardTitle className="mt-4 text-base font-black leading-tight tracking-tight text-[#174A2E] sm:text-lg">
                  {item.title}
                </CardTitle>
                <p className="mt-2 text-xs leading-relaxed text-[#174A2E]/70 sm:text-sm">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Control Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <Badge className="rounded-full bg-[#F6B800] px-3.5 py-1.5 text-xs font-bold tracking-widest uppercase text-[#174A2E] shadow-md shadow-[#F6B800]/30 hover:bg-[#F6B800]">
              কোয়ালিটি কন্ট্রোল
            </Badge>
            <h2 className="mt-4 text-3xl font-black tracking-tighter text-[#174A2E] sm:text-5xl">
              প্রতিটি আমে নিখুঁত মানের নিশ্চয়তা
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#174A2E]/70 sm:text-base">
              প্রতিটি আম আপনার কাছে পৌঁছানোর আগে কঠোর মান যাচাই প্রক্রিয়ার মধ্য দিয়ে যায় — বাগান থেকে প্যাকেজিং পর্যন্ত।
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-1">
              {qualityChecks.map((check) => (
                <li key={check} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3.5 shadow-md shadow-[#174A2E]/5 ring-1 ring-[#174A2E]/10 transition-all hover:-translate-y-0.5 hover:ring-[#2E7D32]/30">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#2E7D32] to-[#174A2E] text-white shadow-sm">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-bold leading-tight text-[#174A2E]">{check}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[28px] border border-white bg-white p-2 shadow-xl shadow-[#174A2E]/10">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-[#2E7D32]/10">
                <img
                  src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1200&auto=format&fit=crop"
                  onError={(e) => handleImageFallback(e, QUALITY_FALLBACK_IMAGE)}
                  alt="আমের মান যাচাই করা হচ্ছে"
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 -left-2 flex items-center gap-3 rounded-2xl bg-[#174A2E] px-5 py-4 text-white shadow-xl sm:-left-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F6B800] text-[#174A2E]">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-bold leading-none">১০০% ফরমালিনমুক্ত</p>
                <p className="text-xs text-white/70">ল্যাব টেস্টেড ও হাতে বাছাই</p>
              </div>
            </div>
            <div className="absolute -right-2 top-6 hidden items-center gap-2 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-xl backdrop-blur-xl lg:flex">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2E7D32]/10">
                <Sprout className="h-4.5 w-4.5 text-[#2E7D32]" aria-hidden="true" />
              </span>
              <p className="text-xs font-semibold leading-tight text-[#174A2E]">
                নিজস্ব বাগান
                <br />
                <span className="font-normal text-[#174A2E]/60">চাঁপাইনবাবগঞ্জ ও রাজশাহী</span>
              </p>
            </div>
            <div className="absolute -left-3 bottom-24 hidden items-center gap-2 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-xl backdrop-blur-xl lg:flex">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F6B800]/20">
                <HeartHandshake className="h-4.5 w-4.5 text-[#174A2E]" aria-hidden="true" />
              </span>
              <p className="text-xs font-semibold leading-tight text-[#174A2E]">
                ১২০০+ সন্তুষ্ট গ্রাহক
                <br />
                <span className="font-normal text-[#174A2E]/60">সারা দেশে ডেলিভারি</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gradient-to-b from-[#174A2E] to-[#0F3320]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black tracking-tighter text-white sm:text-5xl">কীভাবে অর্ডার করবেন?</h2>
            <p className="mt-4 text-sm text-white/75 sm:text-base">মাত্র তিনটি সহজ ধাপে আপনার পছন্দের আম অর্ডার করুন।</p>
          </div>
          <div className="relative mt-12 grid gap-4 sm:grid-cols-3 sm:gap-6">
            <div className="absolute left-1/2 top-8 hidden h-0.5 w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#F6B800]/40 to-transparent sm:block" aria-hidden="true" />
            {howItWorks.map((item) => (
              <div
                key={item.step}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/[0.12] to-white/[0.04] p-6 text-center ring-1 ring-white/10 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:ring-[#F6B800]/40"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#F6B800]/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 sm:opacity-0" aria-hidden="true" />
                <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F6B800] text-[#174A2E] shadow-lg shadow-[#F6B800]/20 transition-transform duration-300 group-hover:scale-110">
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                  <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#174A2E] text-[11px] font-extrabold text-[#F6B800] ring-2 ring-[#174A2E]">
                    {item.step}
                  </span>
                </div>
                <h3 className="relative mt-5 text-base font-bold text-white sm:text-lg">{item.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-white/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section id="order" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div>
            <h2 className="text-3xl font-black tracking-tighter text-[#174A2E] sm:text-5xl">অর্ডার করতে ফর্ম পূরণ করুন</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#174A2E]/70 sm:text-base">
              ফর্ম পূরণ করলে আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন। পণ্য হাতে পেয়ে টাকা দিন — কোনো অগ্রিম পেমেন্ট নেই।
            </p>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {deliveryInfo.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[#174A2E]/5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF9E8] ring-1 ring-[#174A2E]/5">
                    <item.icon className="h-5 w-5 text-[#2E7D32]" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-[#174A2E]">{item.title}</h3>
                    <p className="text-xs text-[#174A2E]/60 sm:text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Card className="rounded-[24px] border-2 border-[#174A2E]/10 bg-white shadow-2xl shadow-[#174A2E]/10">
            <CardHeader className="p-6 pb-4 sm:p-8 sm:pb-6">
              <CardTitle className="text-2xl font-black tracking-tighter text-[#174A2E]">অর্ডার ফর্ম</CardTitle>
              <p className="text-xs text-[#174A2E]/60 sm:text-sm">সব * চিহ্নিত ঘর পূরণ করা বাধ্যতামূলক</p>
            </CardHeader>
            <CardContent className="p-6 pt-0 sm:p-8 sm:pt-0">
              <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-semibold tracking-wide text-[#174A2E] sm:text-sm">
                    আপনার নাম *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-[#174A2E] placeholder:text-[#174A2E]/40 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 ${
                      formErrors.name ? "border-red-400 focus:border-red-400" : "border-[#174A2E]/10 focus:border-[#2E7D32]/30"
                    }`}
                    placeholder="আপনার নাম লিখুন"
                    aria-invalid={!!formErrors.name}
                    aria-describedby={formErrors.name ? "name-error" : undefined}
                  />
                  {formErrors.name && (
                    <p id="name-error" className="mt-1.5 text-xs font-medium text-red-500">
                      {formErrors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-xs font-semibold tracking-wide text-[#174A2E] sm:text-sm">
                    মোবাইল নম্বর *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-[#174A2E] placeholder:text-[#174A2E]/40 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 ${
                      formErrors.phone ? "border-red-400 focus:border-red-400" : "border-[#174A2E]/10 focus:border-[#2E7D32]/30"
                    }`}
                    placeholder="01XXXXXXXXX"
                    aria-invalid={!!formErrors.phone}
                    aria-describedby={formErrors.phone ? "phone-error" : undefined}
                  />
                  {formErrors.phone && (
                    <p id="phone-error" className="mt-1.5 text-xs font-medium text-red-500">
                      {formErrors.phone}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="address" className="mb-2 block text-xs font-semibold tracking-wide text-[#174A2E] sm:text-sm">
                    ডেলিভারির ঠিকানা *
                  </label>
                  <textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                    className={`min-h-[96px] w-full rounded-xl border bg-white p-4 text-sm text-[#174A2E] placeholder:text-[#174A2E]/40 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 ${
                      formErrors.address ? "border-red-400 focus:border-red-400" : "border-[#174A2E]/10 focus:border-[#2E7D32]/30"
                    }`}
                    placeholder="বাসা/রোড/এলাকা/জেলা"
                    rows={3}
                    aria-invalid={!!formErrors.address}
                    aria-describedby={formErrors.address ? "address-error" : undefined}
                  />
                  {formErrors.address && (
                    <p id="address-error" className="mt-1.5 text-xs font-medium text-red-500">
                      {formErrors.address}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="variety" className="mb-2 block text-xs font-semibold tracking-wide text-[#174A2E] sm:text-sm">
                      আমের ভ্যারাইটি *
                    </label>
                    <select
                      id="variety"
                      value={formData.variety}
                      onChange={(e) => setFormData((prev) => ({ ...prev, variety: e.target.value }))}
                      className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-[#174A2E] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 ${
                        formErrors.variety ? "border-red-400 focus:border-red-400" : "border-[#174A2E]/10 focus:border-[#2E7D32]/30"
                      }`}
                      aria-invalid={!!formErrors.variety}
                      aria-describedby={formErrors.variety ? "variety-error" : undefined}
                    >
                      <option value="">ভ্যারাইটি নির্বাচন করুন</option>
                      {mangoVarieties.map((variety) => (
                        <option key={variety.id} value={variety.id}>
                          {variety.banglaName} ({variety.name})
                        </option>
                      ))}
                    </select>
                    {formErrors.variety && (
                      <p id="variety-error" className="mt-1.5 text-xs font-medium text-red-500">
                        {formErrors.variety}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="weight" className="mb-2 block text-xs font-semibold tracking-wide text-[#174A2E] sm:text-sm">
                      ওজন
                    </label>
                    <select
                      id="weight"
                      value={formData.weight}
                      onChange={(e) => setFormData((prev) => ({ ...prev, weight: Number(e.target.value) }))}
                      className="h-12 w-full rounded-xl border border-[#174A2E]/10 bg-white px-4 text-sm text-[#174A2E] focus:border-[#2E7D32]/30 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20"
                    >
                      {weightOptions.map((weight) => (
                        <option key={weight} value={weight}>
                          {weight} কেজি
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="h-14 w-full rounded-xl bg-gradient-to-b from-[#2E7D32] to-[#174A2E] text-base font-extrabold tracking-wide text-white shadow-xl shadow-[#174A2E]/25 ring-1 ring-[#174A2E]/20 transition-all hover:-translate-y-0.5 hover:from-[#256628] hover:to-[#123A24] hover:shadow-2xl"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "অর্ডার প্রক্রিয়া হচ্ছে..." : "অর্ডার নিশ্চিত করুন"}
                </Button>
                <p className="flex items-center justify-center gap-1.5 text-center text-xs font-medium text-[#174A2E]/60">
                  <ShieldCheck className="h-4 w-4 text-[#2E7D32]" aria-hidden="true" />
                  ক্যাশ অন ডেলিভারি — পণ্য হাতে পেয়ে টাকা দিন
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-black tracking-tighter text-[#174A2E] sm:text-5xl">গ্রাহকদের মতামত</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#174A2E]/65 sm:text-base">
                আমাদের গ্রাহকরা যা বলছেন — তাদের সন্তুষ্টিই আমাদের সেরা অর্জন।
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FFF9E8] px-4 py-2.5 text-xs font-bold text-[#174A2E] shadow-md shadow-[#174A2E]/5 ring-1 ring-[#174A2E]/10">
              <Star className="h-4 w-4 fill-[#F6B800] text-[#F6B800]" aria-hidden="true" />
              ৪.৮/৫ গড় রেটিং • ৩০০+ রিভিউ
            </div>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {reviews.map((review) => (
              <Card
                key={review.name}
                className="group relative flex flex-col rounded-2xl border-[#174A2E]/5 bg-[#FFF9E8]/40 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-[#F6B800]/30 hover:bg-white hover:shadow-xl hover:shadow-[#174A2E]/5"
              >
                <Quote
                  className="absolute right-5 top-5 h-8 w-8 text-[#F6B800]/25 transition-colors duration-300 group-hover:text-[#F6B800]/50"
                  aria-hidden="true"
                />
                <CardHeader className="p-6 pb-3">
                  <div className="flex items-center gap-1" aria-label={`${review.rating} স্টার রেটিং`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "fill-[#F6B800] text-[#F6B800]" : "text-[#174A2E]/15"}`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col p-6 pt-0">
                  <p className="flex-1 text-sm leading-relaxed text-[#174A2E]/75">“{review.comment}”</p>
                  <div className="mt-5 flex items-center gap-3 border-t border-[#174A2E]/5 pt-4">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-extrabold shadow-sm ${review.accent}`}
                      aria-hidden="true"
                    >
                      {review.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-extrabold text-[#174A2E]">{review.name}</p>
                      <p className="truncate text-xs font-medium text-[#174A2E]/50">
                        {review.location} • {review.date}
                      </p>
                    </div>
                    <BadgeCheck className="ml-auto h-5 w-5 shrink-0 text-[#2E7D32]" aria-label="যাচাইকৃত ক্রেতা" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#174A2E] via-[#123A24] to-[#0F3320] px-6 py-12 text-center shadow-2xl shadow-[#174A2E]/30 ring-1 ring-[#F6B800]/20 sm:px-12 sm:py-16">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[#F6B800]/25 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
          <div className="relative">
            <Badge className="rounded-full bg-[#F6B800] px-3.5 py-1.5 text-xs font-bold tracking-widest uppercase text-[#174A2E] shadow-md shadow-[#F6B800]/30 hover:bg-[#F6B800]">
              সীমিত স্টক
            </Badge>
            <h2 className="mt-5 text-3xl font-black tracking-tighter text-white sm:text-5xl">আজই অর্ডার করুন</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
              মৌসুম শেষ হওয়ার আগেই আপনার পছন্দের আম অর্ডার করে ফেলুন। পণ্য হাতে পেয়ে যাচাই করে টাকা পরিশোধ করুন।
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-14 rounded-2xl bg-[#F6B800] px-9 text-base font-black tracking-wide text-[#174A2E] shadow-xl shadow-[#F6B800]/30 transition-all hover:-translate-y-0.5 hover:bg-[#FFC72C] hover:shadow-2xl"
                asChild
              >
                <a href="tel:+8801700000000">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  কল করুন: ০১৭০০-০০০০০০
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 rounded-2xl border-2 border-white/30 bg-transparent px-9 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/10 hover:text-white"
                asChild
              >
                <a href="#order">
                  অর্ডার ফর্মে যান
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#174A2E] text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5">
                <img
                  src={LOGO_PATH}
                  alt="Mango Delight লোগো"
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0 rounded-xl object-contain ring-1 ring-white/15"
                  loading="lazy"
                />
                <h3 className="text-xl font-extrabold tracking-tight text-[#F6B800]">Mango Delight</h3>
              </div>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
                সরাসরি বাগান থেকে তাজা, মিষ্টি ও রসালো আম। ফরমালিনমুক্ত, সারা দেশে হোম ডেলিভারি — বিশ্বাসের সাথে ২০১৮ থেকে।
              </p>
              <div className="mt-6 flex gap-2.5">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="ফেসবুকে আমঘর"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/10 transition-colors hover:bg-[#F6B800] hover:text-[#174A2E]"
                >
                  <Facebook className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="ইনস্টাগ্রামে আমঘর"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/10 transition-colors hover:bg-[#F6B800] hover:text-[#174A2E]"
                >
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="ইউটিউবে আমঘর"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/10 transition-colors hover:bg-[#F6B800] hover:text-[#174A2E]"
                >
                  <Youtube className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold tracking-wide text-white">দ্রুত লিংক</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a href="#varieties" className="text-white/70 transition-colors hover:text-[#F6B800]">
                    আমের ভ্যারাইটি
                  </a>
                </li>
                <li>
                  <a href="#order" className="text-white/70 transition-colors hover:text-[#F6B800]">
                    অর্ডার করুন
                  </a>
                </li>
                <li>
                  <Link to="/" className="text-white/70 transition-colors hover:text-[#F6B800]">
                    হোমপেজ
                  </Link>
                </li>
                <li>
                  <Link to="/mango" className="text-white/70 transition-colors hover:text-[#F6B800]">
                    আমাদের সম্পর্কে
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold tracking-wide text-white">যোগাযোগ</h4>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                    <Phone className="h-4 w-4 text-[#F6B800]" aria-hidden="true" />
                  </span>
                  ০১৭০০-০০০০০০
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                    <MapPin className="h-4 w-4 text-[#F6B800]" aria-hidden="true" />
                  </span>
                  চাঁপাইনবাবগঞ্জ, বাংলাদেশ
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                    <Clock className="h-4 w-4 text-[#F6B800]" aria-hidden="true" />
                  </span>
                  প্রতিদিন সকাল ৯টা - রাত ৯টা
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold tracking-wide text-white">ডেলিভারি তথ্য</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-white/70">
                <li>ঢাকায় ২৪ ঘণ্টায় ডেলিভারি</li>
                <li>ঢাকার বাইরে ৪৮–৭২ ঘণ্টা</li>
                <li>ক্যাশ অন ডেলিভারি</li>
                <li>ক্ষতিগ্রস্ত পণ্য ফেরতযোগ্য</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:text-sm">
            <p>© {new Date().getFullYear()} আমঘর — সর্বস্বত্ব সংরক্ষিত।</p>
            <p className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-[#F6B800]" aria-hidden="true" />
              নিরাপদ ও বিশ্বস্ত কেনাকাটা
            </p>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-[#F6B800]/30 bg-white/95 p-3 shadow-2xl shadow-[#174A2E]/20 backdrop-blur-xl sm:hidden">
        <div className="flex items-center gap-3">
          <a
            href="tel:+8801700000000"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#174A2E]/15 bg-[#FFF9E8] text-[#174A2E]"
            aria-label="কল করুন"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
          </a>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#174A2E]/50">কার্ট হিসাব</p>
            <p className="truncate text-lg font-black tracking-tight text-[#174A2E]">{formatPrice(totalPrice)}</p>
          </div>
          <Button
            className="h-12 shrink-0 rounded-xl bg-gradient-to-b from-[#2E7D32] to-[#174A2E] px-5 text-sm font-extrabold text-white shadow-lg shadow-[#174A2E]/25 hover:from-[#256628] hover:to-[#123A24]"
            asChild
          >
            <a href="#order">
              অর্ডার করুন
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>

      <div className="h-20 sm:hidden" aria-hidden="true" />
    </div>
  );
}
