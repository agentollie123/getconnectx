import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MapPin, Search, Rocket, Clock, Code, Briefcase,
  Lock, ChevronDown, ChevronUp, Zap, TrendingUp, Users,
  Heart, Shield, DollarSign, Target, Building2, Calendar,
  Sparkles, Banknote, GraduationCap, Languages,
} from "lucide-react";

interface FilterPanelProps {
  onGenerate: (filters: FilterState) => void;
}

export interface FilterState {
  location: string;
  distance: number;
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
  "Founder → Co-Founder", "Founder → Team", "Co-Founder → Startup",
  "Team Member → Startup",
];
const STAGES = ["Idea", "MVP", "Beta", "Early Traction", "Scaling"];
const COMMITMENTS = ["Side Project", "Part-time", "Full-time", "Open to discussion"];
const SKILLS = [
  "AI / ML", "Full-Stack", "Frontend", "Backend", "Mobile Dev",
  "Data Science", "Cloud / Infra", "DevOps", "Blockchain",
  "Cybersecurity", "QA / Testing", "Embedded Systems",
  "Game Dev", "AR / VR", "Robotics", "NLP", "Hardware",
  "Product Mgmt", "UI / UX", "Graphic Design", "UX Research",
  "Growth", "Digital Marketing", "SEO / SEM", "Social Media",
  "Content Creation", "Copywriting", "Brand Strategy",
  "Email Marketing", "Influencer Marketing", "PR / Comms",
  "Sales", "Business Dev", "Partnerships", "Account Mgmt",
  "Customer Success", "Lead Generation",
  "Operations", "Supply Chain", "Project Mgmt", "Strategy",
  "Process Optimization", "Logistics",
  "Finance", "Accounting", "Financial Modeling", "Fundraising",
  "Investor Relations", "Tax / Compliance", "Bookkeeping",
  "Legal", "HR / Recruiting", "Talent Acquisition", "People Ops",
  "Compensation & Benefits",
  "Technical Writing", "Community Mgmt", "Data Analytics",
  "Market Research", "Public Speaking", "Consulting",
];
const INDUSTRIES = [
  "AI", "Fintech", "Healthtech", "EdTech", "Web3",
  "SaaS", "Marketplace", "Gaming", "Climate Tech",
  "AgriTech", "LegalTech", "InsurTech", "PropTech",
  "FoodTech", "Logistics", "E-Commerce", "Media",
  "Entertainment", "Travel", "Social", "HRTech",
  "Cybersecurity", "IoT", "Robotics", "Biotech",
  "SpaceTech", "Fashion", "Sports", "Automotive",
  "Energy", "Construction", "Telecom", "GovTech",
];

// Mode-specific locked premium filters
const FOUNDER_PREMIUM = [
  { label: "Personality Match", icon: Heart },
  { label: "Leadership Style", icon: Shield },
  { label: "Age Range", icon: Calendar },
  { label: "Startup Experience", icon: Rocket },
  { label: "Education", icon: GraduationCap },
  { label: "Languages", icon: Languages },
];

const COFOUNDER_PREMIUM = [
  { label: "Funding Stage", icon: DollarSign },
  { label: "Revenue", icon: TrendingUp },
  { label: "Team Size", icon: Users },
  { label: "Equity Offered", icon: Sparkles },
  { label: "Investor Network", icon: Banknote },
  { label: "Previous Exit", icon: TrendingUp },
  { label: "Age Range", icon: Calendar },
  { label: "Languages", icon: Languages },
];

const TEAM_PREMIUM = [
  { label: "Role Type", icon: Target },
  { label: "Salary Expectation", icon: DollarSign },
  { label: "Equity Offered", icon: Sparkles },
  { label: "Funding Stage", icon: Building2 },
  { label: "Team Size", icon: Users },
  { label: "Availability", icon: Calendar },
  { label: "Languages", icon: Languages },
];

const DEFAULT_PREMIUM = [
  { label: "Age Range", icon: Calendar },
  { label: "Startup Experience", icon: Rocket },
  { label: "Education", icon: GraduationCap },
  { label: "Investor Network", icon: Banknote },
  { label: "Previous Exit", icon: TrendingUp },
];

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
    distance: 50,
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

  // Determine which premium filters to show based on mode
  const premiumFilters = useMemo(() => {
    const lf = filters.lookingFor;
    const isFounder = lf.some(l => l.startsWith("Founder"));
    const isCofounder = lf.includes("Co-Founder → Startup");
    const isTeam = lf.includes("Team Member → Startup");

    if (isCofounder) return COFOUNDER_PREMIUM;
    if (isTeam) return TEAM_PREMIUM;
    if (isFounder) return FOUNDER_PREMIUM;
    return DEFAULT_PREMIUM;
  }, [filters.lookingFor]);

  const premiumLabel = useMemo(() => {
    const lf = filters.lookingFor;
    if (lf.includes("Co-Founder → Startup")) return "Co-Founder Premium Filters";
    if (lf.includes("Team Member → Startup")) return "Team Member Premium Filters";
    if (lf.some(l => l.startsWith("Founder"))) return "Founder Premium Filters";
    return "Premium Filters";
  }, [filters.lookingFor]);

  return (
    <div className="h-full flex flex-col">
      <h2 className="font-display text-sm font-bold text-foreground mb-3">
        Filters & Preferences
      </h2>

      <ScrollArea className="flex-1 -mx-1 px-1">
        <div className="space-y-0.5 pr-1">
          <Section title="Looking For" icon={Search} defaultOpen>
            <Tags options={LOOKING_FOR} selected={filters.lookingFor} onChange={(v) => update("lookingFor", v)} />
          </Section>

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

          <Section title="Startup Stage" icon={Rocket}>
            <Tags options={STAGES} selected={filters.stage} onChange={(v) => update("stage", v)} />
          </Section>

          <Section title="Commitment" icon={Clock}>
            <Tags options={COMMITMENTS} selected={filters.commitment} onChange={(v) => update("commitment", v)} />
          </Section>

          <Section title="Skills" icon={Code}>
            <CheckboxList options={SKILLS} selected={filters.skills} onChange={(v) => update("skills", v)} />
          </Section>

          <Section title="Industry" icon={Briefcase}>
            <CheckboxList options={INDUSTRIES} selected={filters.industry} onChange={(v) => update("industry", v)} />
          </Section>

          {/* Premium filters - locked, mode-responsive */}
          <div className="border-b border-border/30 pb-3 pt-1">
            <div className="flex items-center gap-1.5 mb-2">
              <Lock className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-medium text-foreground">{premiumLabel}</span>
              <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-accent/20 text-accent font-bold uppercase tracking-wider">Pro</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {premiumFilters.map((f) => (
                <span
                  key={f.label}
                  className="text-[9px] px-2 py-1 rounded-full border border-border bg-muted/20 text-muted-foreground/50 flex items-center gap-1 cursor-not-allowed"
                >
                  <f.icon className="w-2.5 h-2.5" />
                  {f.label}
                  <Lock className="w-2 h-2 ml-0.5" />
                </span>
              ))}
            </div>
            <p className="text-[10px] text-primary cursor-pointer hover:underline font-medium">
              🔓 Upgrade to ConnectX Premium →
            </p>
          </div>

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
