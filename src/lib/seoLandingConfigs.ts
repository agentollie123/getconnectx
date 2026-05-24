import type { SeoLandingProps } from "@/components/seo/SeoLandingPage";

export const seoLandingConfigs: Record<string, SeoLandingProps> = {
  "bumble-for-cofounders": {
    path: "/bumble-for-cofounders",
    metaTitle: "Bumble for Co-Founders — Match & Build Startups | ConnectX",
    metaDescription: "Think Bumble, but for co-founders. ConnectX matches founders with builders by intent, skills, and stage — swipe, connect, build a startup together.",
    eyebrow: "Bumble for Co-Founders",
    h1: "Bumble for co-founders,",
    h1Highlight: "built for builders.",
    subhead: "Swipe through pre-qualified founders and builders. Match on intent, not job titles. Start a real conversation about the startup you want to build.",
    intro: "If Bumble made meeting people simple, ConnectX makes finding a co-founder simple. No cold DMs, no networking events, no endless LinkedIn scrolling — just intent-matched founders and builders ready to start something real.",
    benefits: [
      { title: "Swipe with intent", body: "Every profile is a builder with active intent. Swipe right when there's a real fit on stage, skills, and conviction." },
      { title: "Mutual match only", body: "Conversations open only when both sides connect — so every chat starts with mutual interest, not a cold pitch." },
      { title: "Built for shipping", body: "We surface people who build, not people who just talk about building. Find a co-founder who can actually ship." },
    ],
    vsLabel: "Why founders call ConnectX 'Bumble for co-founders'",
    vsTable: [
      { feature: "Match style", us: "Swipe + mutual connect", them: "Cold outreach & DMs" },
      { feature: "Built for", us: "Starting a startup", them: "Dating or networking" },
      { feature: "Profile signal", us: "What you've built", them: "Photos & bios" },
      { feature: "Outcome", us: "Co-founders & teams", them: "More tabs to close" },
    ],
    faq: [
      { q: "Is ConnectX really like Bumble but for co-founders?", a: "Yes — same swipe-and-match mechanic, but built specifically for founders looking for a co-founder, technical partner, or early teammate." },
      { q: "How is the match decided?", a: "ConnectX matches on intent (what you're building), skills (what you bring), and stage (where you are) — not photos or titles." },
      { q: "Is it free?", a: "Yes, the core matching is free. Premium unlocks deeper filters and priority visibility." },
      { q: "Who's on it?", a: "Technical co-founders, product builders, designers, operators, and founders at idea, MVP, and traction stages." },
    ],
  },
  "bumble-for-startups": {
    path: "/bumble-for-startups",
    metaTitle: "Bumble for Startups — Match Founders & Builders | ConnectX",
    metaDescription: "Bumble for startups: swipe, match, and build. ConnectX connects startups with the co-founders and early teammates they need to launch.",
    eyebrow: "Bumble for Startups",
    h1: "Bumble for startups —",
    h1Highlight: "match. build. launch.",
    subhead: "ConnectX is where startups meet the people who'll build them. Swipe through builders, connect on mutual intent, and form your founding team.",
    intro: "Starting a startup shouldn't depend on who you happen to know. ConnectX is the Bumble-style matching app for startups: define your stage, your gaps, and your conviction — and meet the builders who match.",
    benefits: [
      { title: "Match by startup fit", body: "Stage, vertical, equity expectations, and skills — all weighted into the match so your first chat is the right chat." },
      { title: "Founders, not freelancers", body: "Everyone on ConnectX is here to start or join a startup — not hunt for contracts." },
      { title: "From swipe to shipping", body: "Connect, message, and start building. No middlemen, no recruiters, no fees on the team you form." },
    ],
    vsLabel: "Why startups use ConnectX",
    vsTable: [
      { feature: "Built for", us: "Startup formation", them: "Job hunting" },
      { feature: "Match mechanic", us: "Mutual swipe", them: "Apply & wait" },
      { feature: "Talent signal", us: "Intent + skills", them: "Résumé bullets" },
      { feature: "Cost to form a team", us: "Free to match", them: "Recruiter fees" },
    ],
    faq: [
      { q: "How is this Bumble for startups?", a: "Same simple swipe-and-match flow Bumble pioneered — applied to founding teams instead of dating." },
      { q: "Who's on the app?", a: "Founders looking for co-founders, builders looking for startups, and early operators wanting equity, not a salary." },
      { q: "Can I post my startup?", a: "Yes — startups create a profile, define their gaps, and get matched with builders who fit." },
    ],
  },
  "tinder-for-cofounders": {
    path: "/tinder-for-cofounders",
    metaTitle: "Tinder for Co-Founders — Swipe to Find Your Co-Founder | ConnectX",
    metaDescription: "Tinder for co-founders: swipe, match, build. ConnectX is the fastest way to find a technical or business co-founder for your startup.",
    eyebrow: "Tinder for Co-Founders",
    h1: "Tinder for co-founders,",
    h1Highlight: "minus the small talk.",
    subhead: "Swipe through builders ready to start. Match on intent, not pleasantries. Find the co-founder you've been searching for.",
    intro: "Founders have been calling ConnectX 'Tinder for co-founders' since day one — and the comparison fits. We took the swipe mechanic that made meeting people frictionless and rebuilt it for the highest-stakes match of your life: finding your co-founder.",
    benefits: [
      { title: "Fast, frictionless matching", body: "Swipe through pre-qualified founders and builders in minutes. No long applications, no endless filtering." },
      { title: "Quality over volume", body: "Every profile is a verified builder with active intent. You see fewer profiles — but every one is real." },
      { title: "Skip the small talk", body: "Profiles surface what matters: what they've built, what they bring, what they want. Get to the real conversation faster." },
    ],
    vsLabel: "Why 'Tinder for co-founders' actually fits",
    vsTable: [
      { feature: "Match flow", us: "Swipe + mutual match", them: "Email & InMail" },
      { feature: "Profile depth", us: "Intent + skills + stage", them: "Tagline + photo" },
      { feature: "Built for", us: "Finding a co-founder", them: "Finding a date" },
      { feature: "Outcome", us: "Founding teams", them: "First dates" },
    ],
    faq: [
      { q: "Is ConnectX really Tinder for co-founders?", a: "It uses the same swipe-and-match mechanic, but every profile is a verified founder or builder with active intent to start or join a startup." },
      { q: "Can I find a technical co-founder?", a: "Yes — filter by role, stack, and skill to surface technical co-founders ready to build." },
      { q: "How long until I match?", a: "Most founders match within the first session. The more specific your intent, the faster the right people surface." },
    ],
  },
  "tinder-for-startups": {
    path: "/tinder-for-startups",
    metaTitle: "Tinder for Startups — Match With Builders & Co-Founders | ConnectX",
    metaDescription: "Tinder for startups: swipe to match with co-founders, early teammates, and builders. ConnectX is where startups find their founding team.",
    eyebrow: "Tinder for Startups",
    h1: "Tinder for startups —",
    h1Highlight: "swipe. match. build.",
    subhead: "Startups swipe through builders. Builders swipe through startups. Mutual match opens the chat. That's it.",
    intro: "Most matchmaking apps for startups feel like job boards in disguise. ConnectX doesn't. We took the simplest, fastest matching mechanic ever built — Tinder's swipe — and rebuilt it for founders, builders, and the early-team moment that decides whether a startup happens.",
    benefits: [
      { title: "Simple by design", body: "One swipe gesture, one mutual connect, one chat. No applications, no recruiters, no friction." },
      { title: "Built for early teams", body: "We surface people who join at the start — not employees looking for a salary at scale." },
      { title: "Equity-first matches", body: "Match with builders who want equity, not a paycheck. The first chat is about building, not benefits." },
    ],
    vsTable: [
      { feature: "Match mechanic", us: "Swipe + mutual connect", them: "Apply & wait" },
      { feature: "Compensation lens", us: "Equity-first", them: "Salary-first" },
      { feature: "Built for", us: "Day-zero teams", them: "Series A hiring" },
    ],
    faq: [
      { q: "Is this for startups or co-founders?", a: "Both — startups can list their gaps, builders can list their intent, and matches happen when both swipe right." },
      { q: "Do I need an idea already?", a: "No. Many matches form around shared interests and decide on the idea together." },
    ],
  },
  "yc-cofounder-match-alternative": {
    path: "/yc-cofounder-match-alternative",
    metaTitle: "YC Co-Founder Matching Alternative — Find a Co-Founder | ConnectX",
    metaDescription: "Looking for a YC Co-Founder Matching alternative? ConnectX matches founders globally by intent, skills, and stage — no YC application required.",
    eyebrow: "YC Co-Founder Matching Alternative",
    h1: "The YC Co-Founder Matching alternative",
    h1Highlight: "open to everyone.",
    subhead: "ConnectX gives any founder — accepted to YC or not — the same swipe-to-match experience for finding a co-founder.",
    intro: "YC Co-Founder Matching works well if you're already in the YC ecosystem. ConnectX opens that same intent-based matching to every founder, globally — no application, no gatekeeping, just builders meeting builders.",
    benefits: [
      { title: "Open to every founder", body: "No application, no acceptance required. Anyone serious about building can find a co-founder here." },
      { title: "Global builder pool", body: "Founders from the US, Europe, LATAM, and Asia — far beyond any single accelerator's batch." },
      { title: "Intent-matched", body: "We match on what you're building and what you need — the same logic YC matching uses, available to everyone." },
    ],
    vsLabel: "ConnectX vs YC Co-Founder Matching",
    vsTable: [
      { feature: "Access", us: "Open to all founders", them: "YC-affiliated only" },
      { feature: "Geography", us: "Global", them: "Mostly US/SF" },
      { feature: "Match logic", us: "Intent + skills + stage", them: "Intent + skills" },
      { feature: "Cost", us: "Free to match", them: "Free (if accepted)" },
    ],
    faq: [
      { q: "Is ConnectX an official YC product?", a: "No. ConnectX is an independent platform offering YC-style co-founder matching to every founder, not just YC-accepted ones." },
      { q: "Who should use the YC tool vs ConnectX?", a: "If you've been accepted to YC, use both. If you haven't, ConnectX gives you the same intent-based matching without the application gate." },
      { q: "Is the talent quality comparable?", a: "ConnectX verifies builders and weights what they've shipped. Quality compares well — and the global pool is larger." },
    ],
  },
  "yc-cofounder-match-alternative-asia": {
    path: "/yc-cofounder-match-alternative-asia",
    metaTitle: "YC Co-Founder Matching Alternative for Asia | ConnectX",
    metaDescription: "The YC Co-Founder Matching alternative for Asia. ConnectX connects founders across Southeast Asia, India, and beyond — no YC application required.",
    eyebrow: "YC Alternative — Asia",
    h1: "YC Co-Founder Matching,",
    h1Highlight: "built for Asia.",
    subhead: "ConnectX brings intent-based co-founder matching to founders across Southeast Asia, India, and the broader region.",
    intro: "YC Co-Founder Matching is great if you're in San Francisco. ConnectX brings the same matching power to founders building in Jakarta, Singapore, Bangalore, Manila, Ho Chi Minh, and across Asia — where time zones, markets, and local context actually matter.",
    benefits: [
      { title: "Built for the region", body: "Filter and match across cities, languages, and markets in Asia — not just SF or NYC." },
      { title: "Local + global builders", body: "Connect with regional co-founders who understand your market, or globally distributed ones if you're going cross-border." },
      { title: "No accelerator gate", body: "You don't need to be in YC, Antler, or any accelerator. Just be serious about building." },
    ],
    vsLabel: "ConnectX Asia vs YC Co-Founder Matching",
    vsTable: [
      { feature: "Regional coverage", us: "Asia-first, global access", them: "US-heavy" },
      { feature: "Access", us: "Open to all founders", them: "YC-affiliated only" },
      { feature: "Local context", us: "Market + language filters", them: "Limited" },
    ],
    faq: [
      { q: "Does ConnectX work for founders in Indonesia, Singapore, India?", a: "Yes — Asia is one of ConnectX's strongest regions, with active builders across SEA, India, and East Asia." },
      { q: "Can I match with co-founders globally too?", a: "Yes. Filter for local-only or open to global to match across regions." },
    ],
  },
  "yc-startup-match-alternative-indonesia": {
    path: "/yc-startup-match-alternative-indonesia",
    metaTitle: "YC Startup Matching Alternative for Indonesia | ConnectX",
    metaDescription: "The YC startup matching alternative built for Indonesia. ConnectX connects Indonesian founders with co-founders and early teammates by intent.",
    eyebrow: "YC Alternative — Indonesia",
    h1: "YC startup matching,",
    h1Highlight: "for Indonesia.",
    subhead: "ConnectX is where Indonesian founders find their co-founder, technical partner, or early team — no Bay Area required.",
    intro: "Most co-founder matching platforms assume you're in San Francisco. ConnectX is built so Indonesian founders — in Jakarta, Bandung, Surabaya, Bali, or anywhere else — can find the right team locally, regionally, or globally.",
    benefits: [
      { title: "Indonesia-first", body: "Match with founders and builders who understand the Indonesian market, payments, and culture." },
      { title: "Regional + global reach", body: "Open to SEA and global builders when you need cross-border skill sets." },
      { title: "Bilingual experience", body: "ConnectX supports both English and Bahasa Indonesia so language never blocks the right match." },
    ],
    vsLabel: "ConnectX Indonesia vs YC startup matching",
    vsTable: [
      { feature: "Built for", us: "Indonesian + global founders", them: "Mostly US/SF" },
      { feature: "Language", us: "EN + Bahasa Indonesia", them: "English only" },
      { feature: "Access", us: "Open to anyone", them: "YC-affiliated only" },
    ],
    faq: [
      { q: "Does ConnectX have many Indonesian builders?", a: "Yes — Indonesia is a core market. You'll find technical co-founders, designers, and operators across the country." },
      { q: "Can I match with regional founders in SEA?", a: "Yes, filter by region to reach Singapore, Vietnam, Philippines, Malaysia, and beyond." },
    ],
  },
  "find-a-technical-cofounder": {
    path: "/find-a-technical-cofounder",
    metaTitle: "Find a Technical Co-Founder — Match With Builders | ConnectX",
    metaDescription: "Find a technical co-founder fast. ConnectX matches non-technical founders with engineers, CTOs, and product builders ready to start a startup.",
    eyebrow: "Find a Technical Co-Founder",
    h1: "Find a technical co-founder",
    h1Highlight: "who actually ships.",
    subhead: "ConnectX matches non-technical founders with engineers and CTOs ready to build — by intent, stack, and conviction.",
    intro: "Finding a technical co-founder is the hardest hire most founders ever make. ConnectX makes it specific: filter by stack, domain, and stage, then swipe through engineers who want to start a startup — not freelance, not consult.",
    benefits: [
      { title: "Filter by stack", body: "Match with engineers in the exact stack you need — TypeScript, Python, Swift, AI/ML, whatever fits." },
      { title: "Builders who want equity", body: "Every technical profile is a builder open to founding-team equity, not contract work." },
      { title: "Real shipping history", body: "Profiles surface what they've built — projects, GitHub, products — so signal beats marketing." },
    ],
    vsTable: [
      { feature: "Profile signal", us: "Stack + ship history", them: "Job titles" },
      { feature: "Compensation lens", us: "Equity-first", them: "Salary-first" },
      { feature: "Match time", us: "Minutes", them: "Months" },
    ],
    faq: [
      { q: "How do I find a technical co-founder on ConnectX?", a: "Set your intent and target stack. Swipe through engineers and CTOs who match. Connect when there's mutual interest." },
      { q: "Will technical founders actually want to talk to me?", a: "Yes — every connect is mutual. If they swipe right, they're open to the conversation. No cold outreach required." },
    ],
  },
};

