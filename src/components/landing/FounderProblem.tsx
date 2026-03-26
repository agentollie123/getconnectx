import { motion, useInView } from "framer-motion";
import { AlertTriangle, Users, Search, TrendingDown, BarChart3, ShieldAlert } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function CountUp({ end, suffix = "", duration = 1.5 }: { end: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);

  return <span ref={ref}>{value}{suffix}</span>;
}

const stats = [
  {
    icon: AlertTriangle,
    numValue: 90,
    suffix: "%",
    displayText: null,
    label: "Startups fail because of team issues",
    description: "The #1 reason startups fail isn't the idea, it's the team.",
  },
  {
    icon: Search,
    numValue: 73,
    suffix: "%",
    displayText: null,
    label: "Founders struggle to find co-founders",
    description: "The right co-founder can make or break your startup. But finding one today relies on luck, personal networks, or random introductions.",
  },
  {
    icon: Users,
    numValue: null,
    suffix: "",
    displayText: "Millions",
    label: "Builders want to join startups",
    description: "Engineers, designers, and operators want to build startups. But they don't know where to find the right founders or ideas.",
  },
  {
    icon: TrendingDown,
    numValue: 65,
    suffix: "%",
    displayText: null,
    label: "Laid-off workers want to start businesses",
    description: "Nearly 65% of laid-off professionals say they want to start a company instead of returning to traditional jobs.",
  },
  {
    icon: BarChart3,
    numValue: 13,
    suffix: "%",
    displayText: null,
    label: "Laid-off professionals eventually start companies",
    description: "More professionals are choosing entrepreneurship. But many struggle to find the right co-founders and early teams.",
  },
  {
    icon: ShieldAlert,
    numValue: null,
    suffix: "",
    displayText: "The Missing Platform",
    label: "Startup formation is broken",
    description: "Today there is no global platform designed to help founders build startup teams. People rely on LinkedIn, events, or chance meetings.",
    highlight: true,
  },
];

export function FounderProblem() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 max-w-2xl mx-auto leading-tight">
            The hardest part of starting a startup{" "}
            <span className="gradient-text">isn't the idea — it's the people</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Most founders don't fail because of ideas. They fail because they can't find the right team.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
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
                  <CountUp end={s.numValue} suffix={s.suffix} />
                ) : (
                  s.displayText
                )}
              </div>
              <p className="text-sm font-semibold text-foreground mb-1.5">{s.label}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-lg text-muted-foreground mb-2">What if finding the right people was simple?</p>
          <p className="font-display text-2xl sm:text-3xl font-bold gradient-text">ConnectX makes it possible.</p>
        </motion.div>
      </div>
    </section>
  );
}
