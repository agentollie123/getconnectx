import { motion, AnimatePresence } from "framer-motion";
import { X, Crown, Brain, Eye, Rocket, Zap, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface PremiumBenefitsModalProps {
  open: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

const BENEFITS = [
  {
    icon: Brain,
    title: "Smarter Discovery",
    desc: "AI-powered filters and precision matching find the right people faster.",
  },
  {
    icon: Eye,
    title: "Better Visibility",
    desc: "Appear earlier to high-fit founders and builders in their feed.",
  },
  {
    icon: Rocket,
    title: "Better Opportunities",
    desc: "See stronger startup profiles and higher-quality matches first.",
  },
  {
    icon: Zap,
    title: "Monthly Included",
    desc: "2 GetConnect spotlight credits every month.",
  },
];

export function PremiumBenefitsModal({ open, onClose, onUpgrade }: PremiumBenefitsModalProps) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-[400px] rounded-3xl bg-card border border-border/50 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative px-6 pt-6 pb-4 bg-gradient-to-b from-primary/8 to-transparent">
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mx-auto mb-3 shadow-lg shadow-primary/20">
              <Crown className="w-6 h-6 text-primary-foreground" />
            </div>
            <h2 className="font-display text-lg font-bold text-foreground text-center">Premium gives you</h2>
            <p className="text-[11px] text-muted-foreground text-center mt-1">Everything you need to build the right team</p>
          </div>

          {/* Benefits */}
          <div className="px-6 pb-4 space-y-3">
            {BENEFITS.map((b) => (
              <div key={b.title} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <b.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">{b.title}</p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Billing toggle */}
          <div className="px-6 pb-4">
            <div className="flex items-center gap-0.5 p-0.5 rounded-xl bg-muted/40 border border-border/30">
              <button
                onClick={() => setBilling("monthly")}
                className={`flex-1 py-2 rounded-lg text-[11px] font-semibold transition-all ${
                  billing === "monthly" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("yearly")}
                className={`flex-1 py-2 rounded-lg text-[11px] font-semibold transition-all relative ${
                  billing === "yearly" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                Yearly
                <span className="absolute -top-1.5 -right-1 text-[8px] px-1.5 py-0.5 rounded-full bg-accent text-accent-foreground font-bold">SAVE</span>
              </button>
            </div>
          </div>

          {/* CTA */}
          <div className="px-6 pb-6">
            <Button
              onClick={onUpgrade}
              className="w-full h-11 rounded-2xl bg-gradient-to-r from-accent to-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/20"
            >
              <Crown className="w-4 h-4 mr-2" />
              Upgrade to Premium
            </Button>
            <p className="text-[10px] text-muted-foreground text-center mt-2.5 opacity-60">Feature available in full release</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
