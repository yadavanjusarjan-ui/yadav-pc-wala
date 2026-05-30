import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Plus,
  Check,
  ChevronRight,
  Gauge,
  ListChecks,
  ShieldCheck,
  Truck,
  ArrowLeft,
  Heart,
} from "lucide-react";
import { toast } from "sonner";
import { api } from "../lib/api";
import { resolveImage } from "../lib/api";
import { useStore } from "../context/StoreContext";
import { useAuth } from "../context/AuthContext";
import { buildWhatsAppLink, formatPrice, singleProductMessage } from "../lib/whatsapp";

const TECH_BG =
  "https://static.prod-images.emergentagent.com/jobs/1c05da60-6469-48ec-81cc-0d82f9efa1ec/images/58672278c6c1b7d3c626b8a2db4489f05a4408a88b682ad17de45be73a08bc30.png";

export default function ProductDetail() {
  const { slug } = useParams();
  const { addToInquiry, inInquiry, settings } = useStore();
  const { user, isWishlisted, toggleWishlist } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [active, setActive] = useState(0);
  const [notFound, setNotFound] = useState(false);

  const onHeart = async () => {
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

  useEffect(() => {
    window.scrollTo(0, 0);
    setProduct(null);
    setNotFound(false);
    api
      .get(`/products/${slug}`)
      .then((r) => {
        setProduct(r.data);
        setActive(0);
      })
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-40 text-center" data-testid="product-not-found">
        <h2 className="font-heading font-black uppercase text-3xl">Build Not Found</h2>
        <Link to="/shop" className="btn-primary mt-8 inline-flex">
          Back to Shop
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-40 flex justify-center">
        <div className="w-12 h-12 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const added = inInquiry(product.slug);
  const waLink = buildWhatsAppLink(settings.whatsapp_number, singleProductMessage(product.name));
  const maxFps = Math.max(...(product.fps?.map((f) => f.fps) || [1]), 1);

  return (
    <div data-testid="product-detail-page" className="py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500 hover:text-neon-cyan mb-8"
          data-testid="back-to-shop"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div
              className="relative border border-white/10 bg-black overflow-hidden"
              style={{ backgroundImage: `url(${TECH_BG})`, backgroundSize: "cover" }}
            >
              <motion.img
                key={active}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                src={resolveImage(product.images?.[active])}
                alt={product.name}
                className="w-full h-[420px] lg:h-[540px] object-contain"
                data-testid="product-main-image"
              />
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    data-testid={`thumb-${i}`}
                    className={`w-20 h-20 border bg-black overflow-hidden transition-all ${
                      active === i ? "border-neon-cyan" : "border-white/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={resolveImage(img)} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="overline">{product.category}</span>
              {product.badge && (
                <span className="bg-neon-cyan text-black text-[10px] font-bold uppercase tracking-widest px-2.5 py-1">
                  {product.badge}
                </span>
              )}
            </div>
            <h1 className="font-heading font-black uppercase text-3xl lg:text-5xl tracking-tighter mt-4 leading-none">
              {product.name}
            </h1>
            <p className="text-zinc-400 mt-4 leading-relaxed">{product.description || product.short_description}</p>

            <div className="flex items-end gap-3 mt-7">
              <span className="font-heading font-black text-4xl text-neon-cyan neon-text">
                {formatPrice(product.price)}
              </span>
              {product.original_price && (
                <span className="text-lg text-zinc-600 line-through mb-1">
                  {formatPrice(product.original_price)}
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-500 mt-2 uppercase tracking-widest">
              Inclusive of assembly · Build to order
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="product-whatsapp-btn"
                className="btn-whatsapp"
              >
                <MessageCircle className="w-5 h-5" /> Ask Availability
              </a>
              <button
                onClick={() => addToInquiry(product)}
                disabled={added}
                data-testid="product-add-inquiry-btn"
                className={`inline-flex items-center justify-center gap-2 font-heading font-bold uppercase tracking-widest text-sm px-6 py-4 border-2 transition-all ${
                  added
                    ? "border-neon-cyan text-neon-cyan cursor-default"
                    : "border-white/20 text-white hover:border-neon-cyan hover:text-neon-cyan"
                }`}
              >
                {added ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                {added ? "Added to Inquiry" : "Add to Inquiry"}
              </button>
            </div>

            <button
              onClick={onHeart}
              data-testid="product-wishlist-btn"
              className={`w-full mt-3 inline-flex items-center justify-center gap-2 font-heading font-bold uppercase tracking-widest text-sm px-6 py-3.5 border transition-all ${
                isWishlisted(product.slug)
                  ? "bg-neon-cyan/10 border-neon-cyan text-neon-cyan"
                  : "border-white/15 text-zinc-300 hover:border-neon-cyan hover:text-neon-cyan"
              }`}
            >
              <Heart className="w-4 h-4" fill={isWishlisted(product.slug) ? "currentColor" : "none"} />
              {isWishlisted(product.slug) ? "Saved to Wishlist" : "Save to Wishlist"}
            </button>

            <div className="flex flex-wrap gap-6 mt-7 text-xs text-zinc-400">
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-neon-cyan" /> 1 Year Warranty</span>
              <span className="flex items-center gap-2"><Truck className="w-4 h-4 text-neon-cyan" /> Pan India Delivery</span>
            </div>

            {/* Specs */}
            <div className="mt-12">
              <h2 className="flex items-center gap-2 font-heading font-bold uppercase text-xl">
                <ListChecks className="w-5 h-5 text-neon-cyan" /> Specifications
              </h2>
              <div className="mt-5 border border-white/10 font-mono text-sm" data-testid="specs-table">
                {product.specs?.map((s, i) => (
                  <div
                    key={i}
                    className={`flex justify-between gap-4 px-4 py-3.5 ${
                      i % 2 === 0 ? "bg-black" : "bg-surface"
                    } border-b border-white/5 last:border-0`}
                  >
                    <span className="text-zinc-500 uppercase tracking-wider text-xs">{s.label}</span>
                    <span className="text-white text-right font-medium">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FPS */}
            {product.fps?.length > 0 && (
              <div className="mt-12">
                <h2 className="flex items-center gap-2 font-heading font-bold uppercase text-xl">
                  <Gauge className="w-5 h-5 text-neon-cyan" /> Gaming Performance (FPS)
                </h2>
                <p className="text-xs text-zinc-500 mt-2 uppercase tracking-widest">
                  Average framerates · settings noted per title
                </p>
                <div className="mt-6 space-y-5" data-testid="fps-table">
                  {product.fps.map((f, i) => (
                    <div key={i} data-testid={`fps-row-${i}`}>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="font-heading font-bold uppercase text-white">{f.game}</span>
                        <span className="text-zinc-500 text-xs">{f.settings}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-3 bg-white/5 relative overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(f.fps / maxFps) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, ease: "easeOut" }}
                            className="absolute left-0 top-0 h-full"
                            style={{ background: "linear-gradient(90deg,#00F0FF,#9D4CDD)" }}
                          />
                        </div>
                        <span className="w-20 text-right font-heading font-black text-neon-cyan">
                          {f.fps} <span className="text-zinc-600 text-xs font-mono">FPS</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 p-6 bg-surface border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-heading font-bold uppercase">Have questions about this build?</p>
                <p className="text-zinc-400 text-sm mt-1">Chat with us — we customise to your budget.</p>
              </div>
              <a href={waLink} target="_blank" rel="noopener noreferrer" data-testid="product-bottom-whatsapp" className="btn-whatsapp whitespace-nowrap">
                <MessageCircle className="w-5 h-5" /> WhatsApp Now <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
