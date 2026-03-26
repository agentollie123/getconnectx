import type { LucideIcon } from "lucide-react";
import {
  Users, Rocket, Briefcase, Code, Palette, TrendingUp, DollarSign,
  Target, Shield, Zap, Globe, Building2, GraduationCap,
} from "lucide-react";

// ===== MATCHING MODES =====
export type MatchingMode = "founder-cofounder" | "founder-team" | "team-startup" | "cofounder-startup";

export interface ModeCard {
  mode: MatchingMode;
  label: string;
  sublabel: string;
  icon: LucideIcon;
}

export const MODE_CARDS: ModeCard[] = [
  { mode: "founder-cofounder", label: "Finding Co-Founder", sublabel: "Search for your ideal co-founder", icon: Users },
  { mode: "founder-team", label: "Building Team", sublabel: "Hire early team members", icon: Briefcase },
  { mode: "team-startup", label: "Explore Startups", sublabel: "Find a startup to join", icon: Rocket },
  { mode: "cofounder-startup", label: "Joining Startups", sublabel: "Co-found a venture", icon: Target },
];

export const isStartupFeedMode = (mode: MatchingMode) =>
  mode === "team-startup" || mode === "cofounder-startup";

// ===== FREE FILTER CONFIGS PER MODE =====

// Mode 1: Founder → Co-Founder
export const COFOUNDER_SKILL_STRENGTHS = [
  "Technical", "Product", "Business", "Sales", "Marketing", "Design", "Operations", "Finance",
];
export const COFOUNDER_COMMITMENTS = ["Full-time", "Part-time", "Exploring"];

// Mode 2: Founder → Team
export const TEAM_ROLES_NEEDED = [
  "Engineer", "Product", "Designer", "Sales", "Marketing", "Operations", "Finance", "Growth", "AI / ML",
];
export const TEAM_SKILL_STACK = [
  "React", "Python", "Figma", "Growth", "SEO", "Salesforce", "SQL",
  "Node.js", "TypeScript", "Swift", "Kotlin", "Go", "Rust",
  "AWS", "Docker", "Kubernetes", "TensorFlow", "PyTorch",
  "Google Ads", "Meta Ads", "HubSpot", "Mixpanel", "Amplitude",
];
export const TEAM_COMMITMENTS = ["Full-time", "Part-time", "Side Project"];

// Mode 3: Team → Startup
export const STARTUP_STAGES = ["Idea", "MVP", "Pre-seed", "Seed"];
export const STARTUP_ROLES_NEEDED = ["Engineer", "Designer", "Marketing", "Sales", "Operations"];

// Mode 4: Co-Founder → Startup
export const FOUNDER_TYPES = ["Technical Founder", "Business Founder", "Solo Founder"];

// Shared
export const WORK_ARRANGEMENTS = ["Onsite", "Hybrid", "Remote"];

export const INDUSTRIES = [
  "AI", "Fintech", "Healthtech", "EdTech", "Web3",
  "SaaS", "Marketplace", "Gaming", "Climate Tech",
  "AgriTech", "LegalTech", "InsurTech", "PropTech",
  "FoodTech", "Logistics", "E-Commerce", "Media",
  "Entertainment", "Travel", "Social", "HRTech",
  "Cybersecurity", "IoT", "Robotics", "Biotech",
  "SpaceTech", "Fashion", "Sports", "Automotive",
  "Energy", "Construction", "Telecom", "GovTech",
];

// ===== PREMIUM CARD CONFIGS PER MODE =====
export interface PremiumCardConfig {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  fields: PremiumFieldConfig[];
}

