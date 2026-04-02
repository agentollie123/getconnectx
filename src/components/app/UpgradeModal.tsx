import { motion, AnimatePresence } from "framer-motion";
import { X, Crown, Check, Zap, Eye, RotateCcw, SlidersHorizontal, Star, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
}

const PREMIUM_FEATURES = [
  { icon: Eye, label: "See who liked you" },
  { icon: Zap, label: "Unlimited swipes" },
  { icon: SlidersHorizontal, label: "Advanced filters" },
  { icon: Star, label: "Priority visibility" },
  { icon: RotateCcw, label: "Rewind swipes" },
];

const PLANS_ID = [
  { duration: "1 Week", price: "Rp19.000", perWeek: "" },
  { duration: "1 Month", price: "Rp79.000", perWeek: "Rp19.750/wk", popular: true },
  { duration: "3 Months", price: "Rp199.000", perWeek: "Rp15.308/wk" },
  { duration: "12 Months", price: "Rp599.000", perWeek: "Rp11.519/wk", best: true },
  { duration: "Lifetime", price: "Rp899.000", badge: "Early Supporter" },
];

const PLANS_GLOBAL = [
  { duration: "1 Week", price: "$4.99", perWeek: "" },
  { duration: "1 Month", price: "$14.99", perWeek: "$3.75/wk", popular: true },
  { duration: "3 Months", price: "$39.99", perWeek: "$3.08/wk" },
  { duration: "12 Months", price: "$99", perWeek: "$1.90/wk", best: true },
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
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-[380px] rounded-3xl bg-card border border-border/50 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative px-6 pt-6 pb-4 bg-gradient-to-b from-primary/8 to-transparent">
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mx-auto mb-3 shadow-lg shadow-primary/20">
              <Crown className="w-6 h-6 text-primary-foreground" />
            </div>
            <h2 className="font-display text-lg font-bold text-foreground text-center">ConnectX PRO</h2>
            <p className="text-[11px] text-muted-foreground text-center mt-1">Unlock the full potential of your network</p>

            {/* Region Toggle */}
            <div className="flex items-center justify-center gap-0.5 mt-4 p-0.5 rounded-full bg-muted/60 border border-border/50 w-fit mx-auto">
              <button
                onClick={() => { setRegion("id"); setSelected(1); }}
                className={`px-4 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-200 ${region === "id" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                🇮🇩 Indonesia
              </button>
              <button
                onClick={() => { setRegion("global"); setSelected(1); }}
                className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-200 ${region === "global" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Globe className="w-3 h-3" /> Global
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            {/* Plans */}
            <div className="space-y-1.5 mb-5">
              {plans.map((p, i) => (
                <motion.button
                  key={p.duration}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelected(i)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl border-2 transition-all duration-200 ${
                    selected === i
                      ? "border-primary bg-primary/5 shadow-sm shadow-primary/10"
                      : "border-transparent bg-muted/30 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-left">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${selected === i ? "border-primary" : "border-muted-foreground/30"}`}>
                      {selected === i && <div className="w-2 h-2 rounded-full bg-primary" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[13px] font-semibold text-foreground">{p.duration}</span>
                        {(p as any).popular && (
                          <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground leading-none">POPULAR</span>
                        )}
                        {(p as any).best && (
                          <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-accent text-accent-foreground leading-none">BEST VALUE</span>
                        )}
                        {p.badge && (
                          <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-accent/20 text-accent leading-none">🎉 {p.badge}</span>
                        )}
                      </div>
                      {p.perWeek && (
                        <span className="text-[10px] text-muted-foreground">{p.perWeek}</span>
                      )}
                    </div>
                  </div>
                  <span className={`text-[13px] font-bold ${selected === i ? "text-primary" : "text-foreground"}`}>{p.price}</span>
                </motion.button>
              ))}
            </div>

            {/* Features */}
            <div className="rounded-2xl bg-muted/20 border border-border/50 p-3 mb-5">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">Everything included</p>
              <div className="grid grid-cols-1 gap-2">
                {PREMIUM_FEATURES.map((f) => (
                  <div key={f.label} className="flex items-center gap-2.5">
                    <Check className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    <span className="text-xs text-foreground">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full h-11 rounded-2xl bg-gradient-to-r from-accent to-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow">
              <Crown className="w-4 h-4 mr-2" />
              Upgrade — {plans[selected].price}
            </Button>
            <p className="text-[10px] text-muted-foreground text-center mt-2.5 opacity-60">Feature available in full release</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
