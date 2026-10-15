// Orden de secciones: Hero, TrustBar, About, Services, HowItWorks,
// Testimonials, FAQ, ContactCTA, Footer + WhatsAppButton flotante.
import { About } from "@/components/About";
import { ContactCTA } from "@/components/ContactCTA";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { TrustBar } from "@/components/TrustBar";

export default function Home() {
  return (
    <>
      <main id="contenido" className="flex-1">
        {/* El Hero queda fijo y la "cortina" sube por encima al hacer scroll */}
        <Hero />
        <div
          id="cortina"
          data-fab-trigger
          className="relative z-10 rounded-t-card bg-surface shadow-[0_-18px_40px_-20px_rgb(42_24_134/0.35)]"
        >
          <TrustBar />
          <About />
          <Services />
          <HowItWorks />
          <Testimonials />
          <FAQ />
          <ContactCTA />
        </div>
      </main>
      <Footer />
    </>
  );
}
