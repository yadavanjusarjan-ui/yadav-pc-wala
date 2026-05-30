import { Link } from "react-router-dom";
import { Cpu, Mail, Phone, MapPin, Truck, MessageCircle } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { buildWhatsAppLink } from "../lib/whatsapp";

export const Footer = () => {
  const { settings } = useStore();
  const waLink = buildWhatsAppLink(
    settings.whatsapp_number,
    "Hi Yadav PC Wala! I want to know more about your gaming PCs."
  );

  return (
    <footer className="border-t border-white/10 bg-black mt-auto" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-7 h-7 text-neon-cyan" strokeWidth={2} />
            <span className="font-heading font-black text-xl uppercase">
              Yadav<span className="text-neon-cyan">PC</span>Wala
            </span>
          </div>
          <p className="text-zinc-400 text-sm max-w-md leading-relaxed">
            Build to order gaming PCs, assembled fresh and stress-tested before
            dispatch. Premium custom rigs delivered all over India via DTDC,
            Delhivery & more.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-whatsapp-btn"
            className="btn-whatsapp mt-6 !text-xs"
          >
            <MessageCircle className="w-4 h-4" /> Message on WhatsApp
          </a>
        </div>

        <div>
          <h4 className="font-heading font-bold uppercase text-sm tracking-widest mb-5 text-white">
            Explore
          </h4>
          <ul className="space-y-3 text-sm">
            {[
              { to: "/", l: "Home" },
              { to: "/shop", l: "All Gaming PCs" },
              { to: "/about", l: "About Us" },
              { to: "/contact", l: "Contact" },
              { to: "/admin/login", l: "Admin" },
            ].map((i) => (
              <li key={i.to}>
                <Link
                  to={i.to}
                  className="text-zinc-400 hover:text-neon-cyan transition-colors"
                >
                  {i.l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-bold uppercase text-sm tracking-widest mb-5 text-white">
            Reach Us
          </h4>
          <ul className="space-y-4 text-sm text-zinc-400">
            <li className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-neon-cyan mt-0.5" />
              <span>{settings.phone}</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-neon-cyan mt-0.5" />
              <span>{settings.email}</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-neon-cyan mt-0.5" />
              <span>{settings.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Truck className="w-4 h-4 text-neon-cyan mt-0.5" />
              <span>{settings.city}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <span>© {new Date().getFullYear()} Yadav PC Wala. All rights reserved.</span>
          <span className="uppercase tracking-widest">
            Build To Order · Pan India Delivery
          </span>
        </div>
      </div>
    </footer>
  );
};
