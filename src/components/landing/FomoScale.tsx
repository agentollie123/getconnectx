import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Rocket, Users, UserPlus, Briefcase, TrendingUp, Handshake, GraduationCap } from "lucide-react";

/* ───── count-up hook ───── */
function useCountUp(target: number, inView: boolean, duration = 2200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return count;
}

/* ───── funnel data ───── */
const funnel = [
  { value: 100000, label: "Builders", suffix: "", icon: Users, color: "text-primary" },
  { value: 20000, label: "Founders", suffix: "", icon: Rocket, color: "text-primary" },
  { value: 15000, label: "Co-Founders Matched", suffix: "", icon: UserPlus, color: "text-accent" },
  { value: 40000, label: "Early Team Members", suffix: "", icon: Briefcase, color: "text-primary" },
  { value: 10000, label: "New Startups Formed", suffix: "+", icon: TrendingUp, color: "text-accent" },
];

const futureNodes = [
  { label: "Investors", icon: TrendingUp, emoji: "💰" },
  { label: "Mentors", icon: GraduationCap, emoji: "🧠" },
  { label: "Strategic Partners", icon: Handshake, emoji: "🔗" },
];

/* ───── node types for visualization ───── */
interface NodeData {
  x: number;
  y: number;
  r: number;
  label: string;
  type: "founder" | "builder" | "startup" | "cofounder";
  delay: number;
}

const networkNodes: NodeData[] = [
  { x: 50, y: 30, r: 18, label: "Founder", type: "founder", delay: 0 },
  { x: 22, y: 22, r: 10, label: "Co-Founder", type: "cofounder", delay: 0.3 },
  { x: 78, y: 20, r: 10, label: "Engineer", type: "builder", delay: 0.4 },
  { x: 30, y: 55, r: 10, label: "Designer", type: "builder", delay: 0.5 },
  { x: 70, y: 50, r: 10, label: "Growth", type: "builder", delay: 0.6 },
  { x: 50, y: 72, r: 14, label: "Startup", type: "startup", delay: 0.8 },
  { x: 15, y: 75, r: 8, label: "Investor", type: "founder", delay: 1.2 },
  { x: 85, y: 75, r: 8, label: "Advisor", type: "cofounder", delay: 1.4 },
];

const networkEdges = [
  [0, 1], [0, 2], [0, 3], [0, 4], [5, 2], [5, 3], [5, 4], [1, 5], [5, 6], [5, 7],
];

const typeColors: Record<string, string> = {
  founder: "hsl(30, 100%, 61%)",
  cofounder: "hsl(46, 99%, 59%)",
  builder: "hsl(30, 60%, 70%)",
  startup: "hsl(30, 100%, 61%)",
};

function FunnelStat({ item, index, inView }: { item: typeof funnel[0]; index: number; inView: boolean }) {
  const count = useCountUp(item.value, inView);
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="flex items-center gap-4"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
        <Icon className={`w-5 h-5 ${item.color}`} />
      </div>
      <div>
        <div className="font-display text-2xl sm:text-3xl font-bold text-foreground">
          {count.toLocaleString()}{item.suffix}
        </div>
        <div className="text-sm text-muted-foreground">{item.label}</div>
      </div>
      {index < funnel.length - 1 && (
        <motion.div
          className="hidden sm:block ml-auto text-primary/40 text-xl"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ↓
        </motion.div>
      )}
    </motion.div>
  );
}

