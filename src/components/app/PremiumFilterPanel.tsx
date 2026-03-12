import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import {
  MapPin, Search, Rocket, Clock, Code, Briefcase,
  ChevronDown, ChevronUp, Zap, TrendingUp, Crown,
  GraduationCap, Banknote, Users, Calendar,
  Globe, Heart, Target, DollarSign, Building2, Handshake,
  Languages, Sparkles, Shield,
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
  // New filters
  fundingStage: string[];
  teamSize: string[];
  revenueRange: string;
  roleType: string[];
  equityRange: string;
  salaryExpectation: string;
  relocation: boolean;
  languages: string[];
  personality: string[];
  leadershipStyle: string[];
  availability: string;
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
const EXPERIENCE_LEVELS = ["First-time Founder", "1 Startup", "2-3 Startups", "Serial Entrepreneur", "Corporate → Startup"];
const EDUCATION_OPTIONS = ["Any", "Top 50 University", "MBA", "PhD / Research", "Self-taught", "Bootcamp Graduate"];
const INVESTOR_NETWORK = ["None", "Angel Investors", "VC Connected", "Accelerator Alumni", "YC / Techstars"];
const EXIT_OPTIONS = ["Any", "No Exit Yet", "Small Exit (<$1M)", "Medium Exit ($1M-$10M)", "Large Exit ($10M+)"];

// New filter options
const FUNDING_STAGES = ["Bootstrapped", "Pre-Seed", "Seed", "Series A", "Series B+"];
const TEAM_SIZES = ["Solo", "2-5", "6-15", "16-50", "50+"];
const REVENUE_OPTIONS = ["Pre-Revenue", "<$10K MRR", "$10K-$50K MRR", "$50K-$100K MRR", "$100K+ MRR"];
const ROLE_TYPES = ["CTO", "CPO", "CMO", "COO", "CFO", "VP Engineering", "VP Sales", "VP Marketing", "Head of Growth", "Head of Product", "Lead Designer", "Full-Stack Dev", "Data Engineer"];
const EQUITY_OPTIONS = ["No Equity", "0.1-1%", "1-5%", "5-15%", "15-30%", "30%+"];
const SALARY_OPTIONS = ["Equity Only", "<$50K", "$50K-$100K", "$100K-$150K", "$150K+"];
const LANGUAGE_OPTIONS = ["English", "Spanish", "Mandarin", "Hindi", "French", "Arabic", "Portuguese", "Japanese", "Korean", "German", "Bahasa Indonesia", "Thai", "Vietnamese"];
const PERSONALITY_OPTIONS = ["Visionary", "Executor", "Analytical", "Creative", "People-Oriented", "Detail-Focused", "Risk Taker", "Methodical"];
const LEADERSHIP_OPTIONS = ["Hands-on Builder", "Strategic Planner", "People Manager", "Technical Lead", "Sales-Driven", "Product-Driven"];
const AVAILABILITY_OPTIONS = ["Immediate", "Within 1 month", "Within 3 months", "Flexible"];

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
            <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-accent/20 text-accent font-bold uppercase tracking-wider">Pro</span>
          )}
        </span>
        {open ? <ChevronUp className="w-3 h-3 text-muted-foreground" /> : <ChevronDown className="w-3 h-3 text-muted-foreground" />}
      </button>
      {open && <div className="pt-1.5 space-y-1.5">{children}</div>}
    </div>
  );
}

