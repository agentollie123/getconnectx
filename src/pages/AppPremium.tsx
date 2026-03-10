import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home, Heart, MessageCircle, Users, User,
  X, Check, Zap, ArrowLeft, Sparkles, SlidersHorizontal, Crown,
  Code, Palette, TrendingUp, Briefcase,
} from "lucide-react";
import { profiles, type Profile } from "@/lib/profileData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import logoIcon from "@/assets/logo-icon.png";

import { PremiumFilterPanel } from "@/components/app/PremiumFilterPanel";
import { SwipeCard } from "@/components/app/SwipeCard";
import { MatchModal } from "@/components/app/MatchModal";
import { CompatibilityReport } from "@/components/app/CompatibilityReport";
import { MatchesView } from "@/components/app/MatchesView";
import { ChatView } from "@/components/app/ChatView";
import { TeamBuilderView } from "@/components/app/TeamBuilderView";
import { ProfileView } from "@/components/app/ProfileView";
import { SpotlightModal } from "@/components/app/SpotlightModal";
import { AddToTeamModal } from "@/components/app/AddToTeamModal";
import { PremiumLikedYouSection } from "@/components/app/PremiumLikedYouSection";

const navItems = [
  { icon: Home, label: "Home" },
  { icon: Heart, label: "Matches" },
  { icon: MessageCircle, label: "Chat" },
  { icon: Users, label: "Team" },
  { icon: User, label: "Profile" },
];

const STATS_BAR = [
  { label: "Builders", value: "12K+" },
  { label: "Connections", value: "80K+" },
  { label: "Teams", value: "300+" },
];

const COMING_SOON = [
  "Founder ↔ Investor",
  "Founder ↔ Partner",
  "Founder ↔ Advisor",
];

const INITIAL_TEAM = [
  { role: "Founder", type: "Business", icon: Briefcase, filled: true, profile: null as Profile | null, equity: 40, commitment: "Full-time" },
  { role: "Co-Founder", type: "Engineering", icon: Code, filled: true, profile: profiles[0], equity: 25, commitment: "Full-time" },
  { role: "Early Team", type: "Product Designer", icon: Palette, filled: false, profile: null as Profile | null },
  { role: "Early Team", type: "Growth Marketer", icon: TrendingUp, filled: false, profile: null as Profile | null },
];

