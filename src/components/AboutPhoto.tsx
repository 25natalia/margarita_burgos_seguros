"use client";

import { CalendarDaysIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type PointerEvent } from "react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/data/site";
import { spring } from "@/lib/motion";
import { useMediaQuery } from "@/lib/useMediaQuery";

/** Inclinación máxima de la foto (grados). */
const MAX_TILT = 7;
const TILT_QUERY =
  "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

// Badges con datos que ya existen en el sitio (site.stats).
const badges = [
  {
    stat: site.stats[0],
    icon: CalendarDaysIcon,
    // Móvil: abajo a la izquierda (no tapa la cara). Escritorio: arriba a la izquierda, por fuera.
    position: "bottom-20 left-3 lg:top-12 lg:bottom-auto lg:-left-10",
    floatDelay: "0s",
  },
  {
    stat: site.stats[1],
    icon: UserGroupIcon,
    position: "bottom-3 right-3 lg:bottom-14 lg:-right-8",
    floatDelay: "-3.5s",
  },
];

/**
 * Foto de "Hola, soy Margarita": inclinación 3D que sigue al cursor (solo con
 * mouse en escritorio y sin movimiento reducido), forma lavanda detrás con
 * parallax suave y badges flotantes.
 */
export function AboutPhoto() {
  const ref = useRef<HTMLDivElement>(null);
  const tilt = useMediaQuery(TILT_QUERY);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, spring.soft);
  const rotateY = useSpring(ry, spring.soft);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], [48, -48]);

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!tilt || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 2 * MAX_TILT);
    rx.set(-py * 2 * MAX_TILT);
  }

  function reset() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className="relative mx-auto w-full max-w-md [perspective:1200px] lg:max-w-none"
    >
      {/* Forma decorativa detrás (parallax) */}
      <motion.div
        aria-hidden="true"
        data-reveal
        style={{ y: blobY }}
        className="absolute -inset-3 rounded-[42%_58%_55%_45%/48%_44%_56%_52%] bg-linear-to-br from-primary-soft to-secondary-hover lg:-inset-10"
      />

      <motion.div style={{ rotateX, rotateY }} className="relative [transform-style:preserve-3d]">
        <ImagePlaceholder
          label="Foto de Margarita en su oficina o con clientes"
          ratio="4/5"
          radius="rounded-feature"
          className="shadow-raised"
        />

        {badges.map(({ stat, icon: Icon, position, floatDelay }, i) => (
          <div key={stat.label} className={`absolute ${position}`} style={{ transform: "translateZ(40px)" }}>
            <Reveal delay={0.3 + i * 0.15}>
              <div
                className="flex animate-float items-center gap-3 rounded-card border border-line bg-white px-4 py-3 shadow-raised motion-reduce:animate-none"
                style={{ animationDelay: floatDelay }}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-control bg-tint">
                  <Icon aria-hidden="true" className="size-5 text-primary" strokeWidth={1.5} />
                </span>
                <span className="leading-tight">
                  <span className="block font-heading text-xl font-extrabold text-primary">
                    {stat.prefix}
                    {stat.value}
                  </span>
                  <span className="block text-xs text-ink-muted">{stat.label}</span>
                </span>
              </div>
            </Reveal>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
