import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Users, Building2, Rocket, Code, Palette, TrendingUp, Briefcase, Globe,
  Linkedin, Check, ArrowRight, ArrowLeft, Sparkles, Handshake, Target,
  Lightbulb, BarChart3,
} from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

interface OnboardingFlowProps {
  onComplete: () => void;
  isPremium?: boolean;
}

const STEPS = 7;

export function OnboardingFlow({ onComplete, isPremium }: OnboardingFlowProps) {
  const [step, setStep] = useState(0);
  const [userType, setUserType] = useState<"builder" | "startup" | null>(null);
  const [goal, setGoal] = useState<"cofounder" | "team" | null>(null);
  const [specifications, setSpecifications] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);

  const next = () => step < STEPS - 1 ? setStep(step + 1) : onComplete();
  const back = () => step > 0 && setStep(step - 1);

  const toggleItem = (arr: string[], setArr: (v: string[]) => void, item: string) => {
    setArr(arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item]);
  };

  const slideVariants = {
    enter: { x: 60, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -60, opacity: 0 },
  };

  const renderStep = () => {
    switch (step) {
      // Step 0: Welcome
      case 0:
        return (
          <motion.div key="s0" variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col items-center text-center px-6">
            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-6">
              <img src={logoIcon} alt="ConnectX" className="w-12 h-12 rounded-xl" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-3">
              Find the right people<br />to build with
            </h1>
            <p className="text-sm text-muted-foreground mb-8 max-w-xs">
              ConnectX matches you with co-founders, teammates, and startups based on skills, goals, and compatibility.
            </p>
            <Button className="w-full max-w-xs bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold" onClick={next}>
              Get Started <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        );

      // Step 1: Builder or Startup
      case 1:
        return (
          <motion.div key="s1" variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col items-center text-center px-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-2">How do you want to use ConnectX?</h2>
            <p className="text-sm text-muted-foreground mb-6">Choose your primary role</p>
            <div className="w-full max-w-xs space-y-3">
              <button
                onClick={() => { setUserType("builder"); next(); }}
                className={`w-full p-4 rounded-2xl border-2 text-left flex items-center gap-4 transition-all ${
                  userType === "builder" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50 bg-card"
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground">I'm a Builder</p>
                  <p className="text-xs text-muted-foreground">Find co-founders & join teams</p>
                </div>
              </button>
              <button
                onClick={() => { setUserType("startup"); next(); }}
                className={`w-full p-4 rounded-2xl border-2 text-left flex items-center gap-4 transition-all ${
                  userType === "startup" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50 bg-card"
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground">I represent a Startup</p>
                  <p className="text-xs text-muted-foreground">Find talent & co-founders</p>
                </div>
              </button>
            </div>
          </motion.div>
        );

      // Step 2: Co-Founder or Team
      case 2:
        return (
          <motion.div key="s2" variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col items-center text-center px-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-2">What are you looking for?</h2>
            <p className="text-sm text-muted-foreground mb-6">Choose your primary goal</p>
            <div className="w-full max-w-xs space-y-3">
              <button
                onClick={() => { setGoal("cofounder"); next(); }}
                className={`w-full p-4 rounded-2xl border-2 text-left flex items-center gap-4 transition-all ${
                  goal === "cofounder" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50 bg-card"
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Handshake className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground">Co-Founder</p>
                  <p className="text-xs text-muted-foreground">Find someone to build with from day one</p>
                </div>
              </button>
              <button
                onClick={() => { setGoal("team"); next(); }}
                className={`w-full p-4 rounded-2xl border-2 text-left flex items-center gap-4 transition-all ${
                  goal === "team" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50 bg-card"
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground">Team</p>
                  <p className="text-xs text-muted-foreground">Recruit early members for your startup</p>
                </div>
              </button>
            </div>
          </motion.div>
        );

      // Step 3: Specifications (dynamic based on goal)
      case 3: {
        const specOptions = goal === "cofounder"
          ? [
              { label: "Technical Co-Founder", icon: Code, desc: "Engineering & architecture" },
              { label: "Business Co-Founder", icon: Briefcase, desc: "Strategy & operations" },
              { label: "Product Co-Founder", icon: Lightbulb, desc: "Product vision & design" },
              { label: "Growth Co-Founder", icon: BarChart3, desc: "Marketing & distribution" },
            ]
          : [
              { label: "CTO / Technical Lead", icon: Code, desc: "Lead engineering & tech stack" },
              { label: "Product Designer", icon: Palette, desc: "UX/UI & product thinking" },
              { label: "Growth Marketer", icon: TrendingUp, desc: "Acquisition & retention" },
              { label: "Full-Stack Engineer", icon: Code, desc: "Build & ship fast" },
              { label: "Operations", icon: Globe, desc: "Ops, finance & logistics" },
            ];
        return (
          <motion.div key="s3" variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col items-center text-center px-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-2">
              {goal === "cofounder" ? "What type of co-founder?" : "What roles do you need?"}
            </h2>
            <p className="text-sm text-muted-foreground mb-5">Select all that apply</p>
            <div className="w-full max-w-xs space-y-2">
              {specOptions.map(opt => (
                <button
                  key={opt.label}
                  onClick={() => toggleItem(specifications, setSpecifications, opt.label)}
                  className={`w-full px-4 py-3 rounded-xl border-2 text-left flex items-center gap-3 transition-all ${
                    specifications.includes(opt.label) ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <opt.icon className={`w-4 h-4 flex-shrink-0 ${specifications.includes(opt.label) ? "text-primary" : "text-muted-foreground"}`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${specifications.includes(opt.label) ? "text-primary" : "text-foreground"}`}>{opt.label}</p>
                    <p className="text-[10px] text-muted-foreground">{opt.desc}</p>
                  </div>
                  {specifications.includes(opt.label) && <Check className="w-4 h-4 text-primary flex-shrink-0" />}
                </button>
              ))}
            </div>
            <Button className="w-full max-w-xs mt-5 bg-primary text-primary-foreground h-11" onClick={next} disabled={specifications.length === 0}>
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        );
      }

      // Step 4: Industry & Stage preferences
      case 4: {
        const industryOptions = ["SaaS", "Fintech", "E-Commerce", "Health Tech", "EdTech", "AI / ML", "Climate Tech", "Social Impact"];
        return (
          <motion.div key="s4" variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col items-center text-center px-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-2">What industries interest you?</h2>
            <p className="text-sm text-muted-foreground mb-5">Select all that apply</p>
            <div className="w-full max-w-xs flex flex-wrap gap-2 justify-center">
              {industryOptions.map(ind => (
                <button
                  key={ind}
                  onClick={() => toggleItem(industries, setIndustries, ind)}
                  className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
                    industries.includes(ind) ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-foreground hover:border-primary/50"
                  }`}
                >
                  <Target className="w-3.5 h-3.5" />
                  {ind}
                </button>
              ))}
            </div>
            <Button className="w-full max-w-xs mt-6 bg-primary text-primary-foreground h-11" onClick={next} disabled={industries.length === 0}>
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        );
      }

      // Step 5: LinkedIn
      case 5:
        return (
          <motion.div key="s5" variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col items-center text-center px-6">
            <div className="w-16 h-16 rounded-2xl bg-[#0A66C2]/10 flex items-center justify-center mb-6">
              <Linkedin className="w-8 h-8 text-[#0A66C2]" />
            </div>
            <h2 className="font-display text-xl font-bold text-foreground mb-2">Connect LinkedIn</h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Import your profile to speed up matching and boost credibility with verified experience.
            </p>
            <Button className="w-full max-w-xs bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white h-11 mb-3" onClick={next}>
              <Linkedin className="w-4 h-4 mr-2" /> Connect LinkedIn
            </Button>
            <button onClick={next} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Skip for now
            </button>
          </motion.div>
        );

      // Step 6: All set
      case 6:
        return (
          <motion.div key="s6" variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col items-center text-center px-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6"
            >
              <Check className="w-10 h-10 text-primary" />
            </motion.div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">You're all set! 🎉</h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-xs">
              Your profile is ready. Start discovering {goal === "cofounder" ? "co-founders" : "teammates"} that match your goals.
            </p>
            <Button className="w-full max-w-xs bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold glow-primary" onClick={onComplete}>
              <Rocket className="w-4 h-4 mr-2" /> Start Exploring
            </Button>
          </motion.div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Progress bar */}
      <div className="flex-shrink-0 px-6 pt-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          {step > 0 && step < STEPS - 1 ? (
            <button onClick={back} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : <div />}
          <span className="text-[10px] text-muted-foreground">{step + 1} of {STEPS}</span>
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: STEPS }).map((_, i) => (
            <div key={i} className={`h-1 rounded-full flex-1 transition-all duration-500 ${i <= step ? "bg-primary" : "bg-border"}`} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center overflow-auto py-4">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
    </div>
  );
}
