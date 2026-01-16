import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import AppLoader from "@/components/common/AppLoader";

const ProtectedRoute = ({ children, role, allowGuest }) => {
  const {role: userRole, authStatus } = useAuthStore();

  if (authStatus === "loading") {
    return <AppLoader />;
  }

  if (allowGuest) {
    if (authStatus === "authenticated" && userRole) {
      return <Navigate to={`/${userRole}/dashboard`} replace />;
    }
    return children;
  }

  if (authStatus === "unauthenticated") {
    return <Navigate to="/" replace />;
  }

  if (role && role !== userRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
