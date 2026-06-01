import { Apple } from "lucide-react";
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

export function StoreBadges({ align = "start" }: { align?: "start" | "center" }) {
  const { t } = useLanguage();
  return (
    <div className="space-y-3">
      <p className={`text-xs uppercase tracking-wider text-muted-foreground/80 font-medium ${align === "center" ? "text-center" : ""}`}>
        {t("Download now, available on", "Unduh sekarang, tersedia di")}
      </p>
      <div className={`flex flex-wrap gap-3 ${align === "center" ? "justify-center" : ""}`}>
        <a
          href={DOWNLOAD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-4 py-2.5 rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-[1.02] shadow-md"
          aria-label="Download on the App Store"
        >
          <Apple className="w-6 h-6" fill="currentColor" />
          <div className="flex flex-col leading-none">
            <span className="text-[10px] opacity-80">{t("Download on the", "Unduh di")}</span>
            <span className="text-base font-semibold">App Store</span>
          </div>
        </a>
        <a
          href={DOWNLOAD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-4 py-2.5 rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-[1.02] shadow-md"
          aria-label="Get it on Google Play"
        >
          <GooglePlayIcon className="w-6 h-6" />
          <div className="flex flex-col leading-none">
            <span className="text-[10px] opacity-80">{t("Get it on", "Dapatkan di")}</span>
            <span className="text-base font-semibold">Google Play</span>
          </div>
        </a>
      </div>
    </div>
  );
}
