import { useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import {
  Home, Compass, Heart, MessageCircle, User,
  X, Check, MapPin, Briefcase, Rocket, Clock, Search,
  Link2, Lightbulb, GraduationCap, Award, Globe, Building2, BookOpen,
} from "lucide-react";
import { profiles, type Profile } from "@/lib/profileData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import logoIcon from "@/assets/logo-icon.png";

const navItems = [
  { icon: Home, label: "Home" },
  { icon: Compass, label: "Discover" },
  { icon: Heart, label: "Matches" },
  { icon: MessageCircle, label: "Messages" },
  { icon: User, label: "Profile" },
];

/* ─── Swipe Card ─── */
function SwipeCard({
  profile,
  onSwipe,
  isTop,
}: {
  profile: Profile;
  onSwipe: (dir: "left" | "right") => void;
  isTop: boolean;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-12, 12]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);
  const [exitDir, setExitDir] = useState<"left" | "right" | null>(null);

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
        x: exitDir === "left" ? -400 : 400,
        opacity: 0,
        rotate: exitDir === "left" ? -15 : 15,
        transition: { duration: 0.35 },
      }}
    >
      {/* Swipe overlays */}
      {isTop && (
        <>
          <motion.div
            className="absolute top-6 right-6 z-20 px-4 py-2 rounded-lg border-2 border-primary bg-primary/20 font-display font-bold text-primary text-lg -rotate-12"
            style={{ opacity: likeOpacity }}
          >
            CONNECT
          </motion.div>
          <motion.div
            className="absolute top-6 left-6 z-20 px-4 py-2 rounded-lg border-2 border-destructive bg-destructive/20 font-display font-bold text-destructive text-lg rotate-12"
            style={{ opacity: nopeOpacity }}
          >
            SKIP
          </motion.div>
        </>
      )}

      <div className="h-full rounded-2xl bg-card border border-border overflow-hidden flex flex-col shadow-xl">
        {/* Photo + name header */}
        <div className="p-5 flex items-center gap-4 border-b border-border">
          <img
            src={profile.photo}
            alt={profile.name}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/30"
          />
          <div className="min-w-0">
            <h3 className="font-display font-bold text-xl text-foreground">{profile.name}</h3>
            <p className="text-sm text-muted-foreground">{profile.role}</p>
            {profile.distance && (
              <p className="text-xs text-primary mt-0.5">{profile.distance} away</p>
            )}
          </div>
        </div>

        {/* Scrollable content */}
        <ScrollArea className="flex-1">
          <div className="p-5 space-y-4">
            {/* Bio */}
            <div className="rounded-xl bg-muted/50 p-4">
              <p className="text-xs font-semibold text-primary mb-1">About</p>
              <p className="text-sm text-foreground leading-relaxed">
                {profile.bio || "Open to exciting startup opportunities."}
              </p>
            </div>

            {/* Quick info */}
            <div className="rounded-xl bg-muted/50 p-4 space-y-2.5">
              {profile.age && (
                <div className="flex items-center gap-3 text-sm">
                  <User className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-foreground">{profile.age} years old</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-foreground">{profile.location}</span>
              </div>
              {profile.startupIdea && (
                <div className="flex items-center gap-3 text-sm">
                  <Lightbulb className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-foreground">{profile.startupIdea}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-sm">
                <Rocket className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-foreground">{profile.stage}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-foreground">{profile.commitment}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Search className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-foreground">Looking for: {profile.lookingFor === "Both" ? "Co-founder & Team" : profile.lookingFor}</span>
              </div>
              {profile.portfolio && (
                <div className="flex items-center gap-3 text-sm">
                  <Link2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-foreground">{profile.portfolio}</span>
                </div>
              )}
              {profile.languages && (
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-foreground">{profile.languages.join(", ")}</span>
                </div>
              )}
            </div>

            {/* Skills */}
            <div>
              <p className="text-xs font-semibold text-foreground mb-2">Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {profile.skills.map((s) => (
                  <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">{s}</span>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <p className="text-xs font-semibold text-foreground mb-2">Interested in</p>
              <div className="flex flex-wrap gap-1.5">
                {profile.interests.map((i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">{i}</span>
                ))}
              </div>
            </div>

            {/* Work Experience */}
            {profile.workExperience && profile.workExperience.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-4 h-4 text-primary" />
                  <p className="text-xs font-semibold text-foreground">Work Experience</p>
                </div>
                <div className="space-y-3">
                  {profile.workExperience.map((w, idx) => (
                    <div key={idx} className="rounded-lg bg-muted/30 p-3 border-l-2 border-primary/40">
                      <p className="text-sm font-semibold text-foreground">{w.title}</p>
                      <p className="text-xs text-primary font-medium">{w.company}</p>
                      <p className="text-[10px] text-muted-foreground mb-1">{w.duration}</p>
                      {w.description && (
                        <p className="text-xs text-muted-foreground leading-relaxed">{w.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {profile.education && profile.education.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  <p className="text-xs font-semibold text-foreground">Education</p>
                </div>
                <div className="space-y-2">
                  {profile.education.map((e, idx) => (
                    <div key={idx} className="rounded-lg bg-muted/30 p-3 border-l-2 border-accent/40">
                      <p className="text-sm font-semibold text-foreground">{e.degree}</p>
                      <p className="text-xs text-accent font-medium">{e.school}</p>
                      <p className="text-[10px] text-muted-foreground">{e.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {profile.certifications && profile.certifications.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-primary" />
                  <p className="text-xs font-semibold text-foreground">Certifications</p>
                </div>
                <div className="space-y-2">
                  {profile.certifications.map((c, idx) => (
                    <div key={idx} className="flex items-start gap-2 rounded-lg bg-muted/30 p-3">
                      <BookOpen className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.issuer} · {c.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </motion.div>
  );
}

/* ─── Filters Sidebar ─── */
function FiltersSidebar({
  location, setLocation,
  stage, setStage,
  commitment, setCommitment,
  lookingFor, setLookingFor,
  onGenerate,
}: {
  location: string; setLocation: (v: string) => void;
  stage: string; setStage: (v: string) => void;
  commitment: string; setCommitment: (v: string) => void;
  lookingFor: string; setLookingFor: (v: string) => void;
  onGenerate: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-primary font-medium mb-1">Welcome to ConnectX</p>
        <h2 className="font-display text-xl font-bold text-foreground">What are you looking for?</h2>
      </div>

      <p className="text-sm text-muted-foreground">Basic preferences</p>

      <div className="space-y-4">
        <FilterField label="Location" value={location} onChange={setLocation}
          options={[
            { value: "all", label: "Any" }, { value: "Jakarta, Indonesia", label: "Jakarta" },
            { value: "Singapore", label: "Singapore" }, { value: "Bangalore, India", label: "Bangalore" },
            { value: "Ho Chi Minh City, Vietnam", label: "Ho Chi Minh City" },
            { value: "Manila, Philippines", label: "Manila" }, { value: "Dubai, UAE", label: "Dubai" },
          ]}
        />
        <FilterField label="Looking For" value={lookingFor} onChange={setLookingFor}
          options={[
            { value: "all", label: "Any" }, { value: "Co-founder", label: "Co-founder" },
            { value: "Team", label: "Team Member" }, { value: "Both", label: "Both" },
          ]}
        />
        <FilterField label="Startup Stage" value={stage} onChange={setStage}
          options={[
            { value: "all", label: "Any" }, { value: "Idea Stage", label: "Idea Stage" },
            { value: "MVP", label: "MVP" }, { value: "Pre-revenue", label: "Pre-revenue" },
            { value: "Seed", label: "Seed" },
          ]}
        />
        <FilterField label="Commitment" value={commitment} onChange={setCommitment}
          options={[
            { value: "all", label: "Any" }, { value: "Exploring", label: "Exploring" },
            { value: "Part-time", label: "Part-time" }, { value: "Full-time", label: "Full-time" },
          ]}
        />
      </div>

      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-primary" onClick={onGenerate}>
        Generate Candidates
      </Button>
    </div>
  );
}

function FilterField({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="text-sm font-medium text-foreground mb-1.5 block">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-card border-border">
          <SelectValue placeholder="Any" />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

/* ─── Main Page ─── */
export default function AppDemo() {
  const [activeNav, setActiveNav] = useState("Discover");

  // Filter state
  const [location, setLocation] = useState("");
  const [stage, setStage] = useState("");
  const [commitment, setCommitment] = useState("");
  const [lookingFor, setLookingFor] = useState("");

  const [cardStack, setCardStack] = useState<Profile[]>([...profiles]);
  const [stats, setStats] = useState({ connected: 0, skipped: 0 });
  const [started, setStarted] = useState(true);

  const generateMatches = useCallback(() => {
    const filtered = profiles.filter((p) => {
      if (location && location !== "all" && p.location !== location) return false;
      if (stage && stage !== "all" && p.stage !== stage) return false;
      if (commitment && commitment !== "all" && p.commitment !== commitment) return false;
      if (lookingFor && lookingFor !== "all" && p.lookingFor !== lookingFor) return false;
      return true;
    });
    setCardStack(filtered.length > 0 ? [...filtered] : [...profiles]);
    setStarted(true);
    setStats({ connected: 0, skipped: 0 });
  }, [location, stage, commitment, lookingFor]);

  const handleSwipe = (dir: "left" | "right") => {
    setCardStack((prev) => prev.slice(1));
    setStats((prev) => ({
      connected: dir === "right" ? prev.connected + 1 : prev.connected,
      skipped: dir === "left" ? prev.skipped + 1 : prev.skipped,
    }));
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar nav */}
      <aside className="w-16 border-r border-border bg-card/50 flex flex-col flex-shrink-0 hidden md:flex">
        <div className="p-3 flex items-center justify-center border-b border-border">
          <img src={logoIcon} alt="ConnectX" className="w-8 h-8 rounded-lg" />
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              className={`w-full flex items-center justify-center p-2.5 rounded-lg text-sm transition-colors ${
                activeNav === item.label
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
              title={item.label}
            >
              <item.icon className="w-5 h-5" />
            </button>
          ))}
        </nav>

        <div className="p-2 border-t border-border flex justify-center">
          <ThemeToggle />
        </div>
      </aside>

      {/* Filter panel */}
      <aside className="hidden lg:block w-80 border-r border-border bg-card/30 p-6 overflow-y-auto">
        <FiltersSidebar
          location={location} setLocation={setLocation}
          stage={stage} setStage={setStage}
          commitment={commitment} setCommitment={setCommitment}
          lookingFor={lookingFor} setLookingFor={setLookingFor}
          onGenerate={generateMatches}
        />
      </aside>

      {/* Main content — swipe area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex-shrink-0 glass-card border-b border-border/30 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 lg:hidden">
              <img src={logoIcon} alt="ConnectX" className="w-6 h-6 rounded-md" />
              <span className="font-display font-bold text-foreground text-sm">ConnectX</span>
            </div>
            <span className="hidden lg:inline font-display text-lg font-bold text-foreground">{activeNav}</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-primary/30 text-primary text-xs">
              {stats.connected} connected · {stats.skipped} skipped
            </Badge>
            <div className="lg:hidden">
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Card area centered */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="relative w-full max-w-md h-[580px]">
            {!started || cardStack.length === 0 ? (
              <div className="h-full rounded-2xl bg-card border border-border flex flex-col items-center justify-center text-center px-8 shadow-xl">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  {cardStack.length === 0 ? <Check className="w-8 h-8 text-primary" /> : <Compass className="w-8 h-8 text-primary" />}
                </div>
                <p className="font-display font-semibold text-foreground mb-2">
                  {cardStack.length === 0 ? "You've seen everyone!" : "Ready to discover?"}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  {cardStack.length === 0
                    ? `Connected: ${stats.connected} · Skipped: ${stats.skipped}`
                    : "Use filters on the left to set preferences, then start swiping!"}
                </p>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={generateMatches}>
                  {cardStack.length === 0 ? "Start Over" : "Generate Candidates"}
                </Button>
              </div>
            ) : (
              <>
                <AnimatePresence>
                  {cardStack.slice(0, 2).map((profile, i) => (
                    <SwipeCard key={profile.id} profile={profile} onSwipe={handleSwipe} isTop={i === 0} />
                  ))}
                </AnimatePresence>

                {/* Action buttons */}
                <div className="absolute -bottom-16 inset-x-0 flex items-center justify-center gap-8 z-20">
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
              </>
            )}
          </div>
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 glass-card border-t border-border/30 flex items-center justify-around py-2 z-30">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveNav(item.label)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 text-xs ${
              activeNav === item.label ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
