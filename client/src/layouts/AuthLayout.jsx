import { Outlet } from "react-router-dom";
import { Undo2 } from "lucide-react";
import { Link } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-screen p-10 rounded-xl container mx-auto">
      <Link to={"/"} className="flex gap-2 text-accent">
        <Undo2 /> Back to home
      </Link>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
