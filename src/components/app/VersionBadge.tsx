import { Crown, Sparkles } from "lucide-react";

interface VersionBadgeProps {
  tier: "free" | "premium";
  version: 1 | 2;
  className?: string;
}

export function VersionBadge({ tier, version, className = "" }: VersionBadgeProps) {
  const isPremium = tier === "premium";
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
        isPremium
          ? "bg-gradient-to-r from-accent/20 to-primary/20 text-accent border-accent/30"
          : "bg-primary/10 text-primary border-primary/30"
      }`}>
        {isPremium && <Crown className="w-2.5 h-2.5 inline mr-0.5 -mt-0.5" />}
        V{version} {tier === "premium" ? "PREMIUM" : "FREE"}
      </span>
    </div>
  );
}

interface MatchingModeSelectorProps {
  mode: string;
  onModeChange: (mode: string) => void;
}

const MODES = [
  { id: "founder-cofounder", label: "Founder → Co-Founder", emoji: "🤝" },
  { id: "founder-team", label: "Founder → Team", emoji: "👥" },
  { id: "team-startup", label: "Team → Startup", emoji: "🚀" },
  { id: "cofounder-startup", label: "Co-Founder → Startup", emoji: "🔍" },
];

export function MatchingModeSelector({ mode, onModeChange }: MatchingModeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-1 justify-center pb-1 px-1">
      {MODES.map((m) => (
        <button
          key={m.id}
          onClick={() => onModeChange(m.id)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium whitespace-nowrap border transition-all ${
            mode === m.id
              ? "bg-primary/15 text-primary border-primary/40 shadow-sm"
              : "bg-card border-border/50 text-muted-foreground hover:border-primary/30"
          }`}
        >
          <span>{m.emoji}</span>
          <span>{m.label}</span>
        </button>
      ))}
    </div>
  );
}

interface SwipeLimitBarProps {
  current: number;
  max: number;
  isPremium?: boolean;
}

export function SwipeLimitBar({ current, max, isPremium }: SwipeLimitBarProps) {
  if (isPremium) {
    return (
      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20">
        <Crown className="w-3 h-3 text-accent" />
        <span className="text-[9px] font-bold text-accent">Unlimited Swipes</span>
      </div>
    );
  }
  const pct = Math.min((current / max) * 100, 100);
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-muted/50 border border-border/50">
        <span className="text-[9px] font-medium text-muted-foreground">
          {max - current}/{max} swipes left
        </span>
      </div>
      <div className="w-12 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${100 - pct}%` }}
        />
      </div>
    </div>
  );
}
