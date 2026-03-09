import { Heart, MessageCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { profiles, type Profile } from "@/lib/profileData";

interface MatchesViewProps {
  connectedProfiles: Profile[];
  onViewReport: (profile: Profile) => void;
  onChat: (profile: Profile) => void;
}

export function MatchesView({ connectedProfiles, onViewReport, onChat }: MatchesViewProps) {
  const matched = connectedProfiles.length > 0 ? connectedProfiles : profiles.slice(0, 3);

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-lg mx-auto space-y-6">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Your Matches</h2>
          <p className="text-sm text-muted-foreground mt-1">People who want to build with you</p>
        </div>

        {matched.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No matches yet. Keep swiping!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {matched.map((p) => (
              <div key={p.id} className="rounded-xl bg-card border border-border p-4 flex items-center gap-3">
                <img src={p.photo} alt={p.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-semibold text-foreground text-sm">{p.name}</h4>
                  <p className="text-xs text-muted-foreground truncate">{p.role} · {p.location}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {p.skills.slice(0, 2).map((s) => (
                      <span key={s} className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Button size="sm" variant="ghost" className="h-8 px-2 text-primary" onClick={() => onChat(p)}>
                    <MessageCircle className="w-3.5 h-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 px-2 text-muted-foreground" onClick={() => onViewReport(p)}>
                    <Eye className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
