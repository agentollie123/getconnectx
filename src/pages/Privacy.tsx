import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    title: "1. Introduction",
    body: [
      "This Privacy Policy (\"Policy\"), as may be amended, supplemented, or otherwise modified from time to time, sets out the manner in which PT Koneksix Digital Nusantara (\"ConnectX\", \"we\", \"us\", or \"our\") collects, uses, processes, stores, discloses, and otherwise handles personal data in connection with your access to and use of the ConnectX mobile application, website located at getconnectx.app, and all related services, features, content, and functionalities (collectively, the \"Service\").",
      "This Policy applies to all users of the Service, regardless of geographic location, and should be read in conjunction with our Terms & Conditions. By accessing, registering for, or otherwise using the Service, you acknowledge that you have read and understood this Policy and agree to the collection and processing of your personal data as described herein."
    ]
  },
  {
    title: "2. Information We Collect",
    body: [
      "We collect information about you in a number of ways, including information that you provide directly to us, information that is collected automatically when you use the Service, and information that is derived or inferred from your interactions with the Service.",
      "The categories of information we collect may include, without limitation, the following:"
    ]
  },
  {
    title: "2.1 Information You Provide",
    body: [
      "When you create an account, complete your profile, or otherwise interact with the Service, you may provide personal data including, but not limited to, your name, email address, phone number, professional background, skills, experience, interests, preferences, and other profile-related information.",
      "You may also provide information relating to startup activities, including company affiliation, roles, opportunity postings, or other business-related content. In addition, you may upload photos, media, or other materials, and may communicate with other users through messaging features available within the Service.",
      "You acknowledge that certain information you provide may be visible to other users of the Service, particularly in the context of profile discovery, matching, and communication."
    ]
  },
  {
    title: "2.2 Information Collected Automatically",
    body: [
      "When you access or use the Service, we may automatically collect certain technical and usage-related information, including but not limited to your device type, operating system, unique device identifiers, IP address, approximate geographic location, and usage patterns.",
      "We may also collect log data, including timestamps, system activity, error reports, and interactions with features of the Service. Such information is collected to ensure the proper functioning, security, and optimization of the Service."
    ]
  },
  {
    title: "2.3 Interaction, Matching, and Behavioral Data",
    body: [
      "Given the nature of the Service as a matchmaking platform, we collect and process information relating to your interactions within the platform, including your engagement with profiles, swipe behavior, matches, messaging activity, and response patterns.",
      "This information may be used to better understand user preferences, improve matching accuracy, and enhance the overall functionality and effectiveness of the Service."
    ]
  },
  {
    title: "2.4 AI-Derived and Inferred Data",
    body: [
      "We may utilize algorithmic systems and artificial intelligence technologies to analyze your behavior, preferences, and interactions in order to generate inferred data, including compatibility scores, recommendations, and other insights.",
      "Such data is derived from available inputs and may not reflect complete or accurate representations of user compatibility or future outcomes. You acknowledge that such outputs are probabilistic in nature and may be subject to limitations, inaccuracies, or bias."
    ]
  },
  {
    title: "3. How We Use Your Information",
    body: [
      "We may use the information we collect for a variety of purposes, including, without limitation:",
      "• to provide, operate, maintain, and improve the Service;",
      "• to facilitate connections and interactions between users;",
      "• to generate and deliver AI-powered recommendations and insights;",
      "• to personalize user experience and content;",
      "• to communicate with users regarding updates, features, or support;",
      "• to monitor, detect, investigate, and prevent fraud, abuse, or unlawful activity;",
      "• to enforce our Terms & Conditions;",
      "• to comply with applicable legal and regulatory obligations.",
      "We may also use aggregated or anonymized data for analytical and research purposes."
    ]
  },
  {
    title: "4. Profile Visibility and Platform Functionality",
    body: [
      "You acknowledge and agree that the Service is designed to facilitate visibility and discovery among users, and that the display of your profile to other users is an inherent and essential feature of the platform.",
      "Your profile information may be presented to other users in various contexts, including but not limited to discovery feeds, matching interfaces, and interaction features. The frequency, placement, and visibility of your profile may be influenced by factors such as user activity, preferences, engagement levels, and algorithmic processes.",
      "ConnectX does not guarantee any particular level of visibility or exposure, nor does it control how other users interact with or respond to your profile."
    ]
  },
  {
    title: "5. Payments and Transaction Information",
    body: [
      "Where you purchase Paid Features through the Service, including subscriptions or one-time purchases such as Boost or Spotlight, such transactions are processed through third-party platforms, including the Apple App Store and Google Play Store.",
      "ConnectX does not collect or store full payment card details. However, we may receive certain limited transaction-related information, including confirmation of purchase, subscription status, and transaction identifiers, for the purpose of managing access to Paid Features and maintaining account records.",
      "All payment processing is subject to the terms and policies of the relevant platform provider."
    ]
  },
  {
    title: "6. How We Share Your Information",
    body: [
      "We may share your personal data in the following circumstances:"
    ]
  },
  {
    title: "6.1 With Other Users",
    body: [
      "Your profile information, including certain personal and professional details, may be shared with other users within the Service as part of the platform's core functionality."
    ]
  },
  {
    title: "6.2 With Service Providers",
    body: [
      "We may share information with third-party service providers who perform services on our behalf, including hosting, analytics, security, and customer support. Such providers are contractually required to safeguard your data."
    ]
  },
  {
    title: "6.3 With Platform and Payment Providers",
    body: [
      "Where applicable, information may be shared with Apple, Google, or other platform providers in connection with payments and subscription management."
    ]
  },
  {
    title: "6.4 Legal Disclosures",
    body: [
      "We may disclose information where required by law, legal process, or governmental request, or where necessary to protect the rights, property, or safety of ConnectX, its users, or others."
    ]
  },
  {
    title: "7. Data Retention",
    body: [
      "We retain personal data only for as long as necessary to fulfill the purposes outlined in this Policy, including providing the Service, complying with legal obligations, resolving disputes, and enforcing agreements.",
      "Upon account deletion, we will take reasonable steps to delete or anonymize personal data, except where retention is required by law or justified by legitimate business purposes."
    ]
  },
  {
    title: "8. Your Rights",
    body: [
      "Subject to applicable law, you may have the right to access, correct, or delete your personal data, as well as to object to or restrict certain processing activities.",
      "We may require verification of your identity before fulfilling such requests."
    ]
  },
  {
    title: "9. Account Deletion",
    body: [
      "You may delete your account at any time through the Service or by contacting us. Upon deletion, your profile will no longer be visible, and your personal data will be removed or anonymized within a reasonable timeframe, subject to legal and operational requirements."
    ]
  },
  {
    title: "10. Data Security",
    body: [
      "We implement appropriate technical and organizational measures to protect personal data against unauthorized access, loss, misuse, or alteration. However, no system can be guaranteed to be completely secure, and you acknowledge that use of the Service is at your own risk."
    ]
  },
  {
    title: "11. Cookies and Tracking",
    body: [
      "We may use cookies and similar technologies to collect information about your interactions with the Service, improve performance, and personalize content. You may manage your preferences through device or browser settings."
    ]
  },
  {
    title: "12. International Data Transfers",
    body: [
      "Your information may be transferred to and processed in jurisdictions outside your country of residence. By using the Service, you consent to such transfers, even where data protection standards may differ."
    ]
  },
  {
    title: "13. Children's Privacy",
    body: [
      "The Service is intended for individuals aged 18 and above. We do not knowingly collect personal data from minors."
    ]
  },
  {
    title: "14. Changes to This Policy",
    body: [
      "We reserve the right to update this Policy at any time. Where required, we will provide notice of material changes. Continued use of the Service constitutes acceptance of the updated Policy."
    ]
  },
  {
    title: "15. Contact",
    body: [
      "If you have any questions or requests regarding this Policy, please contact: info@getconnectx.app"
    ]
  }
];

const Privacy = () => {
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
            Back to home
          </Link>

          <header className="mb-12 pb-8 border-b border-border">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
              Legal
            </p>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4 leading-tight">
              ConnectX Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground">
              PT Koneksix Digital Nusantara · Last updated April 2026
            </p>
          </header>

          <div className="space-y-10">
            {sections.map((section) => (
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
              For questions about this Policy, contact{" "}
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

export default Privacy;
