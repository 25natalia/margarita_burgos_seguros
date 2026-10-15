"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * Número que cuenta desde 0 hasta `value` la primera vez que entra en pantalla.
 * El HTML del servidor trae el valor final (sin JS o con movimiento reducido
 * se queda así). Los lectores de pantalla leen solo el valor final.
 */
export function CountUp({
  value,
  prefix = "",
  duration = 1.8,
}: {
  value: number;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const final = `${prefix}${value}`;

  // Antes de pintar, pasa a 0 para que la cuenta arranque desde ahí.
  useLayoutEffect(() => {
    if (!reduceMotion && ref.current) ref.current.textContent = `${prefix}0`;
  }, [prefix, reduceMotion]);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1], // ease-out: desacelera al final
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = `${prefix}${Math.round(latest)}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, prefix, duration]);

  return (
    <>
      <span className="sr-only">{final}</span>
      {/* min-width en ch para que el ancho no cambie al pasar de 1 a 3 dígitos */}
      <span
        ref={ref}
        aria-hidden="true"
        className="inline-block tabular-nums"
        style={{ minWidth: `${final.length}ch` }}
      >
        {final}
      </span>
    </>
  );
}
