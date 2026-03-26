import { motion } from "framer-motion";
import { AlertTriangle, Users, Search, TrendingDown } from "lucide-react";

const stats = [
  {
    icon: AlertTriangle,
    stat: "90%",
    label: "of startups fail due to team issues",
    description: "The #1 reason startups fail isn't product — it's the wrong team.",
  },
  {
    icon: Search,
    stat: "73%",
    label: "of founders struggle to find co-founders",
    description: "Most founders spend months searching with no structured way to connect.",
  },
  {
    icon: Users,
    stat: "Millions",
    label: "of builders want to join startups",
    description: "Talented engineers, designers, and operators are looking for the right startup.",
  },
  {
    icon: TrendingDown,
    stat: "65%",
    label: "of laid-off workers want to start something new",
    description: "A rising wave of professionals ready to build — but they don't know where to start.",
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
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 max-w-2xl mx-auto leading-tight">
            The hardest part of building a startup{" "}
            <span className="gradient-text">isn't the idea — it's the people</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Great startups begin with great teams. But finding the right people has always been broken.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((s, i) => (
            <motion.div
              key={s.stat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
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
      </div>
    </section>
  );
}
