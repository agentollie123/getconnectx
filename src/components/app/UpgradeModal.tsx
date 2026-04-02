import { motion, AnimatePresence } from "framer-motion";
import { X, Crown, Check, Rocket, Eye, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
}

const BLURRED_PROFILES = [
  { name: "S. Chen", role: "Full-Stack Dev", score: 94 },
  { name: "M. Rivera", role: "Product Designer", score: 91 },
  { name: "A. Kim", role: "Growth Lead", score: 88 },
];

export function UpgradeModal({ open, onClose }: UpgradeModalProps) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");
  const [showDismiss, setShowDismiss] = useState(false);

  if (!open) return null;

  const handleClose = () => {
    if (!showDismiss) {
      setShowDismiss(true);
    } else {
      setShowDismiss(false);
      onClose();
    }
  };

  const handleKeepExploring = () => {
    setShowDismiss(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-background/90 backdrop-blur-md"
        onClick={handleClose}
      >
        {/* Dismissal Loop Overlay */}
        <AnimatePresence>
          {showDismiss && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-[320px] rounded-2xl bg-card border border-border/50 p-6 text-center shadow-2xl"
              >
                <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-sm font-semibold text-foreground mb-1">Keep exploring with limited matches</p>
                <p className="text-xs text-muted-foreground mb-5">You may miss higher-quality connections and won't see who wants to connect with you.</p>
                <div className="space-y-2">
                  <Button
                    onClick={(e) => { e.stopPropagation(); setShowDismiss(false); }}
                    className="w-full h-10 rounded-xl bg-gradient-to-r from-accent to-primary text-primary-foreground font-semibold text-sm"
                  >
                    <Crown className="w-4 h-4 mr-1.5" />
                    Upgrade Instead
                  </Button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleKeepExploring(); }}
                    className="w-full py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Continue with Free
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Paywall */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="relative w-full max-w-[420px] rounded-t-3xl sm:rounded-3xl bg-card border border-border/50 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
          style={{ boxShadow: "0 -20px 60px -10px hsl(var(--primary) / 0.12), 0 0 40px -10px hsl(var(--accent) / 0.08)" }}
        >
          {/* Close */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full bg-muted/40 flex items-center justify-center text-muted-foreground/60 hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Hero Section */}
            <div className="relative px-6 pt-8 pb-6 bg-gradient-to-b from-primary/10 via-accent/5 to-transparent">
              {/* Blurred profiles */}
              <div className="flex justify-center gap-2 mb-5">
                {BLURRED_PROFILES.map((p, i) => (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className={`relative rounded-xl p-3 w-[90px] ${
                      i === 1
                        ? "bg-card border border-primary/40 shadow-lg shadow-primary/15 scale-105 z-10"
                        : "bg-muted/30 border border-border/30 blur-[1.5px] opacity-60"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg mx-auto mb-1.5 ${
                      i === 1 ? "bg-gradient-to-br from-accent to-primary" : "bg-muted/60"
                    }`} />
                    <p className="text-[9px] font-semibold text-foreground text-center truncate">{p.name}</p>
                    <p className="text-[8px] text-muted-foreground text-center truncate">{p.role}</p>
                    {i === 1 && (
                      <div className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-accent text-accent-foreground text-[8px] font-bold">
                        {p.score}%
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <h2 className="font-display text-xl font-bold text-foreground text-center leading-tight">
                Find the Right People Faster
              </h2>
              <p className="text-xs text-muted-foreground text-center mt-2 leading-relaxed max-w-[280px] mx-auto">
                You're already exploring. Now increase your chances of building the right startup.
              </p>
            </div>

            {/* Why Upgrade */}
            <div className="px-6 pb-5">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">Why Upgrade to Premium</p>
              <div className="space-y-3">
                {[
                  { icon: Rocket, title: "Better Matches", desc: "See higher-quality, more relevant people" },
                  { icon: Eye, title: "Get Seen First", desc: "Appear earlier to founders and startups" },
                  { icon: MessageCircle, title: "Don't Miss Opportunities", desc: "See who wants to connect with you" },
                ].map((b) => (
                  <div key={b.title} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <b.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-foreground">{b.title}</p>
                      <p className="text-[11px] text-muted-foreground">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Differentiator */}
              <div className="mt-4 p-3 rounded-xl bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <p className="text-[11px] text-primary font-medium">Premium users are matched earlier with higher-fit profiles</p>
                </div>
              </div>
            </div>

            {/* Comparison */}
            <div className="px-6 pb-5">
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-muted/20 border border-border/30 p-3">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Free</p>
                  {["Explore profiles", "Basic matching", "Limited visibility"].map((f) => (
                    <div key={f} className="flex items-center gap-1.5 mb-1.5">
                      <Check className="w-3 h-3 text-muted-foreground/50 flex-shrink-0" />
                      <span className="text-[10px] text-muted-foreground">{f}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl bg-primary/5 border border-primary/30 p-3" style={{ boxShadow: "0 0 20px -8px hsl(var(--primary) / 0.15)" }}>
                  <p className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-2">Premium</p>
                  {["See your connects", "Higher match quality", "Priority visibility", "Faster connections"].map((f) => (
                    <div key={f} className="flex items-center gap-1.5 mb-1.5">
                      <Check className="w-3 h-3 text-primary flex-shrink-0" />
                      <span className="text-[10px] text-foreground">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="px-6 pb-5">
              <div className="flex items-center gap-0.5 p-0.5 rounded-xl bg-muted/40 border border-border/30 mb-3">
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
                  <span className="absolute -top-1.5 -right-1 text-[8px] px-1.5 py-0.5 rounded-full bg-accent text-accent-foreground font-bold">SAVE 50%</span>
                </button>
              </div>

              <div className="text-center mb-4">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-display text-3xl font-bold text-foreground">
                    {billing === "monthly" ? "$9.99" : "$59"}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    / {billing === "monthly" ? "month" : "year"}
                  </span>
                </div>
                {billing === "yearly" && (
                  <p className="text-[11px] text-primary mt-0.5">That's just $4.92/month</p>
                )}
              </div>

              {/* CTA */}
              <Button
                className="w-full h-12 rounded-2xl bg-gradient-to-r from-accent to-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-[0.98]"
              >
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Premium
              </Button>
              <p className="text-[11px] text-muted-foreground text-center mt-2">Start finding better matches today</p>
            </div>

            {/* Urgency + Social Proof */}
            <div className="px-6 pb-6 space-y-2">
              <p className="text-[10px] text-center text-muted-foreground/70 italic">
                The best teams are already forming
              </p>
              <p className="text-[10px] text-center text-primary/70 font-medium">
                Founders who upgrade get matches 2× faster
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
