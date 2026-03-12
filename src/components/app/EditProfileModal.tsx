import { useState } from "react";
import { X, Plus, Trash2, Save, MapPin, Briefcase, GraduationCap, Globe, Clock, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProfileData {
  name: string;
  title: string;
  location: string;
  ideaDesc: string;
  ideaTitle: string;
  personality: string[];
  skills: string[];
  interests: string[];
  experience: string;
  education: string;
  languages: string;
  commitment: string;
}

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  profile: ProfileData;
  onSave: (updated: ProfileData) => void;
}

const PERSONALITY_OPTIONS = [
  "🎯 Goal-Oriented", "🧠 Problem Solver", "☕ Coffee Enthusiast", "📚 Avid Reader",
  "🏃 Marathon Runner", "🎸 Guitar Player", "🚀 High-Energy", "🤝 Connector",
  "📊 Data-Driven", "✈️ Travel Junkie", "🎾 Tennis Player", "🍷 Wine Enthusiast",
  "💪 Competitive", "🎤 Public Speaker", "📈 Metrics-Obsessed", "🏋️ Gym Rat",
  "🎮 Gamer", "🌮 Foodie", "🎨 Creative", "🧘 Mindful", "🐕 Dog Lover", "🎬 Film Buff",
];

const SKILL_OPTIONS = [
  "Strategy", "BD", "Fundraising", "Product", "GTM", "Sales Strategy", "Growth Hacking",
  "Outbound", "CRM & Ops", "Content Marketing", "Investor Relations", "M&A",
  "Scaling Ops", "Board Mgmt", "Engineering", "Design", "Data Science", "DevOps",
  "UX Research", "Analytics", "Partnerships", "Legal",
];

const INTEREST_OPTIONS = [
  "Fintech", "AI/ML", "SaaS", "B2B", "Climate Tech", "Deep Tech", "Marketplace",
  "EdTech", "HealthTech", "Web3", "Cybersecurity", "E-Commerce", "IoT", "Gaming",
];

const COMMITMENT_OPTIONS = [
  "Full-time · Ready to dive in",
  "Full-time · Immediate availability",
  "Full-time commitment",
  "Part-time · Evenings & weekends",
  "Advisory · Few hours per week",
  "Open to discuss",
];

