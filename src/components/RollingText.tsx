import type { ReactNode } from "react";

/**
 * Texto que gira en 3D sobre el eje X al hacer hover o foco en el botón/enlace
 * que lo contiene: el texto sube rotando y una copia entra desde abajo.
 * El contenedor debe tener la clase "group". Solo CSS (ver .roll-* en globals.css).
 */
export function RollingText({ children }: { children: ReactNode }) {
  return (
    <span className="roll-text">
      <span className="roll-front">{children}</span>
      <span aria-hidden="true" className="roll-back">
        {children}
      </span>
    </span>
  );
}
