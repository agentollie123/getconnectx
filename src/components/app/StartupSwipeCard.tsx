import { useState } from "react";
import { motion, useMotionValue, useTransform, type PanInfo } from "framer-motion";
import {
  Rocket, Users, Briefcase, Star, Building2, Sparkles, Zap,
} from "lucide-react";
import type { Startup } from "@/lib/startupData";

function getStartupAiReasons(startup: Startup): string[] {
  return [
    `${startup.stage} stage startup shows active build momentum`,
    `High-value opportunity in ${startup.industry}`,
    `${startup.openRoles[0] || "Core role"} need creates a clear fit path`,
    `${startup.teamSize}-person team suggests stronger execution readiness`,
  ].slice(0, 3);
}

function StageBadge({ stage }: { stage: string }) {
  const colors: Record<string, string> = {
    Idea: "bg-accent/15 text-accent border-accent/30",
    MVP: "bg-primary/15 text-primary border-primary/30",
    "Pre-Seed": "bg-green-400/15 text-green-400 border-green-400/30",
    Seed: "bg-blue-400/15 text-blue-400 border-blue-400/30",
  };
  return (
    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${colors[stage] || "bg-muted text-muted-foreground border-border"}`}>
      {stage}
    </span>
  );
}

function MatchScoreRing({ score }: { score: number }) {
  const color = score >= 90 ? "text-green-400" : score >= 80 ? "text-primary" : "text-accent";
  const stroke = score >= 90 ? "stroke-green-400" : score >= 80 ? "stroke-[hsl(var(--primary))]" : "stroke-[hsl(var(--accent))]";
  return (
    <div className="relative w-11 h-11 flex-shrink-0">
      <svg className="w-11 h-11 -rotate-90" viewBox="0 0 36 36">
        <path d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
        <path d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831"
          fill="none" className={stroke} strokeWidth="3"
          strokeDasharray={`${score}, 100`} strokeLinecap="round" />
      </svg>
      <span className={`absolute inset-0 flex items-center justify-center text-[10px] font-bold ${color}`}>{score}%</span>
    </div>
  );
}

interface StartupSwipeCardProps {
  startup: Startup;
  onSwipe: (dir: "left" | "right") => void;
  isTop: boolean;
  triggerExit?: "left" | "right" | null;
  showAiExplanation?: boolean;
}

export function StartupSwipeCard({ startup, onSwipe, isTop, triggerExit, showAiExplanation = false }: StartupSwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const likeOpacity = useTransform(x, [0, 80], [0, 1]);
  const nopeOpacity = useTransform(x, [-80, 0], [1, 0]);
  const [exitDir, setExitDir] = useState<"left" | "right" | null>(null);
  const resolvedExit = triggerExit || exitDir;
  const aiReasons = getStartupAiReasons(startup);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 80) { setExitDir("right"); onSwipe("right"); }
    else if (info.offset.x < -80) { setExitDir("left"); onSwipe("left"); }
  };

  const initials = startup.name.split(" ").map(w => w[0]).join("").slice(0, 2);

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing touch-pan-y"
      style={{ x, rotate, zIndex: isTop ? 10 : 1 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: -300, right: 300 }}
      dragSnapToOrigin
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      initial={{ scale: isTop ? 0.97 : 0.93, y: isTop ? 8 : 14, opacity: isTop ? 0 : 0.5 }}
      animate={{
        scale: isTop ? 1 : 0.95,
        y: isTop ? 0 : 10,
        opacity: isTop ? 1 : 0.6,
        x: 0,
        transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
      }}
      exit={{
        x: resolvedExit === "left" ? -400 : 400,
        opacity: 0,
        rotate: resolvedExit === "left" ? -18 : 18,
        transition: { duration: 0.28, ease: [0.4, 0, 1, 1] as [number, number, number, number] },
      }}
    >
      {isTop && (
        <>
          <motion.div className="absolute top-8 right-4 z-20 px-5 py-2.5 rounded-xl border-2 border-green-400 bg-green-400/20 font-display font-bold text-green-400 text-xl -rotate-12 shadow-lg" style={{ opacity: likeOpacity }}>
            CONNECT
          </motion.div>
          <motion.div className="absolute top-8 left-4 z-20 px-5 py-2.5 rounded-xl border-2 border-destructive bg-destructive/20 font-display font-bold text-destructive text-xl rotate-12 shadow-lg" style={{ opacity: nopeOpacity }}>
            SKIP
          </motion.div>
        </>
      )}

      <div className="h-full rounded-2xl bg-card border border-border overflow-hidden flex flex-col shadow-2xl">
        <div className="relative h-36 flex-shrink-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 flex items-center justify-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl">
            <span className="text-2xl font-display font-bold text-primary-foreground">{initials}</span>
          </div>
          <div className="absolute top-3 right-3">
            <StageBadge stage={startup.stage} />
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="font-display font-bold text-lg text-foreground">{startup.name}</h3>
            <p className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Building2 className="w-3 h-3" /> Founded by {startup.founder}
            </p>
          </div>
        </div>

        <div className="px-3 py-2.5 bg-muted/30 flex items-center gap-3 border-b border-border/50">
          <MatchScoreRing score={startup.matchScore} />
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-foreground">{startup.industry}</p>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-0.5"><Users className="w-3 h-3" /> {startup.teamSize} members</span>
              <span>·</span>
              <span className="flex items-center gap-0.5"><Rocket className="w-3 h-3 text-primary" /> {startup.stage}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-3.5 space-y-3 overflow-auto">
          <p className="text-xs text-foreground/90 leading-relaxed">{startup.description}</p>

          {showAiExplanation && (
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-3">
              <div className="flex items-center gap-1.5 mb-2">
                <Zap className="w-3.5 h-3.5 text-primary" />
                <p className="text-[10px] font-semibold text-primary uppercase tracking-wider">Why this match</p>
              </div>
              <div className="space-y-1.5">
                {aiReasons.map((reason) => (
                  <p key={reason} className="text-[11px] text-foreground/90 leading-relaxed">
                    • {reason}
                  </p>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Briefcase className="w-3.5 h-3.5 text-primary" />
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Open Roles</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {startup.openRoles.map((role) => (
                <span key={role} className="text-[10px] px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                  {role}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-accent/5 border border-accent/20 p-3 flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-accent flex-shrink-0" />
            <div>
              <p className="text-[10px] font-semibold text-accent uppercase tracking-wider">Looking for</p>
              <p className="text-xs text-foreground">
                {startup.lookingFor === "co-founder" ? "Co-Founder to join the journey" :
                 startup.lookingFor === "team" ? "Team members to build together" :
                 "Co-Founder & Team members"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
