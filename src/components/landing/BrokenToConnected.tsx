import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export function BrokenToConnected() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timers = [
      setTimeout(() => setPhase(1), 0),      // dots fade in
      setTimeout(() => setPhase(2), 1200),    // line draws
      setTimeout(() => setPhase(3), 1800),    // glow activates
      setTimeout(() => setPhase(4), 2200),    // brand fades in
    ];
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  const labels = ["Founder", "Talent", "Opportunity"];

  return (
    <section
      ref={ref}
      className="w-full py-20"
      style={{ background: "#0B0B0F" }}
    >
      <div className="mx-auto px-4" style={{ maxWidth: 375 }}>
        <div className="mx-auto" style={{ maxWidth: 327 }}>

          {/* Headline */}
          <div className="text-center">
            <motion.p
              className="font-sans font-semibold"
              style={{ fontSize: 28, lineHeight: "36px", color: "#FFFFFF" }}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              It's not a talent problem.
            </motion.p>
            <motion.p
              className="font-sans font-semibold"
              style={{ fontSize: 28, lineHeight: "36px", color: "#FF8A3D" }}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              It's a connection problem.
            </motion.p>
          </div>

          {/* Visual Row — 32px gap from headline */}
          <div className="flex items-center justify-center" style={{ marginTop: 32, gap: 40 }}>
            {labels.map((label, i) => (
              <motion.div
                key={label}
                className="flex flex-col items-center"
                style={{ gap: 8 }}
                initial={{ opacity: 0 }}
                animate={phase >= 1 ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <span
                  className="font-sans font-medium"
                  style={{ fontSize: 14, color: "#A1A1AA", letterSpacing: "0.2px" }}
                >
                  {label}
                </span>
                <motion.span
                  className="block rounded-full"
                  style={{ width: 8, height: 8 }}
                  animate={
                    phase >= 3
                      ? { backgroundColor: "#FF8A3D", boxShadow: "0 0 12px rgba(255,138,61,0.5)" }
                      : { backgroundColor: "rgba(255,255,255,0.6)", boxShadow: "none" }
                  }
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Connecting line — overlaid between dots */}
          <div className="flex justify-center" style={{ marginTop: -4 }}>
            <svg width="200" height="4" viewBox="0 0 200 4" className="overflow-visible">
              <motion.line
                x1="20" y1="2" x2="180" y2="2"
                stroke="#FF8A3D"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={phase >= 2 ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* Body line — 24px gap from visual */}
          <motion.p
            className="text-center font-sans"
            style={{ marginTop: 24, fontSize: 16, lineHeight: "24px", color: "#C7C7CC" }}
            initial={{ opacity: 0 }}
            animate={phase >= 1 ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            People exist. They just don't meet.
          </motion.p>

          {/* Brand — 48px gap */}
          <motion.div
            className="text-center"
            style={{ marginTop: 48 }}
            initial={{ opacity: 0, y: 6 }}
            animate={phase >= 4 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="font-sans font-semibold" style={{ fontSize: 20, color: "#FF8A3D" }}>
              ConnectX
            </p>
            <p className="font-sans" style={{ fontSize: 14, color: "#8E8E93", marginTop: 4 }}>
              Find the right people. At the right time.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
