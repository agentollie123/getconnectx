import { motion, useInView } from "framer-motion";
import { AlertTriangle, Handshake, Hammer, TrendingDown, Rocket, Globe, ArrowRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

function useCountUp(target: number, inView: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return count;
}

const problems = [
  {
    icon: AlertTriangle,
    stat: 90,
    suffix: "%",
    label: "Startups fail because of team issues",
    description: "The #1 reason startups fail isn't the idea — it's the team.",
    accent: "destructive" as const,
  },
  {
    icon: Handshake,
    stat: 73,
    suffix: "%",
    label: "Founders struggle to find co-founders",
    description: "The right co-founder can make or break your startup. But finding one today relies on luck, personal networks, or random introductions.",
    accent: "primary" as const,
  },
  {
    icon: Hammer,
    stat: 0,
    suffix: "",
    textStat: "Millions",
    label: "Builders want to join startups",
    description: "Engineers, designers, and operators want to build startups. But they don't know where to find the right founders or ideas.",
    accent: "primary" as const,
  },
  {
    icon: TrendingDown,
    stat: 65,
    suffix: "%",
    label: "Laid-off workers want to start businesses",
    description: "Nearly 65% of laid-off professionals say they want to start a company instead of returning to traditional jobs.",
    accent: "muted-foreground" as const,
  },
  {
    icon: Rocket,
    stat: 13,
    suffix: "%",
    label: "Laid-off professionals eventually start companies",
    description: "More professionals are choosing entrepreneurship. But many struggle to find the right co-founders and early teams.",
    accent: "primary" as const,
  },
  {
    icon: Globe,
    stat: 0,
    suffix: "",
    textStat: "The Missing Platform",
    label: "Startup formation is broken",
    description: "Today there is no global platform designed to help founders build startup teams. People rely on LinkedIn, events, or chance meetings.",
    accent: "featured" as const,
  },
];

function StatCard({
  problem,
  index,
  inView,
}: {
  problem: (typeof problems)[0];
  index: number;
  inView: boolean;
}) {
  const count = useCountUp(problem.stat, inView);
  const isFeatured = problem.accent === "featured";

  const accentColorMap: Record<string, string> = {
    destructive: "bg-destructive/10 text-destructive",
    primary: "bg-primary/10 text-primary",
    "muted-foreground": "bg-muted text-muted-foreground",
    featured: "bg-primary/15 text-primary",
  };

  const statColorMap: Record<string, string> = {
    destructive: "text-destructive",
    primary: "text-primary",
    "muted-foreground": "text-muted-foreground",
    featured: "text-primary",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`rounded-2xl p-6 sm:p-8 flex flex-col gap-4 transition-all duration-300 ${
        isFeatured
          ? "glass-card gradient-border col-span-1 md:col-span-3 lg:col-span-1 relative overflow-hidden"
          : "glass-card hover:border-primary/20"
      }`}
    >
      {isFeatured && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
      )}

      <div className="relative z-10">
        <div
          className={`inline-flex w-11 h-11 rounded-xl items-center justify-center mb-3 ${accentColorMap[problem.accent]}`}
        >
          <problem.icon className="w-5 h-5" />
        </div>

        <div className={`font-display text-4xl sm:text-5xl font-bold mb-2 ${statColorMap[problem.accent]}`}>
          {problem.textStat ? (
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              {problem.textStat}
            </motion.span>
          ) : (
            <>
              {count}
              {problem.suffix}
            </>
          )}
        </div>

        <h3 className="font-display text-base sm:text-lg font-semibold text-foreground mb-2">
          {problem.label}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {problem.description}
        </p>
      </div>
    </motion.div>
  );
}

export function FounderProblem() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 sm:py-28 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 sm:mb-20"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            The Global <span className="gradient-text">Founder Problem</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            Starting a company is hard enough.
            <br />
            Finding the right people to build it with shouldn't be.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto mb-14 sm:mb-20">
          {problems.map((p, i) => (
            <StatCard key={p.label} problem={p} index={i} inView={inView} />
          ))}
        </div>

        {/* Transition CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <p className="font-display text-lg sm:text-xl font-semibold text-foreground">
            This is exactly the problem{" "}
            <span className="gradient-text">ConnectX</span> is solving.
          </p>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
            asChild
          >
            <a href="#ecosystem">
              Explore the Platform
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
