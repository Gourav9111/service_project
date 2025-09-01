import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats-section";
import LoanCategories from "@/components/loan-categories";
import EMICalculator from "@/components/emi-calculator";
import DSAPartnerSection from "@/components/dsa-partner-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <StatsSection />
      <LoanCategories />
      <EMICalculator />
      <DSAPartnerSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
