import { motion } from "framer-motion";
import { profiles } from "@/lib/profileData";
import { MapPin, Briefcase, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function MatchScore() {
  const score = Math.floor(Math.random() * 20) + 78;
  return (
    <div className="flex items-center gap-1">
      <Star className="w-3 h-3 text-accent fill-accent" />
      <span className="text-xs font-bold text-accent">{score}%</span>
    </div>
  );
}

export function SocialDiscovery() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Discover <span className="gradient-text">Builders</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Data-driven profiles with match scoring. Find the right people, faster.
          </p>
        </motion.div>

        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-4 -mx-4">
          {profiles.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="snap-start min-w-[280px] flex-shrink-0 glass-card rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300"
            >
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <img src={p.photo} alt={p.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-semibold text-foreground truncate">{p.name}</h4>
                      <MatchScore />
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{p.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-primary" />{p.location}</span>
                  <span className="flex items-center gap-1"><Briefcase className="w-3 h-3 text-primary" />{p.commitment}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {p.skills.map((skill) => (
                    <span key={skill} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">{skill}</span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {p.interests.map((interest) => (
                    <span key={interest} className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">{interest}</span>
                  ))}
                </div>
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
              Try Swiping in the App
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
