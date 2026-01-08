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
import UnauthorizedPage from "@/pages/unauthorize/UnAuthorize";
import NotFoundPage from "@/pages/404/404Page";
import FarmerSignup from "@/pages/signup/Signup";
import FarmerLogin from "@/pages/Login/Login";
import ForgotPassword from "@/pages/forgot-password/ForgotPassword";
import Profile from "@/pages/profile/Profile";
import Farmlands from "@/pages/farmland/Farmlands";
import SingleFarmland from "@/pages/farmland/SingleFarmland";
import AddFarmlandPage from "@/pages/farmland/AddFarmland";

const router = createBrowserRouter([
  // 🌍 PUBLIC PAGES
  {
    element: (
      <ProtectedRoute allowGuest={true}>
        <MainLayout />
      </ProtectedRoute>
    ),
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
      { path: "farmer/login", element: <FarmerLogin /> },
      { path: "farmer/signup", element: <FarmerSignup /> },
      { path: "farmer/forgot-password", element: <ForgotPassword /> },
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
      { index: true, element: <Profile /> },
      { path: "get-suggestion", element: <div>Get AI Suggestion</div> },
      { path: "get-suggestion/:id", element: <div>Suggestion History</div> },
      { path: "mandi", element: <div>Mandi for Listing</div> },
      { path: "Schemes", element: <div>Scheme for farmer</div> },
      { path: "contact", element: <div>Contact for farmer</div> },
      { path: "farmland", element: <Farmlands /> },
      { path: "farmland/:farmlandId", element: <SingleFarmland /> },
      { path: "farmland/add", element: <AddFarmlandPage /> },
    ],
  },

  //Dashboard
  {
    path: "farmer/dashboard",
    element: (
      <ProtectedRoute role="farmer">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <div>Farmer Dashboard</div> },
      { path: "listings", element: <div>All Listings</div> },
    ],
  },

  {
    element: <MainLayout />,
    children: [
      { path: "/unauthorized", element: <UnauthorizedPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
