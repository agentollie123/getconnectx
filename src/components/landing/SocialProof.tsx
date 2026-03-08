import { motion } from "framer-motion";
import { Users, Link2, Rocket, Globe } from "lucide-react";

const stats = [
  { icon: Users, value: "12,000+", label: "Builders" },
  { icon: Link2, value: "80,000+", label: "Connections Made" },
  { icon: Rocket, value: "300+", label: "Startups Forming" },
  { icon: Globe, value: "8+", label: "Cities" },
];

export function SocialProof() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Community stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Community <span className="gradient-text">Momentum</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mb-20">
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
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {["Tech in Asia", "Bisnis.com", "e27", "DealStreetAsia"].map((name) => (
              <div key={name} className="glass-card px-6 py-3 rounded-lg">
                <span className="font-display font-semibold text-muted-foreground text-lg">{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Powered By */}
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">Powered By</p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {["Google Cloud", "NVIDIA", "Alibaba Cloud"].map((name) => (
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
