import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Linkedin, Check, MapPin, Briefcase, User, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ModeSelector } from "./ModeSelector";
import {
  type MatchingMode,
  INDUSTRIES,
  COFOUNDER_SKILL_STRENGTHS,
  COFOUNDER_COMMITMENTS,
  TEAM_ROLES_NEEDED,
  TEAM_SKILL_STACK,
  TEAM_COMMITMENTS,
  STARTUP_STAGES,
  STARTUP_ROLES_NEEDED,
  FOUNDER_TYPES,
} from "./ModeConfig";

interface OnboardingFlowProps {
  onComplete: (mode: MatchingMode) => void;
}

const STEP_LABELS = ["Identity", "Your Goal", "Preferences", "Details", "Ready"];

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [activeMode, setActiveMode] = useState<MatchingMode>("founder-cofounder");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedCommitment, setSelectedCommitment] = useState("");

  const totalSteps = 5;
  const progress = ((step + 1) / totalSteps) * 100;

  const toggleChip = (item: string, list: string[], setter: (v: string[]) => void) => {
    setter(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const canProceed = () => {
    if (step === 0) return name.trim().length > 0;
    return true;
  };

  const next = () => {
    if (step < totalSteps - 1) setStep(step + 1);
    else onComplete(activeMode);
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  // Mode-specific questions for step 2 (Preferences)
  const renderModePreferences = () => {
    switch (activeMode) {
      case "founder-cofounder":
        return (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                What skill strength do you value most?
              </p>
              <div className="flex flex-wrap gap-1.5">
                {COFOUNDER_SKILL_STRENGTHS.map((s) => (
                  <Badge
                    key={s}
                    variant={selectedSkills.includes(s) ? "default" : "outline"}
                    className={`cursor-pointer text-[10px] transition-all ${
                      selectedSkills.includes(s)
                        ? "bg-primary text-primary-foreground"
                        : "border-border/60 text-muted-foreground hover:border-primary/40"
                    }`}
                    onClick={() => toggleChip(s, selectedSkills, setSelectedSkills)}
                  >
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Commitment level?
              </p>
              <div className="flex flex-wrap gap-1.5">
                {COFOUNDER_COMMITMENTS.map((c) => (
                  <Badge
                    key={c}
                    variant={selectedCommitment === c ? "default" : "outline"}
                    className={`cursor-pointer text-[10px] transition-all ${
                      selectedCommitment === c
                        ? "bg-primary text-primary-foreground"
                        : "border-border/60 text-muted-foreground hover:border-primary/40"
                    }`}
                    onClick={() => setSelectedCommitment(c)}
                  >
                    {c}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );
      case "founder-team":
        return (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                What roles are you hiring for?
              </p>
              <div className="flex flex-wrap gap-1.5">
                {TEAM_ROLES_NEEDED.map((r) => (
                  <Badge
                    key={r}
                    variant={selectedSkills.includes(r) ? "default" : "outline"}
                    className={`cursor-pointer text-[10px] transition-all ${
                      selectedSkills.includes(r)
                        ? "bg-primary text-primary-foreground"
                        : "border-border/60 text-muted-foreground hover:border-primary/40"
                    }`}
                    onClick={() => toggleChip(r, selectedSkills, setSelectedSkills)}
                  >
                    {r}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Commitment type?
              </p>
              <div className="flex flex-wrap gap-1.5">
                {TEAM_COMMITMENTS.map((c) => (
                  <Badge
                    key={c}
                    variant={selectedCommitment === c ? "default" : "outline"}
                    className={`cursor-pointer text-[10px] transition-all ${
                      selectedCommitment === c
                        ? "bg-primary text-primary-foreground"
                        : "border-border/60 text-muted-foreground hover:border-primary/40"
                    }`}
                    onClick={() => setSelectedCommitment(c)}
                  >
                    {c}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );
      case "team-startup":
        return (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                What startup stage interests you?
              </p>
              <div className="flex flex-wrap gap-1.5">
                {STARTUP_STAGES.map((s) => (
                  <Badge
                    key={s}
                    variant={selectedSkills.includes(s) ? "default" : "outline"}
                    className={`cursor-pointer text-[10px] transition-all ${
                      selectedSkills.includes(s)
                        ? "bg-primary text-primary-foreground"
                        : "border-border/60 text-muted-foreground hover:border-primary/40"
                    }`}
                    onClick={() => toggleChip(s, selectedSkills, setSelectedSkills)}
                  >
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                What role can you fill?
              </p>
              <div className="flex flex-wrap gap-1.5">
                {STARTUP_ROLES_NEEDED.map((r) => (
                  <Badge
                    key={r}
                    variant={selectedCommitment === r ? "default" : "outline"}
                    className={`cursor-pointer text-[10px] transition-all ${
                      selectedCommitment === r
                        ? "bg-primary text-primary-foreground"
                        : "border-border/60 text-muted-foreground hover:border-primary/40"
                    }`}
                    onClick={() => setSelectedCommitment(r)}
                  >
                    {r}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );
      case "cofounder-startup":
        return (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                What type of founder are you looking for?
              </p>
              <div className="flex flex-wrap gap-1.5">
                {FOUNDER_TYPES.map((f) => (
                  <Badge
                    key={f}
                    variant={selectedSkills.includes(f) ? "default" : "outline"}
                    className={`cursor-pointer text-[10px] transition-all ${
                      selectedSkills.includes(f)
                        ? "bg-primary text-primary-foreground"
                        : "border-border/60 text-muted-foreground hover:border-primary/40"
                    }`}
                    onClick={() => toggleChip(f, selectedSkills, setSelectedSkills)}
                  >
                    {f}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Preferred startup stage?
              </p>
              <div className="flex flex-wrap gap-1.5">
                {STARTUP_STAGES.map((s) => (
                  <Badge
                    key={s}
                    variant={selectedCommitment === s ? "default" : "outline"}
                    className={`cursor-pointer text-[10px] transition-all ${
                      selectedCommitment === s
                        ? "bg-primary text-primary-foreground"
                        : "border-border/60 text-muted-foreground hover:border-primary/40"
                    }`}
                    onClick={() => setSelectedCommitment(s)}
                  >
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  const stepContent = () => {
    switch (step) {
      // Step 0: Basic Identity
      case 0:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <User className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-lg font-bold text-foreground font-display">Who are you?</h2>
              <p className="text-xs text-muted-foreground mt-1">Let's start with the basics</p>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Full Name *</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Chen"
                  className="mt-1 bg-card border-border/60 text-sm h-9"
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Current Role</label>
                <Input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Product Manager at Gojek"
                  className="mt-1 bg-card border-border/60 text-sm h-9"
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Location</label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-2.5 top-2 w-3.5 h-3.5 text-muted-foreground" />
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Jakarta, Indonesia"
                    className="pl-8 bg-card border-border/60 text-sm h-9"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  LinkedIn <span className="text-muted-foreground/50">(optional)</span>
                </label>
                <div className="relative mt-1">
                  <Linkedin className="absolute left-2.5 top-2 w-3.5 h-3.5 text-muted-foreground" />
                  <Input
                    value={linkedIn}
                    onChange={(e) => setLinkedIn(e.target.value)}
                    placeholder="linkedin.com/in/yourname"
                    className="pl-8 bg-card border-border/60 text-sm h-9"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      // Step 1: Mode Selection
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Rocket className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-lg font-bold text-foreground font-display">What's your goal?</h2>
              <p className="text-xs text-muted-foreground mt-1">This shapes your entire matching experience</p>
            </div>
            <ModeSelector activeMode={activeMode} onModeChange={setActiveMode} />
          </div>
        );

      // Step 2: Mode-specific preferences
      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Briefcase className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-lg font-bold text-foreground font-display">Your Preferences</h2>
              <p className="text-xs text-muted-foreground mt-1">Help us find the right matches for you</p>
            </div>
            {renderModePreferences()}
          </div>
        );

      // Step 3: Industry interests
      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Briefcase className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-lg font-bold text-foreground font-display">Industry Focus</h2>
              <p className="text-xs text-muted-foreground mt-1">Select industries you're interested in</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {INDUSTRIES.slice(0, 18).map((ind) => (
                <Badge
                  key={ind}
                  variant={selectedIndustries.includes(ind) ? "default" : "outline"}
                  className={`cursor-pointer text-[10px] transition-all ${
                    selectedIndustries.includes(ind)
                      ? "bg-primary text-primary-foreground"
                      : "border-border/60 text-muted-foreground hover:border-primary/40"
                  }`}
                  onClick={() => toggleChip(ind, selectedIndustries, setSelectedIndustries)}
                >
                  {ind}
                </Badge>
              ))}
            </div>
          </div>
        );

      // Step 4: Ready
      case 4:
        return (
          <div className="space-y-5 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground font-display">You're all set, {name || "Builder"}!</h2>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Your personalized feed is ready. We'll show you the best matches based on your preferences.
              </p>
            </div>
            <div className="bg-card/80 border border-border/40 rounded-xl p-3 text-left space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <Check className="w-3.5 h-3.5 text-primary" />
                <span className="text-foreground">AI-matched profiles loaded</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Check className="w-3.5 h-3.5 text-primary" />
                <span className="text-foreground">Mode-specific filters active</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Check className="w-3.5 h-3.5 text-primary" />
                <span className="text-foreground">
                  {activeMode === "founder-cofounder" && "Co-founder discovery ready"}
                  {activeMode === "founder-team" && "Team hiring feed ready"}
                  {activeMode === "team-startup" && "Startup opportunities loaded"}
                  {activeMode === "cofounder-startup" && "Venture matching active"}
                </span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col dark">
      {/* Progress Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Step {step + 1} of {totalSteps} — {STEP_LABELS[step]}
          </p>
          {step > 0 && (
            <button onClick={back} className="text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-0.5">
              <ArrowLeft className="w-3 h-3" /> Back
            </button>
          )}
        </div>
        <Progress value={progress} className="h-1.5 bg-muted" />
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-4 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {stepContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 pt-2">
        <Button
          onClick={next}
          disabled={!canProceed()}
          className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm rounded-xl gap-2"
        >
          {step === totalSteps - 1 ? "See My Matches" : "Continue"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