// ============================================================
// Region-specific landing pages (SEA, APAC, South Asia, Middle East)
// ============================================================

type RegionSpec = {
  slug: string;
  place: string;
  shortPlace?: string;
  marketNote: string;
  nearby: string;
};

const cities: RegionSpec[] = [
  // SEA
  { slug: "singapore", place: "Singapore", marketNote: "Singapore is Southeast Asia's startup capital — fintech, deeptech, and B2B SaaS builders are everywhere.", nearby: "Singapore, KL, Jakarta, and Ho Chi Minh" },
  { slug: "jakarta", place: "Jakarta", marketNote: "Jakarta is Indonesia's startup engine — the largest builder pool in Southeast Asia.", nearby: "Jakarta, Bandung, Bali, and Surabaya" },
  { slug: "bangkok", place: "Bangkok", marketNote: "Bangkok's startup scene is growing fast across fintech, e-commerce, and travel tech.", nearby: "Bangkok, Chiang Mai, and Phuket" },
  { slug: "manila", place: "Manila", marketNote: "Manila and Cebu host one of Asia's most underrated technical talent pools.", nearby: "Manila, Cebu, and Davao" },
  { slug: "kuala-lumpur", place: "Kuala Lumpur", marketNote: "KL connects Malaysian builders with regional capital across SEA.", nearby: "KL, Penang, and Johor Bahru" },
  { slug: "ho-chi-minh", place: "Ho Chi Minh City", marketNote: "Ho Chi Minh City has one of Asia's deepest engineering talent benches.", nearby: "Ho Chi Minh City, Hanoi, and Da Nang" },
  { slug: "hanoi", place: "Hanoi", marketNote: "Hanoi's engineering scene rivals any in Southeast Asia.", nearby: "Hanoi, Ho Chi Minh City, and Da Nang" },
  // APAC
  { slug: "tokyo", place: "Tokyo", marketNote: "Tokyo's startup scene is global-tier — deeptech, robotics, AI, and consumer.", nearby: "Tokyo, Osaka, and Fukuoka" },
  { slug: "seoul", place: "Seoul", marketNote: "Seoul leads APAC in consumer, gaming, and AI startups.", nearby: "Seoul and Busan" },
  { slug: "hong-kong", place: "Hong Kong", marketNote: "Hong Kong remains a cross-border hub for fintech and Web3 founders.", nearby: "Hong Kong and the Greater Bay Area" },
  { slug: "taipei", place: "Taipei", marketNote: "Taipei is a powerhouse for hardware, semiconductors, and AI infrastructure founders.", nearby: "Taipei, Hsinchu, and Taichung" },
  { slug: "sydney", place: "Sydney", marketNote: "Sydney and Melbourne anchor APAC's most mature startup ecosystem outside Asia.", nearby: "Sydney, Melbourne, and Brisbane" },
  // South Asia
  { slug: "bangalore", place: "Bangalore", marketNote: "Bangalore is the world's largest concentration of technical co-founders outside the Bay Area.", nearby: "Bangalore, Hyderabad, and Chennai" },
  { slug: "mumbai", place: "Mumbai", marketNote: "Mumbai is India's commercial capital — fintech, D2C, and SaaS founders galore.", nearby: "Mumbai, Pune, and Ahmedabad" },
  { slug: "delhi", place: "Delhi NCR", marketNote: "Delhi NCR (Gurgaon and Noida included) is India's fastest-growing founder hub.", nearby: "Delhi, Gurgaon, and Noida" },
  { slug: "karachi", place: "Karachi", marketNote: "Karachi anchors Pakistan's growing fintech and e-commerce scene.", nearby: "Karachi, Lahore, and Islamabad" },
  { slug: "dhaka", place: "Dhaka", marketNote: "Dhaka's startup scene is emerging fast across fintech and logistics.", nearby: "Dhaka and Chittagong" },
  // Middle East
  { slug: "dubai", place: "Dubai", marketNote: "Dubai is the Middle East's startup magnet — capital, talent, and zero income tax.", nearby: "Dubai, Abu Dhabi, and Sharjah" },
  { slug: "abu-dhabi", place: "Abu Dhabi", marketNote: "Abu Dhabi's Hub71 and sovereign capital make it a serious founder destination.", nearby: "Abu Dhabi and Dubai" },
  { slug: "riyadh", place: "Riyadh", marketNote: "Riyadh is the fastest-growing startup capital in MENA, backed by Vision 2030.", nearby: "Riyadh, Jeddah, and NEOM" },
  { slug: "tel-aviv", place: "Tel Aviv", marketNote: "Tel Aviv is one of the densest startup ecosystems on earth.", nearby: "Tel Aviv, Herzliya, and Haifa" },
  { slug: "cairo", place: "Cairo", marketNote: "Cairo leads North Africa's startup scene across fintech and e-commerce.", nearby: "Cairo and Alexandria" },
  { slug: "doha", place: "Doha", marketNote: "Doha is investing heavily in becoming a regional startup hub.", nearby: "Doha and the Gulf" },
];

