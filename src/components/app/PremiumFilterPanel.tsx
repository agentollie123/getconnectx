import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MapPin, Search, Rocket, Clock, Code, Briefcase,
  ChevronDown, ChevronUp, Zap, TrendingUp, Crown,
  GraduationCap, Banknote, Users, Calendar,
} from "lucide-react";

interface PremiumFilterPanelProps {
  onGenerate: (filters: PremiumFilterState) => void;
}

export interface PremiumFilterState {
  location: string;
  distance: number;
  lookingFor: string[];
  stage: string[];
  commitment: string[];
  skills: string[];
  industry: string[];
  teamPref: string;
  minMatch: number;
  ageRange: [number, number];
  startupExperience: string[];
  education: string[];
  investorNetwork: string[];
  previousExit: string;
}

const LOCATIONS = ["Anywhere", "Same City", "Same Country", "Remote Friendly"];
const LOOKING_FOR = [
  "Founder → Co-Founder", "Founder → Team", "Co-Founder → Startup",
  "Team Member → Startup",
];
const STAGES = ["Idea", "MVP", "Beta", "Early Traction", "Scaling"];
const COMMITMENTS = ["Side Project", "Part-time", "Full-time", "Open to discussion"];
const SKILLS = [
  "AI / ML", "Full-Stack", "Mobile Dev", "Product Mgmt",
  "UI / UX", "Growth", "Sales", "Blockchain", "DevOps", "Cybersecurity",
];
const INDUSTRIES = [
  "AI", "Fintech", "Healthtech", "EdTech", "Web3",
  "SaaS", "Marketplace", "Gaming", "Climate Tech",
];
const EXPERIENCE_LEVELS = ["First-time Founder", "1 Startup", "2-3 Startups", "Serial Entrepreneur", "Corporate → Startup"];
const EDUCATION_OPTIONS = ["Any", "Top 50 University", "MBA", "PhD / Research", "Self-taught", "Bootcamp Graduate"];
const INVESTOR_NETWORK = ["None", "Angel Investors", "VC Connected", "Accelerator Alumni", "YC / Techstars"];
const EXIT_OPTIONS = ["Any", "No Exit Yet", "Small Exit (<$1M)", "Medium Exit ($1M-$10M)", "Large Exit ($10M+)"];

function Section({ title, icon: Icon, children, defaultOpen = false, premium = false }: {
  title: string; icon: any; children: React.ReactNode; defaultOpen?: boolean; premium?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border/30 pb-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-1.5 text-xs font-medium text-foreground hover:text-primary transition-colors"
      >
        <span className="flex items-center gap-1.5">
          <Icon className={`w-3.5 h-3.5 ${premium ? "text-accent" : "text-primary"}`} />
          {title}
          {premium && (
            <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-accent/20 text-accent font-bold uppercase tracking-wider">Premium</span>
          )}
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

function PremiumTags({ options, selected, onChange }: {
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
              ? "bg-accent/20 text-accent border-accent/40"
              : "bg-card border-border text-muted-foreground hover:border-accent/30"
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

function PremiumRadio({ options, selected, onChange }: {
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
              ? "bg-accent/20 text-accent border-accent/40"
              : "bg-card border-border text-muted-foreground hover:border-accent/30"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function PremiumFilterPanel({ onGenerate }: PremiumFilterPanelProps) {
  const [filters, setFilters] = useState<PremiumFilterState>({
    location: "",
    distance: 50,
    lookingFor: [],
    stage: [],
    commitment: [],
    skills: [],
    industry: [],
    teamPref: "",
    minMatch: 50,
    ageRange: [20, 45],
    startupExperience: [],
    education: [],
    investorNetwork: [],
    previousExit: "",
  });

  const update = <K extends keyof PremiumFilterState>(key: K, val: PremiumFilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <Crown className="w-4 h-4 text-accent" />
        <h2 className="font-display text-sm font-bold text-foreground">
          Premium Filters
        </h2>
        <span className="text-[8px] px-2 py-0.5 rounded-full bg-gradient-to-r from-accent/20 to-primary/20 text-accent font-bold uppercase tracking-wider border border-accent/30">
          All Unlocked
        </span>
      </div>

      <ScrollArea className="flex-1 -mx-1 px-1">
        <div className="space-y-0.5 pr-1">
          {/* Standard filters */}
          <Section title="Location" icon={MapPin} defaultOpen>
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
                min={0}
                max={100}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between mt-0.5">
                <span className="text-[9px] text-muted-foreground">0 km</span>
                <span className="text-[9px] text-muted-foreground">100 km</span>
              </div>
            </div>
            <Radio options={LOCATIONS} selected={filters.teamPref} onChange={(v) => update("teamPref", v)} />
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

          {/* Premium filters - unlocked */}
          <Section title="Age Range" icon={Calendar} premium>
            <div className="pt-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-muted-foreground">Age</span>
                <span className="text-[10px] font-bold text-accent">{filters.ageRange[0]} - {filters.ageRange[1]} years</span>
              </div>
              <Slider
                value={filters.ageRange}
                onValueChange={(v) => update("ageRange", v as [number, number])}
                min={18}
                max={65}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between mt-0.5">
                <span className="text-[9px] text-muted-foreground">18</span>
                <span className="text-[9px] text-muted-foreground">65</span>
              </div>
            </div>
          </Section>

          <Section title="Startup Experience" icon={Rocket} premium>
            <PremiumTags options={EXPERIENCE_LEVELS} selected={filters.startupExperience} onChange={(v) => update("startupExperience", v)} />
          </Section>

          <Section title="Education" icon={GraduationCap} premium>
            <PremiumTags options={EDUCATION_OPTIONS} selected={filters.education} onChange={(v) => update("education", v)} />
          </Section>

          <Section title="Investor Network" icon={Banknote} premium>
            <PremiumTags options={INVESTOR_NETWORK} selected={filters.investorNetwork} onChange={(v) => update("investorNetwork", v)} />
          </Section>

          <Section title="Previous Exit" icon={TrendingUp} premium>
            <PremiumRadio options={EXIT_OPTIONS} selected={filters.previousExit} onChange={(v) => update("previousExit", v)} />
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
          className="w-full bg-gradient-to-r from-accent to-primary text-primary-foreground font-semibold text-xs"
          onClick={() => onGenerate(filters as any)}
        >
          <Zap className="w-3.5 h-3.5 mr-1.5" />
          Generate Premium Matches
        </Button>
      </div>
    </div>
  );
}
