type SectionDividerProps = {
  /** Color de la sección de arriba, como clase de texto (ej. "text-primary"). */
  fromClassName: string;
  /** Fondo de la sección de abajo, como clase de fondo (ej. "bg-surface"). */
  toClassName: string;
  /** Hacia qué lado baja la diagonal. */
  direction?: "left" | "right";
  className?: string;
};

/**
 * Borde diagonal entre dos secciones. Se coloca entre ellas:
 *
 *   <Hero />          // fondo bg-primary
 *   <SectionDivider fromClassName="text-primary" toClassName="bg-surface" />
 *   <TrustBar />      // fondo bg-surface
 */
export function SectionDivider({
  fromClassName,
  toClassName,
  direction = "right",
  className = "h-12 sm:h-16 lg:h-24",
}: SectionDividerProps) {
  const points = direction === "right" ? "0,0 100,0 0,100" : "0,0 100,0 100,100";

  return (
    <div aria-hidden="true" className={`${toClassName} ${className} -mt-px`}>
      <svg
        className={`${fromClassName} block h-full w-full`}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polygon points={points} fill="currentColor" />
      </svg>
    </div>
  );
}
