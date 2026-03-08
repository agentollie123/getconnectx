import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import type { Profile } from "@/lib/profileData";

interface ProfileCardProps {
  profile: Profile;
  index?: number;
  showCommitment?: boolean;
  onConnect?: () => void;
  onSkip?: () => void;
  compact?: boolean;
}

export function ProfileCard({ profile, index = 0, showCommitment, onConnect, onSkip, compact }: ProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass-card rounded-xl overflow-hidden group hover:border-primary/30 transition-all duration-300"
    >
      <div className={`p-5 ${compact ? "p-4" : ""}`}>
        <div className="flex items-center gap-3 mb-4">
          <img
            src={profile.photo}
            alt={profile.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
          />
          <div className="min-w-0">
            <h4 className="font-display font-semibold text-foreground truncate">{profile.name}</h4>
            <p className="text-sm text-muted-foreground truncate">{profile.role}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {profile.skills.map((skill) => (
            <span
              key={skill}
              className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {profile.interests.map((interest) => (
            <span
              key={interest}
              className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20"
            >
              {interest}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
          <Badge variant="outline" className="text-xs border-border">
            {profile.lookingFor === "Both" ? "Co-founder & Team" : profile.lookingFor}
          </Badge>
          {showCommitment && (
            <Badge variant="outline" className="text-xs border-border">
              {profile.commitment}
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={onConnect}
          >
            <UserPlus className="w-3.5 h-3.5 mr-1.5" />
            Connect
          </Button>
          {onSkip && (
            <Button
              size="sm"
              variant="outline"
              className="border-border text-muted-foreground hover:text-foreground"
              onClick={onSkip}
            >
              Skip
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
