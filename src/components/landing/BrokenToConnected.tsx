import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export function BrokenToConnected() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [connected, setConnected] = useState(false);
  const [showPayoff, setShowPayoff] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const t1 = setTimeout(() => setConnected(true), 1800);
    const t2 = setTimeout(() => setShowPayoff(true), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [isInView]);

  const labels = ["Founder", "Talent", "Opportunity"];

  return (
    <div ref={ref} className="max-w-2xl mx-auto my-20 px-4 text-center">
      {/* Headline */}
      {isInView && (
        <div className="mb-14">
          <motion.p
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            It's not a talent problem.
          </motion.p>
          <motion.p
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mt-1"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            It's a connection problem.
          </motion.p>
        </div>
      )}

      {/* Visual: dots → connected line */}
      {isInView && (
        <div className="mb-10">
          <div className="flex items-center justify-center gap-6 sm:gap-12">
            {labels.map((label, i) => (
              <motion.div
                key={label}
                className="flex flex-col items-center gap-2 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.8 + i * 0.3 }}
              >
                <span className="text-xs sm:text-sm text-muted-foreground font-medium">{label}</span>
                <span className="w-2.5 h-2.5 rounded-full bg-primary/80" />
              </motion.div>
            ))}
          </div>

          {/* Connecting line */}
          <div className="flex justify-center -mt-[11px] pointer-events-none">
            <motion.div
              className="h-px bg-primary/60"
              style={{ width: "calc(100% - 80px)", maxWidth: 340 }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: connected ? 1 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </div>
        </div>
      )}

      {/* Single line of text */}
      {isInView && !connected && (
        <motion.p
          className="text-sm sm:text-base text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.6 }}
        >
          People exist. They just don't meet.
        </motion.p>
      )}

      {/* Payoff */}
      {showPayoff && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-display text-2xl sm:text-3xl font-bold gradient-text mb-1">
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
