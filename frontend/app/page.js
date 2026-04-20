import React from "react";
import { ArrowRight, Star, Flame, Clock, Users } from "lucide-react";
import Image from "next/image";
import { SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { auth } from "@clerk/nextjs/server";
import { SITE_STATS, FEATURES, HOW_IT_WORKS_STEPS } from "@/lib/data";
import PricingSection from "@/components/PricingSection";
import Link from "next/link";

export default async function LandingPage() {
  const { has } = await auth();
  const subscriptionTier = has({ plan: "pro" }) ? "pro" : "free";

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
              <Badge
                variant="outline"
                className="border border-purple-500/30 text-purple-300 bg-purple-500/10 text-xs font-semibold mb-6 uppercase tracking-widest rounded-full px-4 backdrop-blur-sm"
              >
                <Flame className="mr-1" />
                Your Personal AI Chef
              </Badge>

              <h1 className="text-5xl md:text-[82px] font-black mb-6 leading-[0.85] tracking-tighter text-white [text-balance]">
                <span className="bg-linear-to-b from-white to-white/70 bg-clip-text text-transparent">
                  From random{" "}
                </span>
                <span className="italic bg-linear-to-r from-violet-500 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  ingredients
                </span>
                <br />

                <span className="bg-linear-to-b from-white to-white/60 bg-clip-text text-transparent">
                  to restaurant-level meals
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-lg mx-auto md:mx-0 font-light leading-relaxed">
                Just take a photo—our AI handles the rest. Discover recipes, cut
                waste, and cook like a pro.
              </p>

              <Link href="/dashboard">
                <Button
                  size="xl"
                  variant="primary"
                  className="px-8 py-6 text-lg rounded-2xl bg-linear-to-r from-violet-600 via-purple-500 to-pink-500 border-0 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02] transition-all duration-200"
                >
                  Cook Something Amazing
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>

              <p className="mt-6 text-sm text-slate-500">
                <span className="font-bold text-slate-200">
                  10,000+ home chefs
                </span>{" "}
                joined last month
              </p>
            </div>

            {/* Hero Image */}
            <Card className="relative aspect-square md:aspect-4/5 border border-white/10 bg-neutral-900 overflow-hidden py-0 rounded-3xl shadow-2xl shadow-black/60 ring-1 ring-white/5">
              <Image
                src="/steak-homemade-potatoes.jpg"
                alt="Delicious steak-potato dish"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />

              {/* Floating Card */}
              <Card className="absolute bottom-8 left-8 right-8 bg-white/8 backdrop-blur-xl border border-white/15 py-0 rounded-2xl shadow-xl">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-white">
                        Steak with Potatoes
                      </h3>
                      <div className="flex gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-orange-500 text-orange-500"
                          />
                        ))}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 font-semibold rounded-full text-xs"
                    >
                      98% MATCH
                    </Badge>
                  </div>
                  <div className="flex gap-4 text-xs text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> 25 mins
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" /> 2 servings
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 border-y border-white/8 bg-[#111111]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center px-4">
          {SITE_STATS.map((stat, i) => (
            <div key={i}>
              <div className="text-4xl font-black mb-1 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                {stat.val}
              </div>
              <Badge
                variant="secondary"
                className="bg-transparent text-purple-400 text-sm uppercase tracking-wider font-medium border-none"
              >
                {stat.label}
              </Badge>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-4 text-white">
              Your Smart Kitchen
            </h2>
            <p className="text-slate-400 text-xl font-light">
              Everything you need to master your meal prep.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="border border-white/8 bg-white/4 hover:border-purple-500/40 hover:bg-white/7 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 group py-0 rounded-2xl"
                >
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div className="border border-purple-500/20 bg-purple-500/10 p-3 group-hover:border-purple-500/50 group-hover:bg-purple-500/20 transition-colors rounded-xl">
                        <IconComponent className="w-6 h-6 text-purple-200" />
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-xs font-mono bg-white/5 text-white/60 uppercase tracking-wide border border-white/10"
                      >
                        {feature.limit}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 text-lg font-light">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 border-y border-white/8 bg-[#111111] text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-16">
            Cook in 3 Steps
          </h2>

          <div className="space-y-12">
            {HOW_IT_WORKS_STEPS.map((item, i) => (
              <div key={i}>
                <div className="flex gap-6 items-start">
                  <Badge
                    variant="outline"
                    className="text-6xl font-bold bg-linear-to-b from-violet-400 to-pink-400 bg-clip-text text-transparent border-none bg-transparent p-0 h-auto"
                  >
                    {item.step}
                  </Badge>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-lg text-slate-400 font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
                {i < HOW_IT_WORKS_STEPS.length - 1 && (
                  <hr className="my-8 border-white/6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Now Using Component */}
      <section className="py-24 px-4 relative before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-96 before:h-px before:bg-linear-to-r before:from-transparent before:via-purple-500/40 before:to-transparent">
        <PricingSection subscriptionTier={subscriptionTier} />
      </section>
    </div>
  );
}
