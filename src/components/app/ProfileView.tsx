import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  MapPin, Lightbulb, Search, Rocket, Star, Shield, Settings,
  Briefcase, Globe, GraduationCap, Clock,
} from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

const BADGES = [
  { label: "Startup Founder", icon: Rocket },
  { label: "Top Builder", icon: Star },
  { label: "Open Source", icon: Shield },
];

const STATS = [
  { label: "Connections", value: "47" },
  { label: "Teams Joined", value: "2" },
  { label: "Matches", value: "156" },
];

export function ProfileView() {
  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        {/* Profile header */}
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-2 ring-4 ring-primary/20">
            <img src={logoIcon} alt="Profile" className="w-14 h-14 rounded-full" />
          </div>
          <h2 className="font-display text-lg font-bold text-foreground">John Carter</h2>
          <p className="text-xs text-muted-foreground">Startup Founder</p>
          <p className="text-[10px] text-primary flex items-center justify-center gap-1 mt-0.5">
            <MapPin className="w-2.5 h-2.5" /> Jakarta, Indonesia
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {STATS.map((s) => (
            <div key={s.label} className="text-center rounded-xl bg-card border border-border p-2.5">
              <p className="text-lg font-display font-bold text-foreground">{s.value}</p>
              <p className="text-[9px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-1.5">
          {BADGES.map((b) => (
            <div key={b.label} className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
              <b.icon className="w-3 h-3 text-primary" />
              <span className="text-[9px] font-semibold text-primary">{b.label}</span>
            </div>
          ))}
        </div>

        {/* Startup Idea */}
        <div className="rounded-xl bg-primary/5 border border-primary/20 p-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-primary" />
            <p className="text-xs font-semibold text-foreground">Startup Idea</p>
          </div>
          <p className="text-[11px] text-foreground/80 leading-relaxed">
            AI-powered supply chain platform that optimizes logistics for SMEs across Southeast Asia.
          </p>
        </div>

        {/* Looking For - Mode selector */}
        <div className="rounded-xl bg-card border border-border p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Search className="w-3.5 h-3.5 text-primary" />
            <p className="text-xs font-semibold text-foreground">Looking For</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["Founder → Co-Founder", "Founder → Team", "Co-Founder → Startup", "Team Member → Startup"].map((r) => (
              <span key={r} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">{r}</span>
            ))}
          </div>
        </div>

        {/* Skills & Interests */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-card border border-border p-3">
            <p className="text-[10px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Skills</p>
            <div className="flex flex-wrap gap-1">
              {["Strategy", "BD", "Fundraising", "Product", "GTM"].map((s) => (
                <span key={s} className="text-[9px] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">{s}</span>
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-card border border-border p-3">
            <p className="text-[10px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Interests</p>
            <div className="flex flex-wrap gap-1">
              {["Fintech", "AI/ML", "SaaS", "B2B"].map((i) => (
                <span key={i} className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">{i}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="rounded-xl bg-card border border-border p-3 space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <Briefcase className="w-3.5 h-3.5 text-primary" />
            <span className="text-foreground">5+ years startup experience</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <GraduationCap className="w-3.5 h-3.5 text-primary" />
            <span className="text-foreground">MBA, London Business School</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Globe className="w-3.5 h-3.5 text-primary" />
            <span className="text-foreground">English, Bahasa Indonesia</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span className="text-foreground">Full-time commitment</span>
          </div>
        </div>

        {/* Edit profile */}
        <Button variant="outline" className="w-full text-xs border-border">
          <Settings className="w-3.5 h-3.5 mr-1.5" />
          Edit Profile
        </Button>
      </div>
    </ScrollArea>
  );
}
