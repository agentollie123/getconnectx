import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useState } from "react";
import worldMap from "@/assets/world-map.png";

const cities = [
  { name: "Jakarta", builders: 2140, founders: 320, engineers: 890, x: 70.5, y: 63 },
  { name: "Singapore", builders: 1850, founders: 410, engineers: 720, x: 68, y: 55 },
  { name: "Bangalore", builders: 3200, founders: 580, engineers: 1600, x: 52, y: 50 },
  { name: "San Francisco", builders: 4100, founders: 920, engineers: 1800, x: 10, y: 34 },
  { name: "London", builders: 2800, founders: 640, engineers: 1100, x: 33, y: 24 },
  { name: "Dubai", builders: 1200, founders: 280, engineers: 450, x: 44, y: 42 },
  { name: "Manila", builders: 980, founders: 190, engineers: 380, x: 76, y: 50 },
  { name: "Ho Chi Minh City", builders: 1100, founders: 210, engineers: 420, x: 69, y: 52 },
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
        <div
          className="relative max-w-4xl mx-auto rounded-2xl p-6 sm:p-8 overflow-hidden border border-border/40 bg-card"
          style={{ minHeight: 420 }}
        >
          {/* World map image with brand tint */}
          <div className="absolute inset-0 flex items-center justify-center p-8 opacity-20">
            <img
              src={worldMap}
              alt=""
              className="w-full h-full object-contain"
              style={{
                filter:
                  "sepia(1) saturate(3) hue-rotate(-10deg) brightness(0.7)",
              }}
            />
          </div>

          {/* Gradient overlay for brand feel */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

          {/* Connection lines SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {cities.map((city, i) =>
              cities.slice(i + 1).map((other, j) => {
                const dist = Math.hypot(city.x - other.x, city.y - other.y);
                if (dist > 35) return null;
                return (
                  <line
                    key={`${i}-${j}`}
                    x1={`${city.x}%`}
                    y1={`${city.y}%`}
                    x2={`${other.x}%`}
                    y2={`${other.y}%`}
                    stroke="hsl(var(--primary))"
                    strokeWidth="0.3"
                    opacity="0.2"
                    strokeDasharray="2 2"
                  />
                );
              })
            )}
          </svg>

          {/* City markers */}
          {cities.map((city, i) => (
            <motion.div
              key={city.name}
              className="absolute cursor-pointer"
              style={{
                left: `${city.x}%`,
                top: `${city.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring" }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              {/* Pulse ring */}
              <div className="absolute inset-0 w-5 h-5 -m-1">
                <div className="w-full h-full rounded-full bg-primary/25 animate-ping" />
              </div>
              <div className="relative w-3 h-3 rounded-full bg-primary border-2 border-background shadow-lg shadow-primary/30" />

              {/* City label */}
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 text-[9px] text-muted-foreground whitespace-nowrap font-medium hidden sm:block">
                {city.name}
              </span>

              {/* Popup */}
              {active === i && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 rounded-lg p-3 min-w-[160px] z-10 border border-primary/20 bg-card shadow-lg"
                >
                  <p className="font-display font-bold text-sm text-foreground mb-1">
                    {city.name}
                  </p>
                  <div className="space-y-0.5 text-xs text-muted-foreground">
                    <p>
                      <span className="text-primary font-semibold">
                        {city.builders.toLocaleString()}
                      </span>{" "}
                      Builders
                    </p>
                    <p>
                      <span className="text-primary font-semibold">
                        {city.founders}
                      </span>{" "}
                      Founders
                    </p>
                    <p>
                      <span className="text-primary font-semibold">
                        {city.engineers.toLocaleString()}
                      </span>{" "}
                      Engineers
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}

          {/* Mobile city labels */}
          <div className="sm:hidden flex flex-wrap gap-2 mt-4 justify-center absolute bottom-4 inset-x-4">
            {cities.slice(0, 5).map((city) => (
              <span
                key={city.name}
                className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
              >
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
              <div className="font-display font-bold text-2xl text-foreground">
                {s.value}
              </div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
