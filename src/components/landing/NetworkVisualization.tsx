import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";

const NODES = [
  { id: "founders", label: "Founders", emoji: "🚀", x: 48, y: 8, delay: 0 },
  { id: "cofounders", label: "Co-Founders", emoji: "🤝", x: 12, y: 32, delay: 0.1 },
  { id: "engineers", label: "Engineers", emoji: "⚡", x: 86, y: 24, delay: 0.2 },
  { id: "investors", label: "Investors", emoji: "💰", x: 16, y: 64, delay: 0.3 },
  { id: "advisors", label: "Advisors", emoji: "🧠", x: 80, y: 58, delay: 0.4 },
  { id: "partners", label: "Partners", emoji: "🔗", x: 34, y: 86, delay: 0.5 },
  { id: "operators", label: "Operators", emoji: "📊", x: 64, y: 80, delay: 0.6 },
];

const ALL_CONNECTIONS: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 6],
  [0, 4], [1, 5], [2, 6], [0, 6], [1, 2], [3, 4],
];

// Match sequences: each is a "team formation" scenario
const MATCH_SEQUENCES = [
  { path: [0, 2, 6], label: "Matching founder with engineer…" },
  { path: [1, 0, 4], label: "Connecting co-founder with advisor…" },
  { path: [3, 0, 2], label: "Investor meeting founder…" },
  { path: [5, 1, 6], label: "Forming team…" },
  { path: [4, 2, 0], label: "Building startup team…" },
];

type Phase = "idle" | "activation" | "scanning" | "connection" | "formation";

