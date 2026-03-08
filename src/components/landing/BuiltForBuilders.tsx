import { motion } from "framer-motion";
import { GraduationCap, Code2, Briefcase, Flame, Repeat } from "lucide-react";

const personas = [
  { icon: GraduationCap, label: "Students", description: "University builders exploring their first startup." },
  { icon: Code2, label: "Engineers", description: "Full-stack, ML, mobile — ready to build from day one." },
  { icon: Briefcase, label: "Startup Operators", description: "Growth, ops, BD — the engine behind every startup." },
  { icon: Flame, label: "Indie Hackers", description: "Solo builders looking for the right team to scale." },
  { icon: Repeat, label: "Second-time Founders", description: "Experienced founders starting their next venture." },
];

export function BuiltForBuilders() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Built for <span className="gradient-text">Builders Everywhere</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Whether you're a first-time founder or a seasoned operator, ConnectX is your launchpad.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {personas.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-xl p-5 text-center hover:border-primary/20 transition-all duration-300"
            >
              <div className="inline-flex w-12 h-12 rounded-xl bg-primary/10 items-center justify-center mb-3">
                <p.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-sm text-foreground mb-1">{p.label}</h3>
              <p className="text-xs text-muted-foreground">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
