import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Wrench, Clock, ShieldCheck, Truck, Cpu, MessageCircle, ChevronRight, Target } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { buildWhatsAppLink } from "../lib/whatsapp";

const SETUP_IMG =
  "https://static.prod-images.emergentagent.com/jobs/1c05da60-6469-48ec-81cc-0d82f9efa1ec/images/6461285ee8c3cec4c58bfe50cf42dac4c26a785c04ebf3984520a24c83a7bba7.png";

const STEPS = [
  { icon: MessageCircle, title: "Tell Us Your Needs", desc: "Share your budget, favourite games and target resolution on WhatsApp." },
  { icon: Wrench, title: "We Assemble Fresh", desc: "Your rig is hand-built with genuine, branded components — never old stock." },
  { icon: Clock, title: "24 Hour Stress Test", desc: "Every PC is benchmarked and stress-tested for a full day before dispatch." },
  { icon: Truck, title: "Delivered To You", desc: "Securely packed and shipped pan-India via DTDC, Delhivery and trusted partners." },
];

export default function About() {
  const { settings } = useStore();
  const waLink = buildWhatsAppLink(settings.whatsapp_number, "Hi Yadav PC Wala! I want to build a custom gaming PC.");

  return (
    <div data-testid="about-page">
      <section className="border-b border-white/10 py-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <span className="overline">Our Story</span>
          <h1 className="font-heading font-black uppercase text-4xl lg:text-6xl tracking-tighter mt-4 max-w-3xl">
            We Don't Sell Stock. <span className="text-neon-cyan">We Build Beasts.</span>
          </h1>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading font-bold uppercase text-2xl lg:text-3xl">Build To Order, Always</h2>
            <div className="space-y-4 text-zinc-400 mt-6 leading-relaxed">
              <p>
                Yadav PC Wala was founded by gamers, for gamers. We believe a gaming PC should be
                crafted around <span className="text-white">you</span> — your games, your budget, your aesthetic.
                That's why we don't keep pre-stocked machines gathering dust.
              </p>
              <p>
                When you place an order, we source the exact components and assemble your rig fresh.
                Every build is cable-managed with care, thermally optimised, and put through a rigorous
                24-hour stress test so it arrives flawless.
              </p>
              <p>
                From budget esports machines to no-compromise 4K powerhouses, we deliver premium custom
                PCs to every corner of India.
              </p>
            </div>
            <a href={waLink} target="_blank" rel="noopener noreferrer" data-testid="about-whatsapp-btn" className="btn-whatsapp mt-8">
              <MessageCircle className="w-5 h-5" /> Start Your Build
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="border border-white/10 overflow-hidden">
              <img src={SETUP_IMG} alt="Custom gaming PC" className="w-full h-[460px] object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-neon-cyan text-black p-5 hidden sm:block">
              <Target className="w-7 h-7" />
              <p className="font-heading font-black uppercase text-sm mt-2 leading-tight">Zero<br />Compromise</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="overline">The Process</span>
            <h2 className="font-heading font-black uppercase text-3xl lg:text-5xl tracking-tight mt-3">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface border border-white/10 p-7 relative"
                data-testid={`step-${i}`}
              >
                <span className="font-heading font-black text-5xl text-white/5 absolute top-4 right-4">0{i + 1}</span>
                <s.icon className="w-9 h-9 text-neon-cyan" strokeWidth={1.6} />
                <h3 className="font-heading font-bold uppercase text-lg mt-5">{s.title}</h3>
                <p className="text-zinc-400 text-sm mt-3 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 border-t border-l border-white/10">
          {[
            [Wrench, "Assembled Fresh"],
            [Clock, "Tested 24 Hrs"],
            [ShieldCheck, "1 Year Warranty"],
            [Truck, "Pan India Delivery"],
          ].map(([Icon, label], i) => (
            <div key={label} className="border-b border-r border-white/10 p-8 text-center">
              <Icon className="w-8 h-8 text-neon-cyan mx-auto" strokeWidth={1.6} />
              <p className="font-heading font-bold uppercase text-sm mt-4">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 border-t border-white/10 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <Cpu className="w-12 h-12 text-neon-cyan mx-auto mb-6" strokeWidth={1.5} />
          <h2 className="font-heading font-black uppercase text-3xl lg:text-4xl">Let's Build Something Legendary</h2>
          <Link to="/shop" className="btn-primary mt-8 inline-flex" data-testid="about-browse-btn">
            Browse Builds <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
