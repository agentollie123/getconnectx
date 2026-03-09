import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import {
  Home, Heart, MessageCircle, Users, User,
  X, Check, Bookmark, Compass, ArrowLeft,
  Sparkles, CloudLightning,
} from "lucide-react";
import { profiles, type Profile } from "@/lib/profileData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import logoIcon from "@/assets/logo-icon.png";

import { FilterPanel, type FilterState } from "@/components/app/FilterPanel";
import { SwipeCard } from "@/components/app/SwipeCard";
import { MatchModal } from "@/components/app/MatchModal";
import { CompatibilityReport } from "@/components/app/CompatibilityReport";
import { MatchesView } from "@/components/app/MatchesView";
import { ChatView } from "@/components/app/ChatView";
import { TeamBuilderView } from "@/components/app/TeamBuilderView";
import { ProfileView } from "@/components/app/ProfileView";
import { DemoLimitModal } from "@/components/app/DemoLimitModal";
import { NetworkStats } from "@/components/app/NetworkStats";

const navItems = [
  { icon: Home, label: "Home" },
  { icon: Heart, label: "Matches" },
  { icon: MessageCircle, label: "Chat" },
  { icon: Users, label: "Team Builder" },
  { icon: User, label: "Profile" },
];

const COMING_SOON = [
  { label: "Founder ↔ Investor", desc: "Get matched with aligned investors" },
  { label: "Founder ↔ Strategic Partner", desc: "Find enterprise partners" },
  { label: "Founder ↔ Advisors", desc: "Connect with seasoned mentors" },
];

