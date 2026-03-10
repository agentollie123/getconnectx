import { Lock, Heart, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profiles, type Profile } from "@/lib/profileData";

interface LikedYouSectionProps {
  onAccept: (profile: Profile) => void;
}

const likedProfiles = profiles.slice(3, 6);

export function LikedYouSection({ onAccept }: LikedYouSectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-primary" fill="currentColor" />
          <h3 className="text-sm font-display font-bold text-foreground">Liked You</h3>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary font-bold">
            {likedProfiles.length}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <Lock className="w-3 h-3" />
          <span>Premium: See all</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {likedProfiles.map((p, i) => (
          <div key={p.id} className="relative rounded-xl overflow-hidden border border-border">
            <img
              src={p.photo}
              alt={p.name}
              className={`w-full aspect-square object-cover ${i > 0 ? "blur-[6px]" : ""}`}
            />
            {i > 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/40">
                <Lock className="w-5 h-5 text-foreground/70" />
              </div>
            )}
            {i === 0 && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background/90 to-transparent p-2">
                <p className="text-[10px] font-semibold text-foreground truncate">{p.name}</p>
                <div className="flex gap-1 mt-1">
                  <button
                    onClick={() => onAccept(p)}
                    className="flex-1 flex items-center justify-center py-1 rounded-lg bg-primary/20 text-primary"
                  >
                    <Check className="w-3 h-3" />
                  </button>
                  <button className="flex-1 flex items-center justify-center py-1 rounded-lg bg-muted/50 text-muted-foreground">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
