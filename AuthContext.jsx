import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppFloat } from "./WhatsAppFloat";
import { InquiryDrawer } from "./InquiryDrawer";

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-void">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      <InquiryDrawer />
    </div>
  );
};
