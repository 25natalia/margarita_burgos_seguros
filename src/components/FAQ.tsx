import { ChevronDown } from "lucide-react";
import { SectionDivider } from "@/components/SectionDivider";
import { site } from "@/data/site";

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
      <SectionDivider fromClassName="text-surface" toClassName="bg-surface-muted" />
      <section
        id="preguntas-frecuentes"
        aria-labelledby="faq-titulo"
        className="bg-surface-muted"
      >
        <div className="mx-auto max-w-narrow px-4 pt-8 pb-16 sm:px-6 lg:pt-12 lg:pb-24">
          <h2
            id="faq-titulo"
            className="text-center text-3xl font-extrabold tracking-tight text-primary-dark sm:text-4xl"
          >
            Preguntas frecuentes
          </h2>

          <div className="mt-10 space-y-3">
            {site.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-line bg-white open:shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left text-lg font-bold text-primary-dark sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ChevronDown
                    aria-hidden="true"
                    className="size-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                  />
                </summary>
                <p className="px-5 pb-5 leading-relaxed text-ink-muted sm:px-6 sm:pb-6">
                  {faq.answer}
                </p>
              </details>
            ))}
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
