import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { Menu, User, LogOut, LayoutDashboard, Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, isAuthenticated, role } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  const farmerLinks = [
    { name: "Mandi", href: "/farmer/mandi" },
    { name: "Schemes", href: "/farmer/schemes" },
    { name: "Farmlands", href: "/farmer/farmland" },
    { name: "Get Suggestion", href: "/farmer/get-suggestion" },
    { name: "Support", href: "/farmer/support" },
  ];

  const isActive = (path) => location.pathname === path;
  const { mutate, isPending } = useLogoutFarmer();

  function handleLogout() {
    mutate();
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex md:h-14 h-12 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <Logo className={"w-8 md:w-11"} />
              <span className="md:text-2xl text-lg font-bold tracking-tight text-foreground">
                Sasya<span className="text-primary">Marg</span>
              </span>
            </Link>
          </div>

          {isAuthenticated ? (
            <div className="hidden md:flex md:items-center md:gap-6">
              {farmerLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(link.href)
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          ) : (
            <div className="hidden md:flex md:items-center md:gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(link.href)
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}

          <div className="hidden md:flex md:items-center md:gap-4">
            {isAuthenticated ? (
              <>
                <ThemeToggle />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-9 w-9 rounded-full"
                    >
                      <Avatar className="h-9 w-9 border-2 border-primary">
                        <AvatarFallback className="text-lg font-bold">
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
                    <Link to={`/${role}/`}>
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
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link to="/farmer/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link to="/farmer/signup">Get Started</Link>
                </Button>
                <ThemeToggle />
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-75 sm:w-100">
                <SheetHeader>
                  <SheetTitle className="text-left flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                      <Logo className={"w-8 md:w-11"} />
                      <span className="text-lg font-bold tracking-tight text-foreground">
                        Sasya<span className="text-primary">Marg</span>
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                {isAuthenticated ? (
                  <div className="flex flex-col gap-4 p-4">
                    {farmerLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-lg font-medium ${
                          isActive(link.href)
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 p-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-lg font-medium ${
                          isActive(link.href)
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}

                <div className="mt-6 px-4">
                  <ThemeToggle />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
