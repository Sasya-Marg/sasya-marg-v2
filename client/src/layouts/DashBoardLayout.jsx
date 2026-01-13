import { Outlet } from "react-router-dom";
import DashboardHeader from "@/components/common/DashboardHeader";

const DashboardLayout = () => {
  return (
    <div className="flex-1 flex flex-col">
      <DashboardHeader />

      <main className="flex-1 p-6 overflow-y-auto container mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
