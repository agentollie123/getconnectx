import { Linkedin, Twitter, Instagram, Youtube, Mail, Send } from "lucide-react";
import { Link } from "react-router-dom";
import logoIcon from "@/assets/logo-icon.png";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Product: [
    { label: "Discover", href: "/app" },
    { label: "Playground", href: "/app" },
    { label: "Download", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Press", href: "#" },
    { label: "Contact", href: "mailto:info@getconnectx.app" },
    { label: "Careers", href: "#" },
  ],
  Resources: [
    { label: "Blog", href: "#" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Condition", href: "/terms" },
    { label: "Community Guidelines", href: "#" },
  ],
};

const socials = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/getconnectx.app/" },
  { icon: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.8a4.83 4.83 0 0 1-1-.11z"/>
    </svg>
  ), label: "TikTok", href: "https://www.tiktok.com/@getconnectx" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/getconnectx" },
  { icon: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12.52 11.77a4.27 4.27 0 0 0-.44-.02c-1.68 0-2.66.99-2.66 2.73 0 1.78 1.01 2.73 2.73 2.73 1.59 0 2.62-.88 2.62-2.46 0-1.3-.82-2.46-2.25-2.98zm9.26.59C21.46 6.43 17.33 2 12 2 6.48 2 2 6.48 2 12s4.48 10 10 10c5.33 0 9.46-4.43 9.78-10.36v-.28zm-4.5 3.2c0 2.85-1.98 4.67-5.14 4.67-3.22 0-5.36-1.97-5.36-4.88 0-2.82 2.04-4.72 5.08-4.72.16 0 .33 0 .49.02-.04-.88-.51-1.39-1.47-1.39-.72 0-1.23.3-1.5.88l-2.1-.87C7.92 8.04 9.17 7.2 10.93 7.2c2.35 0 3.7 1.26 3.7 3.57v1.3c0 .58.22.85.66.85.34 0 .6-.15.82-.44l1.17 1.08z"/>
    </svg>
  ), label: "Threads", href: "https://www.threads.com/@getconnectx.app" },
  { icon: Send, label: "Telegram", href: "https://t.me/getconnectx" },
  { icon: Mail, label: "Email", href: "mailto:info@getconnectx.app" },
  { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@getconnectx" },
  { icon: Twitter, label: "X", href: "https://x.com/getconnectx" },
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
              Swipe. Match. Build together.
            </p>
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
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
                {links.map((link) => {
                  const isInternal = link.href.startsWith("/");
                  return (
                    <li key={link.label}>
                      {isInternal ? (
                        <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                          {link.label}
                        </Link>
                      ) : (
                        <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                          {link.label}
                        </a>
                      )}
                    </li>
                  );
                })}
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