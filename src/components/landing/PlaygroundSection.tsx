import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { profiles, type Profile } from "@/lib/profileData";
import { Sparkles, X, Check, MapPin, Briefcase, Rocket, Clock, ChevronDown } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

function SwipeCard({
  profile,
  onSwipe,
  isTop,
  lastDir,
}: {
  profile: Profile;
  onSwipe: (dir: "left" | "right") => void;
  isTop: boolean;
  lastDir: React.MutableRefObject<"left" | "right">;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);
  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      lastDir.current = "right";
      onSwipe("right");
    } else if (info.offset.x < -100) {
      lastDir.current = "left";
      onSwipe("left");
    }
  };

  return (
    <motion.div
      className="absolute inset-0"
      style={{ x, rotate, opacity, zIndex: isTop ? 10 : 1 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      initial={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 10 }}
      animate={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 10 }}
      exit={{
        x: lastDir.current === "right" ? 400 : -400,
        opacity: 0,
        transition: { duration: 0.3 },
      }}
    >
      <div className="h-full rounded-2xl bg-card border border-border overflow-hidden flex flex-col shadow-lg">
        {/* Profile photo */}
        <div className="relative h-48 flex-shrink-0">
          <img
            src={profile.photo}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-card to-transparent h-16" />
        </div>

        {/* Profile info */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="font-display font-bold text-lg text-foreground leading-tight">{profile.name}</h3>
              <p className="text-sm text-muted-foreground">{profile.role}</p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Briefcase className="w-3.5 h-3.5 text-primary" />
              <span>{profile.lookingFor === "Both" ? "Co-founder & Team" : `Looking for ${profile.lookingFor}`}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Rocket className="w-3.5 h-3.5 text-primary" />
              <span>{profile.stage}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>{profile.commitment}</span>
            </div>
          </div>

          {/* Skills */}
          <div>
            <p className="text-xs font-semibold text-foreground mb-1.5">Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div>
            <p className="text-xs font-semibold text-foreground mb-1.5">Interested in</p>
            <div className="flex flex-wrap gap-1.5">
              {profile.interests.map((interest) => (
                <span
                  key={interest}
                  className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function PlaygroundSection() {
  const [location, setLocation] = useState<string>("");
  const [stage, setStage] = useState<string>("");
  const [commitment, setCommitment] = useState<string>("");
  const [cardStack, setCardStack] = useState<Profile[]>([]);
  const [started, setStarted] = useState(false);
  const lastSwipeDir = useRef<"left" | "right">("right");
  const [stats, setStats] = useState({ connected: 0, skipped: 0 });

  const generateMatches = useCallback(() => {
    const filtered = profiles.filter((p) => {
      if (location && location !== "all" && p.location !== location) return false;
      if (stage && stage !== "all" && p.stage !== stage) return false;
      if (commitment && commitment !== "all" && p.commitment !== commitment) return false;
      return true;
    });
    setCardStack(filtered.length > 0 ? [...filtered] : [...profiles]);
    setStarted(true);
    setStats({ connected: 0, skipped: 0 });
  }, [location, stage, commitment]);

  const handleSwipe = (dir: "left" | "right") => {
    lastSwipeDir.current = dir;
    setCardStack((prev) => prev.slice(1));
    setStats((prev) => ({
      connected: dir === "right" ? prev.connected + 1 : prev.connected,
      skipped: dir === "left" ? prev.skipped + 1 : prev.skipped,
    }));
  };

  return (
    <section id="playground" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Demo
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            ConnectX <span className="gradient-text-accent">Playground</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Simulate the matching experience. Set your preferences and swipe to connect.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-start justify-center gap-10 max-w-5xl mx-auto">
          {/* Left: Filters panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-80 flex-shrink-0"
          >
            <div className="glass-card rounded-2xl p-6">
              <p className="text-xs text-primary font-medium mb-2">Welcome to our app's Playground</p>
              <h3 className="font-display text-xl font-bold text-foreground mb-6">
                What are you looking for in a co-founder?
              </h3>

              <p className="text-sm text-muted-foreground mb-4">Basic preferences</p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Location</label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="bg-card border-border">
                      <SelectValue placeholder="Any location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any</SelectItem>
                      <SelectItem value="Jakarta">Jakarta</SelectItem>
                      <SelectItem value="Singapore">Singapore</SelectItem>
                      <SelectItem value="Bangalore">Bangalore</SelectItem>
                      <SelectItem value="Ho Chi Minh City">Ho Chi Minh City</SelectItem>
                      <SelectItem value="Manila">Manila</SelectItem>
                      <SelectItem value="Dubai">Dubai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Startup Stage</label>
                  <Select value={stage} onValueChange={setStage}>
                    <SelectTrigger className="bg-card border-border">
                      <SelectValue placeholder="Any stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any</SelectItem>
                      <SelectItem value="Idea Stage">Idea Stage</SelectItem>
                      <SelectItem value="MVP">MVP</SelectItem>
                      <SelectItem value="Pre-revenue">Pre-revenue</SelectItem>
                      <SelectItem value="Seed">Seed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Commitment</label>
                  <Select value={commitment} onValueChange={setCommitment}>
                    <SelectTrigger className="bg-card border-border">
                      <SelectValue placeholder="Any level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any</SelectItem>
                      <SelectItem value="Exploring">Exploring</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
                onClick={generateMatches}
              >
                Generate Candidates
              </Button>
            </div>
          </motion.div>

          {/* Right: Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            {/* Phone frame */}
            <div className="relative w-[320px] h-[620px] rounded-[40px] border-[6px] border-foreground/20 bg-background shadow-2xl overflow-hidden">
              {/* Status bar */}
              <div className="h-8 bg-card flex items-center justify-between px-6 text-xs text-muted-foreground">
                <span>9:41</span>
                <div className="flex gap-1">
                  <div className="w-4 h-2 rounded-sm bg-muted-foreground/40" />
                  <div className="w-4 h-2 rounded-sm bg-muted-foreground/40" />
                  <div className="w-4 h-2 rounded-sm bg-muted-foreground/40" />
                </div>
              </div>

              {/* App header */}
              <div className="h-12 bg-card border-b border-border flex items-center justify-center">
                <div className="flex items-center gap-1.5">
                  <img src={logoIcon} alt="ConnectX" className="w-6 h-6 rounded-md" />
                  <span className="font-display font-bold text-foreground text-sm">ConnectX</span>
                </div>
              </div>

              {/* Card area */}
              <div className="relative flex-1 h-[460px] p-3">
                {!started ? (
                  <div className="h-full flex flex-col items-center justify-center text-center px-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                    <p className="font-display font-semibold text-foreground mb-2">Ready to discover?</p>
                    <p className="text-xs text-muted-foreground mb-4">
                      Set your preferences and tap "Generate Candidates" to start swiping.
                    </p>
                    <ChevronDown className="w-5 h-5 text-muted-foreground animate-bounce" />
                  </div>
                ) : cardStack.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center px-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <Check className="w-8 h-8 text-primary" />
                    </div>
                    <p className="font-display font-semibold text-foreground mb-2">All done!</p>
                    <p className="text-xs text-muted-foreground mb-1">
                      Connected: <span className="text-primary font-bold">{stats.connected}</span> · Skipped: <span className="text-muted-foreground font-bold">{stats.skipped}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">Adjust filters and generate again.</p>
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={generateMatches}
                    >
                      Try Again
                    </Button>
                  </div>
                ) : (
                  <div className="relative h-full">
                    <AnimatePresence>
                      {cardStack.slice(0, 2).map((profile, i) => (
                        <SwipeCard
                          key={profile.id}
                          profile={profile}
                          onSwipe={handleSwipe}
                          isTop={i === 0}
                          lastDir={lastSwipeDir}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              {started && cardStack.length > 0 && (
                <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-6 z-20">
                  <button
                    onClick={() => handleSwipe("left")}
                    className="w-14 h-14 rounded-full border-2 border-destructive/30 bg-card flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95"
                  >
                    <X className="w-6 h-6 text-destructive" />
                  </button>
                  <button
                    onClick={() => handleSwipe("right")}
                    className="w-14 h-14 rounded-full border-2 border-primary/30 bg-card flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95"
                  >
                    <Check className="w-6 h-6 text-primary" />
                  </button>
                </div>
              )}
            </div>

            {/* Disclaimer */}
            <p className="text-[10px] text-muted-foreground text-center mt-4 max-w-[320px]">
              This playground simulates the ConnectX mobile app experience. All profiles displayed are fictional but representative of users on the platform.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
