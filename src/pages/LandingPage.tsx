import WhyUs from "@/components/customUI/LandingPage/WhyUs";
import HeroSection from "./HeroSection";
import KeyFeatures from "@/components/customUI/LandingPage/KeyFeatures";
import Benefits from "@/components/customUI/LandingPage/Benefits";
import Testimonials from "@/components/customUI/LandingPage/Testimonials";
import DemoSection from "@/components/customUI/LandingPage/DemoSection";
import PricingPlans from "@/components/customUI/LandingPage/PricingPlans";
import FAQ from "@/components/customUI/LandingPage/FAQ";
import FooterCTA from "@/components/customUI/LandingPage/FooterCTA";
import Footer from "@/components/customUI/Footer";
import InteractiveSection from "@/components/customUI/LandingPage/InteractiveSection";
export default function Landing() {
  return (
    <div>
      <HeroSection />
      <WhyUs />
      <KeyFeatures />
      <InteractiveSection />
      <Benefits />
      <Testimonials />
      <DemoSection />
      <PricingPlans />
      <FAQ />
      <FooterCTA />
      <Footer />
    </div>
  );
}
