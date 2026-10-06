import { Mail, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { SectionDivider } from "@/components/SectionDivider";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";

// Sobre el fondo violeta el foco global (azul) no se ve: aquí va en blanco.
const onDarkFocus = "focus-visible:outline-white";

export function ContactCTA() {
  return (
    <>
      <SectionDivider
        fromClassName="text-surface-muted"
        toClassName="bg-primary"
        direction="left"
      />
      <section id="contacto" aria-labelledby="contacto-titulo" className="bg-primary text-white">
        <div className="mx-auto grid max-w-content items-center gap-12 px-4 pt-8 pb-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pt-12 lg:pb-24">
          <div className="text-center lg:text-left">
            <div className="mx-auto max-w-sm lg:mx-0">
              <ImagePlaceholder label="Foto de Margarita – cierre" ratio="4/3" />
            </div>

            <h2
              id="contacto-titulo"
              className="mt-8 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Hablemos sin compromiso
            </h2>
            <p className="mt-4 text-lg text-white/85">
              Cuéntame qué quieres proteger y te respondo hoy mismo con opciones
              claras. Sin letra pequeña.
            </p>

            <a
              href={whatsappLink("Hola Margarita, quiero hablar contigo sobre un seguro.")}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-8 py-5 text-lg font-bold text-primary shadow-lg shadow-black/20 transition-colors hover:bg-primary-soft sm:w-auto ${onDarkFocus}`}
            >
              <MessageCircle aria-hidden="true" className="size-6" />
              Escríbeme por WhatsApp
            </a>

            <ul className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-8 lg:justify-start">
              <li>
                <a
                  href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                  className={`inline-flex items-center gap-2 font-semibold hover:underline ${onDarkFocus}`}
                >
                  <Phone aria-hidden="true" className="size-5 text-white/70" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className={`inline-flex items-center gap-2 font-semibold hover:underline ${onDarkFocus}`}
                >
                  <Mail aria-hidden="true" className="size-5 text-white/70" />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl bg-white p-6 text-ink shadow-2xl shadow-black/20 sm:p-8">
            <h3 className="text-2xl font-extrabold text-primary-dark">
              Pide tu cotización
            </h3>
            <p className="mt-1 mb-6 text-ink-muted">
              Déjame tus datos y te contacto yo.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
