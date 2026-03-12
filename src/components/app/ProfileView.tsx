import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  MapPin, Lightbulb, Rocket, Star, Shield, Settings,
  Briefcase, Globe, GraduationCap, Clock, Zap, TrendingUp, DollarSign, Users, Target,
} from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";
import { EditProfileModal } from "./EditProfileModal";

type MatchingMode = "founder-cofounder" | "founder-team" | "cofounder-startup" | "team-startup";

interface ProfileData {
  name: string;
  title: string;
  location: string;
  badges: { label: string; icon: React.ComponentType<{ className?: string }> }[];
  stats: { label: string; value: string }[];
  ideaTitle: string;
  ideaDesc: string;
  personality: string[];
  skills: string[];
  interests: string[];
  experience: string;
  education: string;
  languages: string;
  commitment: string;
}

const PROFILES: Record<MatchingMode, ProfileData> = {
  "founder-cofounder": {
    name: "John Carter",
    title: "Startup Founder",
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
    ideaTitle: "Startup Idea",
    ideaDesc: "AI-powered supply chain platform that optimizes logistics for SMEs across Southeast Asia.",
    personality: ["🎯 Goal-Oriented", "🧠 Problem Solver", "☕ Coffee Enthusiast", "📚 Avid Reader", "🏃 Marathon Runner", "🎸 Guitar Player"],
    skills: ["Strategy", "BD", "Fundraising", "Product", "GTM"],
    interests: ["Fintech", "AI/ML", "SaaS", "B2B"],
    experience: "5+ years startup experience",
    education: "MBA, London Business School",
    languages: "English, Bahasa Indonesia",
    commitment: "Full-time commitment",
  },
  "founder-team": {
    name: "John Carter",
    title: "Startup Founder",
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
    ideaTitle: "Startup Idea",
    ideaDesc: "AI-powered supply chain platform that optimizes logistics for SMEs across Southeast Asia.",
    personality: ["🎯 Goal-Oriented", "🧠 Problem Solver", "☕ Coffee Enthusiast", "📚 Avid Reader", "🏃 Marathon Runner", "🎸 Guitar Player"],
    skills: ["Strategy", "BD", "Fundraising", "Product", "GTM"],
    interests: ["Fintech", "AI/ML", "SaaS", "B2B"],
    experience: "5+ years startup experience",
    education: "MBA, London Business School",
    languages: "English, Bahasa Indonesia",
    commitment: "Full-time commitment",
  },
  "cofounder-startup": {
    name: "Rachel Tanaka",
    title: "Serial Entrepreneur · Seeking New Venture",
    location: "Singapore",
    badges: [
      { label: "Exit Founder (2x)", icon: DollarSign },
      { label: "Angel Investor", icon: TrendingUp },
      { label: "YC Alumni", icon: Star },
    ],
    stats: [
      { label: "Exits", value: "2" },
      { label: "Portfolio", value: "12" },
      { label: "Connections", value: "230+" },
    ],
    ideaTitle: "What I Bring",
    ideaDesc: "Led two startups from zero to acquisition ($15M & $42M exits). Deep expertise in fundraising, investor relations, and scaling B2B SaaS. Looking to co-found something ambitious in AI or climate tech.",
    personality: ["🚀 High-Energy", "🤝 Connector", "📊 Data-Driven", "✈️ Travel Junkie", "🎾 Tennis Player", "🍷 Wine Enthusiast"],
    skills: ["Fundraising", "Investor Relations", "M&A", "Scaling Ops", "Board Mgmt"],
    interests: ["AI", "Climate Tech", "Deep Tech", "B2B SaaS"],
    experience: "12+ years · 2 successful exits",
    education: "MBA, Stanford GSB",
    languages: "English, Japanese, Mandarin",
    commitment: "Full-time · Ready to dive in",
  },
  "team-startup": {
    name: "Marcus Rivera",
    title: "Growth & Sales Leader · Open to Startups",
    location: "Austin, TX",
    badges: [
      { label: "Growth Expert", icon: Target },
      { label: "Sales Leader", icon: Users },
      { label: "Top Performer", icon: Star },
    ],
    stats: [
      { label: "ARR Grown", value: "$8M+" },
      { label: "Teams Led", value: "5" },
      { label: "Startups", value: "3" },
    ],
    ideaTitle: "What I'm Looking For",
    ideaDesc: "Seasoned GTM leader who's scaled sales teams from 3 to 40+ reps. Built outbound engines that drove $8M ARR at Series A startups. Ready to join a pre-seed or seed stage startup as Head of Growth or VP Sales.",
    personality: ["💪 Competitive", "🎤 Public Speaker", "📈 Metrics-Obsessed", "🏋️ Gym Rat", "🎮 Gamer", "🌮 Foodie"],
    skills: ["Sales Strategy", "Growth Hacking", "Outbound", "CRM & Ops", "Content Marketing"],
    interests: ["SaaS", "Marketplace", "Fintech", "EdTech"],
    experience: "8+ years in sales & marketing",
    education: "BS Marketing, UT Austin",
    languages: "English, Spanish",
    commitment: "Full-time · Immediate availability",
  },
};

