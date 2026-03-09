import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  MapPin, Lightbulb, Search, Award, Star, Shield, Rocket, Users,
} from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

const BADGES = [
  { label: "Startup Founder", icon: Rocket },
  { label: "Top Builder", icon: Star },
  { label: "Open Source Contributor", icon: Shield },
];

export function ProfileView() {
  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-lg mx-auto space-y-6">
        {/* Profile header */}
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[hsl(30,100%,50%)] to-[hsl(22,100%,50%)] flex items-center justify-center mx-auto mb-3">
            <img src={logoIcon} alt="Profile" className="w-14 h-14 rounded-full" />
          </div>
          <h2 className="font-display text-xl font-bold text-foreground">John Carter</h2>
          <p className="text-sm text-muted-foreground">Startup Founder</p>
          <p className="text-xs text-primary flex items-center justify-center gap-1 mt-1">
            <MapPin className="w-3 h-3" /> Jakarta, Indonesia
          </p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-2">
          {BADGES.map((b) => (
            <div key={b.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <b.icon className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-semibold text-primary">{b.label}</span>
            </div>
          ))}
        </div>

        {/* Startup Idea */}
        <div className="rounded-xl bg-card border border-border p-4">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-primary" />
            <p className="text-sm font-semibold text-foreground">Startup Idea</p>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            AI-powered supply chain platform that optimizes logistics for SMEs across Southeast Asia.
          </p>
        </div>

        {/* Looking For */}
        <div className="rounded-xl bg-card border border-border p-4">
          <div className="flex items-center gap-2 mb-2">
            <Search className="w-4 h-4 text-primary" />
            <p className="text-sm font-semibold text-foreground">Looking For</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["Technical Co-Founder", "Backend Engineers", "Product Builders"].map((r) => (
              <span key={r} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">{r}</span>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="rounded-xl bg-card border border-border p-4">
          <p className="text-sm font-semibold text-foreground mb-2">Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {["Strategy", "Business Development", "Fundraising", "Product Management", "Go-to-Market"].map((s) => (
              <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">{s}</span>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="rounded-xl bg-card border border-border p-4">
          <p className="text-sm font-semibold text-foreground mb-2">Startup Interests</p>
          <div className="flex flex-wrap gap-1.5">
            {["Fintech", "AI/ML", "Supply Chain", "B2B SaaS"].map((i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">{i}</span>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
