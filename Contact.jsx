import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight,
  MessageCircle,
  Wrench,
  ShieldCheck,
  Truck,
  Clock,
  Cpu,
  Star,
  Quote,
} from "lucide-react";
import { api } from "../lib/api";
import { resolveImage } from "../lib/api";
import { useStore } from "../context/StoreContext";
import { buildWhatsAppLink, formatPrice } from "../lib/whatsapp";
import { PCCard } from "../components/PCCard";

const HERO_BG =
  "https://static.prod-images.emergentagent.com/jobs/1c05da60-6469-48ec-81cc-0d82f9efa1ec/images/01d2aebe7711ee0d1f52ef28c234ef1dc11653b28d30236c22c1a24564fbd470.png";

const WHY = [
  { icon: Wrench, title: "Assembled Fresh", desc: "Every PC is hand-built after you order. No old stock, ever." },
  { icon: Clock, title: "Tested 24 Hrs", desc: "Stress-tested for a full day to guarantee rock-solid stability." },
  { icon: ShieldCheck, title: "1 Year Warranty", desc: "Comprehensive warranty with genuine, branded components only." },
  { icon: Truck, title: "Pan India Delivery", desc: "Safely shipped anywhere in India via DTDC, Delhivery & more." },
];

const TESTIMONIALS = [
  { name: "Rohit Sharma", city: "Mumbai", text: "My Phantom Strike runs Cyberpunk maxed at 4K. Build quality is insane and cable management is on point!", rating: 5 },
  { name: "Ananya Verma", city: "Bengaluru", text: "Ordered the Neon Vortex for BGMI & Valorant. Hits 300+ FPS easily. WhatsApp support was super quick.", rating: 5 },
  { name: "Karan Mehta", city: "Delhi", text: "Reached me in 4 days, perfectly packed. Tested before shipping as promised. Highly recommend Yadav PC Wala.", rating: 5 },
  { name: "Sneha Iyer", city: "Pune", text: "The Frost Byte is whisper quiet and looks stunning. Best value custom PC I found anywhere in India.", rating: 5 },
];

