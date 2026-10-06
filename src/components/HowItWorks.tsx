import { MessageCircle } from "lucide-react";
import { SectionDivider } from "@/components/SectionDivider";
import { whatsappLink } from "@/lib/whatsapp";

const steps = [
  {
    title: "Me escribes y me cuentas qué necesitas",
    description: "Por WhatsApp, sin formularios largos ni compromiso.",
  },
  {
    title: "Te comparo opciones de varias aseguradoras",
    description: "Revisamos coberturas y precios, en palabras claras.",
  },
  {
    title: "Eliges y yo te acompaño, también si tienes un siniestro",
    description: "Si algo pasa, hago la reclamación contigo de principio a fin.",
  },
];

export function HowItWorks() {
  return (
    <>
      <SectionDivider fromClassName="text-surface" toClassName="bg-surface-muted" />
      <section
        id="como-funciona"
        aria-labelledby="como-funciona-titulo"
        className="bg-surface-muted"
      >
        <div className="mx-auto max-w-content px-4 pt-8 pb-16 sm:px-6 lg:px-8 lg:pt-12 lg:pb-24">
          <h2
            id="como-funciona-titulo"
            className="text-center text-3xl font-extrabold tracking-tight text-primary-dark sm:text-4xl"
          >
            Así de fácil es protegerte
          </h2>

          <div className="relative mt-12">
            {/* Línea que conecta los círculos; solo se ve en los espacios entre tarjetas */}
            <div
              aria-hidden="true"
              className="absolute inset-x-[16%] top-16 hidden border-t-2 border-dashed border-primary/30 lg:block"
            />

            <ol className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              {steps.map((step, i) => {
                const highlighted = i === steps.length - 1;
                return (
                  <li
                    key={step.title}
                    className={`relative flex flex-col items-center rounded-2xl p-8 text-center ${
                      highlighted
                        ? "bg-primary-dark text-white shadow-xl shadow-primary-dark/20 lg:-translate-y-2"
                        : "border border-line bg-white"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`flex size-16 items-center justify-center rounded-full text-2xl font-extrabold ${
                        highlighted ? "bg-mint text-ink" : "bg-primary text-white"
                      }`}
                    >
                      {i + 1}
                    </span>
                    {highlighted && (
                      <span className="mt-4 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                        Lo que me diferencia
                      </span>
                    )}
                    <h3
                      className={`mt-4 text-xl font-bold leading-snug ${
                        highlighted ? "text-white" : "text-primary-dark"
                      }`}
                    >
                      <span className="sr-only">Paso {i + 1}: </span>
                      {step.title}
                    </h3>
                    <p className={`mt-2 ${highlighted ? "text-white/85" : "text-ink-muted"}`}>
                      {step.description}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="mt-12 flex justify-center">
            <a
              href={whatsappLink("Hola Margarita, quiero cotizar un seguro")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-bold text-white shadow-lg shadow-accent/25 transition-colors hover:bg-accent-dark sm:w-auto"
            >
              <MessageCircle aria-hidden="true" className="size-5" />
              Cotiza gratis por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
