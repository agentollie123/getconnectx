import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Rocket, CheckCircle2, Mail } from "lucide-react";

export function FinalCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          
          <div className="inline-flex w-16 h-16 rounded-2xl bg-primary/10 items-center justify-center mb-6">
            <Rocket className="w-8 h-8 text-primary" />
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold mb-6 max-w-2xl mx-auto leading-tight">
            Your Next Startup Starts With the{" "}
            <span className="gradient-text">Right People</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto">
            Join thousands of founders, engineers, and operators building the next generation of companies on ConnectX.
          </p>

          <div className="max-w-md mx-auto mb-10">
            <Button size="lg" className="h-12 bg-primary text-primary-foreground hover:bg-primary/90 glow-primary" asChild>
              <a href="https://forms.gle/ut7mQmX8XKrr56136" target="_blank" rel="noopener noreferrer">
                Join Waiting List
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary">
              <a href="#playground">Try the Playground</a>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">Available on iOS and Android  </p>
        </motion.div>
      </div>
    </section>);

}