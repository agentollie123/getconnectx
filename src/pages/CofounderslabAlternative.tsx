import { SeoLandingPage } from "@/components/seo/SeoLandingPage";

const CofounderslabAlternative = () => (
  <SeoLandingPage
    path="/cofounderslab-alternative"
    metaTitle="ConnectX — The Modern CoFoundersLab Alternative"
    metaDescription="Looking for a CoFoundersLab alternative? ConnectX uses intent-based matching, mobile-first swipe discovery, and real founder signals to connect you faster."
    eyebrow="CoFoundersLab Alternative"
    h1="The modern alternative to"
    h1Highlight="CoFoundersLab."
    subhead="Same goal — find your co-founder. Built for how founders actually move in 2026: mobile, intent-based, and ruthlessly focused on real builders."
    intro="CoFoundersLab pioneered co-founder matching online. ConnectX is what that idea looks like rebuilt from scratch: swipe-style discovery, intent-based matching, premium intelligence for serious founders, and a strict focus on people who actually want to start — not just network."
    benefits={[
      {
        title: "Swipe, don't search",
        body: "Browsing endless founder directories burns hours. ConnectX surfaces the right matches in a focused swipe feed designed for fast, high-quality decisions.",
      },
      {
        title: "Intent over inventory",
        body: "Other platforms list anyone with a profile. ConnectX only shows builders with active intent — so you don't waste connects on people who left years ago.",
      },
      {
        title: "Built for serious founders",
        body: "Premium tier unlocks deeper filters, compatibility intelligence, and priority signals — the things power-users of legacy platforms wish they had.",
      },
    ]}
    vsLabel="ConnectX vs CoFoundersLab"
    vsTable={[
      { feature: "Discovery model", us: "Swipe + intent feed", them: "Search + directory" },
      { feature: "Profile freshness", us: "Active intent only", them: "Years of dormant profiles" },
      { feature: "Mobile experience", us: "Mobile-first", them: "Web-first, dated UI" },
      { feature: "Match intelligence", us: "AI compatibility reports", them: "Basic filters" },
      { feature: "Pricing transparency", us: "Free + simple Premium", them: "Tiered paywalls" },
    ]}
    faq={[
      {
        q: "Is ConnectX a real CoFoundersLab alternative?",
        a: "Yes. ConnectX solves the same core problem — finding the right co-founder online — but rebuilt with modern intent-based matching, swipe UX, and a verified, active builder base.",
      },
      {
        q: "Why switch from CoFoundersLab?",
        a: "Most CoFoundersLab profiles are years old and inactive. ConnectX only surfaces founders with current intent, so every match is someone actually ready to start or join a startup right now.",
      },
      {
        q: "What does ConnectX have that CoFoundersLab doesn't?",
        a: "Mobile-first swipe discovery, intent-based matching, AI team compatibility reports, and a Premium tier built around real founder workflows — not legacy directory features.",
      },
      {
        q: "Can I try it free?",
        a: "Yes. You can find a co-founder on the free plan today. Premium unlocks priority signals and deeper intelligence for founders who want to move faster.",
      },
    ]}
  />
);

export default CofounderslabAlternative;