export function EditProfileModal({ open, onClose, profile, onSave }: EditProfileModalProps) {
  const [form, setForm] = useState<ProfileData>({ ...profile });
  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");

  if (!open) return null;

  const update = <K extends keyof ProfileData>(key: K, value: ProfileData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleTag = (key: "personality" | "skills" | "interests", tag: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(tag) ? prev[key].filter((t) => t !== tag) : [...prev[key], tag],
    }));
  };

  const addCustomTag = (key: "skills" | "interests", value: string, clear: () => void) => {
    if (value.trim() && !form[key].includes(value.trim())) {
      setForm((prev) => ({ ...prev, [key]: [...prev[key], value.trim()] }));
      clear();
    }
  };

  const initials = form.name.split(" ").map((w) => w[0]).join("").slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="relative w-full max-w-md max-h-[90vh] rounded-2xl bg-card border border-border shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/30">
          <h2 className="font-display text-sm font-bold text-foreground">Edit Profile</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>

        <ScrollArea className="flex-1 max-h-[calc(90vh-120px)]">
          <div className="p-4 space-y-5">
            {/* Avatar & Basic Info */}
            <div className="flex items-start gap-4">
              <div className="relative group">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center ring-2 ring-primary/20">
                  <span className="text-lg font-display font-bold text-primary-foreground">{initials}</span>
                </div>
                <div className="absolute inset-0 rounded-full bg-background/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="w-4 h-4 text-foreground" />
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <div>
                  <Label className="text-[10px] text-muted-foreground uppercase tracking-wider">Full Name</Label>
                  <Input value={form.name} onChange={(e) => update("name", e.target.value)} className="h-8 text-xs bg-background" />
                </div>
                <div>
                  <Label className="text-[10px] text-muted-foreground uppercase tracking-wider">Title / Headline</Label>
                  <Input value={form.title} onChange={(e) => update("title", e.target.value)} className="h-8 text-xs bg-background" />
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <Label className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Location
              </Label>
              <Input value={form.location} onChange={(e) => update("location", e.target.value)} className="h-8 text-xs bg-background mt-1" />
            </div>

            {/* Bio / Pitch */}
            <div>
              <Label className="text-[10px] text-muted-foreground uppercase tracking-wider">{form.ideaTitle}</Label>
              <Textarea value={form.ideaDesc} onChange={(e) => update("ideaDesc", e.target.value)} className="text-xs bg-background mt-1 min-h-[70px]" />
            </div>

            {/* Personality & Hobbies */}
            <div>
              <Label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2 block">Personality & Hobbies</Label>
              <div className="flex flex-wrap gap-1.5">
                {PERSONALITY_OPTIONS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag("personality", tag)}
                    className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${
                      form.personality.includes(tag)
                        ? "bg-primary/20 text-primary border-primary/30"
                        : "bg-muted/30 text-muted-foreground border-border hover:border-primary/30 hover:text-primary"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <Label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2 block">Skills</Label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {SKILL_OPTIONS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag("skills", tag)}
                    className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${
                      form.skills.includes(tag)
                        ? "bg-accent/20 text-accent border-accent/30"
                        : "bg-muted/30 text-muted-foreground border-border hover:border-accent/30 hover:text-accent"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              {/* Custom skill */}
              <div className="flex gap-1.5">
                <Input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Add custom skill..." className="h-7 text-[10px] bg-background flex-1"
                  onKeyDown={(e) => e.key === "Enter" && addCustomTag("skills", newSkill, () => setNewSkill(""))} />
                <Button size="sm" variant="outline" className="h-7 text-[10px] px-2" onClick={() => addCustomTag("skills", newSkill, () => setNewSkill(""))}>
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Interests */}
            <div>
              <Label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2 block">Interests</Label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {INTEREST_OPTIONS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag("interests", tag)}
                    className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${
                      form.interests.includes(tag)
                        ? "bg-primary/20 text-primary border-primary/30"
                        : "bg-muted/30 text-muted-foreground border-border hover:border-primary/30 hover:text-primary"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <div className="flex gap-1.5">
                <Input value={newInterest} onChange={(e) => setNewInterest(e.target.value)} placeholder="Add custom interest..." className="h-7 text-[10px] bg-background flex-1"
                  onKeyDown={(e) => e.key === "Enter" && addCustomTag("interests", newInterest, () => setNewInterest(""))} />
                <Button size="sm" variant="outline" className="h-7 text-[10px] px-2" onClick={() => addCustomTag("interests", newInterest, () => setNewInterest(""))}>
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2">
              <Label className="text-[10px] text-muted-foreground uppercase tracking-wider block">Details</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-primary shrink-0" />
                  <Input value={form.experience} onChange={(e) => update("experience", e.target.value)} className="h-7 text-[10px] bg-background" />
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-primary shrink-0" />
                  <Input value={form.education} onChange={(e) => update("education", e.target.value)} className="h-7 text-[10px] bg-background" />
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-primary shrink-0" />
                  <Input value={form.languages} onChange={(e) => update("languages", e.target.value)} className="h-7 text-[10px] bg-background" />
                </div>
              </div>
            </div>

            {/* Commitment */}
            <div>
              <Label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Commitment Level
              </Label>
              <div className="flex flex-wrap gap-1.5">
                {COMMITMENT_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => update("commitment", opt)}
                    className={`text-[10px] px-2.5 py-1 rounded-full border transition-colors ${
                      form.commitment === opt
                        ? "bg-primary/20 text-primary border-primary/30"
                        : "bg-muted/30 text-muted-foreground border-border hover:border-primary/30"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-border/30 flex gap-2">
          <Button variant="outline" className="flex-1 text-xs" onClick={onClose}>Cancel</Button>
          <Button className="flex-1 text-xs bg-primary text-primary-foreground" onClick={() => { onSave(form); onClose(); }}>
            <Save className="w-3.5 h-3.5 mr-1" /> Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
