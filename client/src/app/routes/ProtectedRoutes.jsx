import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

const ProtectedRoute = ({ children, role, allowGuest }) => {
  const { loading, isAuthenticated, role: userRole, } = useAuthStore();

  if (loading) return null;

  // 🔓 guest allowed route (sirf /login)
  if (allowGuest) {
    if (isAuthenticated) {
      return <Navigate to={`/${userRole}/dashboard`} replace />;
    }
    return children;
  }

  // 🔐 protected routes
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (role && role !== userRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
