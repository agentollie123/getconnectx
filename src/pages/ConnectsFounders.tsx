import { SeoLandingPage } from "@/components/seo/SeoLandingPage";

const ConnectsFounders = () => (
  <SeoLandingPage
    path="/connects-founders"
    metaTitle="ConnectX Connects Founders With Co-Founders & Builders"
    metaDescription="ConnectX connects founders with the builders, co-founders, and early teammates they need to start a startup — by intent, not by networking."
    eyebrow="Connects Founders"
    h1="ConnectX connects founders with"
    h1Highlight="the right people."
    subhead="No networking. No job boards. Just the builders, operators, and co-founders you need to start."
    intro="Most founders fail not from lack of ideas — but from never finding the right people. ConnectX connects founders with technical co-founders, product builders, designers, and early operators who match on intent, conviction, and stage. One platform. Real conversations. Faster teams."
    benefits={[
      {
        title: "Builders, not browsers",
        body: "Every profile on ConnectX is a builder with active intent — someone who wants to start, join, or build a startup right now. Not idle networkers.",
      },
      {
        title: "Intent-based matching",
        body: "Our matching engine reads what you're building and who you need — and connects founders with co-founders whose goals and timeline actually line up.",
      },
      {
        title: "From discover to chat in minutes",
        body: "Swipe, connect, and message. No InMails. No cold outreach. Just direct conversations between founders who already mutually opted in.",
      },
    ]}
    vsLabel="Why founders connect on ConnectX"
    vsTable={[
      { feature: "Built for", us: "Founders & builders", them: "Job seekers & recruiters" },
      { feature: "Conversation starts", us: "Mutual intent only", them: "Cold DMs & InMails" },
      { feature: "Profile signal", us: "What you've built", them: "What you've titled" },
      { feature: "Outcome", us: "Co-founders & early teams", them: "More tabs to close" },
    ]}
    faq={[
      {
        q: "How does ConnectX connect founders?",
        a: "Set your intent — what you're building and who you need. ConnectX matches you with founders, co-founders, and builders who match on stage, skills, and conviction, then lets you connect and chat directly.",
      },
      {
        q: "Who's on ConnectX?",
        a: "Technical co-founders, product builders, designers, growth operators, and founders at idea, MVP, and traction stages — across regions, ready to start or join a startup.",
      },
      {
        q: "Is this a job board?",
        a: "No. ConnectX is built for forming startup teams, not filling roles. There's no apply button — there's a connect button. You and your match decide the equity, role, and commitment together.",
      },
      {
        q: "How is this different from LinkedIn?",
        a: "LinkedIn is for everyone. ConnectX is only for people who want to start or build a startup right now — so every connection counts.",
      },
    ]}
  />
);

export default ConnectsFounders;
