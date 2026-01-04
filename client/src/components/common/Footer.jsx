import React from "react";
import {
  Sprout,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="w-full bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand & Newsletter Column */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Logo className={"w-8 md:w-11"}/>

              <span className="text-xl font-bold tracking-tight text-foreground">
                SasyaMarg
              </span>
            </div>

            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              Join our community of modern farmers. Get the latest crop insights
              and market trends directly to your inbox.
            </p>

            {/* Newsletter Input */}
            <form
              className="flex w-full max-w-sm items-center space-x-2 mb-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Stay Updated
              </button>
            </form>
          </div>

          {/* Services Links (Updated) */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              <FooterLink href="/market-place" label="Market Place" />
              <FooterLink href="/crop-suggestion" label="Crop Suggestion" />
              <FooterLink href="/scheme-guide" label="Scheme Guide" />
              <FooterLink
                href="/admin/join"
                label="Become an Admin / Work for Us"
              />
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              <FooterLink href="/about" label="About Sasya-Marg" />
              <FooterLink href="/contact" label="Contact Support" />
              <FooterLink href="/blog" label="Farming Blog" />
              <FooterLink href="/partners" label="Partners" />
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              <FooterLink href="/privacy" label="Privacy Policy" />
              <FooterLink href="/terms" label="Terms of Service" />
              <FooterLink href="/data-policy" label="Data Usage" />
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Sasya-Marg. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- Helper Components ---

const FooterLink = ({ href, label }) => (
  <li>
    <a
      href={href}
      className="text-sm text-muted-foreground hover:text-primary transition-colors block"
    >
      {label}
    </a>
  </li>
);

const SocialIcon = ({ icon }) => (
  <a
    href="#"
    className="text-muted-foreground hover:text-primary transition-colors"
  >
    {icon}
  </a>
);

export default Footer;
