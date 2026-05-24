import { SeoLandingPage } from "@/components/seo/SeoLandingPage";

const FindACofounder = () => (
  <SeoLandingPage
    path="/find-a-cofounder"
    metaTitle="Find a Co-Founder — Match With Builders on ConnectX"
    metaDescription="Find a co-founder for your startup with ConnectX. Match with technical, business, and product builders by intent, skills, and conviction — not résumés."
    eyebrow="Find a Co-Founder"
    h1="Find a co-founder who actually"
    h1Highlight="ships."
    subhead="ConnectX matches founders with the right co-founder by intent, skills, and how you build — not how you look on LinkedIn."
    intro="Looking for a co-founder is the highest-stakes hire of your life. ConnectX is built specifically for founders who want to find a co-founder fast: define what you need, swipe through pre-qualified builders, and start a real conversation in minutes — not months of networking events."
    benefits={[
      {
        title: "Intent-matched, not résumé-matched",
        body: "Tell us what you're building and what role you need. We surface co-founders aligned on stage, commitment, and equity expectations — so the first conversation is the right conversation.",
      },
      {
        title: "Technical, product, or business",
        body: "Find a technical co-founder, a product partner, or a commercial operator. Filter by skill, stack, and domain so you only see people who can actually fill the gap.",
      },
      {
        title: "Real signals, not vanity metrics",
        body: "We weight what's shipped, what's tried, and what's owned over follower counts. The result: less noise, more founders who match your bar.",
      },
    ]}
    vsLabel="Find a co-founder, the ConnectX way"
    vsTable={[
      { feature: "Time to first real conversation", us: "Minutes", them: "Weeks of networking" },
      { feature: "Match criteria", us: "Intent + skills + stage", them: "Job titles & résumés" },
      { feature: "Built for", us: "Starting a startup", them: "Finding a job" },
      { feature: "Signal quality", us: "Verified builders only", them: "Open networking" },
    ]}
    faq={[
      {
        q: "How do I find a co-founder on ConnectX?",
        a: "Create your founder profile, set your intent (what you're building, what you need), and start swiping. Connect when there's mutual interest — then jump straight into a real conversation about the startup.",
      },
      {
        q: "Is ConnectX better than a co-founder matching event?",
        a: "Events surface whoever shows up that night. ConnectX surfaces co-founders who match your stage, skills, and commitment — anytime, from anywhere. You skip months of networking to get to the right 1:1 fast.",
      },
      {
        q: "Can I find a technical co-founder here?",
        a: "Yes. Filter by role, stack, and domain to surface technical co-founders who can actually build what you're shipping. No spam, no recruiters — only founders.",
      },
      {
        q: "Is ConnectX free?",
        a: "Yes — you can find a co-founder on the free plan. Premium unlocks deeper filters, priority signals, and unlimited connections for founders who want to move faster.",
      },
    ]}
  />
);

export default FindACofounder;
