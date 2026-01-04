import { Outlet } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <Navbar />

      {/* Page Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;
