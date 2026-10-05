import { ArrowDown, MessageCircle } from "lucide-react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { SectionDivider } from "@/components/SectionDivider";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";

export function Hero() {
  return (
    <>
      <section
        id="inicio"
        aria-labelledby="hero-titulo"
        className="bg-primary-soft"
      >
        <div className="mx-auto grid max-w-content items-center gap-10 px-4 pt-10 pb-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pt-20 lg:pb-16">
          <div className="mx-auto w-full max-w-sm lg:order-2 lg:max-w-md">
            <ImagePlaceholder
              label="Foto de Margarita sonriendo – retrato vertical"
              ratio="4/5"
            />
          </div>

          <div className="text-center lg:order-1 lg:text-left">
            <h1
              id="hero-titulo"
              className="text-3xl font-extrabold leading-tight tracking-tight text-primary-dark text-balance sm:text-4xl lg:text-5xl"
            >
              Protege a tu familia y tu patrimonio con un seguro hecho a tu
              medida
            </h1>

            <p className="mt-5 text-lg text-ink-muted sm:text-xl">
              <span className="font-semibold text-primary">{site.name}</span>
              {" · "}+{site.yearsExperience} años asesorando familias y empresas
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href={whatsappLink("Hola Margarita, quiero cotizar un seguro")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-bold text-white shadow-lg shadow-accent/25 transition-colors hover:bg-accent-dark"
              >
                <MessageCircle aria-hidden="true" className="size-5" />
                Cotiza gratis por WhatsApp
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary px-7 py-4 text-base font-bold text-primary transition-colors hover:bg-primary hover:text-white"
              >
                Ver seguros
                <ArrowDown aria-hidden="true" className="size-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <SectionDivider fromClassName="text-primary-soft" toClassName="bg-surface" />
    </>
  );
}
