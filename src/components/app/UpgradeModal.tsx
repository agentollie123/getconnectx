import { motion, AnimatePresence } from "framer-motion";
import { X, Crown, Check, Rocket, Eye, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
}

const BENEFITS = [
  {
    icon: Rocket,
    title: "Better Matches",
    desc: "See higher-quality, more relevant people",
  },
  {
    icon: Eye,
    title: "Get Seen First",
    desc: "Appear earlier to founders and startups",
  },
  {
    icon: MessageCircle,
    title: "Don't Miss Opportunities",
    desc: "See who wants to connect with you",
  },
];

const FREE_LIST = [
  "Explore profiles",
  "Basic matching",
  "Limited visibility",
];

const PREMIUM_LIST = [
  "See your connects",
  "Higher match quality",
  "Priority visibility",
  "Faster connections",
];

export function UpgradeModal({ open, onClose }: UpgradeModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly");
  const [showDismiss, setShowDismiss] = useState(false);

  if (!open) return null;

  const handleClose = () => {
    setShowDismiss(true);
  };

  const handleConfirmClose = () => {
    setShowDismiss(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-background/80 backdrop-blur-sm"
        onClick={handleClose}
      >
        <motion.div
          initial={{ y: 60, opacity: 0, scale: 0.97 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 60, opacity: 0, scale: 0.97 }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          className="relative w-full max-w-md rounded-t-3xl sm:rounded-3xl bg-card border border-border/50 shadow-2xl overflow-hidden max-h-[95vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full bg-muted/40 flex items-center justify-center text-muted-foreground/60 hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex-1 overflow-y-auto">
            {/* HERO / HOOK */}
            <div className="relative px-6 pt-8 pb-6 text-center overflow-hidden">
              {/* Blurred profiles background */}
              <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-[0.08]">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-16 h-20 rounded-xl bg-primary/40 blur-sm"
                    style={{ transform: `rotate(${(i - 2) * 8}deg) translateY(${Math.abs(i - 2) * 6}px)` }}
                  />
                ))}
              </div>

              {/* Glowing icon */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mx-auto mb-4"
                style={{ boxShadow: "0 0 30px hsl(var(--primary) / 0.3)" }}
              >
                <Crown className="w-7 h-7 text-primary-foreground" />
              </motion.div>

              <h2 className="font-display text-xl font-bold text-foreground mb-2">
                Find the Right People Faster
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-[280px] mx-auto">
                You're already exploring.
                <br />
                Now increase your chances of building the right startup.
              </p>
            </div>

            {/* WHY UPGRADE — 3 BENEFITS */}
            <div className="px-6 pb-5">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Why Upgrade to Premium
              </p>
              <div className="space-y-3">
                {BENEFITS.map((b, i) => (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <b.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{b.title}</p>
                      <p className="text-[11px] text-muted-foreground">{b.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Differentiator */}
              <div className="mt-4 px-3 py-2.5 rounded-xl bg-primary/5 border border-primary/15">
                <p className="text-[11px] text-primary font-medium text-center flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Premium users are matched earlier with higher-fit profiles
                </p>
              </div>
            </div>

            {/* FREE VS PREMIUM COMPARISON */}
            <div className="px-6 pb-5">
              <div className="grid grid-cols-2 gap-3">
                {/* Free */}
                <div className="rounded-xl bg-muted/20 border border-border/40 p-3">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2.5">Free</p>
                  <div className="space-y-2">
                    {FREE_LIST.map((item) => (
                      <div key={item} className="flex items-start gap-1.5">
                        <Check className="w-3 h-3 text-muted-foreground/50 mt-0.5 flex-shrink-0" />
                        <span className="text-[11px] text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Premium */}
                <div
                  className="rounded-xl border border-primary/30 p-3 bg-card"
                  style={{ boxShadow: "0 0 20px -8px hsl(var(--primary) / 0.15)" }}
                >
                  <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-2.5 flex items-center gap-1">
                    <Crown className="w-3 h-3" /> Premium
                  </p>
                  <div className="space-y-2">
                    {PREMIUM_LIST.map((item) => (
                      <div key={item} className="flex items-start gap-1.5">
                        <Check className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-[11px] text-foreground font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* PRICING */}
            <div className="px-6 pb-5">
              <div className="space-y-2">
                {/* Monthly */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPlan("monthly")}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all duration-200 ${
                    selectedPlan === "monthly"
                      ? "border-primary/60 bg-primary/5"
                      : "border-transparent bg-muted/30 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedPlan === "monthly" ? "border-primary" : "border-muted-foreground/30"}`}>
                      {selectedPlan === "monthly" && <div className="w-2 h-2 rounded-full bg-primary" />}
                    </div>
                    <span className="text-[13px] font-semibold text-foreground">Monthly</span>
                  </div>
                  <span className={`text-[13px] font-bold ${selectedPlan === "monthly" ? "text-primary" : "text-foreground"}`}>
                    $9.99/mo
                  </span>
                </motion.button>

                {/* Yearly */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPlan("yearly")}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all duration-200 ${
                    selectedPlan === "yearly"
                      ? "border-primary/60 bg-primary/5 shadow-sm shadow-primary/10"
                      : "border-transparent bg-muted/30 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedPlan === "yearly" ? "border-primary" : "border-muted-foreground/30"}`}>
                      {selectedPlan === "yearly" && <div className="w-2 h-2 rounded-full bg-primary" />}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px] font-semibold text-foreground">Yearly</span>
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-accent text-accent-foreground leading-none">
                        SAVE 50%
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[13px] font-bold ${selectedPlan === "yearly" ? "text-primary" : "text-foreground"}`}>
                      $59/yr
                    </span>
                    <p className="text-[10px] text-muted-foreground">$4.92/mo</p>
                  </div>
                </motion.button>
              </div>
            </div>

            {/* CTA */}
            <div className="px-6 pb-3">
              <Button
                className="w-full h-12 rounded-2xl bg-gradient-to-r from-accent to-primary text-primary-foreground font-semibold text-sm shadow-lg transition-all hover:shadow-primary/30 active:scale-[0.98]"
                style={{ boxShadow: "0 8px 25px -5px hsl(var(--primary) / 0.3)" }}
              >
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Premium
              </Button>
              <p className="text-[11px] text-muted-foreground text-center mt-2">
                Start finding better matches today
              </p>
            </div>

            {/* URGENCY + SOCIAL PROOF */}
            <div className="px-6 pb-6 space-y-2">
              <p className="text-[10px] text-primary/70 text-center font-medium italic">
                The best teams are already forming
              </p>
              <p className="text-[10px] text-muted-foreground/60 text-center">
                Founders who upgrade get matches 2× faster
              </p>
            </div>
          </div>

          {/* DISMISS OVERLAY */}
          <AnimatePresence>
            {showDismiss && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 bg-background/90 backdrop-blur-sm flex items-center justify-center p-6"
              >
                <motion.div
                  initial={{ scale: 0.95, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 10 }}
                  className="text-center"
                >
                  <p className="font-display text-sm font-semibold text-foreground mb-1">
                    Keep exploring with limited matches
                  </p>
                  <p className="text-[11px] text-muted-foreground mb-5 max-w-[240px] mx-auto">
                    You can always upgrade later to unlock better connections
                  </p>
                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-accent to-primary text-primary-foreground text-xs"
                      onClick={() => setShowDismiss(false)}
                    >
                      <Crown className="w-3 h-3 mr-1.5" />
                      Stay on Premium
                    </Button>
                    <button
                      onClick={handleConfirmClose}
                      className="text-[11px] text-muted-foreground hover:text-foreground transition-colors py-1"
                    >
                      Continue with Free
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
