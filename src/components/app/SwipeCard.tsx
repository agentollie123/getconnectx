import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, type PanInfo } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MapPin, Lightbulb, Rocket, Clock, Globe,
  Building2, GraduationCap, Star, Zap, Crown, Briefcase,
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

function AnimatedScore({ score }: { score: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = Math.max(score - 25, 50);
    const duration = 600;
    const stepTime = duration / (score - start);
    let current = start;
    const timer = setInterval(() => {
      current++;
      setDisplay(current);
      if (current >= score) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [score]);
  return <>{display}%</>;
}

function MatchScoreRing({ score, isPremium }: { score: number; isPremium?: boolean }) {
  const isTop = isPremium && score >= 90;
  const color = isTop ? "text-accent" : score >= 90 ? "text-green-400" : score >= 75 ? "text-primary" : "text-accent";
  const stroke = isTop ? "stroke-[hsl(var(--accent))]" : score >= 90 ? "stroke-green-400" : score >= 75 ? "stroke-[hsl(var(--primary))]" : "stroke-[hsl(var(--accent))]";
  const label = isTop ? "Top Match" : score >= 90 ? "Perfect Match" : score >= 75 ? "Strong Match" : "Potential Match";

  return (
    <div className="flex items-center gap-2">
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
        <span className={`absolute inset-0 flex items-center justify-center text-[10px] font-bold ${color}`}>
          <AnimatedScore score={score} />
        </span>
      </div>
      <div>
        <div className="flex items-center gap-1">
          <Star className={`w-3 h-3 ${color}`} fill="currentColor" />
          <span className={`text-[10px] font-bold ${color}`}>{label}</span>
          {isTop && <Crown className="w-3 h-3 text-accent" />}
        </div>
      </div>
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
  const rotate = useTransform(x, [-200, 200], [-12, 12]);
  const likeOpacity = useTransform(x, [0, 80], [0, 1]);
  const nopeOpacity = useTransform(x, [-80, 0], [1, 0]);
  const [exitDir, setExitDir] = useState<"left" | "right" | null>(null);
  const resolvedExit = triggerExit || exitDir;
  const matchScore = getMatchScore(profile, isPremium);
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
      initial={{ scale: isTop ? 0.97 : 0.93, y: isTop ? 8 : 14, opacity: isTop ? 0 : 0.5 }}
      animate={{
        scale: isTop ? 1 : 0.95,
        y: isTop ? 0 : 10,
        opacity: isTop ? 1 : 0.6,
        x: 0,
        transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
      }}
      exit={{
        x: resolvedExit === "left" ? -400 : 400,
        opacity: 0,
        rotate: resolvedExit === "left" ? -18 : 18,
        transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
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
        {/* Hero photo section - much taller */}
        <div className="relative h-56 flex-shrink-0">
          <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="font-display font-bold text-2xl text-foreground drop-shadow-lg">
              {profile.name}{profile.age ? `, ${profile.age}` : ""}
            </h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5" />
              {profile.location}
              {profile.distance && <span className="text-primary font-medium">· {profile.distance}</span>}
            </p>
          </div>
        </div>

        {/* Match score + role bar */}
        <div className="px-4 py-3 bg-muted/30 flex items-center justify-between border-b border-border/50">
          <MatchScoreRing score={matchScore} isPremium={isPremium} />
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground">{profile.role}</p>
            <div className="flex items-center gap-1.5 justify-end text-xs text-muted-foreground">
              <Rocket className="w-3.5 h-3.5 text-primary" />
              <span>{profile.stage}</span>
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {/* Bio */}
            <p className="text-sm text-foreground/90 leading-relaxed">
              {profile.bio || "Open to exciting startup opportunities."}
            </p>

            {/* AI explanation */}
            {showAiExplanation && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="rounded-xl border border-primary/20 bg-primary/5 p-3.5 overflow-hidden"
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">Why this match</p>
                </div>
                <div className="space-y-1.5">
                  {aiReasons.map((reason, i) => (
                    <motion.p
                      key={reason}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + i * 0.1, duration: 0.25 }}
                      className="text-xs text-foreground/90 leading-relaxed"
                    >
                      • {reason}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Startup Idea */}
            {profile.startupIdea && (
              <div className="rounded-xl bg-primary/5 border border-primary/20 p-3.5">
                <div className="flex items-center gap-2 mb-1.5">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">Startup Idea</p>
                </div>
                <p className="text-sm text-foreground">{profile.startupIdea}</p>
              </div>
            )}

            {/* Industries & Interests */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Industries & Interests</p>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, i) => (
                  <motion.span
                    key={interest}
                    initial={{ y: 6, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.2 }}
                    className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 font-medium"
                  >
                    {interest}
                  </motion.span>
                ))}
                <motion.span
                  initial={{ y: 6, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + profile.interests.length * 0.05, duration: 0.2 }}
                  className="text-xs px-3 py-1 rounded-full bg-muted border border-border text-muted-foreground"
                >
                  <Clock className="w-3 h-3 inline mr-1" />{profile.commitment}
                </motion.span>
              </div>
            </div>

            {/* Skills */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Skills</p>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.04, duration: 0.2 }}
                    className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Work Experience */}
            {profile.workExperience && profile.workExperience.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Experience</p>
                </div>
                <div className="space-y-2">
                  {profile.workExperience.slice(0, 2).map((w, idx) => (
                    <div key={idx} className="rounded-xl bg-muted/30 p-3 border-l-2 border-primary/40">
                      <p className="text-sm font-semibold text-foreground">{w.title}</p>
                      <p className="text-xs text-primary mt-0.5">{w.company} · {w.duration}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {profile.education && profile.education.length > 0 && (
              <div className="flex items-center gap-3 rounded-xl bg-muted/30 p-3">
                <GraduationCap className="w-5 h-5 text-accent flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{profile.education[0].degree}</p>
                  <p className="text-xs text-accent">{profile.education[0].school}</p>
                </div>
              </div>
            )}

            {/* Languages */}
            {profile.languages && (
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Globe className="w-4 h-4 text-primary" />
                <span>{profile.languages.join(" · ")}</span>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </motion.div>
  );
}
