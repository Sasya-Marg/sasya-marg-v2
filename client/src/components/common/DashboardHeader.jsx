import { Link } from "react-router-dom";
import {
  Menu,
  User,
  LogOut,
  LayoutDashboard,
  Loader2,
  Store,
  Tractor,
  HeartHandshake,
  Brain,
  BookMarked,
} from "lucide-react";
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
import ThemeToggle from "./ThemeToggle";

const DashboardHeader = () => {
  const { user, isAuthenticated, role } = useAuthStore();

  return (
    <header className="h-16 bg-background border-b flex items-center justify-between px-10 md:px-23">
      <h1 className="font-semibold text-xl">Dashboard</h1>
      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="md:h-8.5 md:w-8.5 w-7 h-7">
                  <AvatarFallback
                    className={
                      "text-lg font-bold dark:bg-primary dark:text-primary-foreground bg-chart-5/20 cursor-pointer"
                    }
                  >
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
                <DropdownMenuItem className="focus:bg-secondary cursor-pointer focus:text-secondary-foreground">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>

              <Link to={`/farmer/mandi`}>
                <DropdownMenuItem className="focus:bg-secondary cursor-pointer focus:text-secondary-foreground">
                  <Store className="mr-2 h-4 w-4" />
                  <span>Mandi</span>
                </DropdownMenuItem>
              </Link>

              <Link to={`/farmer/schemes`}>
                <DropdownMenuItem className="focus:bg-secondary cursor-pointer focus:text-secondary-foreground">
                  <BookMarked className="mr-2 h-4 w-4" />
                  <span>Schemes</span>
                </DropdownMenuItem>
              </Link>

              <Link to={`/farmer/farmland`}>
                <DropdownMenuItem className="focus:bg-secondary cursor-pointer focus:text-secondary-foreground">
                  <Tractor className="mr-2 h-4 w-4" />
                  <span>Farmland</span>
                </DropdownMenuItem>
              </Link>

              <Link to={`/farmer/get-suggestion`}>
                <DropdownMenuItem className="focus:bg-secondary cursor-pointer focus:text-secondary-foreground">
                  <Brain className="mr-2 h-4 w-4" />
                  <span>Get Suggestion</span>
                </DropdownMenuItem>
              </Link>

              <Link to={`/farmer/support`}>
                <DropdownMenuItem className="focus:bg-secondary cursor-pointer focus:text-secondary-foreground">
                  <HeartHandshake className="mr-2 h-4 w-4" />
                  <span>Help & Support</span>
                </DropdownMenuItem>
              </Link>
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
        <ThemeToggle />
      </div>
    </header>
  );
};

export default DashboardHeader;
