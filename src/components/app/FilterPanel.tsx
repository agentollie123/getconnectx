import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MapPin, Rocket, Clock, Code, Briefcase,
  Lock, ChevronDown, ChevronUp, Zap, TrendingUp,
  Crown, Users,
} from "lucide-react";
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

interface FilterPanelProps {
  onGenerate: (filters: FilterState) => void;
  activeMode: MatchingMode;
  onModeChange: (mode: MatchingMode) => void;
}

export interface FilterState {
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
}

// ===== Reusable sub-components =====

function Section({ title, icon: Icon, children, defaultOpen = false }: {
  title: string; icon: any; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border/30 pb-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-1.5 text-xs font-medium text-foreground hover:text-primary transition-colors"
      >
        <span className="flex items-center gap-1.5">
          <Icon className="w-3.5 h-3.5 text-primary" />
          {title}
        </span>
        {open ? <ChevronUp className="w-3 h-3 text-muted-foreground" /> : <ChevronDown className="w-3 h-3 text-muted-foreground" />}
      </button>
      {open && <div className="pt-1.5 space-y-1.5">{children}</div>}
    </div>
  );
}

function Tags({ options, selected, onChange }: {
  options: string[]; selected: string[]; onChange: (v: string[]) => void;
}) {
  const toggle = (v: string) => {
    onChange(selected.includes(v) ? selected.filter((s) => s !== v) : [...selected, v]);
  };
  return (
    <div className="flex flex-wrap gap-1">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => toggle(o)}
          className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${
            selected.includes(o)
              ? "bg-primary/20 text-primary border-primary/40"
              : "bg-card border-border text-muted-foreground hover:border-primary/30"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function CheckboxList({ options, selected, onChange }: {
  options: string[]; selected: string[]; onChange: (v: string[]) => void;
}) {
  const [search, setSearch] = useState("");
  const filtered = options.filter((o) => o.toLowerCase().includes(search.toLowerCase()));
  const toggle = (v: string) => {
    onChange(selected.includes(v) ? selected.filter((s) => s !== v) : [...selected, v]);
  };
  return (
    <div className="space-y-1.5">
      <Input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="h-6 text-[10px] bg-card border-border placeholder:text-muted-foreground/50"
      />
      <div className="max-h-28 overflow-y-auto space-y-0.5 pr-1">
        {filtered.map((o) => (
          <label
            key={o}
            className="flex items-center gap-1.5 py-0.5 px-1 rounded hover:bg-muted/30 cursor-pointer transition-colors"
          >
            <input
              type="checkbox"
              checked={selected.includes(o)}
              onChange={() => toggle(o)}
              className="h-3 w-3 rounded border-border text-primary accent-primary"
            />
            <span className="text-[10px] text-foreground">{o}</span>
          </label>
        ))}
        {filtered.length === 0 && (
          <p className="text-[9px] text-muted-foreground py-1">No results</p>
        )}
      </div>
    </div>
  );
}

// ===== Location Section (shared across all modes) =====
function LocationSection({ filters, update }: {
  filters: FilterState;
  update: <K extends keyof FilterState>(key: K, val: FilterState[K]) => void;
}) {
  const isRemote = filters.workArrangement.includes("Remote");
  return (
    <Section title="Location & Availability" icon={MapPin} defaultOpen>
      {/* Work Arrangement */}
      <div className="mb-2">
        <span className="text-[10px] text-muted-foreground mb-1 block">Work Arrangement</span>
        <div className="flex gap-1.5">
          {WORK_ARRANGEMENTS.map((opt) => {
            const active = filters.workArrangement.includes(opt);
            return (
              <button
                key={opt}
                onClick={() => {
                  const next = active
                    ? filters.workArrangement.filter((s) => s !== opt)
                    : [...filters.workArrangement, opt];
                  update("workArrangement", next);
                }}
                className={`flex-1 text-[10px] py-1.5 rounded-lg border font-medium transition-all ${
                  active
                    ? "bg-primary/20 text-primary border-primary/50"
                    : "bg-card border-border text-muted-foreground hover:border-primary/30"
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
        className="h-7 text-[11px] bg-card border-border placeholder:text-muted-foreground/50"
      />
      <div className="pt-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-muted-foreground">Distance</span>
          <span className="text-[10px] font-bold text-primary">{filters.distance} km</span>
        </div>
        <Slider
          value={[filters.distance]}
          onValueChange={([v]) => update("distance", v)}
          min={0} max={100} step={5}
          className="w-full"
        />
        <div className="flex justify-between mt-0.5">
          <span className="text-[9px] text-muted-foreground">0 km</span>
          <span className="text-[9px] text-muted-foreground">100 km</span>
        </div>
      </div>
    </Section>
  );
}

// ===== Mode-specific free filters =====

function FounderCofounderFilters({ filters, update }: {
  filters: FilterState;
  update: <K extends keyof FilterState>(key: K, val: FilterState[K]) => void;
}) {
  return (
    <>
      <LocationSection filters={filters} update={update} />
      <Section title="Industry" icon={Briefcase}>
        <CheckboxList options={INDUSTRIES} selected={filters.industry} onChange={(v) => update("industry", v)} />
      </Section>
      <Section title="Skill Strength" icon={Code}>
        <Tags options={COFOUNDER_SKILL_STRENGTHS} selected={filters.skills} onChange={(v) => update("skills", v)} />
      </Section>
      <Section title="Commitment" icon={Clock}>
        <Tags options={COFOUNDER_COMMITMENTS} selected={filters.commitment} onChange={(v) => update("commitment", v)} />
      </Section>
    </>
  );
}

function FounderTeamFilters({ filters, update }: {
  filters: FilterState;
  update: <K extends keyof FilterState>(key: K, val: FilterState[K]) => void;
}) {
  return (
    <>
      <LocationSection filters={filters} update={update} />
      <Section title="Role Needed" icon={Users} defaultOpen>
        <Tags options={TEAM_ROLES_NEEDED} selected={filters.skills} onChange={(v) => update("skills", v)} />
      </Section>
      <Section title="Skill Stack" icon={Code}>
        <CheckboxList options={TEAM_SKILL_STACK} selected={filters.industry} onChange={(v) => update("industry", v)} />
      </Section>
      <Section title="Commitment" icon={Clock}>
        <Tags options={TEAM_COMMITMENTS} selected={filters.commitment} onChange={(v) => update("commitment", v)} />
      </Section>
    </>
  );
}

function TeamStartupFilters({ filters, update }: {
  filters: FilterState;
  update: <K extends keyof FilterState>(key: K, val: FilterState[K]) => void;
}) {
  return (
    <>
      <Section title="Startup Stage" icon={Rocket} defaultOpen>
        <Tags options={STARTUP_STAGES} selected={filters.stage} onChange={(v) => update("stage", v)} />
      </Section>
      <Section title="Industry" icon={Briefcase}>
        <CheckboxList options={INDUSTRIES} selected={filters.industry} onChange={(v) => update("industry", v)} />
      </Section>
      <LocationSection filters={filters} update={update} />
      <Section title="Role Needed" icon={Users}>
        <Tags options={STARTUP_ROLES_NEEDED} selected={filters.skills} onChange={(v) => update("skills", v)} />
      </Section>
    </>
  );
}

function CofounderStartupFilters({ filters, update }: {
  filters: FilterState;
  update: <K extends keyof FilterState>(key: K, val: FilterState[K]) => void;
}) {
  return (
    <>
      <Section title="Startup Stage" icon={Rocket} defaultOpen>
        <Tags options={STARTUP_STAGES} selected={filters.stage} onChange={(v) => update("stage", v)} />
      </Section>
      <Section title="Industry" icon={Briefcase}>
        <CheckboxList options={INDUSTRIES} selected={filters.industry} onChange={(v) => update("industry", v)} />
      </Section>
      <Section title="Founder Type" icon={Users}>
        <Tags options={FOUNDER_TYPES} selected={filters.skills} onChange={(v) => update("skills", v)} />
      </Section>
      <LocationSection filters={filters} update={update} />
    </>
  );
}

// ===== Main FilterPanel =====
export function FilterPanel({ onGenerate, activeMode, onModeChange }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    location: "",
    distance: 50,
    workArrangement: [],
    lookingFor: [],
    stage: [],
    commitment: [],
    skills: [],
    industry: [],
    teamPref: "",
    minMatch: 50,
  });

  const update = <K extends keyof FilterState>(key: K, val: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: val }));
  };

  // Reset filters when mode changes
  const handleModeChange = (mode: MatchingMode) => {
    setFilters({
      location: filters.location,
      distance: filters.distance,
      lookingFor: [],
      stage: [],
      commitment: [],
      skills: [],
      industry: [],
      teamPref: "",
      minMatch: 50,
    });
    onModeChange(mode);
  };

  const premiumCards = PREMIUM_CONFIGS[activeMode];

  const renderFreeFilters = () => {
    switch (activeMode) {
      case "founder-cofounder":
        return <FounderCofounderFilters filters={filters} update={update} />;
      case "founder-team":
        return <FounderTeamFilters filters={filters} update={update} />;
      case "team-startup":
        return <TeamStartupFilters filters={filters} update={update} />;
      case "cofounder-startup":
        return <CofounderStartupFilters filters={filters} update={update} />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="font-display text-sm font-bold text-foreground mb-3">
        Filters & Preferences
      </h2>

      <ScrollArea className="flex-1 -mx-1 px-1">
        <div className="space-y-0.5 pr-1">
          {/* Mode Selector */}
          <ModeSelector activeMode={activeMode} onModeChange={handleModeChange} />

          {/* Mode-specific free filters */}
          {renderFreeFilters()}

          {/* Locked Premium Filters */}
          <div className="pt-3 pb-1">
            <p className="text-[9px] font-bold text-primary/60 uppercase tracking-widest mb-2">Premium Intelligence</p>
          </div>

          {premiumCards.map((card) => (
            <div key={card.id} className="rounded-xl bg-muted/20 border border-border/30 p-3 mb-1.5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                  <card.icon className="w-3 h-3 text-primary/50" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-foreground/50">{card.title}</span>
                    <Lock className="w-2.5 h-2.5 text-muted-foreground/40" />
                  </div>
                  <p className="text-[9px] text-muted-foreground/40">{card.subtitle}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {card.fields.map((field) => (
                  <span
                    key={field.key}
                    className="text-[9px] px-2 py-0.5 rounded-full border border-border/30 bg-muted/10 text-muted-foreground/30 flex items-center gap-1 cursor-not-allowed"
                  >
                    {field.label}
                    <Lock className="w-2 h-2" />
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Min Match */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-foreground flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-primary" />
                Min Match
              </span>
              <span className="text-xs font-bold text-primary">{filters.minMatch}%</span>
            </div>
            <Slider
              value={[filters.minMatch]}
              onValueChange={([v]) => update("minMatch", v)}
              min={50} max={100} step={5}
              className="w-full"
            />
          </div>

          {/* Premium Upsell — Value Props */}
          <div className="mt-4 rounded-xl border border-accent/30 bg-gradient-to-br from-accent/5 to-primary/5 p-3.5 space-y-2.5">
            <div className="flex items-center gap-2 mb-1">
              <Crown className="w-4 h-4 text-accent" />
              <span className="text-xs font-bold text-foreground">Premium Advantage</span>
            </div>
            <p className="text-[10px] text-muted-foreground leading-relaxed mb-2">
              Meet stronger people, faster.
            </p>
            <div className="space-y-1.5">
              {[
                { icon: "👀", label: "See who's already interested in you", sub: "Blurred for free users" },
                { icon: "⚡", label: "Stronger profiles shown first", sub: "Priority feed placement" },
                { icon: "🧠", label: "AI explains why you match", sub: "Match intelligence on every card" },
                { icon: "↩️", label: "Undo last swipe", sub: "Never lose a great connection" },
                { icon: "📅", label: "30-day match window", sub: "vs 7 days for free" },
                { icon: "✨", label: "2 GetConnect Spotlights / month", sub: "Boost your visibility" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-2 py-1 px-2 rounded-lg bg-background/30">
                  <span className="text-sm mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-[10px] font-semibold text-foreground">{item.label}</p>
                    <p className="text-[8px] text-muted-foreground">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="pt-3">
        <Button
          className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold text-xs"
          onClick={() => onGenerate(filters)}
        >
          <Zap className="w-3.5 h-3.5 mr-1.5" />
          Generate Candidates
        </Button>
      </div>
    </div>
  );
}
