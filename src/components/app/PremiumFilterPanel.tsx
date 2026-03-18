import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MapPin, Search, Rocket, Clock, Code, Briefcase,
  Zap, TrendingUp, Crown, Globe, Target,
} from "lucide-react";

import { PremiumCard } from "./premium/PremiumCard";
import { FilterCheckboxList, FilterChips, FilterLabel, FilterDropdown } from "./premium/PremiumFilterInputs";
import { PremiumBenefitsModal } from "./premium/PremiumBenefitsModal";
import {
  AI_PRIORITY_OPTIONS,
  STARTUP_EXPERIENCE, LEADERSHIP_BACKGROUND, FUNCTIONAL_SENIORITY,
  LANGUAGES, DEGREE_LEVELS, INSTITUTION_QUALITY, STUDY_BACKGROUND,
  STARTUP_READINESS, COMMITMENT_PRECISION, EQUITY_PREFERENCE,
} from "./premium/PremiumFilterData";

// ===== Core filter data =====
const LOOKING_FOR = [
  "Founder → Co-Founder", "Founder → Team", "Co-Founder → Startup", "Team Member → Startup",
];
const STAGES = ["Idea", "MVP", "Beta", "Early Traction", "Scaling"];
const COMMITMENTS = ["Side Project", "Part-time", "Full-time", "Open to discussion"];
const LOCATIONS = ["Anywhere", "Same City", "Same Country", "Remote Friendly"];
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
  // Premium
  aiPriority: string[];
  aiExplainMatch: boolean;
  startupExperience: string[];
  leadershipBackground: string[];
  functionalSeniority: string[];
  languages: string[];
  degreeLevel: string[];
  institutionQuality: string[];
  studyBackground: string[];
  startupReadiness: string[];
  commitmentPrecision: string[];
  equityPreference: string;
}

