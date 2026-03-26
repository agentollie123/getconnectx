import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import {
  Home, Heart, MessageCircle, Users, User,
  X, Check, Zap, ArrowLeft, SlidersHorizontal,
  Code, Palette, TrendingUp, Briefcase, Crown, Map, RotateCcw,
} from "lucide-react";
import { profiles, type Profile } from "@/lib/profileData";
import { startups, type Startup } from "@/lib/startupData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import logoIcon from "@/assets/logo-icon.png";

import { FilterPanel, type FilterState } from "@/components/app/FilterPanel";
import { startups as allStartups } from "@/lib/startupData";
import { SwipeCard } from "@/components/app/SwipeCard";
import { StartupSwipeCard } from "@/components/app/StartupSwipeCard";
import { StartupDetailModal } from "@/components/app/StartupDetailModal";
import { MatchModal } from "@/components/app/MatchModal";
import { CompatibilityReport } from "@/components/app/CompatibilityReport";
import { MatchesView } from "@/components/app/MatchesView";
import { ChatView } from "@/components/app/ChatView";
import { TeamBuilderView } from "@/components/app/TeamBuilderView";
import { ProfileView } from "@/components/app/ProfileView";
import { DemoLimitModal } from "@/components/app/DemoLimitModal";
import { SpotlightModal } from "@/components/app/SpotlightModal";
import { AddToTeamModal } from "@/components/app/AddToTeamModal";
import { UpgradeModal } from "@/components/app/UpgradeModal";
import { VersionBadge, MatchingModeSelector, SwipeLimitBar } from "@/components/app/VersionBadge";
import { V2ComingSoonGrid } from "@/components/app/V2ComingSoon";
import { VersionRoadmap } from "@/components/app/VersionRoadmap";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { OnboardingFlow } from "@/components/app/OnboardingFlow";

const navItems = [
  { icon: Home, label: "Home" },
  { icon: Heart, label: "Matches" },
  { icon: MessageCircle, label: "Chat" },
  { icon: Users, label: "Team" },
  { icon: User, label: "Profile" },
];

const INITIAL_TEAM = [
  { role: "Founder", type: "Business", icon: Briefcase, filled: true, profile: null as Profile | null, equity: 40, commitment: "Full-time" },
  { role: "Co-Founder", type: "Engineering", icon: Code, filled: true, profile: profiles[0], equity: 25, commitment: "Full-time" },
  { role: "Early Team", type: "Product Designer", icon: Palette, filled: false, profile: null as Profile | null },
  { role: "Early Team", type: "Growth Marketer", icon: TrendingUp, filled: false, profile: null as Profile | null },
];

type MatchingMode = "founder-cofounder" | "founder-team" | "cofounder-startup" | "team-startup";

const isStartupMode = (mode: MatchingMode) => mode === "cofounder-startup" || mode === "team-startup";

const FEED_TITLES: Record<MatchingMode, string> = {
  "founder-cofounder": "Discover Co-Founders",
  "founder-team": "Discover Team Members",
  "cofounder-startup": "Discover Startups Looking for Co-Founders",
  "team-startup": "Discover Startups Looking for Team Members",
};

