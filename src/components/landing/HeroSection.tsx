import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Sparkles } from "lucide-react";
import { ProfileCard } from "@/components/ProfileCard";
import { profiles } from "@/lib/profileData";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Startup Matchmaking Platform
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Find the People to Build Your{" "}
              <span className="gradient-text">Startup With</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              ConnectX is a startup matchmaking platform connecting founders, builders, and early believers to start companies together.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary">
                <Download className="w-4 h-4 mr-2" />
                Download the App
              </Button>
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary">
                <a href="#playground">Explore the Playground</a>
              </Button>
            </div>
          </motion.div>

          {/* Right: profile feed mock */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {profiles.slice(0, 4).map((p, i) => (
              <ProfileCard key={p.id} profile={p} index={i} compact />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
