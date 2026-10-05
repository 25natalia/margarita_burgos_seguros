// Orden de secciones: Hero, TrustBar, Services, About, HowItWorks,
// Testimonials, FAQ, ContactCTA, Footer + WhatsAppButton flotante.
import { About } from "@/components/About";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";

export default function Home() {
  return (
    <main id="contenido" className="flex-1">
      <Hero />
      <TrustBar />
      {/* Services va aquí (rama feat/servicios) */}
      <About />
    </main>
  );
}
