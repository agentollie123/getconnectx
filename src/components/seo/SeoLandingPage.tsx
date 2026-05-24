import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { SEO } from "@/components/SEO";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Play, Check, X } from "lucide-react";

export interface SeoLandingProps {
  path: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  h1Highlight?: string;
  subhead: string;
  intro: string;
  benefits: { title: string; body: string }[];
  vsTable?: { feature: string; us: string; them: string }[];
  vsLabel?: string;
  faq: { q: string; a: string }[];
}

export function SeoLandingPage({
  path,
  metaTitle,
  metaDescription,
  eyebrow,
  h1,
  h1Highlight,
  subhead,
  intro,
  benefits,
  vsTable,
  vsLabel,
  faq,
}: SeoLandingProps) {
  const url = `https://getconnectx.app${path}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title={metaTitle} description={metaDescription} path={path} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-wide uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
                {eyebrow}
              </span>
              <h1 className="font-display text-4xl sm:text-6xl font-bold leading-tight mb-6">
                {h1}
                {h1Highlight && (
                  <>
                    {" "}
                    <span className="gradient-text">{h1Highlight}</span>
                  </>
                )}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                {subhead}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="h-12 bg-primary text-primary-foreground hover:bg-primary/90 glow-primary" asChild>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSeCiRvEYfR_cVMqnoLtcTpAp6xagcchRJv6mQPMvFhgMyOqWQ/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join Waitlist <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="h-12 border-border text-foreground hover:bg-secondary" asChild>
                  <a href="/app">
                    <Play className="w-4 h-4 mr-2" /> Try Playground
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed text-center">
              {intro}
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-border/40 bg-card/40 backdrop-blur p-6"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-4">
                    <Check className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison */}
        {vsTable && (
          <section className="py-20 bg-card/20">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-12 max-w-2xl mx-auto">
                {vsLabel ?? "Why founders pick ConnectX"}
              </h2>
              <div className="max-w-3xl mx-auto rounded-2xl border border-border/40 overflow-hidden">
                <div className="grid grid-cols-3 bg-card/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <div className="px-4 py-3">Feature</div>
                  <div className="px-4 py-3 text-primary">ConnectX</div>
                  <div className="px-4 py-3">Alternative</div>
                </div>
                {vsTable.map((row, i) => (
                  <div
                    key={row.feature}
                    className={`grid grid-cols-3 text-sm ${i % 2 === 0 ? "bg-background/40" : "bg-card/30"}`}
                  >
                    <div className="px-4 py-4 text-foreground">{row.feature}</div>
                    <div className="px-4 py-4 text-foreground flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" /> {row.us}
                    </div>
                    <div className="px-4 py-4 text-muted-foreground flex items-center gap-2">
                      <X className="w-4 h-4 text-muted-foreground/60 flex-shrink-0" /> {row.them}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-12">
              Questions founders ask
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faq.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-xl border border-border/40 bg-card/40 px-5 py-4 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-medium text-foreground">
                    {f.q}
                    <span className="text-primary text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
