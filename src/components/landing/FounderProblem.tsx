import { motion } from "framer-motion";
import { Code, Palette, Box, TrendingUp, ArrowRight, BarChart3, Building2, Globe } from "lucide-react";

const earlyTeamNeeds = [
  { icon: Code, label: "Engineers" },
  { icon: Palette, label: "Designers" },
  { icon: Box, label: "Product Builders" },
  { icon: TrendingUp, label: "Growth Operators" },
];

const dataPoints = [
  {
    icon: BarChart3,
    stat: "65%",
    label: "of laid-off workers want to start a business",
  },
  {
    icon: Building2,
    stat: "13%+",
    label: "of laid-off professionals eventually start companies",
  },
  {
    icon: Globe,
    stat: "0",
    label: "global networks connecting them — until now",
  },
];

export function FounderProblem() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Early Team Pain Point */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium mb-6">
            Early Team Pain Point
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 max-w-2xl mx-auto leading-tight">
            Startups don't just need co-founders.{" "}
            <span className="gradient-text">They need early believers.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center mb-10"
        >
          <p className="text-muted-foreground mb-6">Early-stage startups need:</p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {earlyTeamNeeds.map((need, i) => (
              <motion.div
                key={need.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl px-4 py-3 flex items-center gap-2"
              >
                <need.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">{need.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-xl mx-auto mb-20"
        >
          <div className="glass-card rounded-2xl p-6 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              But talented builders struggle to find early-stage startups worth joining.
            </p>
            <p className="text-sm font-semibold text-foreground mb-3">This creates a massive gap between:</p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <span className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium">Founders with ideas</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground hidden sm:block" />
              <span className="px-3 py-1.5 rounded-lg bg-accent/20 text-accent-foreground text-sm font-medium">Builders looking for opportunities</span>
            </div>
          </div>
        </motion.div>

        {/* Global Shift */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
            Global Shift Toward Entrepreneurship
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 max-w-2xl mx-auto">
            More people want to build startups{" "}
            <span className="gradient-text">than ever before.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
          {dataPoints.map((d, i) => (
            <motion.div
              key={d.stat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <div className="inline-flex w-12 h-12 rounded-xl bg-primary/10 items-center justify-center mb-4">
                <d.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="font-display text-3xl font-bold text-foreground mb-2">{d.stat}</div>
              <p className="text-sm text-muted-foreground">{d.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-card inline-block rounded-xl px-6 py-4 max-w-lg">
            <p className="text-sm text-muted-foreground mb-2">
              The next generation of builders doesn't just want jobs.{" "}
              <span className="text-foreground font-semibold">They want to build companies.</span>
            </p>
            <p className="text-sm text-primary font-semibold">
              ConnectX is the global network connecting them.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
