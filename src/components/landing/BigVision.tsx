import { motion } from "framer-motion";

export function BigVision() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-8">
            Our Vision
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold mb-8 leading-tight">
            The Future of <span className="gradient-text">Startup Creation</span>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            In the future, startups won't start in coffee shops or random Slack groups.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            They will start on platforms designed to bring the right people together.{" "}
            <span className="text-foreground font-semibold">ConnectX is building that platform.</span>
          </p>

          <div className="glass-card inline-block rounded-xl px-6 py-3">
            <p className="text-sm text-muted-foreground italic">
              "ConnectX is building the infrastructure for the next generation of startups."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
