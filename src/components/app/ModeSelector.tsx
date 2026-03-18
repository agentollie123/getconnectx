import { motion } from "framer-motion";
import { MODE_CARDS, type MatchingMode } from "./ModeConfig";

interface ModeSelectorProps {
  activeMode: MatchingMode;
  onModeChange: (mode: MatchingMode) => void;
}

export function ModeSelector({ activeMode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="mb-4">
      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
        Your Goal Right Now
      </p>
      <div className="grid grid-cols-2 gap-1.5">
        {MODE_CARDS.map((card) => {
          const isActive = activeMode === card.mode;
          const Icon = card.icon;
          return (
            <motion.button
              key={card.mode}
              onClick={() => onModeChange(card.mode)}
              whileTap={{ scale: 0.97 }}
              className={`relative flex flex-col items-start gap-1 p-2.5 rounded-xl border transition-all duration-200 text-left ${
                isActive
                  ? "bg-primary/10 border-primary shadow-[0_0_12px_hsl(var(--primary)/0.15)]"
                  : "bg-card/50 border-border/40 hover:border-border/80"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-[10px] font-bold leading-tight ${isActive ? "text-primary" : "text-foreground"}`}>
                  {card.label}
                </span>
              </div>
              <span className={`text-[9px] leading-tight ${isActive ? "text-primary/70" : "text-muted-foreground/60"}`}>
                {card.sublabel}
              </span>
              {isActive && (
                <motion.div
                  layoutId="mode-indicator"
                  className="absolute inset-0 rounded-xl border-2 border-primary pointer-events-none"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
