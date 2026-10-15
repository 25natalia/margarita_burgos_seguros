"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, useState } from "react";
import { SeguroPill } from "@/components/SeguroPill";
import { seguros, type SeguroConColor } from "@/data/seguros";
import { duration, ease, fadeUp, spring } from "@/lib/motion";
import { useMediaQuery } from "@/lib/useMediaQuery";

// Debe coincidir con las clases lg:motion-safe:* del layout fijado.
const PIN_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const last = seguros.length - 1;

/**
 * Posición vertical (px), escala, opacidad y giro según la distancia a la
 * píldora activa (s = índice − activa). Las posiciones están "comprimidas"
 * para que la pila quede compacta aunque las vecinas se achiquen.
 */
const DIST = [-3, -2, -1, 0, 1, 2, 3];
/** Posición en múltiplos del alto de la píldora (para 152px: ±150, ±270, ±372). */
const Y_FACTOR = [-2.45, -1.78, -0.99, 0, 0.99, 1.78, 2.45];
/** Alto de la píldora grande: debe coincidir con SeguroPill size="lg". */
const PILL_HEIGHT = { lg: 128, xl: 152 };
const SCALE = [0.5, 0.6, 0.78, 1, 0.78, 0.6, 0.5];
const OPACITY = [0, 0.2, 0.5, 1, 0.5, 0.2, 0];
const ROTATE_X = [40, 30, 18, 0, -18, -30, -40];

/**
 * "Snap" visual: dentro de cada tramo entre dos seguros, el activo se queda
 * quieto el 25% inicial y final y solo cambia en el centro. No toca el scroll.
 */
function snap(v: number) {
  const base = Math.floor(v);
  const t = v - base;
  const hold = 0.25;
  const x = Math.min(1, Math.max(0, (t - hold) / (1 - 2 * hold)));
  return base + x * x * (3 - 2 * x);
}

function WheelItem({
  seguro,
  index,
  active,
  pillHeight,
  onFocusItem,
}: {
  seguro: SeguroConColor;
  index: number;
  active: MotionValue<number>;
  pillHeight: number;
  onFocusItem: (index: number) => void;
}) {
  const s = useTransform(active, (v) => Math.max(-3, Math.min(3, index - v)));
  const y = useTransform(s, DIST, Y_FACTOR.map((f) => f * pillHeight));
  const scale = useTransform(s, DIST, SCALE);
  const opacity = useTransform(s, DIST, OPACITY);
  const rotateX = useTransform(s, DIST, ROTATE_X);
  const zIndex = useTransform(s, (v) => 10 - Math.round(Math.abs(v)));

  return (
    <motion.li
      style={{ y, scale, opacity, rotateX, zIndex }}
      className="absolute inset-x-0 top-1/2 -translate-y-1/2"
    >
      <SeguroPill seguro={seguro} size="lg" onFocus={() => onFocusItem(index)} />
    </motion.li>
  );
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinned = useMediaQuery(PIN_QUERY);
  const xl = useMediaQuery("(min-width: 1280px)");
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const snapped = useTransform(scrollYProgress, (p) => snap(p * last));
  // El resorte suaviza el "encaje" en el centro.
  const active = useSpring(snapped, spring.soft);
  useMotionValueEvent(snapped, "change", (v) => setActiveIndex(Math.round(v)));

  // Con teclado: al enfocar una píldora, hacer scroll hasta que sea la activa.
  function scrollToItem(index: number) {
    const section = sectionRef.current;
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const range = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (index / last) * range });
  }

  const current = seguros[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="servicios"
      aria-labelledby="servicios-titulo"
      className="bg-surface lg:motion-safe:h-[450vh]"
    >
      <div className="lg:motion-safe:sticky lg:motion-safe:top-0 lg:motion-safe:flex lg:motion-safe:h-svh lg:motion-safe:items-center lg:motion-safe:pt-20">
        <div className="section-y mx-auto grid w-full max-w-content gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-8 lg:motion-safe:py-0">
          <div className="lg:col-span-6">
            <h2
              id="servicios-titulo"
              className="text-gradient text-display-xl font-extrabold"
            >
              <span className="block lg:whitespace-nowrap">Seguros pensados</span>
              <span className="block">para ti</span>
            </h2>
            <p className="mt-6 max-w-prose text-lead text-ink-muted">
              Estos son los seguros con los que te puedo acompañar. Elige uno y te cuento, sin
              letra pequeña, qué cubre y quién lo ofrece.
            </p>

            {pinned && (
              <div aria-hidden="true" className="mt-12 flex items-end gap-8">
                <p className="font-heading text-6xl leading-none font-extrabold tracking-tight text-primary tabular-nums">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={activeIndex}
                      className="inline-block"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -24 }}
                      transition={{ duration: duration.base, ease }}
                    >
                      {String(activeIndex + 1).padStart(2, "0")}
                    </motion.span>
                  </AnimatePresence>
                  <span className="ml-2 text-2xl text-primary/40">/ {String(seguros.length).padStart(2, "0")}</span>
                </p>
                <div className="relative h-14 min-w-0 flex-1 overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={activeIndex}
                      className="absolute inset-x-0 bottom-0"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -24 }}
                      transition={{ duration: duration.base, ease }}
                    >
                      <p className="flex items-center gap-2 text-sm font-semibold text-ink-muted">
                        {/* Acento: indicador del seguro activo */}
                        <span className="size-2 rounded-full bg-mint" />
                        {current.name}
                      </p>
                      <p className="truncate font-heading text-2xl font-extrabold text-primary-dark">{current.tagline}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>

          {pinned ? (
            // Rueda: perspectiva para el giro en X y máscara que funde con el blanco.
            <div className="relative h-[34rem] lg:col-span-6 xl:h-[40rem] [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)] [perspective:1200px]">
              {/* Margen lateral para que la máscara no recorte las sombras de las píldoras */}
              <ul className="absolute inset-y-0 right-10 left-6 [transform-style:preserve-3d] xl:right-14 xl:left-8">
                {seguros.map((seguro, i) => (
                  <WheelItem
                    key={seguro.slug}
                    seguro={seguro}
                    index={i}
                    active={active}
                    pillHeight={xl ? PILL_HEIGHT.xl : PILL_HEIGHT.lg}
                    onFocusItem={scrollToItem}
                  />
                ))}
              </ul>
              {/* Progreso de la sección */}
              <div aria-hidden="true" className="absolute top-[18%] right-0 bottom-[18%] w-1 overflow-hidden rounded-full bg-line">
                <motion.div style={{ scaleY: scrollYProgress }} className="absolute inset-0 origin-top bg-primary" />
              </div>
            </div>
          ) : (
            // Móvil, tablet o movimiento reducido: lista normal con fade-up.
            <ul className="flex flex-col gap-3 lg:col-span-6">
              {seguros.map((seguro) => (
                <motion.li key={seguro.slug} data-reveal {...fadeUp} viewport={{ once: true, amount: 0.6 }}>
                  <SeguroPill seguro={seguro} />
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
