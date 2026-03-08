import { motion } from "framer-motion";
import { Search, UserPlus, Users, Rocket, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const steps = [
  { icon: Search, step: "01", title: "Discover Builders", description: "Browse thousands of founders, engineers, designers, and operators." },
  { icon: UserPlus, step: "02", title: "Find Your Co-Founder", description: "Match with someone who complements your skills and shares your vision." },
  { icon: Users, step: "03", title: "Assemble Your Team", description: "Recruit your founding team — from first engineer to growth lead." },
  { icon: Rocket, step: "04", title: "Launch Your Startup", description: "Go from idea to MVP with the right people by your side." },
  { icon: TrendingUp, step: "05", title: "Meet Investors", description: "Get discovered by investors seeking promising founding teams.", comingSoon: true },
];

export function StartupPipeline() {
  return (
    <section id="how-it-works" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            How Startups Form on <span className="gradient-text">ConnectX</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            ConnectX sits at the beginning of startup creation — where great teams come together.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-6 mb-8 last:mb-0"
            >
              {/* Timeline */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.comingSoon ? "bg-muted" : "bg-primary/10 border border-primary/20"}`}>
                  <s.icon className={`w-5 h-5 ${s.comingSoon ? "text-muted-foreground" : "text-primary"}`} />
                </div>
                {i < steps.length - 1 && <div className="w-px h-full bg-border mt-2 min-h-[24px]" />}
              </div>

              {/* Content */}
              <div className="pb-8">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-primary">Step {s.step}</span>
                  {s.comingSoon && (
                    <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">Coming Soon</Badge>
                  )}
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