export interface PremiumFieldConfig {
  type: "checkbox" | "slider" | "chips";
  label: string;
  key: string;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

// --- Mode 1: Founder → Co-Founder ---
const PREMIUM_FOUNDER_COFOUNDER: PremiumCardConfig[] = [
  {
    id: "ai-match-precision",
    icon: Zap,
    title: "AI Match Precision",
    subtitle: "Improve who appears in your feed",
    fields: [
      { type: "slider", label: "Minimum Match Score", key: "minMatch", min: 70, max: 99, step: 1 },
      {
        type: "checkbox", label: "AI Priority Preferences", key: "aiPriority",
        options: [
          "Skill Complementarity", "Same Industry", "Same Startup Stage",
          "Similar Commitment Level", "Leadership Compatibility",
          "Functional Balance", "Geographic Fit", "Language Compatibility",
        ],
      },
    ],
  },
  {
    id: "founder-builder-quality",
    icon: Shield,
    title: "Founder & Builder Quality",
    subtitle: "Filter stronger startup profiles",
    fields: [
      {
        type: "checkbox", label: "Startup Experience", key: "startupExperience",
        options: [
          "First-time Founder", "Built 1 Startup", "Serial Founder",
          "Startup Exit Experience", "VC-backed Founder", "Accelerator Alumni",
        ],
      },
      {
        type: "checkbox", label: "Leadership Background", key: "leadershipBackground",
        options: [
          "Led Startup Team", "Built Product from Zero", "Owned Revenue Target",
          "Raised Capital", "Advisor / Mentor",
        ],
      },
    ],
  },
  {
    id: "global-compatibility",
    icon: Globe,
    title: "Global Compatibility",
    subtitle: "Improve cross-border startup matching",
    fields: [
      {
        type: "checkbox", label: "Languages", key: "languages",
        options: [
          "English", "Bahasa Indonesia", "Mandarin Chinese", "Japanese",
          "Korean", "Spanish", "French", "German", "Arabic", "Hindi",
          "Vietnamese", "Thai", "Malay", "Tagalog",
        ],
      },
      {
        type: "checkbox", label: "Education", key: "degreeLevel",
        options: ["Bachelor", "Master", "MBA", "PhD", "Research Background"],
      },
    ],
  },
  {
    id: "cofounder-readiness",
    icon: Rocket,
    title: "Co-Founder Readiness",
    subtitle: "Find builders ready to commit",
    fields: [
      {
        type: "checkbox", label: "Readiness Level", key: "cofounderReadiness",
        options: [
          "Ready to Start Within 30 Days",
          "Exploring Startup Ideas",
          "Open to Build From Zero",
          "Open to Existing Founder",
          "Equity-Based Build",
          "Long-Term Commitment",
        ],
      },
    ],
  },
];

// --- Mode 2: Founder → Team ---
const PREMIUM_FOUNDER_TEAM: PremiumCardConfig[] = [
  {
    id: "ai-talent-precision",
    icon: Zap,
    title: "AI Talent Precision",
    subtitle: "Improve talent quality in your feed",
    fields: [
      { type: "slider", label: "Minimum Match Score", key: "minMatch", min: 70, max: 99, step: 1 },
      {
        type: "checkbox", label: "AI Priority", key: "aiPriority",
        options: [
          "Skill Depth", "Startup Readiness", "Immediate Availability",
          "Leadership Potential", "Role Complementarity",
        ],
      },
    ],
  },
  {
    id: "execution-quality",
    icon: Target,
    title: "Execution Quality",
    subtitle: "Filter proven builders",
    fields: [
      {
        type: "checkbox", label: "Track Record", key: "executionQuality",
        options: [
          "Built MVP", "Startup Experience", "Product Shipped",
          "Led Growth", "Built Systems",
        ],
      },
    ],
  },
  {
    id: "global-compatibility",
    icon: Globe,
    title: "Global Compatibility",
    subtitle: "Cross-border team building",
    fields: [
      {
        type: "checkbox", label: "Languages", key: "languages",
        options: [
          "English", "Bahasa Indonesia", "Mandarin Chinese", "Japanese",
          "Korean", "Spanish", "French", "German", "Arabic", "Hindi",
        ],
      },
    ],
  },
  {
    id: "hiring-readiness",
    icon: Building2,
    title: "Hiring Readiness",
    subtitle: "Find people ready to join now",
    fields: [
      {
        type: "checkbox", label: "Availability", key: "hiringReadiness",
        options: [
          "Immediate Join", "30 Days", "Part-time First",
          "Equity Open", "Remote Ready",
        ],
      },
    ],
  },
];

// --- Mode 3: Team → Startup ---
const PREMIUM_TEAM_STARTUP: PremiumCardConfig[] = [
  {
    id: "startup-quality",
    icon: Shield,
    title: "Startup Quality",
    subtitle: "Filter stronger startup teams",
    fields: [
      {
        type: "checkbox", label: "Founder Background", key: "startupQuality",
        options: [
          "Repeat Founder", "Startup Exit", "VC-backed Founder",
          "Strong Founder Background",
        ],
      },
    ],
  },
  {
    id: "startup-readiness",
    icon: Rocket,
    title: "Startup Readiness",
    subtitle: "Find startups ready to build",
    fields: [
      {
        type: "checkbox", label: "Progress", key: "startupReadiness",
        options: ["MVP Ready", "Product Live", "Paying Users", "Existing Team"],
      },
    ],
  },
  {
    id: "opportunity-fit",
    icon: Target,
    title: "Opportunity Fit",
    subtitle: "Match your ideal role conditions",
    fields: [
      {
        type: "checkbox", label: "Conditions", key: "opportunityFit",
        options: [
          "Equity Offered", "Remote Team", "Fast Hiring", "Early Core Role",
        ],
      },
    ],
  },
  {
    id: "ai-startup-fit",
    icon: Zap,
    title: "AI Startup Fit",
    subtitle: "AI-powered startup matching",
    fields: [
      { type: "slider", label: "Minimum Fit Score", key: "minMatch", min: 50, max: 95, step: 1 },
    ],
  },
];

// --- Mode 4: Co-Founder → Startup ---
const PREMIUM_COFOUNDER_STARTUP: PremiumCardConfig[] = [
  {
    id: "founder-quality",
    icon: Shield,
    title: "Founder Quality",
    subtitle: "Evaluate founder strength",
    fields: [
      {
        type: "checkbox", label: "Background", key: "founderQuality",
        options: [
          "Startup Experience", "Exit", "Fundraising Exposure",
          "Accelerator Background",
        ],
      },
    ],
  },
  {
    id: "leadership-strength",
    icon: Target,
    title: "Leadership Strength",
    subtitle: "Assess leadership capability",
    fields: [
      {
        type: "checkbox", label: "Leadership", key: "leadershipStrength",
        options: [
          "Built Team", "Led Product", "Growth Ownership", "Operations Leadership",
        ],
      },
    ],
  },
  {
    id: "startup-readiness",
    icon: Rocket,
    title: "Startup Readiness",
    subtitle: "Filter by traction",
    fields: [
      {
        type: "checkbox", label: "Progress", key: "startupReadiness",
        options: ["MVP", "Traction", "Paying Users"],
      },
    ],
  },
  {
    id: "equity-commitment",
    icon: DollarSign,
    title: "Equity & Commitment",
    subtitle: "Match expectations",
    fields: [
      {
        type: "checkbox", label: "Terms", key: "equityCommitment",
        options: [
          "Co-Founder Equity", "Full-Time Expected", "Pre-Revenue Build",
        ],
      },
    ],
  },
];

export const PREMIUM_CONFIGS: Record<MatchingMode, PremiumCardConfig[]> = {
  "founder-cofounder": PREMIUM_FOUNDER_COFOUNDER,
  "founder-team": PREMIUM_FOUNDER_TEAM,
  "team-startup": PREMIUM_TEAM_STARTUP,
  "cofounder-startup": PREMIUM_COFOUNDER_STARTUP,
};
