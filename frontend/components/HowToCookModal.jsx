/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChefHat, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function HowToCookModal() {
  const router = useRouter();
  const [recipeName, setRecipeName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recipeName.trim()) {
      toast.error("Please enter a recipe name");
      return;
    }

    router.push(`/recipe?cook=${encodeURIComponent(recipeName.trim())}`);
    handleOpenChange(false);
  };

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (!open) {
      setRecipeName(""); // Reset input when closing
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="text-sm font-medium text-white/80 hover:text-purple-400 transition-colors duration-200 flex gap-1.5 items-center hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">
          <ChefHat className="w-4 h-4" />
          How to Cook?
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-lg bg-[#111111] border border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif font-bold flex items-center gap-2">
            <ChefHat className="w-6 h-6 text-purple-400" />
            How to Cook?
          </DialogTitle>
          <DialogDescription className="text-white/40">
            Enter any recipe name and our AI chef will guide you through the
            cooking process
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          {/* Recipe Input */}
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">
              What would you like to cook?
            </label>
            <div className="relative">
              <input
                type="text"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                placeholder="e.g., Chicken Biryani, Chocolate Cake, Pasta Carbonara"
                className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder:text-white/20 transition-all"
                autoFocus
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
            </div>
          </div>

          {/* Examples */}
          <div className="bg-purple-500/8 rounded-xl p-4 border border-purple-500/20">
            <h4 className="text-sm font-semibold text-purple-300 mb-2">
              💡 Try These:
            </h4>
            <div className="flex flex-wrap gap-2">
              {["Butter Chicken", "Chocolate Brownies", "Caesar Salad"].map(
                (example) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => setRecipeName(example)}
                    className="px-3 py-1 bg-white/5 text-white/60 border border-white/10 rounded-full text-sm hover:bg-purple-500/15 hover:text-purple-300 hover:border-purple-500/30 transition-all"
                  >
                    {example}
                  </button>
                ),
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={!recipeName.trim()}
            className="flex-1 w-full bg-linear-to-r from-violet-600 via-purple-500 to-pink-500 hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed text-white border-0 shadow-lg shadow-purple-500/25 transition-all h-12"
          >
            <ChefHat className="w-5 h-5 mr-2" />
            Get Recipe
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
