import { motion } from "framer-motion";
import { Users, Link2, Globe } from "lucide-react";

const stats = [
  { icon: Users, value: "10,000+", label: "Builders" },
  { icon: Link2, value: "150,000+", label: "Connections" },
  { icon: Globe, value: "Growing", label: "Across Southeast Asia" },
];

export function SocialProof() {
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
            Builders are already connecting on{" "}
            <span className="gradient-text">ConnectX</span>
          </h2>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-20">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex w-12 h-12 rounded-xl bg-primary/10 items-center justify-center mb-3">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="font-display text-3xl font-bold text-foreground mb-1">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* As Seen In */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">As Seen In</p>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {["Tech in Asia", "Bisnis.com"].map((name) => (
              <div key={name} className="glass-card px-6 py-3 rounded-lg">
                <span className="font-display font-semibold text-muted-foreground text-lg">{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Powered By */}
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">Powered By</p>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {["Google", "NVIDIA", "Alibaba Cloud"].map((name) => (
              <div key={name} className="glass-card px-6 py-3 rounded-lg">
                <span className="font-display font-semibold text-muted-foreground text-lg">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