export default function Home() {
  const { settings } = useStore();
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api.get("/products", { params: { featured: true } }).then((r) => setFeatured(r.data)).catch(() => {});
  }, []);

  const waLink = buildWhatsAppLink(
    settings.whatsapp_number,
    "Hi Yadav PC Wala! I want to build a custom gaming PC."
  );

  const hero = featured[0];
  const rest = featured.slice(1, 4);

  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
          <div className="absolute inset-0 grid-bg opacity-40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="overline">Build To Order · Pan India Delivery</span>
            <h1 className="font-heading font-black uppercase text-4xl sm:text-5xl lg:text-7xl leading-[0.95] tracking-tighter mt-5">
              {settings.hero_headline.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-neon-cyan neon-text">
                {settings.hero_headline.split(" ").slice(-1)}
              </span>
            </h1>
            <p className="text-zinc-400 text-base sm:text-lg mt-6 max-w-xl leading-relaxed">
              Premium custom gaming rigs assembled fresh, stress-tested for 24
              hours, and delivered to your door anywhere in India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-9">
              <Link to="/shop" data-testid="hero-browse-btn" className="btn-primary">
                Browse Builds <ChevronRight className="w-5 h-5" />
              </Link>
              <a href={waLink} target="_blank" rel="noopener noreferrer" data-testid="hero-whatsapp-btn" className="btn-whatsapp">
                <MessageCircle className="w-5 h-5" /> WhatsApp Us
              </a>
            </div>

            <div className="flex flex-wrap gap-8 mt-14 text-sm">
              {[["500+", "PCs Delivered"], ["24 Hr", "Stress Tested"], ["1 Yr", "Warranty"]].map(([n, l]) => (
                <div key={l}>
                  <div className="font-heading font-black text-2xl text-white">{n}</div>
                  <div className="text-zinc-500 uppercase tracking-widest text-xs mt-1">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED BENTO */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="overline">The Arsenal</span>
              <h2 className="font-heading font-black uppercase text-3xl lg:text-5xl tracking-tight mt-3">
                Popular Gaming PCs
              </h2>
            </div>
            <Link to="/shop" className="btn-secondary !py-3 !px-6 !text-xs self-start sm:self-auto" data-testid="featured-view-all">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {hero && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Big hero card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7 card-tech group relative overflow-hidden flex flex-col justify-end min-h-[460px]"
                data-testid={`featured-hero-${hero.slug}`}
              >
                <img
                  src={resolveImage(hero.images?.[0])}
                  alt={hero.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                {hero.badge && (
                  <span className="absolute top-5 left-5 bg-neon-cyan text-black text-xs font-bold uppercase tracking-widest px-3 py-1.5">
                    {hero.badge}
                  </span>
                )}
                <div className="relative p-8">
                  <span className="overline">{hero.category}</span>
                  <h3 className="font-heading font-black uppercase text-2xl lg:text-4xl mt-2 leading-none">
                    {hero.name}
                  </h3>
                  <p className="text-zinc-300 mt-3 max-w-md text-sm">{hero.short_description}</p>
                  <div className="flex items-center gap-5 mt-6">
                    <span className="font-heading font-black text-3xl text-neon-cyan">
                      {formatPrice(hero.price)}
                    </span>
                    <Link to={`/product/${hero.slug}`} className="btn-primary !py-3 !px-6" data-testid={`featured-cta-${hero.slug}`}>
                      View Build <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Side stacked cards */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                {rest.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/product/${p.slug}`}
                    data-testid={`featured-side-${p.slug}`}
                    className="card-tech group relative overflow-hidden flex items-center gap-4 p-4 min-h-[140px]"
                  >
                    <img
                      src={resolveImage(p.images?.[0])}
                      alt={p.name}
                      className="w-28 h-28 object-cover bg-black shrink-0 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase tracking-widest text-neon-purple">{p.category}</span>
                      <h4 className="font-heading font-bold uppercase text-sm leading-tight truncate group-hover:text-neon-cyan transition-colors">
                        {p.name}
                      </h4>
                      <p className="font-heading font-black text-lg text-white mt-2">{formatPrice(p.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="overline">Why Choose Us</span>
            <h2 className="font-heading font-black uppercase text-3xl lg:text-5xl tracking-tight mt-3">
              Built Different
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/10">
            {WHY.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-b border-r border-white/10 p-8 group hover:bg-surface transition-colors"
                data-testid={`why-card-${i}`}
              >
                <w.icon className="w-9 h-9 text-neon-cyan group-hover:scale-110 transition-transform" strokeWidth={1.6} />
                <h3 className="font-heading font-bold uppercase text-lg mt-5">{w.title}</h3>
                <p className="text-zinc-400 text-sm mt-3 leading-relaxed">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 flex items-center pointer-events-none select-none">
          <div className="animate-marquee font-heading font-black uppercase text-[12vw] text-white/5 leading-none">
            Gamers Love Us · Gamers Love Us · Gamers Love Us ·
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="overline">Testimonials</span>
            <h2 className="font-heading font-black uppercase text-3xl lg:text-5xl tracking-tight mt-3">
              Trusted By Gamers
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-surface border border-white/10 p-6"
                data-testid={`testimonial-${i}`}
              >
                <Quote className="w-7 h-7 text-neon-cyan/40" />
                <p className="text-sm text-zinc-300 mt-4 leading-relaxed">"{t.text}"</p>
                <div className="flex gap-1 mt-5">
                  {Array.from({ length: t.rating }).map((_, k) => (
                    <Star key={k} className="w-4 h-4 fill-neon-cyan text-neon-cyan" />
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="font-heading font-bold text-sm uppercase">{t.name}</p>
                  <p className="text-xs text-zinc-500">{t.city}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Cpu className="w-12 h-12 text-neon-cyan mx-auto mb-6" strokeWidth={1.5} />
          <h2 className="font-heading font-black uppercase text-3xl lg:text-5xl tracking-tight">
            Ready To Build Your <span className="text-neon-cyan">Dream Rig?</span>
          </h2>
          <p className="text-zinc-400 mt-5 max-w-xl mx-auto">
            Tell us your budget and games — we'll craft the perfect custom build for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-9">
            <a href={waLink} target="_blank" rel="noopener noreferrer" data-testid="cta-whatsapp-btn" className="btn-whatsapp">
              <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
            </a>
            <Link to="/shop" className="btn-secondary" data-testid="cta-browse-btn">
              Browse All Builds <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
