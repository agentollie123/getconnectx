import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MapPin, Search, Rocket, Clock, Users, Briefcase, Code, TrendingUp,
  Lock, ChevronDown, ChevronUp, Zap, Filter,
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
const LOOKING_FOR = [
  "Co-Founder", "Technical Co-Founder", "Business Co-Founder", "Startup Founder",
  "Startup Team Members", "AI Engineer", "Product Builder", "Designer", "Growth Marketer", "Operations",
];
const STAGES = ["Idea Stage", "Pre-MVP", "MVP Stage", "Early Revenue", "Growth Stage"];
const COMMITMENTS = ["Exploring", "Side Project", "Part-time Startup", "Full-time Startup"];
const SKILLS = [
  "AI / Machine Learning", "Backend Engineering", "Frontend Engineering", "Mobile Development",
  "Data Science", "Product Management", "UI / UX Design", "Growth Marketing", "Sales", "Operations", "Finance",
];
const INDUSTRIES = [
  "Artificial Intelligence", "Fintech", "Climate Tech", "HealthTech", "EdTech",
  "SaaS", "Consumer Apps", "Marketplace", "Gaming", "Web3", "Enterprise Software",
];
const TEAM_PREFS = [
  "Solo founder looking for co-founder", "Existing founding team",
  "Early startup team", "Looking to join startup",
];
const PREMIUM_FILTERS = ["Age Range", "Equity Preference", "Startup Experience", "Education", "Investor Network"];

function FilterSection({ title, icon: Icon, children, defaultOpen = false }: {
  title: string; icon: any; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border/50 pb-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
      >
        <span className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary" />
          {title}
        </span>
        {open ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
      </button>
      {open && <div className="pt-2 space-y-2">{children}</div>}
    </div>
  );
}

function TagSelector({ options, selected, onChange }: {
  options: string[]; selected: string[]; onChange: (v: string[]) => void;
}) {
  const toggle = (v: string) => {
    onChange(selected.includes(v) ? selected.filter((s) => s !== v) : [...selected, v]);
  };
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => toggle(o)}
          className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
            selected.includes(o)
              ? "bg-primary/20 text-primary border-primary/40"
              : "bg-card border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function RadioSelector({ options, selected, onChange }: {
  options: string[]; selected: string; onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(selected === o ? "" : o)}
          className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
            selected === o
              ? "bg-primary/20 text-primary border-primary/40"
              : "bg-card border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
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

  const [industrySearch, setIndustrySearch] = useState("");
  const filteredIndustries = INDUSTRIES.filter((i) =>
    i.toLowerCase().includes(industrySearch.toLowerCase())
  );

  const update = <K extends keyof FilterState>(key: K, val: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-1 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <Filter className="w-4 h-4 text-primary" />
          <p className="text-xs text-primary font-semibold uppercase tracking-wider">Filters</p>
        </div>
        <h2 className="font-display text-lg font-bold text-foreground">What are you looking for?</h2>
        <p className="text-xs text-muted-foreground mt-1">Find co-founders and build startup teams.</p>
      </div>

      <ScrollArea className="flex-1 -mx-1 px-1">
        <div className="space-y-1 pr-2">
          <FilterSection title="Location" icon={MapPin} defaultOpen>
            <RadioSelector options={LOCATIONS} selected={filters.location} onChange={(v) => update("location", v)} />
          </FilterSection>

          <FilterSection title="Looking For" icon={Search} defaultOpen>
            <TagSelector options={LOOKING_FOR} selected={filters.lookingFor} onChange={(v) => update("lookingFor", v)} />
          </FilterSection>

          <FilterSection title="Startup Stage" icon={Rocket}>
            <TagSelector options={STAGES} selected={filters.stage} onChange={(v) => update("stage", v)} />
          </FilterSection>

          <FilterSection title="Commitment Level" icon={Clock}>
            <TagSelector options={COMMITMENTS} selected={filters.commitment} onChange={(v) => update("commitment", v)} />
          </FilterSection>

          <FilterSection title="Skills" icon={Code}>
            <TagSelector options={SKILLS} selected={filters.skills} onChange={(v) => update("skills", v)} />
          </FilterSection>

          <FilterSection title="Industry" icon={Briefcase}>
            <input
              type="text"
              placeholder="Search industries..."
              className="w-full text-xs px-3 py-1.5 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground mb-2 focus:outline-none focus:border-primary/50"
              value={industrySearch}
              onChange={(e) => setIndustrySearch(e.target.value)}
            />
            <TagSelector options={filteredIndustries} selected={filters.industry} onChange={(v) => update("industry", v)} />
          </FilterSection>

          <FilterSection title="Team Preferences" icon={Users}>
            <RadioSelector options={TEAM_PREFS} selected={filters.teamPref} onChange={(v) => update("teamPref", v)} />
          </FilterSection>

          <FilterSection title="Premium Filters" icon={Lock}>
            <div className="flex flex-wrap gap-1.5">
              {PREMIUM_FILTERS.map((f) => (
                <span key={f} className="text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground/50 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> {f}
                </span>
              ))}
            </div>
          </FilterSection>

          <div className="pt-2 pb-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Min Match Score
              </span>
              <span className="text-sm font-bold text-primary">{filters.minMatch}%</span>
            </div>
            <Slider
              value={[filters.minMatch]}
              onValueChange={([v]) => update("minMatch", v)}
              min={50}
              max={100}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="pt-4 border-t border-border/50">
        <Button
          className="w-full bg-gradient-to-r from-[hsl(30,100%,50%)] to-[hsl(22,100%,50%)] text-primary-foreground font-semibold shadow-lg hover:opacity-90 transition-opacity"
          onClick={() => onGenerate(filters)}
        >
          <Zap className="w-4 h-4 mr-2" />
          Generate Candidates
        </Button>
      </div>
    </div>
  );
}