function Tags({ options, selected, onChange, accent = false }: {
  options: string[]; selected: string[]; onChange: (v: string[]) => void; accent?: boolean;
}) {
  const toggle = (v: string) => {
    onChange(selected.includes(v) ? selected.filter((s) => s !== v) : [...selected, v]);
  };
  const activeClass = accent
    ? "bg-accent/20 text-accent border-accent/40"
    : "bg-primary/20 text-primary border-primary/40";
  const hoverClass = accent ? "hover:border-accent/30" : "hover:border-primary/30";
  return (
    <div className="flex flex-wrap gap-1">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => toggle(o)}
          className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${
            selected.includes(o) ? activeClass : `bg-card border-border text-muted-foreground ${hoverClass}`
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

function Radio({ options, selected, onChange, accent = false }: {
  options: string[]; selected: string; onChange: (v: string) => void; accent?: boolean;
}) {
  const activeClass = accent
    ? "bg-accent/20 text-accent border-accent/40"
    : "bg-primary/20 text-primary border-primary/40";
  const hoverClass = accent ? "hover:border-accent/30" : "hover:border-primary/30";
  return (
    <div className="flex flex-wrap gap-1">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(selected === o ? "" : o)}
          className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${
            selected === o ? activeClass : `bg-card border-border text-muted-foreground ${hoverClass}`
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
    fundingStage: [],
    teamSize: [],
    revenueRange: "",
    roleType: [],
    equityRange: "",
    salaryExpectation: "",
    relocation: false,
    languages: [],
    personality: [],
    leadershipStyle: [],
    availability: "",
  });

  const update = <K extends keyof PremiumFilterState>(key: K, val: PremiumFilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: val }));
  };

  // Determine active modes
  const mode = useMemo(() => {
    const lf = filters.lookingFor;
    const isFounder = lf.some(l => l.startsWith("Founder"));
    const isCofounder = lf.includes("Co-Founder → Startup");
    const isTeam = lf.includes("Team Member → Startup");
    const isStartupMode = isCofounder || isTeam;
    return { isFounder, isCofounder, isTeam, isStartupMode };
  }, [filters.lookingFor]);

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
          {/* ===== CORE FILTERS ===== */}
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
                min={0} max={100} step={5}
                className="w-full"
              />
            </div>
            <Radio options={LOCATIONS} selected={filters.teamPref} onChange={(v) => update("teamPref", v)} />
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-muted-foreground">Open to Relocation</span>
              <Switch checked={filters.relocation} onCheckedChange={(v) => update("relocation", v)} className="scale-75" />
            </div>
          </Section>

          <Section title="Industry" icon={Briefcase}>
            <CheckboxList options={INDUSTRIES} selected={filters.industry} onChange={(v) => update("industry", v)} />
          </Section>

          <Section title="Skills" icon={Code}>
            <CheckboxList options={SKILLS} selected={filters.skills} onChange={(v) => update("skills", v)} />
          </Section>

          <Section title="Commitment" icon={Clock}>
            <Tags options={COMMITMENTS} selected={filters.commitment} onChange={(v) => update("commitment", v)} />
          </Section>

          {/* ===== FOUNDER-SPECIFIC FILTERS ===== */}
          {mode.isFounder && (
            <>
              <Section title="Startup Stage" icon={Rocket}>
                <Tags options={STAGES} selected={filters.stage} onChange={(v) => update("stage", v)} />
              </Section>

              <Section title="Personality Match" icon={Heart} premium>
                <Tags options={PERSONALITY_OPTIONS} selected={filters.personality} onChange={(v) => update("personality", v)} accent />
              </Section>

              <Section title="Leadership Style" icon={Shield} premium>
                <Tags options={LEADERSHIP_OPTIONS} selected={filters.leadershipStyle} onChange={(v) => update("leadershipStyle", v)} accent />
              </Section>
            </>
          )}

          {/* ===== CO-FOUNDER → STARTUP FILTERS ===== */}
          {mode.isCofounder && (
            <>
              <Section title="Funding Stage" icon={DollarSign} premium>
                <Tags options={FUNDING_STAGES} selected={filters.fundingStage} onChange={(v) => update("fundingStage", v)} accent />
              </Section>

              <Section title="Revenue" icon={TrendingUp} premium>
                <Radio options={REVENUE_OPTIONS} selected={filters.revenueRange} onChange={(v) => update("revenueRange", v)} accent />
              </Section>

              <Section title="Team Size" icon={Users} premium>
                <Tags options={TEAM_SIZES} selected={filters.teamSize} onChange={(v) => update("teamSize", v)} accent />
              </Section>

              <Section title="Equity Offered" icon={Sparkles} premium>
                <Radio options={EQUITY_OPTIONS} selected={filters.equityRange} onChange={(v) => update("equityRange", v)} accent />
              </Section>

              <Section title="Previous Exit" icon={TrendingUp} premium>
                <Radio options={EXIT_OPTIONS} selected={filters.previousExit} onChange={(v) => update("previousExit", v)} accent />
              </Section>

              <Section title="Investor Network" icon={Banknote} premium>
                <Tags options={INVESTOR_NETWORK} selected={filters.investorNetwork} onChange={(v) => update("investorNetwork", v)} accent />
              </Section>
            </>
          )}

          {/* ===== TEAM MEMBER → STARTUP FILTERS ===== */}
          {mode.isTeam && (
            <>
              <Section title="Role Type" icon={Target} premium>
                <CheckboxList options={ROLE_TYPES} selected={filters.roleType} onChange={(v) => update("roleType", v)} />
              </Section>

              <Section title="Salary Expectation" icon={DollarSign} premium>
                <Radio options={SALARY_OPTIONS} selected={filters.salaryExpectation} onChange={(v) => update("salaryExpectation", v)} accent />
              </Section>

              <Section title="Equity Offered" icon={Sparkles} premium>
                <Radio options={EQUITY_OPTIONS} selected={filters.equityRange} onChange={(v) => update("equityRange", v)} accent />
              </Section>

              <Section title="Funding Stage" icon={Building2} premium>
                <Tags options={FUNDING_STAGES} selected={filters.fundingStage} onChange={(v) => update("fundingStage", v)} accent />
              </Section>

              <Section title="Team Size" icon={Users} premium>
                <Tags options={TEAM_SIZES} selected={filters.teamSize} onChange={(v) => update("teamSize", v)} accent />
              </Section>

              <Section title="Availability" icon={Calendar} premium>
                <Radio options={AVAILABILITY_OPTIONS} selected={filters.availability} onChange={(v) => update("availability", v)} accent />
              </Section>
            </>
          )}

          {/* ===== SHARED PREMIUM FILTERS ===== */}
          <Section title="Startup Experience" icon={Rocket} premium>
            <Tags options={EXPERIENCE_LEVELS} selected={filters.startupExperience} onChange={(v) => update("startupExperience", v)} accent />
          </Section>

          <Section title="Education" icon={GraduationCap} premium>
            <Tags options={EDUCATION_OPTIONS} selected={filters.education} onChange={(v) => update("education", v)} accent />
          </Section>

          <Section title="Languages" icon={Languages} premium>
            <Tags options={LANGUAGE_OPTIONS} selected={filters.languages} onChange={(v) => update("languages", v)} accent />
          </Section>

          <Section title="Age Range" icon={Calendar} premium>
            <div className="pt-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-muted-foreground">Age</span>
                <span className="text-[10px] font-bold text-accent">{filters.ageRange[0]} - {filters.ageRange[1]} years</span>
              </div>
              <Slider
                value={filters.ageRange}
                onValueChange={(v) => update("ageRange", v as [number, number])}
                min={18} max={65} step={1}
                className="w-full"
              />
              <div className="flex justify-between mt-0.5">
                <span className="text-[9px] text-muted-foreground">18</span>
                <span className="text-[9px] text-muted-foreground">65</span>
              </div>
            </div>
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
              min={50} max={100} step={5}
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
