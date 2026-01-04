import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";

import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashBoardLayout";

import Home from "@/pages/home/Home";
import DataUsage from "@/pages/legal/DataUsage";
import TermsOfService from "@/pages/legal/TermsOfService";
import PrivacyPolicy from "@/pages/legal/PrivacyPolicy";

const router = createBrowserRouter([
  // 🌍 PUBLIC PAGES
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <div>About</div> },
      { path: "features", element: <div>Features</div> },
    ],
  },

  //legal routes

  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/terms-of-service",
    element: <TermsOfService />,
  },
  {
    path: "/data-usage",
    element: <DataUsage />,
  },

  // 🔐 AUTH (GUEST ONLY)
  {
    element: (
      <ProtectedRoute allowGuest>
        <AuthLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "login", element: <div>Login</div> },
      { path: "signup", element: <div>Signup</div> },
      { path: "/forgot-password", element: <div>Forgot Password</div> },
    ],
  },

  {
    path: "/farmer",
    element: (
      <ProtectedRoute role="farmer">
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "get-suggestion", element: <div>Get AI Suggestion</div> },
      { path: "add-farm", element: <div>Add FarmLand</div> },

      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <div>Farmer Dashboard</div> },
          { path: "listings", element: <div>All Listings</div> },
        ],
      },
    ],
  },

  {
    path: "/unauthorized",
    element: <MainLayout />,
    children: [{ index: true, element: <div>Unauthorized</div> }],
  },
]);

export default router;
