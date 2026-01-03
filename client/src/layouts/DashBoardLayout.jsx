import { Outlet } from "react-router-dom";
import Sidebar from "@/components/common/Sidebar";
import DashboardHeader from "@/components/common/DashboardHeader";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-muted">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <DashboardHeader />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
