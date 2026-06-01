import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const sections: { title: string; body: string[] }[] = [
  {
    title: "1. Purpose and Scope",
    body: [
      'ConnectX ("ConnectX," "we," "us," or "our") is committed to maintaining a safe, lawful, and trusted platform and adopts a zero-tolerance approach toward child sexual abuse, child exploitation, and any conduct that endangers, harms, exploits, sexualizes, or facilitates the abuse of minors.',
      'This Child Safety, Age Eligibility, and Protection Policy ("Policy") forms an integral part of the ConnectX Terms of Service and applies to all users, visitors, members, founders, professionals, investors, mentors, organizations, and any other persons who access or use the ConnectX platform, websites, mobile applications, products, services, communications systems, and related features (collectively, the "Services").',
      "By accessing or using the Services, you acknowledge that you have read, understood, and agree to comply with this Policy.",
    ],
  },
  {
    title: "2. Adults-Only Platform",
    body: [
      "2.1 Minimum Age Requirement",
      "ConnectX is intended exclusively for adults. You must be at least eighteen (18) years of age, or the age of legal majority in your jurisdiction of residence, whichever is greater, to create an account, access, browse, register for, or use the Services.",
      "Individuals who have not reached the required age are strictly prohibited from creating an account, accessing the Services, participating in the ConnectX community, communicating with other users through the platform, submitting personal information to ConnectX, or using any feature or functionality of the Services. No exceptions shall apply.",
      "2.2 Indonesian Users",
      "For users located in Indonesia, users must be at least eighteen (18) years old and legally capable of entering into binding agreements under applicable Indonesian law. ConnectX reserves the right to require users to verify their age and identity through government-issued identification documents, including but not limited to a valid Kartu Tanda Penduduk (KTP), passport, driver's license, or other legally recognized identification documents.",
      "2.3 International Users",
      "Users located outside Indonesia must satisfy all age, legal capacity, and eligibility requirements imposed by the laws of their respective jurisdictions. Where local law requires a higher minimum age than eighteen (18), the higher age requirement shall apply.",
      "2.4 Age Verification",
      "ConnectX reserves the right, at any time and without prior notice, to request proof of age, request proof of identity, conduct age verification procedures, utilize third-party verification services, restrict access pending verification, suspend accounts pending verification, or remove accounts that fail verification. Failure to provide requested information may result in account suspension, restriction, or permanent termination.",
      "2.5 Misrepresentation of Age",
      "Any attempt to misrepresent age, falsify identity information, provide fraudulent documentation, impersonate another individual, or otherwise circumvent ConnectX's age restrictions constitutes a material violation of this Policy and may result in immediate account termination.",
    ],
  },
  {
    title: "3. Zero-Tolerance Policy for Child Sexual Abuse and Exploitation",
    body: [
      'ConnectX strictly prohibits Child Sexual Abuse and Exploitation ("CSAE") in all forms. Any activity involving the sexual exploitation, abuse, endangerment, grooming, trafficking, or victimization of minors is prohibited and will result in immediate enforcement action.',
      'For purposes of this Policy, a "child" or "minor" means any individual under eighteen (18) years of age or such higher age as may be defined under applicable law.',
    ],
  },
  {
    title: "4. Prohibited Content and Conduct",
    body: [
      "Users may not create, upload, post, publish, transmit, distribute, request, promote, store, display, share, facilitate, encourage, solicit, or engage in any content or conduct involving minors that includes or relates to:",
      "4.1 Child Sexual Abuse Material (CSAM) — Any image, video, animation, audio recording, text, illustration, digital rendering, synthetic media, AI-generated content, or other material depicting, representing, or suggesting the sexual abuse or exploitation of a minor.",
      "4.2 Grooming — Any behavior intended to establish trust, emotional connection, manipulation, coercion, influence, or control over a minor for the purpose of sexual exploitation, abuse, trafficking, or other harmful conduct.",
      "4.3 Sexual Solicitation of Minors — Seeking, requesting, encouraging, persuading, enticing, or attempting to obtain sexual content, sexual activity, intimate images, or sexually explicit communications from a minor.",
      "4.4 Sextortion — Threatening, coercing, blackmailing, intimidating, manipulating, or pressuring a minor to provide sexual content, money, favors, or other benefits.",
      "4.5 Child Trafficking — Recruiting, transporting, transferring, harboring, obtaining, facilitating, advertising, promoting, or exploiting minors for sexual purposes, labor exploitation, forced services, or any unlawful activity.",
      "4.6 Sexualized Content Involving Minors — Any content that depicts, promotes, glorifies, normalizes, fetishizes, romanticizes, or sexualizes minors.",
      "4.7 Exploitative Communications — Any communication involving a minor that is sexually explicit, sexually suggestive, predatory, manipulative, coercive, exploitative, or otherwise inappropriate.",
      "4.8 Circumvention — Any attempt to circumvent ConnectX's child safety controls, moderation systems, reporting systems, identity verification processes, or enforcement mechanisms.",
    ],
  },
  {
    title: "5. AI-Generated, Synthetic, and Digitally Altered Content",
    body: [
      "ConnectX prohibits the creation, upload, sharing, distribution, promotion, or possession of any AI-generated, synthetic, manipulated, altered, computer-generated, deepfake, or digitally created content depicting or appearing to depict minors in sexualized, exploitative, abusive, nude, partially nude, or otherwise inappropriate contexts.",
      "Such content shall be treated as prohibited content regardless of whether the depicted minor is real or fictional, whether the content is computer-generated or AI-generated, whether the content has been altered or manipulated, or whether the content was intended as satire, art, roleplay, fantasy, or entertainment.",
    ],
  },
  {
    title: "6. Reporting Child Safety Concerns",
    body: [
      "Users who become aware of any conduct, communication, content, account, or activity that may involve child exploitation, abuse, grooming, trafficking, or endangerment are encouraged to report such concerns immediately.",
      "Reports may be submitted through email at info@getconnectx.app, or via in-app reporting tools available within the ConnectX platform.",
      "Reports should include as much relevant information as reasonably available, including username(s), profile information, description of the activity, screenshots or evidence where available, and date and time of occurrence. Knowingly submitting false reports may constitute a violation of ConnectX policies.",
    ],
  },
  {
    title: "7. Investigation and Enforcement",
    body: [
      "ConnectX reserves the right, in its sole discretion, to investigate any suspected violation of this Policy.",
      "During an investigation, ConnectX may review content, review user communications, review account activity, preserve evidence, restrict functionality, temporarily suspend accounts, permanently terminate accounts, remove content, or block access to Services. Users shall cooperate with lawful requests made during such investigations.",
    ],
  },
  {
    title: "8. Reporting to Authorities",
    body: [
      "Where permitted, required, or deemed appropriate under applicable law, ConnectX may report suspected child exploitation, abuse, trafficking, grooming, or related conduct to law enforcement agencies, child protection agencies, regulatory authorities, national centers for missing and exploited children, cybercrime agencies, or other competent governmental authorities.",
      "ConnectX may preserve and disclose relevant information, records, logs, communications, metadata, account information, and evidence in connection with such reports.",
    ],
  },
  {
    title: "9. No Expectation of Anonymity for Child Safety Violations",
    body: [
      "Users acknowledge and agree that ConnectX may collect, retain, review, preserve, and disclose information reasonably necessary to investigate, prevent, detect, report, or respond to child safety violations.",
      "Where legally permissible, ConnectX may disclose information relating to suspected child exploitation to relevant authorities without prior notice to the affected user.",
    ],
  },
  {
    title: "10. Account Termination",
    body: [
      "Any violation of this Policy may result in immediate enforcement action, including permanent account termination.",
      "ConnectX may terminate accounts without prior warning where ConnectX reasonably believes a user is under the minimum age requirement, has engaged in prohibited conduct, has attempted to exploit a minor, has uploaded prohibited content, or poses a risk to minors or platform safety.",
      "Account termination under this Policy may be permanent and non-appealable.",
    ],
  },
  {
    title: "11. Compliance with Global Child Protection Laws",
    body: [
      "ConnectX is committed to supporting compliance with applicable child safety, online safety, privacy, and anti-exploitation laws, including, where applicable: United States federal and state child protection laws; the Children's Online Privacy Protection Act (COPPA); the European Union Digital Services Act (DSA); the European Union General Data Protection Regulation (GDPR); the United Kingdom Online Safety Act; the Australian Online Safety Act; the Indonesian Child Protection Law and related regulations; and other applicable child protection and online safety laws.",
      "Nothing in this Policy shall be construed to limit ConnectX's ability to comply with applicable legal obligations.",
    ],
  },
  {
    title: "12. Policy Changes",
    body: [
      "ConnectX reserves the right to modify, amend, update, replace, or supplement this Policy at any time. Continued use of the Services following publication of any revised Policy constitutes acceptance of the updated terms.",
    ],
  },
  {
    title: "13. Contact Information",
    body: [
      "Questions, reports, or concerns relating to child safety may be directed to the ConnectX Trust & Safety Team at info@getconnectx.app.",
      "ConnectX remains committed to protecting children, maintaining platform integrity, and cooperating with relevant authorities in preventing and combating child sexual abuse and exploitation.",
    ],
  },
];

const ChildSafetyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Child Safety and Protection Policy — ConnectX"
        description="ConnectX's zero-tolerance child safety and protection policy covering age eligibility, prohibited content, reporting, enforcement, and global compliance."
        path="/blog/child-safety-and-protection-policy"
      />
      <Navbar />
      <main className="pt-28 pb-20">
        <article className="container mx-auto max-w-3xl px-4">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>

          <header className="mb-12 pb-8 border-b border-border">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
              Trust & Safety
            </p>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4 leading-tight">
              ConnectX Child Safety and Protection Policy
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated June 1, 2026 · 12 min read
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
              Questions or reports? Contact{" "}
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

export default ChildSafetyPolicy;
