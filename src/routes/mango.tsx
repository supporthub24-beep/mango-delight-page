import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ShoppingCart, Check, Leaf, Truck, ShieldCheck, Phone } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/mango")({
  head: () => ({
    meta: [
      { title: "আম কিনুন | Mango Delight Page" },
      {
        name: "description",
        content:
          "সরাসরি বাগান থেকে তাজা, মিষ্টি ও রসালো আম কিনুন। হিমসাগর, ল্যাংড়া, আম্রপালি ও ফজলি — সারা দেশে হোম ডেলিভারি।",
      },
      { property: "og:title", content: "আম কিনুন | Mango Delight Page" },
      {
        property: "og:description",
        content:
          "সরাসরি বাগান থেকে তাজা, মিষ্টি ও রসালো আম কিনুন। সারা দেশে হোম ডেলিভারি।",
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
  price: number;
  unit: string;
  description: string;
  image: string;
  tag?: string;
};

const mangoVarieties: MangoVariety[] = [
  {
    id: "himsagar",
    name: "Himsagar",
    banglaName: "হিমসাগর",
    price: 1200,
    unit: "প্রতি মণ",
    description: "চাঁপাইনবাবগঞ্জের বিখ্যাত হিমসাগর — আঁশহীন, মিষ্টি ও রসালো।",
    image: "/mangoes/himsagar.jpg",
    tag: "বেস্ট সেলার",
  },
  {
    id: "langra",
    name: "Langra",
    banglaName: "ল্যাংড়া",
    price: 1100,
    unit: "প্রতি মণ",
    description: "সুগন্ধি ও মিষ্টি ল্যাংড়া আম, পাকলে সোনালি রঙ ধারণ করে।",
    image: "/mangoes/langra.jpg",
  },
  {
    id: "amrapali",
    name: "Amrapali",
    banglaName: "আম্রপালি",
    price: 1000,
    unit: "প্রতি মণ",
    description: "গাঢ় কমলা রঙের আম্রপালি, অত্যন্ত মিষ্টি ও পুষ্টিকর।",
    image: "/mangoes/amrapali.jpg",
  },
  {
    id: "fazli",
    name: "Fazli",
    banglaName: "ফজলি",
    price: 900,
    unit: "প্রতি মণ",
    description: "বড় আকারের ফজলি আম, আঁশবিহীন ও দীর্ঘদিন সংরক্ষণযোগ্য।",
    image: "/mangoes/fazli.jpg",
  },
];

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
    description: "আম পছন্দ না হলে সম্পূর্ণ টাকা ফেরত — কোনো প্রশ্ন ছাড়াই।",
  },
];

function MangoLandingPage() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [loading] = useState(false);

  const addToCart = (variety: MangoVariety) => {
    setCart((prev) => ({ ...prev, [variety.id]: (prev[variety.id] ?? 0) + 1 }));
    toast.success("কার্টে যোগ হয়েছে", {
      description: `${variety.banglaName} (${variety.name}) কার্টে যোগ করা হয়েছে।`,
    });
  };

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <Badge variant="secondary" className="mb-4">
                মৌসুমি অফার — সীমিত সময়ের জন্য
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                তাজা আম, সরাসরি বাগান থেকে
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                চাঁপাইনবাবগঞ্জ ও রাজশাহীর সেরা বাগান থেকে বাছাই করা মিষ্টি ও রসালো আম।
                ফরমালিনমুক্ত, সারা দেশে হোম ডেলিভারি।
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <Button size="lg" asChild>
                  <a href="#varieties">আম দেখুন</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:+8801700000000">
                    <Phone className="mr-2 h-4 w-4" />
                    অর্ডার করতে কল করুন
                  </a>
                </Button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {totalItems > 0
                  ? `কার্টে ${totalItems} টি আইটেম আছে`
                  : "কোনো অর্ডার ফি নেই — পণ্য হাতে পেয়ে টাকা দিন"}
              </p>
            </div>
            <div className="relative">
              <img
                src="/mangoes/hero-mango.jpg"
                alt="বাগানে ঝুলে থাকা পাকা সোনালি আম"
                className="mx-auto w-full max-w-md rounded-2xl object-cover shadow-lg"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Varieties Section */}
      <section id="varieties" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            আমের ভ্যারাইটি
          </h2>
          <p className="mt-4 text-muted-foreground">
            প্রতিটি আম হাতে বাছাই করা — দাম প্রতি মণ হিসেবে দেওয়া।
          </p>
        </div>

        {loading ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-2/3" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : mangoVarieties.length === 0 ? (
          <div className="mt-12 rounded-lg border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">
              এই মুহূর্তে কোনো আম স্টকে নেই। অনুগ্রহ করে পরে আবার দেখুন।
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {mangoVarieties.map((variety) => (
              <Card key={variety.id} className="flex flex-col overflow-hidden">
                <div className="relative">
                  <img
                    src={variety.image}
                    alt={`${variety.banglaName} (${variety.name}) আম`}
                    className="h-48 w-full object-cover"
                    loading="lazy"
                  />
                  {variety.tag && (
                    <Badge className="absolute left-3 top-3" variant="default">
                      {variety.tag}
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {variety.banglaName}{" "}
                    <span className="text-sm font-normal text-muted-foreground">
                      ({variety.name})
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground">{variety.description}</p>
                  <p className="mt-4 text-2xl font-bold text-foreground">
                    ৳{variety.price.toLocaleString("bn-BD")}
                    <span className="ml-1 text-sm font-normal text-muted-foreground">
                      {variety.unit}
                    </span>
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => addToCart(variety)}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    কার্টে যোগ করুন
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Why Us Section */}
      <section className="bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              কেন আমাদের কাছ থেকে কিনবেন?
            </h2>
            <p className="mt-4 text-muted-foreground">
              আমরা সরাসরি বাগান থেকে আম সংগ্রহ করি, তাই মান ও দাম দুটোই সেরা।
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((item) => (
              <Card key={item.title} className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <item.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <CardTitle className="mt-4 text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-primary px-6 py-12 text-center sm:px-12 sm:py-16">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            আজই অর্ডার করুন
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/90">
            সীমিত স্টক — মৌসুম শেষ হওয়ার আগেই আপনার পছন্দের আম অর্ডার করে ফেলুন।
            পণ্য হাতে পেয়ে টাকা পরিশোধ করুন।
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" variant="secondary" asChild>
              <a href="tel:+8801700000000">
                <Phone className="mr-2 h-4 w-4" />
                কল করুন: ০১৭০০-০০০০০০
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link to="/">হোমপেজে ফিরে যান</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
