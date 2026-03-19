import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MapPin, Rocket, Clock, Code, Briefcase,
  Zap, Crown, Users,
} from "lucide-react";

import { PremiumCard } from "./premium/PremiumCard";
import { FilterCheckboxList, FilterChips, FilterLabel } from "./premium/PremiumFilterInputs";
import { ModeSelector } from "./ModeSelector";
import {
  type MatchingMode,
  INDUSTRIES,
  WORK_ARRANGEMENTS,
  COFOUNDER_SKILL_STRENGTHS, COFOUNDER_COMMITMENTS,
  TEAM_ROLES_NEEDED, TEAM_SKILL_STACK, TEAM_COMMITMENTS,
  STARTUP_STAGES, STARTUP_ROLES_NEEDED,
  FOUNDER_TYPES,
  PREMIUM_CONFIGS,
} from "./ModeConfig";

export interface PremiumFilterState {
  location: string;
  distance: number;
  workArrangement: string[];
  lookingFor: string[];
  stage: string[];
  commitment: string[];
  skills: string[];
  industry: string[];
  teamPref: string;
  minMatch: number;
  // Premium dynamic
  aiPriority: string[];
  aiExplainMatch: boolean;
  [key: string]: any; // dynamic premium keys per mode
}

interface PremiumFilterPanelProps {
  onGenerate: (filters: PremiumFilterState) => void;
  activeMode: MatchingMode;
  onModeChange: (mode: MatchingMode) => void;
}

