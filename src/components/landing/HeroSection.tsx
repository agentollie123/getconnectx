import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Rocket, Handshake, Zap, Code, BarChart3, Users, Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";

const NODES = [
  { id: "founders", label: "Founders", icon: Rocket, x: 50, y: 8, delay: 0 },
  { id: "cofounders", label: "Co-Founders", icon: Handshake, x: 12, y: 32, delay: 0.15 },
  { id: "engineers", label: "Engineers", icon: Code, x: 88, y: 28, delay: 0.3 },
  { id: "operators", label: "Operators", icon: BarChart3, x: 78, y: 72, delay: 0.45 },
  { id: "advisors", label: "Advisors", icon: Lightbulb, x: 20, y: 75, delay: 0.6 },
  { id: "partners", label: "Partners", icon: Users, x: 50, y: 92, delay: 0.75 },
];

const CONNECTIONS = [
  { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 1, to: 4 },
  { from: 2, to: 3 }, { from: 3, to: 5 }, { from: 4, to: 5 },
  { from: 0, to: 3 }, { from: 1, to: 5 }, { from: 2, to: 4 },
];

function NetworkVisualization() {
  const [activeConn, setActiveConn] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveConn((prev) => (prev + 1) % CONNECTIONS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto">
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {CONNECTIONS.map((conn, i) => {
          const from = NODES[conn.from];
          const to = NODES[conn.to];
          const isActive = i === activeConn;
          return (
            <motion.line
              key={`${conn.from}-${conn.to}`}
              x1={from.x} y1={from.y}
              x2={to.x} y2={to.y}
              stroke={isActive ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.15)"}
              strokeWidth={isActive ? 0.4 : 0.2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
            />
          );
        })}
        {/* Traveling pulse on active connection */}
        {(() => {
          const conn = CONNECTIONS[activeConn];
          const from = NODES[conn.from];
          const to = NODES[conn.to];
          return (
            <motion.circle
              r="0.6"
              fill="hsl(var(--primary))"
              filter="url(#glow)"
              initial={{ cx: from.x, cy: from.y }}
              animate={{ cx: to.x, cy: to.y }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              key={activeConn}
            />
          );
        })()}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Nodes */}
      {NODES.map((node) => {
        const Icon = node.icon;
        const isActive = CONNECTIONS[activeConn].from === NODES.indexOf(node) || CONNECTIONS[activeConn].to === NODES.indexOf(node);
        return (
          <motion.div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: node.delay + 0.3, type: "spring" }}
          >
            <motion.div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                isActive
                  ? "bg-primary/20 border-primary/50 shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                  : "bg-card border-border/50"
              }`}
              animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Icon className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-500 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
            </motion.div>
            <span className={`text-[10px] sm:text-xs font-medium transition-colors duration-500 ${isActive ? "text-primary" : "text-muted-foreground"}`}>
              {node.label}
            </span>
          </motion.div>
        );
      })}

      {/* Center pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          className="w-3 h-3 rounded-full bg-primary"
          animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Background glow */}
      <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl -z-10" />
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
