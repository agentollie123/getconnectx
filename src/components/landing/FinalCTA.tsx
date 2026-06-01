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

          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Button size="lg" className="h-12 bg-primary text-primary-foreground hover:bg-primary/90 glow-primary" asChild>
              <a href="/app">
                <Play className="w-4 h-4 mr-2" />
                {t("Try Demo", "Coba Demo")}
              </a>
            </Button>
            <Button size="lg" variant="outline" className="h-12 border-border text-foreground hover:bg-secondary" asChild>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSeCiRvEYfR_cVMqnoLtcTpAp6xagcchRJv6mQPMvFhgMyOqWQ/viewform" target="_blank" rel="noopener noreferrer">
                {t("Download App", "Unduh Aplikasi")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground/70">
            {t("Available on App Store & Google Play", "Tersedia di App Store & Google Play")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
