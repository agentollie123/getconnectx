import { motion } from "framer-motion";
import { Users, Link2, Rocket, Globe } from "lucide-react";
import logoNvidia from "@/assets/logo-nvidia-inception.png";
import logoTechInAsia from "@/assets/logo-techinasia.png";
import logoGoogleStartups from "@/assets/logo-google-startups.png";
import logoBisnis from "@/assets/logo-bisnis.png";
import logoAlibabaCloud from "@/assets/logo-alibaba-cloud.png";

const stats = [
  { icon: Users, value: "12,000+", label: "Builders" },
  { icon: Link2, value: "80,000+", label: "Connections Made" },
  { icon: Rocket, value: "300+", label: "Startups Forming" },
  { icon: Globe, value: "8+", label: "Cities" },
];

const partners = [
  { src: logoNvidia, alt: "NVIDIA Inception Program", className: "object-contain h-10 max-w-[160px] opacity-70 hover:opacity-100 transition-all duration-300" },
  { src: logoGoogleStartups, alt: "Google for Startups", className: "object-contain h-8 max-w-[140px] brightness-0 invert opacity-50 hover:opacity-80 transition-all duration-300" },
  { src: logoAlibabaCloud, alt: "Alibaba Cloud", className: "object-contain h-8 max-w-[140px] brightness-0 invert opacity-50 hover:opacity-80 transition-all duration-300" },
  { src: logoTechInAsia, alt: "Tech in Asia", className: "object-contain h-8 max-w-[140px] brightness-0 invert opacity-50 hover:opacity-80 transition-all duration-300" },
  { src: logoBisnis, alt: "Bisnis.com", className: "object-contain h-8 max-w-[140px] brightness-0 invert opacity-50 hover:opacity-80 transition-all duration-300" },
];

export function SocialProof() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Community stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Community <span className="gradient-text">Momentum</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mb-20">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex w-12 h-12 rounded-xl bg-primary/10 items-center justify-center mb-3">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="font-display text-3xl font-bold text-foreground mb-1">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Partners & Backers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-8">Backed & Supported By</p>
          <div className="flex items-center justify-center gap-10 md:gap-14 flex-wrap">
            {partners.map((p) => (
              <img
                key={p.alt}
                src={p.src}
                alt={p.alt}
                className={p.className}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
