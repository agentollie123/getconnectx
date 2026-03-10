import { motion } from "framer-motion";
import { AlertTriangle, Users, Search, ArrowRight } from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    stat: "90%",
    label: "of startups fail due to team issues",
    description: "The #1 reason startups fail isn't the idea — it's the team.",
  },
  {
    icon: Users,
    stat: "Millions",
    label: "of builders want to join startups",
    description: "Engineers, designers, operators — eager to build, but can't find the right team.",
  },
  {
    icon: Search,
    stat: "73%",
    label: "of founders struggle to find co-founders",
    description: "The right co-founder can make or break your startup. Finding them is broken.",
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
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            The Global <span className="gradient-text">Founder Problem</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Starting a company is hard enough. Finding the right people to build it with shouldn't be.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {problems.map((p, i) => (
            <motion.div
              key={p.stat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <div className="inline-flex w-14 h-14 rounded-xl bg-destructive/10 items-center justify-center mb-4">
                <p.icon className="w-7 h-7 text-destructive" />
              </div>
              <div className="font-display text-4xl font-bold text-foreground mb-2">{p.stat}</div>
              <p className="text-sm font-semibold text-foreground mb-2">{p.label}</p>
              <p className="text-xs text-muted-foreground">{p.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <ArrowRight className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">ConnectX solves startup formation.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
