import { ArrowRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { site } from "@/data/site";
import { getWhatsAppLink } from "@/lib/whatsapp";

const trustPoints = ["Te respondo hoy mismo", "Sin costo ni compromiso", "Comparo varias aseguradoras por ti"];

/** Iniciales para el avatar mientras no haya foto (site.avatar). */
const initials = site.name
  .split(" ")
  .map((word) => word[0])
  .join("")
  .slice(0, 2);

export function ContactCTA() {
  return (
    // data-fab-hide: el botón flotante de WhatsApp no tapa el envío del formulario.
    <section id="contacto" data-fab-hide aria-labelledby="contacto-titulo" className="section-y bg-primary text-white lg:py-36">
      <div className="mx-auto grid max-w-content items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Texto: 5/12 */}
        <RevealGroup className="lg:col-span-5">
          <RevealItem>
            <h2 id="contacto-titulo" className="text-display font-extrabold text-white">
              Hablemos sin compromiso
            </h2>
          </RevealItem>
          <RevealItem as="p" className="mt-5 max-w-[45ch] text-lg leading-relaxed text-white/80">
            Cuéntame qué quieres proteger y te respondo hoy mismo con opciones claras. Sin letra pequeña.
          </RevealItem>

          <ul className="mt-8 space-y-3">
            {trustPoints.map((point) => (
              <RevealItem as="li" key={point} className="flex items-center gap-3">
                {/* Acento: check en menta */}
                <span aria-hidden="true" className="flex size-6 shrink-0 items-center justify-center rounded-full bg-mint/20">
                  <CheckIcon className="size-4 text-mint" strokeWidth={2} />
                </span>
                <span className="text-white">{point}</span>
              </RevealItem>
            ))}
          </ul>

          {/* Firma: avatar circular + nombre */}
          <RevealItem className="mt-10 flex items-center gap-4 border-t border-white/15 pt-8">
            {site.avatar ? (
              <Image
                src={site.avatar}
                alt={site.name}
                width={64}
                height={64}
                className="size-16 rounded-full object-cover ring-2 ring-white/25"
              />
            ) : (
              <span
                role="img"
                aria-label={`Espacio para foto de ${site.name}`}
                className="flex size-16 shrink-0 items-center justify-center rounded-full bg-white/15 font-heading text-xl font-extrabold text-white ring-2 ring-white/25"
              >
                {initials}
              </span>
            )}
            <span className="leading-tight">
              <span className="block font-heading text-lg font-extrabold text-white">{site.name}</span>
              <span className="mt-1 block text-white/80">{site.role}</span>
            </span>
          </RevealItem>
        </RevealGroup>

        {/* Formulario: 7/12 */}
        <div className="lg:col-span-7">
          <Reveal
            delay={0.1}
            className="rounded-panel bg-white p-6 text-ink shadow-[0_2px_4px_rgb(20_10_70/0.06),0_32px_64px_-24px_rgb(20_10_70/0.45)] sm:p-10"
          >
            <h3 className="text-h3 font-extrabold text-primary-dark">Cuéntame qué necesitas</h3>
            <p className="mt-1 text-ink-muted">Solo toma un minuto.</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>
          {/* Vía directa, discreta */}
          <p className="mt-6 text-center">
            <a
              href={getWhatsAppLink("Hola Margarita, quiero hablar contigo sobre un seguro.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group/wa inline-flex min-h-11 items-center gap-2 rounded-full px-2 text-white/80 transition-colors duration-150 ease-brand hover:text-white focus-visible:outline-white"
            >
              ¿Prefieres escribirme directo? Abre WhatsApp
              <ArrowRightIcon
                aria-hidden="true"
                strokeWidth={1.5}
                className="size-5 transition-transform duration-150 ease-brand group-hover/wa:translate-x-1 motion-reduce:transition-none"
              />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
