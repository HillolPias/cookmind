import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import { neobrutalism, simple } from "@clerk/themes";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CookMind - AI Recipes Platform",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: simple,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/cookmind-logo.svg" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />

          {/* Footer */}
          <footer className="py-10 px-4 border-t border-white/8 bg-[#0D0D0D]">
            <div className="max-w-6xl mx-auto">
              {/* Top row */}
              <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
                {/* Logo + tagline */}
                <div className="flex flex-col gap-3">
                  <Image
                    src="/cookmind-logo.svg"
                    alt="Cookmind Logo"
                    width={48}
                    height={48}
                    className="w-26"
                  />
                  <p className="text-white/30 text-sm max-w-50 leading-relaxed">
                    Turn your leftovers into restaurant-level meals.
                  </p>
                </div>

                {/* Links */}
                <div className="flex gap-16">
                  <div className="flex flex-col gap-3">
                    <p className="text-white/20 text-xs uppercase tracking-widest font-medium mb-1">
                      Product
                    </p>
                    <a className="text-white/50 text-sm hover:text-white transition-colors cursor-pointer">
                      My Recipes
                    </a>
                    <a className="text-white/50 text-sm hover:text-white transition-colors cursor-pointer">
                      My Pantry
                    </a>
                    <a className="text-white/50 text-sm hover:text-white transition-colors cursor-pointer">
                      Pricing
                    </a>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="text-white/20 text-xs uppercase tracking-widest font-medium mb-1">
                      Support
                    </p>
                    <a className="text-white/50 text-sm hover:text-white transition-colors cursor-pointer">
                      How to Cook?
                    </a>
                    <a className="text-white/50 text-sm hover:text-white transition-colors cursor-pointer">
                      Contact
                    </a>
                    <a className="text-white/50 text-sm hover:text-white transition-colors cursor-pointer">
                      Privacy Policy
                    </a>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent mb-6" />

              {/* Bottom row */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                <p className="text-white/20 text-xs">
                  © 2026 CookMind. All rights reserved.
                </p>
                <p className="text-white/20 text-xs flex items-center gap-1">
                  Made with{" "}
                  <span className="bg-linear-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent font-medium">
                    passion
                  </span>{" "}
                  by CookMind
                </p>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
