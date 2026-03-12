import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Star, Globe, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SpotlightModalProps {
  open: boolean;
  onClose: () => void;
}

const QUICK_BOOST_ID = [
  { count: 1, price: "Rp9.000" },
  { count: 5, price: "Rp39.000", popular: true },
  { count: 10, price: "Rp69.000" },
];

const PREMIUM_SPOTLIGHT_ID = [
  { count: 1, price: "Rp29.000" },
  { count: 3, price: "Rp79.000", popular: true },
];

const QUICK_BOOST_GLOBAL = [
  { count: 1, price: "$1.99" },
  { count: 5, price: "$7.99", popular: true },
  { count: 10, price: "$14.99" },
];

const PREMIUM_SPOTLIGHT_GLOBAL = [
  { count: 1, price: "$5.99" },
  { count: 3, price: "$14.99", popular: true },
];

export function SpotlightModal({ open, onClose }: SpotlightModalProps) {
  const [region, setRegion] = useState<"id" | "global">("global");
  const quickBoost = region === "id" ? QUICK_BOOST_ID : QUICK_BOOST_GLOBAL;
  const premiumSpotlight = region === "id" ? PREMIUM_SPOTLIGHT_ID : PREMIUM_SPOTLIGHT_GLOBAL;

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
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="relative w-full max-w-sm rounded-2xl bg-card border border-border p-5 text-center shadow-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-primary-foreground" />
          </div>

          <h2 className="font-display text-xl font-bold text-foreground mb-1">Get Spotlight</h2>
          <p className="text-xs text-muted-foreground mb-4">
            Boost your visibility and appear first in discovery feeds.
          </p>

          {/* Region Toggle */}
          <div className="flex items-center justify-center gap-1 mb-5 p-1 rounded-xl bg-muted/40 border border-border">
            <button
              onClick={() => setRegion("id")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${region === "id" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              🇮🇩 Indonesia
            </button>
            <button
              onClick={() => setRegion("global")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${region === "global" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Globe className="w-3.5 h-3.5" /> Global
            </button>
          </div>

          {/* Quick Boost Section */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2.5 text-left">
              <Clock className="w-4 h-4 text-accent" />
              <h3 className="text-sm font-bold text-foreground">Quick Boost</h3>
              <span className="text-[10px] text-muted-foreground">60 min</span>
            </div>
            <div className="space-y-2">
              {quickBoost.map((b) => (
                <button
                  key={b.count}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-colors ${
                    b.popular
                      ? "border-primary bg-primary/10"
                      : "border-border bg-muted/30 hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex gap-0.5">
                      {Array.from({ length: Math.min(b.count, 4) }).map((_, i) => (
                        <Zap key={i} className="w-3.5 h-3.5 text-accent" fill="currentColor" />
                      ))}
                      {b.count > 4 && <span className="text-[10px] text-accent font-bold">+{b.count - 4}</span>}
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      {b.count} Boost{b.count > 1 ? "s" : ""}
                    </span>
                    {b.popular && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground">
                        POPULAR
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-bold text-primary">{b.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Premium Spotlight Section */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2.5 text-left">
              <Star className="w-4 h-4 text-accent" />
              <h3 className="text-sm font-bold text-foreground">Premium Spotlight</h3>
              <span className="text-[10px] text-muted-foreground">12 hours</span>
            </div>
            <div className="space-y-2">
              {premiumSpotlight.map((b) => (
                <button
                  key={b.count}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-colors ${
                    b.popular
                      ? "border-primary bg-primary/10"
                      : "border-border bg-muted/30 hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex gap-0.5">
                      {Array.from({ length: b.count }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-accent" fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      {b.count} Spotlight{b.count > 1 ? "s" : ""}
                    </span>
                    {b.popular && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground">
                        POPULAR
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-bold text-primary">{b.price}</span>
                </button>
              ))}
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-accent to-primary text-primary-foreground font-semibold">
            <Zap className="w-4 h-4 mr-2" />
            Get Spotlight
          </Button>
          <p className="text-[10px] text-muted-foreground mt-2">Feature available in full release</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
