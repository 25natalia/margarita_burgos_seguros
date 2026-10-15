import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChatBubbleOvalLeftIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { InsurerLogos } from "@/components/InsurerLogos";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { processSteps } from "@/data/proceso";
import { getSeguro, seguros } from "@/data/seguros";
import { site } from "@/data/site";
import { getWhatsAppLink } from "@/lib/whatsapp";

// Solo existen las páginas de los seguros del archivo de datos; el resto es 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return seguros.map((seguro) => ({ slug: seguro.slug }));
}

export async function generateMetadata({ params }: PageProps<"/seguros/[slug]">): Promise<Metadata> {
  const seguro = getSeguro((await params).slug);
  if (!seguro) return {};
  return {
    title: `${seguro.name} · ${site.name}, asesora de seguros`,
    description: `${seguro.tagline}. ${seguro.description}`,
  };
}

export default async function SeguroPage({ params }: PageProps<"/seguros/[slug]">) {
  const seguro = getSeguro((await params).slug);
  if (!seguro) notFound();

  const Icon = seguro.icon;
  const quoteHref = getWhatsAppLink(`Hola Margarita, quiero cotizar ${seguro.quoteLabel}`);

  return (
    <>
      <main id="contenido" className="flex-1">
        {/* Hero corto, borde recto (pt: espacio para el header fijo) */}
        <section aria-labelledby="seguro-titulo" className="bg-primary pt-24 pb-16 text-white lg:pt-32 lg:pb-24">
          <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
            <Link
              href="/#servicios"
              className="-ml-2 inline-flex min-h-11 items-center gap-2 rounded-full px-2 text-sm font-semibold text-white/80 transition-colors duration-150 ease-brand hover:text-white focus-visible:outline-white"
            >
              <ArrowLeftIcon aria-hidden="true" className="size-5" strokeWidth={1.5} />
              Ver todos los seguros
            </Link>

            <div className="mt-10 flex flex-col items-center gap-8 text-center md:flex-row md:gap-12 md:text-left">
              <span className="flex size-28 shrink-0 items-center justify-center rounded-full bg-white shadow-float lg:size-36">
                <Icon aria-hidden="true" className="size-14 text-primary lg:size-16" strokeWidth={1.5} />
              </span>
              <div>
                <h1 id="seguro-titulo" className="text-display font-extrabold">
                  {seguro.name}
                </h1>
                <p className="mt-4 text-lead text-white/85">{seguro.tagline}</p>
                <Button href={quoteHref} variant="inverse" size="lg" icon={ChatBubbleOvalLeftIcon} className="mt-8 w-full sm:w-auto">
                  Cotiza este seguro por WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Lo que viene después del Hero: activa el botón flotante de WhatsApp */}
        <div data-fab-trigger>
          <section aria-labelledby="que-es" className="section-y bg-surface">
            <div className="mx-auto max-w-narrow px-4 sm:px-6">
              <Reveal>
                <SectionHeading id="que-es" title="¿Qué es?" align="left" />
                <p className="mt-6 max-w-prose text-lead text-ink-muted">{seguro.description}</p>
              </Reveal>
            </div>
          </section>

          <section aria-labelledby="que-cubre" className="section-y bg-tint">
            <div className="mx-auto max-w-narrow px-4 sm:px-6">
              <Reveal>
                <SectionHeading id="que-cubre" title="¿Qué cubre?" align="left" />
              </Reveal>
              <RevealGroup as="ul" className="mt-10 grid gap-3 sm:grid-cols-2">
                {seguro.coverages.map((coverage) => (
                  <RevealItem as="li" key={coverage} className="flex items-start gap-3 rounded-card border border-line bg-white p-5 text-ink">
                    {/* Acento: check de cobertura en menta */}
                    <CheckCircleIcon aria-hidden="true" className="size-6 shrink-0 text-mint-deep" strokeWidth={1.5} />
                    <span>{coverage}</span>
                  </RevealItem>
                ))}
              </RevealGroup>
              <p className="mt-6 max-w-prose text-ink-muted">
                Lo que cubre cada póliza depende de la aseguradora y del plan. Antes de que
                decidas, te explico punto por punto qué incluye y qué no.
              </p>
            </div>
          </section>

          <section aria-labelledby="para-quien" className="section-y bg-surface">
            <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
              <Reveal>
                <SectionHeading id="para-quien" title="¿Para quién es ideal?" />
              </Reveal>
              <RevealGroup as="ul" className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] lg:mt-16">
                {seguro.idealFor.map((profile) => (
                  <RevealItem
                    as="li"
                    key={profile.title}
                    className="card-lift rounded-card bg-tint p-6"
                  >
                    <h3 className="text-h3 font-bold text-primary-dark">{profile.title}</h3>
                    <p className="mt-2 text-ink-muted">{profile.text}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </section>

          <section aria-labelledby="aseguradoras" className="section-y bg-tint">
            <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
              <Reveal>
                <SectionHeading
                  id="aseguradoras"
                  title="Aseguradoras con las que lo puedes tener"
                  subtitle="Comparo entre ellas para que elijas la que mejor te queda."
                />
              </Reveal>
              <div className="mt-12 lg:mt-16">
                <InsurerLogos insurers={seguro.insurers} />
              </div>
            </div>
          </section>

          <section aria-labelledby="acompano" className="section-y bg-surface">
            <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
              <Reveal>
                <SectionHeading id="acompano" title="Cómo te acompaño" />
              </Reveal>
              <RevealGroup as="ol" className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3 lg:mt-16">
                {processSteps.map((step, i) => {
                  const StepIcon = step.icon;
                  return (
                    <RevealItem as="li" key={step.title} className="rounded-card border border-line bg-white p-6">
                      <div className="flex items-center gap-3">
                        <span className="flex size-12 items-center justify-center rounded-control bg-tint">
                          <StepIcon aria-hidden="true" className="size-6 text-primary" strokeWidth={1.5} />
                        </span>
                        <span className="rounded-full bg-tint px-3 py-1 text-xs font-bold text-primary tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="mt-5 text-h3 font-bold text-primary-dark">{step.title}</h3>
                      <p className="mt-2 text-ink-muted">{step.description}</p>
                    </RevealItem>
                  );
                })}
              </RevealGroup>
              <div className="mt-10 text-center">
                <Button href="/#como-funciona" variant="secondary" size="md" iconRight={ArrowRightIcon}>
                  Ver el proceso completo
                </Button>
              </div>
            </div>
          </section>

          <section aria-labelledby="cta-final" className="section-y bg-primary text-white">
            <div className="mx-auto max-w-narrow px-4 text-center sm:px-6">
              <Reveal>
                <SectionHeading
                  id="cta-final"
                  title="Lo revisamos juntos, sin compromiso"
                  subtitle="Escríbeme, cuéntame qué quieres proteger y te explico tus opciones con calma."
                  onDark
                />
                <Button href={quoteHref} variant="inverse" size="lg" icon={ChatBubbleOvalLeftIcon} className="mt-10 w-full sm:w-auto">
                  Cotiza este seguro por WhatsApp
                </Button>
              </Reveal>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
