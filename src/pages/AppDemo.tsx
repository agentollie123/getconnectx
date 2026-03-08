import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Compass, Heart, MessageCircle, User, ChevronLeft, ChevronRight } from "lucide-react";
import { ProfileCard } from "@/components/ProfileCard";
import { profiles } from "@/lib/profileData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { icon: Home, label: "Home" },
  { icon: Compass, label: "Discover" },
  { icon: Heart, label: "Matches" },
  { icon: MessageCircle, label: "Messages" },
  { icon: User, label: "Profile" },
];

export default function AppDemo() {
  const [activeNav, setActiveNav] = useState("Discover");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-60" : "w-16"
        } border-r border-border bg-card/50 flex flex-col transition-all duration-300 flex-shrink-0 hidden md:flex`}
      >
        <div className="p-4 flex items-center gap-2 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <span className="font-display font-bold text-primary-foreground text-sm">CX</span>
          </div>
          {sidebarOpen && <span className="font-display font-bold text-foreground">ConnectX</span>}
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeNav === item.label
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-border">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <header className="sticky top-0 z-10 glass-card border-b border-border/30 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">{activeNav}</h1>
            <p className="text-xs text-muted-foreground">Browse startup builders near you</p>
          </div>
          <Badge variant="outline" className="border-primary/30 text-primary text-xs">
            Demo Mode
          </Badge>
        </header>

        {/* Profile feed */}
        <div className="p-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
            {profiles.map((p, i) => (
              <ProfileCard
                key={p.id}
                profile={p}
                index={i}
                showCommitment
                onConnect={() => {}}
                onSkip={() => {}}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 glass-card border-t border-border/30 flex items-center justify-around py-2">
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
