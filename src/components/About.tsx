import { ChatBubbleLeftRightIcon, CheckCircleIcon, ScaleIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import {
  ChatBubbleLeftRightIcon as ChatSolid,
  ScaleIcon as ScaleSolid,
  ShieldCheckIcon as ShieldSolid,
} from "@heroicons/react/24/solid";
import { AboutPhoto } from "@/components/AboutPhoto";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { site } from "@/data/site";

// Pilares: frases que ya están en el texto de presentación.
const pillars = [
  { title: "Te hablo claro", text: "Cada póliza en palabras claras.", icon: ChatBubbleLeftRightIcon, iconSolid: ChatSolid },
  { title: "Comparo por ti", text: "Opciones de varias aseguradoras.", icon: ScaleIcon, iconSolid: ScaleSolid },
  { title: "Te acompaño siempre", text: "También en cada reclamación.", icon: ShieldCheckIcon, iconSolid: ShieldSolid },
];

export function About() {
  return (
    <section id="sobre-mi" aria-labelledby="sobre-mi-titulo" className="section-y overflow-x-clip bg-surface">
      <div className="mx-auto grid max-w-content items-center gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <div className="lg:col-span-6 lg:pr-6">
          <AboutPhoto />
        </div>

        <div className="lg:col-span-6">
          <Reveal>
            <SectionHeading id="sobre-mi-titulo" title="Hola, soy Margarita" align="left" />
          </Reveal>

          <Reveal delay={0.1} className="mt-6 max-w-prose space-y-4 text-lead text-ink-muted">
            <p>
              Me dediqué a los seguros porque{" "}
              <strong className="font-semibold text-primary-dark">vi de cerca lo que pasa</strong> cuando una
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
          </Reveal>

          {/* Pilares: en hover se elevan y el ícono se rellena en violeta */}
          <RevealGroup as="ul" className="mt-10 grid gap-3 sm:grid-cols-3">
            {pillars.map(({ title, text, icon: Icon, iconSolid: IconSolid }) => (
              <RevealItem
                as="li"
                key={title}
                className="group/pillar card-lift rounded-card bg-white p-5"
              >
                <span className="relative flex size-11 items-center justify-center rounded-control bg-tint">
                  <Icon aria-hidden="true" className="size-5 text-primary" strokeWidth={1.5} />
                  <span className="absolute inset-0 flex items-center justify-center rounded-control bg-primary opacity-0 transition-opacity duration-300 ease-brand group-hover/pillar:opacity-100">
                    <IconSolid aria-hidden="true" className="size-5 text-white" />
                  </span>
                </span>
                <p className="mt-4 font-heading font-extrabold text-primary-dark">{title}</p>
                <p className="mt-1 text-ink-muted">{text}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <RevealGroup as="ul" className="mt-8 space-y-3">
            {site.achievements.map((achievement) => (
              <RevealItem as="li" key={achievement} className="flex items-start gap-3 text-ink">
                <CheckCircleIcon aria-hidden="true" className="size-5 shrink-0 text-primary" strokeWidth={1.5} />
                <span>{achievement}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
