import { UserIcon } from "@heroicons/react/24/outline";
// Estrellas rellenas: única excepción al estilo outline (la calificación se lee mejor llena).
import { StarIcon } from "@heroicons/react/24/solid";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/data/site";

type Testimonial = (typeof site.testimonials)[number];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="card-lift flex h-full w-72 flex-col rounded-card bg-white p-6 sm:w-96 sm:p-8">
      <div className="flex gap-1 text-star">
        {Array.from({ length: testimonial.rating }, (_, i) => (
          <StarIcon key={i} aria-hidden="true" className="size-5" />
        ))}
        <span className="sr-only">{testimonial.rating} de 5 estrellas</span>
      </div>

      <blockquote className="mt-5 flex-1 text-lead text-ink">
        <p>“{testimonial.quote}”</p>
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3">
        {/* Avatar placeholder: reemplazar por next/image (48×48, redondo) */}
        <span
          aria-hidden="true"
          title="Foto del cliente"
          className="flex size-12 shrink-0 items-center justify-center rounded-full border border-dashed border-line bg-tint text-primary/60"
        >
          <UserIcon className="size-6" strokeWidth={1.5} />
        </span>
        <span>
          <span className="block font-bold text-primary-dark">{testimonial.name}</span>
          <span className="block text-sm text-ink-muted">{testimonial.city}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function TestimonialGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 gap-6 pr-6 ${hidden ? "motion-reduce:hidden" : ""}`}
    >
      {site.testimonials.map((testimonial) => (
        <li key={testimonial.name}>
          <TestimonialCard testimonial={testimonial} />
        </li>
      ))}
    </ul>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonios"
      aria-labelledby="testimonios-titulo"
      className="section-y bg-tint"
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading id="testimonios-titulo" title="Lo que dicen mis clientes" />
        </Reveal>
      </div>

      {/* Ticker a todo el ancho: las tarjetas asoman cortadas por los bordes.
          Con prefers-reduced-motion no se anima y se desplaza a mano. */}
      <Reveal delay={0.1}>
        <div
          role="region"
          aria-label="Testimonios de clientes"
          tabIndex={0}
          className="group relative mt-12 overflow-x-hidden pt-4 pb-12 lg:mt-16 motion-reduce:overflow-x-auto motion-reduce:px-4"
        >
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] group-focus-visible:[animation-play-state:paused] motion-reduce:animate-none">
            <TestimonialGroup />
            <TestimonialGroup hidden />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
