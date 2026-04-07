import { motion } from "framer-motion";
import { Check, Crown, Lock, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RoadmapTier {
  version: string;
  tier: string;
  status: "live" | "coming_soon";
  features: string[];
  accent: string;
  bgAccent: string;
  borderAccent: string;
}

const TIERS: RoadmapTier[] = [
  {
    version: "V1",
    tier: "Free",
    status: "live",
    features: [
      "Profile creation",
      "Swipe discovery feed",
      "Match & chat",
      "Team builder",
      "Basic filters",
      "Compatibility reports",
    ],
    accent: "text-primary",
    bgAccent: "bg-primary/10",
    borderAccent: "border-primary/30",
  },
  {
    version: "V1",
    tier: "Premium",
    status: "live",
    features: [
      "See all Connects",
      "Unlimited swipes",
      "Advanced filters",
      "Rewind swipes",
      "Priority visibility",
      "GetConnect Spotlight",
    ],
    accent: "text-accent",
    bgAccent: "bg-accent/10",
    borderAccent: "border-accent/30",
  },
  {
    version: "V2",
    tier: "Free",
    status: "coming_soon",
    features: [
      "Founder → Investor matching",
      "Advisor & mentor network",
      "Strategic partner matching",
      "Startup discovery feed",
    ],
    accent: "text-primary",
    bgAccent: "bg-primary/5",
    borderAccent: "border-primary/20",
  },
  {
    version: "V2",
    tier: "Premium",
    status: "coming_soon",
    features: [
      "Founder reputation score",
      "Startup strength score",
      "Investor intelligence",
      "Advanced AI matching",
    ],
    accent: "text-accent",
    bgAccent: "bg-accent/5",
    borderAccent: "border-accent/20",
  },
];

export function VersionRoadmap() {
  return (
    <div className="space-y-3 p-4">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="w-4 h-4 text-primary" />
        <h3 className="font-display text-sm font-bold text-foreground">Product Roadmap</h3>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {TIERS.map((t, i) => (
          <motion.div
            key={`${t.version}-${t.tier}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-xl border p-2.5 ${t.borderAccent} ${t.bgAccent} ${
              t.status === "coming_soon" ? "opacity-75" : ""
            }`}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <span className={`text-[10px] font-bold ${t.accent}`}>
                {t.version}
              </span>
              {t.tier === "Premium" && <Crown className={`w-3 h-3 ${t.accent}`} />}
              <span className="text-[9px] font-semibold text-foreground">{t.tier}</span>
              {t.status === "live" ? (
                <span className="ml-auto text-[7px] px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400 font-bold">LIVE</span>
              ) : (
                <span className="ml-auto text-[7px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground font-bold">SOON</span>
              )}
            </div>
            <div className="space-y-1">
              {t.features.map((f) => (
                <div key={f} className="flex items-center gap-1 text-[9px] text-muted-foreground">
                  {t.status === "live" ? (
                    <Check className="w-2.5 h-2.5 text-green-400 flex-shrink-0" />
                  ) : (
                    <Lock className="w-2.5 h-2.5 text-muted-foreground/40 flex-shrink-0" />
                  )}
                  <span className={t.status === "coming_soon" ? "text-muted-foreground/60" : ""}>
                    {f}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
