/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  ChefHat,
  Loader2,
  Package,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useFetch from "@/hooks/use-fetch";
import {
  getPantryItems,
  deletePantryItem,
  updatePantryItem,
} from "@/actions/pantry.actions";
import { toast } from "sonner";
import AddToPantryModal from "@/components/AddToPantryModal";
import PricingModal from "@/components/PricingModal";

export default function PantryPage() {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ name: "", quantity: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch pantry items
  const {
    loading: loadingItems,
    data: itemsData,
    fn: fetchItems,
  } = useFetch(getPantryItems);

  // Delete item
  const {
    loading: deleting,
    data: deleteData,
    fn: deleteItem,
  } = useFetch(deletePantryItem);

  // Update item
  const {
    loading: updating,
    data: updateData,
    fn: updateItem,
  } = useFetch(updatePantryItem);

  // Load items on mount
  useEffect(() => {
    fetchItems();
  }, []);

  // Update items when data arrives
  useEffect(() => {
    if (itemsData?.success) {
      setItems(itemsData.items);
    }
  }, [itemsData]);

  // Refresh after delete
  useEffect(() => {
    if (deleteData?.success && !deleting) {
      toast.success("Item removed from pantry");
      fetchItems();
    }
  }, [deleteData]);

  // Refresh after update
  useEffect(() => {
    if (updateData?.success) {
      toast.success("Item updated successfully");
      setEditingId(null);
      fetchItems();
    }
  }, [updateData]);

  // Handle delete
  const handleDelete = async (itemId) => {
    const formData = new FormData();
    formData.append("itemId", itemId);
    await deleteItem(formData);
  };

  // Start editing
  const startEdit = (item) => {
    setEditingId(item.documentId);
    setEditValues({
      name: item.name,
      quantity: item.quantity,
    });
  };

  // Save edit
  const saveEdit = async () => {
    const formData = new FormData();
    formData.append("itemId", editingId);
    formData.append("name", editValues.name);
    formData.append("quantity", editValues.quantity);
    await updateItem(formData);
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({ name: "", quantity: "" });
  };

  // Handle modal success (refresh items)
  const handleModalSuccess = () => {
    fetchItems();
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] pt-24 pb-16 px-4 text-white">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Package className="w-16 h-16 text-purple-400" />
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-linear-to-b from-white to-white/60 bg-clip-text text-transparent">
                  My Pantry
                </h1>
                <p className="text-white/40 font-light">
                  Manage your ingredients and discover what you can cook
                </p>
              </div>
            </div>

            {/* Add to Pantry Button - Desktop */}
            <Button
              onClick={() => setIsModalOpen(true)}
              className="hidden md:flex bg-linear-to-r from-violet-600 via-purple-500 to-pink-500 hover:opacity-90 text-white border-0 shadow-lg shadow-purple-500/25 transition-all gap-2"
              size="lg"
            >
              <Plus className="w-5 h-5" />
              Add to Pantry
            </Button>
          </div>

          {/* Add to Pantry Button - Mobile (Full Width) */}
          <Button
            onClick={() => setIsModalOpen(true)}
            className="md:hidden w-full bg-linear-to-r from-violet-600 via-purple-500 to-pink-500 hover:opacity-90 text-white border-0 shadow-lg shadow-purple-500/25 transition-all gap-2 mb-4"
            size="lg"
          >
            <Plus className="w-5 h-5" />
            Add to Pantry
          </Button>

          {/* Usage Stats */}
          {itemsData?.scansLimit !== undefined && (
            <div className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 inline-flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <div className="text-sm">
                {itemsData.scansLimit === "unlimited" ? (
                  <>
                    <span className="font-bold text-purple-400">∞</span>
                    <span className="text-white/40">
                      {" "}
                      Unlimited AI scans (Pro Plan)
                    </span>
                  </>
                ) : (
                  <PricingModal>
                    <span className="text-white/40 hover:text-purple-400 transition-colors cursor-pointer">
                      Upgrade to Pro for unlimited Pantry scans
                    </span>
                  </PricingModal>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quick Action Card - Find Recipes */}
        {items.length > 0 && (
          <Link href="/pantry/recipes" className="block mb-8">
            <div className="bg-linear-to-br from-violet-600/20 to-pink-500/10 border border-purple-500/30 text-white p-6 rounded-2xl hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="bg-purple-500/20 p-3 border border-purple-500/30 rounded-xl group-hover:bg-purple-500/30 transition-colors">
                  <ChefHat className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl mb-1">
                    What Can I Cook Today?
                  </h3>
                  <p className="text-white/50 text-sm font-light">
                    Get AI-powered recipe suggestions from your {items.length}{" "}
                    ingredients
                  </p>
                </div>
                <div className="hidden sm:block">
                  <Badge className="bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold uppercase tracking-wide">
                    {items.length} items
                  </Badge>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Loading State */}
        {loadingItems && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-purple-400 animate-spin mb-4" />
            <p className="text-white/40">Loading your pantry...</p>
          </div>
        )}

        {/* Pantry Items Grid */}
        {!loadingItems && items.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                Your Ingredients
              </h2>
              <Badge
                variant="outline"
                className="text-purple-300 border border-purple-500/30 bg-purple-500/10 font-bold uppercase tracking-wide"
              >
                {items.length} {items.length === 1 ? "item" : "items"}
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <div
                  key={item.documentId}
                  className="bg-white/5 p-5 border border-white/10 rounded-xl hover:border-purple-500/40 hover:bg-white/7 hover:shadow-lg hover:shadow-purple-500/10 transition-all"
                >
                  {editingId === item.documentId ? (
                    // Edit Mode
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editValues.name}
                        onChange={(e) =>
                          setEditValues({ ...editValues, name: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 text-white placeholder:text-white/20 text-sm transition-all"
                        placeholder="Ingredient name"
                      />
                      <input
                        type="text"
                        value={editValues.quantity}
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            quantity: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 text-white placeholder:text-white/20 text-sm transition-all"
                        placeholder="Quantity"
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={saveEdit}
                          disabled={updating}
                          className="flex-1 bg-purple-600 hover:bg-purple-700 border-0 text-white"
                        >
                          {updating ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelEdit}
                          disabled={updating}
                          className="flex-1 border border-white/15 text-white/60 hover:bg-white/8 hover:text-white transition-all"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-white mb-1">
                            {item.name}
                          </h3>
                          <p className="text-white/40 text-sm font-light">
                            {item.quantity}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => startEdit(item)}
                            className="p-2 border border-transparent rounded-lg hover:border-purple-500/40 hover:bg-purple-500/10 transition-all text-white/30 hover:text-purple-400"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.documentId)}
                            disabled={deleting}
                            className="p-2 border border-transparent rounded-lg hover:border-red-500/40 hover:bg-red-500/10 transition-all text-white/30 hover:text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="text-xs text-white/20">
                        Added {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loadingItems && items.length === 0 && (
          <div className="bg-white/5 p-12 text-center border border-dashed border-white/10 rounded-2xl">
            <div className="bg-purple-500/10 w-20 h-20 border border-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Your Pantry is Empty
            </h3>
            <p className="text-white/40 mb-8 max-w-md mx-auto font-light">
              Start by scanning your pantry with AI or adding ingredients
              manually to discover amazing recipes!
            </p>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-linear-to-r from-violet-600 via-purple-500 to-pink-500 hover:opacity-90 text-white border-0 shadow-lg shadow-purple-500/25 transition-all gap-2"
              size="lg"
            >
              <Plus className="w-5 h-5" />
              Add Your First Item
            </Button>
          </div>
        )}
      </div>

      {/* Add to Pantry Modal */}
      <AddToPantryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}
