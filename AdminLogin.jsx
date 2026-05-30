import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";

const StoreContext = createContext(null);
export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    whatsapp_number: "919000000000",
    email: "info@yadavpcwala.com",
    phone: "+91 90000 00000",
    address: "Gaming Hub, Sector 18",
    city: "Pan India Delivery",
    instagram: "",
    hero_headline: "Custom Gaming PCs That Dominate",
  });
  const [inquiry, setInquiry] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ypw_inquiry")) || [];
    } catch {
      return [];
    }
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    api
      .get("/settings")
      .then((r) => setSettings(r.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    localStorage.setItem("ypw_inquiry", JSON.stringify(inquiry));
  }, [inquiry]);

  const addToInquiry = (p) => {
    setInquiry((prev) =>
      prev.find((i) => i.slug === p.slug)
        ? prev
        : [...prev, { slug: p.slug, name: p.name, price: p.price, image: p.images?.[0] }]
    );
    setDrawerOpen(true);
  };
  const removeFromInquiry = (slug) =>
    setInquiry((prev) => prev.filter((i) => i.slug !== slug));
  const clearInquiry = () => setInquiry([]);
  const inInquiry = (slug) => inquiry.some((i) => i.slug === slug);

  return (
    <StoreContext.Provider
      value={{
        settings,
        inquiry,
        addToInquiry,
        removeFromInquiry,
        clearInquiry,
        inInquiry,
        drawerOpen,
        setDrawerOpen,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
