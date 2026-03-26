import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Heart, X, Star, Users, Briefcase, Zap } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

function PhoneMockup() {
  return (
    <div className="relative w-[280px] sm:w-[300px] mx-auto">
      {/* Phone frame */}
      <div className="rounded-[36px] border-[5px] border-foreground/15 bg-background shadow-2xl overflow-hidden">
        {/* Status bar */}
        <div className="h-7 bg-card flex items-center justify-between px-5 text-[10px] text-muted-foreground">
          <span>9:41</span>
          <div className="flex gap-1">
            <div className="w-3.5 h-1.5 rounded-sm bg-muted-foreground/30" />
            <div className="w-3.5 h-1.5 rounded-sm bg-muted-foreground/30" />
            <div className="w-3.5 h-1.5 rounded-sm bg-muted-foreground/30" />
          </div>
        </div>

        {/* App header */}
        <div className="h-10 bg-card border-b border-border flex items-center justify-between px-4">
          <div className="flex items-center gap-1.5">
            <img src={logoIcon} alt="ConnectX" className="w-5 h-5 rounded" />
            <span className="font-display font-bold text-foreground text-xs">ConnectX</span>
          </div>
          <div className="flex items-center gap-1 text-[9px]">
            <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground font-medium">Builder</span>
          </div>
        </div>

        {/* Mode label */}
        <div className="px-4 py-2 bg-card/50">
          <p className="text-[10px] text-muted-foreground">Finding Co-Founder</p>
        </div>

        {/* Swipe card */}
        <div className="px-3 pb-3">
          <motion.div
            className="rounded-xl bg-card border border-border overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* Profile photo placeholder */}
            <div className="h-36 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
              <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-primary/90 text-primary-foreground text-[9px] font-bold">
                92% Match
              </div>
            </div>
            <div className="p-3 space-y-2">
              <div>
                <h4 className="font-display font-bold text-sm text-foreground">Sarah Chen</h4>
                <p className="text-[10px] text-muted-foreground">Full-Stack Engineer · Singapore</p>
              </div>
              <div className="flex flex-wrap gap-1">
                {["React", "AI/ML", "SaaS"].map(s => (
                  <span key={s} className="text-[8px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent-foreground border border-accent/20 flex items-center gap-0.5">
                  <Zap className="w-2 h-2" /> Complementary Skill
                </span>
                <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                  Same Industry
                </span>
              </div>
            </div>
          </motion.div>

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-5 pt-3">
            <motion.div
              className="w-11 h-11 rounded-full border-2 border-destructive/30 bg-card flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5 text-destructive" />
            </motion.div>
            <motion.div
              className="w-9 h-9 rounded-full border-2 border-accent/30 bg-card flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Star className="w-4 h-4 text-accent" />
            </motion.div>
            <motion.div
              className="w-11 h-11 rounded-full border-2 border-primary/30 bg-card flex items-center justify-center"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-5 h-5 text-primary" />
            </motion.div>
          </div>
        </div>

        {/* Bottom nav */}
        <div className="h-10 bg-card border-t border-border flex items-center justify-around px-4">
          {[
            { icon: Users, label: "Discover", active: true },
            { icon: Heart, label: "Connects", active: false },
            { icon: Briefcase, label: "Teams", active: false },
          ].map(n => (
            <div key={n.label} className="flex flex-col items-center gap-0.5">
              <n.icon className={`w-3.5 h-3.5 ${n.active ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className={`text-[8px] ${n.active ? 'text-primary font-medium' : 'text-muted-foreground'}`}>{n.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute -inset-8 bg-primary/5 rounded-full blur-3xl -z-10" />
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Startup Formation Platform
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Where Builders{" "}
              <br className="hidden sm:block" />
              and Startups{" "}
              <br className="hidden sm:block" />
              <span className="gradient-text">Come Together.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              Find co-founders, build your team, or join a startup — all in one place.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary" asChild>
                <a href="https://forms.gle/ut7mQmX8XKrr56136" target="_blank" rel="noopener noreferrer">
                  Join Waitlist
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary" asChild>
                <a href="/app">
                  <Play className="w-4 h-4 mr-2" />
                  Explore Playground
                </a>
              </Button>
            </div>

            {/* Quick stats */}
            <div className="flex gap-8 mt-10 pt-8 border-t border-border/50">
              {[
                { value: "12,000+", label: "Builders" },
                { value: "80,000+", label: "Connections" },
                { value: "300+", label: "Startups Forming" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display font-bold text-xl text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center"
          >
            <PhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
