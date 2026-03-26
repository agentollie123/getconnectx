import { useState } from "react";
import { motion, useMotionValue, useTransform, type PanInfo } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MapPin, Lightbulb, Rocket, Clock, Globe,
  Building2, GraduationCap, Star, Zap,
} from "lucide-react";
import type { Profile } from "@/lib/profileData";

function getMatchScore(profile: Profile, isPremium?: boolean): number {
  const base = isPremium ? 82 : 70;
  const skillBonus = profile.skills.length * 3;
  const expBonus = profile.workExperience ? profile.workExperience.length * 4 : 0;
  const raw = base + skillBonus + expBonus + (profile.id * 7) % 15;
  return Math.min(99, isPremium ? Math.max(raw, 85) : raw);
}

function getAiReasons(profile: Profile): string[] {
  const primaryInterest = profile.interests[0] || "startup";
  const mainSkills = profile.skills.slice(0, 2).join(" + ");
  const experienceSignal = profile.workExperience?.[0]?.company;

  return [
    `${profile.stage} stage alignment fits early startup momentum`,
    mainSkills ? `Relevant execution stack: ${mainSkills}` : `Relevant skill overlap for execution`,
    experienceSignal
      ? `Extra confidence from ${experienceSignal} execution background`
      : `${profile.commitment} commitment supports faster execution`,
    `${primaryInterest} focus increases match relevance`,
  ].slice(0, 3);
}

function MatchBadge({ score, isPremium }: { score: number; isPremium?: boolean }) {
  const isTop = isPremium && score >= 90;
  const label = isTop ? "Top Match" : score >= 90 ? "Perfect Match" : score >= 75 ? "Strong Match" : "Potential Match";
  const color = isTop ? "text-accent" : score >= 90 ? "text-green-400" : score >= 75 ? "text-primary" : "text-accent";
  return (
    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${
      isTop ? "bg-accent/15 border border-accent/30" : score >= 90 ? "bg-green-400/10" : score >= 75 ? "bg-primary/10" : "bg-accent/10"
    }`}>
      <Star className={`w-3 h-3 ${color}`} fill="currentColor" />
      <span className={`text-[10px] font-bold ${color}`}>{label}</span>
      {isTop && <Crown className="w-3 h-3 text-accent" />}
    </div>
  );
}

interface SwipeCardProps {
  profile: Profile;
  onSwipe: (dir: "left" | "right") => void;
  isTop: boolean;
  triggerExit?: "left" | "right" | null;
  showAiExplanation?: boolean;
  isPremium?: boolean;
}

export function SwipeCard({ profile, onSwipe, isTop, triggerExit, showAiExplanation = false, isPremium = false }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const likeOpacity = useTransform(x, [0, 80], [0, 1]);
  const nopeOpacity = useTransform(x, [-80, 0], [1, 0]);
  const [exitDir, setExitDir] = useState<"left" | "right" | null>(null);
  const resolvedExit = triggerExit || exitDir;
  const matchScore = getMatchScore(profile);
  const aiReasons = getAiReasons(profile);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 80) {
      setExitDir("right");
      onSwipe("right");
    } else if (info.offset.x < -80) {
      setExitDir("left");
      onSwipe("left");
    }
  };

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing touch-pan-y"
      style={{ x, rotate, zIndex: isTop ? 10 : 1 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: -300, right: 300 }}
      dragSnapToOrigin
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      initial={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 10, opacity: isTop ? 1 : 0.6 }}
      animate={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 10, opacity: isTop ? 1 : 0.6, x: 0 }}
      exit={{
        x: resolvedExit === "left" ? -400 : 400,
        opacity: 0,
        rotate: resolvedExit === "left" ? -20 : 20,
        transition: { duration: 0.3 },
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
        <div className="relative h-48 flex-shrink-0">
          <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-end justify-between">
              <div>
                <h3 className="font-display font-bold text-xl text-foreground drop-shadow-lg">
                  {profile.name}{profile.age ? `, ${profile.age}` : ""}
                </h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {profile.location}
                  {profile.distance && <span className="text-primary">· {profile.distance}</span>}
                </p>
              </div>
              <MatchBadge score={matchScore} />
            </div>
          </div>
        </div>

        <div className="px-3 py-2 bg-muted/30 flex items-center gap-2.5 border-b border-border/50">
          <div className="relative w-9 h-9 flex-shrink-0">
            <svg className="w-9 h-9 -rotate-90" viewBox="0 0 36 36">
              <path d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
              <path d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831"
                fill="none" stroke="hsl(var(--primary))" strokeWidth="3"
                strokeDasharray={`${matchScore}, 100`} strokeLinecap="round" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-primary">{matchScore}%</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-foreground">{profile.role}</p>
            <p className="text-[10px] text-muted-foreground truncate">
              {profile.lookingFor === "Both" ? "Co-founder & Team" : `Looking for ${profile.lookingFor}`}
            </p>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Rocket className="w-3 h-3 text-primary" />
            <span>{profile.stage}</span>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-3.5 space-y-3">
            <p className="text-xs text-foreground/90 leading-relaxed">
              {profile.bio || "Open to exciting startup opportunities."}
            </p>

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

            {profile.startupIdea && (
              <div className="rounded-xl bg-primary/5 border border-primary/20 p-3 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-0.5">Startup Idea</p>
                  <p className="text-xs text-foreground">{profile.startupIdea}</p>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-1.5">
              {profile.interests.map((i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 font-medium">{i}</span>
              ))}
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted border border-border text-muted-foreground">
                <Clock className="w-2.5 h-2.5 inline mr-0.5" />{profile.commitment}
              </span>
            </div>

            <div>
              <p className="text-[10px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Skills</p>
              <div className="flex flex-wrap gap-1">
                {profile.skills.map((s) => (
                  <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">{s}</span>
                ))}
              </div>
            </div>

            {profile.languages && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Globe className="w-3.5 h-3.5 text-primary" />
                <span>{profile.languages.join(" · ")}</span>
              </div>
            )}

            {profile.workExperience && profile.workExperience.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Building2 className="w-3.5 h-3.5 text-primary" />
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Experience</p>
                </div>
                {profile.workExperience.slice(0, 2).map((w, idx) => (
                  <div key={idx} className="rounded-lg bg-muted/30 p-2 mb-1.5 border-l-2 border-primary/40">
                    <p className="text-[11px] font-semibold text-foreground">{w.title}</p>
                    <p className="text-[10px] text-primary">{w.company} · {w.duration}</p>
                  </div>
                ))}
              </div>
            )}

            {profile.education && profile.education.length > 0 && (
              <div className="flex items-center gap-2.5 rounded-lg bg-muted/30 p-2">
                <GraduationCap className="w-4 h-4 text-accent flex-shrink-0" />
                <div>
                  <p className="text-[11px] font-semibold text-foreground">{profile.education[0].degree}</p>
                  <p className="text-[10px] text-accent">{profile.education[0].school}</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </motion.div>
  );
}
