import { motion, AnimatePresence } from "framer-motion";
import { X, Building2, Users, Rocket, Briefcase, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Startup } from "@/lib/startupData";

interface StartupDetailModalProps {
  startup: Startup | null;
  onClose: () => void;
  onInterested: () => void;
  onPass: () => void;
}

export function StartupDetailModal({ startup, onClose, onInterested, onPass }: StartupDetailModalProps) {
  if (!startup) return null;

  const initials = startup.name.split(" ").map(w => w[0]).join("").slice(0, 2);
  const stageColors: Record<string, string> = {
    Idea: "bg-accent/15 text-accent border-accent/30",
    MVP: "bg-primary/15 text-primary border-primary/30",
    "Pre-Seed": "bg-green-400/15 text-green-400 border-green-400/30",
    Seed: "bg-blue-400/15 text-blue-400 border-blue-400/30",
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 20 }}
          className="relative w-full max-w-sm max-h-[80vh] rounded-2xl bg-card border border-border shadow-2xl overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-card/80 flex items-center justify-center text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl mb-3">
              <span className="text-xl font-display font-bold text-primary-foreground">{initials}</span>
            </div>
            <h2 className="font-display font-bold text-lg text-foreground">{startup.name}</h2>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <Building2 className="w-3 h-3" /> Founded by {startup.founder}
            </p>
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border mt-2 ${stageColors[startup.stage] || ""}`}>
              {startup.stage}
            </span>
          </div>

          <div className="p-4 space-y-4">
            {/* Industry & Team */}
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-muted/30 border border-border p-3 text-center">
                <Rocket className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="text-xs font-semibold text-foreground">{startup.industry}</p>
                <p className="text-[9px] text-muted-foreground">Industry</p>
              </div>
              <div className="rounded-xl bg-muted/30 border border-border p-3 text-center">
                <Users className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="text-xs font-semibold text-foreground">{startup.teamSize} members</p>
                <p className="text-[9px] text-muted-foreground">Team Size</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">About</p>
              <p className="text-xs text-foreground/90 leading-relaxed">{startup.description}</p>
            </div>

            {/* Open Roles */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Briefcase className="w-3.5 h-3.5 text-primary" />
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Open Roles</p>
              </div>
              <div className="space-y-1.5">
                {startup.openRoles.map((role) => (
                  <div key={role} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/15">
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span className="text-xs font-medium text-foreground">{role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Match Score */}
            <div className="rounded-xl bg-accent/5 border border-accent/20 p-3 flex items-center gap-3">
              <div className="relative w-10 h-10 flex-shrink-0">
                <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                  <path d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
                  <path d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0-31.831"
                    fill="none" stroke="hsl(var(--primary))" strokeWidth="3"
                    strokeDasharray={`${startup.matchScore}, 100`} strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-primary">{startup.matchScore}%</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">Match Score</p>
                <p className="text-[10px] text-muted-foreground">Based on skills, interests & goals</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <Button variant="outline" className="flex-1 border-border" onClick={onPass}>
                <X className="w-4 h-4 mr-1.5 text-destructive" /> Skip
              </Button>
              <Button className="flex-1 bg-primary text-primary-foreground" onClick={onInterested}>
                <Check className="w-4 h-4 mr-1.5" /> Connect
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
