import { motion } from "framer-motion";
import { UserPlus, Users, TrendingUp, Handshake, Lightbulb, Badge as BadgeIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ecosystem = [
  {
    icon: UserPlus,
    title: "Founder ↔ Co-Founder",
    description: "Find a co-founder who complements your skills and shares your vision.",
    status: "live" as const,
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: Users,
    title: "Founder ↔ Early Team",
    description: "Discover engineers, designers, and operators eager to join startups.",
    status: "live" as const,
    gradient: "from-accent/20 to-accent/5",
  },
  {
    icon: TrendingUp,
    title: "Founder ↔ Investor",
    description: "Get discovered by investors looking for promising founding teams.",
    status: "soon" as const,
    gradient: "from-muted to-muted/50",
  },
  {
    icon: Handshake,
    title: "Founder ↔ Advisors & Partners",
    description: "Connect with strategic partners and experienced advisors.",
    status: "soon" as const,
    gradient: "from-muted to-muted/50",
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
            Startup Ecosystem
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Ecosystem <span className="gradient-text">Matchmaking</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            ConnectX connects every node in the startup lifecycle — from co-founder discovery to investor intros.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {ecosystem.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card rounded-2xl p-6 bg-gradient-to-b ${item.gradient} hover:border-primary/20 transition-all duration-300 relative`}
            >
              <Badge
                variant={item.status === "live" ? "default" : "outline"}
                className={`absolute top-4 right-4 text-[10px] ${item.status === "live" ? "bg-primary text-primary-foreground" : "border-primary/30 text-primary"}`}
              >
                {item.status === "live" ? "Live" : "Coming Soon"}
              </Badge>
              <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center mb-4 text-primary">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