/* ───── network visualization ───── */
function EcosystemViz({ inView }: { inView: boolean }) {
  const [activeEdge, setActiveEdge] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => setActiveEdge((p) => (p + 1) % networkEdges.length), 1200);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <div className="relative w-full aspect-square max-w-[420px] mx-auto">
      {/* edges */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        {networkEdges.map(([from, to], i) => (
          <motion.line
            key={i}
            x1={networkNodes[from].x}
            y1={networkNodes[from].y}
            x2={networkNodes[to].x}
            y2={networkNodes[to].y}
            stroke="hsl(30, 100%, 61%)"
            strokeWidth="0.4"
            strokeDasharray="2 2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? {
              pathLength: 1,
              opacity: i === activeEdge ? 0.8 : 0.2,
            } : {}}
            transition={{ pathLength: { delay: 0.5 + i * 0.1, duration: 0.8 }, opacity: { duration: 0.4 } }}
          />
        ))}
      </svg>

      {/* nodes */}
      {networkNodes.map((node, i) => (
        <motion.div
          key={node.label}
          className="absolute flex items-center justify-center"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: `${node.r * 2}%`,
            height: `${node.r * 2}%`,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: node.delay + 0.3, type: "spring", stiffness: 200 }}
        >
          <motion.div
            className="w-full h-full rounded-full flex items-center justify-center border backdrop-blur-sm"
            style={{
              backgroundColor: `${typeColors[node.type]}15`,
              borderColor: `${typeColors[node.type]}40`,
            }}
            animate={inView ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[10px] sm:text-xs font-medium text-foreground whitespace-nowrap">
              {node.label}
            </span>
          </motion.div>
        </motion.div>
      ))}

      {/* active edge pulse */}
      {inView && (() => {
        const [from, to] = networkEdges[activeEdge];
        const mx = (networkNodes[from].x + networkNodes[to].x) / 2;
        const my = (networkNodes[from].y + networkNodes[to].y) / 2;
        return (
          <motion.div
            key={activeEdge}
            className="absolute w-3 h-3 rounded-full bg-primary"
            style={{ left: `${mx}%`, top: `${my}%`, transform: "translate(-50%, -50%)" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 2, 0], opacity: [0, 0.8, 0] }}
            transition={{ duration: 1.2 }}
          />
        );
      })()}
    </div>
  );
}

/* ───── main section ───── */
export function FomoScale() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 relative overflow-hidden">
      {/* bg glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* ── header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
            🚀 Network Scale
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            What Happens When{" "}
            <span className="gradient-text">100,000 Builders</span>{" "}
            Join ConnectX
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            When the right people gather in one place, companies start forming.
          </p>
        </motion.div>

        {/* ── main grid: funnel + viz ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto mb-20">
          {/* funnel */}
          <div className="space-y-6">
            {funnel.map((item, i) => (
              <FunnelStat key={item.label} item={item} index={i} inView={inView} />
            ))}
          </div>

          {/* viz — hidden on mobile, replaced by funnel stats */}
          <div className="hidden lg:block">
            <EcosystemViz inView={inView} />
          </div>
        </div>

        {/* ── explanation ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="max-w-2xl mx-auto text-center mb-20"
        >
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            When thousands of founders and builders join one network, something powerful happens.{" "}
            <span className="text-foreground font-medium">Ideas meet execution.</span>{" "}
            Founders meet co-founders. Builders find startups worth joining.{" "}
            <span className="text-foreground font-medium">New companies begin forming every day.</span>
          </p>
        </motion.div>

        {/* ── ecosystem expansion ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="text-center mb-12"
        >
          <h3 className="font-display text-2xl sm:text-3xl font-bold mb-3">
            And this is <span className="gradient-text">only the beginning.</span>
          </h3>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Once teams form, ConnectX expands the ecosystem. Startups connect with investors, advisors, and strategic partners — all within the same network.
          </p>
        </motion.div>

        <div className="flex justify-center gap-4 sm:gap-6 mb-20">
          {futureNodes.map((node, i) => (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.2 + i * 0.15, type: "spring" }}
              className="glass-card rounded-2xl p-4 sm:p-6 text-center hover:border-primary/20 transition-all duration-300 w-28 sm:w-36"
            >
              <span className="text-2xl sm:text-3xl mb-2 block">{node.emoji}</span>
              <span className="text-xs sm:text-sm font-medium text-foreground">{node.label}</span>
            </motion.div>
          ))}
        </div>

        {/* ── fomo close ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5 }}
          className="text-center"
        >
          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
            The next generation of startups{" "}
            <span className="gradient-text">will begin here.</span>
          </h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Join the network early and be part of the first wave of founders and builders.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary" asChild>
              <a href="https://forms.gle/ut7mQmX8XKrr56136" target="_blank" rel="noopener noreferrer">
                Join the Waitlist
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary" asChild>
              <a href="/app">
                <Play className="w-4 h-4 mr-2" />
                Explore the Playground
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
