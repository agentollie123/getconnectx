import { motion } from "framer-motion";
import { Lightbulb, UserPlus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ideas = [
  {
    title: "AI Supply Chain Platform",
    lookingFor: "Technical Co-Founder",
    tags: ["AI/ML", "Logistics", "B2B SaaS"],
    stage: "Idea Stage",
    founder: "Sara A.",
  },
  {
    title: "Climate Carbon Tracking",
    lookingFor: "Product Builder",
    tags: ["Climate Tech", "Data", "SaaS"],
    stage: "MVP",
    founder: "Marco S.",
  },
  {
    title: "FinTech Payment Infrastructure",
    lookingFor: "Backend Engineer",
    tags: ["FinTech", "Payments", "API"],
    stage: "Pre-revenue",
    founder: "Ardi W.",
  },
  {
    title: "AI-Powered Tutoring Marketplace",
    lookingFor: "Growth Marketer",
    tags: ["EdTech", "AI", "Marketplace"],
    stage: "Idea Stage",
    founder: "Mei Lin C.",
  },
];

export function IdeaMarketplace() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-4">
            <Lightbulb className="w-3.5 h-3.5" />
            Startup Ideas
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Startup Ideas <span className="gradient-text-accent">Looking for Founders</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Browse startup ideas actively seeking co-founders and early team members. Your next venture could be here.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {ideas.map((idea, i) => (
            <motion.div
              key={idea.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-5 hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                <Lightbulb className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{idea.title}</h3>
              <div className="flex items-center gap-1.5 mb-3">
                <UserPlus className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs text-primary font-medium">{idea.lookingFor}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {idea.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{idea.stage}</span>
                <span>by {idea.founder}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Button asChild variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
            <a href="/app">
              Discover Startups in the App
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