export default function AppPremium() {
  const [activeNav, setActiveNav] = useState("Home");
  const [cardStack, setCardStack] = useState<Profile[]>([...profiles]);
  const [stats, setStats] = useState({ connected: 0, skipped: 0 });
  const [connectedProfiles, setConnectedProfiles] = useState<Profile[]>([]);
  const [buttonSwipeDir, setButtonSwipeDir] = useState<"left" | "right" | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const [matchProfile, setMatchProfile] = useState<Profile | null>(null);
  const [reportProfile, setReportProfile] = useState<Profile | null>(null);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [addToTeamTarget, setAddToTeamTarget] = useState<Profile | null>(null);
  const [chatTarget, setChatTarget] = useState<Profile | null>(null);
  const [swipeCount, setSwipeCount] = useState(0);
  const [teamMembers, setTeamMembers] = useState(INITIAL_TEAM);

  const generateMatches = useCallback((filters: any) => {
    const filtered = profiles.filter((p) => {
      if (filters.stage?.length > 0 && !filters.stage.some((s: string) => p.stage.includes(s.replace(" Stage", "")))) return false;
      return true;
    });
    setCardStack(filtered.length > 0 ? [...filtered] : [...profiles]);
    setStats({ connected: 0, skipped: 0 });
    setShowFilters(false);
  }, []);

  const handleSwipe = (dir: "left" | "right") => {
    const current = cardStack[0];
    setCardStack((prev) => prev.slice(1));
    setStats((prev) => ({
      connected: dir === "right" ? prev.connected + 1 : prev.connected,
      skipped: dir === "left" ? prev.skipped + 1 : prev.skipped,
    }));
    setButtonSwipeDir(null);
    const newCount = swipeCount + 1;
    setSwipeCount(newCount);

    if (dir === "right" && current) {
      setConnectedProfiles((prev) => [...prev, current]);
      if (newCount % 2 === 0) {
        setTimeout(() => setMatchProfile(current), 400);
      }
    }
  };

  const handleButtonSwipe = (dir: "left" | "right") => {
    setButtonSwipeDir(dir);
    setTimeout(() => handleSwipe(dir), 50);
  };

  const resetDeck = () => {
    setCardStack([...profiles]);
    setStats({ connected: 0, skipped: 0 });
    setSwipeCount(0);
  };

  const handleAddToTeamConfirm = (role: string, equity: number, commitment: string) => {
    if (addToTeamTarget) {
      setTeamMembers((prev) => {
        const emptyIdx = prev.findIndex((m) => !m.filled);
        if (emptyIdx === -1) return prev;
        const updated = [...prev];
        updated[emptyIdx] = {
          ...updated[emptyIdx],
          filled: true,
          profile: addToTeamTarget,
          equity,
          commitment,
          type: role,
        };
        return updated;
      });
    }
    setAddToTeamTarget(null);
  };

  const renderMainContent = () => {
    if (reportProfile) {
      return <CompatibilityReport profile={reportProfile} onBack={() => setReportProfile(null)} />;
    }

    switch (activeNav) {
      case "Matches":
        return (
          <MatchesView
            connectedProfiles={connectedProfiles}
            onViewReport={(p) => setReportProfile(p)}
            onChat={(p) => { setChatTarget(p); setActiveNav("Chat"); }}
            onAcceptLike={(p) => setConnectedProfiles((prev) => [...prev, p])}
          />
        );
      case "Chat":
        return <ChatView activeChat={chatTarget} onAddToTeam={(p) => setAddToTeamTarget(p)} />;
      case "Team":
        return (
          <TeamBuilderView
            teamMembers={teamMembers}
            onFindMembers={() => setActiveNav("Home")}
          />
        );
      case "Profile":
        return <ProfileView />;
      default:
        return null;
    }
  };

  const renderHomeDesktop = () => (
    <div className="flex-1 flex overflow-hidden">
      {/* Left sidebar — filters */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="hidden lg:flex flex-col w-[300px] border-r border-border/30 bg-card/30 p-4 overflow-hidden"
      >
        <PremiumFilterPanel onGenerate={generateMatches} />
      </motion.aside>

      {/* Center — swipe cards */}
      <div className="flex-1 flex flex-col items-center justify-center p-3 lg:p-6 relative">
        {/* Mobile filter toggle */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute inset-0 z-30 bg-background/95 backdrop-blur-sm p-4 overflow-auto lg:hidden"
          >
            <PremiumFilterPanel onGenerate={generateMatches} />
          </motion.div>
        )}

        <div className="relative w-full max-w-[360px] h-[460px]">
          {cardStack.length === 0 ? (
            <div className="h-full rounded-2xl bg-card border border-border flex flex-col items-center justify-center text-center px-6 shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-3">
                <Check className="w-7 h-7 text-primary" />
              </div>
              <p className="font-display font-semibold text-foreground text-sm mb-1">You've seen everyone!</p>
              <p className="text-xs text-muted-foreground mb-1">
                {stats.connected} connected · {stats.skipped} skipped
              </p>
              <p className="text-[10px] text-muted-foreground mb-3">Adjust filters for more</p>
              <Button size="sm" className="bg-primary text-primary-foreground" onClick={resetDeck}>
                Start Over
              </Button>
            </div>
          ) : (
            <AnimatePresence>
              {cardStack.slice(0, 2).map((profile, i) => (
                <SwipeCard
                  key={profile.id}
                  profile={profile}
                  onSwipe={handleSwipe}
                  isTop={i === 0}
                  triggerExit={i === 0 ? buttonSwipeDir : null}
                />
              ))}
            </AnimatePresence>
          )}
        </div>

        {cardStack.length > 0 && (
          <div className="flex items-center justify-center gap-5 mt-5 z-20">
            <button
              onClick={() => handleButtonSwipe("left")}
              className="w-14 h-14 rounded-full border-2 border-destructive/30 bg-card flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-90"
            >
              <X className="w-6 h-6 text-destructive" />
            </button>
            <button
              onClick={() => setShowSpotlight(true)}
              className="w-11 h-11 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-90 glow-primary"
            >
              <Zap className="w-5 h-5 text-primary-foreground" />
            </button>
            <button
              onClick={() => handleButtonSwipe("right")}
              className="w-14 h-14 rounded-full border-2 border-green-400/30 bg-card flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-90"
            >
              <Check className="w-6 h-6 text-green-400" />
            </button>
          </div>
        )}
      </div>

      {/* Right sidebar — liked you */}
      <aside className="hidden xl:flex flex-col w-[280px] border-l border-border/30 bg-card/30 p-4 overflow-auto">
        <PremiumLikedYouSection onAccept={(p) => setConnectedProfiles((prev) => [...prev, p])} />
      </aside>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="flex-shrink-0 px-4 sm:px-6 py-2.5 flex items-center justify-between bg-card/60 backdrop-blur-md border-b border-border/30">
        <div className="flex items-center gap-2.5">
          <img src={logoIcon} alt="ConnectX" className="w-7 h-7 rounded-md" />
          <span className="font-display font-bold text-foreground text-sm">ConnectX</span>
          <span className="hidden sm:flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full bg-gradient-to-r from-accent/20 to-primary/20 text-accent font-bold border border-accent/30">
            <Crown className="w-3 h-3" /> PREMIUM
          </span>
        </div>

        <div className="flex items-center gap-3">
          {STATS_BAR.map((s) => (
            <div key={s.label} className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-primary">{s.value}</span>
              <span className="text-[9px] text-muted-foreground hidden sm:inline">{s.label}</span>
            </div>
          ))}
          {/* Mobile filter button */}
          {activeNav === "Home" && (
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`lg:hidden w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                showFilters ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      {/* Sub header */}
      <div className="flex-shrink-0 px-4 sm:px-6 py-1.5 border-b border-border/20 flex items-center justify-between bg-card/30">
        <div className="flex items-center gap-2">
          {reportProfile && (
            <button onClick={() => setReportProfile(null)} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <span className="font-display text-xs font-semibold text-foreground">
            {reportProfile ? "Compatibility Report" : activeNav}
          </span>
        </div>
        {activeNav === "Home" && !reportProfile && (
          <Badge variant="outline" className="border-accent/20 text-accent text-[9px] py-0 h-5">
            <Crown className="w-3 h-3 mr-1" />
            {stats.connected} ✓ · {stats.skipped} ✗
          </Badge>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {activeNav === "Home" && !reportProfile ? renderHomeDesktop() : (
          <div className="flex-1 overflow-auto">
            {renderMainContent()}
          </div>
        )}
      </div>

      {/* Coming soon strip */}
      <div className="flex-shrink-0 px-3 py-1.5 bg-card/40 border-t border-border/20 flex items-center gap-2 overflow-x-auto">
        {COMING_SOON.map((c) => (
          <div key={c} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted/30 border border-border/20 flex-shrink-0">
            <Sparkles className="w-2.5 h-2.5 text-accent" />
            <span className="text-[8px] text-muted-foreground whitespace-nowrap">{c}</span>
            <span className="text-[7px] text-primary font-bold">SOON</span>
          </div>
        ))}
      </div>

      {/* Bottom nav */}
      <nav className="flex-shrink-0 bg-card border-t border-border/30 flex items-center justify-around py-1.5 pb-2 sm:pb-2.5">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              setActiveNav(item.label);
              setReportProfile(null);
              setShowFilters(false);
            }}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors ${
              activeNav === item.label ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <item.icon className={`w-5 h-5 ${activeNav === item.label ? "drop-shadow-[0_0_6px_hsl(var(--primary))]" : ""}`} />
            <span className="text-[9px] font-medium">{item.label}</span>
            {activeNav === item.label && <div className="w-1 h-1 rounded-full bg-primary" />}
          </button>
        ))}
      </nav>

      {/* Modals */}
      <MatchModal
        profile={matchProfile}
        onClose={() => setMatchProfile(null)}
        onChat={() => { setChatTarget(matchProfile); setMatchProfile(null); setActiveNav("Chat"); }}
        onReport={() => { setReportProfile(matchProfile!); setMatchProfile(null); }}
      />
      <SpotlightModal open={showSpotlight} onClose={() => setShowSpotlight(false)} />
      <AddToTeamModal
        profile={addToTeamTarget}
        onClose={() => setAddToTeamTarget(null)}
        onConfirm={handleAddToTeamConfirm}
      />
    </div>
  );
}
