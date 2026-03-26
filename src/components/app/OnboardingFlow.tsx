import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Users, Building2, Rocket, Code, Palette, TrendingUp, Briefcase, Globe,
  Linkedin, Check, ArrowRight, ArrowLeft, Handshake, Target,
  Lightbulb, BarChart3, Clock, MapPin,
} from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

interface OnboardingFlowProps {
  onComplete: () => void;
  isPremium?: boolean;
}

const STEPS = 8;

// Confident, not bouncy
const pageTransition = {
  enter: { x: 40, opacity: 0, scale: 0.97 },
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { x: -40, opacity: 0, scale: 0.97, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } },
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

export function OnboardingFlow({ onComplete, isPremium }: OnboardingFlowProps) {
  const [step, setStep] = useState(0);
  const [userType, setUserType] = useState<"builder" | "startup" | null>(null);
  const [goal, setGoal] = useState<"cofounder" | "team" | null>(null);
  const [specifications, setSpecifications] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);

  const next = () => step < STEPS - 1 ? setStep(step + 1) : onComplete();
  const back = () => step > 0 && setStep(step - 1);

  const toggleItem = (arr: string[], setArr: (v: string[]) => void, item: string) => {
    setArr(arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item]);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div key="s0" variants={pageTransition} initial="enter" animate="center" exit="exit" className="flex flex-col items-center text-center px-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-6"
            >
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

      case 1:
        return (
          <motion.div key="s1" variants={pageTransition} initial="enter" animate="center" exit="exit" className="flex flex-col items-center text-center px-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-2">How do you want to use ConnectX?</h2>
            <p className="text-sm text-muted-foreground mb-6">Choose your primary role</p>
            <div className="w-full max-w-xs space-y-3">
              <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                <SelectCard selected={userType === "builder"} onClick={() => { setUserType("builder"); next(); }}
                  icon={Users} iconColor="bg-primary/10 text-primary" title="I'm a Builder" desc="Find co-founders & join teams" />
              </motion.div>
              <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                <SelectCard selected={userType === "startup"} onClick={() => { setUserType("startup"); next(); }}
                  icon={Building2} iconColor="bg-accent/10 text-accent" title="I represent a Startup" desc="Find talent & co-founders" />
              </motion.div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div key="s2" variants={pageTransition} initial="enter" animate="center" exit="exit" className="flex flex-col items-center text-center px-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-2">
              {userType === "startup" ? "What do you need?" : "What are you looking for?"}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              {userType === "startup" ? "What's your priority right now?" : "Choose your primary goal"}
            </p>
            <div className="w-full max-w-xs space-y-3">
              <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                <SelectCard selected={goal === "cofounder"} onClick={() => { setGoal("cofounder"); next(); }}
                  icon={Handshake} iconColor="bg-primary/10 text-primary" title="Co-Founder"
                  desc={userType === "startup" ? "Find a co-founder to lead with you" : "Find someone to build with from day one"} />
              </motion.div>
              <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                <SelectCard selected={goal === "team"} onClick={() => { setGoal("team"); next(); }}
                  icon={Users} iconColor="bg-accent/10 text-accent" title="Team"
                  desc={userType === "startup" ? "Hire early-stage talent for your startup" : "Recruit early members for your startup"} />
              </motion.div>
            </div>
          </motion.div>
        );

      case 3: {
        const industryOptions = ["SaaS", "Fintech", "E-Commerce", "Health Tech", "EdTech", "AI / ML", "Climate Tech", "Social Impact"];
        const isStartup = userType === "startup";
        return (
          <motion.div key="s3" variants={pageTransition} initial="enter" animate="center" exit="exit" className="flex flex-col items-center text-center px-6">
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

      case 4: {
        const isStartup = userType === "startup";
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
              { label: "Operations Lead", icon: Globe, desc: "Ops, finance & logistics" },
            ];
        return (
          <motion.div key="s4" variants={pageTransition} initial="enter" animate="center" exit="exit" className="flex flex-col items-center text-center px-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-2">
              {isStartup
                ? goal === "cofounder" ? "What kind of co-founder are you looking for?" : "What talent does your startup need?"
                : goal === "cofounder" ? "What type of co-founder?" : "What roles do you need?"
              }
            </h2>
            <p className="text-sm text-muted-foreground mb-5">Select all that apply</p>
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

      case 5: {
        const availOptions = [
          { label: "Full-time", icon: Rocket, desc: "Fully committed, ready to go all-in" },
          { label: "Part-time", icon: Clock, desc: "Contributing alongside other work" },
          { label: "Flexible / Hybrid", icon: Globe, desc: "Open to discuss arrangement" },
        ];
        const locationOptions = ["Remote", "Jakarta", "Singapore", "Bangalore", "Ho Chi Minh City", "Dubai", "Anywhere"];
        return (
          <motion.div key="s5" variants={pageTransition} initial="enter" animate="center" exit="exit" className="flex flex-col items-center text-center px-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-2">
              {userType === "startup" ? "What availability do you expect?" : "Your availability"}
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              {userType === "startup" ? "What commitment level should candidates have?" : "How much time can you commit?"}
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
              {userType === "startup" ? "Where is your startup based?" : "Preferred location"}
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

      case 6:
        return (
          <motion.div key="s6" variants={pageTransition} initial="enter" animate="center" exit="exit" className="flex flex-col items-center text-center px-6">
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

      case 7:
        return (
          <motion.div key="s7" variants={pageTransition} initial="enter" animate="center" exit="exit" className="flex flex-col items-center text-center px-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.15 }}
              className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6"
            >
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 15 }}>
                <Check className="w-10 h-10 text-primary" />
              </motion.div>
            </motion.div>
            <motion.h2 initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.3 }}
              className="font-display text-2xl font-bold text-foreground mb-2">You're all set! 🎉</motion.h2>
            <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.3 }}
              className="text-sm text-muted-foreground mb-8 max-w-xs">
              {userType === "startup"
                ? `Your startup profile is ready. Start discovering ${goal === "cofounder" ? "co-founders" : "talent"} that fit your needs.`
                : `Your profile is ready. Start discovering ${goal === "cofounder" ? "co-founders" : "teammates"} that match your goals.`}
            </motion.p>
            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} whileTap={{ scale: 0.97 }}>
              <Button className="w-full max-w-xs bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold glow-primary" onClick={onComplete}>
                <Rocket className="w-4 h-4 mr-2" /> Start Exploring
              </Button>
            </motion.div>
          </motion.div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex-shrink-0 px-6 pt-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          {step > 0 && step < STEPS - 1 ? (
            <motion.button onClick={back} whileTap={{ scale: 0.9 }} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
          ) : <div />}
          <span className="text-[10px] text-muted-foreground">{step + 1} of {STEPS}</span>
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: STEPS }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ scaleX: i <= step ? 1 : 1, backgroundColor: i <= step ? "hsl(30 100% 61%)" : "hsl(var(--border))" }}
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
