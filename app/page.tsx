import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import PlayerCardShowcase from "@/components/PlayerCardShowcase";
import Calculator from "@/components/Calculator";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import FooterCTA from "@/components/FooterCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col bg-slate-950 text-slate-50">
      <Header />
      <Hero />
      <HowItWorks />
      <PlayerCardShowcase />
      <Calculator />
      <Features />
      <Testimonials />
      <FooterCTA />
      <Footer />
    </main>
  );
}