const countries: RegionSpec[] = [
  { slug: "indonesia", place: "Indonesia", marketNote: "Indonesia is Southeast Asia's largest startup market — 270M+ people and a booming digital economy.", nearby: "Jakarta, Bandung, Surabaya, and Bali" },
  { slug: "thailand", place: "Thailand", marketNote: "Thailand's startup scene spans fintech, travel, and consumer tech.", nearby: "Bangkok, Chiang Mai, and Phuket" },
  { slug: "vietnam", place: "Vietnam", marketNote: "Vietnam has one of Asia's deepest pools of engineering talent.", nearby: "Ho Chi Minh City, Hanoi, and Da Nang" },
  { slug: "philippines", place: "the Philippines", shortPlace: "the Philippines", marketNote: "The Philippines combines English-fluent talent with a fast-growing digital market.", nearby: "Manila, Cebu, and Davao" },
  { slug: "malaysia", place: "Malaysia", marketNote: "Malaysia connects ASEAN's builder ecosystems with regional capital.", nearby: "KL, Penang, and Johor Bahru" },
  { slug: "india", place: "India", marketNote: "India has the world's largest concentration of technical co-founders outside the US.", nearby: "Bangalore, Mumbai, Delhi NCR, and Hyderabad" },
  { slug: "pakistan", place: "Pakistan", marketNote: "Pakistan's startup ecosystem is among the fastest-growing in South Asia.", nearby: "Karachi, Lahore, and Islamabad" },
  { slug: "bangladesh", place: "Bangladesh", marketNote: "Bangladesh's startup scene is emerging fast in fintech and logistics.", nearby: "Dhaka and Chittagong" },
  { slug: "uae", place: "the UAE", shortPlace: "the UAE", marketNote: "The UAE is the Middle East's startup capital — capital, talent, and zero income tax.", nearby: "Dubai, Abu Dhabi, and Sharjah" },
  { slug: "saudi-arabia", place: "Saudi Arabia", marketNote: "Saudi Arabia's Vision 2030 is fueling the fastest startup growth in MENA.", nearby: "Riyadh, Jeddah, and NEOM" },
  { slug: "israel", place: "Israel", marketNote: "Israel is one of the densest startup ecosystems on earth.", nearby: "Tel Aviv, Herzliya, and Haifa" },
  { slug: "qatar", place: "Qatar", marketNote: "Qatar is investing heavily in startup infrastructure across the Gulf.", nearby: "Doha and the Gulf" },
  { slug: "japan", place: "Japan", marketNote: "Japan's startup ecosystem is global-tier in deeptech, robotics, and AI.", nearby: "Tokyo, Osaka, and Fukuoka" },
  { slug: "south-korea", place: "South Korea", marketNote: "South Korea leads APAC in consumer, gaming, and AI startups.", nearby: "Seoul and Busan" },
  { slug: "taiwan", place: "Taiwan", marketNote: "Taiwan is a global powerhouse for hardware and AI infrastructure founders.", nearby: "Taipei, Hsinchu, and Taichung" },
];

