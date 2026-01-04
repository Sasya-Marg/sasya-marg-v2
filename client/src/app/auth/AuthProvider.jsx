import { useEffect } from "react";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/store/useAuthStore";

const AuthProvider = ({ children }) => {
  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);

  useEffect(() => {
    
    api
      .get("/auth/me", { withCredentials: true })
      .then((res) => setUser(res.data.data))
      .catch(() => clearUser());
  }, []);

  return children;
};

export default AuthProvider;
