import profile1 from "@/assets/profile-1.jpg";
import profile2 from "@/assets/profile-2.jpg";
import profile3 from "@/assets/profile-3.jpg";
import profile4 from "@/assets/profile-4.jpg";
import profile5 from "@/assets/profile-5.jpg";
import profile6 from "@/assets/profile-6.jpg";

export interface WorkExperience {
  title: string;
  company: string;
  duration: string;
  description?: string;
}

export interface Education {
  degree: string;
  school: string;
  year: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

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
  workExperience?: WorkExperience[];
  education?: Education[];
  certifications?: Certification[];
  languages?: string[];
  linkedIn?: string;
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
    linkedIn: "linkedin.com/in/ardiwijaya",
    languages: ["English", "Bahasa Indonesia"],
    workExperience: [
      { title: "Senior Full-Stack Engineer", company: "Gojek", duration: "2021 – 2024", description: "Led payments team building real-time transaction processing for 50M+ users." },
      { title: "Co-Founder & CTO", company: "PayKecil (acquired)", duration: "2019 – 2021", description: "Built micro-lending platform from 0 to 100K users. Acquired by a regional bank." },
      { title: "Software Engineer", company: "Tokopedia", duration: "2017 – 2019", description: "Developed marketplace checkout and payment gateway integrations." },
    ],
    education: [
      { degree: "B.S. Computer Science", school: "Universitas Indonesia", year: "2017" },
    ],
    certifications: [
      { name: "AWS Solutions Architect", issuer: "Amazon Web Services", year: "2022" },
      { name: "Google Cloud Professional", issuer: "Google", year: "2021" },
    ],
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
    linkedIn: "linkedin.com/in/meilinchen",
    languages: ["English", "Mandarin", "Malay"],
    workExperience: [
      { title: "Lead Product Designer", company: "Grab", duration: "2022 – Present", description: "Redesigned the driver onboarding flow, increasing completion rate by 34%." },
      { title: "UX Designer", company: "Shopee", duration: "2020 – 2022", description: "Owned the buyer discovery experience across 7 SEA markets." },
      { title: "Junior Designer", company: "Carousell", duration: "2019 – 2020", description: "Designed listing creation and chat experience improvements." },
    ],
    education: [
      { degree: "B.A. Industrial Design", school: "National University of Singapore", year: "2019" },
    ],
    certifications: [
      { name: "Google UX Design Certificate", issuer: "Google", year: "2021" },
      { name: "Interaction Design Foundation", issuer: "IDF", year: "2020" },
    ],
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
    linkedIn: "linkedin.com/in/rohanpatel",
    languages: ["English", "Hindi", "Gujarati"],
    workExperience: [
      { title: "Senior ML Engineer", company: "Amazon", duration: "2020 – Present", description: "Building recommendation systems for Alexa smart home. Led team of 6 engineers." },
      { title: "ML Research Engineer", company: "Flipkart", duration: "2018 – 2020", description: "Developed NLP models for product search relevance, improving CTR by 22%." },
      { title: "Data Scientist Intern", company: "Microsoft Research India", duration: "2017 – 2018", description: "Research on low-resource language translation models." },
    ],
    education: [
      { degree: "M.Tech Computer Science (ML)", school: "IIT Bangalore", year: "2018" },
      { degree: "B.Tech Computer Engineering", school: "NIT Surat", year: "2016" },
    ],
    certifications: [
      { name: "Deep Learning Specialization", issuer: "Coursera (Andrew Ng)", year: "2019" },
      { name: "AWS Machine Learning Specialty", issuer: "Amazon Web Services", year: "2021" },
    ],
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
    linkedIn: "linkedin.com/in/linhnguyen",
    languages: ["English", "Vietnamese"],
    workExperience: [
      { title: "Head of Growth", company: "Shopee Vietnam", duration: "2022 – Present", description: "Grew seller base from 50K to 200K through referral programs and community building." },
      { title: "Co-Founder & CMO", company: "GreenThread (exited)", duration: "2020 – 2022", description: "Sustainable fashion D2C brand. $1M ARR, acquired by a fashion conglomerate." },
      { title: "Growth Marketing Manager", company: "Tiki.vn", duration: "2018 – 2020", description: "Led user acquisition across paid and organic channels." },
    ],
    education: [
      { degree: "B.B.A. Marketing", school: "RMIT University Vietnam", year: "2018" },
    ],
    certifications: [
      { name: "Google Analytics Certified", issuer: "Google", year: "2020" },
      { name: "HubSpot Inbound Marketing", issuer: "HubSpot", year: "2019" },
    ],
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
    linkedIn: "linkedin.com/in/marcosantos",
    languages: ["English", "Filipino", "Spanish"],
    workExperience: [
      { title: "Lead Data Scientist", company: "mWell (Telehealth)", duration: "2021 – Present", description: "Built predictive models for patient risk assessment across 500K+ users." },
      { title: "Data Analyst", company: "Globe Telecom", duration: "2019 – 2021", description: "Developed churn prediction models and customer segmentation strategies." },
      { title: "Research Assistant", company: "UP Diliman", duration: "2018 – 2019", description: "Climate data modeling and IoT sensor network analysis." },
    ],
    education: [
      { degree: "M.S. Data Science", school: "University of the Philippines Diliman", year: "2019" },
      { degree: "B.S. Statistics", school: "Ateneo de Manila University", year: "2017" },
    ],
    certifications: [
      { name: "TensorFlow Developer Certificate", issuer: "Google", year: "2021" },
      { name: "IBM Data Science Professional", issuer: "IBM", year: "2020" },
    ],
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
    linkedIn: "linkedin.com/in/saraalrashid",
    languages: ["English", "Arabic", "French"],
    workExperience: [
      { title: "Director of Business Development", company: "Careem (Uber)", duration: "2021 – Present", description: "Led enterprise partnerships across MENA generating $15M in new revenue." },
      { title: "Senior BD Manager", company: "Aramex", duration: "2018 – 2021", description: "Built logistics partnership network across 12 countries in Middle East & Africa." },
      { title: "Account Executive", company: "Noon.com", duration: "2016 – 2018", description: "Onboarded 2,000+ merchants onto the marketplace platform." },
    ],
    education: [
      { degree: "MBA", school: "London Business School", year: "2016" },
      { degree: "B.S. Business Administration", school: "American University of Sharjah", year: "2014" },
    ],
    certifications: [
      { name: "Salesforce Certified Administrator", issuer: "Salesforce", year: "2020" },
      { name: "PMP Certification", issuer: "PMI", year: "2019" },
    ],
  },
];