function buildCofounderConfig(r: RegionSpec): SeoLandingProps {
  const place = r.shortPlace ?? r.place;
  return {
    path: `/find-a-cofounder-${r.slug}`,
    metaTitle: `Find a Co-Founder in ${r.place} — Match & Build | ConnectX`,
    metaDescription: `Find a co-founder in ${r.place}. ConnectX matches founders and builders in ${r.place} by intent, skills, and stage — swipe, connect, build.`,
    eyebrow: `Find a Co-Founder · ${r.place}`,
    h1: `Find a co-founder in ${place},`,
    h1Highlight: `built for builders.`,
    subhead: `Swipe through founders and builders in ${r.place}. Match on intent, skills, and stage — then start the real conversation.`,
    intro: `${r.marketNote} ConnectX gives founders in ${r.place} a swipe-and-match way to meet co-founders, technical partners, and early teammates — without cold DMs or networking events.`,
    benefits: [
      { title: `Local to ${r.place}`, body: `Filter for builders across ${r.nearby} — and open up to regional or global matches when you need a wider skill set.` },
      { title: "Intent-matched, not résumé-matched", body: "Match on what you're building and what they bring — not job titles or LinkedIn headlines." },
      { title: "Equity-first builders", body: `Everyone on ConnectX in ${r.place} is here to start or join a startup — not freelance, not consult.` },
    ],
    vsLabel: `Why founders in ${r.place} use ConnectX`,
    vsTable: [
      { feature: "Built for", us: `Founders in ${r.place}`, them: "Mostly US/SF" },
      { feature: "Match mechanic", us: "Swipe + mutual connect", them: "Cold outreach" },
      { feature: "Talent signal", us: "Intent + skills + stage", them: "Résumé bullets" },
      { feature: "Access", us: "Open to anyone", them: "Accelerator-gated" },
    ],
    faq: [
      { q: `How do I find a co-founder in ${r.place} on ConnectX?`, a: `Set your intent, stage, and location to ${r.place}. Swipe through founders and builders who match. Connect when both sides swipe right.` },
      { q: `Are there enough builders in ${r.place}?`, a: `Yes — ${r.place} is an active market for ConnectX, with founders, engineers, designers, and operators across ${r.nearby}.` },
      { q: "Can I match outside my city?", a: "Yes. Filter for local-only or open to regional and global matches when you need a wider talent pool." },
      { q: "Is it free?", a: "Yes, the core matching is free. Premium unlocks deeper filters and priority visibility." },
    ],
  };
}

