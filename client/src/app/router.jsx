import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

import Home from "@/pages/public/Home";
import Login from "@/pages/auth/Login";
import FarmerDashboard from "@/pages/farmer/Dashboard";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [{ path: "/", element: <Home /> }],
  },
  {
    element: <AuthLayout />,
    children: [{ path: "/login", element: <Login /> }],
  },
  {
    element: <DashboardLayout />,
    children: [{ path: "/farmer", element: <FarmerDashboard /> }],
  },
]);
