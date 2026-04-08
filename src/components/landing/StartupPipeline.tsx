import { motion } from "framer-motion";
import { ToggleLeft, Settings, Compass, Handshake } from "lucide-react";

const steps = [
  {
    icon: ToggleLeft,
    step: "01",
    title: "Choose How You Use ConnectX",
    description: "Are you a Builder looking for opportunities, or a Startup looking for people? Pick your side.",
  },
  {
    icon: Settings,
    step: "02",
    title: "Define Your Role or What You're Looking For",
    description: "Builders choose their role as a founder, co-founder, or team member. Startups define the roles they're hiring for.",
  },
  {
    icon: Compass,
    step: "03",
    title: "Discover Relevant People or Startups",
    description: "Browse curated profiles matched to your skills, industry, and goals. No noise only relevant connections.",
  },
  {
    icon: Handshake,
    step: "04",
    title: "Connect and Start Building",
    description: "When both sides are interested, you're connected. Start conversations, form teams, and build your startup.",
  },
];

export function StartupPipeline() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Four simple steps from sign-up to building your startup.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-6 mb-8 last:mb-0"
            >
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px h-full bg-border mt-2 min-h-[24px]" />
                )}
              </div>
              <div className="pb-8">
                <span className="text-xs font-bold text-primary mb-1 block">Step {s.step}</span>
                <h3 className="font-display font-semibold text-lg text-foreground mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
