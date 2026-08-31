import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ValueProps from "@/components/landing/ValueProps";
import CategoriesSection from "@/components/landing/CategoriesSection";
import AppShowcase from "@/components/landing/AppShowcase";
import HowItWorks from "@/components/landing/HowItWorks";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FBF9] font-nunito selection:bg-[#80C34A] selection:text-[#1E2922]">

      {/* Sticky Navigation */}
      <Navbar />

      {/* Main Landing Sections */}
      <main className="flex-grow">
        <HeroSection />
        <ValueProps />
        <CategoriesSection />
        <AppShowcase />
        <HowItWorks />
      </main>

      {/* Organic Footer */}
      <Footer />
    </div>
  );
}
