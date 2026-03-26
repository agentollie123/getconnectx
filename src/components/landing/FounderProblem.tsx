import { motion, useInView } from "framer-motion";
import { AlertTriangle, Users, Handshake, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BrokenToConnected } from "./BrokenToConnected";

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

        {/* Broken → Connected Animation */}
        <BrokenToConnected />
      </div>
    </section>
  );
}
