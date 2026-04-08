import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, BarChart3, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/profileData";
import connectxLogo from "@/assets/connectx-logo.png";

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
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-sm rounded-2xl bg-card border border-border p-8 text-center shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ambient wash */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute inset-0 bg-gradient-to-b from-[#FF9836]/20 via-transparent to-transparent pointer-events-none"
          />

          <button onClick={onClose} className="absolute top-4 right-4 z-20 text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>

          {/* === THE MICRO-STORY: "Connection Happens" === */}
          <div className="relative flex items-center justify-center mb-6 h-28">

            {/* --- Act 1: Two signal dots appear and travel inward --- */}

            {/* Left signal - "You" */}
            <motion.div
              initial={{ x: -70, opacity: 0, scale: 0 }}
              animate={{
                x: [-70, -30, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0.3],
              }}
              transition={{ duration: 0.7, ease: "easeIn", times: [0, 0.5, 1] }}
              className="absolute"
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#FF9836] to-[#FF9836]/60 shadow-[0_0_12px_rgba(255,152,54,0.6)]" />
            </motion.div>

            {/* Left trailing pulse */}
            <motion.div
              initial={{ x: -55, opacity: 0, scale: 0 }}
              animate={{
                x: [-55, -20, 0],
                opacity: [0, 0.5, 0],
                scale: [0, 0.7, 0],
              }}
              transition={{ duration: 0.7, delay: 0.08, ease: "easeIn", times: [0, 0.5, 1] }}
              className="absolute w-3 h-3 rounded-full bg-[#FF9836]/40"
            />

            {/* Right signal - "Them" */}
            <motion.div
              initial={{ x: 70, opacity: 0, scale: 0 }}
              animate={{
                x: [70, 30, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0.3],
              }}
              transition={{ duration: 0.7, ease: "easeIn", times: [0, 0.5, 1] }}
              className="absolute"
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-bl from-[#FED12E] to-[#FED12E]/60 shadow-[0_0_12px_rgba(254,209,46,0.6)]" />
            </motion.div>

            {/* Right trailing pulse */}
            <motion.div
              initial={{ x: 55, opacity: 0, scale: 0 }}
              animate={{
                x: [55, 20, 0],
                opacity: [0, 0.5, 0],
                scale: [0, 0.7, 0],
              }}
              transition={{ duration: 0.7, delay: 0.08, ease: "easeIn", times: [0, 0.5, 1] }}
              className="absolute w-3 h-3 rounded-full bg-[#FED12E]/40"
            />

            {/* --- Act 2: Collision flash --- */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.8, 0.8],
                opacity: [0, 0.7, 0],
              }}
              transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
              className="absolute w-16 h-16 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,152,54,0.6) 0%, rgba(254,209,46,0.3) 40%, transparent 70%)",
              }}
            />

            {/* Collision ring */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 2.5], opacity: [0.5, 0] }}
              transition={{ delay: 0.65, duration: 0.7, ease: "easeOut" }}
              className="absolute w-12 h-12 rounded-full border border-[#FF9836]/30"
            />

            {/* --- Act 3: Logo emerges from the merge point --- */}
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0, 1, 1],
                scale: [0, 0, 1.1, 1.0],
              }}
              transition={{
                duration: 1.0,
                delay: 0.5,
                times: [0, 0.15, 0.55, 1],
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              {/* Soft breathing halo */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0.3, 0.45, 0.3] }}
                transition={{ delay: 1.0, duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
                className="absolute -inset-4 rounded-full blur-xl pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(255,152,54,0.35) 0%, transparent 70%)",
                }}
              />
              <img
                src={connectxLogo}
                alt="ConnectX"
                className="w-[72px] h-[72px] relative drop-shadow-[0_0_16px_rgba(255,152,54,0.4)]"
              />
            </motion.div>

            {/* --- Act 3b: Small sparks after merge --- */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const dist = 38 + (i % 2) * 12;
              return (
                <motion.div
                  key={angle}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{
                    x: [0, Math.cos(rad) * dist],
                    y: [0, Math.sin(rad) * dist],
                    opacity: [0, 0.9, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{ delay: 0.75 + i * 0.04, duration: 0.5, ease: "easeOut" }}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    background: i % 2 === 0 ? "#FF9836" : "#FED12E",
                  }}
                />
              );
            })}
          </div>

          {/* Text reveals — staggered after the story completes */}
          <motion.h2
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.35, ease: "easeOut" }}
            className="font-display text-2xl font-bold gradient-text mb-1 relative z-10"
          >
            You're connected! 🎉
          </motion.h2>

          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.25, duration: 0.3 }}
            className="text-sm text-muted-foreground mb-6 relative z-10"
          >
            You and {profile.name} both want to build{" "}
            {profile.interests[0]?.toLowerCase() || "startup"} startups.
          </motion.p>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.3 }}
            className="flex gap-3 relative z-10"
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