export default function AppDemo() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Home");
  const [cardStack, setCardStack] = useState<Profile[]>([...profiles]);
  const [startupStack, setStartupStack] = useState<Startup[]>([...startups]);
  const [stats, setStats] = useState({ connected: 0, skipped: 0 });
  const [connectedProfiles, setConnectedProfiles] = useState<Profile[]>([]);
  const [connectedStartups, setConnectedStartups] = useState<Startup[]>([]);
  const [buttonSwipeDir, setButtonSwipeDir] = useState<"left" | "right" | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [matchingMode, setMatchingMode] = useState<MatchingMode>("founder-cofounder");

  // Modals
  const [matchProfile, setMatchProfile] = useState<Profile | null>(null);
  const [reportProfile, setReportProfile] = useState<Profile | null>(null);
  const [showDemoLimit, setShowDemoLimit] = useState(false);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [addToTeamTarget, setAddToTeamTarget] = useState<Profile | null>(null);
  const [chatTarget, setChatTarget] = useState<Profile | null>(null);
  const [swipeCount, setSwipeCount] = useState(0);
  const [teamMembers, setTeamMembers] = useState(INITIAL_TEAM);
  const [startupDetail, setStartupDetail] = useState<Startup | null>(null);
  const [matchedStartup, setMatchedStartup] = useState<Startup | null>(null);
  const [chatStartupTarget, setChatStartupTarget] = useState<Startup | null>(null);

  const generateMatches = useCallback((filters: FilterState) => {
    if (isStartupMode(matchingMode)) {
      const filtered = matchingMode === "cofounder-startup"
        ? allStartups.filter(s => s.lookingFor === "co-founder" || s.lookingFor === "both")
        : allStartups.filter(s => s.lookingFor === "team" || s.lookingFor === "both");
      setStartupStack([...filtered]);
    } else {
      const filtered = profiles.filter((p) => {
        if (filters.stage.length > 0 && !filters.stage.some((s) => p.stage.includes(s.replace(" Stage", "")))) return false;
        return true;
      });
      setCardStack(filtered.length > 0 ? [...filtered] : [...profiles]);
    }
    setStats({ connected: 0, skipped: 0 });
    setSwipeCount(0);
    setShowFilters(false);
  }, [matchingMode]);

  const handleModeChange = (mode: string) => {
    const m = mode as MatchingMode;
    setMatchingMode(m);
    setButtonSwipeDir(null);
    if (isStartupMode(m)) {
      const filtered = m === "cofounder-startup"
        ? startups.filter(s => s.lookingFor === "co-founder" || s.lookingFor === "both")
        : startups.filter(s => s.lookingFor === "team" || s.lookingFor === "both");
      setStartupStack([...filtered]);
    } else {
      setCardStack([...profiles]);
    }
    setStats({ connected: 0, skipped: 0 });
    setSwipeCount(0);
  };

  const handleSwipe = (dir: "left" | "right") => {
    if (isStartupMode(matchingMode)) {
      const current = startupStack[0];
      setStartupStack((prev) => prev.slice(1));
      setStats((prev) => ({
        connected: dir === "right" ? prev.connected + 1 : prev.connected,
        skipped: dir === "left" ? prev.skipped + 1 : prev.skipped,
      }));
      setButtonSwipeDir(null);
      setSwipeCount((c) => c + 1);

      if (dir === "right" && current) {
        setConnectedStartups((prev) => [...prev, current]);
        if ((swipeCount + 1) % 2 === 0) {
          setTimeout(() => setMatchedStartup(current), 400);
        }
      }
      return;
    }

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
    if (isStartupMode(matchingMode)) {
      const filtered = matchingMode === "cofounder-startup"
        ? startups.filter(s => s.lookingFor === "co-founder" || s.lookingFor === "both")
        : startups.filter(s => s.lookingFor === "team" || s.lookingFor === "both");
      setStartupStack([...filtered]);
    } else {
      setCardStack([...profiles]);
    }
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

    if (showFilters && activeNav === "Home") {
      return (
        <div className="h-full p-4">
          <FilterPanel onGenerate={generateMatches} activeMode={matchingMode} onModeChange={handleModeChange} />
        </div>
      );
    }

    switch (activeNav) {
      case "Matches":
        return (
          <MatchesView
            connectedProfiles={connectedProfiles}
            connectedStartups={connectedStartups}
            isStartupMode={isStartupMode(matchingMode)}
            onViewReport={(p) => setReportProfile(p)}
            onChat={(p) => { setChatTarget(p); setActiveNav("Chat"); }}
            onChatStartup={(s) => { setChatStartupTarget(s); setActiveNav("Chat"); }}
            onAcceptLike={(p) => setConnectedProfiles((prev) => [...prev, p])}
          />
        );
      case "Chat":
        return (
          <ChatView
            activeChat={chatTarget}
            activeChatStartup={chatStartupTarget}
            isStartupMode={isStartupMode(matchingMode)}
            connectedStartups={connectedStartups}
            onAddToTeam={(p) => setAddToTeamTarget(p)}
          />
        );
      case "Team":
        return (
          <TeamBuilderView
            teamMembers={teamMembers}
            onFindMembers={() => setActiveNav("Home")}
            isStartupMode={isStartupMode(matchingMode)}
            connectedStartups={connectedStartups}
          />
        );
      case "Profile":
        return (
          <ScrollArea className="h-full">
            <ProfileView matchingMode={matchingMode} />
            <div className="px-4 pb-4">
              <V2ComingSoonGrid />
            </div>
          </ScrollArea>
        );
      case "Roadmap":
        return (
          <ScrollArea className="h-full">
            <VersionRoadmap />
          </ScrollArea>
        );
      default:
        return renderHomeView();
    }
  };

  const currentStack = isStartupMode(matchingMode) ? startupStack : cardStack;
  const isEmpty = currentStack.length === 0;

  const renderHomeView = () => (
    <div className="flex-1 flex flex-col items-center p-3 relative">

      <div className="relative w-full max-w-[360px] h-[420px]">
        {isEmpty ? (
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
        ) : isStartupMode(matchingMode) ? (
          <AnimatePresence>
            {startupStack.slice(0, 2).map((startup, i) => (
              <StartupSwipeCard
                key={startup.id}
                startup={startup}
                onSwipe={handleSwipe}
                isTop={i === 0}
                triggerExit={i === 0 ? buttonSwipeDir : null}
              />
            ))}
          </AnimatePresence>
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

      {/* Swipe controls */}
      {!isEmpty && (
        <div className="flex items-center justify-center gap-4 mt-4 z-20">
          <button
            onClick={() => handleButtonSwipe("left")}
            className="w-13 h-13 rounded-full border-2 border-destructive/30 bg-card flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-90"
          >
            <X className="w-6 h-6 text-destructive" />
          </button>
          <button
            onClick={() => setShowUpgrade(true)}
            className="w-9 h-9 rounded-full border border-muted-foreground/30 bg-card flex items-center justify-center shadow-md hover:scale-110 transition-transform active:scale-90 opacity-60"
            title="Rewind — Premium only"
          >
            <RotateCcw className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            onClick={() => setShowSpotlight(true)}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-90 glow-primary"
          >
            <Zap className="w-5 h-5 text-primary-foreground" />
          </button>
          <button
            onClick={() => handleButtonSwipe("right")}
            className="w-13 h-13 rounded-full border-2 border-green-400/30 bg-card flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-90"
          >
            <Check className="w-6 h-6 text-green-400" />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[hsl(0,0%,5%)] flex items-center justify-center p-2 sm:p-4">
      {/* Mobile frame */}
      <div className="w-full max-w-[430px] h-[92vh] max-h-[850px] rounded-[2rem] border-2 border-border/20 bg-background overflow-hidden shadow-2xl flex flex-col relative">

        {/* Status bar */}
        <div className="flex-shrink-0 px-3 py-2 flex items-center justify-between bg-card/60 backdrop-blur-md border-b border-border/30">
          <div className="flex items-center gap-2">
            <img src={logoIcon} alt="ConnectX" className="w-6 h-6 rounded-md" />
            <span className="font-display font-bold text-foreground text-xs">ConnectX</span>
            <VersionBadge tier="free" version={1} />
          </div>
          <div className="flex items-center gap-2">
            <SwipeLimitBar current={swipeCount} max={0} isPremium />
          </div>
        </div>

        {/* Sub header */}
        <div className="flex-shrink-0 px-3 py-1.5 border-b border-border/20 flex items-center justify-between bg-card/30">
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
          <div className="flex items-center gap-2">
            {activeNav === "Home" && !reportProfile && (
              <>
                <Badge variant="outline" className="border-primary/20 text-primary text-[9px] py-0 h-5">
                  {stats.connected} ✓ · {stats.skipped} ✗
                </Badge>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                    showFilters ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                </button>
              </>
            )}
            <button
              onClick={() => setShowUpgrade(true)}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30 hover:from-accent/30 hover:to-primary/30 transition-colors"
            >
              <Crown className="w-3 h-3 text-accent" />
              <span className="text-[9px] font-bold text-accent">PRO</span>
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-hidden">
          {renderMainContent()}
        </div>

        {/* Bottom nav */}
        <nav className="flex-shrink-0 bg-card border-t border-border/30 flex items-center justify-around py-1 pb-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setActiveNav(item.label);
                setReportProfile(null);
                setShowFilters(false);
              }}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-colors ${
                activeNav === item.label
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <item.icon className={`w-4 h-4 ${activeNav === item.label ? "drop-shadow-[0_0_6px_hsl(var(--primary))]" : ""}`} />
              <span className="text-[8px] font-medium">{item.label}</span>
              {activeNav === item.label && (
                <div className="w-1 h-1 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Modals */}
      <MatchModal
        profile={matchProfile}
        onClose={() => setMatchProfile(null)}
        onChat={() => {
          setChatTarget(matchProfile);
          setMatchProfile(null);
          setActiveNav("Chat");
        }}
        onReport={() => {
          setReportProfile(matchProfile!);
          setMatchProfile(null);
        }}
      />
      <StartupDetailModal
        startup={startupDetail}
        onClose={() => setStartupDetail(null)}
        onInterested={() => {
          if (startupDetail) {
            setConnectedStartups((prev) => [...prev, startupDetail]);
          }
          setStartupDetail(null);
        }}
        onPass={() => setStartupDetail(null)}
      />
      {matchedStartup && (
        <StartupMatchModal
          startup={matchedStartup}
          onClose={() => setMatchedStartup(null)}
          onChat={() => {
            setMatchedStartup(null);
            setActiveNav("Chat");
          }}
        />
      )}
      <DemoLimitModal open={showDemoLimit} onClose={() => setShowDemoLimit(false)} />
      <SpotlightModal open={showSpotlight} onClose={() => setShowSpotlight(false)} />
      <UpgradeModal open={showUpgrade} onClose={() => setShowUpgrade(false)} />
      <AddToTeamModal
        profile={addToTeamTarget}
        onClose={() => setAddToTeamTarget(null)}
        onConfirm={handleAddToTeamConfirm}
      />
    </div>
  );
}

// Inline startup match modal
function StartupMatchModal({ startup, onClose, onChat }: { startup: Startup; onClose: () => void; onChat: () => void }) {
  const initials = startup.name.split(" ").map(w => w[0]).join("").slice(0, 2);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="relative w-full max-w-sm rounded-2xl bg-card border border-border p-8 text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
          <span className="text-xl font-display font-bold text-primary-foreground">{initials}</span>
        </div>

        <h2 className="font-display text-xl font-bold gradient-text mb-1">Startup Match! 🚀</h2>
        <p className="text-sm text-foreground font-semibold mb-1">{startup.name}</p>
        <p className="text-xs text-muted-foreground mb-1">Founded by {startup.founder}</p>

        <Badge variant="outline" className="text-[10px] border-primary/30 text-primary mb-4">
          Startup Match
        </Badge>

        <p className="text-xs text-muted-foreground mb-4">
          {startup.founder} is interested in connecting with you for <span className="text-primary font-medium">{startup.openRoles[0]}</span>
        </p>

        <div className="flex gap-3">
          <Button className="flex-1 bg-primary text-primary-foreground" onClick={onChat}>
            <MessageCircle className="w-4 h-4 mr-1.5" /> Chat with Founder
          </Button>
        </div>
      </div>
    </div>
  );
}
