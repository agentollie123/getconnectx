import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FounderProblem } from "@/components/landing/FounderProblem";
import { StartupPipeline } from "@/components/landing/StartupPipeline";
import { BuiltForBuilders } from "@/components/landing/BuiltForBuilders";
import { EcosystemMatchmaking } from "@/components/landing/EcosystemMatchmaking";
import { PlaygroundSection } from "@/components/landing/PlaygroundSection";
import { SocialProof } from "@/components/landing/SocialProof";
import { BigVision } from "@/components/landing/BigVision";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FounderProblem />
      <StartupPipeline />
      <BuiltForBuilders />
      <EcosystemMatchmaking />
      <PlaygroundSection />
      <SocialProof />
      <BigVision />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
