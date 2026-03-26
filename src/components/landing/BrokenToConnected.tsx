import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

// Node positions: scattered (random) → connected (structured)
const NODES = [
  { id: "founder", label: "Founder", scattered: { x: 18, y: 25 }, connected: { x: 30, y: 50 } },
  { id: "talent", label: "Talent", scattered: { x: 75, y: 18 }, connected: { x: 70, y: 50 } },
  { id: "opportunity", label: "Opportunity", scattered: { x: 52, y: 78 }, connected: { x: 50, y: 25 } },
  { id: "dot1", label: "", scattered: { x: 35, y: 55 }, connected: { x: 40, y: 38 } },
  { id: "dot2", label: "", scattered: { x: 85, y: 65 }, connected: { x: 60, y: 38 } },
];

const CONNECTED_EDGES: [number, number][] = [
  [0, 3], [3, 2], [2, 4], [4, 1], [0, 2], [1, 2],
];

const BROKEN_EDGES: [number, number][] = [
  [0, 3], [2, 4], [1, 0],
];

type Phase = "hook" | "scattered" | "friction" | "transition" | "connected" | "payoff";

const PHASE_TIMINGS: Record<Phase, number> = {
  hook: 1500,
  scattered: 1500,
  friction: 1200,
  transition: 1000,
  connected: 1500,
  payoff: 0,
};

const PHASE_ORDER: Phase[] = ["hook", "scattered", "friction", "transition", "connected", "payoff"];

export function BrokenToConnected() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [phase, setPhase] = useState<Phase>("hook");
  const [started, setStarted] = useState(false);

  // Start animation when scrolled into view
  useEffect(() => {
    if (isInView && !started) {
      setStarted(true);
    }
  }, [isInView, started]);

  // Phase progression
  useEffect(() => {
    if (!started) return;
    
    let currentIndex = 0;
    setPhase(PHASE_ORDER[0]);

    const advance = () => {
      const currentPhase = PHASE_ORDER[currentIndex];
      const timing = PHASE_TIMINGS[currentPhase];
      
      if (timing === 0 || currentIndex >= PHASE_ORDER.length - 1) return;

      const timer = setTimeout(() => {
        currentIndex++;
        if (currentIndex < PHASE_ORDER.length) {
          setPhase(PHASE_ORDER[currentIndex]);
          advance();
        }
      }, timing);

      return timer;
    };

    const timer = advance();
    return () => { if (timer) clearTimeout(timer); };
  }, [started]);

  const showNodes = phase !== "hook";
  const useConnectedPositions = phase === "transition" || phase === "connected" || phase === "payoff";
  const showBrokenLines = phase === "friction";
  const showConnectedLines = phase === "connected" || phase === "payoff";
  const showLabels = phase === "scattered" || phase === "friction";
  const showConnectedLabels = phase === "connected" || phase === "payoff";

  return (
    <div ref={containerRef} className="max-w-3xl mx-auto my-16">
      {/* Text overlay area */}
      <div className="relative" style={{ minHeight: 420 }}>
        
        {/* STATE 1: Hook text */}
        <AnimatePresence mode="wait">
          {(phase === "hook") && (
            <motion.div
              key="hook"
              className="absolute inset-0 flex flex-col items-center justify-center z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.p
                className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground text-center mb-2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Not a talent problem.
              </motion.p>
              <motion.p
                className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-center"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                It's a{" "}
                <span className="gradient-text" style={{ textShadow: "0 0 30px hsl(var(--primary) / 0.3)" }}>
                  connection
                </span>{" "}
                problem.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SVG Visualization */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${showNodes ? "opacity-100" : "opacity-0"}`}>
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="bc-glow">
                <feGaussianBlur stdDeviation="0.8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="bc-glow-strong">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id="bc-node-grad">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              </radialGradient>
            </defs>

            {/* Broken lines (friction phase) */}
            {showBrokenLines && BROKEN_EDGES.map(([from, to], i) => {
              const a = NODES[from].scattered;
              const b = NODES[to].scattered;
              return (
                <motion.line
                  key={`broken-${from}-${to}`}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke="hsl(var(--primary) / 0.4)"
                  strokeWidth={0.3}
                  strokeDasharray="1.5 1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 1, 0.8, 0], opacity: [0, 0.6, 0.4, 0] }}
                  transition={{ duration: 1.2, delay: i * 0.15, ease: "easeInOut" }}
                />
              );
            })}

            {/* Connected lines (solution phase) */}
            {showConnectedLines && CONNECTED_EDGES.map(([from, to], i) => {
              const a = NODES[from].connected;
              const b = NODES[to].connected;
              return (
                <motion.line
                  key={`connected-${from}-${to}`}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke="hsl(var(--primary))"
                  strokeWidth={0.35}
                  filter="url(#bc-glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.7 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                />
              );
            })}

            {/* Nodes */}
            {NODES.map((node, idx) => {
              const pos = useConnectedPositions ? node.connected : node.scattered;
              const isLabeled = idx < 3;
              const nodeRadius = isLabeled ? 1.8 : 1.2;

              return (
                <g key={node.id}>
                  <motion.circle
                    r={nodeRadius}
                    fill="url(#bc-node-grad)"
                    filter={showConnectedLines ? "url(#bc-glow-strong)" : "url(#bc-glow)"}
                    initial={{ cx: node.scattered.x, cy: node.scattered.y, opacity: 0, scale: 0 }}
                    animate={{
                      cx: pos.x,
                      cy: pos.y,
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      cx: { duration: 0.8, ease: "easeInOut" },
                      cy: { duration: 0.8, ease: "easeInOut" },
                      opacity: { duration: 0.5, delay: idx * 0.1 },
                      scale: { duration: 0.4, delay: idx * 0.1, type: "spring", stiffness: 200 },
                    }}
                  />
                  {/* Scattered labels */}
                  {showLabels && isLabeled && (
                    <motion.text
                      x={node.scattered.x}
                      y={node.scattered.y + 4.5}
                      textAnchor="middle"
                      fill="hsl(var(--muted-foreground))"
                      fontSize="2.8"
                      fontWeight="500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.7 }}
                      transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                    >
                      {node.label}
                    </motion.text>
                  )}
                  {/* Connected labels */}
                  {showConnectedLabels && isLabeled && (
                    <motion.text
                      x={node.connected.x}
                      y={node.connected.y + 5}
                      textAnchor="middle"
                      fill="hsl(var(--foreground))"
                      fontSize="2.8"
                      fontWeight="600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      {node.label}
                    </motion.text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Phase text overlays */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 pointer-events-none z-10">
          <AnimatePresence mode="wait">
            {(phase === "scattered") && (
              <motion.p
                key="scattered-text"
                className="text-sm text-muted-foreground/60 tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                Scattered.
              </motion.p>
            )}
            {(phase === "friction") && (
              <motion.p
                key="friction-text"
                className="text-sm text-muted-foreground/60 tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                Not connected.
              </motion.p>
            )}
            {(phase === "connected") && (
              <motion.p
                key="connected-text"
                className="font-display text-2xl sm:text-3xl font-bold gradient-text"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                ConnectX
              </motion.p>
            )}
            {(phase === "payoff") && (
              <motion.div
                key="payoff-text"
                className="text-center"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-display text-xl sm:text-2xl lg:text-3xl font-bold gradient-text mb-2">
                  ConnectX
                </p>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Find the right people. At the right time.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
