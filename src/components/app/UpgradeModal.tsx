import { motion, AnimatePresence } from "framer-motion";
import { X, Crown, Rocket, Eye, MessageCircle, Check, Sparkles } from "lucide-react";
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
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Eye,
    title: "Get Seen First",
    desc: "Appear earlier to founders and startups",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: MessageCircle,
    title: "Don't Miss Opportunities",
    desc: "See who wants to connect with you",
    color: "from-violet-500 to-purple-500",
  },
];

const FREE_ITEMS = [
  "Explore profiles",
  "Basic matching",
  "Limited visibility",
];

const PREMIUM_ITEMS = [
  "See your connects",
  "Higher match quality",
  "Priority visibility",
  "Faster connections",
];

export function UpgradeModal({ open, onClose }: UpgradeModalProps) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");
  const [showDismiss, setShowDismiss] = useState(false);

  const handleClose = () => {
    if (!showDismiss) {
      setShowDismiss(true);
      return;
    }
    setShowDismiss(false);
    onClose();
  };

  const handleActualClose = () => {
    setShowDismiss(false);
    onClose();
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      >
        {/* Dismissal Loop Overlay */}
        <AnimatePresence>
          {showDismiss && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-md"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card rounded-2xl border border-border/50 p-6 max-w-[300px] mx-4 text-center shadow-2xl"
              >
                <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-sm font-semibold text-foreground mb-1">Keep exploring with limited matches</p>
                <p className="text-[11px] text-muted-foreground mb-4">You might miss people who want to connect with you</p>
                <div className="space-y-2">
                  <Button
                    onClick={(e) => { e.stopPropagation(); setShowDismiss(false); }}
                    className="w-full h-10 rounded-xl bg-gradient-to-r from-accent to-primary text-primary-foreground font-semibold text-xs shadow-lg shadow-primary/20"
                  >
                    <Crown className="w-3.5 h-3.5 mr-1.5" />
                    Upgrade to Premium
                  </Button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleActualClose(); }}
                    className="w-full py-2 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Continue with free
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
          className="relative w-full max-w-[400px] rounded-t-3xl sm:rounded-3xl bg-card border border-border/50 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
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

            {/* Hero Section with Blurred Profiles */}
            <div className="relative px-6 pt-8 pb-6 overflow-hidden">
              {/* Blurred profile circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {[
                    { x: "15%", y: "20%", size: "36px", blur: "6px", opacity: 0.25 },
                    { x: "75%", y: "15%", size: "28px", blur: "5px", opacity: 0.2 },
                    { x: "25%", y: "65%", size: "32px", blur: "7px", opacity: 0.15 },
                    { x: "70%", y: "70%", size: "24px", blur: "4px", opacity: 0.2 },
                    { x: "50%", y: "30%", size: "40px", blur: "3px", opacity: 0.3 },
                  ].map((p, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: p.opacity, scale: 1 }}
                      transition={{ delay: 0.1 * i, duration: 0.6 }}
                      className="absolute rounded-full bg-gradient-to-br from-primary/40 to-accent/30"
                      style={{
                        left: p.x,
                        top: p.y,
                        width: p.size,
                        height: p.size,
                        filter: `blur(${p.blur})`,
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  ))}
                  {/* Highlighted "perfect match" */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", damping: 15 }}
                    className="absolute rounded-full border-2 border-primary/50"
                    style={{
                      left: "50%",
                      top: "55%",
                      width: "44px",
                      height: "44px",
                      transform: "translate(-50%, -50%)",
                      boxShadow: "0 0 20px hsl(var(--primary) / 0.4), 0 0 40px hsl(var(--primary) / 0.15)",
                      background: "linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.4))",
                    }}
                  >
                    <div className="w-full h-full rounded-full flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="relative z-10 text-center pt-12">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="font-display text-xl font-bold text-foreground"
                >
                  Find the Right People Faster
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="text-[11px] text-muted-foreground mt-2 leading-relaxed max-w-[260px] mx-auto"
                >
                  You're already exploring.{" "}
                  <span className="text-foreground/80">Now increase your chances</span> of building the right startup.
                </motion.p>
              </div>
            </div>

            {/* Why Upgrade */}
            <div className="px-6 pb-5">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">Why upgrade to Premium</p>
              <div className="space-y-2.5">
                {BENEFITS.map((b, i) => (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${b.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      <b.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="pt-0.5">
                      <p className="text-xs font-semibold text-foreground">{b.title}</p>
                      <p className="text-[10px] text-muted-foreground leading-relaxed">{b.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Differentiator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="mt-4 px-3 py-2.5 rounded-xl bg-primary/5 border border-primary/15"
              >
                <p className="text-[10px] text-primary font-medium text-center">
                  ⚡ Premium users are matched earlier with higher-fit profiles
                </p>
              </motion.div>
            </div>

            {/* Free vs Premium Comparison */}
            <div className="px-6 pb-5">
              <div className="grid grid-cols-2 gap-2">
                {/* Free */}
                <div className="rounded-xl bg-muted/20 border border-border/30 p-3">
                  <p className="text-[10px] font-semibold text-muted-foreground mb-2">Free</p>
                  <div className="space-y-1.5">
                    {FREE_ITEMS.map((item) => (
                      <div key={item} className="flex items-start gap-1.5">
                        <Check className="w-3 h-3 text-muted-foreground/50 mt-0.5 flex-shrink-0" />
                        <span className="text-[10px] text-muted-foreground leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Premium */}
                <div className="rounded-xl bg-primary/5 border border-primary/20 p-3 relative" style={{ boxShadow: "0 0 15px hsl(var(--primary) / 0.08)" }}>
                  <p className="text-[10px] font-semibold text-primary mb-2 flex items-center gap-1">
                    <Crown className="w-3 h-3" /> Premium
                  </p>
                  <div className="space-y-1.5">
                    {PREMIUM_ITEMS.map((item) => (
                      <div key={item} className="flex items-start gap-1.5">
                        <Check className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-[10px] text-foreground leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
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
                  <span className="absolute -top-1.5 -right-1 text-[7px] px-1.5 py-0.5 rounded-full bg-accent text-accent-foreground font-bold leading-none">
                    SAVE 50%
                  </span>
                </button>
              </div>

              <div className="text-center mb-1">
                <motion.div
                  key={billing}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-baseline justify-center gap-1"
                >
                  <span className="text-2xl font-bold text-foreground">
                    {billing === "monthly" ? "$9.99" : "$59"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    / {billing === "monthly" ? "month" : "year"}
                  </span>
                </motion.div>
                {billing === "yearly" && (
                  <p className="text-[10px] text-accent font-medium mt-0.5">
                    That's just $4.92/month
                  </p>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="px-6 pb-6">
              <Button
                className="w-full h-12 rounded-2xl bg-gradient-to-r from-accent to-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all active:scale-[0.98]"
              >
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Premium
              </Button>
              <p className="text-[10px] text-muted-foreground text-center mt-2">
                Start finding better matches today
              </p>

              {/* Urgency + Social Proof */}
              <div className="mt-4 space-y-1.5 text-center">
                <p className="text-[10px] text-foreground/60 font-medium">
                  🔥 The best teams are already forming
                </p>
                <p className="text-[10px] text-primary/70 font-medium">
                  Founders who upgrade get matches 2× faster
                </p>
              </div>

              <p className="text-[9px] text-muted-foreground/40 text-center mt-3">
                Feature available in full release
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
