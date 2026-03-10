import { motion } from "framer-motion";
import { Compass, Handshake, Users, Rocket, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    icon: Compass,
    step: "01",
    title: "Discover Founders, Builders & Startups",
    description:
      "Explore a curated network of founders, co-founders, engineers, designers, and operators. Whether you're starting a company or looking to join one, ConnectX helps you discover the right opportunities.",
  },
  {
    icon: Handshake,
    step: "02",
    title: "Match With the Right People",
    description:
      "Swipe and connect with people who complement your skills and share your ambition. Great companies start with the right partnerships.",
    bullets: ["Role compatibility", "Industry interests", "Startup stage", "Skills & experience"],
  },
  {
    icon: Users,
    step: "03",
    title: "Build Your Founding Team",
    description:
      "Founders can recruit early team members — from the first engineer to product builders and growth leaders. Builders can discover startups looking for early teammates. Turn conversations into real startup teams.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Start Building Together",
    description:
      "Once matched, start conversations and collaborate. Founders can add members directly to their startup team page. Your startup begins to take shape.",
  },
  {
    icon: TrendingUp,
    step: "05",
    title: "Meet Investors & Advisors",
    description:
      "As your startup grows, ConnectX will introduce new matchmaking layers — helping startups go from idea → team → funding → scale.",
    bullets: ["Founders → Investors", "Founders → Mentors", "Startups → Strategic Partners"],
    comingSoon: true,
  },
];

export function StartupPipeline() {
  return (
    <section id="how-it-works" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            How Startups Form on <span className="gradient-text">ConnectX</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            ConnectX sits at the very beginning of company creation —
            <br className="hidden sm:block" />
            where founders, builders, and early believers come together to start startups.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-6 mb-8 last:mb-0"
            >
              {/* Timeline */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    s.comingSoon
                      ? "bg-muted"
                      : "bg-primary/10 border border-primary/20"
                  }`}
                >
                  <s.icon
                    className={`w-5 h-5 ${
                      s.comingSoon ? "text-muted-foreground" : "text-primary"
                    }`}
                  />
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px h-full bg-border mt-2 min-h-[24px]" />
                )}
              </div>

              {/* Content */}
              <div className="pb-8">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-primary">
                    Step {s.step}
                  </span>
                  {s.comingSoon && (
                    <Badge
                      variant="outline"
                      className="text-[10px] border-primary/30 text-primary"
                    >
                      Coming Soon
                    </Badge>
                  )}
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.description}
                </p>
                {s.bullets && (
                  <ul className="mt-2 space-y-1">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
