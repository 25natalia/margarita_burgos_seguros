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

// Pilares: resumen de la presentación y del proceso de Margarita.
const pillars = [
  { title: "Te hablo claro", text: "Asesoría transparente e integral.", icon: ChatBubbleLeftRightIcon, iconSolid: ChatSolid },
  { title: "Comparo por ti", text: "Entre SURA, Skandia y Dominion.", icon: ScaleIcon, iconSolid: ScaleSolid },
  { title: "Te acompaño siempre", text: "Para cualquier gestión futura.", icon: ShieldCheckIcon, iconSolid: ShieldSolid },
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
              Crecí viendo a mi familia dedicar su vida a esta profesión. Mi abuelo
              empezó a trabajar en seguros SURA cuando todavía se llamaba
              Suramericana, ocupó diferentes cargos hasta convertirse en asesor, y
              eso nos motivó a varios en la familia a involucrarnos en el sector.
            </p>
            <p>
              Con el tiempo comprendí la importancia de{" "}
              <strong className="font-semibold text-primary-dark">
                llevar los seguros a las familias brindándoles tranquilidad
              </strong>
              . Eso me motivó a seguir este camino: acompañar a más familias a
              proteger su tranquilidad, su familia y su patrimonio, con una asesoría
              transparente e integral.
            </p>
            <p>
              Asesoro desde {site.startYear} y hoy acompaño a mis clientes en más de{" "}
              {site.stats[1].value} pólizas activas.
            </p>
          </Reveal>

          {/* Pilares compactos: en hover se elevan y el ícono se rellena */}
          <RevealGroup as="ul" className="mt-8 grid gap-2 sm:grid-cols-3">
            {pillars.map(({ title, text, icon: Icon, iconSolid: IconSolid }) => (
              <RevealItem
                as="li"
                key={title}
                className="group/pillar card-lift flex items-center gap-3 rounded-control bg-white px-3 py-2.5 sm:flex-col sm:items-start sm:gap-2 sm:p-3"
              >
                <span className="relative flex size-8 shrink-0 items-center justify-center rounded-control bg-tint">
                  <Icon aria-hidden="true" className="size-4 text-complement" strokeWidth={1.5} />
                  <span className="absolute inset-0 flex items-center justify-center rounded-control bg-complement opacity-0 transition-opacity duration-300 ease-brand group-hover/pillar:opacity-100">
                    <IconSolid aria-hidden="true" className="size-4 text-white" />
                  </span>
                </span>
                <span className="leading-snug">
                  <span className="block text-sm font-semibold text-primary-dark">{title}</span>
                  <span className="block text-sm text-ink-muted">{text}</span>
                </span>
              </RevealItem>
            ))}
          </RevealGroup>

          <RevealGroup as="ul" className="mt-8 space-y-3">
            {site.achievements.map((achievement) => (
              <RevealItem as="li" key={achievement} className="flex items-start gap-3 text-ink">
                <CheckCircleIcon aria-hidden="true" className="size-5 shrink-0 text-complement" strokeWidth={1.5} />
                <span>{achievement}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
