// Sistema de movimiento único (JS). Debe coincidir con globals.css:
// duraciones 150 / 300 / 600 ms (duration-150/300/600) y --ease-brand.

/** Ease-out suave: entradas y cambios de estado. */
export const ease = [0.22, 1, 0.36, 1] as const;

export const duration = {
  fast: 0.15, // hover, color, iconos
  base: 0.3, // cambios de estado (acordeón, dropdown, contadores de la rueda)
  slow: 0.6, // apariciones
} as const;

/** Springs para elementos interactivos (sin rebote exagerado). */
export const spring = {
  /** Interacción directa (pastilla del navbar, menú). */
  snappy: { type: "spring", stiffness: 420, damping: 36, mass: 0.8 },
  /** Seguimiento suave (tilt de la foto, rueda de seguros). */
  soft: { type: "spring", stiffness: 170, damping: 26, mass: 0.6 },
} as const;

/** Entrada estándar en JS (lista de seguros en móvil): igual que <Reveal>. */
export const fadeUp = {
  initial: { opacity: 0, y: 14, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: duration.slow, ease },
} as const;
