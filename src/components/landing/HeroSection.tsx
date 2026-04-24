import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { NetworkVisualization } from "./NetworkVisualization";
import { useLanguage } from "@/contexts/LanguageContext";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {t("The platform where startups begin", "Platform tempat startup dimulai")}
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t("Build Your Startup", "Bangun Startup Kamu")}{" "}
              <br className="hidden sm:block" />
              {t("With the", "Dengan")}{" "}
              <span className="gradient-text">{t("Right People.", "Orang yang Tepat.")}</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mb-3 leading-relaxed">
              {t("ConnectX connects founders, co-founders, and early teams to start startups together.", "ConnectX menghubungkan founder, co-founder, dan tim awal untuk membangun startup bersama.")}
            </p>

            <p className="text-sm text-muted-foreground/70 max-w-lg mb-8">
              {t("No networking. No job boards. Just the people you need to start.", "Bukan networking. Bukan job board. Hanya orang yang kamu butuhkan untuk mulai.")}
            </p>

            <div className="flex flex-wrap gap-4 mb-3">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary" asChild>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSeCiRvEYfR_cVMqnoLtcTpAp6xagcchRJv6mQPMvFhgMyOqWQ/viewform" target="_blank" rel="noopener noreferrer">
                  {t("Join Waitlist", "Gabung Waitlist")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary" asChild>
                <a href="/app">
                  <Play className="w-4 h-4 mr-2" />
                  {t("Explore Playground", "Coba Playground")}
                </a>
              </Button>
            </div>

            <p className="text-xs text-primary/80 font-medium">
              {t("Be early. The best teams form first.", "Jadilah yang awal. Tim terbaik terbentuk lebih dulu.")}
            </p>

            <div className="flex gap-8 mt-10 pt-8 border-t border-border/50">
              {[
                 { value: "12,000+", label: t("Builders", "Builder") },
                 { value: "80,000+", label: t("Connections", "Koneksi") },
                 { value: "300+", label: t("Startups Forming", "Startup Terbentuk") },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display font-bold text-xl text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center"
          >
            <NetworkVisualization />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
