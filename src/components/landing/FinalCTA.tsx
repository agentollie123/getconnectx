import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Play } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex w-16 h-16 rounded-2xl bg-primary/10 items-center justify-center mb-6">
            <Rocket className="w-8 h-8 text-primary" />
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold mb-6 max-w-2xl mx-auto leading-tight">
            Start Your Startup With the{" "}
            <span className="gradient-text">Right People</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto">
            Don't wait to find the right team. Join thousands of founders, engineers, and operators building on ConnectX.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Button size="lg" className="h-12 bg-primary text-primary-foreground hover:bg-primary/90 glow-primary" asChild>
              <a href="https://forms.gle/ut7mQmX8XKrr56136" target="_blank" rel="noopener noreferrer">
                Join Waitlist
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="h-12 border-border text-foreground hover:bg-secondary" asChild>
              <a href="/app">
                <Play className="w-4 h-4 mr-2" />
                Try Playground
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
