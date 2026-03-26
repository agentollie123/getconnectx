import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users, Building2, Rocket, Code, Palette, TrendingUp, Briefcase, Globe,
  Linkedin, Check, ArrowRight, ArrowLeft, Handshake, Target,
  Lightbulb, BarChart3, Clock, MapPin, User, Crown,
} from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

export type UserRole = "founder" | "cofounder" | "team" | "startup";

export interface OnboardingResult {
  userRole: UserRole;
  intent: "cofounder" | "team" | "both";
}

interface OnboardingFlowProps {
  onComplete: (result: OnboardingResult) => void;
  isPremium?: boolean;
}

const pageTransition = {
  enter: { x: 40, opacity: 0, scale: 0.97 },
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
  exit: { x: -40, opacity: 0, scale: 0.97, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] as [number, number, number, number] } },
};

function SelectCard({ selected, onClick, icon: Icon, iconColor, title, desc }: {
  selected: boolean; onClick: () => void; icon: any; iconColor: string; title: string; desc: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -2 }}
      className={`w-full p-4 rounded-2xl border-2 text-left flex items-center gap-4 transition-colors duration-200 ${
        selected ? "border-primary bg-primary/10" : "border-border hover:border-primary/50 bg-card"
      }`}
    >
      <motion.div
        animate={selected ? { scale: [1, 1.1, 1], boxShadow: "0 0 20px hsl(30 100% 61% / 0.3)" } : { scale: 1, boxShadow: "none" }}
        transition={{ duration: 0.3 }}
        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${iconColor}`}
      >
        <Icon className="w-6 h-6" />
      </motion.div>
      <div className="flex-1">
        <p className="font-display font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
            <Check className="w-5 h-5 text-primary" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function OptionButton({ selected, onClick, children, icon: Icon }: {
  selected: boolean; onClick: () => void; children: React.ReactNode; icon?: any;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={`w-full px-4 py-3 rounded-xl border-2 text-left flex items-center gap-3 transition-colors duration-200 ${
        selected ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/50"
      }`}
    >
      {Icon && <Icon className={`w-4 h-4 flex-shrink-0 ${selected ? "text-primary" : "text-muted-foreground"}`} />}
      <div className="flex-1 min-w-0">{children}</div>
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
            <Check className="w-4 h-4 text-primary flex-shrink-0" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function ChipButton({ selected, onClick, children, icon: Icon }: {
  selected: boolean; onClick: () => void; children: React.ReactNode; icon?: any;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.93 }}
      animate={selected ? { borderColor: "hsl(30 100% 61%)" } : {}}
      className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors duration-200 ${
        selected ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-foreground hover:border-primary/50"
      }`}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </motion.button>
  );
}

