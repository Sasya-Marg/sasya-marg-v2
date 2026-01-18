import React, { useState } from "react";
import { useFarmerDashboard } from "@/hooks/farmer.hooks";
import AppLoader from "@/components/common/AppLoader";
import {
  StatsOverview,
  DetailedPredictionReport,
  FarmlandTable,
  HarvestActivityLog,
} from "./components/DashboardWidgets";
import {
  UserCircle,
  Download,
  RefreshCcw,
  Mail,
  Phone,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogoutFarmer } from "@/hooks/auth.hooks";
import { Link } from "react-router-dom";
import LogoutButton from "@/components/common/LogoutButton";
import LogoutConfirmDialog from "@/components/common/LogoutDialog";

const FarmerDashboardPage = () => {
  const getDashboard = useFarmerDashboard();
  const logout = useLogoutFarmer();
  const [isOpen, setIsOpen] = useState(false);

  if (
    getDashboard.isLoading ||
    getDashboard.isRefetching ||
    getDashboard.isFetching
  ) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <AppLoader />
      </div>
    );
  }

  const data = getDashboard?.data?.data;
  if (!data) return null;

  const { profile, stats, farmlands, recent } = data;

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <div className="min-h-screen font-sans pb-10">
      <div className=" border-b border-border sticky top-0 z-20 px-4 py-4 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-1 h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <UserCircle className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-bold tracking-tight text-primary truncate">
                {profile.fullname}
              </h1>

              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-sm text-muted-foreground mt-1">
                <div className="flex items-center gap-1.5 truncate">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate max-w-50 md:max-w-none">
                    {profile?.email ? (
                      profile.email
                    ) : (
                      <Link
                        to="/farmer/"
                        className="text-chart-2 text-xs border-b border-dashed border-chart-2"
                      >
                        Add Email
                      </Link>
                    )}
                  </span>
                </div>
                <span className="hidden md:inline text-foreground">|</span>
                <div className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  <span>+91 {profile.phone}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <Button
              variant="secondary"
              size="sm"
              className="flex-1 md:flex-none h-9 text-xs"
              onClick={() => getDashboard.refetch()}
            >
              <RefreshCcw className="mr-2 h-3.5 w-3.5" /> Sync
            </Button>
            <LogoutButton
              onClick={() => setIsOpen(true)}
              variant="destructive"
            />
            <LogoutConfirmDialog
              onClose={() => setIsOpen(false)}
              open={isOpen}
              onConfirm={handleLogout}
            />
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
        <section>
          <StatsOverview stats={stats} />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 min-h-125">
            <DetailedPredictionReport predictions={recent.predictions} />
          </div>

          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="h-100">
              <FarmlandTable farmlands={farmlands} />
            </div>
            <div className="h-100">
              <HarvestActivityLog listings={recent.listings} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FarmerDashboardPage;
