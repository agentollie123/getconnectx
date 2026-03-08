import { motion } from "framer-motion";
import { Quote, ArrowUpRight } from "lucide-react";

const stories = [
  {
    company: "PayFlow",
    type: "FinTech Startup",
    location: "Singapore",
    story: "Our founder met their CTO on ConnectX. Within 3 months they built an MVP and raised a pre-seed round.",
    founders: "2 co-founders matched",
    result: "Pre-seed funded",
    color: "primary",
  },
  {
    company: "DataLens AI",
    type: "AI SaaS",
    location: "Jakarta",
    story: "A team of 4 formed entirely through ConnectX — founder, engineer, designer, and growth lead. Now serving 50+ enterprise clients.",
    founders: "4-person founding team",
    result: "50+ enterprise clients",
    color: "accent",
  },
  {
    company: "GreenTrace",
    type: "Climate Tech",
    location: "Bangalore",
    story: "Solo founder found a technical co-founder and advisor through ConnectX. Accepted into a top accelerator within 6 months.",
    founders: "Co-founder + Advisor matched",
    result: "Accelerator accepted",
    color: "primary",
  },
];

export function SuccessStories() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Startups Born on <span className="gradient-text">ConnectX</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Real teams. Real companies. Built through ConnectX matchmaking.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {stories.map((s, i) => (
            <motion.div
              key={s.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card rounded-2xl p-6 hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground">{s.company}</h3>
                  <p className="text-xs text-muted-foreground">{s.type} · {s.location}</p>
                </div>
                <Quote className="w-5 h-5 text-primary/30 flex-shrink-0" />
              </div>

              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{s.story}</p>

              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-foreground font-medium">{s.founders}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="text-foreground font-medium">{s.result}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
