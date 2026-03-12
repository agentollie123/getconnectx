import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  MapPin, Lightbulb, Search, Rocket, Star, Shield, Settings,
  Briefcase, Globe, GraduationCap, Clock, Code, TrendingUp,
} from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

type LookingForMode = "Founder → Co-Founder" | "Founder → Team" | "Co-Founder → Startup" | "Team Member → Startup";

const MODES: LookingForMode[] = [
  "Founder → Co-Founder",
  "Founder → Team",
  "Co-Founder → Startup",
  "Team Member → Startup",
];

interface ProfileData {
  name: string;
  subtitle: string;
  location: string;
  badges: { label: string; icon: typeof Rocket }[];
  stats: { label: string; value: string }[];
  ideaSection: { title: string; text: string } | null;
  skills: string[];
  interests: string[];
  details: { icon: typeof Briefcase; text: string }[];
}

const PROFILES: Record<LookingForMode, ProfileData> = {
  "Founder → Co-Founder": {
    name: "John Carter",
    subtitle: "Startup Founder",
    location: "Jakarta, Indonesia",
    badges: [
      { label: "Startup Founder", icon: Rocket },
      { label: "Top Builder", icon: Star },
      { label: "Open Source", icon: Shield },
    ],
    stats: [
      { label: "Connections", value: "47" },
      { label: "Teams Joined", value: "2" },
      { label: "Matches", value: "156" },
    ],
    ideaSection: {
      title: "Startup Idea",
      text: "AI-powered supply chain platform that optimizes logistics for SMEs across Southeast Asia.",
    },
    skills: ["Strategy", "BD", "Fundraising", "Product", "GTM"],
    interests: ["Fintech", "AI/ML", "SaaS", "B2B"],
    details: [
      { icon: Briefcase, text: "5+ years startup experience" },
      { icon: GraduationCap, text: "MBA, London Business School" },
      { icon: Globe, text: "English, Bahasa Indonesia" },
      { icon: Clock, text: "Full-time commitment" },
    ],
  },
  "Founder → Team": {
    name: "John Carter",
    subtitle: "Startup Founder",
    location: "Jakarta, Indonesia",
    badges: [
      { label: "Startup Founder", icon: Rocket },
      { label: "Top Builder", icon: Star },
      { label: "Open Source", icon: Shield },
    ],
    stats: [
      { label: "Connections", value: "47" },
      { label: "Teams Joined", value: "2" },
      { label: "Matches", value: "156" },
    ],
    ideaSection: {
      title: "Startup Idea",
      text: "AI-powered supply chain platform that optimizes logistics for SMEs across Southeast Asia.",
    },
    skills: ["Strategy", "BD", "Fundraising", "Product", "GTM"],
    interests: ["Fintech", "AI/ML", "SaaS", "B2B"],
    details: [
      { icon: Briefcase, text: "5+ years startup experience" },
      { icon: GraduationCap, text: "MBA, London Business School" },
      { icon: Globe, text: "English, Bahasa Indonesia" },
      { icon: Clock, text: "Full-time commitment" },
    ],
  },
  "Co-Founder → Startup": {
    name: "Maya Indira",
    subtitle: "Technical Co-Founder",
    location: "Singapore",
    badges: [
      { label: "Full-Stack Dev", icon: Code },
      { label: "Ex-Grab", icon: Star },
      { label: "Open Source", icon: Shield },
    ],
    stats: [
      { label: "Connections", value: "32" },
      { label: "Teams Joined", value: "1" },
      { label: "Matches", value: "89" },
    ],
    ideaSection: null,
    skills: ["Full-Stack", "React", "Node.js", "AWS", "System Design"],
    interests: ["Fintech", "Healthtech", "AI/ML", "SaaS"],
    details: [
      { icon: Briefcase, text: "7 years as senior engineer at Grab & Gojek" },
      { icon: GraduationCap, text: "CS, National University of Singapore" },
      { icon: Globe, text: "English, Mandarin, Bahasa" },
      { icon: Clock, text: "Full-time commitment" },
    ],
  },
  "Team Member → Startup": {
    name: "Rizky Pratama",
    subtitle: "Growth Marketer",
    location: "Bandung, Indonesia",
    badges: [
      { label: "Growth Expert", icon: TrendingUp },
      { label: "Top Builder", icon: Star },
    ],
    stats: [
      { label: "Connections", value: "21" },
      { label: "Teams Joined", value: "0" },
      { label: "Matches", value: "64" },
    ],
    ideaSection: null,
    skills: ["Growth", "Digital Marketing", "SEO / SEM", "Content Creation", "Analytics"],
    interests: ["EdTech", "SaaS", "Marketplace", "B2B"],
    details: [
      { icon: Briefcase, text: "4 years growth marketing at Tokopedia" },
      { icon: GraduationCap, text: "Marketing, Universitas Indonesia" },
      { icon: Globe, text: "English, Bahasa Indonesia" },
      { icon: Clock, text: "Part-time initially" },
    ],
  },
};

export function ProfileView() {
  const [activeMode, setActiveMode] = useState<LookingForMode>("Founder → Co-Founder");
  const profile = PROFILES[activeMode];

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        {/* Profile header */}
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-2 ring-4 ring-primary/20">
            <img src={logoIcon} alt="Profile" className="w-14 h-14 rounded-full" />
          </div>
          <h2 className="font-display text-lg font-bold text-foreground">{profile.name}</h2>
          <p className="text-xs text-muted-foreground">{profile.subtitle}</p>
          <p className="text-[10px] text-primary flex items-center justify-center gap-1 mt-0.5">
            <MapPin className="w-2.5 h-2.5" /> {profile.location}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {profile.stats.map((s) => (
            <div key={s.label} className="text-center rounded-xl bg-card border border-border p-2.5">
              <p className="text-lg font-display font-bold text-foreground">{s.value}</p>
              <p className="text-[9px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-1.5">
          {profile.badges.map((b) => (
            <div key={b.label} className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
              <b.icon className="w-3 h-3 text-primary" />
              <span className="text-[9px] font-semibold text-primary">{b.label}</span>
            </div>
          ))}
        </div>

        {/* Startup Idea (only for founder modes) */}
        {profile.ideaSection && (
          <div className="rounded-xl bg-primary/5 border border-primary/20 p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-primary" />
              <p className="text-xs font-semibold text-foreground">{profile.ideaSection.title}</p>
            </div>
            <p className="text-[11px] text-foreground/80 leading-relaxed">
              {profile.ideaSection.text}
            </p>
          </div>
        )}

        {/* Looking For - Mode selector */}
        <div className="rounded-xl bg-card border border-border p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Search className="w-3.5 h-3.5 text-primary" />
            <p className="text-xs font-semibold text-foreground">Looking For</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {MODES.map((r) => (
              <button
                key={r}
                onClick={() => setActiveMode(r)}
                className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${
                  activeMode === r
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Skills & Interests */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-card border border-border p-3">
            <p className="text-[10px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Skills</p>
            <div className="flex flex-wrap gap-1">
              {profile.skills.map((s) => (
                <span key={s} className="text-[9px] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">{s}</span>
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-card border border-border p-3">
            <p className="text-[10px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Interests</p>
            <div className="flex flex-wrap gap-1">
              {profile.interests.map((i) => (
                <span key={i} className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">{i}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="rounded-xl bg-card border border-border p-3 space-y-2">
          {profile.details.map((d, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs">
              <d.icon className="w-3.5 h-3.5 text-primary" />
              <span className="text-foreground">{d.text}</span>
            </div>
          ))}
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
