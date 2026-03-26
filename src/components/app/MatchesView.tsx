import { Heart, MessageCircle, Eye, Clock, Building2, Rocket, Lock, Crown, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { profiles, type Profile } from "@/lib/profileData";
import { LikedYouSection } from "./LikedYouSection";
import type { Startup } from "@/lib/startupData";

interface MatchesViewProps {
  connectedProfiles: Profile[];
  connectedStartups?: Startup[];
  isStartupMode?: boolean;
  isPremium?: boolean;
  onViewReport: (profile: Profile) => void;
  onChat: (profile: Profile) => void;
  onChatStartup?: (startup: Startup) => void;
  onAcceptLike: (profile: Profile) => void;
}

function getExpiry(isPremium?: boolean) {
  const base = Math.floor(Math.random() * 6) + 1;
  return isPremium ? base + 23 : base; // 30 days premium vs ~7 free
}

export function MatchesView({ connectedProfiles, connectedStartups = [], isStartupMode, isPremium, onViewReport, onChat, onChatStartup, onAcceptLike }: MatchesViewProps) {
  const matched = connectedProfiles.length > 0 ? connectedProfiles : profiles.slice(0, 3);

  if (isStartupMode) {
    return (
      <ScrollArea className="h-full">
        <div className="p-4 space-y-5">
          {/* Interested Startups */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Rocket className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-display font-bold text-foreground">Interested Startups</h3>
              </div>
              <span className="text-[10px] text-muted-foreground">{connectedStartups.length} startups</span>
            </div>

            {connectedStartups.length === 0 ? (
              <div className="text-center py-10">
                <Building2 className="w-10 h-10 text-muted-foreground/20 mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">No startup matches yet. Keep swiping!</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {connectedStartups.map((s) => {
                  const daysLeft = getExpiry(isPremium);
                  const initials = s.name.split(" ").map(w => w[0]).join("").slice(0, 2);
                  return (
                    <div key={s.id} className="rounded-xl bg-card border border-border p-3 flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <span className="text-sm font-display font-bold text-primary-foreground">{initials}</span>
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-card" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-semibold text-foreground text-sm">{s.name}</h4>
                        <p className="text-[10px] text-muted-foreground truncate">{s.industry} · {s.stage}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Clock className="w-2.5 h-2.5 text-accent" />
                          <span className="text-[9px] text-accent font-medium">Expires in {daysLeft} days</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-primary" onClick={() => onChatStartup?.(s)}>
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-5">
        {/* Connects / Liked You */}
        {isPremium ? (
          <LikedYouSection onAccept={onAcceptLike} />
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-primary" fill="currentColor" />
                <h3 className="text-sm font-display font-bold text-foreground">Your Connects</h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary font-bold">12 new</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {profiles.slice(3, 6).map((p) => (
                <div key={p.id} className="relative rounded-xl overflow-hidden border border-border">
                  <img src={p.photo} alt="" className="w-full aspect-square object-cover blur-[8px]" />
                  <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                    <Lock className="w-5 h-5 text-foreground/60" />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-2 rounded-xl bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30 text-xs font-semibold text-accent flex items-center justify-center gap-1.5 hover:from-accent/30 hover:to-primary/30 transition-colors">
              <Crown className="w-3.5 h-3.5" /> Unlock Connects
            </button>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-display font-bold text-foreground">Your Matches</h3>
            <span className="text-[10px] text-muted-foreground">{matched.length} matches</span>
          </div>
          {matched.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
              <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2.5 }}>
                <Search className="w-10 h-10 text-muted-foreground/20 mx-auto mb-2" />
              </motion.div>
              <p className="text-xs text-muted-foreground font-medium">We're finding better matches for you</p>
              <p className="text-[10px] text-muted-foreground/60 mt-1">Update preferences to see more</p>
            </motion.div>
          ) : (
            <div className="space-y-2.5">
              {matched.map((p, i) => {
                const daysLeft = getExpiry(isPremium);
                return (
                  <motion.div
                    key={p.id}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.08, duration: 0.3, ease: "easeOut" }}
                    className="rounded-xl bg-card border border-border p-3 flex items-center gap-3"
                  >
                    <div className="relative">
                      <img src={p.photo} alt={p.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20" />
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-card" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-semibold text-foreground text-sm">{p.name}</h4>
                      <p className="text-[10px] text-muted-foreground truncate">{p.role} · {p.location}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Clock className="w-2.5 h-2.5 text-accent" />
                        <span className="text-[9px] text-accent font-medium">Expires in {daysLeft} days</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-primary" onClick={() => onChat(p)}>
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground" onClick={() => onViewReport(p)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  );
}