export default function AppDemo() {
  const [activeNav, setActiveNav] = useState("Home");
  const [cardStack, setCardStack] = useState<Profile[]>([...profiles]);
  const [stats, setStats] = useState({ connected: 0, skipped: 0 });
  const [connectedProfiles, setConnectedProfiles] = useState<Profile[]>([]);
  const [buttonSwipeDir, setButtonSwipeDir] = useState<"left" | "right" | null>(null);

  // Modals
  const [matchProfile, setMatchProfile] = useState<Profile | null>(null);
  const [reportProfile, setReportProfile] = useState<Profile | null>(null);
  const [showDemoLimit, setShowDemoLimit] = useState(false);
  const [chatTarget, setChatTarget] = useState<Profile | null>(null);
  const [swipeCount, setSwipeCount] = useState(0);

  const generateMatches = useCallback((filters: FilterState) => {
    const filtered = profiles.filter((p) => {
      if (filters.stage.length > 0 && !filters.stage.some((s) => p.stage.includes(s.replace(" Stage", "")))) return false;
      return true;
    });
    setCardStack(filtered.length > 0 ? [...filtered] : [...profiles]);
    setStats({ connected: 0, skipped: 0 });
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
      // Show match modal on every 2nd right swipe
      if (newCount % 2 === 0) {
        setTimeout(() => setMatchProfile(current), 400);
      }
    }

    // Show demo limit after 5 swipes
    if (newCount === 5) {
      setTimeout(() => setShowDemoLimit(true), 500);
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

  const renderMainContent = () => {
    // Show compatibility report overlay
    if (reportProfile) {
      return (
        <div className="h-full">
          <CompatibilityReport profile={reportProfile} onBack={() => setReportProfile(null)} />
        </div>
      );
    }

    switch (activeNav) {
      case "Matches":
        return (
          <MatchesView
            connectedProfiles={connectedProfiles}
            onViewReport={(p) => setReportProfile(p)}
            onChat={(p) => {
              setChatTarget(p);
              setActiveNav("Chat");
            }}
          />
        );
      case "Chat":
        return <ChatView activeChat={chatTarget} />;
      case "Team Builder":
        return <TeamBuilderView />;
      case "Profile":
        return <ProfileView />;
      default:
        return renderHomeView();
    }
  };

  const renderHomeView = () => (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-md h-[520px]">
        {cardStack.length === 0 ? (
          <div className="h-full rounded-2xl bg-card border border-border flex flex-col items-center justify-center text-center px-8 shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <p className="font-display font-semibold text-foreground mb-2">You've seen everyone!</p>
            <p className="text-sm text-muted-foreground mb-1">
              Connected: {stats.connected} · Skipped: {stats.skipped}
            </p>
            <p className="text-xs text-muted-foreground mb-4">Adjust filters to discover more builders</p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={resetDeck}>
              Start Over
            </Button>
          </div>
        ) : (
          <>
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

            {/* Action buttons */}
            <div className="absolute -bottom-16 inset-x-0 flex items-center justify-center gap-6 z-20">
              <button
                onClick={() => handleButtonSwipe("left")}
                className="w-14 h-14 rounded-full border-2 border-destructive/30 bg-card flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95"
              >
                <X className="w-6 h-6 text-destructive" />
              </button>
              <button
                onClick={() => {}}
                className="w-10 h-10 rounded-full border border-accent/30 bg-card flex items-center justify-center shadow-md hover:scale-110 transition-transform"
              >
                <Bookmark className="w-4 h-4 text-accent" />
              </button>
              <button
                onClick={() => handleButtonSwipe("right")}
                className="w-14 h-14 rounded-full border-2 border-green-400/30 bg-card flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95"
              >
                <Check className="w-6 h-6 text-green-400" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[hsl(0,0%,6%)] flex items-center justify-center p-2 sm:p-6">
      {/* Mobile frame */}
      <div className="w-full max-w-5xl h-[90vh] max-h-[800px] rounded-3xl border-2 border-border/30 bg-background overflow-hidden shadow-2xl flex flex-col">

        {/* Top bar with stats */}
        <header className="flex-shrink-0 bg-card/80 border-b border-border/50 px-4 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <img src={logoIcon} alt="ConnectX" className="w-7 h-7 rounded-lg" />
            <span className="font-display font-bold text-foreground text-sm">Welcome to ConnectX</span>
          </div>
          <NetworkStats />
        </header>

        {/* Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar nav */}
          <aside className="w-14 bg-card/30 border-r border-border/50 flex flex-col flex-shrink-0 hidden md:flex">
            <nav className="flex-1 py-2 space-y-0.5">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setActiveNav(item.label);
                    setReportProfile(null);
                  }}
                  className={`w-full flex flex-col items-center gap-0.5 py-2.5 text-[9px] transition-colors ${
                    activeNav === item.label
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                  title={item.label}
                >
                  <item.icon className="w-4.5 h-4.5" />
                  <span className="leading-none">{item.label === "Team Builder" ? "Team" : item.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Filter panel - only show on Home */}
          {activeNav === "Home" && !reportProfile && (
            <aside className="hidden lg:flex w-72 border-r border-border/50 bg-card/20 p-4 flex-col overflow-hidden">
              <FilterPanel onGenerate={generateMatches} />
            </aside>
          )}

          {/* Main content */}
          <main className="flex-1 flex flex-col overflow-hidden">
            {/* Sub-header */}
            <div className="flex-shrink-0 px-4 py-2 border-b border-border/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {reportProfile && (
                  <button onClick={() => setReportProfile(null)} className="text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <span className="font-display text-sm font-semibold text-foreground">{activeNav}</span>
              </div>
              {activeNav === "Home" && (
                <Badge variant="outline" className="border-primary/30 text-primary text-[10px]">
                  {stats.connected} connected · {stats.skipped} skipped
                </Badge>
              )}
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-hidden">
              {renderMainContent()}
            </div>
          </main>
        </div>

        {/* Coming Soon + Footer */}
        <footer className="flex-shrink-0 bg-card/50 border-t border-border/50 px-4 py-2">
          <div className="flex items-center justify-between gap-4 overflow-x-auto">
            <div className="flex items-center gap-3 flex-shrink-0">
              {COMING_SOON.map((c) => (
                <div key={c.label} className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted/30 border border-border/30 flex-shrink-0">
                  <Sparkles className="w-3 h-3 text-accent" />
                  <span className="text-[9px] text-muted-foreground whitespace-nowrap">{c.label}</span>
                  <span className="text-[8px] text-muted-foreground/50 px-1 py-0.5 rounded bg-muted/50">Soon</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <CloudLightning className="w-3 h-3 text-primary" />
              <span className="text-[9px] text-muted-foreground whitespace-nowrap">Powered by modern AI infrastructure</span>
            </div>
          </div>
        </footer>

        {/* Mobile bottom nav */}
        <nav className="md:hidden flex-shrink-0 bg-card border-t border-border/50 flex items-center justify-around py-1.5">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setActiveNav(item.label);
                setReportProfile(null);
              }}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 text-[9px] ${
                activeNav === item.label ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label === "Team Builder" ? "Team" : item.label}</span>
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
      <DemoLimitModal open={showDemoLimit} onClose={() => setShowDemoLimit(false)} />
    </div>
  );
}
