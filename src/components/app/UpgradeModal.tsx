import { motion, AnimatePresence } from "framer-motion";
import { X, Crown, Check, Zap, Eye, RotateCcw, SlidersHorizontal, Star, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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

const PLANS_ID = [
  { duration: "1 Week", price: "Rp19.000" },
  { duration: "1 Month", price: "Rp79.000", popular: true },
  { duration: "3 Months", price: "Rp199.000" },
  { duration: "12 Months", price: "Rp599.000" },
  { duration: "Lifetime", price: "Rp899.000", badge: "Early Supporter" },
];

const PLANS_GLOBAL = [
  { duration: "1 Week", price: "$4.99" },
  { duration: "1 Month", price: "$14.99", popular: true },
  { duration: "3 Months", price: "$39.99" },
  { duration: "12 Months", price: "$99" },
  { duration: "Lifetime", price: "$149", badge: "Early Supporter" },
];

export function UpgradeModal({ open, onClose }: UpgradeModalProps) {
  const [region, setRegion] = useState<"id" | "global">("global");
  const plans = region === "id" ? PLANS_ID : PLANS_GLOBAL;
  const [selected, setSelected] = useState(1);

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
          className="relative w-full max-w-sm rounded-2xl bg-card border border-accent/30 p-5 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-primary" />

          <button onClick={onClose} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground z-10">
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mx-auto mb-3">
              <Crown className="w-7 h-7 text-primary-foreground" />
            </div>
            <h2 className="font-display text-xl font-bold text-foreground mb-1">ConnectX PRO</h2>
            <p className="text-xs text-muted-foreground">Unlock advanced discovery, unlimited swipes & visibility boosts.</p>
          </div>

          {/* Region Toggle */}
          <div className="flex items-center justify-center gap-1 mb-4 p-1 rounded-xl bg-muted/40 border border-border">
            <button
              onClick={() => { setRegion("id"); setSelected(1); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${region === "id" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              🇮🇩 Indonesia
            </button>
            <button
              onClick={() => { setRegion("global"); setSelected(1); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${region === "global" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Globe className="w-3.5 h-3.5" /> Global
            </button>
          </div>

          {/* Plans */}
          <div className="space-y-2 mb-4">
            {plans.map((p, i) => (
              <button
                key={p.duration}
                onClick={() => setSelected(i)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-colors ${
                  selected === i
                    ? "border-primary bg-primary/10"
                    : "border-border bg-muted/30 hover:border-primary/40"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">{p.duration}</span>
                  {p.popular && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground">POPULAR</span>
                  )}
                  {p.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-accent text-accent-foreground">🎉 {p.badge}</span>
                  )}
                </div>
                <span className="text-sm font-bold text-primary">{p.price}</span>
              </button>
            ))}
          </div>

          {/* Features */}
          <div className="space-y-2 mb-4">
            {PREMIUM_FEATURES.map((f) => (
              <div key={f.label} className="flex items-center gap-3 p-2 rounded-xl bg-muted/30">
                <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-3.5 h-3.5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground">{f.label}</p>
                  <p className="text-[10px] text-muted-foreground">{f.desc}</p>
                </div>
                <Check className="w-4 h-4 text-accent flex-shrink-0" />
              </div>
            ))}
          </div>

          <Button className="w-full bg-gradient-to-r from-accent to-primary text-primary-foreground font-semibold">
            <Crown className="w-4 h-4 mr-2" />
            Upgrade to PRO — {plans[selected].price}
          </Button>
          <p className="text-[10px] text-muted-foreground text-center mt-2">Feature available in full release</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
