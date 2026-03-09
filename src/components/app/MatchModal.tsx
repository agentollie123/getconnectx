import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, BarChart3, X } from "lucide-react";
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="relative w-full max-w-sm rounded-2xl bg-card border border-border p-8 text-center shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", damping: 10 }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-[hsl(30,100%,50%)] to-[hsl(22,100%,50%)] flex items-center justify-center mx-auto mb-4"
          >
            <Heart className="w-10 h-10 text-primary-foreground" fill="currentColor" />
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-display text-2xl font-bold gradient-text mb-2"
          >
            It's a Match!
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-muted-foreground mb-6"
          >
            You and {profile.name} both want to build{" "}
            {profile.interests[0]?.toLowerCase() || "startup"} startups.
          </motion.p>

          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={profile.photo} alt={profile.name} className="w-12 h-12 rounded-full ring-2 ring-primary/30 object-cover" />
          </div>

          <div className="flex gap-3">
            <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90" onClick={onChat}>
              <MessageCircle className="w-4 h-4 mr-1.5" />
              Start Chat
            </Button>
            <Button variant="outline" className="flex-1 border-border" onClick={onReport}>
              <BarChart3 className="w-4 h-4 mr-1.5" />
              View Report
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