// ===== Collapsible core section =====
function CoreSection({ title, icon: Icon, children, defaultOpen = false }: {
  title: string; icon: any; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border/20 pb-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-1.5 text-xs font-medium text-foreground hover:text-primary transition-colors"
      >
        <span className="flex items-center gap-1.5">
          <Icon className="w-3.5 h-3.5 text-primary" />
          {title}
        </span>
        <svg className={`w-3 h-3 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 12 12" fill="none">
          <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && <div className="pt-1.5 space-y-1.5">{children}</div>}
    </div>
  );
}

// ===== Location Section =====
function LocationSection({ filters, update }: {
  filters: PremiumFilterState;
  update: (key: string, val: any) => void;
}) {
  const isRemote = (filters.workArrangement || []).includes("Remote");
  return (
    <CoreSection title="Location & Availability" icon={MapPin}>
      {/* Work Arrangement */}
      <div className="mb-2">
        <span className="text-[10px] text-muted-foreground mb-1 block">Work Arrangement</span>
        <div className="flex gap-1.5">
          {WORK_ARRANGEMENTS.map((opt) => {
            const active = (filters.workArrangement || []).includes(opt);
            return (
              <button
                key={opt}
                onClick={() => {
                  const curr = filters.workArrangement || [];
                  const next = active ? curr.filter((s: string) => s !== opt) : [...curr, opt];
                  update("workArrangement", next);
                }}
                className={`flex-1 text-[10px] py-1.5 rounded-lg border font-medium transition-all ${
                  active
                    ? "bg-primary/20 text-primary border-primary/50"
                    : "bg-background/50 border-border/50 text-muted-foreground hover:border-primary/30"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
        {isRemote && (
          <p className="text-[9px] text-primary mt-1 font-medium">✓ Available for remote work</p>
        )}
      </div>
      <Input
        placeholder="Enter city or country..."
        value={filters.location}
        onChange={(e) => update("location", e.target.value)}
        className="h-7 text-[11px] bg-background/50 border-border/50 placeholder:text-muted-foreground/40 rounded-lg"
      />
      <div className="pt-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-muted-foreground">Distance</span>
          <span className="text-[10px] font-semibold text-primary">{filters.distance} km</span>
        </div>
        <Slider value={[filters.distance]} onValueChange={([v]) => update("distance", v)} min={0} max={100} step={5} />
      </div>
    </CoreSection>
  );
}

// ===== Mode-specific free filters =====

function FounderCofounderFreeFilters({ filters, update }: {
  filters: PremiumFilterState; update: (key: string, val: any) => void;
}) {
  return (
    <>
      <LocationSection filters={filters} update={update} />
      <CoreSection title="Industry" icon={Briefcase}>
        <FilterCheckboxList options={INDUSTRIES} selected={filters.industry} onChange={(v) => update("industry", v)} searchable placeholder="Search industries..." />
      </CoreSection>
      <CoreSection title="Skill Strength" icon={Code} defaultOpen>
        <FilterChips options={COFOUNDER_SKILL_STRENGTHS} selected={filters.skills} onChange={(v) => update("skills", v)} />
      </CoreSection>
      <CoreSection title="Commitment" icon={Clock}>
        <FilterChips options={COFOUNDER_COMMITMENTS} selected={filters.commitment} onChange={(v) => update("commitment", v)} />
      </CoreSection>
    </>
  );
}

function FounderTeamFreeFilters({ filters, update }: {
  filters: PremiumFilterState; update: (key: string, val: any) => void;
}) {
  return (
    <>
      <LocationSection filters={filters} update={update} />
      <CoreSection title="Role Needed" icon={Users} defaultOpen>
        <FilterChips options={TEAM_ROLES_NEEDED} selected={filters.skills} onChange={(v) => update("skills", v)} />
      </CoreSection>
      <CoreSection title="Skill Stack" icon={Code}>
        <FilterCheckboxList options={TEAM_SKILL_STACK} selected={filters.industry} onChange={(v) => update("industry", v)} searchable placeholder="Search skills..." />
      </CoreSection>
      <CoreSection title="Commitment" icon={Clock}>
        <FilterChips options={TEAM_COMMITMENTS} selected={filters.commitment} onChange={(v) => update("commitment", v)} />
      </CoreSection>
    </>
  );
}

function TeamStartupFreeFilters({ filters, update }: {
  filters: PremiumFilterState; update: (key: string, val: any) => void;
}) {
  return (
    <>
      <CoreSection title="Startup Stage" icon={Rocket} defaultOpen>
        <FilterChips options={STARTUP_STAGES} selected={filters.stage} onChange={(v) => update("stage", v)} />
      </CoreSection>
      <CoreSection title="Industry" icon={Briefcase}>
        <FilterCheckboxList options={INDUSTRIES} selected={filters.industry} onChange={(v) => update("industry", v)} searchable placeholder="Search industries..." />
      </CoreSection>
      <LocationSection filters={filters} update={update} />
      <CoreSection title="Role Needed" icon={Users}>
        <FilterChips options={STARTUP_ROLES_NEEDED} selected={filters.skills} onChange={(v) => update("skills", v)} />
      </CoreSection>
    </>
  );
}

function CofounderStartupFreeFilters({ filters, update }: {
  filters: PremiumFilterState; update: (key: string, val: any) => void;
}) {
  return (
    <>
      <CoreSection title="Startup Stage" icon={Rocket} defaultOpen>
        <FilterChips options={STARTUP_STAGES} selected={filters.stage} onChange={(v) => update("stage", v)} />
      </CoreSection>
      <CoreSection title="Industry" icon={Briefcase}>
        <FilterCheckboxList options={INDUSTRIES} selected={filters.industry} onChange={(v) => update("industry", v)} searchable placeholder="Search industries..." />
      </CoreSection>
      <CoreSection title="Founder Type" icon={Users}>
        <FilterChips options={FOUNDER_TYPES} selected={filters.skills} onChange={(v) => update("skills", v)} />
      </CoreSection>
      <LocationSection filters={filters} update={update} />
    </>
  );
}

// ===== Main PremiumFilterPanel =====
export function PremiumFilterPanel({ onGenerate, activeMode, onModeChange }: PremiumFilterPanelProps) {
  const [filters, setFilters] = useState<PremiumFilterState>({
    location: "",
    distance: 50,
    workArrangement: [],
    lookingFor: [],
    stage: [],
    commitment: [],
    skills: [],
    industry: [],
    teamPref: "",
    minMatch: 70,
    aiPriority: [],
    aiExplainMatch: false,
  });

  const update = (key: string, val: any) => {
    setFilters((prev) => ({ ...prev, [key]: val }));
  };

  const handleModeChange = (mode: MatchingMode) => {
    setFilters((prev) => ({
      ...prev,
      lookingFor: [],
      stage: [],
      commitment: [],
      skills: [],
      industry: [],
      aiPriority: [],
    }));
    onModeChange(mode);
  };

  const premiumCards = PREMIUM_CONFIGS[activeMode];

  const renderFreeFilters = () => {
    switch (activeMode) {
      case "founder-cofounder":
        return <FounderCofounderFreeFilters filters={filters} update={update} />;
      case "founder-team":
        return <FounderTeamFreeFilters filters={filters} update={update} />;
      case "team-startup":
        return <TeamStartupFreeFilters filters={filters} update={update} />;
      case "cofounder-startup":
        return <CofounderStartupFreeFilters filters={filters} update={update} />;
    }
  };

  const renderPremiumField = (field: any) => {
    const value = filters[field.key];
    if (field.type === "slider") {
      return (
        <div key={field.key}>
          <div className="flex items-center justify-between mb-1.5">
            <FilterLabel>{field.label}</FilterLabel>
            <span className="text-xs font-bold text-primary">{value ?? field.min}%</span>
          </div>
          <Slider
            value={[value ?? field.min]}
            onValueChange={([v]) => update(field.key, v)}
            min={field.min} max={field.max} step={field.step}
          />
          <div className="flex justify-between mt-0.5">
            <span className="text-[9px] text-muted-foreground/50">{field.min}%</span>
            <span className="text-[9px] text-muted-foreground/50">{field.max}%</span>
          </div>
        </div>
      );
    }
    if (field.type === "checkbox") {
      return (
        <div key={field.key}>
          <FilterLabel>{field.label}</FilterLabel>
          <div className="mt-1.5">
            <FilterCheckboxList
              options={field.options || []}
              selected={Array.isArray(value) ? value : []}
              onChange={(v) => update(field.key, v)}
              maxVisible={8}
            />
          </div>
        </div>
      );
    }
    if (field.type === "chips") {
      return (
        <div key={field.key}>
          <FilterLabel>{field.label}</FilterLabel>
          <div className="mt-1.5">
            <FilterChips
              options={field.options || []}
              selected={Array.isArray(value) ? value : []}
              onChange={(v) => update(field.key, v)}
            />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <Crown className="w-4 h-4 text-primary" />
          <h2 className="font-display text-sm font-bold text-foreground">Premium Filters</h2>
        </div>
        <p className="text-[10px] text-muted-foreground leading-relaxed">
          Advanced match intelligence for better startup connections
        </p>
      </div>

      <ScrollArea className="flex-1 -mx-1 px-1">
        <div className="space-y-2 pr-1">
          {/* Mode Selector */}
          <ModeSelector activeMode={activeMode} onModeChange={handleModeChange} />

          {/* Mode-specific free filters */}
          {renderFreeFilters()}

          {/* Premium Cards */}
          <div className="pt-3 pb-1">
            <p className="text-[9px] font-bold text-primary/60 uppercase tracking-widest mb-2">Premium Intelligence</p>
          </div>

          {premiumCards.map((card, idx) => (
            <PremiumCard
              key={`${activeMode}-${card.id}`}
              icon={card.icon}
              title={card.title}
              subtitle={card.subtitle}
              defaultOpen={idx === 0}
            >
              <div className="space-y-3">
                {card.fields.map(renderPremiumField)}

                {/* AI Explain toggle only on first card with AI in name */}
                {idx === 0 && card.title.includes("AI") && (
                  <div className={`flex items-center justify-between py-1.5 px-2 rounded-lg transition-all duration-300 ${
                    filters.aiExplainMatch
                      ? "bg-primary/10 border border-primary/30"
                      : "bg-background/30 border border-transparent"
                  }`}>
                    <div>
                      <p className={`text-[11px] font-medium transition-colors duration-300 ${
                        filters.aiExplainMatch ? "text-primary" : "text-foreground"
                      }`}>AI Explain Why Match</p>
                      <p className={`text-[9px] transition-colors duration-300 ${
                        filters.aiExplainMatch ? "text-primary/70" : "text-muted-foreground"
                      }`}>
                        {filters.aiExplainMatch ? "✓ AI reasoning visible on cards" : "Show AI reasoning on cards"}
                      </p>
                    </div>
                    <Switch checked={filters.aiExplainMatch} onCheckedChange={(v) => update("aiExplainMatch", v)} className="scale-75" />
                  </div>
                )}
              </div>
            </PremiumCard>
          ))}
        </div>
      </ScrollArea>

      {/* Premium Active Benefits */}
      <div className="pt-2 pb-1">
        <div className="rounded-xl bg-accent/5 border border-accent/20 p-2.5 mb-2">
          <div className="flex flex-wrap gap-1.5">
            {[
              { icon: "👀", text: "Full Liked You" },
              { icon: "⚡", text: "Priority Feed" },
              { icon: "🧠", text: "AI Explanations" },
              { icon: "↩️", text: "Undo Swipe" },
              { icon: "📅", text: "30-Day Window" },
              { icon: "✨", text: "2 Spotlights/mo" },
            ].map((b) => (
              <span key={b.text} className="text-[8px] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 font-medium flex items-center gap-0.5">
                <span>{b.icon}</span>{b.text}
              </span>
            ))}
          </div>
        </div>
        <Button
          className="w-full h-10 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold text-xs shadow-lg shadow-primary/15"
          onClick={() => onGenerate(filters)}
        >
          <Zap className="w-3.5 h-3.5 mr-1.5" />
          Generate Candidates
        </Button>
      </div>
    </div>
  );
}
