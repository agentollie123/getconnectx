import { Users, Link2, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: Users, label: "Builders on ConnectX", value: "12,000+" },
  { icon: Link2, label: "Connections Made", value: "80,000+" },
  { icon: Rocket, label: "Startup Teams Forming", value: "300+" },
];

export function NetworkStats() {
  return (
    <div className="flex items-center gap-4 overflow-x-auto">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 flex-shrink-0"
        >
          <s.icon className="w-3.5 h-3.5 text-primary" />
          <span className="text-[10px] font-bold text-foreground whitespace-nowrap">{s.value}</span>
          <span className="text-[10px] text-muted-foreground whitespace-nowrap hidden sm:inline">{s.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
