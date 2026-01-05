import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./app/routes/AppRoutes";
import AuthProvider from "./app/auth/AuthProvider";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "sonner";
import AppLoader from "@/components/common/AppLoader";
import { useAuthStore } from "./store/useAuthStore";

export const RootShell = () => {
  const loading = useAuthStore((s) => s.loading);
  const user = useAuthStore((s) => s.user);

  console.log("AUTH STATE →", { loading, user });

  return (
    <>
      {loading && <AppLoader />}
      <RouterProvider router={router} />
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RootShell />
      <Toaster position="bottom-left" richColors closeButton />
    </QueryClientProvider>
  </AuthProvider>
);
