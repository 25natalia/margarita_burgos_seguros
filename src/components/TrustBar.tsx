import { InsurerLogos } from "@/components/InsurerLogos";
import { CountUp } from "@/components/motion/CountUp";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { site } from "@/data/site";

export function TrustBar() {
  // Sin fondo propio: va dentro de la "cortina" (page.tsx), que pone el fondo y las esquinas.
  return (
    <section aria-labelledby="confianza-titulo">
      <div className="section-y mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <h2 id="confianza-titulo" className="sr-only">
          Experiencia y respaldo
        </h2>

        <RevealGroup as="dl" className="grid grid-cols-3 divide-x divide-line text-center">
          {site.stats.map((stat) => (
            <RevealItem key={stat.label} className="flex flex-col-reverse justify-end gap-1 px-2 sm:px-6">
              <dt className="text-sm leading-snug text-ink-muted sm:text-base">
                {stat.label}
              </dt>
              <dd className="font-heading text-4xl font-extrabold tracking-tight text-primary sm:text-6xl">
                <CountUp value={stat.value} prefix={stat.prefix} />
              </dd>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-16 lg:mt-20">
          <InsurerLogos insurers={site.insurers} />
        </div>
      </div>
    </section>
  );
}
