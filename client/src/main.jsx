import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "@/app/router";
import Providers from "@/app/providers";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <Providers>
    <RouterProvider router={router} />
  </Providers>
);
