import { motion, useInView } from "framer-motion";
import { AlertTriangle, Users, Search, Handshake, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function CountUp({ end, suffix = "", prefix = "", duration = 1.5 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);

  return <span ref={ref}>{prefix}{value}{suffix}</span>;
}

const stats = [
  {
    icon: AlertTriangle,
    numValue: 90,
    prefix: "",
    suffix: "%",
    displayText: null,
    label: "of startups fail",
    description: "Most don't fail because of ideas, but because of execution, market, and team challenges.",
    source: "CB Insights, Startup Genome",
  },
  {
    icon: Users,
    numValue: 23,
    prefix: "",
    suffix: "%",
    displayText: null,
    label: "fail due to team issues",
    description: "Problems inside the team are one of the most common reasons startups break down.",
    source: "CB Insights",
  },
  {
    icon: Handshake,
    numValue: 65,
    prefix: "",
    suffix: "%",
    displayText: "Up to 65%",
    label: "experience co-founder conflict",
    description: "Misalignment between founders is one of the biggest risks early on.",
    source: "Harvard Business School / Noam Wasserman",
  },
  {
    icon: Globe,
    numValue: null,
    prefix: "",
    suffix: "",
    displayText: "Broken",
    label: "Talent exists, but access is broken",
    description: "Millions of professionals want to work in startups, but don't know how to find the right founders or opportunities.",
    source: "LinkedIn Talent Trends",
    highlight: true,
  },
];

const currentReality = ["LinkedIn", "Events", "Personal networks"];

export function FounderProblem() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 max-w-2xl mx-auto leading-tight">
            The hardest part of building a startup{" "}
            <span className="gradient-text">isn't the idea, it's the people</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Founders don't struggle to start.<br />
            They struggle to find the right people to build with.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`glass-card rounded-2xl p-6 text-left hover:border-primary/20 transition-all duration-300 ${
                s.highlight ? "border-primary/30 bg-primary/5" : ""
              }`}
            >
              <div className="inline-flex w-10 h-10 rounded-xl bg-primary/10 items-center justify-center mb-4">
                <s.icon className="w-4 h-4 text-primary" />
              </div>
              <div className="font-display text-3xl sm:text-4xl font-bold text-primary mb-2">
                {s.numValue !== null ? (
                  <CountUp end={s.numValue} suffix={s.suffix} prefix={s.prefix} />
                ) : (
                  s.displayText
                )}
              </div>
              <p className="text-sm font-semibold text-foreground mb-1.5">{s.label}</p>
              <p className="text-xs text-muted-foreground leading-relaxed mb-2">{s.description}</p>
              {s.source && (
                <p className="text-[10px] text-muted-foreground/60 italic">Source: {s.source}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Core Insight + Current Reality — unified card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto mb-20"
        >
          <div className="relative rounded-3xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden">
            {/* Subtle gradient accent at top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            
            <div className="px-8 sm:px-12 py-10 sm:py-14 text-center">
              {/* Core Insight */}
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2 leading-tight">
                It's not a talent problem.
              </h3>
              <h3 className="font-display text-2xl sm:text-3xl font-bold gradient-text mb-6 leading-tight">
                It's a connection problem.
              </h3>
              
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md mx-auto mb-10">
                Founders are looking for people. Talented people are looking for opportunities. But there is no simple system to connect them early.
              </p>

              {/* Divider */}
              <div className="w-12 h-px bg-border mx-auto mb-8" />

              {/* Current Reality */}
              <p className="text-xs uppercase tracking-widest text-muted-foreground/70 font-medium mb-4">
                Today, people rely on
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-5">
                {currentReality.map((item, i) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="px-5 py-2 rounded-full border border-border/60 text-sm text-muted-foreground bg-background/60 hover:border-primary/30 transition-colors duration-200"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground/60">
                These are fragmented, slow, and often based on luck.
              </p>
            </div>

            {/* Subtle gradient accent at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          </div>
        </motion.div>

        {/* Transition — bold closing statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="font-display text-2xl sm:text-4xl font-bold gradient-text leading-tight">
            Building a startup shouldn't depend on luck.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
