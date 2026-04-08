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

  const particles = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const distance = 60 + Math.random() * 30;
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      size: 3 + Math.random() * 4,
      delay: 0.4 + Math.random() * 0.3,
    };
  });

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
          initial={{ scale: 0.85, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-sm rounded-2xl bg-card border border-border p-8 text-center shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ambient gradient background wash */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.15, 0.08] }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 bg-gradient-to-b from-[#FF9836]/20 via-[#FED12E]/10 to-transparent pointer-events-none"
          />

          <button onClick={onClose} className="absolute top-4 right-4 z-20 text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>

          {/* Logo animation area */}
          <div className="relative flex items-center justify-center mb-6 h-28">
            {/* Soft ambient glow — appears first */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.6, 0.25], scale: [0.8, 1.2, 1.0] }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="absolute w-32 h-32 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,152,54,0.35) 0%, rgba(254,209,46,0.15) 50%, transparent 70%)",
              }}
            />

            {/* Expanding ring 1 */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: [0.4, 2.2], opacity: [0.6, 0] }}
              transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
              className="absolute w-16 h-16 rounded-full border border-[#FF9836]/40"
            />

            {/* Expanding ring 2 */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: [0.4, 2.6], opacity: [0.4, 0] }}
              transition={{ delay: 0.65, duration: 0.9, ease: "easeOut" }}
              className="absolute w-16 h-16 rounded-full border border-[#FED12E]/30"
            />

            {/* Particle burst */}
            {particles.map((p, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{
                  x: [0, p.x * 0.5, p.x],
                  y: [0, p.y * 0.5, p.y],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0.3],
                }}
                transition={{ delay: p.delay, duration: 0.7, ease: "easeOut" }}
                className="absolute rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  background: `linear-gradient(135deg, #FF9836, #FED12E)`,
                }}
              />
            ))}

            {/* ConnectX Logo — the hero */}
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, scale: 0, rotate: -20 }}
              animate={{
                opacity: [0, 1, 1],
                scale: [0, 1.15, 1.0],
                rotate: [-20, 5, 0],
              }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.34, 1.56, 0.64, 1], // spring-like overshoot
              }}
            >
              {/* Inner glow halo */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0.4, 0.6, 0.4] }}
                transition={{ delay: 0.6, duration: 2, repeat: Infinity, repeatType: "reverse" }}
                className="absolute -inset-3 rounded-full blur-xl"
                style={{
                  background: "radial-gradient(circle, rgba(255,152,54,0.4) 0%, transparent 70%)",
                }}
              />
              <img
                src={connectxLogo}
                alt="ConnectX"
                className="w-[72px] h-[72px] relative drop-shadow-[0_0_20px_rgba(255,152,54,0.5)]"
              />
            </motion.div>
          </div>

          <motion.h2
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
            className="font-display text-2xl font-bold gradient-text mb-1 relative z-10"
          >
            You're connected! 🎉
          </motion.h2>

          <motion.p
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.35 }}
            className="text-sm text-muted-foreground mb-6 relative z-10"
          >
            You and {profile.name} both want to build{" "}
            {profile.interests[0]?.toLowerCase() || "startup"} startups.
          </motion.p>

          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.35 }}
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
