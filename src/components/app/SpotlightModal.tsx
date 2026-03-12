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

function BundleCard({ label, count, price, popular, icon: Icon }: { label: string; count: number; price: string; popular?: boolean; icon: typeof Zap }) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`w-full flex items-center justify-between p-3 rounded-2xl border-2 transition-all duration-200 ${
        popular
          ? "border-primary bg-primary/5 shadow-sm shadow-primary/10"
          : "border-transparent bg-muted/30 hover:bg-muted/50"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-accent" />
        </div>
        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-[13px] font-semibold text-foreground">
              {count} {label}{count > 1 ? "s" : ""}
            </span>
            {popular && (
              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground leading-none">POPULAR</span>
            )}
          </div>
        </div>
      </div>
      <span className={`text-[13px] font-bold ${popular ? "text-primary" : "text-foreground"}`}>{price}</span>
    </motion.button>
  );
}

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
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-[380px] rounded-3xl bg-card border border-border/50 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative px-6 pt-6 pb-4 bg-gradient-to-b from-accent/8 to-transparent">
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center mx-auto mb-3 shadow-lg shadow-accent/20">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <h2 className="font-display text-lg font-bold text-foreground text-center">Get Spotlight</h2>
            <p className="text-[11px] text-muted-foreground text-center mt-1">Boost your visibility in discovery feeds</p>

            {/* Region Toggle */}
            <div className="flex items-center justify-center gap-0.5 mt-4 p-0.5 rounded-full bg-muted/60 border border-border/50 w-fit mx-auto">
              <button
                onClick={() => setRegion("id")}
                className={`px-4 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-200 ${region === "id" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                🇮🇩 Indonesia
              </button>
              <button
                onClick={() => setRegion("global")}
                className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-200 ${region === "global" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Globe className="w-3 h-3" /> Global
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            {/* Quick Boost */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-2.5">
                <Clock className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-bold text-foreground">Quick Boost</span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">60 min</span>
              </div>
              <div className="space-y-1.5">
                {quickBoost.map((b) => (
                  <BundleCard key={b.count} label="Boost" count={b.count} price={b.price} popular={b.popular} icon={Zap} />
                ))}
              </div>
            </div>

            {/* Premium Spotlight */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-2.5">
                <Star className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-bold text-foreground">Premium Spotlight</span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">12 hours</span>
              </div>
              <div className="space-y-1.5">
                {premiumSpotlight.map((b) => (
                  <BundleCard key={b.count} label="Spotlight" count={b.count} price={b.price} popular={b.popular} icon={Star} />
                ))}
              </div>
            </div>

            <Button className="w-full h-11 rounded-2xl bg-gradient-to-r from-accent to-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-shadow">
              <Zap className="w-4 h-4 mr-2" />
              Get Spotlight
            </Button>
            <p className="text-[10px] text-muted-foreground text-center mt-2.5 opacity-60">Feature available in full release</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
