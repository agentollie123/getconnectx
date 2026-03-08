import profile1 from "@/assets/profile-1.jpg";
import profile2 from "@/assets/profile-2.jpg";
import profile3 from "@/assets/profile-3.jpg";
import profile4 from "@/assets/profile-4.jpg";
import profile5 from "@/assets/profile-5.jpg";
import profile6 from "@/assets/profile-6.jpg";

export interface Profile {
  id: number;
  name: string;
  role: string;
  skills: string[];
  interests: string[];
  lookingFor: string;
  commitment: string;
  location: string;
  stage: string;
  photo: string;
  bio?: string;
  age?: number;
  distance?: string;
  portfolio?: string;
  startupIdea?: string;
  experience?: string;
}

export const profiles: Profile[] = [
  {
    id: 1,
    name: "Ardi Wijaya",
    role: "Full-Stack Engineer",
    age: 28,
    distance: "3 km",
    skills: ["React", "Node.js", "PostgreSQL"],
    interests: ["FinTech", "AI/ML", "SaaS"],
    lookingFor: "Co-founder",
    commitment: "Full-time",
    location: "Jakarta, Indonesia",
    stage: "MVP",
    photo: profile1,
    bio: "Building a payments infrastructure for underbanked communities in Southeast Asia. Looking for a business-minded co-founder.",
    portfolio: "github.com/ardiw",
    startupIdea: "Neo-bank for micro-merchants",
    experience: "3 years at Gojek, 2 startup exits",
  },
  {
    id: 2,
    name: "Mei Lin Chen",
    role: "Product Designer",
    age: 26,
    distance: "8 km",
    skills: ["Figma", "UX Research", "Prototyping"],
    interests: ["EdTech", "Health Tech", "Marketplace"],
    lookingFor: "Team",
    commitment: "Full-time",
    location: "Singapore",
    stage: "Idea Stage",
    photo: profile2,
    bio: "Passionate about designing human-centered products that make learning more accessible and engaging.",
    portfolio: "meilin.design",
    startupIdea: "AI-powered tutoring marketplace",
    experience: "Lead Designer at Grab, Google UX cert",
  },
  {
    id: 3,
    name: "Rohan Patel",
    role: "Backend Engineer",
    age: 31,
    distance: "12 km",
    skills: ["Python", "AWS", "Machine Learning"],
    interests: ["AI/ML", "Dev Tools", "B2B SaaS"],
    lookingFor: "Co-founder",
    commitment: "Part-time",
    location: "Bangalore, India",
    stage: "Pre-revenue",
    photo: profile3,
    bio: "ML engineer exploring the intersection of developer tools and AI. Have some ideas but open to exploring.",
    portfolio: "rohanpatel.dev",
    startupIdea: "AI code review assistant",
    experience: "5 years at Amazon, ML researcher",
  },
  {
    id: 4,
    name: "Linh Nguyen",
    role: "Growth Strategist",
    age: 27,
    distance: "5 km",
    skills: ["Growth Hacking", "SEO", "Analytics"],
    interests: ["E-commerce", "Social Impact", "Creator Economy"],
    lookingFor: "Both",
    commitment: "Exploring",
    location: "Ho Chi Minh City, Vietnam",
    stage: "Seed",
    photo: profile4,
    bio: "Scaled two D2C brands from 0 to $1M ARR. Now looking to join or co-found something with real social impact.",
    portfolio: "linkedin.com/in/linhnguyen",
    startupIdea: "Sustainable fashion marketplace",
    experience: "Growth lead at Shopee, 1 exit",
  },
  {
    id: 5,
    name: "Marco Santos",
    role: "Data Scientist",
    age: 29,
    distance: "15 km",
    skills: ["TensorFlow", "SQL", "Data Viz"],
    interests: ["HealthTech", "Climate Tech", "IoT"],
    lookingFor: "Team",
    commitment: "Full-time",
    location: "Manila, Philippines",
    stage: "MVP",
    photo: profile5,
    bio: "Using data science to solve real-world health problems. Currently prototyping a predictive diagnostics tool.",
    portfolio: "marcosantos.io",
    startupIdea: "Predictive health diagnostics platform",
    experience: "Data lead at Telehealth startup",
  },
  {
    id: 6,
    name: "Sara Al-Rashid",
    role: "Business Developer",
    age: 30,
    distance: "2 km",
    skills: ["Sales", "Partnerships", "Strategy"],
    interests: ["FinTech", "Logistics", "Marketplace"],
    lookingFor: "Co-founder",
    commitment: "Full-time",
    location: "Dubai, UAE",
    stage: "Idea Stage",
    photo: profile6,
    bio: "10+ years in enterprise BD across MENA. Ready to build a logistics tech startup from scratch with a technical co-founder.",
    portfolio: "linkedin.com/in/saraalrashid",
    startupIdea: "Last-mile logistics optimization",
    experience: "BD Director at Careem, Aramex",
  },
];
