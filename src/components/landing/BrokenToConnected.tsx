import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export function BrokenToConnected() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 1800),
      setTimeout(() => setPhase(4), 2400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  const labels = ["Founder", "Talent", "Opportunity"];

  return (
    <section ref={ref} className="w-full py-20" style={{ background: "#0B0B0F" }}>
      <div className="mx-auto px-4 flex flex-col items-center" style={{ maxWidth: 375 }}>

        {/* Headline — compact, one thought */}
        <div className="text-center">
          <motion.p
            className="font-sans font-semibold"
            style={{ fontSize: 28, lineHeight: "34px", color: "#FFFFFF" }}
            initial={{ opacity: 0, y: 6 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            It's not a talent problem.
          </motion.p>
          <motion.p
            className="font-sans font-semibold"
            style={{ fontSize: 28, lineHeight: "34px", color: "#FF8A3D", marginTop: 2 }}
            initial={{ opacity: 0, y: 6 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            It's a connection problem.
          </motion.p>
        </div>

        {/* Visual row — 24px from headline, labels + dots + line as ONE unit */}
        <div className="relative flex items-end justify-center" style={{ marginTop: 24, gap: 24 }}>
          {labels.map((label, i) => (
            <motion.div
              key={label}
              className="flex flex-col items-center"
              style={{ gap: 6, minWidth: 56 }}
              initial={{ opacity: 0 }}
              animate={phase >= 1 ? { opacity: 1 } : {}}
              transition={{ duration: 0.25, delay: i * 0.1 }}
            >
              <span
                className="font-sans font-medium"
                style={{ fontSize: 13, color: "#A1A1AA", letterSpacing: "0.2px" }}
              >
                {label}
              </span>
              <motion.span
                className="block rounded-full relative z-10"
                style={{ width: 8, height: 8 }}
                animate={
                  phase >= 3
                    ? { backgroundColor: "#FF8A3D", boxShadow: "0 0 10px rgba(255,138,61,0.45)" }
                    : { backgroundColor: "rgba(255,255,255,0.55)", boxShadow: "none" }
                }
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}

          {/* Connecting line — sits behind dots, centered */}
          <svg
            className="absolute bottom-[3px] left-1/2 -translate-x-1/2"
            width="120"
            height="4"
            viewBox="0 0 120 4"
            style={{ overflow: "visible" }}
          >
            <motion.line
              x1="10" y1="2" x2="110" y2="2"
              stroke="#FF8A3D"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={phase >= 2 ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </svg>
        </div>

        {/* Insight — 12px, caption feel */}
        <motion.p
          className="text-center font-sans"
          style={{ marginTop: 12, fontSize: 15, lineHeight: "22px", color: "#C7C7CC" }}
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          People exist. They just don't meet.
        </motion.p>

        {/* Bridge line — 20px */}
        <motion.p
          className="text-center font-sans font-medium"
          style={{ marginTop: 20, fontSize: 15, color: "#FF8A3D" }}
          initial={{ opacity: 0 }}
          animate={phase >= 3 ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          ConnectX connects them.
        </motion.p>

        {/* Brand — 6px, attached */}
        <motion.div
          className="text-center"
          style={{ marginTop: 6 }}
          initial={{ opacity: 0 }}
          animate={phase >= 4 ? { opacity: 1 } : {}}
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
    </section>
  );
}
