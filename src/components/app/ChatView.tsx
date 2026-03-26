import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, UserPlus, Paperclip, Phone, Building2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { profiles, type Profile } from "@/lib/profileData";
import type { Startup } from "@/lib/startupData";

interface Message {
  id: number;
  sender: "me" | "them";
  text: string;
  time: string;
}

const DEMO_CHATS: Record<number, Message[]> = {
  1: [
    { id: 1, sender: "them", text: "Hey! I saw you're interested in fintech startups 🚀", time: "2:30 PM" },
    { id: 2, sender: "me", text: "Yes! I'm looking for a technical co-founder for my supply chain idea.", time: "2:32 PM" },
    { id: 3, sender: "them", text: "That sounds interesting. I have experience building payments infrastructure at Gojek. Would love to learn more!", time: "2:35 PM" },
  ],
  2: [
    { id: 1, sender: "them", text: "Hi! I noticed we both have interest in EdTech. I'm designing an AI tutoring marketplace.", time: "11:00 AM" },
    { id: 2, sender: "me", text: "That's exactly the kind of product I'd love to work on!", time: "11:05 AM" },
  ],
  3: [
    { id: 1, sender: "them", text: "Hey, I'm working on an AI code review tool. Looking for a business co-founder.", time: "9:15 AM" },
  ],
};

const STARTUP_DEMO_CHATS: Record<number, Message[]> = {
  101: [
    { id: 1, sender: "them", text: "Hi! We saw your profile and think you'd be a great fit for PayFlow AI as our Technical Co-Founder 🚀", time: "10:00 AM" },
    { id: 2, sender: "me", text: "Thanks! I'm really interested in payment infrastructure. Tell me more about the tech stack.", time: "10:15 AM" },
    { id: 3, sender: "them", text: "We're building on Python/FastAPI with React frontend. Processing 10K+ transactions in our MVP already!", time: "10:20 AM" },
  ],
  102: [
    { id: 1, sender: "them", text: "Hey! GreenCarbon is looking for a technical co-founder. Interested in climate tech?", time: "3:00 PM" },
    { id: 2, sender: "me", text: "Absolutely! Carbon credit tracking is a huge opportunity in SEA.", time: "3:10 PM" },
  ],
  103: [
    { id: 1, sender: "them", text: "Hi there! MedAI Assist is scaling our ML team. Would love to chat about the role.", time: "9:00 AM" },
  ],
};

interface ChatViewProps {
  activeChat?: Profile | null;
  activeChatStartup?: Startup | null;
  isStartupMode?: boolean;
  connectedStartups?: Startup[];
  onAddToTeam?: (profile: Profile) => void;
}

