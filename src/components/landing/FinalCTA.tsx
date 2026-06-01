import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Rocket, Play } from "lucide-react";
import { StoreBadges } from "./StoreBadges";
import { useLanguage } from "@/contexts/LanguageContext";

export function FinalCTA() {
  const { t } = useLanguage();

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
            {t("Don't Wait to Find the", "Jangan Tunggu untuk Menemukan")}{" "}
            <span className="gradient-text">{t("Right People", "Orang yang Tepat")}</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto">
            {t("Join thousands of founders, builders, engineers, operators, and startup teams already connecting on ConnectX.", "Bergabunglah dengan ribuan founder, builder, engineer, operator, dan tim startup yang sudah terkoneksi di ConnectX.")}
          </p>

          <div className="flex justify-center">
            <StoreBadges align="center" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
