import { motion } from "framer-motion";
import { ProfileCard } from "@/components/ProfileCard";
import { profiles } from "@/lib/profileData";

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
            Browse a social feed of founders, engineers, designers, and operators ready to build.
          </p>
        </motion.div>

        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-4 -mx-4">
          {profiles.map((p, i) => (
            <div key={p.id} className="snap-start min-w-[300px] flex-shrink-0">
              <ProfileCard profile={p} index={i} showCommitment />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
