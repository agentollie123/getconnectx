import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/profileData";

interface AddToTeamModalProps {
  profile: Profile | null;
  onClose: () => void;
  onConfirm: (role: string, equity: number, commitment: string) => void;
}

const ROLES = ["Co-Founder", "CTO", "Engineer", "Product Manager", "Designer", "Marketing", "Operations"];
const COMMITMENTS = ["Full-time", "Part-time", "Advisor"];

export function AddToTeamModal({ profile, onClose, onConfirm }: AddToTeamModalProps) {
  const [role, setRole] = useState("Co-Founder");
  const [equity, setEquity] = useState(10);
  const [commitment, setCommitment] = useState("Full-time");

  if (!profile) return null;

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
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 20 }}
          className="relative w-full max-w-sm rounded-2xl bg-card border border-border p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-5">
            <img src={profile.photo} alt={profile.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/30" />
            <div>
              <h3 className="font-display font-bold text-foreground">{profile.name}</h3>
              <p className="text-xs text-muted-foreground">{profile.role}</p>
            </div>
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="text-xs font-semibold text-foreground mb-2 block">Assign Role</label>
            <div className="flex flex-wrap gap-1.5">
              {ROLES.map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`text-xs px-2.5 py-1.5 rounded-full border transition-colors ${
                    role === r
                      ? "bg-primary/20 text-primary border-primary/40"
                      : "bg-muted/30 border-border text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Equity */}
          <div className="mb-4">
            <label className="text-xs font-semibold text-foreground mb-2 flex items-center justify-between">
              <span>Equity Share</span>
              <span className="text-primary font-bold">{equity}%</span>
            </label>
            <input
              type="range"
              min={1}
              max={50}
              value={equity}
              onChange={(e) => setEquity(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>1%</span>
              <span>50%</span>
            </div>
          </div>

          {/* Commitment */}
          <div className="mb-5">
            <label className="text-xs font-semibold text-foreground mb-2 block">Commitment</label>
            <div className="flex gap-2">
              {COMMITMENTS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCommitment(c)}
                  className={`flex-1 text-xs py-2 rounded-xl border transition-colors ${
                    commitment === c
                      ? "bg-primary/20 text-primary border-primary/40"
                      : "bg-muted/30 border-border text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold"
            onClick={() => onConfirm(role, equity, commitment)}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Confirm Add to Team
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
