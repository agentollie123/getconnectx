import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Language = "en" | "id";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (en: string, id: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem("connectx-language");
    return stored === "id" ? "id" : "en";
  });

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage: (next) => {
      localStorage.setItem("connectx-language", next);
      setLanguage(next);
    },
    t: (en, id) => (language === "id" ? id : en),
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}