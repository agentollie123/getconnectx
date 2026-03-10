import { motion, AnimatePresence } from "framer-motion";
import { X, Crown, Check, Zap, Eye, RotateCcw, SlidersHorizontal, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
}

const PREMIUM_FEATURES = [
  { icon: Eye, label: "See who liked you", desc: "Full visibility, no blurs" },
  { icon: Zap, label: "Unlimited swipes", desc: "No daily limits" },
  { icon: SlidersHorizontal, label: "Advanced filters", desc: "Experience, education, exits" },
  { icon: Star, label: "Priority visibility", desc: "Appear higher in feeds" },
  { icon: RotateCcw, label: "Rewind swipes", desc: "Undo accidental passes" },
];

export function UpgradeModal({ open, onClose }: UpgradeModalProps) {
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
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 20 }}
          className="relative w-full max-w-sm rounded-2xl bg-card border border-accent/30 p-6 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Gradient top accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-primary" />

          <button onClick={onClose} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground z-10">
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mx-auto mb-3">
              <Crown className="w-7 h-7 text-primary-foreground" />
            </div>
            <h2 className="font-display text-xl font-bold text-foreground mb-1">
              ConnectX Premium
            </h2>
            <p className="text-xs text-muted-foreground">
              Unlock advanced discovery, unlimited swipes, and visibility boosts.
            </p>
          </div>

          <div className="space-y-2.5 mb-5">
            {PREMIUM_FEATURES.map((f) => (
              <div key={f.label} className="flex items-center gap-3 p-2 rounded-xl bg-muted/30">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground">{f.label}</p>
                  <p className="text-[10px] text-muted-foreground">{f.desc}</p>
                </div>
                <Check className="w-4 h-4 text-accent flex-shrink-0" />
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="rounded-xl border border-accent/30 bg-accent/5 p-3 mb-4 text-center">
            <p className="text-2xl font-display font-bold text-foreground">$10<span className="text-sm font-normal text-muted-foreground">/month</span></p>
            <p className="text-[10px] text-muted-foreground">Cancel anytime · 7-day free trial</p>
          </div>

          <Button className="w-full bg-gradient-to-r from-accent to-primary text-primary-foreground font-semibold">
            <Crown className="w-4 h-4 mr-2" />
            Upgrade to Premium
          </Button>
          <p className="text-[10px] text-muted-foreground text-center mt-2">Feature available in full release</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
