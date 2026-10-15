import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { FaqAccordion } from "@/components/FaqAccordion";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/data/site";
import { getWhatsAppLink } from "@/lib/whatsapp";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: site.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export function FAQ() {
  return (
    <>
      <section id="preguntas-frecuentes" aria-labelledby="faq-titulo" className="section-y bg-surface">
        <div className="mx-auto grid max-w-content gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
          {/* Columna fija: el Reveal va dentro del sticky para no romperlo con su transform */}
          <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
            <Reveal>
              <SectionHeading id="faq-titulo" title="Preguntas frecuentes" align="left" />
              <p className="mt-4 max-w-prose text-lead text-ink-muted">
                Si te queda alguna duda, escríbeme y te respondo personalmente.
              </p>
              <a
                href={getWhatsAppLink("Hola Margarita, tengo una pregunta sobre un seguro.")}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link mt-4 -ml-2 inline-flex min-h-11 items-center gap-2 rounded-full px-2 font-semibold text-primary transition-colors duration-150 ease-brand hover:text-primary-dark"
              >
                Pregúntame por WhatsApp
                <ArrowRightIcon
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-5 transition-transform duration-300 ease-brand group-hover/link:translate-x-1 motion-reduce:transition-none"
                />
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <FaqAccordion faqs={site.faqs} />
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
