import React from "react";
import { Button } from "./ui/button";
import { Cookie, Refrigerator, Sparkles } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import HowToCookModal from "./HowToCookModal";
import PricingModal from "./PricingModal";
import Image from "next/image";
import { checkUser } from "@/lib/checkUser";
import { Badge } from "./ui/badge";
import UserDropdown from "./UserDropdown";

export default async function Header() {
  const user = await checkUser();

  return (
    <header className="fixed top-0 w-full border-b border-white/8 bg-[#0D0D0D]/80 backdrop-blur-md z-50">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={user ? "/dashboard" : "/"}
          className="flex items-center gap-2 group"
        >
          <Image
            src="/cookmind-logo.svg"
            alt="Servd Logo"
            width={60}
            height={60}
            className="w-42"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/80">
          <Link
            href="/recipes"
            className="hover:text-purple-400 transition-colors duration-200 flex gap-1.5 items-center hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]"
          >
            <Cookie className="w-4 h-4" />
            My Recipes
          </Link>
          <Link
            href="/pantry"
            className="hover:text-purple-400 transition-colors duration-200 flex gap-1.5 items-center hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]"
          >
            <Refrigerator className="w-4 h-4" />
            My Pantry
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <HowToCookModal />

          <SignedIn>
            {/* Pricing Modal with Built-in Trigger */}
            {user && (
              <PricingModal subscriptionTier={user.subscriptionTier}>
                <Badge
                  variant="outline"
                  className={`flex h-8 px-3 gap-1.5 rounded-full text-xs font-semibold transition-all ${
                    user.subscriptionTier === "pro"
                      ? "bg-linear-to-r from-violet-600 via-purple-500 to-pink-500 text-white border-none shadow-md shadow-purple-500/30"
                      : "bg-white/5 text-slate-400 border-white/10 cursor-pointer hover:bg-white/10 hover:border-white/20 hover:text-slate-300"
                  }`}
                >
                  <Sparkles
                    className={`h-3 w-3 ${
                      user.subscriptionTier === "pro"
                        ? "text-white fill-white/20"
                        : "text-slate-500"
                    }`}
                  />
                  <span>
                    {user.subscriptionTier === "pro" ? "Pro Chef" : "Free Plan"}
                  </span>
                </Badge>
              </PricingModal>
            )}

            <UserDropdown />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                className="text-white/40 hover:text-purple-400 hover:bg-purple-500/10 font-medium transition-colors duration-200"
              >
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button
                variant="primary"
                className="px-6 rounded-full bg-linear-to-r from-violet-600 via-purple-500 to-pink-500 border-0 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:opacity-90 hover:scale-[1.02] transition-all duration-200"
              >
                Get Started
              </Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}
