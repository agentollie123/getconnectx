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
  { end: 90, title: "Startups fail", body: "Not just ideas — execution, market, and team matter." },
  { end: 23, title: "Fail due to team issues", body: "One of the most common breakdown points." },
  { end: 65, title: "Experience co-founder conflict", body: "Misalignment early can break everything." },
];

const insights = [
  {
    title: "Broken system",
    lines: ["Founders are looking for people.", "Talented people are looking for opportunities.", "But they don't meet."],
  },
  {
    title: "It's not a talent problem.\nIt's a connection problem.",
    lines: ["No simple system connects them early."],
    accent: true,
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
    <section className="py-24" style={{ background: "#0B0B0F" }}>
      <div className="container mx-auto px-4">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className="font-display font-bold max-w-2xl mx-auto"
            style={{ fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.2, color: "#FFFFFF" }}
          >
            The hardest part of building a startup{" "}
            <span style={{ color: "#FF8A3D" }}>isn't the idea — it's the people</span>
          </h2>
          <p className="mt-4 max-w-md mx-auto" style={{ fontSize: 16, color: "#A1A1AA", lineHeight: "24px" }}>
            Founders don't struggle to start.
            <br />
            They struggle to find the right people.
          </p>
        </motion.div>

        {/* Stats row */}
        <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-4">
          {stats.map((s, i) => (
            <Card key={s.title} delay={i * 0.08}>
              <p className="font-display font-bold mb-1" style={{ fontSize: 30, color: "#FF8A3D" }}>
                {s.value}
              </p>
              <p className="font-sans font-semibold mb-1.5" style={{ fontSize: 15, color: "#FFFFFF" }}>
                {s.title}
              </p>
              <p className="font-sans" style={{ fontSize: 13, color: "#8E8E93", lineHeight: "18px" }}>
                {s.body}
              </p>
            </Card>
          ))}
        </div>

        {/* Insight row */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {insights.map((ins, i) => (
            <Card key={i} delay={0.24 + i * 0.08} className={ins.accent ? "border-[#FF8A3D]/20" : ""}>
              <p
                className="font-sans font-semibold mb-2 whitespace-pre-line"
                style={{ fontSize: 16, color: ins.accent ? "#FF8A3D" : "#FFFFFF", lineHeight: "22px" }}
              >
                {ins.title}
              </p>
              {ins.lines.map((line, j) => (
                <p key={j} className="font-sans" style={{ fontSize: 13, color: "#A1A1AA", lineHeight: "19px" }}>
                  {line}
                </p>
              ))}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
