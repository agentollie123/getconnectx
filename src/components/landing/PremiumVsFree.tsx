import { motion } from "framer-motion";
import { Check, X, ArrowRight, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const freeFeatures = [
  "Discover founders, builders, and startups",
  "Basic matches based on your profile",
  "Connect with people",
  "Build your profile",
];

const freeLimitations = [
  "Matches may be less precise",
  "Limited visibility to others",
  "You won't see who wants to connect",
];

const premiumFeatures = [
  "See who wants to connect with you",
  "Get higher-quality matches",
  "Appear first to founders and startups",
  "Increase your chances of finding the right team",
  "Priority visibility in discovery",
  "Better match precision",
  "Monthly profile boost",
];

export function PremiumVsFree() {
  const { t } = useLanguage();
  const localizedFreeFeatures = freeFeatures.map((feature, i) => [
    t("Discover founders, builders, and startups", "Temukan founder, builder, dan startup"),
    t("Basic matches based on your profile", "Match dasar berdasarkan profilmu"),
    t("Connect with people", "Terhubung dengan orang"),
    t("Build your profile", "Bangun profilmu"),
  ][i]);
  const localizedFreeLimitations = freeLimitations.map((feature, i) => [
    t("Matches may be less precise", "Match mungkin kurang presisi"),
    t("Limited visibility to others", "Visibilitas terbatas ke pengguna lain"),
    t("You won't see who wants to connect", "Kamu tidak melihat siapa yang ingin terhubung"),
  ][i]);
  const localizedPremiumFeatures = premiumFeatures.map((feature, i) => [
    t("See who wants to connect with you", "Lihat siapa yang ingin terhubung denganmu"),
    t("Get higher-quality matches", "Dapatkan match yang lebih berkualitas"),
    t("Appear first to founders and startups", "Muncul lebih dulu ke founder dan startup"),
    t("Increase your chances of finding the right team", "Tingkatkan peluang menemukan tim yang tepat"),
    t("Priority visibility in discovery", "Visibilitas prioritas di discovery"),
    t("Better match precision", "Presisi match lebih baik"),
    t("Monthly profile boost", "Boost profil bulanan"),
  ][i]);

  return (
    <section id="premium" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 max-w-2xl mx-auto">
            {t("Free to Explore.", "Gratis untuk Eksplorasi.")} {" "}
            <span className="gradient-text">{t("Premium to Move Faster.", "Premium untuk Bergerak Lebih Cepat.")}</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t("Better builders. Faster outcomes. Higher chances to build.", "Builder lebih tepat. Hasil lebih cepat. Peluang membangun lebih besar.")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Free */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8"
          >
            <h3 className="font-display font-bold text-2xl text-foreground mb-1">Free</h3>
            <p className="text-sm text-muted-foreground mb-6">{t("Start exploring the network", "Mulai jelajahi jaringan")}</p>

            <div className="space-y-3 mb-6">
              {localizedFreeFeatures.map((f) => (
                <div key={f} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{f}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border/50 pt-4 space-y-2.5">
              {localizedFreeLimitations.map((l) => (
                <div key={l} className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-muted-foreground/50 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-muted-foreground/60">{l}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Premium */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl p-8 border border-primary/30 bg-card"
            style={{
              boxShadow: "0 0 40px -10px hsl(var(--primary) / 0.15)",
            }}
          >
            <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-1">
              <Crown className="w-3 h-3" />
              {t("Recommended", "Direkomendasikan")}
            </div>

            <h3 className="font-display font-bold text-2xl text-foreground mb-1">Premium</h3>
            <p className="text-sm text-primary mb-6">{t("Find the right people, faster", "Temukan orang yang tepat lebih cepat")}</p>

            <div className="space-y-3 mb-6">
              {localizedPremiumFeatures.map((f) => (
                <div key={f} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground">{f}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-primary/80 mb-5 italic">
              {t("Premium users are matched earlier with higher-fit profiles", "Pengguna Premium dipertemukan lebih awal dengan profil yang lebih cocok")}
            </p>

            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-primary" asChild>
              <a href="/app/premium">
                {t("Upgrade to Premium", "Upgrade ke Premium")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-10 italic"
        >
          {t("The best teams don't wait to be discovered.", "Tim terbaik tidak menunggu untuk ditemukan.")}
        </motion.p>
      </div>
    </section>
  );
}
