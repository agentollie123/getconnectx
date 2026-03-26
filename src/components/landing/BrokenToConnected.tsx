import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

type Phase = "headline" | "broken" | "problem" | "connected" | "payoff";

export function BrokenToConnected() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [phase, setPhase] = useState<Phase>("headline");

  useEffect(() => {
    if (!isInView) return;

    const timers = [
      setTimeout(() => setPhase("broken"), 800),
      setTimeout(() => setPhase("problem"), 1800),
      setTimeout(() => setPhase("connected"), 3200),
      setTimeout(() => setPhase("payoff"), 4200),
    ];

    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  const reached = (target: Phase) => {
    const order: Phase[] = ["headline", "broken", "problem", "connected", "payoff"];
    return order.indexOf(phase) >= order.indexOf(target);
  };

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
  });

  return (
    <div ref={ref} className="max-w-2xl mx-auto my-20 px-4">
      {/* 1. Headline */}
      {isInView && (
        <div className="text-center mb-12">
          <motion.p
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground"
            {...fade()}
          >
            It's not a talent problem.
          </motion.p>
          <motion.p
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mt-1"
            {...fade(0.3)}
          >
            It's a connection problem.
          </motion.p>
        </div>
      )}

      {/* 2. Broken state — disconnected people */}
      {reached("broken") && (
        <motion.div className="text-center mb-8" {...fade()}>
          <div className="flex items-start justify-center gap-10 sm:gap-16 mb-3">
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-sm sm:text-base text-muted-foreground font-medium">Founder</span>
              <span className="text-xl text-destructive/70">✕</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-sm sm:text-base text-muted-foreground font-medium">Talent</span>
              <span className="text-xl text-destructive/70">✕</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-sm sm:text-base text-muted-foreground font-medium">Opportunity</span>
            <span className="text-xl text-destructive/70">✕</span>
          </div>
        </motion.div>
      )}

      {/* 3. Problem text */}
      {reached("problem") && (
        <motion.div className="text-center mb-10" {...fade()}>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            People exist. Opportunities exist.
          </p>
          <p className="text-sm sm:text-base text-foreground font-semibold mt-1">
            They don't meet.
          </p>
        </motion.div>
      )}

      {/* 4. Divider */}
      {reached("connected") && (
        <motion.div
          className="w-12 h-px bg-border mx-auto mb-10"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.4 }}
        />
      )}

      {/* 5. Connected state */}
      {reached("connected") && (
        <motion.div className="text-center mb-10" {...fade()}>
          <div className="flex items-center justify-center gap-3 sm:gap-5">
            <span className="text-sm sm:text-base text-foreground font-semibold">Founder</span>
            <span className="text-primary text-xs">———</span>
            <span className="text-sm sm:text-base text-foreground font-semibold">Talent</span>
            <span className="text-primary text-xs">———</span>
            <span className="text-sm sm:text-base text-foreground font-semibold">Opportunity</span>
          </div>
        </motion.div>
      )}

      {/* 6. Payoff */}
      {reached("payoff") && (
        <motion.div className="text-center" {...fade()}>
          <p className="font-display text-2xl sm:text-3xl font-bold gradient-text mb-2">
            ConnectX
          </p>
          <p className="text-sm sm:text-base text-muted-foreground">
            Find the right people. At the right time.
          </p>
        </motion.div>
      )}
    </div>
  );
}
