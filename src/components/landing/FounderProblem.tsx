import { motion } from "framer-motion";
import { AlertTriangle, Users, Search, TrendingDown, BarChart3, ShieldAlert } from "lucide-react";

const stats = [
  {
    icon: AlertTriangle,
    stat: "90%",
    label: "of startups fail because of the team",
    description: "Not the idea. The team.",
  },
  {
    icon: Search,
    stat: "73%",
    label: "of founders struggle to find a co-founder",
    description: "Without the right partner, execution slows down.",
  },
  {
    icon: Users,
    stat: "Millions",
    label: "want to join startups — but don't know where to go",
    description: "Talent exists. Access doesn't.",
  },
  {
    icon: TrendingDown,
    stat: "65%",
    label: "of laid-off professionals want to start something new",
    description: "But don't have the right people to start with.",
  },
  {
    icon: BarChart3,
    stat: "13%",
    label: "actually start a startup",
    description: "Because they never find the right team.",
  },
  {
    icon: ShieldAlert,
    stat: "Broken",
    label: "Startup formation is still broken",
    description: "There's no simple way to find the right people at the right time.",
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
              key={s.stat + s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-2xl p-6 text-center hover:border-primary/20 transition-all duration-300"
            >
              <div className="inline-flex w-12 h-12 rounded-xl bg-primary/10 items-center justify-center mb-4">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="font-display text-3xl font-bold text-foreground mb-1">{s.stat}</div>
              <p className="text-sm font-medium text-foreground mb-2">{s.label}</p>
              <p className="text-xs text-muted-foreground">{s.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Transition */}
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
