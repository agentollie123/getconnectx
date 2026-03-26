import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Rocket, Handshake, Zap, Code, BarChart3, Users, Lightbulb, Link } from "lucide-react";
import { useEffect, useState } from "react";

const NODES = [
  { id: "founders", label: "Founders", emoji: "🚀", x: 48, y: 6, delay: 0 },
  { id: "cofounders", label: "Co-Founders", emoji: "🤝", x: 10, y: 30, delay: 0.12 },
  { id: "engineers", label: "Engineers", emoji: "⚡", x: 88, y: 25, delay: 0.24 },
  { id: "investors", label: "Investors", emoji: "💰", x: 14, y: 62, delay: 0.36 },
  { id: "advisors", label: "Advisors", emoji: "🧠", x: 82, y: 58, delay: 0.48 },
  { id: "partners", label: "Partners", emoji: "🔗", x: 32, y: 88, delay: 0.6 },
  { id: "operators", label: "Operators", emoji: "📊", x: 65, y: 82, delay: 0.72 },
];

const CONNECTIONS: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 6],
  [0, 4], [1, 5], [2, 6], [0, 6], [1, 2], [3, 4],
];

function NetworkVisualization() {
  const [activeConn, setActiveConn] = useState(0);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveConn((prev) => {
        const next = (prev + 1) % CONNECTIONS.length;
        setPulseKey((k) => k + 1);
        return next;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const activeFrom = CONNECTIONS[activeConn][0];
  const activeTo = CONNECTIONS[activeConn][1];

  return (
    <div className="relative w-full" style={{ aspectRatio: "4/3", maxWidth: 520 }}>
      {/* Lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="line-glow">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {CONNECTIONS.map(([from, to], i) => {
          const a = NODES[from];
          const b = NODES[to];
          const isActive = i === activeConn;
          return (
            <motion.line
              key={`${from}-${to}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={isActive ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.12)"}
              strokeWidth={isActive ? 0.5 : 0.25}
              filter={isActive ? "url(#line-glow)" : undefined}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.08 }}
            />
          );
        })}
        {/* Traveling dot */}
        <motion.circle
          key={pulseKey}
          r="1"
          fill="hsl(var(--primary))"
          filter="url(#line-glow)"
          initial={{ cx: NODES[activeFrom].x, cy: NODES[activeFrom].y, opacity: 1 }}
          animate={{ cx: NODES[activeTo].x, cy: NODES[activeTo].y, opacity: [1, 1, 0.4] }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </svg>

      {/* Nodes */}
      {NODES.map((node, idx) => {
        const isActive = idx === activeFrom || idx === activeTo;
        return (
          <motion.div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: node.delay + 0.2, type: "spring", stiffness: 200 }}
          >
            <motion.div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border backdrop-blur-sm transition-all duration-500 ${
                isActive
                  ? "bg-card/90 border-primary/40 shadow-[0_0_24px_hsl(var(--primary)/0.25)]"
                  : "bg-card/60 border-border/40"
              }`}
              animate={isActive ? { scale: [1, 1.08, 1] } : { scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-sm">{node.emoji}</span>
              <span className={`text-xs font-medium whitespace-nowrap transition-colors duration-500 ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`}>
                {node.label}
              </span>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Center ambient dot */}
      <div className="absolute top-[45%] left-[48%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          className="w-2.5 h-2.5 rounded-full bg-primary"
          animate={{ scale: [1, 3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              The platform where startups begin
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Build Your Startup{" "}
              <br className="hidden sm:block" />
              With the{" "}
              <span className="gradient-text">Right People.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mb-3 leading-relaxed">
              ConnectX connects founders, co-founders, and early teams to start startups together.
            </p>

            <p className="text-sm text-muted-foreground/70 max-w-lg mb-8">
              No networking. No job boards. Just the people you need to start.
            </p>

            <div className="flex flex-wrap gap-4 mb-3">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary" asChild>
                <a href="https://forms.gle/ut7mQmX8XKrr56136" target="_blank" rel="noopener noreferrer">
                  Join Waitlist
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary" asChild>
                <a href="/app">
                  <Play className="w-4 h-4 mr-2" />
                  Explore Playground
                </a>
              </Button>
            </div>

            <p className="text-xs text-primary/80 font-medium">
              Be early. The best teams form first.
            </p>

            <div className="flex gap-8 mt-10 pt-8 border-t border-border/50">
              {[
                { value: "12,000+", label: "Builders" },
                { value: "80,000+", label: "Connections" },
                { value: "300+", label: "Startups Forming" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display font-bold text-xl text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center"
          >
            <NetworkVisualization />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
