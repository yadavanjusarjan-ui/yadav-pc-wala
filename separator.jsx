import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Cpu, ChevronRight, Plus, Check, MessageCircle, Heart } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "../context/StoreContext";
import { useAuth } from "../context/AuthContext";
import { resolveImage } from "../lib/api";
import { formatPrice, buildWhatsAppLink, singleProductMessage } from "../lib/whatsapp";

export const PCCard = ({ product, index = 0 }) => {
  const { addToInquiry, inInquiry, settings } = useStore();
  const { user, isWishlisted, toggleWishlist } = useAuth();
  const navigate = useNavigate();
  const added = inInquiry(product.slug);
  const wished = isWishlisted(product.slug);
  const gpu = product.specs?.find((s) => /graphic/i.test(s.label))?.value;
  const cpu = product.specs?.find((s) => /processor/i.test(s.label))?.value;

  const onHeart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user || user.role === "admin") {
      toast("Log in to save builds to your wishlist");
      navigate("/login");
      return;
    }
    try {
      const justAdded = await toggleWishlist(product.slug);
      toast.success(justAdded ? "Saved to wishlist" : "Removed from wishlist");
    } catch {
      toast.error("Could not update wishlist");
    }
  };

  const waLink = buildWhatsAppLink(
    settings.whatsapp_number,
    singleProductMessage(product.name)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="card-tech group flex flex-col"
      data-testid={`pc-card-${product.slug}`}
    >
      <Link to={`/product/${product.slug}`} className="relative block overflow-hidden bg-black">
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 bg-neon-cyan text-black text-[10px] font-bold uppercase tracking-widest px-2.5 py-1">
            {product.badge}
          </span>
        )}
        <span className="absolute top-3 right-3 z-10 border border-white/15 bg-black/60 text-[10px] uppercase tracking-widest px-2.5 py-1 text-zinc-300">
          {product.category}
        </span>
        <button
          onClick={onHeart}
          data-testid={`card-wishlist-${product.slug}`}
          aria-label="Toggle wishlist"
          className={`absolute bottom-3 right-3 z-10 w-9 h-9 flex items-center justify-center border transition-all ${
            wished
              ? "bg-neon-cyan border-neon-cyan text-black"
              : "bg-black/60 border-white/15 text-white hover:border-neon-cyan hover:text-neon-cyan"
          }`}
        >
          <Heart className="w-4 h-4" fill={wished ? "currentColor" : "none"} />
        </button>
        <img
          src={resolveImage(product.images?.[0])}
          alt={product.name}
          className="w-full h-60 object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
        />
      </Link>

      <div className="p-6 flex flex-col flex-1">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-heading font-bold text-lg uppercase leading-tight hover:text-neon-cyan transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">{product.tagline}</p>

        <div className="mt-4 space-y-2 text-xs text-zinc-400 font-mono">
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-neon-purple shrink-0" />
            <span className="truncate">{cpu}</span>
          </div>
          <div className="flex items-center gap-2">
            <ChevronRight className="w-3.5 h-3.5 text-neon-cyan shrink-0" />
            <span className="truncate">{gpu}</span>
          </div>
        </div>

        <div className="mt-5 flex items-end gap-2">
          <span className="font-heading font-black text-2xl text-white">
            {formatPrice(product.price)}
          </span>
          {product.original_price && (
            <span className="text-sm text-zinc-600 line-through mb-1">
              {formatPrice(product.original_price)}
            </span>
          )}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`card-whatsapp-${product.slug}`}
            className="btn-whatsapp !px-3 !py-3 !text-[11px]"
          >
            <MessageCircle className="w-4 h-4" /> Ask
          </a>
          <button
            onClick={() => addToInquiry(product)}
            disabled={added}
            data-testid={`card-add-inquiry-${product.slug}`}
            className={`inline-flex items-center justify-center gap-1.5 px-3 py-3 text-[11px] font-heading font-bold uppercase tracking-wider border transition-all ${
              added
                ? "border-neon-cyan/40 text-neon-cyan cursor-default"
                : "border-white/15 text-white hover:border-neon-cyan hover:text-neon-cyan"
            }`}
          >
            {added ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {added ? "Added" : "Inquiry"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
