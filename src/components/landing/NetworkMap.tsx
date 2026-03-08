import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useState } from "react";

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

// Real simplified world map paths (Natural Earth inspired)
const CONTINENTS = {
  northAmerica: "M5,20 L8,15 L12,12 L18,10 L22,12 L25,10 L28,12 L30,15 L28,18 L25,20 L22,22 L20,28 L18,32 L15,35 L12,38 L10,35 L8,30 L6,25 Z M12,38 L14,42 L16,45 L18,48 L16,50 L14,48 L12,44 L10,40 Z",
  southAmerica: "M18,52 L20,50 L22,48 L25,50 L27,54 L28,58 L27,62 L26,66 L24,70 L22,74 L20,76 L18,78 L17,74 L16,70 L17,66 L18,62 L17,58 L18,54 Z",
  europe: "M32,12 L34,10 L36,8 L38,10 L40,12 L42,10 L44,12 L46,14 L44,16 L42,18 L40,20 L38,22 L36,24 L34,22 L32,20 L30,18 L32,16 Z",
  africa: "M32,30 L34,28 L36,26 L38,28 L40,30 L42,32 L44,34 L46,38 L46,42 L44,46 L42,50 L40,54 L38,58 L36,62 L34,66 L32,68 L30,66 L28,62 L30,58 L32,54 L30,50 L28,46 L28,42 L30,38 L30,34 Z",
  asia: "M44,8 L48,6 L52,8 L56,6 L60,8 L64,10 L68,12 L72,14 L76,16 L80,18 L84,16 L88,18 L90,22 L88,26 L84,28 L80,30 L76,32 L72,34 L68,36 L64,38 L60,40 L56,42 L52,44 L48,42 L46,38 L44,34 L42,30 L44,26 L46,22 L48,18 L46,14 L44,12 Z M52,44 L54,48 L56,50 L58,48 L60,46 Z",
  seAsia: "M64,44 L66,42 L68,44 L70,46 L72,48 L74,50 L76,52 L74,54 L72,56 L70,58 L68,60 L66,58 L64,56 L62,54 L64,50 L66,48 Z M72,56 L74,58 L76,56 L78,54 Z M68,60 L70,62 L72,64 L70,66 L68,64 Z",
  oceania: "M78,56 L82,54 L86,52 L90,54 L92,58 L90,62 L86,66 L82,68 L78,66 L76,62 L78,58 Z M92,52 L94,54 L92,56 L90,54 Z",
};

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
          {/* World map SVG */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 85"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Grid lines */}
            {[17, 34, 51, 68].map((y) => (
              <line key={`h-${y}`} x1="0" y1={y} x2="100" y2={y} stroke="hsl(var(--foreground))" strokeWidth="0.15" opacity="0.06" />
            ))}
            {[20, 40, 60, 80].map((x) => (
              <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="85" stroke="hsl(var(--foreground))" strokeWidth="0.15" opacity="0.06" />
            ))}

            {/* Continents */}
            {Object.values(CONTINENTS).map((path, i) => (
              <path
                key={i}
                d={path}
                fill="hsl(var(--primary))"
                opacity="0.12"
                stroke="hsl(var(--primary))"
                strokeWidth="0.3"
                strokeOpacity="0.2"
              />
            ))}

            {/* Connection lines between cities */}
            {cities.map((city, i) =>
              cities.slice(i + 1).map((other, j) => {
                const dist = Math.hypot(city.x - other.x, city.y - other.y);
                if (dist > 35) return null;
                return (
                  <line
                    key={`${i}-${j}`}
                    x1={city.x}
                    y1={city.y}
                    x2={other.x}
                    y2={other.y}
                    stroke="hsl(var(--primary))"
                    strokeWidth="0.2"
                    opacity="0.15"
                    strokeDasharray="1 1"
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
              style={{ left: `${city.x}%`, top: `${city.y}%`, transform: "translate(-50%, -50%)" }}
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

          {/* Mobile city labels */}
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
