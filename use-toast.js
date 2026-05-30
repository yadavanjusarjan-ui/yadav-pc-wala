import { AnimatePresence, motion } from "framer-motion";
import { X, Trash2, MessageCircle, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { useAuth } from "../context/AuthContext";
import { api, resolveImage } from "../lib/api";
import { formatPrice, buildWhatsAppLink, inquiryMessage } from "../lib/whatsapp";

export const InquiryDrawer = () => {
  const {
    inquiry,
    drawerOpen,
    setDrawerOpen,
    removeFromInquiry,
    clearInquiry,
    settings,
  } = useStore();
  const { user } = useAuth();

  const total = inquiry.reduce((s, i) => s + (i.price || 0), 0);
  const waLink = buildWhatsAppLink(settings.whatsapp_number, inquiryMessage(inquiry));

  const handleSend = () => {
    if (user && user.role === "customer") {
      api
        .post("/customer/inquiries", {
          items: inquiry.map((i) => ({ slug: i.slug, name: i.name, price: i.price })),
          message: "",
        })
        .catch(() => {});
    }
  };

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[70]"
            data-testid="inquiry-overlay"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-surface border-l border-white/10 z-[80] flex flex-col"
            data-testid="inquiry-drawer"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-neon-cyan" />
                <h3 className="font-heading font-bold uppercase tracking-wide">
                  Your Inquiry ({inquiry.length})
                </h3>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                data-testid="inquiry-close-btn"
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {inquiry.length === 0 && (
                <div className="text-center text-zinc-500 mt-20" data-testid="inquiry-empty">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p className="text-sm">No PCs added yet.</p>
                  <Link
                    to="/shop"
                    onClick={() => setDrawerOpen(false)}
                    className="btn-secondary mt-6 !px-6 !py-3 !text-xs inline-flex"
                  >
                    Browse Builds
                  </Link>
                </div>
              )}

              {inquiry.map((item) => (
                <div
                  key={item.slug}
                  className="flex gap-4 border border-white/10 p-3"
                  data-testid={`inquiry-item-${item.slug}`}
                >
                  <img
                    src={resolveImage(item.image)}
                    alt={item.name}
                    className="w-20 h-20 object-cover bg-black"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading text-sm font-bold uppercase truncate">
                      {item.name}
                    </h4>
                    <p className="text-neon-cyan font-bold mt-1">{formatPrice(item.price)}</p>
                  </div>
                  <button
                    onClick={() => removeFromInquiry(item.slug)}
                    data-testid={`inquiry-remove-${item.slug}`}
                    className="text-zinc-500 hover:text-neon-red self-start"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {inquiry.length > 0 && (
              <div className="p-6 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400 uppercase tracking-widest">Est. Total</span>
                  <span className="font-heading font-black text-xl text-white">
                    {formatPrice(total)}
                  </span>
                </div>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleSend}
                  data-testid="inquiry-send-whatsapp-btn"
                  className="btn-whatsapp w-full"
                >
                  <MessageCircle className="w-5 h-5" /> Send Inquiry on WhatsApp
                </a>
                <button
                  onClick={clearInquiry}
                  data-testid="inquiry-clear-btn"
                  className="w-full text-xs text-zinc-500 hover:text-neon-red uppercase tracking-widest"
                >
                  Clear all
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
