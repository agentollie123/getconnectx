import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FounderProblem } from "@/components/landing/FounderProblem";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { StartupPipeline } from "@/components/landing/StartupPipeline";
import { PremiumVsFree } from "@/components/landing/PremiumVsFree";
import { PlaygroundSection } from "@/components/landing/PlaygroundSection";
import { SocialProof } from "@/components/landing/SocialProof";
import { CityIndex } from "@/components/landing/CityIndex";

import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="ConnectX — Find Co-Founders & Teammates to Build Your Startup"
        description="ConnectX connects founders, co-founders, builders, investors, and early teams to start startups together. No networking. No job boards. Just the right connections to start building."
        path="/"
      />
      <Navbar />
      <main>
      <HeroSection />

      <FounderProblem />
      <SolutionSection />
      <StartupPipeline />
      <PremiumVsFree />
      <PlaygroundSection />
      <SocialProof />
      <CityIndex />

      <FinalCTA />
      </main>
      <Footer />
    </div>

  );
};

export default Index;
