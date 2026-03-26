import { motion } from "framer-motion";
import { User, Building2, Search, UserPlus, Users, Rocket, Briefcase, Zap } from "lucide-react";

const builderFeatures = [
  { icon: Search, text: "Find co-founders who complement your skills" },
  { icon: Rocket, text: "Join early-stage startups looking for talent" },
  { icon: Users, text: "Build your founding team from scratch" },
];

const startupFeatures = [
  { icon: UserPlus, text: "Find co-founders to lead with you" },
  { icon: Briefcase, text: "Hire your first engineers, designers & operators" },
  { icon: Zap, text: "Build faster with the right early team" },
];

export function BuiltForBuilders() {
  return (
    <section id="modes" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Built for <span className="gradient-text">Builders and Startups</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Two sides of the same ecosystem. One platform that connects them.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Builder column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 hover:border-primary/20 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-foreground">Builders</h3>
                <p className="text-xs text-muted-foreground">Founders, co-founders & team members</p>
              </div>
            </div>

            <div className="space-y-4">
              {builderFeatures.map((f, i) => (
                <motion.div
                  key={f.text}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <f.icon className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">{f.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Startup column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 hover:border-accent/20 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-foreground">Startups</h3>
                <p className="text-xs text-muted-foreground">Teams hiring & building</p>
              </div>
            </div>

            <div className="space-y-4">
              {startupFeatures.map((f, i) => (
                <motion.div
                  key={f.text}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <f.icon className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">{f.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