function buildStartupConfig(r: RegionSpec): SeoLandingProps {
  const place = r.shortPlace ?? r.place;
  return {
    path: `/startup-matching-${r.slug}`,
    metaTitle: `Startup Matching in ${r.place} — Find Your Team | ConnectX`,
    metaDescription: `Startup matching in ${r.place}. ConnectX connects ${r.place} startups with co-founders and early teammates by intent — swipe, match, build.`,
    eyebrow: `Startup Matching · ${r.place}`,
    h1: `Startup matching in ${place} —`,
    h1Highlight: `swipe. match. build.`,
    subhead: `Startups in ${r.place} swipe through builders. Builders swipe through startups. Mutual match opens the chat.`,
    intro: `${r.marketNote} ConnectX is where startups in ${r.place} meet the people who'll build them — no recruiters, no job boards, no middlemen.`,
    benefits: [
      { title: "Regional reach", body: `Match across ${r.nearby} — or open up to global builders when you need cross-border skills.` },
      { title: "Founders, not freelancers", body: "Every match is someone here to start or join a startup, not contract or consult." },
      { title: "From swipe to shipping", body: "Connect, message, and start building. No fees on the team you form." },
    ],
    vsLabel: `Why startups in ${r.place} use ConnectX`,
    vsTable: [
      { feature: "Built for", us: `${r.place} startup formation`, them: "Job hunting" },
      { feature: "Match mechanic", us: "Mutual swipe", them: "Apply & wait" },
      { feature: "Cost to form a team", us: "Free to match", them: "Recruiter fees" },
    ],
    faq: [
      { q: `Does ConnectX have many builders in ${r.place}?`, a: `Yes — ${r.place} is a core market with active founders, engineers, designers, and operators.` },
      { q: "Can I match regionally?", a: `Yes, filter by region to reach builders across ${r.nearby} and beyond.` },
      { q: "Who's on the app?", a: "Founders looking for co-founders, builders looking for startups, and early operators wanting equity." },
    ],
  };
}

for (const r of [...cities, ...countries]) {
  seoLandingConfigs[`find-a-cofounder-${r.slug}`] = buildCofounderConfig(r);
  seoLandingConfigs[`startup-matching-${r.slug}`] = buildStartupConfig(r);
}

export const seoLandingSlugs = Object.keys(seoLandingConfigs);
