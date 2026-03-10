import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Lock, Sparkles, TrendingUp, Users, Briefcase,
  Brain, BarChart3, Shield, Globe, Rocket, Star,
  Crown, DollarSign, Award, Lightbulb, Target,
} from "lucide-react";

interface V2Module {
  title: string;
  description: string;
  icon: any;
  tier: "free" | "premium";
  features: string[];
  gradient: string;
}

const V2_FREE_MODULES: V2Module[] = [
  {
    title: "Founder → Investor Matching",
    description: "Connect with investors looking for early-stage startups",
    icon: DollarSign,
    tier: "free",
    features: ["Pitch deck sharing", "Investor discovery feed", "Warm introductions"],
    gradient: "from-emerald-500/20 to-primary/20",
  },
  {
    title: "Advisor & Mentor Network",
    description: "Match with experienced advisors in your industry",
    icon: Award,
    tier: "free",
    features: ["Mentorship matching", "Office hours booking", "Expertise search"],
    gradient: "from-blue-500/20 to-primary/20",
  },
  {
    title: "Strategic Partner Matching",
    description: "Connect with corporates, accelerators, and venture studios",
    icon: Briefcase,
    tier: "free",
    features: ["Corporate innovation", "Accelerator programs", "Partnership deals"],
    gradient: "from-purple-500/20 to-primary/20",
  },
  {
    title: "Startup Discovery Feed",
    description: "Browse and discover startup opportunities to join",
    icon: Rocket,
    tier: "free",
    features: ["Startup cards", "Open roles browser", "Stage filtering"],
    gradient: "from-primary/20 to-accent/20",
  },
];

const V2_PREMIUM_MODULES: V2Module[] = [
  {
    title: "Founder Reputation Score",
    description: "Build credibility through verified startup activity",
    icon: Star,
    tier: "premium",
    features: ["Startups built: 2", "Teams formed: 3", "Reputation: 82"],
    gradient: "from-accent/20 to-amber-500/20",
  },
  {
    title: "Startup Strength Score",
    description: "Measure startup credibility and traction indicators",
    icon: BarChart3,
    tier: "premium",
    features: ["Team completeness", "Investor interest", "Strength: 74"],
    gradient: "from-accent/20 to-orange-500/20",
  },
  {
    title: "Investor Intelligence",
    description: "Deep analytics on startup ecosystem trends",
    icon: Brain,
    tier: "premium",
    features: ["Top growing startups", "Most matched founders", "Fastest teams"],
    gradient: "from-accent/20 to-rose-500/20",
  },
  {
    title: "Advanced AI Matching",
    description: "AI analyzes deeper signals for perfect matches",
    icon: Target,
    tier: "premium",
    features: ["Skill gap analysis", "Team complementarity", "Founder compatibility"],
    gradient: "from-accent/20 to-violet-500/20",
  },
];

function ModuleCard({ module, index }: { module: V2Module; index: number }) {
  const isPremium = module.tier === "premium";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className={`rounded-xl border p-3 relative overflow-hidden ${
        isPremium
          ? "border-accent/20 bg-gradient-to-br " + module.gradient
          : "border-border/40 bg-gradient-to-br " + module.gradient
      }`}
    >
      {/* Lock overlay */}
      <div className="absolute top-2 right-2">
        <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8px] font-bold ${
          isPremium
            ? "bg-accent/20 text-accent border border-accent/30"
            : "bg-primary/20 text-primary border border-primary/30"
        }`}>
          <Lock className="w-2 h-2" />
          V2 {isPremium ? "Premium" : "Free"}
        </div>
      </div>

      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
        isPremium ? "bg-accent/20" : "bg-primary/20"
      }`}>
        <module.icon className={`w-4 h-4 ${isPremium ? "text-accent" : "text-primary"}`} />
      </div>

      <h4 className="text-xs font-display font-bold text-foreground mb-0.5 pr-16">{module.title}</h4>
      <p className="text-[10px] text-muted-foreground mb-2 leading-relaxed">{module.description}</p>

      <div className="space-y-1">
        {module.features.map((f) => (
          <div key={f} className="flex items-center gap-1.5 text-[9px] text-muted-foreground/70">
            <Sparkles className={`w-2 h-2 flex-shrink-0 ${isPremium ? "text-accent/50" : "text-primary/50"}`} />
            <span>{f}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

interface V2ComingSoonProps {
  showPremium?: boolean;
}

export function V2ComingSoonGrid({ showPremium = false }: V2ComingSoonProps) {
  const modules = showPremium
    ? [...V2_FREE_MODULES, ...V2_PREMIUM_MODULES]
    : V2_FREE_MODULES;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-display font-bold text-foreground">Coming in V2</h3>
        <span className="text-[8px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-bold">
          ROADMAP
        </span>
      </div>

      {/* V2 Free */}
      <div>
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          V2 Free Features
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {V2_FREE_MODULES.map((m, i) => (
            <ModuleCard key={m.title} module={m} index={i} />
          ))}
        </div>
      </div>

      {/* V2 Premium */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            V2 Premium Features
          </p>
          <Crown className="w-3 h-3 text-accent" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {V2_PREMIUM_MODULES.map((m, i) => (
            <ModuleCard key={m.title} module={m} index={i + V2_FREE_MODULES.length} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Compact strip version for the bottom of the app
export function V2ComingSoonStrip() {
  const ALL = [
    { label: "Founder ↔ Investor", tier: "V2 Free" },
    { label: "Advisor Network", tier: "V2 Free" },
    { label: "Partner Matching", tier: "V2 Free" },
    { label: "Startup Discovery", tier: "V2 Free" },
    { label: "Reputation Score", tier: "V2 Premium" },
    { label: "Startup Strength", tier: "V2 Premium" },
    { label: "AI Matching", tier: "V2 Premium" },
  ];
  return (
    <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
      {ALL.map((c) => (
        <div key={c.label} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted/30 border border-border/20 flex-shrink-0">
          <Sparkles className={`w-2.5 h-2.5 ${c.tier.includes("Premium") ? "text-accent" : "text-primary"}`} />
          <span className="text-[8px] text-muted-foreground whitespace-nowrap">{c.label}</span>
          <span className={`text-[7px] font-bold ${c.tier.includes("Premium") ? "text-accent" : "text-primary"}`}>
            {c.tier.toUpperCase()}
          </span>
        </div>
      ))}
    </div>
  );
}
