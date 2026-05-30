import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api } from "../lib/api";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = checking, false = logged out, obj = logged in

  const checkAuth = useCallback(() => {
    api
      .get("/auth/me")
      .then((r) => setUser(r.data))
      .catch(() => {
        localStorage.removeItem("ypw_token");
        setUser(false);
      });
  }, []);

  useEffect(() => {
    // CRITICAL: If returning from Google OAuth callback, skip the /me check.
    // AuthCallback will exchange the session_id and establish the session first.
    if (window.location.hash?.includes("session_id=")) {
      return;
    }
    checkAuth();
  }, [checkAuth]);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("ypw_token", data.token);
    setUser(data.user);
    return data.user;
  };

  const register = async (name, email, password) => {
    const { data } = await api.post("/auth/register", { name, email, password });
    localStorage.setItem("ypw_token", data.token);
    setUser(data.user);
    return data.user;
  };

  const loginWithGoogle = () => {
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    const redirectUrl = window.location.origin + "/account";
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  const handleGoogleSession = async (sessionId) => {
    const { data } = await api.post("/auth/session", {}, { headers: { "X-Session-ID": sessionId } });
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {
      /* ignore */
    }
    localStorage.removeItem("ypw_token");
    setUser(false);
  };

  const updateProfile = async (name) => {
    const { data } = await api.put("/customer/profile", { name });
    setUser(data);
    return data;
  };

  const isWishlisted = (slug) => !!user?.wishlist?.includes(slug);

  const toggleWishlist = async (slug) => {
    if (!user) return null;
    const has = isWishlisted(slug);
    const { data } = has
      ? await api.delete(`/customer/wishlist/${slug}`)
      : await api.post(`/customer/wishlist/${slug}`);
    setUser((u) => ({ ...u, wishlist: data.wishlist }));
    return !has;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        loginWithGoogle,
        handleGoogleSession,
        logout,
        updateProfile,
        isWishlisted,
        toggleWishlist,
        refreshUser: checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
