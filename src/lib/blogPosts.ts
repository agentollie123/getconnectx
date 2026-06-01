export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readingTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "child-safety-and-protection-policy",
    title: "ConnectX Child Safety and Protection Policy",
    description:
      "Our zero-tolerance approach to child sexual abuse, exploitation, and any conduct that endangers minors on the ConnectX platform.",
    category: "Trust & Safety",
    date: "June 1, 2026",
    readingTime: "12 min read",
  },
];
