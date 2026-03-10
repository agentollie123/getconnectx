import { Linkedin, Twitter, Instagram, Youtube, Mail, Send } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

const footerLinks = {
  Product: ["Discover", "Playground", "Idea Marketplace", "Download"],
  Company: ["About", "Careers", "Press", "Contact"],
  Resources: ["Blog", "Privacy Policy", "Terms of Service"]
};

const socials = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.8a4.83 4.83 0 0 1-1-.11z"/>
    </svg>
  ), label: "TikTok", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.068V11.5h4.5v.568c0 2.547.532 4.558 1.582 5.975 1.065 1.438 2.79 2.298 5.104 2.456V13.5h-3v-4h3V7.5c0-1.38.56-2.63 1.464-3.536A4.985 4.985 0 0 1 17.686 2.5H21v4h-2.314c-.828 0-1.186.358-1.186 1.186V9.5h3.5l-1 4h-2.5v7.003c2.065-.202 3.592-.977 4.542-2.309.99-1.39 1.458-3.38 1.458-5.826V11.5h4.5v.568c0 3.518-.85 6.372-2.495 8.423C23.52 22.795 20.767 23.976 17.186 24h-.007z"/>
    </svg>
  ), label: "Threads", href: "#" },
  { icon: Send, label: "Telegram", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:hello@getconnectx.com" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Twitter, label: "X", href: "#" },
];

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
              The platform where startups begin.
            </p>
            <p className="text-xs text-muted-foreground mb-4 italic">
              LinkedIn + AngelList + Bumble for founders.
            </p>
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a key={s.label} href={s.href} aria-label={s.label} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
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