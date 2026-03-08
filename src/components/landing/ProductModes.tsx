import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, UserPlus, Handshake, TrendingUp, Clock } from "lucide-react";

const modes = [
  {
    icon: UserPlus,
    title: "Founder Looking for Co-Founder",
    description: "Find a co-founder who complements your skills and shares your startup vision.",
    features: [
      "Skill compatibility matching",
      "Industry filters",
      "Startup stage alignment",
      "Commitment level matching",
    ],
    cta: "Find Co-Founder",
    gradient: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: Users,
    title: "Founder Looking for Team",
    description: "Discover engineers, designers, operators, and early believers interested in joining startups.",
    features: [
      "Find your first engineer",
      "Discover startup builders",
      "Build your founding team",
    ],
    cta: "Find Early Team",
    gradient: "from-accent/20 to-accent/5",
    iconColor: "text-accent",
  },
  {
    icon: Handshake,
    title: "Coming Soon",
    description: "More ways to connect are on the way.",
    subCards: [
      { label: "Founder ↔ Investor", icon: TrendingUp },
      { label: "Founder ↔ Strategic Partner", icon: Handshake },
    ],
    gradient: "from-muted to-muted/50",
    iconColor: "text-muted-foreground",
  },
];

export function ProductModes() {
  return (
    <section id="modes" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Choose Your <span className="gradient-text">Mode</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Whether you're looking for a co-founder or building your first team, ConnectX has you covered.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {modes.map((mode, i) => (
            <motion.div
              key={mode.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`glass-card rounded-2xl p-6 bg-gradient-to-b ${mode.gradient} hover:border-primary/20 transition-all duration-300`}
            >
              <div className={`w-12 h-12 rounded-xl bg-card flex items-center justify-center mb-4 ${mode.iconColor}`}>
                <mode.icon className="w-6 h-6" />
              </div>

              <h3 className="font-display font-semibold text-xl mb-2 text-foreground">{mode.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{mode.description}</p>

              {mode.features && (
                <ul className="space-y-2 mb-6">
                  {mode.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-secondary-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              {mode.subCards && (
                <div className="space-y-3 mb-6">
                  {mode.subCards.map((sc) => (
                    <div key={sc.label} className="flex items-center justify-between p-3 rounded-lg bg-card/80 border border-border">
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <sc.icon className="w-4 h-4 text-muted-foreground" />
                        {sc.label}
                      </div>
                      <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                        Coming Soon
                      </Badge>
                    </div>
                  ))}
                </div>
              )}

              {mode.cta && (
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  {mode.cta}
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
