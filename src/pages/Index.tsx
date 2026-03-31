import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FounderProblem } from "@/components/landing/FounderProblem";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { StartupPipeline } from "@/components/landing/StartupPipeline";
import { PremiumVsFree } from "@/components/landing/PremiumVsFree";
import { PlaygroundSection } from "@/components/landing/PlaygroundSection";
import { SocialProof } from "@/components/landing/SocialProof";

import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FounderProblem />
      <SolutionSection />
      <StartupPipeline />
      <PremiumVsFree />
      <PlaygroundSection />
      <SocialProof />
      
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
