import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Cpu, Lock } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { formatApiErrorDetail } from "../lib/api";

export default function AdminLogin() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.role === "admin") navigate("/admin");
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back, Admin!");
      navigate("/admin");
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail) || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-void px-6 relative overflow-hidden" data-testid="admin-login-page">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative w-full max-w-md bg-surface border border-white/10 p-10">
        <div className="flex items-center gap-2 mb-2">
          <Cpu className="w-7 h-7 text-neon-cyan" />
          <span className="font-heading font-black text-lg uppercase">
            Yadav<span className="text-neon-cyan">PC</span>Wala
          </span>
        </div>
        <h1 className="font-heading font-black uppercase text-2xl mt-6 flex items-center gap-2">
          <Lock className="w-5 h-5 text-neon-cyan" /> Admin Login
        </h1>
        <p className="text-zinc-500 text-sm mt-2">Manage your gaming PC catalog.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-testid="admin-email"
              className="w-full bg-black border border-white/15 px-4 py-3 text-white font-mono text-sm focus:border-neon-cyan focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-testid="admin-password"
              className="w-full bg-black border border-white/15 px-4 py-3 text-white font-mono text-sm focus:border-neon-cyan focus:outline-none"
            />
          </div>
          <button type="submit" disabled={loading} data-testid="admin-login-btn" className="btn-primary w-full">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
