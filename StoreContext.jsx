import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Cpu, Menu, X, MessageCircle, ShieldCheck, User, Heart, LogOut } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { useAuth } from "../context/AuthContext";
import { buildWhatsAppLink } from "../lib/whatsapp";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const { inquiry, setDrawerOpen, settings } = useStore();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const waLink = buildWhatsAppLink(
    settings.whatsapp_number,
    "Hi Yadav PC Wala! I want to know more about your gaming PCs."
  );

  const isCustomer = user && user.role === "customer";

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" data-testid="nav-logo" className="flex items-center gap-2 group">
            <Cpu className="w-7 h-7 text-neon-cyan group-hover:rotate-12 transition-transform" strokeWidth={2} />
            <div className="leading-none">
              <span className="font-heading font-black text-lg uppercase tracking-tight">
                Yadav<span className="text-neon-cyan">PC</span>Wala
              </span>
              <span className="block text-[9px] tracking-[0.25em] text-zinc-500 uppercase">Build To Order</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                data-testid={`nav-link-${l.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `text-sm uppercase tracking-widest font-medium transition-colors ${
                    isActive ? "text-neon-cyan" : "text-zinc-400 hover:text-white"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              data-testid="nav-inquiry-btn"
              onClick={() => setDrawerOpen(true)}
              className="relative flex items-center gap-2 border border-white/15 px-4 py-2.5 text-xs uppercase tracking-widest font-bold hover:border-neon-cyan hover:text-neon-cyan transition-colors"
            >
              Inquiry
              {inquiry.length > 0 && (
                <span data-testid="inquiry-count-badge" className="absolute -top-2 -right-2 w-5 h-5 bg-neon-cyan text-black text-[10px] font-bold flex items-center justify-center">
                  {inquiry.length}
                </span>
              )}
            </button>

            <a href={waLink} target="_blank" rel="noopener noreferrer" data-testid="nav-whatsapp-btn" className="hidden lg:flex btn-whatsapp !px-4 !py-2.5 !text-xs">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>

            {/* Account / Login */}
            {isCustomer ? (
              <Link
                to="/account"
                data-testid="nav-account-btn"
                className="hidden sm:flex items-center gap-2 border border-white/15 px-3 py-2.5 text-xs uppercase tracking-widest font-bold hover:border-neon-cyan hover:text-neon-cyan transition-colors"
              >
                {user.picture ? (
                  <img src={user.picture} alt="" className="w-5 h-5 rounded-full object-cover" />
                ) : (
                  <User className="w-4 h-4" />
                )}
                {user.name?.split(" ")[0] || "Account"}
              </Link>
            ) : !user ? (
              <Link
                to="/login"
                data-testid="nav-login-btn"
                className="hidden sm:flex items-center gap-2 px-3 py-2.5 text-xs uppercase tracking-widest font-bold text-zinc-300 hover:text-neon-cyan transition-colors"
              >
                <User className="w-4 h-4" /> Login
              </Link>
            ) : null}

            {/* Admin shield icon */}
            <Link
              to={user && user.role === "admin" ? "/admin" : "/admin/login"}
              data-testid="nav-admin-shield"
              title="Admin"
              className="hidden sm:flex items-center justify-center w-10 h-10 border border-white/15 text-zinc-400 hover:border-neon-purple hover:text-neon-purple transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
            </Link>

            <button className="md:hidden text-white" data-testid="nav-mobile-toggle" onClick={() => setOpen((o) => !o)}>
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-black px-6 py-4 space-y-1">
          {links.map((l) => (
            <button
              key={l.to}
              data-testid={`mobile-nav-${l.label.toLowerCase()}`}
              onClick={() => {
                setOpen(false);
                navigate(l.to);
              }}
              className="block w-full text-left py-3 text-sm uppercase tracking-widest text-zinc-300 hover:text-neon-cyan border-b border-white/5"
            >
              {l.label}
            </button>
          ))}
          {isCustomer ? (
            <>
              <button onClick={() => { setOpen(false); navigate("/account"); }} className="flex items-center gap-2 w-full text-left py-3 text-sm uppercase tracking-widest text-neon-cyan border-b border-white/5">
                <Heart className="w-4 h-4" /> My Account
              </button>
              <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left py-3 text-sm uppercase tracking-widest text-zinc-300 border-b border-white/5">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : !user ? (
            <button onClick={() => { setOpen(false); navigate("/login"); }} className="flex items-center gap-2 w-full text-left py-3 text-sm uppercase tracking-widest text-zinc-300 border-b border-white/5">
              <User className="w-4 h-4" /> Login / Sign up
            </button>
          ) : null}
          <button onClick={() => { setOpen(false); navigate(user && user.role === "admin" ? "/admin" : "/admin/login"); }} className="flex items-center gap-2 w-full text-left py-3 text-sm uppercase tracking-widest text-zinc-500">
            <ShieldCheck className="w-4 h-4" /> Admin
          </button>
        </div>
      )}
    </header>
  );
};