export function ChatView({ activeChat, activeChatStartup, isStartupMode, connectedStartups = [], onAddToTeam }: ChatViewProps) {
  const chatProfiles = profiles.slice(0, 3);
  
  // Startup mode
  const startupChatList = connectedStartups.length > 0 ? connectedStartups : [];
  const defaultStartupId = activeChatStartup?.id || startupChatList[0]?.id;
  
  const [selectedId, setSelectedId] = useState<number>(activeChat?.id || chatProfiles[0]?.id || 1);
  const [selectedStartupId, setSelectedStartupId] = useState<number | undefined>(defaultStartupId);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Record<number, Message[]>>(DEMO_CHATS);
  const [startupMessages, setStartupMessages] = useState<Record<number, Message[]>>(STARTUP_DEMO_CHATS);

  // Sync active chat startup
  if (activeChatStartup && selectedStartupId !== activeChatStartup.id) {
    setSelectedStartupId(activeChatStartup.id);
  }

  if (isStartupMode) {
    const selectedStartup = startupChatList.find(s => s.id === selectedStartupId) || startupChatList[0];
    const chat = selectedStartupId ? (startupMessages[selectedStartupId] || []) : [];

    const sendMessage = () => {
      if (!input.trim() || !selectedStartupId) return;
      const newMsg: Message = {
        id: Date.now(),
        sender: "me",
        text: input,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setStartupMessages(prev => ({ ...prev, [selectedStartupId]: [...(prev[selectedStartupId] || []), newMsg] }));
      setInput("");
    };

    if (startupChatList.length === 0) {
      return (
        <div className="h-full flex items-center justify-center text-center p-6">
          <div>
            <Building2 className="w-10 h-10 text-muted-foreground/20 mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">No startup conversations yet. Match with startups first!</p>
          </div>
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col">
        {/* Startup chat list */}
        <div className="border-b border-border flex-shrink-0">
          <ScrollArea className="w-full">
            <div className="flex gap-1 p-2">
              {startupChatList.map((s) => {
                const initials = s.name.split(" ").map(w => w[0]).join("").slice(0, 2);
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStartupId(s.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl flex-shrink-0 transition-colors ${
                      selectedStartupId === s.id ? "bg-primary/10 border border-primary/30" : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-display font-bold text-primary-foreground">{initials}</span>
                    </div>
                    <div className="text-left">
                      <p className="text-[11px] font-semibold text-foreground whitespace-nowrap">{s.name}</p>
                      <p className="text-[9px] text-muted-foreground whitespace-nowrap">{s.industry}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Chat header */}
        {selectedStartup && (
          <div className="p-2.5 border-b border-border/50 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-[10px] font-display font-bold text-primary-foreground">
                  {selectedStartup.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">{selectedStartup.name}</p>
                <p className="text-[9px] text-muted-foreground">{selectedStartup.industry} · {selectedStartup.stage}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                <Phone className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Messages */}
        <ScrollArea className="flex-1 p-3">
          <div className="space-y-2.5">
            {chat.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ y: 8, opacity: 0, scale: 0.97 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, ease: "easeOut", delay: i < 5 ? i * 0.05 : 0 }}
                className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                  msg.sender === "me"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm"
                }`}>
                  <p className="text-xs leading-relaxed">{msg.text}</p>
                  <p className={`text-[9px] mt-0.5 ${msg.sender === "me" ? "text-primary-foreground/50" : "text-muted-foreground"}`}>{msg.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-2.5 border-t border-border flex gap-2 flex-shrink-0">
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground flex-shrink-0">
            <Paperclip className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 text-xs px-3 py-2 rounded-full bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
          />
          <button onClick={sendMessage} className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 hover:bg-primary/90 transition-colors active:scale-95">
            <Send className="w-3.5 h-3.5 text-primary-foreground" />
          </button>
        </div>
      </div>
    );
  }

  // People mode (original)
  const selected = profiles.find((p) => p.id === selectedId) || chatProfiles[0];
  const chat = messages[selectedId] || [];

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: Date.now(),
      sender: "me",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => ({ ...prev, [selectedId]: [...(prev[selectedId] || []), newMsg] }));
    setInput("");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-border flex-shrink-0">
        <ScrollArea className="w-full">
          <div className="flex gap-1 p-2">
            {chatProfiles.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl flex-shrink-0 transition-colors ${
                  selectedId === p.id ? "bg-primary/10 border border-primary/30" : "hover:bg-muted/50"
                }`}
              >
                <img src={p.photo} alt={p.name} className="w-8 h-8 rounded-full object-cover" />
                <div className="text-left hidden sm:block">
                  <p className="text-[11px] font-semibold text-foreground">{p.name}</p>
                  <p className="text-[9px] text-muted-foreground">{p.role}</p>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="p-2.5 border-b border-border/50 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <img src={selected.photo} alt={selected.name} className="w-8 h-8 rounded-full object-cover" />
          <div>
            <p className="text-xs font-semibold text-foreground">{selected.name}</p>
            <p className="text-[9px] text-muted-foreground">{selected.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <Phone className="w-3.5 h-3.5" />
          </button>
          {onAddToTeam && (
            <button
              onClick={() => onAddToTeam(selected)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-primary/10 text-primary text-[10px] font-semibold hover:bg-primary/20 transition-colors"
            >
              <UserPlus className="w-3 h-3" />
              Add to Team
            </button>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 p-3">
        <div className="space-y-2.5">
          {chat.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                msg.sender === "me"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-muted text-foreground rounded-bl-sm"
              }`}>
                <p className="text-xs leading-relaxed">{msg.text}</p>
                <p className={`text-[9px] mt-0.5 ${msg.sender === "me" ? "text-primary-foreground/50" : "text-muted-foreground"}`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-2.5 border-t border-border flex gap-2 flex-shrink-0">
        <button className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground flex-shrink-0">
          <Paperclip className="w-4 h-4" />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 text-xs px-3 py-2 rounded-full bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
        />
        <button onClick={sendMessage} className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 hover:bg-primary/90 transition-colors active:scale-95">
          <Send className="w-3.5 h-3.5 text-primary-foreground" />
        </button>
      </div>
    </div>
  );
}
