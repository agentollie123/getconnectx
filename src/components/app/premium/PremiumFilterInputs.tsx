import { useState } from "react";
import { Input } from "@/components/ui/input";

// --- Checkbox list with search ---
export function FilterCheckboxList({ options, selected, onChange, maxVisible = 999, searchable = false, placeholder = "Search..." }: {
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
  maxVisible?: number;
  searchable?: boolean;
  placeholder?: string;
}) {
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filtered = searchable
    ? options.filter((o) => o.toLowerCase().includes(search.toLowerCase()))
    : options;
  const visible = showAll ? filtered : filtered.slice(0, maxVisible);
  const hasMore = filtered.length > maxVisible && !showAll;

  const toggle = (v: string) => {
    onChange(selected.includes(v) ? selected.filter((s) => s !== v) : [...selected, v]);
  };

  return (
    <div className="space-y-1.5">
      {searchable && (
        <Input
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 text-[11px] bg-background/50 border-border/50 placeholder:text-muted-foreground/40 rounded-lg"
        />
      )}
      <div className="max-h-40 overflow-y-auto space-y-0.5 pr-0.5">
        {visible.map((o) => (
          <label
            key={o}
            className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-muted/30 cursor-pointer transition-colors group"
          >
            <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all flex-shrink-0 ${
              selected.includes(o)
                ? "bg-primary border-primary"
                : "border-border/60 group-hover:border-primary/40"
            }`}>
              {selected.includes(o) && (
                <svg className="w-2.5 h-2.5 text-primary-foreground" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span className="text-[11px] text-foreground/80">{o}</span>
          </label>
        ))}
        {filtered.length === 0 && (
          <p className="text-[10px] text-muted-foreground py-2 text-center">No results</p>
        )}
      </div>
      {hasMore && (
        <button
          onClick={() => setShowAll(true)}
          className="text-[10px] text-primary hover:text-primary/80 font-medium transition-colors"
        >
          Show {filtered.length - maxVisible} more →
        </button>
      )}
      {showAll && filtered.length > maxVisible && (
        <button
          onClick={() => setShowAll(false)}
          className="text-[10px] text-muted-foreground hover:text-foreground font-medium transition-colors"
        >
          Show less
        </button>
      )}
    </div>
  );
}

// --- Chip tags ---
export function FilterChips({ options, selected, onChange }: {
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (v: string) => {
    onChange(selected.includes(v) ? selected.filter((s) => s !== v) : [...selected, v]);
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => toggle(o)}
          className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all duration-150 ${
            selected.includes(o)
              ? "bg-primary/15 text-primary border-primary/30 font-medium"
              : "bg-background/30 border-border/40 text-muted-foreground hover:border-primary/20 hover:text-foreground"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

// --- Section label ---
export function FilterLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{children}</p>
  );
}

// --- Dropdown select ---
export function FilterDropdown({ options, value, onChange, placeholder = "Select..." }: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-8 text-[11px] rounded-lg bg-background/50 border border-border/50 text-foreground px-2 appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary/30"
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}