interface ProfileViewProps {
  matchingMode?: MatchingMode;
}

export function ProfileView({ matchingMode = "founder-cofounder" }: ProfileViewProps) {
  const p = PROFILES[matchingMode];

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        {/* Profile header */}
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-2 ring-4 ring-primary/20">
            <span className="text-2xl font-display font-bold text-primary-foreground">
              {p.name.split(" ").map(w => w[0]).join("")}
            </span>
          </div>
          <h2 className="font-display text-lg font-bold text-foreground">{p.name}</h2>
          <p className="text-xs text-muted-foreground">{p.title}</p>
          <p className="text-[10px] text-primary flex items-center justify-center gap-1 mt-0.5">
            <MapPin className="w-2.5 h-2.5" /> {p.location}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {p.stats.map((s) => (
            <div key={s.label} className="text-center rounded-xl bg-card border border-border p-2.5">
              <p className="text-lg font-display font-bold text-foreground">{s.value}</p>
              <p className="text-[9px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-1.5">
          {p.badges.map((b) => (
            <div key={b.label} className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
              <b.icon className="w-3 h-3 text-primary" />
              <span className="text-[9px] font-semibold text-primary">{b.label}</span>
            </div>
          ))}
        </div>

        {/* Idea / What I Bring */}
        <div className="rounded-xl bg-primary/5 border border-primary/20 p-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-primary" />
            <p className="text-xs font-semibold text-foreground">{p.ideaTitle}</p>
          </div>
          <p className="text-[11px] text-foreground/80 leading-relaxed">{p.ideaDesc}</p>
        </div>

        {/* Personality & Hobbies */}
        <div className="rounded-xl bg-card border border-border p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <p className="text-xs font-semibold text-foreground">Personality & Hobbies</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {p.personality.map((t) => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">{t}</span>
            ))}
          </div>
        </div>

        {/* Skills & Interests */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-card border border-border p-3">
            <p className="text-[10px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Skills</p>
            <div className="flex flex-wrap gap-1">
              {p.skills.map((s) => (
                <span key={s} className="text-[9px] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">{s}</span>
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-card border border-border p-3">
            <p className="text-[10px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Interests</p>
            <div className="flex flex-wrap gap-1">
              {p.interests.map((i) => (
                <span key={i} className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">{i}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="rounded-xl bg-card border border-border p-3 space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <Briefcase className="w-3.5 h-3.5 text-primary" />
            <span className="text-foreground">{p.experience}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <GraduationCap className="w-3.5 h-3.5 text-primary" />
            <span className="text-foreground">{p.education}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Globe className="w-3.5 h-3.5 text-primary" />
            <span className="text-foreground">{p.languages}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span className="text-foreground">{p.commitment}</span>
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