function AnimatedCTA({ onClick, disabled, children }: { onClick: () => void; disabled?: boolean; children: React.ReactNode }) {
  return (
    <motion.div whileTap={{ scale: 0.97 }} className="w-full max-w-xs">
      <Button
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 transition-all duration-200"
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </Button>
    </motion.div>
  );
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(0);
  const [userType, setUserType] = useState<"builder" | "startup" | null>(null);
  const [builderRole, setBuilderRole] = useState<"founder" | "cofounder" | "team" | null>(null);
  const [intent, setIntent] = useState<"cofounder" | "team" | "both" | null>(null);
  const [startupName, setStartupName] = useState("");
  const [startupStage, setStartupStage] = useState<string | null>(null);
  const [specifications, setSpecifications] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);

  // Co-founder and team builders skip the intent step (step 3)
  const skipStep3 = userType === "builder" && (builderRole === "cofounder" || builderRole === "team");
  const TOTAL_STEPS = skipStep3 ? 8 : 9;

  const finishOnboarding = () => {
    const role: UserRole = userType === "startup" ? "startup" : builderRole!;
    // Auto-determine intent for co-founder/team builders
    let finalIntent: "cofounder" | "team" | "both" = intent || "both";
    if (builderRole === "cofounder") finalIntent = "cofounder";
    if (builderRole === "team") finalIntent = "team";
    onComplete({ userRole: role, intent: finalIntent });
  };

  const next = () => {
    let nextStep = step + 1;
    if (nextStep === 3 && skipStep3) nextStep = 4;
    if (nextStep > 8) {
      finishOnboarding();
    } else {
      setStep(nextStep);
    }
  };

  const back = () => {
    let prevStep = step - 1;
    if (prevStep === 3 && skipStep3) prevStep = 2;
    if (prevStep >= 0) setStep(prevStep);
  };

  const getProgressIndex = () => {
    if (!skipStep3) return step;
    return step <= 2 ? step : step - 1;
  };

  const toggleItem = (arr: string[], setArr: (v: string[]) => void, item: string) => {
    setArr(arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item]);
  };

  const renderStep = () => {
    switch (step) {
      // ──── STEP 0: WELCOME ────
      case 0:
        return (
          <motion.div key="s0" variants={pageTransition} initial="enter" animate="center" exit="exit" className="flex flex-col items-center text-center px-6">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-6">
              <img src={logoIcon} alt="ConnectX" className="w-12 h-12 rounded-xl" />
            </motion.div>
            <motion.h1 initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15, duration: 0.35 }}
              className="font-display text-2xl font-bold text-foreground mb-3">
              Find the right people<br />to build with
            </motion.h1>
            <motion.p initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25, duration: 0.35 }}
              className="text-sm text-muted-foreground mb-8 max-w-xs">
              ConnectX matches you with co-founders, teammates, and startups based on skills, goals, and compatibility.
            </motion.p>
            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35, duration: 0.3 }} whileTap={{ scale: 0.97 }}>
              <Button className="w-full max-w-xs bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold" onClick={next}>
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        );

      // ──── STEP 1: BUILDER vs STARTUP ────
      case 1:
        return (
          <motion.div key="s1" variants={pageTransition} initial="enter" animate="center" exit="exit" className="flex flex-col items-center text-center px-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-2">How do you want to use ConnectX?</h2>
            <p className="text-sm text-muted-foreground mb-6">This shapes your entire experience</p>
            <div className="w-full max-w-xs space-y-3">
              <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                <SelectCard selected={userType === "builder"} onClick={() => { setUserType("builder"); setBuilderRole(null); setIntent(null); next(); }}
                  icon={Users} iconColor="bg-primary/10 text-primary" title="I'm a Builder"
                  desc="Founder, co-founder, or team member" />
              </motion.div>
              <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                <SelectCard selected={userType === "startup"} onClick={() => { setUserType("startup"); setBuilderRole(null); setIntent(null); next(); }}
                  icon={Building2} iconColor="bg-accent/10 text-accent" title="I represent a Startup"
                  desc="Building a team or hiring co-founders" />
              </motion.div>
            </div>
          </motion.div>
        );

      // ──── STEP 2: ROLE (Builder) or STARTUP DETAILS (Startup) ────
      case 2:
        if (userType === "builder") {
          return (
            <motion.div key="s2b" variants={pageTransition} initial="enter" animate="center" exit="exit" className="flex flex-col items-center text-center px-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-2">What best describes you?</h2>
              <p className="text-sm text-muted-foreground mb-6">This determines what you'll see in your feed</p>
              <div className="w-full max-w-xs space-y-3">
                <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                <SelectCard selected={builderRole === "founder"} onClick={() => { setBuilderRole("founder"); setSpecifications([]); next(); }}
                    icon={Rocket} iconColor="bg-primary/10 text-primary" title="Founder"
                    desc="I'm building something and looking for people" />
                </motion.div>
                <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.18 }}>
                  <SelectCard selected={builderRole === "cofounder"} onClick={() => { setBuilderRole("cofounder"); setSpecifications([]); setStep(4); }}
                    icon={Handshake} iconColor="bg-accent/10 text-accent" title="Co-Founder"
                    desc="I want to join a startup as a co-founder" />
                </motion.div>
                <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.26 }}>
                  <SelectCard selected={builderRole === "team"} onClick={() => { setBuilderRole("team"); setSpecifications([]); setStep(4); }}
                    icon={Users} iconColor="bg-muted text-foreground" title="Team Member"
                    desc="I want to join a startup team" />
                </motion.div>
              </div>
            </motion.div>
          );
        }
        // Startup details
        return (
          <motion.div key="s2s" variants={pageTransition} initial="enter" animate="center" exit="exit" className="flex flex-col items-center text-center px-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-2">Tell us about your startup</h2>
            <p className="text-sm text-muted-foreground mb-6">Help builders understand what you're building</p>
            <div className="w-full max-w-xs space-y-5">
              <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                <label className="text-xs font-semibold text-foreground text-left block mb-2">Startup Name</label>
                <Input
                  value={startupName}
                  onChange={(e) => setStartupName(e.target.value)}
                  placeholder="e.g. ConnectX, Acme Labs"
                  className="bg-card border-border"
                />
              </motion.div>
              <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                <label className="text-xs font-semibold text-foreground text-left block mb-2">Stage</label>
                <div className="flex gap-2">
                  {["Idea", "MVP", "Live"].map((stage) => (
                    <ChipButton key={stage} selected={startupStage === stage} onClick={() => setStartupStage(stage)}>
                      {stage}
                    </ChipButton>
                  ))}
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <AnimatedCTA onClick={next} disabled={!startupName.trim() || !startupStage}>
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </AnimatedCTA>
              </motion.div>
            </div>
          </motion.div>
        );

      // ──── STEP 3: INTENT (Founder & Startup only) ────
      case 3:
        return (
          <motion.div key="s3" variants={pageTransition} initial="enter" animate="center" exit="exit" className="flex flex-col items-center text-center px-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-2">
              {userType === "startup" ? "What are you looking for?" : "What are you looking for?"}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              {userType === "startup" ? "Who does your startup need right now?" : "Who do you need to move forward?"}
            </p>
            <div className="w-full max-w-xs space-y-3">
              <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                <SelectCard selected={intent === "cofounder"} onClick={() => { setIntent("cofounder"); next(); }}
                  icon={Handshake} iconColor="bg-primary/10 text-primary" title="Co-Founder"
                  desc={userType === "startup" ? "Find a co-founder to lead with you" : "Find someone to build with from day one"} />
              </motion.div>
              <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.18 }}>
                <SelectCard selected={intent === "team"} onClick={() => { setIntent("team"); next(); }}
                  icon={Users} iconColor="bg-accent/10 text-accent" title="Team Members"
                  desc={userType === "startup" ? "Hire early-stage talent for your startup" : "Recruit early members for your startup"} />
              </motion.div>
              <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.26 }}>
                <SelectCard selected={intent === "both"} onClick={() => { setIntent("both"); next(); }}
                  icon={Target} iconColor="bg-muted text-foreground" title="Both"
                  desc="I'm open to co-founders and team members" />
              </motion.div>
            </div>
          </motion.div>
        );

      // ──── STEP 4: INDUSTRY ────
      case 4: {
        const industryOptions = ["SaaS", "Fintech", "E-Commerce", "Health Tech", "EdTech", "AI / ML", "Climate Tech", "Social Impact"];
        const isStartup = userType === "startup";
        return (
          <motion.div key="s4" variants={pageTransition} initial="enter" animate="center" exit="exit" className="flex flex-col items-center text-center px-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-2">
              {isStartup ? "What industry is your startup in?" : "What industries interest you?"}
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              {isStartup ? "Select your startup's sector" : "Select all that apply"}
            </p>
            <div className="w-full max-w-xs flex flex-wrap gap-2 justify-center">
              {industryOptions.map((ind, i) => (
                <motion.div key={ind} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 * i, duration: 0.25 }}>
                  <ChipButton
                    selected={industries.includes(ind)}
                    onClick={() => isStartup ? setIndustries([ind]) : toggleItem(industries, setIndustries, ind)}
                    icon={Target}
                  >
                    {ind}
                  </ChipButton>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-6">
              <AnimatedCTA onClick={next} disabled={industries.length === 0}>
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </AnimatedCTA>
            </motion.div>
          </motion.div>
        );
      }

      // ──── STEP 5: SPECS / SKILLS ────
      case 5: {
        let stepTitle: string;
        let stepSubtitle: string;
        let specOptions: { label: string; icon: any; desc: string }[];

        const role = userType === "startup" ? "startup" : builderRole;
        const lookingFor = intent || (builderRole === "cofounder" ? "cofounder" : "team");

        if (role === "startup" && (lookingFor === "cofounder" || lookingFor === "both")) {
          stepTitle = "What kind of co-founder are you looking for?";
          stepSubtitle = "Select all that apply";
          specOptions = [
            { label: "Technical Co-Founder", icon: Code, desc: "Engineering & architecture" },
            { label: "Business Co-Founder", icon: Briefcase, desc: "Strategy & operations" },
            { label: "Product Co-Founder", icon: Lightbulb, desc: "Product vision & design" },
            { label: "Growth Co-Founder", icon: BarChart3, desc: "Marketing & distribution" },
          ];
          if (lookingFor === "both") {
            specOptions.push(
              { label: "Full-Stack Engineer", icon: Code, desc: "Build & ship fast" },
              { label: "Product Designer", icon: Palette, desc: "UX/UI & product thinking" },
              { label: "Growth Marketer", icon: TrendingUp, desc: "Acquisition & retention" },
            );
            stepTitle = "What roles does your startup need?";
          }
        } else if (role === "startup" && lookingFor === "team") {
          stepTitle = "What talent does your startup need?";
          stepSubtitle = "Select all roles you're hiring for";
          specOptions = [
            { label: "CTO / Technical Lead", icon: Code, desc: "Lead engineering & tech stack" },
            { label: "Product Designer", icon: Palette, desc: "UX/UI & product thinking" },
            { label: "Growth Marketer", icon: TrendingUp, desc: "Acquisition & retention" },
            { label: "Full-Stack Engineer", icon: Code, desc: "Build & ship fast" },
            { label: "Operations Lead", icon: Globe, desc: "Ops, finance & logistics" },
          ];
        } else if (role === "founder") {
          if (lookingFor === "cofounder") {
            stepTitle = "What kind of co-founder do you need?";
            stepSubtitle = "Select all that apply";
            specOptions = [
              { label: "Technical Co-Founder", icon: Code, desc: "Engineering & architecture" },
              { label: "Business Co-Founder", icon: Briefcase, desc: "Strategy & operations" },
              { label: "Product Co-Founder", icon: Lightbulb, desc: "Product vision & design" },
              { label: "Growth Co-Founder", icon: BarChart3, desc: "Marketing & distribution" },
            ];
          } else if (lookingFor === "team") {
            stepTitle = "What roles do you need?";
            stepSubtitle = "Select all that apply";
            specOptions = [
              { label: "CTO / Technical Lead", icon: Code, desc: "Lead engineering & tech stack" },
              { label: "Product Designer", icon: Palette, desc: "UX/UI & product thinking" },
              { label: "Growth Marketer", icon: TrendingUp, desc: "Acquisition & retention" },
              { label: "Full-Stack Engineer", icon: Code, desc: "Build & ship fast" },
              { label: "Operations Lead", icon: Globe, desc: "Ops, finance & logistics" },
            ];
          } else {
            stepTitle = "What roles does your startup need?";
            stepSubtitle = "Select all that apply";
            specOptions = [
              { label: "Technical Co-Founder", icon: Code, desc: "Engineering & architecture" },
              { label: "Business Co-Founder", icon: Briefcase, desc: "Strategy & operations" },
              { label: "Product Designer", icon: Palette, desc: "UX/UI & product thinking" },
              { label: "Growth Marketer", icon: TrendingUp, desc: "Acquisition & retention" },
              { label: "Full-Stack Engineer", icon: Code, desc: "Build & ship fast" },
            ];
          }
        } else if (role === "cofounder") {
          stepTitle = "What type of co-founder are you?";
          stepSubtitle = "Select what best describes you";
          specOptions = [
            { label: "Technical Co-Founder", icon: Code, desc: "I build the product & tech" },
            { label: "Business Co-Founder", icon: Briefcase, desc: "I handle strategy & ops" },
            { label: "Product Co-Founder", icon: Lightbulb, desc: "I lead product & design" },
            { label: "Growth Co-Founder", icon: BarChart3, desc: "I drive marketing & growth" },
          ];
        } else {
          // Team member
          stepTitle = "What's your skillset?";
          stepSubtitle = "Select your strongest areas";
          specOptions = [
            { label: "Engineering", icon: Code, desc: "Full-stack, backend, or frontend dev" },
            { label: "Product Design", icon: Palette, desc: "UX/UI, prototyping & research" },
            { label: "Growth & Marketing", icon: TrendingUp, desc: "Acquisition, SEO & content" },
            { label: "Operations", icon: Globe, desc: "Ops, finance & logistics" },
            { label: "Product Management", icon: Lightbulb, desc: "Roadmap, specs & execution" },
          ];
        }

        return (
          <motion.div key="s5" variants={pageTransition} initial="enter" animate="center" exit="exit" className="flex flex-col items-center text-center px-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-2">{stepTitle}</h2>
            <p className="text-sm text-muted-foreground mb-5">{stepSubtitle}</p>
            <div className="w-full max-w-xs space-y-2">
              {specOptions.map((opt, i) => (
                <motion.div key={opt.label} initial={{ x: 15, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.06 * i, duration: 0.25 }}>
                  <OptionButton selected={specifications.includes(opt.label)} onClick={() => toggleItem(specifications, setSpecifications, opt.label)} icon={opt.icon}>
                    <p className={`text-sm font-medium ${specifications.includes(opt.label) ? "text-primary" : "text-foreground"}`}>{opt.label}</p>
                    <p className="text-[10px] text-muted-foreground">{opt.desc}</p>
                  </OptionButton>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mt-5">
              <AnimatedCTA onClick={next} disabled={specifications.length === 0}>
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </AnimatedCTA>
            </motion.div>
          </motion.div>
        );
      }

      // ──── STEP 6: AVAILABILITY + LOCATION ────
      case 6: {
        const isStartup = userType === "startup";
        const isFounder = builderRole === "founder";
        const isRecruiting = isStartup || isFounder;
        const availOptions = isRecruiting
          ? [
              { label: "Full-time", icon: Rocket, desc: "Candidates must be fully committed" },
              { label: "Part-time", icon: Clock, desc: "Open to candidates with other commitments" },
              { label: "Flexible / Hybrid", icon: Globe, desc: "Open to discuss arrangement" },
            ]
          : [
              { label: "Full-time", icon: Rocket, desc: "I'm ready to go all-in" },
              { label: "Part-time", icon: Clock, desc: "Contributing alongside other work" },
              { label: "Flexible / Hybrid", icon: Globe, desc: "Open to discuss arrangement" },
            ];
        const locationOptions = ["Remote", "Jakarta", "Singapore", "Bangalore", "Ho Chi Minh City", "Dubai", "Anywhere"];
        return (
          <motion.div key="s6" variants={pageTransition} initial="enter" animate="center" exit="exit" className="flex flex-col items-center text-center px-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-2">
              {isRecruiting ? "What availability do you expect?" : "Your availability"}
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              {isRecruiting ? "What commitment level should candidates have?" : "How much time can you commit?"}
            </p>
            <div className="w-full max-w-xs space-y-2 mb-5">
              {availOptions.map((opt, i) => (
                <motion.div key={opt.label} initial={{ x: 15, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.06 * i, duration: 0.25 }}>
                  <OptionButton selected={availability === opt.label} onClick={() => setAvailability(opt.label)} icon={opt.icon}>
                    <p className={`text-sm font-medium ${availability === opt.label ? "text-primary" : "text-foreground"}`}>{opt.label}</p>
                    <p className="text-[10px] text-muted-foreground">{opt.desc}</p>
                  </OptionButton>
                </motion.div>
              ))}
            </div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="text-xs font-semibold text-foreground mb-2.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              {isStartup ? "Where is your startup based?" : "Where are you based?"}
            </motion.p>
            <div className="w-full max-w-xs flex flex-wrap gap-2 justify-center mb-5">
              {locationOptions.map((loc, i) => (
                <motion.div key={loc} initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 + 0.04 * i, duration: 0.2 }}>
                  <ChipButton selected={location === loc} onClick={() => setLocation(loc)}>{loc}</ChipButton>
                </motion.div>
              ))}
            </div>
            <AnimatedCTA onClick={next} disabled={!availability}>
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </AnimatedCTA>
          </motion.div>
        );
      }

      // ──── STEP 7: LINKEDIN ────
      case 7:
        return (
          <motion.div key="s7" variants={pageTransition} initial="enter" animate="center" exit="exit" className="flex flex-col items-center text-center px-6">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }}
              className="w-16 h-16 rounded-2xl bg-[#0A66C2]/10 flex items-center justify-center mb-6">
              <Linkedin className="w-8 h-8 text-[#0A66C2]" />
            </motion.div>
            <h2 className="font-display text-xl font-bold text-foreground mb-2">Connect LinkedIn</h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Import your profile to speed up matching and boost credibility with verified experience.
            </p>
            <motion.div whileTap={{ scale: 0.97 }}>
              <Button className="w-full max-w-xs bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white h-11 mb-3" onClick={next}>
                <Linkedin className="w-4 h-4 mr-2" /> Connect LinkedIn
              </Button>
            </motion.div>
            <button onClick={next} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Skip for now
            </button>
          </motion.div>
        );

      // ──── STEP 8: DONE ────
      case 8: {
        const role = userType === "startup" ? "startup" : builderRole;
        const doneMessages: Record<string, string> = {
          founder: "Your founder profile is ready. Start discovering the right people to build with.",
          cofounder: "Your profile is ready. Start discovering startups looking for co-founders like you.",
          team: "Your profile is ready. Start exploring startups looking for team members.",
          startup: `${startupName || "Your startup"} is set up. Start discovering builders who match your needs.`,
        };
        return (
          <motion.div key="s8" variants={pageTransition} initial="enter" animate="center" exit="exit" className="flex flex-col items-center text-center px-6">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.15 }}
              className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 15 }}>
                <Check className="w-10 h-10 text-primary" />
              </motion.div>
            </motion.div>
            <motion.h2 initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.3 }}
              className="font-display text-2xl font-bold text-foreground mb-2">You're all set! 🎉</motion.h2>
            <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.3 }}
              className="text-sm text-muted-foreground mb-8 max-w-xs">
              {doneMessages[role || "founder"]}
            </motion.p>
            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} whileTap={{ scale: 0.97 }}>
              <Button className="w-full max-w-xs bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold glow-primary" onClick={finishOnboarding}>
                <Rocket className="w-4 h-4 mr-2" /> Start Exploring
              </Button>
            </motion.div>
          </motion.div>
        );
      }
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex-shrink-0 px-6 pt-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          {step > 0 && step < 8 ? (
            <motion.button onClick={back} whileTap={{ scale: 0.9 }} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
          ) : <div />}
          <span className="text-[10px] text-muted-foreground">{getProgressIndex() + 1} of {TOTAL_STEPS}</span>
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ backgroundColor: i <= getProgressIndex() ? "hsl(30 100% 61%)" : "hsl(var(--border))" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="h-1 rounded-full flex-1"
            />
          ))}
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center overflow-auto py-4">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
    </div>
  );
}
