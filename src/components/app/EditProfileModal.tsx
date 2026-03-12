import { useState } from "react";
import { X, Plus, Save, MapPin, Briefcase, GraduationCap, Globe, Clock, Camera, Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

interface ProfileData {
  name: string;
  title: string;
  location: string;
  badges: { label: string; icon: React.ComponentType<{ className?: string }> }[];
  stats: { label: string; value: string }[];
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
  // Mindset
  "🎯 Goal-Oriented", "🧠 Problem Solver", "🚀 High-Energy", "📊 Data-Driven",
  "💪 Competitive", "🤝 Connector", "📈 Metrics-Obsessed", "🧘 Mindful",
  "🎨 Creative", "💡 Visionary", "🔥 Hustler", "🧩 Systems Thinker",
  "🫶 Empathetic", "⚡ Fast Learner", "🎲 Risk Taker", "🛡️ Resilient",
  // Hobbies & Lifestyle
  "☕ Coffee Enthusiast", "📚 Avid Reader", "🏃 Marathon Runner", "🎸 Guitar Player",
  "✈️ Travel Junkie", "🎾 Tennis Player", "🍷 Wine Enthusiast", "🏋️ Gym Rat",
  "🎮 Gamer", "🌮 Foodie", "🐕 Dog Lover", "🎬 Film Buff",
  "🎤 Public Speaker", "🏄 Surfer", "🎧 Music Producer", "📷 Photographer",
  "🧑‍🍳 Home Chef", "🚴 Cyclist", "⛷️ Skier", "🏕️ Outdoor Adventurer",
  "🎭 Theater Lover", "✍️ Writer", "🪴 Plant Parent", "🧗 Rock Climber",
  "♟️ Chess Player", "🎹 Pianist", "🏌️ Golfer", "🤿 Scuba Diver",
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

  const SectionHeader = ({ icon: Icon, label, count }: { icon: React.ComponentType<{ className?: string }>; label: string; count?: number }) => (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5 text-primary" />
        <Label className="text-[11px] text-foreground font-semibold uppercase tracking-wider">{label}</Label>
      </div>
      {count !== undefined && (
        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
          {count} selected
        </span>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="relative w-full max-w-lg max-h-[90vh] rounded-2xl bg-card border border-border shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/30">
          <h2 className="font-display text-sm font-bold text-foreground">Edit Profile</h2>
          <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <ScrollArea className="flex-1 max-h-[calc(90vh-120px)]">
          <div className="p-5 space-y-6">
            {/* Avatar & Basic Info */}
            <div className="flex items-start gap-4">
              <div className="relative group cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center ring-2 ring-primary/20">
                  <span className="text-lg font-display font-bold text-primary-foreground">{initials}</span>
                </div>
                <div className="absolute inset-0 rounded-full bg-background/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-4 h-4 text-foreground" />
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <Label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 block">Full Name</Label>
                  <Input value={form.name} onChange={(e) => update("name", e.target.value)} className="h-8 text-xs bg-background" />
                </div>
                <div>
                  <Label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 block">Title / Headline</Label>
                  <Input value={form.title} onChange={(e) => update("title", e.target.value)} className="h-8 text-xs bg-background" />
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <Label className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center gap-1 mb-1">
                <MapPin className="w-3 h-3" /> Location
              </Label>
              <Input value={form.location} onChange={(e) => update("location", e.target.value)} className="h-8 text-xs bg-background" />
            </div>

            {/* Bio / Pitch */}
            <div>
              <Label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 block">{form.ideaTitle}</Label>
              <Textarea value={form.ideaDesc} onChange={(e) => update("ideaDesc", e.target.value)} className="text-xs bg-background min-h-[70px]" />
            </div>

            <div className="h-px bg-border/50" />

            {/* Personality & Hobbies - Checkbox Grid */}
            <div>
              <SectionHeader icon={Zap} label="Personality & Hobbies" count={form.personality.length} />
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 max-h-[200px] overflow-y-auto pr-1 rounded-lg bg-muted/20 border border-border/50 p-3">
                {PERSONALITY_OPTIONS.map((tag) => {
                  const selected = form.personality.includes(tag);
                  return (
                    <label
                      key={tag}
                      className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-colors text-[11px] ${
                        selected
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                      }`}
                    >
                      <Checkbox
                        checked={selected}
                        onCheckedChange={() => toggleTag("personality", tag)}
                        className="h-3.5 w-3.5 border-muted-foreground/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <span className="leading-none">{tag}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="h-px bg-border/50" />

            {/* Skills - Checkbox Grid */}
            <div>
              <SectionHeader icon={Briefcase} label="Skills" count={form.skills.length} />
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 max-h-[160px] overflow-y-auto pr-1 rounded-lg bg-muted/20 border border-border/50 p-3">
                {SKILL_OPTIONS.map((tag) => {
                  const selected = form.skills.includes(tag);
                  return (
                    <label
                      key={tag}
                      className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-colors text-[11px] ${
                        selected
                          ? "bg-accent/10 text-accent"
                          : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                      }`}
                    >
                      <Checkbox
                        checked={selected}
                        onCheckedChange={() => toggleTag("skills", tag)}
                        className="h-3.5 w-3.5 border-muted-foreground/40 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                      />
                      <span className="leading-none">{tag}</span>
                    </label>
                  );
                })}
              </div>
              <div className="flex gap-1.5 mt-2">
                <Input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Add custom skill..." className="h-7 text-[10px] bg-background flex-1"
                  onKeyDown={(e) => e.key === "Enter" && addCustomTag("skills", newSkill, () => setNewSkill(""))} />
                <Button size="sm" variant="outline" className="h-7 text-[10px] px-2" onClick={() => addCustomTag("skills", newSkill, () => setNewSkill(""))}>
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>

            <div className="h-px bg-border/50" />

            {/* Interests - Checkbox Grid */}
            <div>
              <SectionHeader icon={Globe} label="Interests" count={form.interests.length} />
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 rounded-lg bg-muted/20 border border-border/50 p-3">
                {INTEREST_OPTIONS.map((tag) => {
                  const selected = form.interests.includes(tag);
                  return (
                    <label
                      key={tag}
                      className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-colors text-[11px] ${
                        selected
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                      }`}
                    >
                      <Checkbox
                        checked={selected}
                        onCheckedChange={() => toggleTag("interests", tag)}
                        className="h-3.5 w-3.5 border-muted-foreground/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <span className="leading-none">{tag}</span>
                    </label>
                  );
                })}
              </div>
              <div className="flex gap-1.5 mt-2">
                <Input value={newInterest} onChange={(e) => setNewInterest(e.target.value)} placeholder="Add custom interest..." className="h-7 text-[10px] bg-background flex-1"
                  onKeyDown={(e) => e.key === "Enter" && addCustomTag("interests", newInterest, () => setNewInterest(""))} />
                <Button size="sm" variant="outline" className="h-7 text-[10px] px-2" onClick={() => addCustomTag("interests", newInterest, () => setNewInterest(""))}>
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>

            <div className="h-px bg-border/50" />

            {/* Details */}
            <div className="space-y-3">
              <SectionHeader icon={Briefcase} label="Details" />
              <div className="space-y-2.5 rounded-lg bg-muted/20 border border-border/50 p-3">
                <div>
                  <Label className="text-[9px] text-muted-foreground uppercase tracking-wider mb-0.5 flex items-center gap-1">
                    <Briefcase className="w-2.5 h-2.5" /> Experience
                  </Label>
                  <Input value={form.experience} onChange={(e) => update("experience", e.target.value)} className="h-7 text-[11px] bg-background" />
                </div>
                <div>
                  <Label className="text-[9px] text-muted-foreground uppercase tracking-wider mb-0.5 flex items-center gap-1">
                    <GraduationCap className="w-2.5 h-2.5" /> Education
                  </Label>
                  <Input value={form.education} onChange={(e) => update("education", e.target.value)} className="h-7 text-[11px] bg-background" />
                </div>
                <div>
                  <Label className="text-[9px] text-muted-foreground uppercase tracking-wider mb-0.5 flex items-center gap-1">
                    <Globe className="w-2.5 h-2.5" /> Languages
                  </Label>
                  <Input value={form.languages} onChange={(e) => update("languages", e.target.value)} className="h-7 text-[11px] bg-background" />
                </div>
              </div>
            </div>

            <div className="h-px bg-border/50" />

            {/* Commitment */}
            <div>
              <SectionHeader icon={Clock} label="Commitment Level" />
              <div className="space-y-1.5 rounded-lg bg-muted/20 border border-border/50 p-3">
                {COMMITMENT_OPTIONS.map((opt) => {
                  const selected = form.commitment === opt;
                  return (
                    <label
                      key={opt}
                      className={`flex items-center gap-2.5 px-2 py-2 rounded-lg cursor-pointer transition-colors text-[11px] ${
                        selected
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        selected ? "border-primary bg-primary" : "border-muted-foreground/40"
                      }`}>
                        {selected && <Check className="w-2.5 h-2.5 text-primary-foreground" />}
                      </div>
                      <span className="leading-none">{opt}</span>
                    </label>
                  );
                })}
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
