import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SpotlightModalProps {
  open: boolean;
  onClose: () => void;
}

const BUNDLES = [
  { count: 1, price: "$1.99", popular: false },
  { count: 4, price: "$4.99", popular: true },
  { count: 10, price: "$9.99", popular: false },
];

export function SpotlightModal({ open, onClose }: SpotlightModalProps) {
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
          className="relative w-full max-w-sm rounded-2xl bg-card border border-border p-6 text-center shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-primary-foreground" />
          </div>

          <h2 className="font-display text-xl font-bold text-foreground mb-1">GetConnect Spotlight</h2>
          <p className="text-xs text-muted-foreground mb-5">
            Boost your visibility 5× and appear first in discovery feeds.
          </p>

          <div className="space-y-2.5 mb-5">
            {BUNDLES.map((b) => (
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
