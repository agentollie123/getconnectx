import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FounderProblem } from "@/components/landing/FounderProblem";
import { EcosystemMatchmaking } from "@/components/landing/EcosystemMatchmaking";
import { StartupPipeline } from "@/components/landing/StartupPipeline";

import { SocialDiscovery } from "@/components/landing/SocialDiscovery";
import { IdeaMarketplace } from "@/components/landing/IdeaMarketplace";
import { PlaygroundSection } from "@/components/landing/PlaygroundSection";
import { SuccessStories } from "@/components/landing/SuccessStories";
import { SocialProof } from "@/components/landing/SocialProof";
import { BigVision } from "@/components/landing/BigVision";
import { BuiltForBuilders } from "@/components/landing/BuiltForBuilders";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FounderProblem />
      <EcosystemMatchmaking />
      <StartupPipeline />
      <NetworkMap />
      <SocialDiscovery />
      <IdeaMarketplace />
      <PlaygroundSection />
      <SuccessStories />
      <SocialProof />
      <BigVision />
      <BuiltForBuilders />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
