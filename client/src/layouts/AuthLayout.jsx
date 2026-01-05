import { Outlet } from "react-router-dom";
import { Undo2 } from "lucide-react";
import { Link } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-screen">
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
