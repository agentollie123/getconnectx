import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useState } from "react";

const cities = [
  { name: "Jakarta", builders: 2140, founders: 320, engineers: 890, x: 58, y: 62 },
  { name: "Singapore", builders: 1850, founders: 410, engineers: 720, x: 56, y: 55 },
  { name: "Bangalore", builders: 3200, founders: 580, engineers: 1600, x: 45, y: 48 },
  { name: "San Francisco", builders: 4100, founders: 920, engineers: 1800, x: 12, y: 32 },
  { name: "London", builders: 2800, founders: 640, engineers: 1100, x: 30, y: 22 },
  { name: "Dubai", builders: 1200, founders: 280, engineers: 450, x: 40, y: 38 },
  { name: "Manila", builders: 980, founders: 190, engineers: 380, x: 64, y: 50 },
  { name: "Ho Chi Minh City", builders: 1100, founders: 210, engineers: 420, x: 58, y: 50 },
];

export function NetworkMap() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
            <MapPin className="w-3.5 h-3.5" />
            Global Network
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Startup Builders <span className="gradient-text">Around the World</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            ConnectX is global from day one. Discover builders across every timezone.
          </p>
        </motion.div>

        {/* Map */}
        <div className="relative max-w-4xl mx-auto glass-card rounded-2xl p-8 overflow-hidden" style={{ minHeight: 400 }}>
          {/* Grid bg */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }} />
          </div>

          {/* City markers */}
          {cities.map((city, i) => (
            <motion.div
              key={city.name}
              className="absolute cursor-pointer"
              style={{ left: `${city.x}%`, top: `${city.y}%`, transform: "translate(-50%, -50%)" }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring" }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              {/* Pulse ring */}
              <div className="absolute inset-0 w-4 h-4 -m-0.5">
                <div className="w-full h-full rounded-full bg-primary/30 animate-ping" />
              </div>
              <div className="relative w-3 h-3 rounded-full bg-primary border-2 border-background shadow-lg" />

              {/* Popup */}
              {active === i && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 glass-card rounded-lg p-3 min-w-[160px] z-10 border border-primary/20"
                >
                  <p className="font-display font-bold text-sm text-foreground mb-1">{city.name}</p>
                  <div className="space-y-0.5 text-xs text-muted-foreground">
                    <p><span className="text-primary font-semibold">{city.builders.toLocaleString()}</span> Builders</p>
                    <p><span className="text-primary font-semibold">{city.founders}</span> Founders</p>
                    <p><span className="text-primary font-semibold">{city.engineers.toLocaleString()}</span> Engineers</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}

          {/* City labels for mobile */}
          <div className="sm:hidden flex flex-wrap gap-2 mt-4 justify-center">
            {cities.slice(0, 5).map((city) => (
              <span key={city.name} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                {city.name}
              </span>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-8">
          {[
            { value: "8", label: "Cities" },
            { value: "17,000+", label: "Total Builders" },
            { value: "3,500+", label: "Founders" },
            { value: "7,300+", label: "Engineers" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-display font-bold text-2xl text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
