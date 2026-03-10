import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MapPin, Search, Rocket, Clock, Code, Briefcase,
  Lock, ChevronDown, ChevronUp, Zap, TrendingUp, Users,
} from "lucide-react";

interface FilterPanelProps {
  onGenerate: (filters: FilterState) => void;
}

export interface FilterState {
  location: string;
  lookingFor: string[];
  stage: string[];
  commitment: string[];
  skills: string[];
  industry: string[];
  teamPref: string;
  minMatch: number;
}

const LOCATIONS = ["Anywhere", "Same City", "Same Country", "Remote Friendly"];
const DISTANCES = ["10 km", "25 km", "50 km", "100 km", "Remote"];
const LOOKING_FOR = [
  "Founder → Co-Founder", "Founder → Team", "Co-Founder → Startup",
  "Team Member → Startup",
];
const STAGES = ["Idea", "MVP", "Beta", "Early Traction", "Scaling"];
const COMMITMENTS = ["Side Project", "Part-time", "Full-time", "Open to discussion"];
const SKILLS = [
  "AI / ML", "Full-Stack", "Mobile Dev", "Product Mgmt",
  "UI / UX", "Growth", "Sales", "Blockchain", "DevOps",
];
const INDUSTRIES = [
  "AI", "Fintech", "Healthtech", "EdTech", "Web3",
  "SaaS", "Marketplace", "Gaming", "Climate Tech",
];
const PREMIUM_FILTERS = ["Age Range", "Startup Experience", "Education", "Investor Network", "Previous Exit"];

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

function Radio({ options, selected, onChange }: {
  options: string[]; selected: string; onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(selected === o ? "" : o)}
          className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${
            selected === o
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

export function FilterPanel({ onGenerate }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    location: "",
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

  return (
    <div className="h-full flex flex-col">
      <h2 className="font-display text-sm font-bold text-foreground mb-3">
        Filters & Preferences
      </h2>

      <ScrollArea className="flex-1 -mx-1 px-1">
        <div className="space-y-0.5 pr-1">
          <Section title="Location" icon={MapPin} defaultOpen>
            <Radio options={LOCATIONS} selected={filters.location} onChange={(v) => update("location", v)} />
            <div className="flex flex-wrap gap-1 mt-1">
              {DISTANCES.map((d) => (
                <span key={d} className="text-[9px] px-1.5 py-0.5 rounded-full border border-border text-muted-foreground">{d}</span>
              ))}
            </div>
          </Section>

          <Section title="Looking For" icon={Search} defaultOpen>
            <Tags options={LOOKING_FOR} selected={filters.lookingFor} onChange={(v) => update("lookingFor", v)} />
          </Section>

          <Section title="Startup Stage" icon={Rocket}>
            <Tags options={STAGES} selected={filters.stage} onChange={(v) => update("stage", v)} />
          </Section>

          <Section title="Commitment" icon={Clock}>
            <Tags options={COMMITMENTS} selected={filters.commitment} onChange={(v) => update("commitment", v)} />
          </Section>

          <Section title="Skills" icon={Code}>
            <Tags options={SKILLS} selected={filters.skills} onChange={(v) => update("skills", v)} />
          </Section>

          <Section title="Industry" icon={Briefcase}>
            <Tags options={INDUSTRIES} selected={filters.industry} onChange={(v) => update("industry", v)} />
          </Section>

          {/* Premium filters */}
          <Section title="Premium Filters" icon={Lock}>
            <div className="flex flex-wrap gap-1">
              {PREMIUM_FILTERS.map((f) => (
                <span key={f} className="text-[9px] px-2 py-0.5 rounded-full border border-border text-muted-foreground/40 flex items-center gap-0.5">
                  <Lock className="w-2.5 h-2.5" /> {f}
                </span>
              ))}
            </div>
            <p className="text-[9px] text-primary mt-1 cursor-pointer hover:underline">Upgrade to ConnectX Premium →</p>
          </Section>

          {/* Match score */}
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
              min={50}
              max={100}
              step={5}
              className="w-full"
            />
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
