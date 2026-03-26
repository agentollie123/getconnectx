import { motion } from "framer-motion";
import { Layers, Target, Rocket } from "lucide-react";

const points = [
  {
    icon: Layers,
    title: "Structured Matching",
    description: "Not random networking. ConnectX uses role-based, skill-based, and interest-based matching to surface the right people.",
  },
  {
    icon: Target,
    title: "Role-Based Discovery",
    description: "Whether you're a founder, co-founder, engineer, or operator — your feed shows only what's relevant to you.",
  },
  {
    icon: Rocket,
    title: "Startup-Focused",
    description: "This isn't LinkedIn. This isn't a job board. ConnectX is built exclusively for starting and joining startups.",
  },
];

export function EcosystemMatchmaking() {
  return (
    <section id="ecosystem" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 max-w-2xl mx-auto">
            Not LinkedIn. Not job boards.{" "}
            <span className="gradient-text">Not just co-founder matching.</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            ConnectX is built for one thing: helping people start startups with the right people.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card rounded-2xl p-6 text-center hover:border-primary/20 transition-all duration-300"
            >
              <div className="inline-flex w-14 h-14 rounded-xl bg-primary/10 items-center justify-center mb-4">
                <p.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
