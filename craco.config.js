import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Cpu, LogIn } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { formatApiErrorDetail } from "../lib/api";

export default function Login() {
  const { user, login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.role === "admin") navigate("/admin");
    else if (user) navigate("/account");
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const u = await login(email, password);
      toast.success(`Welcome back, ${u.name}!`);
      navigate(u.role === "admin" ? "/admin" : "/account");
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail) || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-16 relative overflow-hidden" data-testid="login-page">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative w-full max-w-md bg-surface border border-white/10 p-10">
        <Link to="/" className="flex items-center gap-2 mb-2">
          <Cpu className="w-7 h-7 text-neon-cyan" />
          <span className="font-heading font-black text-lg uppercase">
            Yadav<span className="text-neon-cyan">PC</span>Wala
          </span>
        </Link>
        <h1 className="font-heading font-black uppercase text-3xl mt-6">Welcome Back</h1>
        <p className="text-zinc-500 text-sm mt-2">Log in to manage your wishlist and inquiries.</p>

        <button onClick={loginWithGoogle} data-testid="google-login-btn" className="btn-secondary w-full mt-7 !text-xs gap-3">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="" className="w-5 h-5 bg-white rounded-full p-0.5" />
          Continue with Google
        </button>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-zinc-600 uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} data-testid="login-email"
              className="w-full bg-black border border-white/15 px-4 py-3 text-white font-mono text-sm focus:border-neon-cyan focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} data-testid="login-password"
              className="w-full bg-black border border-white/15 px-4 py-3 text-white font-mono text-sm focus:border-neon-cyan focus:outline-none" />
          </div>
          <button type="submit" disabled={loading} data-testid="login-submit" className="btn-primary w-full">
            <LogIn className="w-4 h-4" /> {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-sm text-zinc-500 mt-6 text-center">
          New here?{" "}
          <Link to="/signup" data-testid="go-signup" className="text-neon-cyan hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
