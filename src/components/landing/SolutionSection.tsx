import { motion } from "framer-motion";
import { User, Building2, Search, UserPlus, Users, Rocket, ArrowRight } from "lucide-react";

const builderRoles = [
  { icon: User, label: "Founder" },
  { icon: Users, label: "Co-Founder" },
  { icon: Search, label: "Team Member" },
];

const startupNeeds = [
  { icon: UserPlus, label: "Hiring" },
  { icon: Users, label: "Building Team" },
];

export function SolutionSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Where Builders and Startups{" "}
            <span className="gradient-text">Find Each Other</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            ConnectX helps you find the right people based on what you want to build not random connections.
          </p>
        </motion.div>

        {/* Visual matching diagram */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-4 items-center">
            {/* Builder side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">Builders</h3>
              </div>
              <div className="space-y-3">
                {builderRoles.map((r, i) => (
                  <motion.div
                    key={r.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10"
                  >
                    <r.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">{r.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Connection visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-2 py-4"
            >
              <div className="hidden md:flex flex-col items-center gap-1">
                <motion.div
                  className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Rocket className="w-4 h-4 text-primary" />
                </motion.div>
                <div className="w-px h-8 bg-primary/20" />
                <ArrowRight className="w-4 h-4 text-primary/40 rotate-90 md:rotate-0" />
                <div className="w-px h-8 bg-primary/20" />
              </div>
              <p className="text-[10px] text-muted-foreground font-medium text-center max-w-[100px]">
                Smart Matching
              </p>
            </motion.div>

            {/* Startup side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-accent-foreground" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">Startups</h3>
              </div>
              <div className="space-y-3">
                {startupNeeds.map((r, i) => (
                  <motion.div
                    key={r.label}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-accent/5 border border-accent/10"
                  >
                    <r.icon className="w-4 h-4 text-accent-foreground" />
                    <span className="text-sm font-medium text-foreground">{r.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Micro copy */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 mt-12"
          >
            {[
              "Choose who you are",
              "Define what you need",
              "Connect with the right people",
            ].map((text, i) => (
              <div key={text} className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-sm text-muted-foreground">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
