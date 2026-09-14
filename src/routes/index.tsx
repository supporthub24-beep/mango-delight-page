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
      { name: "twitter:card", content: "summary_large_image" },
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

const HERO_IMAGE_PATH = "/generated/fresh-mangoes-hero-1789372889512.png";
const HERO_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1200&auto=format&fit=crop";
const QUALITY_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1200&auto=format&fit=crop";

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
    title: "আম বাছাই করুন",
    description: "আপনার পছন্দের ভ্যারাইটি ও ওজন নির্বাচন করুন।",
  },
  {
    step: "২",
    title: "অর্ডার ফর্ম পূরণ করুন",
    description: "নাম, ফোন নম্বর ও ঠিকানা দিয়ে অর্ডার নিশ্চিত করুন।",
  },
  {
    step: "৩",
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
  },
  {
    name: "সাবিনা ইয়াসমিন",
    location: "চট্টগ্রাম",
    rating: 5,
    comment: "ফরমালিনমুক্ত আমের কোনো তুলনা হয় না। বাচ্চারা খুব পছন্দ করেছে।",
    date: "৫ দিন আগে",
  },
  {
    name: "কামরুল হাসান",
    location: "রাজশাহী",
    rating: 4,
    comment: "ডেলিভারি সময়মতো পেয়েছি, আমগুলো খুব মিষ্টি ছিল। আবার অর্ডার করব।",
    date: "১ সপ্তাহ আগে",
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
    <div className="min-h-screen bg-[#FFF9E8]">
      {/* Countdown Offer Banner */}
      <div className="bg-[#174A2E] text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-3 py-2.5 sm:flex-row sm:px-6 sm:py-3 lg:px-8">
          <p className="flex items-center gap-1.5 text-xs font-medium sm:text-sm">
            <Clock className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden="true" />
            <span>মৌসুমি অফার — ১০% ছাড় শেষ হতে বাকি:</span>
          </p>
          <div className="flex items-center gap-1.5" role="timer" aria-label="অফার শেষ হওয়ার সময়">
            <span className="rounded bg-[#F6B800] px-1.5 py-0.5 font-mono text-xs font-bold text-[#174A2E] sm:px-2 sm:py-1 sm:text-sm">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-xs font-bold text-[#F6B800] sm:text-sm">:</span>
            <span className="rounded bg-[#F6B800] px-1.5 py-0.5 font-mono text-xs font-bold text-[#174A2E] sm:px-2 sm:py-1 sm:text-sm">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="text-xs font-bold text-[#F6B800] sm:text-sm">:</span>
            <span className="rounded bg-[#F6B800] px-1.5 py-0.5 font-mono text-xs font-bold text-[#174A2E] sm:px-2 sm:py-1 sm:text-sm">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F6B800]/20 via-[#FFF9E8] to-[#FFF9E8]">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="text-center lg:text-left">
              <Badge className="mb-3 inline-flex bg-[#F6B800] text-xs font-semibold text-[#174A2E] hover:bg-[#F6B800]/90 sm:mb-4 sm:text-sm">
                <Award className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
                আমঘর — বিশ্বস্ত আম বিক্রেতা
              </Badge>
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-[#174A2E] xs:text-3xl sm:text-5xl lg:text-6xl">
                তাজা আম, সরাসরি বাগান থেকে আপনার ঘরে
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-[#174A2E]/80 sm:mt-6 sm:text-lg">
                চাঁপাইনবাবগঞ্জ ও রাজশাহীর সেরা বাগান থেকে বাছাই করা মিষ্টি ও রসালো আম।
                ফরমালিনমুক্ত, সারা দেশে হোম ডেলিভারি, ক্যাশ অন ডেলিভারি।
              </p>
              <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="h-12 w-full bg-[#2E7D32] text-base font-semibold text-white hover:bg-[#2E7D32]/90 sm:w-auto"
                  asChild
                >
                  <a href="#varieties">আম দেখুন</a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 w-full border-[#2E7D32] text-base font-semibold text-[#2E7D32] hover:bg-[#2E7D32]/10 sm:w-auto"
                  asChild
                >
                  <a href="tel:+8801700000000">
                    <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                    অর্ডার করতে কল করুন
                  </a>
                </Button>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs font-medium text-[#174A2E] sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 sm:text-left sm:text-sm lg:justify-start">
                <div className="flex flex-col items-center gap-1 rounded-lg bg-white/60 p-2 shadow-xs sm:flex-row sm:bg-transparent sm:p-0 sm:shadow-none">
                  <Star className="h-4 w-4 fill-[#F6B800] text-[#F6B800]" aria-hidden="true" />
                  <span>৪.৮/৫ রেটিং</span>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-lg bg-white/60 p-2 shadow-xs sm:flex-row sm:bg-transparent sm:p-0 sm:shadow-none">
                  <ShieldCheck className="h-4 w-4 text-[#2E7D32]" aria-hidden="true" />
                  <span>১০০% ফরমালিনমুক্ত</span>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-lg bg-white/60 p-2 shadow-xs sm:flex-row sm:bg-transparent sm:p-0 sm:shadow-none">
                  <Truck className="h-4 w-4 text-[#2E7D32]" aria-hidden="true" />
                  <span>সারা দেশে ডেলিভারি</span>
                </div>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="aspect-[16/11] w-full overflow-hidden rounded-2xl bg-[#2E7D32]/10 shadow-xl sm:aspect-[4/3]">
                <img
                  src={HERO_IMAGE_PATH}
                  onError={(e) => handleImageFallback(e, HERO_FALLBACK_IMAGE)}
                  alt="বাগানে ঝুলে থাকা পাকা সোনালি আম"
                  className="h-full w-full object-cover object-center"
                  loading="eager"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-[#F6B800] px-3.5 py-1.5 text-xs font-bold text-[#174A2E] shadow-md whitespace-nowrap sm:px-4 sm:py-2 sm:text-sm">
                মৌসুমি অফার — ১০% ছাড়
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Varieties Section */}
      <section id="varieties" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#174A2E] sm:text-4xl">
            আমাদের আমের ভ্যারাইটি
          </h2>
          <p className="mt-2 text-sm text-[#174A2E]/70 sm:mt-4 sm:text-base">
            প্রতিটি আম হাতে বাছাই করা — ওজন নির্বাচন করে লাইভ মূল্য দেখুন।
          </p>
        </div>

        {loading ? (
          <div className="mt-8 grid gap-4 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-44 w-full" />
                <CardHeader className="p-4">
                  <Skeleton className="h-5 w-3/4" />
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-2/3" />
                </CardContent>
                <CardFooter className="p-4">
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : mangoVarieties.length === 0 ? (
          <div className="mt-8 rounded-lg border border-dashed border-[#2E7D32]/30 p-8 text-center sm:p-12">
            <p className="text-sm text-[#174A2E]/70 sm:text-base">
              এই মুহূর্তে কোনো আম স্টকে নেই। অনুগ্রহ করে পরে আবার দেখুন।
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            {mangoVarieties.map((variety) => {
              const selectedWeight = selectedWeights[variety.id] ?? 3;
              const livePrice = variety.pricePerKg * selectedWeight;
              return (
                <Card key={variety.id} className="flex flex-col overflow-hidden border-[#2E7D32]/20 shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#2E7D32]/10 sm:aspect-video">
                    <img
                      src={variety.image}
                      onError={(e) => handleImageFallback(e, variety.fallbackImage)}
                      alt={`${variety.banglaName} (${variety.name}) আম`}
                      className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                    {variety.tag && (
                      <Badge className="absolute left-2.5 top-2.5 bg-[#F6B800] text-xs font-semibold text-[#174A2E] hover:bg-[#F6B800]/90">
                        {variety.tag}
                      </Badge>
                    )}
                  </div>
                  <CardHeader className="p-4 pb-2 sm:p-6 sm:pb-3">
                    <CardTitle className="text-base font-bold text-[#174A2E] sm:text-lg">
                      {variety.banglaName}{" "}
                      <span className="text-xs font-normal text-[#174A2E]/60 sm:text-sm">
                        ({variety.name})
                      </span>
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-[#F6B800] text-[#F6B800]" aria-hidden="true" />
                      <span className="text-xs font-semibold text-[#174A2E] sm:text-sm">
                        {variety.rating}
                      </span>
                      <span className="text-xs text-[#174A2E]/60">
                        ({variety.reviews} রিভিউ)
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-4 pt-0 sm:p-6 sm:pt-0">
                    <p className="text-xs text-[#174A2E]/70 sm:text-sm">{variety.description}</p>
                    <div className="mt-3 sm:mt-4">
                      <label
                        htmlFor={`weight-${variety.id}`}
                        className="mb-1.5 block text-xs font-semibold text-[#174A2E] sm:text-sm"
                      >
                        ওজন নির্বাচন করুন:
                      </label>
                      <div className="flex gap-1.5 sm:gap-2" role="radiogroup" aria-label={`${variety.banglaName} ওজন`}>
                        {weightOptions.map((weight) => (
                          <button
                            key={weight}
                            type="button"
                            role="radio"
                            aria-checked={selectedWeight === weight}
                            onClick={() =>
                              setSelectedWeights((prev) => ({ ...prev, [variety.id]: weight }))
                            }
                            className={`flex-1 rounded-md border py-2 text-xs font-semibold transition-colors min-h-[40px] flex items-center justify-center ${
                              selectedWeight === weight
                                ? "border-[#2E7D32] bg-[#2E7D32] text-white"
                                : "border-[#2E7D32]/30 bg-white text-[#174A2E] hover:border-[#2E7D32]"
                            }`}
                          >
                            {weight} কেজি
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3 flex items-baseline justify-between sm:mt-4 sm:block">
                      <p className="text-xl font-bold text-[#174A2E] sm:text-2xl">
                        {formatPrice(livePrice)}
                        <span className="ml-1 text-xs font-normal text-[#174A2E]/60 sm:text-sm">
                          ({selectedWeight} কেজি)
                        </span>
                      </p>
                      <p className="text-xs text-[#174A2E]/60">
                        {formatPrice(variety.pricePerKg)} {variety.unit}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 sm:p-6 sm:pt-0">
                    <Button
                      className="h-11 w-full bg-[#2E7D32] text-sm font-semibold text-white hover:bg-[#2E7D32]/90 sm:h-10"
                      onClick={() => addToCart(variety)}
                    >
                      <ShoppingCart className="mr-1.5 h-4 w-4" aria-hidden="true" />
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
      <section className="bg-[#174A2E]/5">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-[#174A2E] sm:text-4xl">
              কেন আমঘর থেকে কিনবেন?
            </h2>
            <p className="mt-2 text-sm text-[#174A2E]/70 sm:mt-4 sm:text-base">
              আমরা সরাসরি বাগান থেকে আম সংগ্রহ করি, তাই মান ও দাম দুটোই সেরা।
            </p>
          </div>
          <div className="mt-8 grid gap-3 grid-cols-2 lg:grid-cols-4 sm:gap-6">
            {whyUs.map((item) => (
              <Card key={item.title} className="border-[#2E7D32]/20 text-center p-3 sm:p-4">
                <CardHeader className="p-2 sm:p-4">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#F6B800]/20 sm:h-12 sm:w-12">
                    <item.icon className="h-5 w-5 text-[#2E7D32] sm:h-6 sm:w-6" aria-hidden="true" />
                  </div>
                  <CardTitle className="mt-2 text-sm font-bold text-[#174A2E] sm:mt-4 sm:text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-2 pt-0 sm:p-4 sm:pt-0">
                  <p className="text-xs text-[#174A2E]/70 sm:text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Control Section */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#174A2E] sm:text-4xl">
              আমাদের কোয়ালিটি কন্ট্রোল
            </h2>
            <p className="mt-2 text-sm text-[#174A2E]/70 sm:mt-4 sm:text-base">
              প্রতিটি আম আপনার কাছে পৌঁছানোর আগে কঠোর মান যাচাই প্রক্রিয়ার মধ্য দিয়ে যায়।
            </p>
            <ul className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
              {qualityChecks.map((check) => (
                <li key={check} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2E7D32] sm:h-6 sm:w-6">
                    <Check className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-medium text-[#174A2E] sm:text-base">{check}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#2E7D32]/10 shadow-lg sm:aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1200&auto=format&fit=crop"
              onError={(e) => handleImageFallback(e, QUALITY_FALLBACK_IMAGE)}
              alt="আমের মান যাচাই করা হচ্ছে"
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-[#174A2E]">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
              কীভাবে অর্ডার করবেন?
            </h2>
            <p className="mt-2 text-sm text-white/80 sm:mt-4 sm:text-base">
              মাত্র তিনটি সহজ ধাপে আপনার পছন্দের আম অর্ডার করুন।
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-6">
            {howItWorks.map((item) => (
              <div key={item.step} className="rounded-xl bg-white/10 p-4 text-center sm:p-6">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#F6B800] text-lg font-bold text-[#174A2E] sm:h-12 sm:w-12 sm:text-xl">
                  {item.step}
                </div>
                <h3 className="mt-3 text-base font-semibold text-white sm:mt-4 sm:text-lg">{item.title}</h3>
                <p className="mt-1 text-xs text-white/80 sm:mt-2 sm:text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section id="order" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#174A2E] sm:text-4xl">
              অর্ডার করতে ফর্ম পূরণ করুন
            </h2>
            <p className="mt-2 text-sm text-[#174A2E]/70 sm:mt-4 sm:text-base">
              ফর্ম পূরণ করলে আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।
              পণ্য হাতে পেয়ে টাকা দিন — কোনো অগ্রিম পেমেন্ট নেই।
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:block sm:space-y-4">
              {deliveryInfo.map((item) => (
                <div key={item.title} className="flex flex-col items-start gap-2 rounded-lg bg-[#174A2E]/5 p-3 sm:flex-row sm:bg-transparent sm:p-0">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F6B800]/20 sm:h-10 sm:w-10">
                    <item.icon className="h-4 w-4 text-[#2E7D32] sm:h-5 sm:w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-[#174A2E] sm:text-base">{item.title}</h3>
                    <p className="text-[11px] text-[#174A2E]/70 sm:text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Card className="border-[#2E7D32]/20 shadow-md">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg font-bold text-[#174A2E] sm:text-xl">অর্ডার ফর্ম</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
              <form onSubmit={handleFormSubmit} className="space-y-3.5 sm:space-y-4" noValidate>
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-xs font-medium text-[#174A2E] sm:text-sm"
                  >
                    আপনার নাম *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className={`h-11 w-full rounded-md border px-3 py-2 text-base text-[#174A2E] focus:outline-none focus:ring-2 focus:ring-[#2E7D32] sm:h-10 sm:text-sm ${
                      formErrors.name ? "border-red-500" : "border-[#2E7D32]/30"
                    }`}
                    placeholder="আপনার নাম লিখুন"
                    aria-invalid={!!formErrors.name}
                    aria-describedby={formErrors.name ? "name-error" : undefined}
                  />
                  {formErrors.name && (
                    <p id="name-error" className="mt-1 text-xs text-red-500">
                      {formErrors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-xs font-medium text-[#174A2E] sm:text-sm"
                  >
                    মোবাইল নম্বর *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    className={`h-11 w-full rounded-md border px-3 py-2 text-base text-[#174A2E] focus:outline-none focus:ring-2 focus:ring-[#2E7D32] sm:h-10 sm:text-sm ${
                      formErrors.phone ? "border-red-500" : "border-[#2E7D32]/30"
                    }`}
                    placeholder="01XXXXXXXXX"
                    aria-invalid={!!formErrors.phone}
                    aria-describedby={formErrors.phone ? "phone-error" : undefined}
                  />
                  {formErrors.phone && (
                    <p id="phone-error" className="mt-1 text-xs text-red-500">
                      {formErrors.phone}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="mb-1.5 block text-xs font-medium text-[#174A2E] sm:text-sm"
                  >
                    ডেলিভারির ঠিকানা *
                  </label>
                  <textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                    className={`w-full rounded-md border p-3 text-base text-[#174A2E] focus:outline-none focus:ring-2 focus:ring-[#2E7D32] sm:text-sm ${
                      formErrors.address ? "border-red-500" : "border-[#2E7D32]/30"
                    }`}
                    placeholder="বাসা/রোড/এলাকা/জেলা"
                    rows={3}
                    aria-invalid={!!formErrors.address}
                    aria-describedby={formErrors.address ? "address-error" : undefined}
                  />
                  {formErrors.address && (
                    <p id="address-error" className="mt-1 text-xs text-red-500">
                      {formErrors.address}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
                  <div>
                    <label
                      htmlFor="variety"
                      className="mb-1.5 block text-xs font-medium text-[#174A2E] sm:text-sm"
                    >
                      আমের ভ্যারাইটি *
                    </label>
                    <select
                      id="variety"
                      value={formData.variety}
                      onChange={(e) => setFormData((prev) => ({ ...prev, variety: e.target.value }))}
                      className={`h-11 w-full rounded-md border px-3 py-2 text-base text-[#174A2E] focus:outline-none focus:ring-2 focus:ring-[#2E7D32] sm:h-10 sm:text-sm ${
                        formErrors.variety ? "border-red-500" : "border-[#2E7D32]/30"
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
                      <p id="variety-error" className="mt-1 text-xs text-red-500">
                        {formErrors.variety}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="weight"
                      className="mb-1.5 block text-xs font-medium text-[#174A2E] sm:text-sm"
                    >
                      ওজন
                    </label>
                    <select
                      id="weight"
                      value={formData.weight}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, weight: Number(e.target.value) }))
                      }
                      className="h-11 w-full rounded-md border border-[#2E7D32]/30 px-3 py-2 text-base text-[#174A2E] focus:outline-none focus:ring-2 focus:ring-[#2E7D32] sm:h-10 sm:text-sm"
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
                  className="h-12 w-full bg-[#2E7D32] text-base font-semibold text-white hover:bg-[#2E7D32]/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "অর্ডার প্রক্রিয়া হচ্ছে..." : "অর্ডার নিশ্চিত করুন"}
                </Button>
                <p className="text-center text-xs text-[#174A2E]/70">
                  <ShieldCheck className="mr-1 inline h-4 w-4 text-[#2E7D32]" aria-hidden="true" />
                  ক্যাশ অন ডেলিভারি — পণ্য হাতে পেয়ে টাকা দিন
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-[#174A2E]/5">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-[#174A2E] sm:text-4xl">
              গ্রাহকদের মতামত
            </h2>
            <p className="mt-2 text-sm text-[#174A2E]/70 sm:mt-4 sm:text-base">
              আমাদের গ্রাহকরা যা বলছেন — তাদের সন্তুষ্টিই আমাদের সেরা অর্জন।
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {reviews.map((review) => (
              <Card key={review.name} className="border-[#2E7D32]/20 shadow-xs">
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < review.rating
                            ? "fill-[#F6B800] text-[#F6B800]"
                            : "text-[#174A2E]/20"
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <CardTitle className="text-base font-bold text-[#174A2E]">{review.name}</CardTitle>
                  <p className="text-xs text-[#174A2E]/60">
                    {review.location} • {review.date}
                  </p>
                </CardHeader>
                <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                  <p className="text-xs text-[#174A2E]/80 sm:text-sm">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="rounded-2xl bg-[#174A2E] px-4 py-8 text-center sm:px-12 sm:py-16">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
            আজই অর্ডার করুন
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-white/90 sm:mt-4 sm:text-base">
            সীমিত স্টক — মৌসুম শেষ হওয়ার আগেই আপনার পছন্দের আম অর্ডার করে ফেলুন।
            পণ্য হাতে পেয়ে টাকা পরিশোধ করুন।
          </p>
          <div className="mt-6 flex flex-col justify-center gap-2.5 sm:mt-8 sm:flex-row sm:gap-3">
            <Button
              size="lg"
              className="h-12 w-full bg-[#F6B800] text-base font-bold text-[#174A2E] hover:bg-[#F6B800]/90 sm:w-auto"
              asChild
            >
              <a href="tel:+8801700000000">
                <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                কল করুন: ০১৭০০-০০০০০০
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 w-full border-white/40 bg-transparent text-base font-semibold text-white hover:bg-white/10 sm:w-auto"
              asChild
            >
              <a href="#order">অর্ডার ফর্মে যান</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#174A2E] text-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-lg font-bold text-[#F6B800] sm:text-xl">আমঘর</h3>
              <p className="mt-2 text-xs leading-relaxed text-white/80 sm:mt-4 sm:text-sm">
                সরাসরি বাগান থেকে তাজা, মিষ্টি ও রসালো আম। ফরমালিনমুক্ত, সারা দেশে হোম ডেলিভারি।
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#F6B800] sm:text-base">দ্রুত লিংক</h4>
              <ul className="mt-2 space-y-1.5 text-xs sm:mt-4 sm:space-y-2 sm:text-sm">
                <li>
                  <a href="#varieties" className="text-white/80 hover:text-[#F6B800]">
                    আমের ভ্যারাইটি
                  </a>
                </li>
                <li>
                  <a href="#order" className="text-white/80 hover:text-[#F6B800]">
                    অর্ডার করুন
                  </a>
                </li>
                <li>
                  <Link to="/" className="text-white/80 hover:text-[#F6B800]">
                    হোমপেজ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#F6B800] sm:text-base">যোগাযোগ</h4>
              <ul className="mt-2 space-y-1.5 text-xs text-white/80 sm:mt-4 sm:space-y-2 sm:text-sm">
                <li className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  ০১৭০০-০০০০০০
                </li>
                <li className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  চাঁপাইনবাবগঞ্জ, বাংলাদেশ
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#F6B800] sm:text-base">সোশ্যাল মিডিয়া</h4>
              <div className="mt-3 flex gap-2.5 sm:mt-4 sm:gap-3">
                <a
                  href="#"
                  aria-label="ফেসবুক"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#F6B800] hover:text-[#174A2E] transition-colors"
                >
                  <Facebook className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#"
                  aria-label="ইনস্টাগ্রাম"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#F6B800] hover:text-[#174A2E] transition-colors"
                >
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#"
                  aria-label="ইউটিউব"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#F6B800] hover:text-[#174A2E] transition-colors"
                >
                  <Youtube className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-white/60 sm:text-sm">
            © {new Date().getFullYear()} আমঘর — সর্বস্বত্ব সংরক্ষিত।
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#2E7D32]/20 bg-white/95 p-3 shadow-2xl backdrop-blur-md sm:hidden">
        <div className="flex items-center justify-between gap-2.5">
          <a
            href="tel:+8801700000000"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#2E7D32]/30 bg-[#2E7D32]/10 text-[#2E7D32]"
            aria-label="কল করুন"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
          </a>
          <div className="flex-1">
            <p className="text-[10px] font-medium text-[#174A2E]/60">কার্ট হিসাব</p>
            <p className="text-base font-bold text-[#174A2E]">{formatPrice(totalPrice)}</p>
          </div>
          <Button
            className="h-11 flex-1 bg-[#2E7D32] px-4 text-sm font-bold text-white hover:bg-[#2E7D32]/90"
            asChild
          >
            <a href="#order">
              অর্ডার করুন
              <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>

      {/* Bottom padding for mobile to account for sticky CTA */}
      <div className="h-20 sm:hidden" aria-hidden="true" />
    </div>
  );
}
