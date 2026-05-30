import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Cpu, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { formatApiErrorDetail } from "../lib/api";

export default function Signup() {
  const { user, register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate(user.role === "admin" ? "/admin" : "/account");
  }, [user, navigate]);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const u = await register(form.name, form.email, form.password);
      toast.success(`Welcome, ${u.name}! Account created.`);
      navigate("/account");
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail) || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-16 relative overflow-hidden" data-testid="signup-page">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative w-full max-w-md bg-surface border border-white/10 p-10">
        <Link to="/" className="flex items-center gap-2 mb-2">
          <Cpu className="w-7 h-7 text-neon-cyan" />
          <span className="font-heading font-black text-lg uppercase">
            Yadav<span className="text-neon-cyan">PC</span>Wala
          </span>
        </Link>
        <h1 className="font-heading font-black uppercase text-3xl mt-6">Create Account</h1>
        <p className="text-zinc-500 text-sm mt-2">Save your dream builds and track inquiries.</p>

        <button onClick={loginWithGoogle} data-testid="google-signup-btn" className="btn-secondary w-full mt-7 !text-xs gap-3">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="" className="w-5 h-5 bg-white rounded-full p-0.5" />
          Sign up with Google
        </button>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-zinc-600 uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Full Name</label>
            <input type="text" required name="name" value={form.name} onChange={handleChange} data-testid="signup-name"
              className="w-full bg-black border border-white/15 px-4 py-3 text-white font-mono text-sm focus:border-neon-cyan focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Email</label>
            <input type="email" required name="email" value={form.email} onChange={handleChange} data-testid="signup-email"
              className="w-full bg-black border border-white/15 px-4 py-3 text-white font-mono text-sm focus:border-neon-cyan focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Password</label>
            <input type="password" required minLength={6} name="password" value={form.password} onChange={handleChange} data-testid="signup-password"
              className="w-full bg-black border border-white/15 px-4 py-3 text-white font-mono text-sm focus:border-neon-cyan focus:outline-none" />
            <p className="text-[10px] text-zinc-600 mt-1">Minimum 6 characters</p>
          </div>
          <button type="submit" disabled={loading} data-testid="signup-submit" className="btn-primary w-full">
            <UserPlus className="w-4 h-4" /> {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-zinc-500 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" data-testid="go-login" className="text-neon-cyan hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
