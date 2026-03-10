export interface Startup {
  id: number;
  name: string;
  founder: string;
  founderPhoto?: string;
  industry: string;
  stage: "Idea" | "MVP" | "Pre-Seed" | "Seed";
  teamSize: number;
  openRoles: string[];
  description: string;
  matchScore: number;
  logo?: string;
  lookingFor: "co-founder" | "team" | "both";
}

export const startups: Startup[] = [
  {
    id: 101,
    name: "PayFlow AI",
    founder: "Sarah Chen",
    industry: "Fintech / AI",
    stage: "MVP",
    teamSize: 2,
    openRoles: ["Technical Co-Founder", "Backend Engineer"],
    description: "Building an AI-powered payment infrastructure for Southeast Asian SMEs.",
    matchScore: 94,
    lookingFor: "both",
  },
  {
    id: 102,
    name: "GreenCarbon",
    founder: "Daniel Wong",
    industry: "Climate Tech",
    stage: "Idea",
    teamSize: 1,
    openRoles: ["Technical Co-Founder", "Product Designer"],
    description: "Platform for tracking carbon credits for SMEs in Southeast Asia.",
    matchScore: 87,
    lookingFor: "co-founder",
  },
  {
    id: 103,
    name: "MedAI Assist",
    founder: "Dr. Amelia Tan",
    industry: "Healthtech / AI",
    stage: "MVP",
    teamSize: 2,
    openRoles: ["Machine Learning Engineer", "Backend Developer"],
    description: "AI assistant helping doctors automate clinical documentation.",
    matchScore: 91,
    lookingFor: "team",
  },
  {
    id: 104,
    name: "EduSpark",
    founder: "Arif Rahman",
    industry: "EdTech",
    stage: "Pre-Seed",
    teamSize: 3,
    openRoles: ["Growth Marketer", "Frontend Developer"],
    description: "Personalized AI tutoring platform for Southeast Asian students.",
    matchScore: 82,
    lookingFor: "team",
  },
  {
    id: 105,
    name: "ChainLogix",
    founder: "Kevin Lim",
    industry: "Supply Chain / Web3",
    stage: "Seed",
    teamSize: 6,
    openRoles: ["DevOps Engineer", "Smart Contract Developer"],
    description: "Decentralized logistics infrastructure for global supply chains.",
    matchScore: 78,
    lookingFor: "team",
  },
  {
    id: 106,
    name: "NomadHQ",
    founder: "Priya Sharma",
    industry: "SaaS / Remote Work",
    stage: "MVP",
    teamSize: 2,
    openRoles: ["Full-Stack Engineer", "Product Designer"],
    description: "All-in-one workspace management platform for distributed teams across Asia.",
    matchScore: 88,
    lookingFor: "both",
  },
  {
    id: 107,
    name: "AgriVerse",
    founder: "Budi Santoso",
    industry: "AgriTech / IoT",
    stage: "Idea",
    teamSize: 1,
    openRoles: ["Technical Co-Founder", "IoT Engineer"],
    description: "Smart farming platform using IoT sensors and AI for smallholder farmers.",
    matchScore: 85,
    lookingFor: "co-founder",
  },
  {
    id: 108,
    name: "LegalPilot",
    founder: "Jessica Teo",
    industry: "LegalTech / AI",
    stage: "Pre-Seed",
    teamSize: 3,
    openRoles: ["Backend Engineer", "ML Engineer"],
    description: "AI-powered legal document analysis and contract review for startups.",
    matchScore: 79,
    lookingFor: "team",
  },
];
