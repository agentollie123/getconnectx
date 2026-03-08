import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

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
          <h2 className="font-display text-3xl sm:text-5xl font-bold mb-6 max-w-2xl mx-auto leading-tight">
            Find the Right People to Build the{" "}
            <span className="gradient-text">Future</span> With
          </h2>

          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary mb-4">
            <Download className="w-4 h-4 mr-2" />
            Download ConnectX
          </Button>

          <p className="text-sm text-muted-foreground">Available on iOS and Android.</p>
        </motion.div>
      </div>
    </section>
  );
}
