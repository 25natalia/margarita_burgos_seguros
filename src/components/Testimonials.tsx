import { Star, UserRound } from "lucide-react";
import { SectionDivider } from "@/components/SectionDivider";
import { site } from "@/data/site";

type Testimonial = (typeof site.testimonials)[number];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full w-72 flex-col rounded-2xl border border-line bg-white p-6 shadow-sm sm:w-96 sm:p-8">
      <div className="flex gap-1 text-star">
        {Array.from({ length: testimonial.rating }, (_, i) => (
          <Star key={i} aria-hidden="true" className="size-5 fill-current" />
        ))}
        <span className="sr-only">{testimonial.rating} de 5 estrellas</span>
      </div>

      <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-ink">
        <p>“{testimonial.quote}”</p>
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3">
        {/* Avatar placeholder: reemplazar por next/image (48×48, redondo) */}
        <span
          aria-hidden="true"
          title="Foto del cliente"
          className="flex size-12 shrink-0 items-center justify-center rounded-full border border-dashed border-line bg-surface-muted text-ink-muted"
        >
          <UserRound className="size-6 opacity-60" strokeWidth={1.5} />
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
    <>
      <SectionDivider
        fromClassName="text-surface-muted"
        toClassName="bg-surface"
        direction="left"
      />
      <section
        id="testimonios"
        aria-labelledby="testimonios-titulo"
        className="bg-surface pt-8 pb-16 lg:pt-12 lg:pb-24"
      >
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <h2
            id="testimonios-titulo"
            className="text-center text-3xl font-extrabold tracking-tight text-primary-dark sm:text-4xl"
          >
            Lo que dicen mis clientes
          </h2>
        </div>

        {/* Ticker a todo el ancho: las tarjetas asoman cortadas por los bordes.
            Con prefers-reduced-motion no se anima y se desplaza a mano. */}
        <div
          role="region"
          aria-label="Testimonios de clientes"
          tabIndex={0}
          className="group mt-12 overflow-x-hidden py-2 motion-reduce:overflow-x-auto motion-reduce:px-4"
        >
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] group-focus-visible:[animation-play-state:paused] motion-reduce:animate-none">
            <TestimonialGroup />
            <TestimonialGroup hidden />
          </div>
        </div>
      </section>
    </>
  );
}
