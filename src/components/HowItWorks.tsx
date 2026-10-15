"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { processSteps, type ProcessStep } from "@/data/proceso";
import { useMediaQuery } from "@/lib/useMediaQuery";

/*
 * Escritorio/tablet (≥768px, sin movimiento reducido): la sección mide 300vh y
 * su contenido queda fijo (sticky, 100vh). El progreso de ese recorrido llena
 * la línea y activa cada paso cuando el relleno llega a su nodo; al activarse
 * el paso 3 queda un tramo quieto y luego la sección se suelta.
 * Móvil: sin pin; cada paso se activa cuando su nodo cruza el 60% de la ventana.
 * Movimiento reducido: [data-reveal] deja todo visible y activo (globals.css).
 *
 * Importante: no envolver esta sección en <Reveal> ni en nada con transform,
 * overflow o contain: eso rompe position: sticky.
 */
const PIN_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
const ACTIVATION_LINE = 0.6;
/** Tramo del recorrido fijado en el que se llena la línea (el resto es pausa). */
const FILL_RANGE = [0.05, 0.8];

function TimelineStep({
  step,
  index,
  count,
  pinned,
  pinnedFill,
}: {
  step: ProcessStep;
  index: number;
  count: number;
  pinned: boolean;
  pinnedFill: MotionValue<number>;
}) {
  const nodeRef = useRef<HTMLDivElement>(null);
  // Móvil: el paso se activa cuando su nodo cruza la línea de activación.
  const { scrollYProgress: onScroll } = useScroll({
    target: nodeRef,
    offset: [`center ${ACTIVATION_LINE + 0.04}`, `center ${ACTIVATION_LINE - 0.04}`],
  });
  // Fijado: el paso se activa cuando el relleno de la línea llega a su nodo.
  const at = index / (count - 1);
  const onPinned = useTransform(pinnedFill, [at - 0.1, at], [0, 1]);
  const on = pinned ? onPinned : onScroll;

  const dim = useTransform(on, [0, 1], [0.4, 1]);
  const haloScale = useTransform(on, [0, 1], [0.4, 1]);

  const Icon = step.icon;
  const iconLeft = index % 2 === 0; // zigzag en escritorio

  return (
    <li className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-5 gap-y-4 md:grid-cols-[minmax(0,1fr)_5rem_minmax(0,1fr)] md:gap-x-10">
      {/* Nodo sobre la línea (alineado con el centro del ícono). Activo: menta (acento). */}
      <div
        ref={nodeRef}
        data-node
        aria-hidden="true"
        className="relative z-[2] col-start-1 row-start-1 self-center justify-self-center md:col-start-2"
      >
        <motion.span
          data-reveal
          style={{ opacity: on, scale: haloScale }}
          className="absolute -inset-3 rounded-full bg-mint/45 blur-[3px]"
        />
        <span className="relative block size-4 rounded-full bg-white ring-2 ring-line" />
        <motion.span
          data-reveal
          style={{ opacity: on }}
          className="absolute inset-0 rounded-full bg-mint ring-4 ring-white"
        />
      </div>

      {/* Ícono tipo app: misma distancia a la línea en todos los pasos */}
      <motion.div
        data-reveal
        style={{ opacity: dim }}
        className={`col-start-2 row-start-1 ${
          iconLeft ? "md:col-start-1 md:justify-self-end" : "md:col-start-3 md:justify-self-start"
        }`}
      >
        <div className="relative flex size-16 items-center justify-center rounded-card border border-line bg-linear-to-b from-white to-tint">
          <Icon aria-hidden="true" className="size-7 text-primary" strokeWidth={1.5} />
          <motion.span
            aria-hidden="true"
            data-reveal
            style={{ opacity: on }}
            className="absolute -inset-px flex items-center justify-center rounded-card bg-primary text-white shadow-raised"
          >
            <Icon className="size-7" strokeWidth={1.5} />
          </motion.span>
        </div>
      </motion.div>

      {/* Texto: número → título → descripción */}
      <motion.div
        data-reveal
        style={{ opacity: dim }}
        className={`col-start-2 row-start-2 md:row-start-1 md:self-center ${
          iconLeft ? "md:col-start-3" : "md:col-start-1 md:text-right"
        }`}
      >
        <span className="inline-block rounded-full bg-tint px-3 py-1 text-xs font-bold text-primary tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="relative mt-3 text-h3 font-bold text-ink">
          <span className="sr-only">Paso {index + 1}: </span>
          {step.title}
          {/* Al activarse, el título pasa a violeta (fundido; solo opacity) */}
          <motion.span aria-hidden="true" data-reveal style={{ opacity: on }} className="absolute inset-0 text-primary">
            {step.title}
          </motion.span>
        </h3>
        <p className={`mt-2 max-w-prose text-ink-muted ${iconLeft ? "" : "md:ml-auto"}`}>{step.description}</p>
      </motion.div>
    </li>
  );
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const pinned = useMediaQuery(PIN_QUERY);

  // La línea va exactamente del primer al último nodo.
  useEffect(() => {
    const wrap = wrapRef.current;
    const line = lineRef.current;
    if (!wrap || !line) return;
    const update = () => {
      const nodes = wrap.querySelectorAll<HTMLElement>("[data-node]");
      if (nodes.length < 2) return;
      const base = wrap.getBoundingClientRect().top;
      const center = (el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        return r.top + r.height / 2 - base;
      };
      const top = center(nodes[0]);
      line.style.top = `${top}px`;
      line.style.height = `${center(nodes[nodes.length - 1]) - top}px`;
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  // Fijado: progreso del recorrido de 300vh.
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const pinnedFill = useTransform(sectionProgress, FILL_RANGE, [0, 1]);
  // Móvil: la punta de la línea sigue la línea de activación.
  const { scrollYProgress: lineFill } = useScroll({
    target: lineRef,
    offset: [`start ${ACTIVATION_LINE}`, `end ${ACTIVATION_LINE}`],
  });
  const fill = pinned ? pinnedFill : lineFill;

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      aria-labelledby="como-funciona-titulo"
      className="bg-surface md:motion-safe:h-[300vh]"
    >
      <div className="md:motion-safe:sticky md:motion-safe:top-0 md:motion-safe:flex md:motion-safe:h-svh md:motion-safe:items-center md:motion-safe:pt-20">
        <div className="section-y mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8 md:motion-safe:py-0">
          <SectionHeading
            id="como-funciona-titulo"
            title="Así de fácil es protegerte"
            subtitle="Tres pasos claros, y yo a tu lado en cada uno."
          />

          <div ref={wrapRef} className="relative mx-auto mt-12 max-w-5xl xl:mt-16">
            {/* Línea: lavanda de base y relleno violeta que crece con el scroll */}
            <div
              ref={lineRef}
              aria-hidden="true"
              className="absolute left-7 z-[1] w-0.5 -translate-x-1/2 overflow-hidden rounded-full bg-line md:left-1/2"
            >
              <motion.div data-reveal style={{ scaleY: fill }} className="absolute inset-0 origin-top bg-primary" />
            </div>

            <ol className="relative grid gap-y-14 md:gap-y-16 xl:gap-y-20">
              {processSteps.map((step, i) => (
                <TimelineStep
                  key={step.title}
                  step={step}
                  index={i}
                  count={processSteps.length}
                  pinned={pinned}
                  pinnedFill={pinnedFill}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
