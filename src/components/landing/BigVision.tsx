import { motion } from "framer-motion";
import { Eye, Sparkles, TrendingUp, Zap } from "lucide-react";

const benefits = [
  {
    icon: Eye,
    title: "See Who Wants to Connect",
    description: "Unlock your Connects tab to see full profiles of people who swiped right on you.",
  },
  {
    icon: Sparkles,
    title: "Better Matches",
    description: "Premium members get access to higher match quality and advanced filters.",
  },
  {
    icon: TrendingUp,
    title: "Higher Visibility",
    description: "Your profile gets seen by more builders and startups in the ecosystem.",
  },
  {
    icon: Zap,
    title: "Boost Your Profile",
    description: "Appear earlier in feeds and get highlighted to stand out from the crowd.",
  },
];

export function BigVision() {
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
            Get to the right people <span className="gradient-text">faster</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            ConnectX Premium helps you connect with better matches and stand out in the ecosystem.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 text-center hover:border-primary/20 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <div className="inline-flex w-12 h-12 rounded-xl bg-primary/10 items-center justify-center mb-4">
                <b.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-sm text-foreground mb-2">{b.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{b.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
