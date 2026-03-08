import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useState } from "react";

const roles = [
  { label: "Founders", emoji: "🚀", x: 15, y: 20 },
  { label: "Engineers", emoji: "⚡", x: 75, y: 15 },
  { label: "Designers", emoji: "🎨", x: 25, y: 70 },
  { label: "Operators", emoji: "📊", x: 80, y: 65 },
  { label: "Growth", emoji: "📈", x: 50, y: 40 },
  { label: "AI/ML", emoji: "🤖", x: 60, y: 80 },
];

const connections = [
  [0, 4], [1, 4], [2, 4], [3, 4], [0, 1], [2, 3], [4, 5], [1, 5], [0, 2],
];

function NetworkGraph() {
  const [activeConn, setActiveConn] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveConn((p) => (p + 1) % connections.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[400px]">
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {connections.map(([from, to], i) => (
          <motion.line
            key={i}
            x1={roles[from].x}
            y1={roles[from].y}
            x2={roles[to].x}
            y2={roles[to].y}
            stroke="hsl(30 100% 61%)"
            strokeWidth="0.3"
            strokeOpacity={i === activeConn ? 0.8 : 0.15}
            initial={false}
            animate={{ strokeOpacity: i === activeConn ? 0.8 : 0.15 }}
            transition={{ duration: 0.5 }}
          />
        ))}
      </svg>

      {/* Nodes */}
      {roles.map((role, i) => (
        <motion.div
          key={role.label}
          className="absolute"
          style={{ left: `${role.x}%`, top: `${role.y}%`, transform: "translate(-50%, -50%)" }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.15, type: "spring" }}
        >
          <motion.div
            className="glass-card rounded-xl px-3 py-2 flex items-center gap-2 cursor-default"
            whileHover={{ scale: 1.1 }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-lg">{role.emoji}</span>
            <span className="text-xs font-medium text-foreground whitespace-nowrap">{role.label}</span>
          </motion.div>
        </motion.div>
      ))}

      {/* Animated pulse on active connection */}
      {(() => {
        const [from, to] = connections[activeConn];
        const midX = (roles[from].x + roles[to].x) / 2;
        const midY = (roles[from].y + roles[to].y) / 2;
        return (
          <motion.div
            key={activeConn}
            className="absolute w-3 h-3 rounded-full bg-primary"
            style={{ left: `${midX}%`, top: `${midY}%`, transform: "translate(-50%, -50%)" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5 }}
          />
        );
      })()}
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              The Operating System for Starting Companies
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Start Companies,{" "}
              <br />
              <span className="gradient-text">Not Just Conversations.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mb-4 leading-relaxed">
              ConnectX is a startup matchmaking platform connecting founders, builders, and early believers to start companies together.
            </p>

            <p className="text-base text-foreground/70 max-w-lg mb-8">
              Find your co-founder, assemble your startup team, and build the next generation of companies.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary">
                Join Waiting list
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary">
                <Play className="w-4 h-4 mr-2" />
                <a href="#playground">Try the Playground</a>
              </Button>
            </div>

            {/* Quick stats */}
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

          {/* Right: Network Graph */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <NetworkGraph />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
