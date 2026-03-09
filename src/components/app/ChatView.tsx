import { useState } from "react";
import { Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { profiles, type Profile } from "@/lib/profileData";

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

interface ChatViewProps {
  activeChat?: Profile | null;
}

export function ChatView({ activeChat }: ChatViewProps) {
  const chatProfiles = profiles.slice(0, 3);
  const [selectedId, setSelectedId] = useState<number>(activeChat?.id || chatProfiles[0]?.id || 1);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Record<number, Message[]>>(DEMO_CHATS);

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
    <div className="h-full flex">
      {/* Left - chat list */}
      <div className="w-20 sm:w-64 border-r border-border flex flex-col">
        <div className="p-3 border-b border-border">
          <h3 className="font-display font-bold text-foreground text-sm hidden sm:block">Messages</h3>
        </div>
        <ScrollArea className="flex-1">
          {chatProfiles.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={`w-full flex items-center gap-2.5 p-3 text-left hover:bg-muted/50 transition-colors ${
                selectedId === p.id ? "bg-primary/5 border-r-2 border-primary" : ""
              }`}
            >
              <img src={p.photo} alt={p.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
              <div className="min-w-0 hidden sm:block">
                <p className="text-xs font-semibold text-foreground truncate">{p.name}</p>
                <p className="text-[10px] text-muted-foreground truncate">{p.role}</p>
              </div>
            </button>
          ))}
        </ScrollArea>
      </div>

      {/* Right - conversation */}
      <div className="flex-1 flex flex-col">
        <div className="p-3 border-b border-border flex items-center gap-2.5">
          <img src={selected.photo} alt={selected.name} className="w-8 h-8 rounded-full object-cover" />
          <div>
            <p className="text-sm font-semibold text-foreground">{selected.name}</p>
            <p className="text-[10px] text-muted-foreground">{selected.role}</p>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-3">
            {chat.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-3.5 py-2 ${
                  msg.sender === "me"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                }`}>
                  <p className="text-xs leading-relaxed">{msg.text}</p>
                  <p className={`text-[9px] mt-1 ${msg.sender === "me" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-3 border-t border-border flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 text-xs px-3 py-2 rounded-full bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
          />
          <button onClick={sendMessage} className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 hover:bg-primary/90 transition-colors">
            <Send className="w-3.5 h-3.5 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
