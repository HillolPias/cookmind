import React from "react";
import { Check } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { CheckoutButton } from "@clerk/nextjs/experimental";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function PricingSection({ subscriptionTier = "free" }) {
  return (
    <div className="max-w-6xl mx-auto text-white">
      <div className="mb-16">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
          Simple Pricing
        </h2>
        <p className="text-xl text-white/40 font-light">
          Start for free. Upgrade to become a master chef.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Plan */}
        <Card className="border border-white/10 bg-white/5 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-white">
              Sous Chef
            </CardTitle>
            <div className="text-5xl font-bold text-white">
              $0
              <span className="text-lg font-normal text-white/30">/mo</span>
            </div>
            <CardDescription className="text-white/40 font-light text-base">
              Perfect for casual weekly cooks.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ul className="space-y-4">
              {[
                "10 pantry scans per month",
                "5 AI meal recommendations",
                "Standard support",
                "Standard Recipes",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-white/60">
                  <Check className="h-5 w-5 shrink-0 mt-0.5 text-purple-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter className={"mt-auto"}>
            <Link href="/dashboard" className="w-full">
              <Button className="w-full border border-white/15 text-white/70 hover:bg-white/8 hover:text-white hover:border-white/25 transition-all">
                Get Started
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className="relative border border-purple-500/40 bg-purple-500/8 rounded-2xl shadow-xl shadow-purple-500/10">
          <Badge className="absolute top-0 right-0 rounded-none rounded-bl-2xl bg-linear-to-r from-violet-600 to-pink-500 text-white font-bold uppercase tracking-wide border-none text-xs px-3 py-1">
            MOST POPULAR
          </Badge>

          <CardHeader>
            <CardTitle className="text-3xl font-bold bg-linear-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              Head Chef
            </CardTitle>
            <div className="text-5xl font-bold text-white">
              $7.99
              <span className="text-lg font-normal text-white/30">/mo</span>
            </div>
            <CardDescription className="text-white/40 font-light text-base">
              For the serious home cook.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ul className="space-y-4">
              {[
                "Unlimited pantry scans",
                "Unlimited AI recipes",
                "Priority Support",
                "Recipes with Nutritional analysis",
                "Chef's Tips & Tricks",
                "Ingredient Substitutions",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-white/80">
                  <Badge className="bg-purple-500/20 p-1 rounded-full h-6 w-6 flex items-center justify-center border-none shrink-0">
                    <Check className="h-4 w-4 text-purple-300" />
                  </Badge>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter>
            <SignedIn>
              <CheckoutButton
                planId="cplan_37y5uChZ9uYauQyTlDkXDh997ht"
                planPeriod="month"
                newSubscriptionRedirectUrl="/dashboard"
                checkoutProps={{
                  appearance: {
                    elements: {
                      drawerRoot: {
                        zIndex: 2000,
                      },
                    },
                  },
                }}
              >
                <Button
                  disabled={subscriptionTier === "pro"}
                  className="w-full bg-linear-to-r from-violet-600 via-purple-500 to-pink-500 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed text-white border-0 shadow-lg shadow-purple-500/25 transition-all"
                >
                  {subscriptionTier === "pro" ? "Subscribed" : "Subscribe Now"}
                </Button>
              </CheckoutButton>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button className="w-full bg-linear-to-r from-violet-600 via-purple-500 to-pink-500 hover:opacity-90 text-white border-0 shadow-lg shadow-purple-500/25 transition-all">
                  Login to Subscribe
                </Button>
              </SignInButton>
            </SignedOut>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
