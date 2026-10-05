import { CircleCheck, MessageCircle } from "lucide-react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";

export function About() {
  return (
    <section id="sobre-mi" aria-labelledby="sobre-mi-titulo" className="bg-surface">
      <div className="mx-auto grid max-w-content items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-md lg:max-w-none">
          <ImagePlaceholder
            label="Foto de Margarita en su oficina o con clientes"
            ratio="1/1"
          />
        </div>

        <div>
          <h2
            id="sobre-mi-titulo"
            className="text-3xl font-extrabold tracking-tight text-primary-dark sm:text-4xl"
          >
            Hola, soy Margarita
          </h2>

          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-muted">
            <p>
              Me dediqué a los seguros porque vi de cerca lo que pasa cuando una
              familia no está protegida: un accidente o una enfermedad puede
              cambiarlo todo de un día para otro. Mi trabajo es que eso no te
              pase a ti.
            </p>
            <p>
              Llevo más de {site.yearsExperience} años asesorando a familias y
              empresas en Colombia. Te explico cada póliza en palabras claras,
              comparo opciones entre varias aseguradoras y te ayudo a elegir lo
              que de verdad necesitas, sin pagar de más.
            </p>
            <p>
              Pero lo más importante llega después de firmar:{" "}
              <strong className="font-semibold text-ink">
                cuando pasa algo, no te quedas solo frente a la aseguradora.
              </strong>{" "}
              Yo te acompaño en cada reclamación, de principio a fin.
            </p>
          </div>

          <ul className="mt-8 space-y-3">
            {site.achievements.map((achievement) => (
              <li key={achievement} className="flex items-start gap-3 text-ink">
                <CircleCheck
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-primary"
                />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>

          <a
            href={whatsappLink("Hola Margarita, me gustaría hablar contigo sobre un seguro.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-primary px-7 py-4 text-base font-bold text-primary transition-colors hover:bg-primary hover:text-white sm:w-auto"
          >
            <MessageCircle aria-hidden="true" className="size-5" />
            Hablemos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
