import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProductModes } from "@/components/landing/ProductModes";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { PlaygroundSection } from "@/components/landing/PlaygroundSection";
import { SocialDiscovery } from "@/components/landing/SocialDiscovery";
import { SocialProof } from "@/components/landing/SocialProof";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProductModes />
      <HowItWorks />
      <PlaygroundSection />
      <SocialDiscovery />
      <SocialProof />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
