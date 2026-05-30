import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { api } from "../lib/api";
import { PCCard } from "../components/PCCard";

const CATEGORIES = ["All", "Budget", "Mid Range", "High End", "Extreme"];

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get("/products", { params: category === "All" ? {} : { category } })
      .then((r) => setProducts(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div data-testid="shop-page">
      {/* Header */}
      <section className="border-b border-white/10 py-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <span className="overline">The Full Arsenal</span>
          <h1 className="font-heading font-black uppercase text-4xl lg:text-6xl tracking-tighter mt-4">
            All Gaming PCs
          </h1>
          <p className="text-zinc-400 mt-4 max-w-xl">
            Every rig is built to order, stress-tested for 24 hours, and shipped
            pan-India. Pick a category to filter.
          </p>
        </div>
      </section>

      {/* Filters + grid */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 flex-wrap mb-10">
            <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500 mr-2">
              <SlidersHorizontal className="w-4 h-4" /> Filter
            </span>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                data-testid={`filter-${c.replace(/\s+/g, "-").toLowerCase()}`}
                className={`px-5 py-2.5 text-xs font-heading font-bold uppercase tracking-widest border transition-all ${
                  category === c
                    ? "bg-neon-cyan text-black border-neon-cyan"
                    : "border-white/15 text-zinc-400 hover:border-neon-cyan hover:text-neon-cyan"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-96 bg-surface border border-white/5 animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-zinc-500 py-24"
              data-testid="shop-empty"
            >
              No builds found in this category.
            </motion.p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="shop-grid">
              {products.map((p, i) => (
                <PCCard key={p.slug} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
