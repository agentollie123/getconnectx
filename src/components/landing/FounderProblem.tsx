import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

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
    title: "Talent exists but access is broken",
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
      style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
    >
      {children}
    </motion.div>
  );
}

export function FounderProblem() {
  const { t } = useLanguage();
  const localizedStats = stats.map((s, i) => ({
    ...s,
    title: [t("of startups fail", "startup gagal"), t("fail due to team issues", "gagal karena masalah tim"), t("experience co-founder conflict", "mengalami konflik co-founder")][i],
    body: [
      t("Most don't fail because of ideas, but because of execution, market, and team challenges.", "Sebagian besar bukan gagal karena ide, tetapi karena eksekusi, pasar, dan tantangan tim."),
      t("Problems inside the team are one of the most common reasons startups break down.", "Masalah di dalam tim adalah salah satu alasan paling umum startup runtuh."),
      t("Misalignment between founders is one of the biggest risks early on.", "Ketidakselarasan antar founder adalah salah satu risiko terbesar di tahap awal."),
    ][i],
  }));
  const localizedInsights = insights.map((ins, i) => ({
    ...ins,
    title: [
      t("Talent exists but access is broken", "Talenta ada tetapi aksesnya minim."),
      t("It's not a talent problem.\nIt's a connection problem.", "Ini bukan masalah talenta.\nIni masalah koneksi."),
      t("Today, people rely on luck", "Mereka masih mengandalkan faktor keberuntungan"),
    ][i],
    lines: [
      [t("Millions want to join startups.", "Jutaan orang ingin bergabung dengan startup."), t("They don't know where to start.", "Mereka tidak tahu harus mulai dari mana.")],
      [t("People exist.", "Orangnya ada."), t("Opportunities exist.", "Peluangnya ada."), t("They don't meet.", "Mereka tidak bertemu.")],
      ["LinkedIn. Events. Networks.", t("Fragmented. Slow. Random.", "Terpecah. Lambat. Terlalu Acak.")],
    ][i],
  }));

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
              {t("The hardest part of building a startup", "Bagian tersulit membangun startup itu")}
            </span>
            <span className="block mt-1" style={{ fontSize: "clamp(24px, 3.2vw, 40px)", lineHeight: 1.15, color: "#FF8A3D" }}>
              {t("isn't the idea it's the people", "bukan soal idenya, tapi orangnya")}
            </span>
          </h2>
          <p className="mt-5 max-w-lg mx-auto" style={{ fontSize: 16, color: "#8E8E93", lineHeight: "24px" }}>
            {t("Founders don't struggle to start. They struggle to find", "Founder merasa kesulitan menemukan")}{" "}
            <span style={{ color: "#FFFFFF", fontWeight: 500 }}>{t("the right people", "orang yang tepat")}</span>.
          </p>
        </motion.div>

        {/* Stats row */}
        <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-4">
          {localizedStats.map((s, i) => (
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
          {localizedInsights.map((ins, i) => (
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