export function NetworkVisualization() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [currentSeq, setCurrentSeq] = useState(0);
  const [scanProgress, setScanProgress] = useState<number[]>([]);
  const [connectedNodes, setConnectedNodes] = useState<number[]>([]);
  const [matchedEdges, setMatchedEdges] = useState<[number, number][]>([]);
  const [statusText, setStatusText] = useState("");
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [activated, setActivated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Activation on mount
  useEffect(() => {
    const t1 = setTimeout(() => {
      setActivated(true);
      setPhase("activation");
    }, 600);
    const t2 = setTimeout(() => setPhase("scanning"), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Main animation loop
  useEffect(() => {
    if (phase !== "scanning") return;

    const seq = MATCH_SEQUENCES[currentSeq];
    const path = seq.path;

    // Step 1: scan along path
    let step = 0;
    setScanProgress([path[0]]);
    setStatusText(seq.label);

    const scanInterval = setInterval(() => {
      step++;
      if (step < path.length) {
        setScanProgress(prev => [...prev, path[step]]);
      } else {
        clearInterval(scanInterval);
        // Move to connection phase
        setPhase("connection");
      }
    }, 700);

    return () => clearInterval(scanInterval);
  }, [phase, currentSeq]);

  // Connection phase → formation
  useEffect(() => {
    if (phase !== "connection") return;

    const seq = MATCH_SEQUENCES[currentSeq];
    const path = seq.path;

    // Build matched edges from the path
    const edges: [number, number][] = [];
    for (let i = 0; i < path.length - 1; i++) {
      edges.push([path[i], path[i + 1]]);
    }
    setMatchedEdges(edges);
    setConnectedNodes(path);

    const t = setTimeout(() => setPhase("formation"), 1200);
    return () => clearTimeout(t);
  }, [phase, currentSeq]);

  // Formation → reset → next sequence
  useEffect(() => {
    if (phase !== "formation") return;

    const t = setTimeout(() => {
      // Reset and start next
      setScanProgress([]);
      setConnectedNodes([]);
      setMatchedEdges([]);
      setStatusText("");
      setCurrentSeq(prev => (prev + 1) % MATCH_SEQUENCES.length);
      setPhase("scanning");
    }, 3000);
    return () => clearTimeout(t);
  }, [phase, currentSeq]);

  const getNodeState = useCallback((idx: number) => {
    if (hoveredNode !== null) {
      if (idx === hoveredNode) return "hovered";
      const isConnected = ALL_CONNECTIONS.some(
        ([a, b]) => (a === hoveredNode && b === idx) || (b === hoveredNode && a === idx)
      );
      return isConnected ? "hover-connected" : "dimmed";
    }
    if (connectedNodes.includes(idx)) return "matched";
    if (scanProgress.includes(idx)) return "scanning";
    return "idle";
  }, [hoveredNode, connectedNodes, scanProgress]);

  const getLineState = useCallback((from: number, to: number) => {
    if (hoveredNode !== null) {
      const isConnected =
        (from === hoveredNode || to === hoveredNode);
      return isConnected ? "hover-active" : "dimmed";
    }
    if (matchedEdges.some(([a, b]) => (a === from && b === to) || (a === to && b === from))) {
      return "matched";
    }
    return "default";
  }, [hoveredNode, matchedEdges]);

  // Build scan travel path for the pulse
  const scanPulseNodes = scanProgress.length >= 2
    ? scanProgress.slice(-2)
    : null;

  return (
    <div ref={containerRef} className="relative w-full select-none" style={{ aspectRatio: "4/3", maxWidth: 660 }}>
      {/* SVG Lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="ng-glow">
            <feGaussianBlur stdDeviation="0.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="ng-glow-strong">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="ng-pulse-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* All connection lines */}
        {ALL_CONNECTIONS.map(([from, to], i) => {
          const a = NODES[from];
          const b = NODES[to];
          const state = getLineState(from, to);
          
          const strokeColor = state === "matched"
            ? "hsl(var(--primary))"
            : state === "hover-active"
            ? "hsl(var(--primary) / 0.6)"
            : state === "dimmed"
            ? "hsl(var(--primary) / 0.03)"
            : "hsl(var(--primary) / 0.08)";

          const strokeW = state === "matched" ? 0.6 : state === "hover-active" ? 0.4 : 0.18;

          return (
            <motion.line
              key={`line-${from}-${to}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={strokeColor}
              strokeWidth={strokeW}
              filter={state === "matched" ? "url(#ng-glow-strong)" : undefined}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.06 }}
            />
          );
        })}

        {/* Matched edges glow overlay */}
        {matchedEdges.map(([from, to]) => {
          const a = NODES[from];
          const b = NODES[to];
          return (
            <motion.line
              key={`glow-${from}-${to}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke="hsl(var(--primary))"
              strokeWidth={1.2}
              filter="url(#ng-glow-strong)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0.5] }}
              transition={{ duration: 0.6 }}
            />
          );
        })}

        {/* Traveling scan pulse */}
        {scanPulseNodes && (
          <motion.circle
            key={`pulse-${scanProgress.join("-")}`}
            r="1.2"
            fill="hsl(var(--primary))"
            filter="url(#ng-glow-strong)"
            initial={{
              cx: NODES[scanPulseNodes[0]].x,
              cy: NODES[scanPulseNodes[0]].y,
              opacity: 1,
            }}
            animate={{
              cx: NODES[scanPulseNodes[1]].x,
              cy: NODES[scanPulseNodes[1]].y,
              opacity: [1, 1, 0.6],
            }}
            transition={{ duration: 0.65, ease: "easeInOut" }}
          />
        )}
      </svg>

      {/* Center core — "ConnectX Engine" */}
      <div className="absolute top-[46%] left-[48%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          className="rounded-full bg-primary"
          initial={{ width: 8, height: 8, opacity: 0.3 }}
          animate={
            activated
              ? phase === "activation"
                ? { width: 16, height: 16, opacity: 0.7, scale: [1, 1.6, 1] }
                : { width: 12, height: 12, opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }
              : { width: 8, height: 8, opacity: 0.2 }
          }
          transition={
            phase === "activation"
              ? { duration: 1, ease: "easeOut" }
              : { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }
        />
        {/* Activation ripple */}
        {phase === "activation" && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40"
            initial={{ width: 10, height: 10, opacity: 0.8 }}
            animate={{ width: 80, height: 80, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        )}
      </div>

      {/* Nodes */}
      {NODES.map((node, idx) => {
        const state = getNodeState(idx);
        const isHighlighted = state === "matched" || state === "scanning" || state === "hovered" || state === "hover-connected";
        const isDimmed = state === "dimmed";

        // Formation: move slightly toward center
        const formationOffset = phase === "formation" && connectedNodes.includes(idx)
          ? { x: (48 - node.x) * 0.08, y: (46 - node.y) * 0.08 }
          : { x: 0, y: 0 };

        return (
          <motion.div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: isDimmed ? 0.35 : 1,
              scale: 1,
              x: formationOffset.x,
              y: formationOffset.y,
            }}
            transition={{
              duration: 0.5,
              delay: node.delay + 0.2,
              type: "spring",
              stiffness: 200,
              x: { duration: 1.2, ease: "easeInOut" },
              y: { duration: 1.2, ease: "easeInOut" },
            }}
            onMouseEnter={() => setHoveredNode(idx)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <motion.div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border backdrop-blur-sm transition-colors duration-300 ${
                state === "matched"
                  ? "bg-primary/15 border-primary/50 shadow-[0_0_20px_hsl(var(--primary)/0.35)]"
                  : state === "scanning"
                  ? "bg-primary/10 border-primary/30 shadow-[0_0_12px_hsl(var(--primary)/0.2)]"
                  : state === "hovered"
                  ? "bg-card/90 border-primary/40 shadow-[0_0_16px_hsl(var(--primary)/0.25)]"
                  : state === "hover-connected"
                  ? "bg-card/80 border-primary/30 shadow-[0_0_10px_hsl(var(--primary)/0.15)]"
                  : "bg-card/60 border-border/30"
              }`}
              animate={
                state === "matched"
                  ? { scale: [1, 1.08, 1.04] }
                  : state === "scanning"
                  ? { scale: [1, 1.05, 1] }
                  : { scale: 1 }
              }
              transition={{ duration: 0.5 }}
            >
              <span className="text-sm">{node.emoji}</span>
              <span className={`text-xs font-medium whitespace-nowrap transition-colors duration-300 ${
                isHighlighted ? "text-foreground" : "text-muted-foreground"
              }`}>
                {node.label}
              </span>
            </motion.div>

            {/* Matched node glow ring */}
            {state === "matched" && phase === "formation" && (
              <motion.div
                className="absolute inset-0 -m-1 rounded-xl border border-primary/30"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: [0, 0.6, 0.3], scale: [0.9, 1.1, 1.05] }}
                transition={{ duration: 1.5 }}
              />
            )}
          </motion.div>
        );
      })}

      {/* Formation glow around matched group */}
      {phase === "formation" && connectedNodes.length > 0 && (
        <motion.div
          className="absolute pointer-events-none rounded-full bg-primary/8 blur-2xl"
          style={{
            left: `${connectedNodes.reduce((s, i) => s + NODES[i].x, 0) / connectedNodes.length}%`,
            top: `${connectedNodes.reduce((s, i) => s + NODES[i].y, 0) / connectedNodes.length}%`,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{ width: 120, height: 120, opacity: 0.5 }}
          transition={{ duration: 1.2 }}
        />
      )}

      {/* Status text overlay — centered */}
      <AnimatePresence>
        {statusText && (
          <motion.div
            className="absolute top-[54%] left-[48%] -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.85, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-xs text-primary font-medium tracking-wide whitespace-nowrap">
              {statusText}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
