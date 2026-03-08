import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 glass-card border-b border-border/30 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="font-display font-bold text-primary-foreground text-sm">CX</span>
          </div>
          <span className="font-display font-bold text-lg text-foreground">ConnectX</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#modes" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Ecosystem</a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
          <a href="#playground" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Playground</a>
          <Link to="/app" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Web App</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            Log In
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Start Exploring
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass-card border-t border-border/30 px-4 pb-4 space-y-3">
          <a href="#modes" className="block text-sm text-muted-foreground py-2" onClick={() => setOpen(false)}>Ecosystem</a>
          <a href="#how-it-works" className="block text-sm text-muted-foreground py-2" onClick={() => setOpen(false)}>How It Works</a>
          <a href="#playground" className="block text-sm text-muted-foreground py-2" onClick={() => setOpen(false)}>Playground</a>
          <Link to="/app" className="block text-sm text-muted-foreground py-2" onClick={() => setOpen(false)}>Web App</Link>
          <Button size="sm" className="w-full bg-primary text-primary-foreground">Start Exploring</Button>
        </div>
      )}
    </nav>
  );
}
