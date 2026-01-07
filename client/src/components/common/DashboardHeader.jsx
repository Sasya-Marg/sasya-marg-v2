import { Link } from "react-router-dom";
import { Menu, User, LogOut, LayoutDashboard, Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLogoutFarmer } from "@/hooks/auth.hooks";

const DashboardHeader = () => {
  const { user, isAuthenticated, role } = useAuthStore();

  const { mutate, isPending } = useLogoutFarmer();

  function handleLogout() {
    mutate();
  }

  return (
    <header className="h-16 bg-background border-b flex items-center justify-between px-6">
      <h1 className="font-semibold">Dashboard</h1>
      <div className="hidden md:flex md:items-center md:gap-4">
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9 border-2 border-primary">
                  <AvatarFallback className={"text-lg font-bold"}>
                    {user.fullname.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.fullname}
                  </p>
                  <p className="text-xs leading-none text-foreground">
                    {user.email ? (
                      user.email
                    ) : (
                      <Link
                        to={`/${role}/`}
                        className="border-b border-dotted text-accent"
                      >
                        Add Email
                      </Link>
                    )}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to={`/${role}`}>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>

              <Link to={`/${role}/dashboard`}>
                <DropdownMenuItem>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
              </Link>

              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <button onClick={handleLogout}>
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Log out"
                  )}
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" asChild>
              <Link to="/farmer/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link to="/farmer/signup">Get Started</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
