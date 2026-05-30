import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Cpu } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const AuthCallback = () => {
  const { handleGoogleSession } = useAuth();
  const navigate = useNavigate();
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) return;
    processed.current = true;

    const hash = window.location.hash || "";
    const match = hash.match(/session_id=([^&]+)/);
    const sessionId = match ? decodeURIComponent(match[1]) : null;

    const finish = (path) => {
      window.history.replaceState(null, "", window.location.pathname);
      navigate(path, { replace: true });
    };

    if (!sessionId) {
      finish("/login");
      return;
    }

    handleGoogleSession(sessionId)
      .then(() => finish("/account"))
      .catch(() => finish("/login"));
  }, [handleGoogleSession, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-void gap-6">
      <Cpu className="w-10 h-10 text-neon-cyan animate-pulse" />
      <div className="w-10 h-10 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" />
      <p className="text-zinc-400 text-sm uppercase tracking-widest">Signing you in...</p>
    </div>
  );
};
