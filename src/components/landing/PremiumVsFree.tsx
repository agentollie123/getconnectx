import { motion } from "framer-motion";
import { Check, X, ArrowRight, Crown, Rocket, Eye, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: Rocket,
    title: "Better Matches",
    desc: "See higher-quality, more relevant people",
  },
  {
    icon: Eye,
    title: "Get Seen First",
    desc: "Appear earlier to founders and startups",
  },
  {
    icon: MessageCircle,
    title: "Don't Miss Opportunities",
    desc: "See who wants to connect with you",
  },
];

const freeItems = [
  "Explore profiles",
  "Basic matching",
  "Limited visibility",
];

const premiumItems = [
  "See your connects",
  "Higher match quality",
  "Priority visibility",
  "Faster connections",
];

export function PremiumVsFree() {
  return (
    <section id="premium" className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "hsl(var(--primary))" }}
      />

      <div className="container relative mx-auto px-4">
        {/* Hook */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-5">
            <Crown className="w-3 h-3" />
            Premium
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold mb-4 max-w-2xl mx-auto leading-tight">
            Find the Right People{" "}
            <span className="gradient-text">Faster</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base">
            You're already exploring. Now increase your chances of building the right startup.
          </p>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-14"
        >
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-card/60 border border-border/40 backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <b.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground text-sm mb-1">{b.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Differentiator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-2 mb-14"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <p className="text-sm font-medium text-primary">
            Premium users are matched earlier with higher-fit profiles
          </p>
          <Sparkles className="w-4 h-4 text-primary" />
        </motion.div>

        {/* Comparison */}
        <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto mb-14">
          {/* Free */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl p-7 bg-card/40 border border-border/30 backdrop-blur-sm"
          >
            <h3 className="font-display font-bold text-xl text-foreground mb-1">Free</h3>
            <p className="text-xs text-muted-foreground mb-5">Start exploring the network</p>
            <div className="space-y-3">
              {freeItems.map((f) => (
                <div key={f} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-muted/60 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Premium */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl p-7 border border-primary/30 bg-card"
            style={{
              boxShadow: "0 0 60px -15px hsl(var(--primary) / 0.2)",
            }}
          >
            <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-1">
              <Crown className="w-3 h-3" />
              Recommended
            </div>
            <h3 className="font-display font-bold text-xl text-foreground mb-1">Premium</h3>
            <p className="text-xs text-primary mb-5">Find the right people, faster</p>
            <div className="space-y-3">
              {premiumItems.map((f) => (
                <div key={f} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm text-foreground font-medium">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary px-8 h-12 text-sm font-semibold rounded-2xl"
            asChild
          >
            <a href="/app/premium">
              Upgrade to Premium
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
          <p className="text-xs text-muted-foreground mt-3">
            Start finding better matches today
          </p>
          <p className="text-sm text-muted-foreground mt-8 italic opacity-70">
            The best teams are already forming.
          </p>

          {/* Social proof */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xs text-primary/80 font-medium mt-4"
          >
            ⚡ Founders who upgrade get matches 2x faster
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
