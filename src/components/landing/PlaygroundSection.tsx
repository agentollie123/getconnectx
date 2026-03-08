import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProfileCard } from "@/components/ProfileCard";
import { profiles } from "@/lib/profileData";
import { Sparkles } from "lucide-react";

export function PlaygroundSection() {
  const [location, setLocation] = useState<string>("");
  const [stage, setStage] = useState<string>("");
  const [commitment, setCommitment] = useState<string>("");
  const [showResults, setShowResults] = useState(false);

  const filtered = profiles.filter((p) => {
    if (location && p.location !== location) return false;
    if (stage && p.stage !== stage) return false;
    if (commitment && p.commitment !== commitment) return false;
    return true;
  });

  return (
    <section id="playground" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Demo
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            ConnectX <span className="gradient-text-accent">Playground</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Simulate the matching experience. Apply filters and discover builders.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 max-w-3xl mx-auto mb-10"
        >
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Location</label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="bg-card border-border">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  <SelectItem value="Jakarta">Jakarta</SelectItem>
                  <SelectItem value="Singapore">Singapore</SelectItem>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                  <SelectItem value="Ho Chi Minh City">Ho Chi Minh City</SelectItem>
                  <SelectItem value="Manila">Manila</SelectItem>
                  <SelectItem value="Dubai">Dubai</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Startup Stage</label>
              <Select value={stage} onValueChange={setStage}>
                <SelectTrigger className="bg-card border-border">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  <SelectItem value="Idea Stage">Idea Stage</SelectItem>
                  <SelectItem value="MVP">MVP</SelectItem>
                  <SelectItem value="Pre-revenue">Pre-revenue</SelectItem>
                  <SelectItem value="Seed">Seed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Commitment</label>
              <Select value={commitment} onValueChange={setCommitment}>
                <SelectTrigger className="bg-card border-border">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  <SelectItem value="Exploring">Exploring</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setShowResults(true)}
              >
                Generate Matches
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {(filtered.length > 0 ? filtered : profiles).map((p, i) => (
              <ProfileCard key={p.id} profile={p} index={i} showCommitment />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
