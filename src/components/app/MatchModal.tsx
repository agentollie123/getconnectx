import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, BarChart3, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/profileData";

interface MatchModalProps {
  profile: Profile | null;
  onClose: () => void;
  onChat: () => void;
  onReport: () => void;
}

export function MatchModal({ profile, onClose, onChat, onReport }: MatchModalProps) {
  if (!profile) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        {/* Glow burst */}
        <motion.div
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute w-32 h-32 rounded-full bg-primary/30 blur-3xl"
        />

        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full max-w-sm rounded-2xl bg-card border border-border p-8 text-center shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>

          {/* Two profiles sliding together */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center ring-3 ring-primary/20">
                <Sparkles className="w-7 h-7 text-primary-foreground" />
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.35, type: "spring", stiffness: 300, damping: 15 }}
            >
              <Heart className="w-8 h-8 text-primary" fill="currentColor" />
            </motion.div>

            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}
            >
              <img src={profile.photo} alt={profile.name} className="w-16 h-16 rounded-full ring-3 ring-primary/20 object-cover" />
            </motion.div>
          </div>

          <motion.h2
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.3 }}
            className="font-display text-2xl font-bold gradient-text mb-1"
          >
            You're connected! 🎉
          </motion.h2>

          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.3 }}
            className="text-sm text-muted-foreground mb-6"
          >
            You and {profile.name} both want to build{" "}
            {profile.interests[0]?.toLowerCase() || "startup"} startups.
          </motion.p>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.3 }}
            className="flex gap-3"
          >
            <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90" onClick={onChat}>
              <MessageCircle className="w-4 h-4 mr-1.5" />
              Start Chat
            </Button>
            <Button variant="outline" className="flex-1 border-border" onClick={onReport}>
              <BarChart3 className="w-4 h-4 mr-1.5" />
              View Report
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
