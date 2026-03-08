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
}

export const profiles: Profile[] = [
  {
    id: 1,
    name: "Ardi Wijaya",
    role: "Full-Stack Engineer",
    skills: ["React", "Node.js", "PostgreSQL"],
    interests: ["FinTech", "AI/ML", "SaaS"],
    lookingFor: "Co-founder",
    commitment: "Full-time",
    location: "Jakarta",
    stage: "MVP",
    photo: profile1,
  },
  {
    id: 2,
    name: "Mei Lin Chen",
    role: "Product Designer",
    skills: ["Figma", "UX Research", "Prototyping"],
    interests: ["EdTech", "Health Tech", "Marketplace"],
    lookingFor: "Team",
    commitment: "Full-time",
    location: "Singapore",
    stage: "Idea Stage",
    photo: profile2,
  },
  {
    id: 3,
    name: "Rohan Patel",
    role: "Backend Engineer",
    skills: ["Python", "AWS", "Machine Learning"],
    interests: ["AI/ML", "Dev Tools", "B2B SaaS"],
    lookingFor: "Co-founder",
    commitment: "Part-time",
    location: "Bangalore",
    stage: "Pre-revenue",
    photo: profile3,
  },
  {
    id: 4,
    name: "Linh Nguyen",
    role: "Growth Strategist",
    skills: ["Growth Hacking", "SEO", "Analytics"],
    interests: ["E-commerce", "Social Impact", "Creator Economy"],
    lookingFor: "Both",
    commitment: "Exploring",
    location: "Ho Chi Minh City",
    stage: "Seed",
    photo: profile4,
  },
  {
    id: 5,
    name: "Marco Santos",
    role: "Data Scientist",
    skills: ["TensorFlow", "SQL", "Data Viz"],
    interests: ["HealthTech", "Climate Tech", "IoT"],
    lookingFor: "Team",
    commitment: "Full-time",
    location: "Manila",
    stage: "MVP",
    photo: profile5,
  },
  {
    id: 6,
    name: "Sara Al-Rashid",
    role: "Business Developer",
    skills: ["Sales", "Partnerships", "Strategy"],
    interests: ["FinTech", "Logistics", "Marketplace"],
    lookingFor: "Co-founder",
    commitment: "Full-time",
    location: "Dubai",
    stage: "Idea Stage",
    photo: profile6,
  },
];
