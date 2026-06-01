import { useLanguage } from "@/contexts/LanguageContext";

const DOWNLOAD_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeCiRvEYfR_cVMqnoLtcTpAp6xagcchRJv6mQPMvFhgMyOqWQ/viewform";

function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M3.6 1.8c-.3.3-.5.8-.5 1.4v17.6c0 .6.2 1.1.5 1.4l11.3-11.2L3.6 1.8z" />
      <path fill="#FBBC04" d="M17.5 8.6 14.9 11l3 3 3.4-1.9c1-.6 1-2.2 0-2.8L17.5 8.6z" />
      <path fill="#4285F4" d="M3.6 22.2c.4.4 1.1.5 1.8.1l12.1-6.9-3-3-10.9 9.8z" />
      <path fill="#34A853" d="M3.6 1.8 14.5 11.6l3-3L5.4 1.7c-.7-.4-1.4-.3-1.8.1z" />
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.05 12.04c-.03-2.86 2.34-4.24 2.45-4.31-1.34-1.96-3.42-2.23-4.16-2.26-1.77-.18-3.46 1.04-4.37 1.04-.91 0-2.3-1.02-3.78-.99-1.94.03-3.74 1.13-4.74 2.87-2.02 3.5-.52 8.69 1.45 11.53.96 1.39 2.11 2.95 3.6 2.9 1.45-.06 2-.93 3.75-.93 1.74 0 2.25.93 3.78.9 1.56-.03 2.55-1.41 3.5-2.81 1.1-1.61 1.56-3.17 1.58-3.25-.03-.01-3.03-1.16-3.06-4.69zM14.18 4.42c.78-.96 1.31-2.27 1.16-3.6-1.13.05-2.51.76-3.32 1.71-.72.84-1.36 2.21-1.19 3.5 1.26.1 2.56-.64 3.35-1.61z" />
    </svg>
  );
}

export function StoreBadges({ align = "start" }: { align?: "start" | "center" }) {
  const { t } = useLanguage();
  return (
    <div className="space-y-3">
      <p
        className={`text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70 font-medium ${
          align === "center" ? "text-center" : ""
        }`}
      >
        {t("Download Now", "Unduh Sekarang")}
      </p>
      <div className={`flex flex-wrap gap-3 ${align === "center" ? "justify-center" : ""}`}>
        <a
          href={DOWNLOAD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 h-12 px-5 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all hover:-translate-y-0.5"
          aria-label="Download on the App Store"
        >
          <AppleIcon className="w-5 h-5" />
          <span className="text-sm font-semibold tracking-tight">App Store</span>
        </a>
        <a
          href={DOWNLOAD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 h-12 px-5 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all hover:-translate-y-0.5"
          aria-label="Get it on Google Play"
        >
          <GooglePlayIcon className="w-5 h-5" />
          <span className="text-sm font-semibold tracking-tight">Google Play</span>
        </a>
      </div>
    </div>
  );
}
