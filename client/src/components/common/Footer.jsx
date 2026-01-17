import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const { authStatus } = useAuthStore();

  return (
    <footer className="w-full bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Logo className={"w-8 md:w-11"} />
              <span className="text-xl font-bold tracking-tight text-foreground">
                SasyaMarg
              </span>
            </div>

            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              {authStatus
                ? "Empowering your farming journey with real-time data and AI insights."
                : "Join our community of modern farmers. Get the latest crop insights and market trends."}
            </p>

            <form
              className="flex w-full max-w-sm items-center space-x-2 mb-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              {authStatus === "authenticated" ? "My Farm" : "Discover"}
            </h3>
            <ul className="mt-4 space-y-3">
              {authStatus === "authenticated" ? (
                <>
                  <FooterLink href="/farmer/mandi" label="Mandi Prices" />
                  <FooterLink href="/farmer/farmland" label="My Farmlands" />
                  <FooterLink
                    href="/farmer/get-suggestion"
                    label="AI Suggestions"
                  />
                  <FooterLink href="/" label="Farmer Dasboard" />
                </>
              ) : (
                <>
                  <FooterLink href="/" label="Home" />
                  <FooterLink href="/about" label="About Us" />
                  <FooterLink href="/services" label="Our Services" />
                  <FooterLink href="/admin/join" label="Work for Us" />
                </>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              {authStatus === "authenticated" ? "Support" : "Connect"}
            </h3>
            <ul className="mt-4 space-y-3">
              {authStatus === "authenticated" ? (
                <>
                  <FooterLink href="/farmer/support" label="Help & Support" />
                  <FooterLink href="/farmer/community" label="Farmer Forum" />
                  <FooterLink href="/farmer/schemes" label="Govt Schemes" />
                </>
              ) : (
                <>
                  <FooterLink href="/contact" label="Contact Us" />
                  <FooterLink href="/blogs" label="Farming Blog" />
                  <FooterLink href="/partners" label="Partners" />
                </>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              <FooterLink href="/privacy-policy" label="Privacy Policy" />
              <FooterLink href="/terms-of-service" label="Terms of Service" />
              <FooterLink href="/data-usage" label="Data Usage Policy" />
              <FooterLink href="/disclaimer" label="Disclaimer" />
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Sasya-Marg. All rights reserved.
          </p>

          <div className="flex gap-4">
            <SocialIcon icon={<Facebook size={20} />} href="#" />
            <SocialIcon icon={<Twitter size={20} />} href="#" />
            <SocialIcon icon={<Instagram size={20} />} href="#" />
            <SocialIcon icon={<Linkedin size={20} />} href="#" />
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, label }) => (
  <li>
    <Link
      to={href}
      className="text-sm text-muted-foreground hover:text-primary transition-colors block"
    >
      {label}
    </Link>
  </li>
);

const SocialIcon = ({ icon, href }) => (
  <Link
    to={href}
    className="text-muted-foreground hover:text-primary transition-colors"
  >
    {icon}
  </Link>
);

export default Footer;
