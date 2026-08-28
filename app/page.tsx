import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PlayerCardShowcase from "@/components/PlayerCardShowcase";
import Calculator from "@/components/Calculator";
import Features from "@/components/Features";
import FooterCTA from "@/components/FooterCTA";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center bg-slate-950 text-slate-50">
      <Header />
      <Hero />
      <PlayerCardShowcase />
      <Calculator />
      <Features />
      <FooterCTA />
    </main>
  );
}
