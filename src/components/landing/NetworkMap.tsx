import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useState } from "react";

const cities = [
  { name: "Jakarta", builders: 2140, founders: 320, engineers: 890, x: 71, y: 62 },
  { name: "Singapore", builders: 1850, founders: 410, engineers: 720, x: 68.5, y: 55 },
  { name: "Bangalore", builders: 3200, founders: 580, engineers: 1600, x: 53, y: 48 },
  { name: "San Francisco", builders: 4100, founders: 920, engineers: 1800, x: 10, y: 34 },
  { name: "London", builders: 2800, founders: 640, engineers: 1100, x: 33, y: 23 },
  { name: "Dubai", builders: 1200, founders: 280, engineers: 450, x: 44.5, y: 40 },
  { name: "Manila", builders: 980, founders: 190, engineers: 380, x: 76, y: 50 },
  { name: "Ho Chi Minh City", builders: 1100, founders: 210, engineers: 420, x: 69.5, y: 50 },
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
        <div className="relative max-w-4xl mx-auto glass-card rounded-2xl p-6 sm:p-8 overflow-hidden" style={{ minHeight: 420 }}>
          {/* World map SVG */}
          <svg
            className="absolute inset-4 sm:inset-8"
            viewBox="0 0 1000 500"
            preserveAspectRatio="xMidYMid meet"
            style={{ opacity: 0.12 }}
          >
            {/* North America */}
            <path d="M 50,100 C 55,85 70,75 90,70 C 110,65 130,60 150,58 C 170,56 185,55 200,60 C 215,65 225,72 235,80 C 240,85 242,90 240,98 C 238,106 230,115 225,125 C 220,135 218,142 215,150 C 212,158 210,165 205,175 C 200,185 195,195 190,200 C 185,205 178,208 172,210 C 166,212 160,212 155,215 C 148,218 140,225 132,230 C 124,235 116,238 108,235 C 100,232 95,225 90,215 C 85,205 82,192 78,180 C 74,168 70,155 68,145 C 65,135 62,128 58,120 C 54,112 50,108 48,105 Z" fill="hsl(var(--foreground))" />
            {/* Central America */}
            <path d="M 150,215 C 155,220 158,228 160,235 C 162,242 162,248 160,255 C 158,260 154,264 148,265 C 142,266 138,264 135,260 C 132,256 130,250 130,243 C 130,236 132,228 136,222 C 140,216 145,213 150,215 Z" fill="hsl(var(--foreground))" />
            {/* South America */}
            <path d="M 175,265 C 182,260 190,258 198,262 C 206,266 212,275 216,285 C 220,295 222,308 222,320 C 222,332 220,345 216,358 C 212,371 206,382 200,392 C 194,402 188,410 180,418 C 172,426 165,430 158,428 C 151,426 146,418 142,408 C 138,398 136,385 136,372 C 136,359 138,345 140,332 C 142,319 146,308 150,298 C 154,288 160,280 165,273 C 170,266 174,264 175,265 Z" fill="hsl(var(--foreground))" />
            {/* Europe */}
            <path d="M 310,65 C 320,60 332,58 345,60 C 358,62 370,68 380,75 C 390,82 395,90 398,100 C 400,110 398,118 395,125 C 392,132 386,138 378,142 C 370,146 362,148 352,148 C 342,148 332,145 325,140 C 318,135 312,128 308,120 C 304,112 302,102 305,92 C 308,82 312,72 310,65 Z" fill="hsl(var(--foreground))" />
            {/* UK */}
            <path d="M 298,72 C 302,68 308,66 312,70 C 316,74 316,80 314,86 C 312,92 308,96 304,94 C 300,92 298,86 298,80 C 298,76 298,74 298,72 Z" fill="hsl(var(--foreground))" />
            {/* Africa */}
            <path d="M 340,165 C 350,158 362,155 375,158 C 388,161 400,170 408,182 C 416,194 420,210 422,228 C 424,246 422,265 418,282 C 414,299 408,315 400,330 C 392,345 382,358 372,368 C 362,378 352,385 342,388 C 332,391 322,388 315,380 C 308,372 304,360 302,345 C 300,330 302,312 305,295 C 308,278 314,262 320,248 C 326,234 332,222 336,210 C 340,198 342,185 342,175 C 342,168 341,164 340,165 Z" fill="hsl(var(--foreground))" />
            {/* Middle East */}
            <path d="M 400,145 C 410,140 422,138 435,142 C 448,146 458,155 465,168 C 468,175 468,182 465,188 C 462,194 455,198 448,200 C 441,202 432,200 425,195 C 418,190 412,182 408,172 C 404,162 402,152 400,145 Z" fill="hsl(var(--foreground))" />
            {/* India */}
            <path d="M 475,170 C 485,165 498,164 508,170 C 518,176 525,188 528,202 C 531,216 530,232 525,245 C 520,258 512,268 502,272 C 492,276 482,274 474,266 C 466,258 462,245 460,230 C 458,215 460,200 465,188 C 470,176 475,170 475,170 Z" fill="hsl(var(--foreground))" />
            {/* Russia/Central Asia */}
            <path d="M 385,55 C 405,48 430,45 460,46 C 490,47 525,52 560,55 C 595,58 630,62 660,60 C 690,58 715,52 735,50 C 755,48 770,50 778,55 C 786,60 788,68 785,78 C 782,88 775,98 765,105 C 755,112 742,115 728,115 C 714,115 700,112 685,108 C 670,104 655,100 640,98 C 625,96 610,96 595,98 C 580,100 565,104 550,105 C 535,106 520,104 505,100 C 490,96 475,90 462,84 C 449,78 438,72 428,68 C 418,64 410,62 402,62 C 394,62 388,65 385,55 Z" fill="hsl(var(--foreground))" />
            {/* China/East Asia */}
            <path d="M 570,115 C 585,108 605,105 625,110 C 645,115 665,128 678,142 C 691,156 698,172 700,185 C 702,198 698,208 690,215 C 682,222 670,225 658,222 C 646,219 635,210 625,198 C 615,186 608,172 600,160 C 592,148 585,138 578,130 C 571,122 568,118 570,115 Z" fill="hsl(var(--foreground))" />
            {/* Japan */}
            <path d="M 722,130 C 726,125 732,122 736,126 C 740,130 742,138 742,148 C 742,158 740,168 736,175 C 732,182 728,185 724,180 C 720,175 718,165 718,155 C 718,145 720,135 722,130 Z" fill="hsl(var(--foreground))" />
            {/* Southeast Asia */}
            <path d="M 620,225 C 630,220 642,218 655,222 C 668,226 680,235 688,248 C 696,261 700,278 698,292 C 696,306 688,315 678,318 C 668,321 656,318 645,310 C 634,302 625,290 620,275 C 615,260 614,245 616,235 C 618,228 619,225 620,225 Z" fill="hsl(var(--foreground))" />
            {/* Indonesia */}
            <path d="M 640,300 C 652,296 668,295 685,298 C 702,301 720,308 732,315 C 740,320 742,325 738,328 C 734,331 724,332 712,330 C 700,328 686,324 672,318 C 658,312 648,306 642,302 Z" fill="hsl(var(--foreground))" />
            {/* Philippines */}
            <path d="M 720,240 C 724,235 730,232 734,236 C 738,240 740,248 740,258 C 740,268 738,278 734,285 C 730,292 726,295 722,290 C 718,285 716,275 716,264 C 716,253 718,244 720,240 Z" fill="hsl(var(--foreground))" />
            {/* Australia */}
            <path d="M 680,345 C 698,338 720,335 742,340 C 764,345 785,358 798,372 C 811,386 818,402 815,415 C 812,428 800,435 785,438 C 770,441 752,438 735,430 C 718,422 702,410 692,395 C 682,380 678,365 678,355 C 678,348 679,344 680,345 Z" fill="hsl(var(--foreground))" />
            {/* New Zealand */}
            <path d="M 820,415 C 824,410 830,408 834,412 C 838,416 840,424 840,432 C 840,440 838,446 834,448 C 830,450 826,448 824,442 C 822,436 820,428 820,422 C 820,418 820,415 820,415 Z" fill="hsl(var(--foreground))" />
            {/* Greenland */}
            <path d="M 215,25 C 228,20 245,18 260,22 C 275,26 288,35 295,45 C 302,55 302,65 295,72 C 288,79 275,82 262,78 C 249,74 238,65 230,55 C 222,45 218,35 215,28 Z" fill="hsl(var(--foreground))" />
          </svg>

          {/* Grid overlay */}
          <svg
            className="absolute inset-4 sm:inset-8"
            viewBox="0 0 1000 500"
            preserveAspectRatio="xMidYMid meet"
            style={{ opacity: 0.04 }}
          >
            {[100, 200, 300, 400].map((y) => (
              <line key={`h-${y}`} x1="0" y1={y} x2="1000" y2={y} stroke="hsl(var(--foreground))" strokeWidth="1" strokeDasharray="8,8" />
            ))}
            {[200, 400, 600, 800].map((x) => (
              <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="500" stroke="hsl(var(--foreground))" strokeWidth="1" strokeDasharray="8,8" />
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
