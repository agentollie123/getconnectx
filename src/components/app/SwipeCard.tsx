import { useState } from "react";
import { motion, useMotionValue, useTransform, type PanInfo } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  User, MapPin, Lightbulb, Rocket, Clock, Search, Link2, Globe,
  Building2, GraduationCap, Award, BookOpen, Star,
} from "lucide-react";
import type { Profile } from "@/lib/profileData";

function getMatchScore(profile: Profile): number {
  const base = 70;
  const skillBonus = profile.skills.length * 3;
  const expBonus = profile.workExperience ? profile.workExperience.length * 4 : 0;
  return Math.min(99, base + skillBonus + expBonus + (profile.id * 7) % 15);
}

function MatchBadge({ score }: { score: number }) {
  const label = score >= 90 ? "Perfect Match" : score >= 75 ? "Strong Match" : "Potential Match";
  const color = score >= 90 ? "text-green-400" : score >= 75 ? "text-primary" : "text-accent";
  return (
    <div className="flex items-center gap-1.5">
      <Star className={`w-3.5 h-3.5 ${color}`} />
      <span className={`text-xs font-semibold ${color}`}>{label}</span>
    </div>
  );
}

interface SwipeCardProps {
  profile: Profile;
  onSwipe: (dir: "left" | "right") => void;
  isTop: boolean;
  triggerExit?: "left" | "right" | null;
}

export function SwipeCard({ profile, onSwipe, isTop, triggerExit }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-12, 12]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);
  const [exitDir, setExitDir] = useState<"left" | "right" | null>(null);
  const resolvedExit = triggerExit || exitDir;
  const matchScore = getMatchScore(profile);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      setExitDir("right");
      onSwipe("right");
    } else if (info.offset.x < -100) {
      setExitDir("left");
      onSwipe("left");
    }
  };

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ x, rotate, zIndex: isTop ? 10 : 1 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: -300, right: 300 }}
      dragSnapToOrigin
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      initial={{ scale: isTop ? 1 : 0.96, y: isTop ? 0 : 8, opacity: isTop ? 1 : 0.7 }}
      animate={{ scale: isTop ? 1 : 0.96, y: isTop ? 0 : 8, opacity: isTop ? 1 : 0.7, x: 0 }}
      exit={{
        x: resolvedExit === "left" ? -400 : 400,
        opacity: 0,
        rotate: resolvedExit === "left" ? -15 : 15,
        transition: { duration: 0.35 },
      }}
    >
      {isTop && (
        <>
          <motion.div className="absolute top-6 right-6 z-20 px-4 py-2 rounded-lg border-2 border-green-400 bg-green-400/20 font-display font-bold text-green-400 text-lg -rotate-12" style={{ opacity: likeOpacity }}>
            CONNECT
          </motion.div>
          <motion.div className="absolute top-6 left-6 z-20 px-4 py-2 rounded-lg border-2 border-destructive bg-destructive/20 font-display font-bold text-destructive text-lg rotate-12" style={{ opacity: nopeOpacity }}>
            SKIP
          </motion.div>
        </>
      )}

      <div className="h-full rounded-2xl bg-card border border-border overflow-hidden flex flex-col shadow-xl">
        {/* Header */}
        <div className="p-4 flex items-center gap-3 border-b border-border">
          <img src={profile.photo} alt={profile.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/30" />
          <div className="min-w-0 flex-1">
            <h3 className="font-display font-bold text-lg text-foreground">{profile.name}</h3>
            <p className="text-xs text-muted-foreground">{profile.role} · {profile.location}</p>
          </div>
        </div>

        {/* Match Score */}
        <div className="px-4 py-2.5 bg-muted/30 flex items-center justify-between border-b border-border/50">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                <path d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
                <path d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831"
                  fill="none" stroke="hsl(var(--primary))" strokeWidth="3"
                  strokeDasharray={`${matchScore}, 100`} strokeLinecap="round" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-primary">{matchScore}%</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">Match Score</p>
              <p className="text-[10px] text-muted-foreground">{matchScore}% Compatibility</p>
            </div>
          </div>
          <MatchBadge score={matchScore} />
        </div>

        {/* Scrollable content */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-3">
            <div className="rounded-xl bg-muted/50 p-3">
              <p className="text-[10px] font-semibold text-primary mb-1 uppercase tracking-wider">About</p>
              <p className="text-xs text-foreground leading-relaxed">{profile.bio || "Open to exciting startup opportunities."}</p>
            </div>

            <div className="rounded-xl bg-muted/50 p-3 space-y-2">
              {profile.startupIdea && (
                <div className="flex items-center gap-2.5 text-xs">
                  <Lightbulb className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{profile.startupIdea}</span>
                </div>
              )}
              <div className="flex items-center gap-2.5 text-xs">
                <Rocket className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span className="text-foreground">{profile.stage}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs">
                <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span className="text-foreground">{profile.commitment}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs">
                <Search className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span className="text-foreground">Looking for: {profile.lookingFor === "Both" ? "Co-founder & Team" : profile.lookingFor}</span>
              </div>
              {profile.languages && (
                <div className="flex items-center gap-2.5 text-xs">
                  <Globe className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{profile.languages.join(", ")}</span>
                </div>
              )}
            </div>

            <div>
              <p className="text-[10px] font-semibold text-foreground mb-1.5 uppercase tracking-wider">Skills</p>
              <div className="flex flex-wrap gap-1">
                {profile.skills.map((s) => (
                  <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">{s}</span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-semibold text-foreground mb-1.5 uppercase tracking-wider">Interests</p>
              <div className="flex flex-wrap gap-1">
                {profile.interests.map((i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">{i}</span>
                ))}
              </div>
            </div>

            {profile.workExperience && profile.workExperience.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Building2 className="w-3.5 h-3.5 text-primary" />
                  <p className="text-[10px] font-semibold text-foreground uppercase tracking-wider">Experience</p>
                </div>
                <div className="space-y-2">
                  {profile.workExperience.slice(0, 2).map((w, idx) => (
                    <div key={idx} className="rounded-lg bg-muted/30 p-2.5 border-l-2 border-primary/40">
                      <p className="text-xs font-semibold text-foreground">{w.title}</p>
                      <p className="text-[10px] text-primary font-medium">{w.company} · {w.duration}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {profile.education && profile.education.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <GraduationCap className="w-3.5 h-3.5 text-primary" />
                  <p className="text-[10px] font-semibold text-foreground uppercase tracking-wider">Education</p>
                </div>
                {profile.education.slice(0, 1).map((e, idx) => (
                  <div key={idx} className="rounded-lg bg-muted/30 p-2.5 border-l-2 border-accent/40">
                    <p className="text-xs font-semibold text-foreground">{e.degree}</p>
                    <p className="text-[10px] text-accent font-medium">{e.school}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </motion.div>
  );
}
