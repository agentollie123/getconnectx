import { Heart, Check, X } from "lucide-react";
import { profiles, type Profile } from "@/lib/profileData";

interface PremiumLikedYouSectionProps {
  onAccept: (profile: Profile) => void;
}

const likedProfiles = profiles.slice(2, 6);

export function PremiumLikedYouSection({ onAccept }: PremiumLikedYouSectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-accent" fill="currentColor" />
          <h3 className="text-sm font-display font-bold text-foreground">Connects</h3>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent/20 text-accent font-bold">
            {likedProfiles.length}
          </span>
        </div>
        <span className="text-[9px] px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/30 font-semibold">
          ✦ Premium — All Connects Visible
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {likedProfiles.map((p) => (
          <div key={p.id} className="relative rounded-xl overflow-hidden border border-border group hover:border-accent/40 transition-colors">
            <img
              src={p.photo}
              alt={p.name}
              className="w-full aspect-square object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background/90 to-transparent p-2">
              <p className="text-[10px] font-semibold text-foreground truncate">{p.name}</p>
              <p className="text-[8px] text-muted-foreground truncate">{p.role}</p>
              <div className="flex gap-1 mt-1">
                <button
                  onClick={() => onAccept(p)}
                  className="flex-1 flex items-center justify-center py-1 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
                >
                  <Check className="w-3 h-3" />
                </button>
                <button className="flex-1 flex items-center justify-center py-1 rounded-lg bg-muted/50 text-muted-foreground hover:bg-muted transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
