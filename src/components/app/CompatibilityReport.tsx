import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, TrendingUp, Puzzle, Target, Clock, Briefcase,
  AlertTriangle, Users, LayoutGrid,
} from "lucide-react";
import type { Profile } from "@/lib/profileData";

interface CompatibilityReportProps {
  profile: Profile;
  onBack: () => void;
}

function ScoreRing({ score }: { score: number }) {
  return (
    <div className="relative w-28 h-28 mx-auto">
      <svg className="w-28 h-28 -rotate-90" viewBox="0 0 36 36">
        <path d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" fill="none" stroke="hsl(var(--border))" strokeWidth="2.5" />
        <path d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831"
          fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5"
          strokeDasharray={`${score}, 100`} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-primary">{score}%</span>
        <span className="text-[10px] text-muted-foreground">Compatibility</span>
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-muted/30 p-4 border border-border/50">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-primary" />
        <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      </div>
      {children}
    </div>
  );
}

export function CompatibilityReport({ profile, onBack }: CompatibilityReportProps) {
  const score = 87;
  const yourSkills = ["Strategy", "Business Development", "Fundraising"];
  const theirSkills = profile.skills;
  const sharedInterests = profile.interests;

  return (
    <div className="h-full flex flex-col bg-card rounded-2xl border border-border overflow-hidden">
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h3 className="font-display font-bold text-foreground">Startup Team Fit Analysis</h3>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Overall Score */}
          <div className="text-center py-4">
            <ScoreRing score={score} />
            <p className="text-sm font-semibold text-foreground mt-3">Strong Founding Team Fit</p>
            <p className="text-xs text-muted-foreground">You & {profile.name}</p>
          </div>

          {/* Skill Complementarity */}
          <Section title="Skill Complementarity" icon={Puzzle}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground mb-1.5 uppercase">You bring</p>
                {yourSkills.map((s) => (
                  <div key={s} className="text-xs text-foreground flex items-center gap-1.5 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {s}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground mb-1.5 uppercase">{profile.name} brings</p>
                {theirSkills.map((s) => (
                  <div key={s} className="text-xs text-foreground flex items-center gap-1.5 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {s}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3 italic">
              Your skills complement each other well for building a technology startup.
            </p>
          </Section>

          {/* Vision Alignment */}
          <Section title="Startup Vision Alignment" icon={Target}>
            <p className="text-[10px] font-semibold text-muted-foreground mb-2 uppercase">Shared Interests</p>
            <div className="flex flex-wrap gap-1.5">
              {sharedInterests.map((i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">{i}</span>
              ))}
            </div>
          </Section>

          {/* Commitment */}
          <Section title="Commitment Compatibility" icon={Clock}>
            <div className="flex justify-between text-xs">
              <div>
                <p className="text-muted-foreground">You</p>
                <p className="font-semibold text-foreground">Full-time</p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground">{profile.name}</p>
                <p className="font-semibold text-foreground">{profile.commitment}</p>
              </div>
            </div>
          </Section>

          {/* Work Style */}
          <Section title="Work Style" icon={Briefcase}>
            <div className="flex flex-wrap gap-1.5">
              {["Remote", "Hybrid", "Fast builder", "Experimental"].map((s) => (
                <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-muted border border-border text-foreground">{s}</span>
              ))}
            </div>
          </Section>

          {/* Risks */}
          <Section title="Potential Risks" icon={AlertTriangle}>
            <div className="space-y-2">
              {["Different time zones", "Different startup experience levels"].map((r) => (
                <div key={r} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
                  {r}
                </div>
              ))}
            </div>
          </Section>

          {/* Suggested Roles */}
          <Section title="Suggested Roles" icon={Users}>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground font-medium">You</span>
                <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold">CEO</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground font-medium">{profile.name}</span>
                <span className="px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 font-semibold">CTO</span>
              </div>
            </div>
          </Section>

          {/* Team Structure */}
          <Section title="Suggested Team Structure" icon={LayoutGrid}>
            <div className="grid grid-cols-2 gap-2">
              {["CEO", "CTO", "Product Designer", "Growth Marketer"].map((role) => (
                <div key={role} className="text-xs text-center py-2 rounded-lg bg-card border border-border text-foreground font-medium">
                  {role}
                </div>
              ))}
            </div>
          </Section>
        </div>
      </ScrollArea>
    </div>
  );
}
