import type { CSSProperties, ReactNode } from "react";

/**
 * Aparece con fade y una leve subida al cargar la página. Animación CSS
 * (.hero-fade en globals.css): arranca al primer pintado, sin esperar a JS.
 * Con movimiento reducido no se anima.
 */
export function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  /** Retraso en segundos. */
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`hero-fade ${className}`} style={{ "--delay": `${Math.round(delay * 1000)}ms` } as CSSProperties}>
      {children}
    </div>
  );
}
