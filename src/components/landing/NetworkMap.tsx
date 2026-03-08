import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useState } from "react";

const cities = [
  { name: "Jakarta", builders: 2140, founders: 320, engineers: 890, x: 70.5, y: 63 },
  { name: "Singapore", builders: 1850, founders: 410, engineers: 720, x: 68, y: 56 },
  { name: "Bangalore", builders: 3200, founders: 580, engineers: 1600, x: 52, y: 48 },
  { name: "San Francisco", builders: 4100, founders: 920, engineers: 1800, x: 11, y: 33 },
  { name: "London", builders: 2800, founders: 640, engineers: 1100, x: 32, y: 22 },
  { name: "Dubai", builders: 1200, founders: 280, engineers: 450, x: 44, y: 40 },
  { name: "Manila", builders: 980, founders: 190, engineers: 380, x: 76, y: 50 },
  { name: "Ho Chi Minh City", builders: 1100, founders: 210, engineers: 420, x: 69, y: 51 },
];

// Simplified world map SVG path (continents outline)
const WORLD_PATH = `M 3,22 C 5,18 8,16 12,14 C 16,12 20,13 24,15 C 26,16 28,18 30,18 C 32,17 33,15 35,14 C 37,13 39,14 40,16 C 40,18 39,20 38,22 C 37,24 36,26 35,28 C 34,30 33,32 33,34 C 33,37 34,40 33,43 C 32,46 30,48 28,50 C 26,52 24,54 22,57 C 20,60 18,64 16,68 C 14,72 12,76 11,78 C 10,76 9,73 9,70 C 9,67 10,64 10,61 C 9,58 7,55 6,52 C 5,49 4,46 4,43 C 3,40 3,37 3,34 C 3,30 3,26 3,22 Z
M 28,14 C 30,12 32,10 35,10 C 38,10 40,12 42,13 C 44,14 46,14 48,13 C 50,12 52,12 53,14 C 54,16 54,18 53,20 C 52,22 50,24 49,26 C 48,28 47,30 47,32 C 46,34 45,36 44,38 C 43,40 42,42 41,43 C 40,42 40,40 40,38 C 40,36 41,34 41,32 C 40,30 38,28 36,27 C 34,26 32,26 30,27 C 29,25 28,23 28,21 C 28,19 28,16 28,14 Z
M 54,10 C 56,8 59,7 62,8 C 65,9 68,12 70,14 C 72,16 74,18 76,19 C 78,20 80,20 82,19 C 84,18 86,16 88,16 C 90,16 92,18 93,20 C 94,22 94,24 93,26 C 92,28 90,30 88,31 C 86,32 84,32 82,32 C 80,32 78,31 77,30 C 76,29 75,28 74,28 C 72,28 70,30 68,32 C 66,34 64,36 63,38 C 62,40 61,42 60,44 C 58,46 56,48 55,50 C 54,52 54,55 53,58 C 52,60 50,62 49,60 C 48,58 48,55 48,52 C 48,49 49,46 50,43 C 51,40 52,37 52,34 C 52,31 51,28 51,25 C 51,22 52,19 52,16 C 52,14 53,12 54,10 Z
M 64,42 C 66,40 68,39 70,40 C 72,41 74,43 75,46 C 76,49 76,52 76,55 C 76,58 75,61 74,64 C 73,67 71,70 69,72 C 67,74 65,75 63,74 C 61,73 60,70 59,67 C 58,64 58,60 59,56 C 60,52 61,48 62,45 C 63,43 63,42 64,42 Z
M 82,38 C 84,36 86,35 88,36 C 90,37 92,40 93,43 C 94,46 94,50 93,54 C 92,58 90,62 88,65 C 86,68 84,70 82,72 C 80,74 78,75 76,74 C 74,73 73,70 73,67 C 73,64 74,60 75,56 C 76,52 78,48 79,44 C 80,41 81,39 82,38 Z`;

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
        <div className="relative max-w-4xl mx-auto glass-card rounded-2xl p-6 sm:p-8 overflow-hidden" style={{ minHeight: 420 }}>
          {/* World map SVG background */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 85"
            preserveAspectRatio="xMidYMid meet"
            style={{ opacity: 0.08 }}
          >
            <path d={WORLD_PATH} fill="hsl(var(--foreground))" />
          </svg>

          {/* Latitude / longitude grid lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 85"
            preserveAspectRatio="xMidYMid meet"
            style={{ opacity: 0.04 }}
          >
            {[15, 30, 45, 60, 75].map((y) => (
              <line key={`h-${y}`} x1="0" y1={y} x2="100" y2={y} stroke="hsl(var(--foreground))" strokeWidth="0.2" />
            ))}
            {[15, 30, 45, 60, 75, 90].map((x) => (
              <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="85" stroke="hsl(var(--foreground))" strokeWidth="0.2" />
            ))}
          </svg>

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

              {/* City label */}
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[9px] text-muted-foreground whitespace-nowrap font-medium hidden sm:block">
                {city.name}
              </span>

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
          <div className="sm:hidden flex flex-wrap gap-2 mt-4 justify-center absolute bottom-4 inset-x-4">
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
