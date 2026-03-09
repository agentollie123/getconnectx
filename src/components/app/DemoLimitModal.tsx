import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DemoLimitModalProps {
  open: boolean;
  onClose: () => void;
}

export function DemoLimitModal({ open, onClose }: DemoLimitModalProps) {
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
          className="relative w-full max-w-sm rounded-2xl bg-card border border-border p-8 text-center shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[hsl(30,100%,50%)] to-[hsl(22,100%,50%)] flex items-center justify-center mx-auto mb-4">
            <Smartphone className="w-8 h-8 text-primary-foreground" />
          </div>

          <h2 className="font-display text-xl font-bold text-foreground mb-2">
            Start connecting for real.
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            You've explored how ConnectX works. Download the app to start building startup teams.
          </p>

          <div className="flex gap-3">
            <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
              Download iOS
            </Button>
            <Button variant="outline" className="flex-1 border-border">
              Download Android
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
