import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, BarChart3, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/profileData";
import connectxLogo from "@/assets/connectx-logo.png";

          {/* Animated ConnectX Logo — Connection Forming */}
          <div className="flex flex-col items-center justify-center mb-5">
            {/* Glow pulse behind logo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [0.5, 1.4, 1.0], opacity: [0, 0.5, 0] }}
              transition={{ delay: 0.3, duration: 1.2, ease: "easeInOut" }}
              className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-[#FF9836]/40 to-[#FED12E]/30 blur-2xl"
            />
            {/* Second ripple */}
            <motion.div
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: [0.3, 1.8, 1.2], opacity: [0, 0.3, 0] }}
              transition={{ delay: 0.5, duration: 1.0, ease: "easeOut" }}
              className="absolute w-20 h-20 rounded-full border-2 border-[#FF9836]/20"
            />
            {/* Logo entrance */}
            <motion.img
              src={connectxLogo}
              alt="ConnectX"
              className="w-20 h-20 relative z-10 drop-shadow-lg"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: [0.6, 1.08, 1.0] }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            />
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
