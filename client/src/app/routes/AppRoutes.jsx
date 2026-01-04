import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";

import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashBoardLayout";

import Home from "@/pages/home/Home";
import Services from "@/pages/services/Services";
import DataUsage from "@/pages/legal/DataUsage";
import TermsOfService from "@/pages/legal/TermsOfService";
import PrivacyPolicy from "@/pages/legal/PrivacyPolicy";
import ContactPage from "@/pages/contact/Contact";
import AboutPage from "@/pages/about/About";

const router = createBrowserRouter([
  // 🌍 PUBLIC PAGES
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "services", element: <Services /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
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
