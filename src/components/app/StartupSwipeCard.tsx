import { useState } from "react";
import { motion, useMotionValue, useTransform, type PanInfo } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Rocket, Users, Briefcase, Star, Building2, Sparkles, Zap, MapPin, Crown, Globe,
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
    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${colors[stage] || "bg-muted text-muted-foreground border-border"}`}>
      {stage}
    </span>
  );
}

function MatchScoreRing({ score }: { score: number }) {
  const color = score >= 90 ? "text-green-400" : score >= 80 ? "text-primary" : "text-accent";
  const stroke = score >= 90 ? "stroke-green-400" : score >= 80 ? "stroke-[hsl(var(--primary))]" : "stroke-[hsl(var(--accent))]";
  const label = score >= 90 ? "Perfect Match" : score >= 80 ? "Strong Match" : "Good Match";

  return (
    <div className="flex items-center gap-2.5">
      <div className="relative w-12 h-12 flex-shrink-0">
        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
          <path d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" fill="none" stroke="hsl(var(--border))" strokeWidth="2.5" />
          <motion.path
            d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831"
            fill="none" className={stroke} strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ strokeDasharray: "0, 100" }}
            animate={{ strokeDasharray: `${score}, 100` }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          />
        </svg>
        <span className={`absolute inset-0 flex items-center justify-center text-[10px] font-bold ${color}`}>{score}%</span>
      </div>
      <div>
        <div className="flex items-center gap-1">
          <Star className={`w-3 h-3 ${color}`} fill="currentColor" />
          <span className={`text-[10px] font-bold ${color}`}>{label}</span>
        </div>
      </div>
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
          <motion.div className="absolute top-10 right-5 z-20 px-6 py-3 rounded-xl border-2 border-green-400 bg-green-400/20 font-display font-bold text-green-400 text-2xl -rotate-12 shadow-lg" style={{ opacity: likeOpacity }}>
            CONNECT
          </motion.div>
          <motion.div className="absolute top-10 left-5 z-20 px-6 py-3 rounded-xl border-2 border-destructive bg-destructive/20 font-display font-bold text-destructive text-2xl rotate-12 shadow-lg" style={{ opacity: nopeOpacity }}>
            SKIP
          </motion.div>
        </>
      )}

      <div className="h-full rounded-2xl bg-card border border-border overflow-hidden flex flex-col shadow-2xl">
        {/* Hero section with logo and gradient */}
        <div className="relative h-48 flex-shrink-0 bg-gradient-to-br from-primary/25 via-accent/15 to-primary/5 flex items-center justify-center">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl">
            <span className="text-3xl font-display font-bold text-primary-foreground">{initials}</span>
          </div>
          <div className="absolute top-4 right-4">
            <StageBadge stage={startup.stage} />
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="font-display font-bold text-2xl text-foreground">{startup.name}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
              <Building2 className="w-3.5 h-3.5" /> Founded by {startup.founder}
            </p>
          </div>
        </div>

        {/* Match score bar */}
        <div className="px-4 py-3 bg-muted/30 flex items-center justify-between border-b border-border/50">
          <MatchScoreRing score={startup.matchScore} />
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground">{startup.industry}</p>
            <div className="flex items-center gap-2 justify-end text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {startup.teamSize} members</span>
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {/* Description */}
            <p className="text-sm text-foreground/90 leading-relaxed">{startup.description}</p>

            {/* AI explanation */}
            {showAiExplanation && (
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5">
                <div className="flex items-center gap-1.5 mb-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">Why this match</p>
                </div>
                <div className="space-y-1.5">
                  {aiReasons.map((reason) => (
                    <p key={reason} className="text-xs text-foreground/90 leading-relaxed">
                      • {reason}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Open Roles */}
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <Briefcase className="w-4 h-4 text-primary" />
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Open Roles</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {startup.openRoles.map((role) => (
                  <span key={role} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Looking For */}
            <div className="rounded-xl bg-accent/5 border border-accent/20 p-3.5 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-accent flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-accent uppercase tracking-wider">Looking for</p>
                <p className="text-sm text-foreground mt-0.5">
                  {startup.lookingFor === "co-founder" ? "Co-Founder to join the journey" :
                   startup.lookingFor === "team" ? "Team members to build together" :
                   "Co-Founder & Team members"}
                </p>
              </div>
            </div>

            {/* Team info */}
            <div className="rounded-xl bg-muted/30 p-3.5">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-primary" />
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Team & Stage</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Team Size</p>
                  <p className="text-sm font-semibold text-foreground">{startup.teamSize} {startup.teamSize === 1 ? 'founder' : 'members'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Stage</p>
                  <p className="text-sm font-semibold text-foreground">{startup.stage}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Industry</p>
                  <p className="text-sm font-semibold text-foreground">{startup.industry}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Hiring</p>
                  <p className="text-sm font-semibold text-foreground">{startup.openRoles.length} roles</p>
                </div>
              </div>
            </div>

            {/* Startup stage indicator */}
            <div className="rounded-xl bg-primary/5 border border-primary/20 p-3.5">
              <div className="flex items-center gap-2 mb-2">
                <Rocket className="w-4 h-4 text-primary" />
                <p className="text-xs font-semibold text-primary uppercase tracking-wider">Startup Journey</p>
              </div>
              <div className="flex items-center gap-1.5">
                {["Idea", "MVP", "Pre-Seed", "Seed"].map((s) => (
                  <div key={s} className="flex-1 flex flex-col items-center gap-1">
                    <div className={`w-full h-1.5 rounded-full ${
                      s === startup.stage ? "bg-primary" :
                      ["Idea", "MVP", "Pre-Seed", "Seed"].indexOf(s) < ["Idea", "MVP", "Pre-Seed", "Seed"].indexOf(startup.stage)
                        ? "bg-primary/40" : "bg-border"
                    }`} />
                    <span className={`text-[9px] font-medium ${s === startup.stage ? "text-primary" : "text-muted-foreground"}`}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </motion.div>
  );
}
