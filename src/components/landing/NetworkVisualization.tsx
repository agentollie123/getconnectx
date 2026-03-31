import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ORBIT_NODES = [
  { id: "founders", label: "Founders", emoji: "🚀", orbit: 1, angle: 0, speed: 18 },
  { id: "cofounders", label: "Co-Founders", emoji: "🤝", orbit: 1, angle: 120, speed: 18 },
  { id: "engineers", label: "Engineers", emoji: "⚡", orbit: 1, angle: 240, speed: 18 },
  { id: "investors", label: "Investors", emoji: "💰", orbit: 2, angle: 45, speed: 25 },
  { id: "advisors", label: "Advisors", emoji: "🧠", orbit: 2, angle: 165, speed: 25 },
  { id: "partners", label: "Partners", emoji: "🔗", orbit: 2, angle: 285, speed: 25 },
  { id: "operators", label: "Operators", emoji: "📊", orbit: 3, angle: 90, speed: 35 },
  { id: "designers", label: "Designers", emoji: "🎨", orbit: 3, angle: 210, speed: 35 },
  { id: "marketers", label: "Marketers", emoji: "📣", orbit: 3, angle: 330, speed: 35 },
];

const ORBIT_RADII = [120, 190, 260];

const STATUS_TEXTS = [
  "Matching founder with engineer",
  "Connecting co-founder with advisor",
  "Investor meeting founder",
  "Forming startup team",
  "Building connections",
];

export function NetworkVisualization() {
  const [statusIdx, setStatusIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIdx((prev) => (prev + 1) % STATUS_TEXTS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full flex items-center justify-center select-none" style={{ aspectRatio: "1", maxWidth: 600 }}>
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[70%] h-[70%] rounded-full bg-primary/8 blur-[80px]" />
      </div>

      {/* Central sphere */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Outer glow */}
        <motion.div
          className="absolute w-36 h-36 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Sphere */}
        <motion.div
          className="relative w-24 h-24 rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 35%, hsl(var(--primary) / 0.25), hsl(var(--primary) / 0.08) 60%, transparent 80%)",
            boxShadow: "0 0 60px hsl(var(--primary) / 0.2), inset 0 0 30px hsl(var(--primary) / 0.1)",
            border: "1px solid hsl(var(--primary) / 0.15)",
          }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Concentric orbit rings */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 600">
        <defs>
          <filter id="orbit-glow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {ORBIT_RADII.map((r, i) => (
          <motion.circle
            key={`orbit-${i}`}
            cx={300}
            cy={300}
            r={r}
            fill="none"
            stroke="hsl(var(--primary) / 0.08)"
            strokeWidth={0.8}
            strokeDasharray="4 6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.2, duration: 0.8 }}
          />
        ))}

        {/* Subtle rotating dashed ring for depth */}
        {ORBIT_RADII.map((r, i) => (
          <motion.circle
            key={`orbit-accent-${i}`}
            cx={300}
            cy={300}
            r={r}
            fill="none"
            stroke="hsl(var(--primary) / 0.04)"
            strokeWidth={12}
            strokeDasharray="1 40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
          />
        ))}
      </svg>

      {/* Orbiting nodes */}
      {ORBIT_NODES.map((node, idx) => {
        const radius = ORBIT_RADII[node.orbit - 1];
        return (
          <motion.div
            key={node.id}
            className="absolute pointer-events-auto"
            style={{
              left: "50%",
              top: "50%",
              marginLeft: -40,
              marginTop: -16,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              rotate: [node.angle, node.angle + 360],
            }}
            transition={{
              opacity: { delay: 0.4 + idx * 0.1, duration: 0.5 },
              rotate: {
                duration: node.speed,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            <motion.div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border backdrop-blur-sm cursor-pointer
                bg-card/70 border-border/40 hover:border-primary/40 hover:bg-card/90 hover:shadow-[0_0_16px_hsl(var(--primary)/0.2)] transition-all duration-300"
              style={{
                transform: `translateX(${radius * (300 / 300)}px)`,
              }}
              animate={{ rotate: [-node.angle, -(node.angle + 360)] }}
              transition={{
                rotate: {
                  duration: node.speed,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
              whileHover={{ scale: 1.1 }}
            >
              <span className="text-xs">{node.emoji}</span>
              <span className="text-[10px] font-medium text-muted-foreground whitespace-nowrap">
                {node.label}
              </span>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Center status text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <motion.div
          key={statusIdx}
          className="px-3 py-1 rounded-full bg-card/80 backdrop-blur-sm border border-primary/20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-[10px] text-primary font-medium tracking-wide whitespace-nowrap">
            ⚡ {STATUS_TEXTS[statusIdx]}
          </span>
        </motion.div>
      </div>

      {/* Floating particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-primary/20 pointer-events-none"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
            y: [0, -20, -40],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
