// Orden de secciones: Hero, TrustBar, Services, About, HowItWorks,
// Testimonials, FAQ, ContactCTA, Footer + WhatsAppButton flotante.
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main id="contenido" className="flex-1">
      <Hero />
    </main>
  );
}
