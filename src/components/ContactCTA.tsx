import { ChatBubbleOvalLeftIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { ContactForm } from "@/components/ContactForm";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/data/site";
import { getWhatsAppLink } from "@/lib/whatsapp";

const contactLink =
  "inline-flex min-h-11 items-center gap-2 rounded-full px-2 font-semibold transition-colors duration-150 ease-brand hover:text-secondary-hover focus-visible:outline-white";

export function ContactCTA() {
  return (
    <section id="contacto" data-fab-hide aria-labelledby="contacto-titulo" className="section-y bg-primary text-white">
      <div className="mx-auto grid max-w-content items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <Reveal className="text-center lg:col-span-6 lg:text-left">
          <div className="mx-auto mb-10 max-w-sm lg:mx-0">
            <ImagePlaceholder label="Foto de Margarita – cierre" ratio="4/3" />
          </div>

          <SectionHeading
            id="contacto-titulo"
            title="Hablemos sin compromiso"
            subtitle="Cuéntame qué quieres proteger y te respondo hoy mismo con opciones claras. Sin letra pequeña."
            align="responsive"
            onDark
          />

          {/* Mismo texto y mensaje que el resto de CTAs de contacto general */}
          <Button
            href={getWhatsAppLink("Hola Margarita, quiero hablar contigo sobre un seguro.")}
            variant="inverse"
            size="lg"
            icon={ChatBubbleOvalLeftIcon}
            className="mt-10 w-full sm:w-auto"
          >
            Escríbeme por WhatsApp
          </Button>

          <ul className="mt-8 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-6 lg:justify-start">
            <li>
              <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} className={contactLink}>
                <PhoneIcon aria-hidden="true" className="size-5 text-white/70" strokeWidth={1.5} />
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className={contactLink}>
                <EnvelopeIcon aria-hidden="true" className="size-5 text-white/70" strokeWidth={1.5} />
                {site.email}
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="rounded-card bg-white p-6 text-ink shadow-float sm:p-10 lg:col-span-6">
          <h3 className="text-h3 font-extrabold text-primary-dark sm:text-2xl">Pide tu cotización</h3>
          <p className="mt-1 mb-6 text-ink-muted">Déjame tus datos y te contacto yo.</p>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
