import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

function CountUp({ end, suffix = "%", duration = 1.2 }: { end: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
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

  return <span ref={ref}>{value}{suffix}</span>;
}

const stats = [
  { end: 90, title: "of startups fail", body: "Most don't fail because of ideas, but because of execution, market, and team challenges.", source: "CB Insights, Startup Genome" },
  { end: 23, title: "fail due to team issues", body: "Problems inside the team are one of the most common reasons startups break down.", source: "CB Insights" },
  { end: 65, title: "experience co-founder conflict", body: "Misalignment between founders is one of the biggest risks early on.", source: "Harvard Business School / Noam Wasserman" },
];

const insights = [
  {
    title: "Talent exists — access is broken",
    lines: ["Millions want to join startups.", "They don't know where to start."],
    source: "LinkedIn Talent Trends",
  },
  {
    title: "It's not a talent problem.\nIt's a connection problem.",
    lines: ["People exist.", "Opportunities exist.", "They don't meet."],
    accent: true,
  },
  {
    title: "Today, people rely on luck",
    lines: ["LinkedIn. Events. Networks.", "Fragmented. Slow. Random."],
  },
];

function Card({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      className={`rounded-2xl p-5 ${className}`}
      style={{ background: "#141414", border: "1px solid #1C1C1E" }}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
    >
      {children}
    </motion.div>
  );
}

export function FounderProblem() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold max-w-3xl mx-auto">
            <span className="block whitespace-nowrap" style={{ fontSize: "clamp(24px, 3.2vw, 40px)", lineHeight: 1.15, color: "#FFFFFF" }}>
              The hardest part of building a startup
            </span>
            <span className="block mt-1" style={{ fontSize: "clamp(24px, 3.2vw, 40px)", lineHeight: 1.15, color: "#FF8A3D" }}>
              isn't the idea — it's the people
            </span>
          </h2>
          <p className="mt-5 max-w-lg mx-auto" style={{ fontSize: 16, color: "#8E8E93", lineHeight: "24px" }}>
            Founders don't struggle to start. They struggle to find{" "}
            <span style={{ color: "#FFFFFF", fontWeight: 500 }}>the right people</span>.
          </p>
        </motion.div>

        {/* Stats row */}
        <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-4">
          {stats.map((s, i) => (
            <Card key={s.title} delay={i * 0.08}>
              <p className="font-display font-bold mb-1" style={{ fontSize: 30, color: "#FF8A3D" }}>
                <CountUp end={s.end} />
              </p>
              <p className="font-sans font-semibold mb-1.5" style={{ fontSize: 15, color: "#FFFFFF" }}>
                {s.title}
              </p>
              <p className="font-sans" style={{ fontSize: 13, color: "#8E8E93", lineHeight: "18px" }}>
                {s.body}
              </p>
              {s.source && (
                <p className="font-sans mt-2" style={{ fontSize: 10, color: "#5A5A5E", fontStyle: "italic" }}>
                  Source: {s.source}
                </p>
              )}
            </Card>
          ))}
        </div>

        {/* Insight row — 3 cards */}
        <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {insights.map((ins, i) => (
            <Card key={i} delay={0.24 + i * 0.08} className={ins.accent ? "border-[#FF8A3D]/20" : ""}>
              <p
                className="font-sans font-semibold mb-2 whitespace-pre-line"
                style={{ fontSize: 15, color: ins.accent ? "#FF8A3D" : "#FFFFFF", lineHeight: "21px" }}
              >
                {ins.title}
              </p>
              {ins.lines.map((line, j) => (
                <p key={j} className="font-sans" style={{ fontSize: 13, color: "#A1A1AA", lineHeight: "19px" }}>
                  {line}
                </p>
              ))}
              {ins.source && (
                <p className="font-sans mt-2" style={{ fontSize: 10, color: "#5A5A5E", fontStyle: "italic" }}>
                  Source: {ins.source}
                </p>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
