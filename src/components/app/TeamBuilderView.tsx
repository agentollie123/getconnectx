import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Users, Briefcase, Code, Palette, TrendingUp, Plus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profiles } from "@/lib/profileData";

const TEAM_SLOTS = [
  { role: "Founder", type: "Business", icon: Briefcase, filled: true, profile: null },
  { role: "Co-Founder", type: "Engineering", icon: Code, filled: true, profile: profiles[0] },
  { role: "Early Team", type: "Product", icon: Palette, filled: false, profile: null },
  { role: "Early Team", type: "Growth", icon: TrendingUp, filled: false, profile: null },
];

const MISSING_ROLES = ["Frontend Engineer", "Growth Marketer"];

export function TeamBuilderView() {
  const completeness = 60;

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-lg mx-auto space-y-6">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Your Startup Team
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Build your dream founding team</p>
        </div>

        {/* Progress */}
        <div className="rounded-xl bg-card border border-border p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-foreground">Startup Team Completeness</p>
            <span className="text-sm font-bold text-primary">{completeness}%</span>
          </div>
          <Progress value={completeness} className="h-2" />
        </div>

        {/* Team slots */}
        <div className="space-y-3">
          {TEAM_SLOTS.map((slot, idx) => (
            <div key={idx} className={`rounded-xl border p-4 flex items-center gap-4 ${
              slot.filled
                ? "bg-card border-border"
                : "bg-muted/20 border-dashed border-border/50"
            }`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                slot.filled
                  ? "bg-primary/10"
                  : "bg-muted/50"
              }`}>
                {slot.profile ? (
                  <img src={slot.profile.photo} alt={slot.profile.name} className="w-12 h-12 rounded-xl object-cover" />
                ) : slot.filled ? (
                  <slot.icon className="w-5 h-5 text-primary" />
                ) : (
                  <Plus className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  {slot.profile ? slot.profile.name : slot.role}
                </p>
                <p className="text-xs text-muted-foreground">{slot.type}</p>
              </div>
              {!slot.filled && (
                <Button size="sm" variant="outline" className="text-xs border-primary/30 text-primary">
                  Find
                </Button>
              )}
              {slot.filled && !slot.profile && (
                <span className="text-[10px] text-primary font-medium px-2 py-0.5 rounded-full bg-primary/10">You</span>
              )}
            </div>
          ))}
        </div>

        {/* Missing roles */}
        <div className="rounded-xl bg-destructive/5 border border-destructive/20 p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-destructive" />
            <p className="text-sm font-semibold text-foreground">Missing Roles</p>
          </div>
          <div className="space-y-2">
            {MISSING_ROLES.map((role) => (
              <div key={role} className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{role}</span>
                <Button size="sm" variant="ghost" className="text-xs text-primary h-7 px-2">
                  Search
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
