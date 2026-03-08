import { Linkedin, Twitter } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

const footerLinks = {
  Product: ["Discover", "Playground", "Idea Marketplace", "Download"],
  Company: ["About", "Careers", "Press", "Contact"],
  Resources: ["Blog", "Privacy Policy", "Terms of Service"]
};

export function Footer() {
  return (
    <footer className="border-t border-border py-16">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logoIcon} alt="ConnectX" className="w-8 h-8 rounded-lg" />
              <span className="font-display font-bold text-lg text-foreground">ConnectX</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              The operating system for starting companies.
            </p>
            <p className="text-xs text-muted-foreground mb-4 italic">LinkedIn + AngelList + Bumble for founders.

            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) =>
          <div key={title}>
              <h4 className="font-display font-semibold text-foreground mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) =>
              <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link}</a>
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>

        <div className="border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 ConnectX. All rights reserved. Building the infrastructure for the next generation of startups.
          </p>
        </div>
      </div>
    </footer>);

}