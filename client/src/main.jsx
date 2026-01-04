import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./app/routes/AppRoutes";
import AuthProvider from "./app/auth/AuthProvider";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
