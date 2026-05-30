import { MessageCircle } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { buildWhatsAppLink } from "../lib/whatsapp";

export const WhatsAppFloat = () => {
  const { settings } = useStore();
  const waLink = buildWhatsAppLink(
    settings.whatsapp_number,
    "Hi Yadav PC Wala! I'm interested in your custom gaming PCs."
  );

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="whatsapp-float-btn"
      aria-label="Message on WhatsApp"
      className="fixed bottom-6 right-6 z-[60] flex items-center justify-center w-16 h-16 rounded-full bg-whatsapp text-black hover:scale-110 transition-transform"
      style={{ boxShadow: "0 0 25px rgba(37,211,102,0.6)" }}
    >
      <span className="absolute inline-flex h-full w-full rounded-full bg-whatsapp opacity-40 animate-ping" />
      <MessageCircle className="w-8 h-8 relative" strokeWidth={2.2} />
    </a>
  );
};
