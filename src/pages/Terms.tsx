import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    title: "1. Introduction",
    body: [
      "These Terms and Conditions (\"Terms\"), as may be amended, supplemented, or otherwise modified from time to time, constitute a legally binding agreement between you and PT Koneksix Digital Nusantara, a company duly incorporated under the laws of the Republic of Indonesia (\"ConnectX\", \"we\", \"us\", or \"our\"), governing your access to and use of the ConnectX mobile application, website located at getconnectx.app, and all related services, features, content, and functionalities (collectively, the \"Service\").",
      "By accessing, downloading, registering for, or otherwise using the Service, you expressly acknowledge that you have read, understood, and agree to be bound by these Terms, as well as any additional policies referenced herein, including but not limited to the Privacy Policy. If you do not agree to these Terms in their entirety, you must immediately cease use of the Service."
    ]
  },
  {
    title: "2. Eligibility and Account Registration",
    body: [
      "You represent and warrant that you are at least eighteen (18) years of age and possess the legal capacity to enter into a binding agreement under applicable law. You further represent that you are not prohibited from using the Service under any applicable laws or regulations.",
      "In registering for an account, you agree to provide accurate, current, and complete information and to maintain and promptly update such information as necessary. You acknowledge that failure to do so may result in suspension or termination of your account.",
      "You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. ConnectX shall not be liable for any loss or damage arising from unauthorized access resulting from your failure to safeguard such information."
    ]
  },
  {
    title: "3. Description of the Service",
    body: [
      "ConnectX is a digital platform designed to facilitate connections between individuals and entities in the startup ecosystem, including founders, prospective co-founders, team members, and other participants, through a swipe-based matching interface, curated feed of opportunities, and AI-assisted compatibility insights.",
      "The Service allows users to discover profiles, express interest through interaction mechanisms, and communicate only upon mutual matching. Certain users, acting as representatives of startups, may publish opportunities related to team formation, co-founder recruitment, or other collaboration purposes.",
      "You acknowledge that ConnectX functions solely as a technology platform and does not act as an employer, recruiter, agent, broker, investment advisor, or intermediary in any transaction or relationship formed between users."
    ]
  },
  {
    title: "4. Matching System, Feed, and User Interactions",
    body: [
      "The matching system operates on the basis of mutual user interaction. Communication between users is only enabled following a successful match, and ConnectX does not guarantee that any interaction will result in a match or subsequent communication.",
      "Users who post opportunities represent and warrant that they have the authority to do so on behalf of the relevant startup or entity, and that such opportunities are accurate, lawful, and not misleading in any respect.",
      "You acknowledge that ConnectX does not verify the identity, credentials, experience, or intentions of users and does not guarantee the authenticity, reliability, or suitability of any user or opportunity presented on the platform."
    ]
  },
  {
    title: "5. AI-Powered Insights and Recommendations",
    body: [
      "The Service may include algorithmic and artificial intelligence–based features that generate compatibility scores, behavioral insights, and recommendations based on user data, interaction patterns, and other inputs.",
      "Such outputs are provided for informational purposes only and are inherently probabilistic in nature. ConnectX makes no representations or warranties regarding the accuracy, reliability, or predictive value of such insights.",
      "You expressly acknowledge that any reliance on AI-generated outputs is undertaken at your sole risk, and that such outputs do not constitute professional advice of any kind, including but not limited to legal, financial, or business advice."
    ]
  },
  {
    title: "6. User Content and License",
    body: [
      "You retain ownership of any content that you upload, submit, or otherwise make available through the Service, including but not limited to profiles, messages, and opportunity postings (\"User Content\").",
      "By submitting User Content, you grant ConnectX a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, modify, display, distribute, and otherwise process such content for the purpose of operating, improving, and promoting the Service.",
      "You represent and warrant that you have all necessary rights to grant such license and that your User Content does not infringe upon the rights of any third party."
    ]
  },
  {
    title: "7. Prohibited Content and Conduct",
    body: [
      "You agree not to use the Service to:",
      "• engage in fraudulent, deceptive, or misleading conduct, including the posting of fake startup opportunities or misrepresentation of credentials;",
      "• harass, abuse, threaten, or harm other users;",
      "• impersonate any person or entity;",
      "• use automated systems, bots, or scraping tools to access or extract data from the platform;",
      "• engage in any activity that violates applicable laws or regulations.",
      "ConnectX reserves the right to investigate and take appropriate action, including suspension or termination of accounts, in response to violations of these Terms."
    ]
  },
  {
    title: "8. Business, Partnership, and Financial Risks",
    body: [
      "You acknowledge that the formation of startups, partnerships, or other business relationships inherently involves significant risks, including but not limited to financial loss, disputes, and failure of the underlying venture.",
      "ConnectX does not participate in, facilitate, or guarantee any agreements or transactions between users and shall not be responsible for any outcomes arising therefrom, including disputes relating to equity, compensation, intellectual property, or management.",
      "All decisions to engage in any collaboration or transaction are made solely at your own discretion and risk."
    ]
  },
  {
    title: "9. Payments, Subscriptions, and Paid Features",
    body: [
      "The Service may offer certain paid features, functionalities, or enhancements (collectively, the \"Paid Features\"), including but not limited to subscription-based access plans and one-time purchases designed to increase visibility, exposure, or engagement within the platform, such as Boost, Spotlight, or similar features.",
      "All payments for Paid Features are processed exclusively through third-party payment providers, including but not limited to the Apple App Store and Google Play Store, as well as any payment systems, billing infrastructures, or authorized mechanisms integrated within or made available through such platforms. Accordingly, all transactions are subject to the applicable terms, conditions, and policies of the respective platform provider.",
      "You acknowledge and agree that ConnectX does not directly process, store, or control payment transactions conducted through such third-party providers and shall not be responsible for any errors, interruptions, delays, or failures arising from such systems. Any billing disputes, refund requests, or payment-related concerns must be directed to the relevant platform provider, except where otherwise required by applicable law."
    ]
  },
  {
    title: "9.1 Subscriptions",
    body: [
      "The Service may offer subscription-based access to certain premium features (\"Subscriptions\"), which may be made available in multiple billing intervals, including but not limited to weekly, monthly, multi-month, annual, or lifetime access plans, as presented within the Service at the time of purchase.",
      "By purchasing a Subscription, you agree to pay the applicable recurring fees indicated at the time of purchase. Subscriptions are billed in advance and shall automatically renew at the end of each applicable billing cycle unless canceled prior to the renewal date through the relevant platform provider.",
      "You expressly acknowledge that uninstalling or deleting the application does not cancel any active Subscription and that you are solely responsible for managing your Subscription, including cancellation and renewal settings, through your account with the applicable platform provider.",
      "Subscriptions may provide enhanced functionality and visibility within the Service, including but not limited to increased exposure within discovery feeds, access to premium matching features, or prioritized placement relative to non-subscribed users. However, such benefits are provided on a best-effort basis and do not guarantee any specific outcomes.",
      "To the maximum extent permitted by applicable law, all Subscription fees are non-refundable, including partially used billing periods, except where otherwise required by the policies of the relevant platform provider."
    ]
  },
  {
    title: "9.2 Boost Features",
    body: [
      "The Service may offer \"Boost\" features, which are time-limited visibility enhancements intended to temporarily increase the exposure of a user's profile within discovery feeds or matching systems for a defined duration.",
      "Boost features may be offered as single-use purchases or bundled packages and may be activated for a specified period (for example, a limited duration such as approximately one hour or similar timeframe as indicated within the Service at the time of purchase).",
      "You acknowledge that the effectiveness of Boost features may vary based on factors beyond ConnectX's control, including but not limited to overall user activity, demand within the platform, profile quality, and algorithmic distribution.",
      "All purchases of Boost features are final and non-refundable, except where required by applicable law or the policies of the relevant platform provider."
    ]
  },
  {
    title: "9.3 Spotlight Features",
    body: [
      "The Service may also offer \"Spotlight\" features, which are enhanced visibility tools designed to provide more prominent or prioritized placement of a user's profile within discovery or feed environments for a defined duration.",
      "Spotlight features may provide greater or more sustained exposure than standard visibility or Boost features and may be offered as individual purchases or bundled options, as presented within the Service.",
      "You acknowledge that Spotlight features are subject to platform conditions, including user activity levels and algorithmic distribution, and that ConnectX does not guarantee any specific level of exposure, engagement, or outcome resulting from their use.",
      "All Spotlight purchases are final and non-refundable, except where required by applicable law or platform provider policies."
    ]
  },
  {
    title: "9.4 Distinction Between Paid Features",
    body: [
      "For the avoidance of doubt, Subscriptions, Boost features, and Spotlight features serve distinct purposes within the Service.",
      "Subscriptions provide ongoing access to premium functionality and may enhance general visibility and experience over a recurring period. Boost features provide short-term increases in visibility for limited durations, while Spotlight features provide more prominent placement within the platform for a defined period.",
      "The purchase or use of any one Paid Feature does not guarantee or substitute the effects of any other Paid Feature."
    ]
  },
  {
    title: "9.5 Cancellation and Management",
    body: [
      "All Subscriptions must be managed and canceled through the platform provider from which the purchase was made (e.g., Apple App Store or Google Play Store). Cancellation requests must be submitted in accordance with the procedures of the relevant platform provider and will take effect at the end of the current billing period.",
      "You acknowledge that ConnectX does not have the ability to directly cancel Subscriptions on your behalf and shall not be responsible for any continued billing resulting from your failure to properly cancel a Subscription through the appropriate platform."
    ]
  },
  {
    title: "9.6 Pricing and Changes",
    body: [
      "ConnectX reserves the right to modify pricing for any Paid Features at any time, including the introduction of new features, modification of existing offerings, or discontinuation of any Paid Feature. Any changes to Subscription pricing will take effect at the next billing cycle following notice, where required.",
      "Prices may vary depending on geographic location, platform, promotional campaigns, or other factors, and ConnectX does not guarantee uniform pricing across users or regions."
    ]
  },
  {
    title: "9.7 No Guarantee of Results",
    body: [
      "You expressly acknowledge and agree that the purchase or use of any Paid Feature, including Subscriptions, Boost features, or Spotlight features, does not guarantee any specific results, including but not limited to matches, connections, responses, partnerships, hiring outcomes, or business success.",
      "All Paid Features are intended solely to enhance visibility, access, or functionality within the Service and shall not be construed as any form of promise, assurance, or guarantee."
    ]
  },
  {
    title: "10. Safety and User Interactions",
    body: [
      "While ConnectX may implement certain safety measures, including moderation tools and reporting mechanisms, it does not conduct comprehensive background checks on users and does not guarantee the safety or integrity of interactions.",
      "You are solely responsible for exercising caution, conducting due diligence, and verifying the identity and credibility of other users prior to engaging in any collaboration."
    ]
  },
  {
    title: "11. Account Suspension and Termination",
    body: [
      "ConnectX reserves the right, at its sole discretion and without prior notice, to suspend, restrict, or terminate your account if it determines that you have violated these Terms, engaged in fraudulent or harmful behavior, or otherwise posed a risk to the integrity of the platform or its users.",
      "No refunds shall be provided in connection with any account termination resulting from a violation of these Terms."
    ]
  },
  {
    title: "12. Disclaimer of Warranties",
    body: [
      "The Service is provided strictly on an \"as is\" and \"as available\" basis. ConnectX makes no warranties, whether express or implied, regarding the operation, availability, reliability, or suitability of the Service.",
      "Without limitation, ConnectX does not warrant that the Service will be uninterrupted, secure, error-free, or free from harmful components."
    ]
  },
  {
    title: "13. Limitation of Liability",
    body: [
      "To the maximum extent permitted by applicable law, ConnectX shall not be liable for any indirect, incidental, consequential, or punitive damages arising out of or in connection with your use of the Service, including but not limited to loss of profits, business interruption, or loss of data."
    ]
  },
  {
    title: "14. Indemnification",
    body: [
      "You agree to indemnify, defend, and hold harmless ConnectX and its affiliates from and against any claims, liabilities, damages, losses, or expenses arising out of or in connection with your use of the Service or violation of these Terms."
    ]
  },
  {
    title: "15. Third-Party Services",
    body: [
      "The Service may include integrations with or links to third-party services. ConnectX does not control and is not responsible for the content, policies, or practices of such third parties."
    ]
  },
  {
    title: "16. Governing Law and Disputes",
    body: [
      "These Terms shall be governed by and construed in accordance with the laws of the Republic of Indonesia. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Indonesia."
    ]
  },
  {
    title: "17. Miscellaneous",
    body: [
      "These Terms constitute the entire agreement between you and ConnectX (PT Koneksix Digital Nusantara) with respect to your access to and use of the Service, and supersede and replace any and all prior or contemporaneous agreements, negotiations, representations, or understandings, whether written or oral, relating to such subject matter. Nothing in this clause shall operate to limit or exclude any liability for fraud or fraudulent misrepresentation where such limitation or exclusion is not permitted under applicable law.",
      "While ConnectX endeavors to take reasonable measures to ensure that the Service is accurate, current, and reliable, the Service is provided strictly on an \"as is\" and \"as available\" basis. ConnectX makes no representations, warranties, or guarantees of any kind, whether express or implied, regarding the accuracy, completeness, reliability, suitability, or availability of the Service or any information contained therein.",
      "You acknowledge and agree that your use of the Service, including any reliance on matches, user content, startup opportunities, or AI-generated compatibility insights, is at your sole risk. You are solely responsible for implementing appropriate safeguards, including due diligence, verification of counterparties, and independent evaluation of any business, partnership, or collaboration opportunities encountered through the platform.",
      "If any provision of these Terms is held by a court of competent jurisdiction to be invalid, illegal, or unenforceable for any reason, such provision shall be deemed severed from these Terms and shall not affect the validity and enforceability of the remaining provisions, which shall remain in full force and effect.",
      "The failure of ConnectX at any time to enforce any right or provision under these Terms shall not constitute a waiver of such right or provision, nor shall any single or partial exercise of any right preclude any further exercise of such right or any other right.",
      "You acknowledge that ConnectX operates on a global basis and that the Service may be hosted, processed, or supported by infrastructure located in multiple jurisdictions. By using the Service, you consent to the transfer, storage, and processing of your information in such jurisdictions, which may have different data protection standards than those in your country of residence."
    ]
  }
];

const Terms = () => {
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
              ConnectX Terms & Conditions
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
              For questions about these Terms, contact{" "}
              <a
                href="mailto:support@getconnectx.com"
                className="text-primary hover:underline"
              >
                support@getconnectx.com
              </a>
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
