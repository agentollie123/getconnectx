import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Users, Briefcase, Code, Palette, TrendingUp, Plus, AlertCircle,
  Mail, Search, Rocket, ChevronDown,
} from "lucide-react";
import { profiles, type Profile } from "@/lib/profileData";

interface TeamMember {
  profile: Profile | null;
  role: string;
  type: string;
  icon: any;
  filled: boolean;
  equity?: number;
  commitment?: string;
}

const STAGES = ["Idea", "MVP", "Beta", "Early Traction"];

interface TeamBuilderViewProps {
  teamMembers: TeamMember[];
  onFindMembers: () => void;
}

export function TeamBuilderView({ teamMembers, onFindMembers }: TeamBuilderViewProps) {
  const [startupName, setStartupName] = useState("My Startup");
  const [startupDesc, setStartupDesc] = useState("AI-powered supply chain platform for SMEs in Southeast Asia");
  const [industry, setIndustry] = useState("Fintech");
  const [stage, setStage] = useState("MVP");
  const [showInvite, setShowInvite] = useState(false);

  const filledCount = teamMembers.filter((m) => m.filled).length;
  const completeness = Math.round((filledCount / teamMembers.length) * 100);

  const MISSING_ROLES = teamMembers.filter((m) => !m.filled).map((m) => m.type);

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Rocket className="w-5 h-5 text-primary" />
          <h2 className="font-display text-lg font-bold text-foreground">Startup Team Builder</h2>
        </div>

        {/* Startup info */}
        <div className="rounded-xl bg-card border border-border p-3.5 space-y-3">
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Startup Name</label>
            <input
              value={startupName}
              onChange={(e) => setStartupName(e.target.value)}
              className="w-full text-sm font-display font-bold text-foreground bg-transparent border-b border-border/50 pb-1 mt-1 focus:outline-none focus:border-primary/50"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Description</label>
            <textarea
              value={startupDesc}
              onChange={(e) => setStartupDesc(e.target.value)}
              rows={2}
              className="w-full text-xs text-foreground/80 bg-transparent border-b border-border/50 pb-1 mt-1 focus:outline-none focus:border-primary/50 resize-none"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Industry</label>
              <p className="text-xs text-foreground mt-0.5">{industry}</p>
            </div>
            <div className="flex-1">
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Stage</label>
              <div className="flex gap-1 mt-1">
                {STAGES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStage(s)}
                    className={`text-[9px] px-1.5 py-0.5 rounded-full border ${
                      stage === s
                        ? "bg-primary/20 text-primary border-primary/40"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="rounded-xl bg-card border border-border p-3">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-xs font-medium text-foreground">Team Completeness</p>
            <span className="text-xs font-bold text-primary">{completeness}%</span>
          </div>
          <Progress value={completeness} className="h-1.5" />
        </div>

        {/* Team slots */}
        <div className="space-y-2">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Team Members</p>
          {teamMembers.map((slot, idx) => (
            <div key={idx} className={`rounded-xl border p-3 flex items-center gap-3 ${
              slot.filled
                ? "bg-card border-border"
                : "bg-muted/10 border-dashed border-border/40"
            }`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                slot.filled ? "bg-primary/10" : "bg-muted/40"
              }`}>
                {slot.profile ? (
                  <img src={slot.profile.photo} alt={slot.profile.name} className="w-10 h-10 rounded-xl object-cover" />
                ) : slot.filled ? (
                  <slot.icon className="w-4 h-4 text-primary" />
                ) : (
                  <Plus className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground">
                  {slot.profile ? slot.profile.name : slot.role}
                </p>
                <p className="text-[10px] text-muted-foreground">{slot.type}</p>
                {slot.equity && (
                  <p className="text-[9px] text-primary font-medium">Equity: {slot.equity}%</p>
                )}
              </div>
              {!slot.filled && (
                <Button size="sm" variant="outline" className="text-[10px] border-primary/30 text-primary h-7 px-2" onClick={onFindMembers}>
                  Find
                </Button>
              )}
              {slot.filled && !slot.profile && (
                <span className="text-[9px] text-primary font-semibold px-2 py-0.5 rounded-full bg-primary/10">You</span>
              )}
              {slot.commitment && (
                <span className="text-[9px] text-muted-foreground">{slot.commitment}</span>
              )}
            </div>
          ))}
        </div>

        {/* Missing roles */}
        {MISSING_ROLES.length > 0 && (
          <div className="rounded-xl bg-destructive/5 border border-destructive/20 p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <AlertCircle className="w-3.5 h-3.5 text-destructive" />
              <p className="text-xs font-semibold text-foreground">Missing Roles</p>
            </div>
            <div className="space-y-1.5">
              {MISSING_ROLES.map((role) => (
                <div key={role} className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground">{role}</span>
                  <Button size="sm" variant="ghost" className="text-[10px] text-primary h-6 px-2" onClick={onFindMembers}>
                    Search
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button
            className="flex-1 bg-primary text-primary-foreground text-xs"
            onClick={onFindMembers}
          >
            <Search className="w-3.5 h-3.5 mr-1.5" />
            Find Team Members
          </Button>
          <Button
            variant="outline"
            className="flex-1 text-xs border-border"
            onClick={() => setShowInvite(!showInvite)}
          >
            <Mail className="w-3.5 h-3.5 mr-1.5" />
            Invite via Email
          </Button>
        </div>

        {/* Invite form */}
        {showInvite && (
          <div className="rounded-xl bg-card border border-border p-3 space-y-2.5">
            <p className="text-xs font-semibold text-foreground">Invite Team Member</p>
            <input placeholder="Name" className="w-full text-xs px-3 py-2 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50" />
            <input placeholder="Email" className="w-full text-xs px-3 py-2 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50" />
            <input placeholder="Role" className="w-full text-xs px-3 py-2 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50" />
            <Button className="w-full bg-primary text-primary-foreground text-xs">
              <Mail className="w-3.5 h-3.5 mr-1.5" />
              Send Invitation
            </Button>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
