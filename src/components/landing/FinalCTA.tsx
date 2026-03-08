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

          {/* Waiting List Form */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-md mx-auto mb-10">
            
            {submitted ?
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-3 rounded-2xl bg-primary/10 border border-primary/20 p-6">
              
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                <div className="text-left">
                  <p className="font-display font-bold text-foreground">You're on the list!</p>
                  <p className="text-sm text-muted-foreground">We'll notify you when ConnectX launches.</p>
                </div>
              </motion.div> :

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 h-12 bg-card border-border text-foreground" />
                
                </div>
                <Button type="submit" size="lg" className="h-12 bg-primary text-primary-foreground hover:bg-primary/90 glow-primary whitespace-nowrap">
                  Join Waiting List
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            }
          </motion.div>

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