interface PremiumFilterPanelProps {
  onGenerate: (filters: PremiumFilterState) => void;
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

export function PremiumFilterPanel({ onGenerate }: PremiumFilterPanelProps) {
  const [showBenefits, setShowBenefits] = useState(false);

  const [filters, setFilters] = useState<PremiumFilterState>({
    location: "",
    distance: 50,
    lookingFor: [],
    stage: [],
    commitment: [],
    skills: [],
    industry: [],
    teamPref: "",
    minMatch: 70,
    aiPriority: [],
    aiExplainMatch: false,
    startupExperience: [],
    leadershipBackground: [],
    functionalSeniority: [],
    languages: [],
    degreeLevel: [],
    institutionQuality: [],
    studyBackground: [],
    startupReadiness: [],
    commitmentPrecision: [],
    equityPreference: "",
  });

  const update = <K extends keyof PremiumFilterState>(key: K, val: PremiumFilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Crown className="w-4 h-4 text-primary" />
          <h2 className="font-display text-sm font-bold text-foreground">Premium Filters</h2>
        </div>
        <p className="text-[10px] text-muted-foreground leading-relaxed">
          Advanced match intelligence for better startup connections
        </p>
        <p className="text-[9px] text-muted-foreground/60 mt-0.5">
          Filter stronger founders, better startup opportunities, and higher-fit builders.
        </p>
      </div>

      <ScrollArea className="flex-1 -mx-1 px-1">
        <div className="space-y-2 pr-1">
          {/* ===== CORE FILTERS ===== */}
          <CoreSection title="Looking For" icon={Search} defaultOpen>
            <FilterChips options={LOOKING_FOR} selected={filters.lookingFor} onChange={(v) => update("lookingFor", v)} />
          </CoreSection>

          <CoreSection title="Location" icon={MapPin}>
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
            <FilterChips options={LOCATIONS} selected={filters.teamPref ? [filters.teamPref] : []} onChange={(v) => update("teamPref", v[v.length - 1] || "")} />
          </CoreSection>

          <CoreSection title="Startup Stage" icon={Rocket}>
            <FilterChips options={STAGES} selected={filters.stage} onChange={(v) => update("stage", v)} />
          </CoreSection>

          <CoreSection title="Commitment" icon={Clock}>
            <FilterChips options={COMMITMENTS} selected={filters.commitment} onChange={(v) => update("commitment", v)} />
          </CoreSection>

          <CoreSection title="Skills" icon={Code}>
            <FilterCheckboxList options={SKILLS} selected={filters.skills} onChange={(v) => update("skills", v)} searchable placeholder="Search skills..." />
          </CoreSection>

          <CoreSection title="Industry" icon={Briefcase}>
            <FilterCheckboxList options={INDUSTRIES} selected={filters.industry} onChange={(v) => update("industry", v)} searchable placeholder="Search industries..." />
          </CoreSection>

          {/* ===== PREMIUM CARDS ===== */}
          <div className="pt-3 pb-1">
            <p className="text-[9px] font-bold text-primary/60 uppercase tracking-widest mb-2">Premium Intelligence</p>
          </div>

          {/* Card 1: AI Match Precision */}
          <PremiumCard icon={Zap} title="AI Match Precision" subtitle="Improve who appears in your feed" defaultOpen>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <FilterLabel>Minimum Match Score</FilterLabel>
                  <span className="text-xs font-bold text-primary">{filters.minMatch}%</span>
                </div>
                <Slider
                  value={[filters.minMatch]}
                  onValueChange={([v]) => update("minMatch", v)}
                  min={50} max={95} step={5}
                />
                <div className="flex justify-between mt-0.5">
                  <span className="text-[9px] text-muted-foreground/50">50%</span>
                  <span className="text-[9px] text-muted-foreground/50">95%</span>
                </div>
              </div>

              <div>
                <FilterLabel>AI Priority Preferences</FilterLabel>
                <div className="mt-1.5">
                  <FilterCheckboxList options={AI_PRIORITY_OPTIONS} selected={filters.aiPriority} onChange={(v) => update("aiPriority", v)} />
                </div>
              </div>

              <div className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-background/30">
                <div>
                  <p className="text-[11px] font-medium text-foreground">AI Explain Why Match</p>
                  <p className="text-[9px] text-muted-foreground">Show AI reasoning on profile cards</p>
                </div>
                <Switch checked={filters.aiExplainMatch} onCheckedChange={(v) => update("aiExplainMatch", v)} className="scale-75" />
              </div>
            </div>
          </PremiumCard>

          {/* Card 2: Founder & Builder Quality */}
          <PremiumCard icon={Target} title="Founder & Builder Quality" subtitle="Filter stronger startup profiles">
            <div className="space-y-3">
              <div>
                <FilterLabel>Startup Experience</FilterLabel>
                <div className="mt-1.5">
                  <FilterCheckboxList options={STARTUP_EXPERIENCE} selected={filters.startupExperience} onChange={(v) => update("startupExperience", v)} maxVisible={8} />
                </div>
              </div>

              <div>
                <FilterLabel>Leadership Background</FilterLabel>
                <div className="mt-1.5">
                  <FilterCheckboxList options={LEADERSHIP_BACKGROUND} selected={filters.leadershipBackground} onChange={(v) => update("leadershipBackground", v)} maxVisible={8} />
                </div>
              </div>

              <div>
                <FilterLabel>Functional Seniority</FilterLabel>
                <div className="mt-1.5">
                  <FilterChips options={FUNCTIONAL_SENIORITY} selected={filters.functionalSeniority} onChange={(v) => update("functionalSeniority", v)} />
                </div>
              </div>
            </div>
          </PremiumCard>

          {/* Card 3: Global Compatibility */}
          <PremiumCard icon={Globe} title="Global Compatibility" subtitle="Improve cross-border startup matching">
            <div className="space-y-3">
              <div>
                <FilterLabel>Languages</FilterLabel>
                <div className="mt-1.5">
                  <FilterCheckboxList options={LANGUAGES} selected={filters.languages} onChange={(v) => update("languages", v)} searchable placeholder="Type language..." maxVisible={10} />
                </div>
              </div>

              <div>
                <FilterLabel>Degree Level</FilterLabel>
                <div className="mt-1.5">
                  <FilterCheckboxList options={DEGREE_LEVELS} selected={filters.degreeLevel} onChange={(v) => update("degreeLevel", v)} />
                </div>
              </div>

              <div>
                <FilterLabel>Institution Quality</FilterLabel>
                <div className="mt-1.5">
                  <FilterCheckboxList options={INSTITUTION_QUALITY} selected={filters.institutionQuality} onChange={(v) => update("institutionQuality", v)} />
                </div>
              </div>

              <div>
                <FilterLabel>Study Background</FilterLabel>
                <div className="mt-1.5">
                  <FilterCheckboxList options={STUDY_BACKGROUND} selected={filters.studyBackground} onChange={(v) => update("studyBackground", v)} maxVisible={8} />
                </div>
              </div>
            </div>
          </PremiumCard>

          {/* Card 4: Startup Readiness */}
          <PremiumCard icon={Rocket} title="Startup Readiness" subtitle="Find people ready to build now">
            <div className="space-y-3">
              <div>
                <FilterLabel>Readiness Level</FilterLabel>
                <div className="mt-1.5">
                  <FilterCheckboxList options={STARTUP_READINESS} selected={filters.startupReadiness} onChange={(v) => update("startupReadiness", v)} maxVisible={8} />
                </div>
              </div>

              <div>
                <FilterLabel>Commitment Precision</FilterLabel>
                <div className="mt-1.5">
                  <FilterChips options={COMMITMENT_PRECISION} selected={filters.commitmentPrecision} onChange={(v) => update("commitmentPrecision", v)} />
                </div>
              </div>

              <div>
                <FilterLabel>Equity Preference</FilterLabel>
                <div className="mt-1.5">
                  <FilterDropdown options={EQUITY_PREFERENCE} value={filters.equityPreference} onChange={(v) => update("equityPreference", v)} placeholder="Any" />
                </div>
              </div>
            </div>
          </PremiumCard>

          {/* ===== PREMIUM UPSELL (for free users) ===== */}
          <div className="mt-4 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <Crown className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-foreground">Upgrade to Premium</h3>
                <p className="text-[9px] text-muted-foreground">Smarter filters. Better visibility. Stronger matches.</p>
              </div>
            </div>

            <div className="space-y-1.5 mb-3">
              {["AI match precision", "Higher-quality profiles", "Stronger startup opportunities", "Priority visibility", "Included GetConnect spotlight credits"].map((b) => (
                <div key={b} className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-primary/15 flex items-center justify-center">
                    <svg className="w-2 h-2 text-primary" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[10px] text-foreground/80">{b}</span>
                </div>
              ))}
            </div>

            <p className="text-[9px] text-primary/70 mb-3 italic">
              Premium users are matched earlier with higher-fit profiles.
            </p>

            <Button
              className="w-full h-9 rounded-xl bg-gradient-to-r from-accent to-primary text-primary-foreground font-semibold text-xs shadow-md shadow-primary/15"
              onClick={() => setShowBenefits(true)}
            >
              <Crown className="w-3.5 h-3.5 mr-1.5" />
              Upgrade to Premium
            </Button>
            <button
              onClick={() => setShowBenefits(true)}
              className="w-full text-center text-[10px] text-primary hover:text-primary/80 font-medium mt-2 transition-colors"
            >
              See Premium Benefits →
            </button>
          </div>
        </div>
      </ScrollArea>

      {/* Generate button */}
      <div className="pt-3">
        <Button
          className="w-full h-10 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold text-xs shadow-lg shadow-primary/15"
          onClick={() => onGenerate(filters)}
        >
          <Zap className="w-3.5 h-3.5 mr-1.5" />
          Generate Candidates
        </Button>
      </div>

      <PremiumBenefitsModal open={showBenefits} onClose={() => setShowBenefits(false)} onUpgrade={() => setShowBenefits(false)} />
    </div>
  );
}
