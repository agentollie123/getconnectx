import { Navbar } from "@/components/landing/Navbar";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/landing/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { communitySectionsId } from "@/lib/legalContentId";

const sections = [
  {
    title: "1. Introduction",
    body: [
      "ConnectX is a platform designed to enable meaningful connections between founders, builders, and talent with the goal of forming real startup teams and building companies together.",
      "Trust is the foundation of every connection made on ConnectX. Without trust, collaboration fails. Without accountability, the platform loses integrity.",
      "These Community Guidelines and Trust & Safety principles (collectively, the \"Guidelines\") are designed to establish clear expectations for behavior, define what is and is not acceptable on the platform, and ensure a safe, professional, and high-quality environment for all users.",
      "These Guidelines apply to your use of the platform, including your profile, interactions, content, and, where relevant, your conduct outside the platform if it impacts the safety or trust of other users.",
      "By accessing or using ConnectX, you agree to comply with these Guidelines.",
    ],
  },
  {
    title: "2. Your Content and Responsibility",
    body: [
      "You are solely responsible for any content that you upload, publish, transmit, or otherwise make available on the platform (\"Your Content\"), including but not limited to your profile, messages, startup opportunities, and any supporting materials.",
      "You acknowledge that:",
      "• Your Content may be visible to other users within the platform",
      "• You are responsible for ensuring that Your Content is accurate, lawful, and appropriate",
      "• Any decisions made by other users based on Your Content are outside the control of ConnectX",
      "You must not upload or share:",
      "• false or misleading information",
      "• confidential or proprietary data that you are not authorized to disclose",
      "• sensitive personal information, including financial or banking details",
      "• any content that violates applicable laws or third-party rights",
      "By submitting Your Content, you represent and warrant that you have all necessary rights and permissions to use and share it, and you grant ConnectX a limited license to use such content for the operation and improvement of the platform.",
    ],
  },
  {
    title: "3. Authenticity and Identity",
    body: [
      "Authenticity is a core requirement of ConnectX.",
      "Users must represent themselves truthfully and accurately at all times. The platform is intended for real individuals engaging in genuine professional collaboration.",
      "We strictly prohibit:",
      "• impersonation of any individual or entity",
      "• creation of fake profiles or fabricated identities",
      "• misrepresentation of personal background, experience, or qualifications",
      "• falsely claiming affiliation with a startup, company, or organization",
      "Any attempt to deceive other users, whether directly or indirectly, undermines the integrity of the platform and may result in immediate enforcement action.",
    ],
  },
  {
    title: "4. Startup Opportunities and Professional Integrity",
    body: [
      "ConnectX enables users to discover and engage with startup opportunities, including co-founder roles, early team positions, and collaboration offers.",
      "Users who post opportunities must ensure that:",
      "• they are authorized to represent the opportunity",
      "• the opportunity is genuine and not misleading",
      "• information regarding roles, expectations, and compensation is clear and accurate",
      "We do not allow:",
      "• fake or non-existent startup opportunities",
      "• misleading descriptions of roles or responsibilities",
      "• baiting users into unrelated services or platforms",
      "• intentionally vague or deceptive listings designed to attract attention without substance",
      "Professional integrity is essential. Misleading others in a startup context may result in severe consequences and enforcement action.",
    ],
  },
  {
    title: "5. Harassment, Abuse, and Professional Conduct",
    body: [
      "ConnectX is a professional environment and must be treated as such.",
      "We do not tolerate any form of harassment, bullying, or abusive behavior. This includes, but is not limited to:",
      "• repeated unwanted contact or messaging",
      "• threatening, intimidating, or coercive behavior",
      "• insulting, degrading, or offensive language",
      "• discrimination based on protected characteristics such as race, gender, religion, nationality, or disability",
      "All interactions must remain respectful, constructive, and aligned with the purpose of professional collaboration.",
    ],
  },
  {
    title: "6. Sexual Harassment and Inappropriate Use",
    body: [
      "ConnectX is not intended for dating, socializing, or non-professional engagement.",
      "We strictly prohibit:",
      "• unwanted sexual advances or suggestive communication",
      "• sharing explicit or inappropriate content",
      "• any behavior that creates discomfort in a professional setting",
      "Users who engage in such behavior will be subject to immediate enforcement action.",
    ],
  },
  {
    title: "7. Fraud, Scams, and Financial Misconduct",
    body: [
      "We maintain a strict zero-tolerance policy toward fraud and exploitation.",
      "The following activities are strictly prohibited:",
      "• investment scams or fraudulent fundraising",
      "• misrepresentation of financial opportunities",
      "• requesting money under false pretenses",
      "• misleading users regarding equity, compensation, or business outcomes",
      "• exploiting users for personal or financial gain",
      "We treat such violations with the highest level of severity and may permanently remove accounts involved in such activities.",
    ],
  },
  {
    title: "8. Misinformation and Deceptive Content",
    body: [
      "We prohibit the creation and distribution of content that is demonstrably false, misleading, or likely to cause harm.",
      "This includes:",
      "• false claims about startups, funding, or partnerships",
      "• misleading information that influences user decisions",
      "• deceptive statements regarding business performance or opportunities",
      "Users are expected to provide accurate and truthful information at all times.",
    ],
  },
  {
    title: "9. Violence, Threats, and Harmful Behavior",
    body: [
      "We do not tolerate any behavior that promotes, threatens, or facilitates violence.",
      "This includes:",
      "• threats of physical harm",
      "• intimidation or coercion",
      "• harassment that escalates into safety concerns",
      "Any credible threat may be escalated to appropriate authorities.",
    ],
  },
  {
    title: "10. Spam, Automation, and Unauthorized Activity",
    body: [
      "ConnectX is designed for intentional, meaningful interaction.",
      "We do not allow:",
      "• bulk messaging or spam",
      "• automated or bot-driven interactions",
      "• scraping or unauthorized data extraction",
      "• repetitive or disruptive engagement behavior",
      "Users must engage authentically and with genuine intent.",
    ],
  },
  {
    title: "11. Platform Integrity and System Abuse",
    body: [
      "We actively protect the integrity of the platform.",
      "The following behaviors are prohibited:",
      "• manipulating visibility, matches, or engagement",
      "• abusing features such as Boost or Spotlight",
      "• creating multiple accounts to gain unfair advantage",
      "• attempting to bypass restrictions or bans",
      "We also prohibit ban evasion, including creating new accounts after enforcement actions or using technical methods to avoid detection.",
    ],
  },
  {
    title: "12. Safety and User Responsibility",
    body: [
      "While ConnectX implements safeguards, users are responsible for their own actions and decisions.",
      "You should:",
      "• verify the identity and credibility of other users",
      "• conduct due diligence before entering partnerships",
      "• avoid sharing sensitive or confidential information",
      "ConnectX does not guarantee the authenticity of users or the success of any collaboration.",
    ],
  },
  {
    title: "13. Safety Reporting and Moderation",
    body: [
      "User safety is a core priority.",
      "We use a combination of automated systems and human moderation to detect, review, and respond to violations of these Guidelines.",
      "Users are encouraged to report any behavior that:",
      "• violates these Guidelines",
      "• creates discomfort or safety concerns",
      "• appears fraudulent or suspicious",
      "Reports are reviewed carefully, and appropriate action is taken.",
      "However, misuse of reporting systems—such as false or malicious reports—may also result in enforcement action.",
    ],
  },
  {
    title: "14. Enforcement and Accountability",
    body: [
      "All users must comply with these Guidelines and our Terms & Conditions.",
      "If a violation occurs, ConnectX may take action including:",
      "• removal of content",
      "• warnings",
      "• temporary account restrictions",
      "• permanent account suspension",
      "In determining enforcement, we consider factors such as:",
      "• severity of the violation",
      "• intent",
      "• frequency of behavior",
      "We may also take action based on behavior occurring outside the platform if it impacts user safety or trust.",
      "In certain cases, we may cooperate with law enforcement.",
    ],
  },
  {
    title: "15. Our Commitment",
    body: [
      "ConnectX is building infrastructure for startup collaboration.",
      "This means:",
      "• real people",
      "• real opportunities",
      "• real accountability",
      "We are committed to maintaining a platform where users can connect safely, build confidently, and collaborate with trust.",
    ],
  },
];

const CommunityGuidelines = () => {
  const { language, t } = useLanguage();
  const activeSections = language === "id" ? communitySectionsId : sections;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20">
        <article className="container mx-auto max-w-3xl px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to home", "Kembali ke beranda")}
          </Link>

          <header className="mb-12 pb-8 border-b border-border">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
              {t("Trust & Safety", "Trust & Safety")}
            </p>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4 leading-tight">
              {t("ConnectX Community Guidelines", "Panduan Komunitas ConnectX")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t("PT Koneksix Digital Nusantara · Last updated April 2026", "PT Koneksix Digital Nusantara · Terakhir diperbarui April 2026")}
            </p>
          </header>

          <div className="space-y-10">
            {activeSections.map((section) => (
              <section key={section.title}>
                <h2 className="font-display font-semibold text-xl md:text-2xl text-foreground mb-4">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.body.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-[15px] leading-relaxed text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              {t("Questions or reports? Contact", "Pertanyaan atau laporan? Hubungi")}{" "}
              <a
                href="mailto:info@getconnectx.app"
                className="text-primary hover:underline"
              >
                info@getconnectx.app
              </a>
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default CommunityGuidelines;
