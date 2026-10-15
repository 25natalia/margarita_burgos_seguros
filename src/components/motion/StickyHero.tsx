"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Deja el Hero fijo detrás del contenido (efecto cortina). Si el Hero es más
 * alto que la pantalla (móvil), se fija cuando su borde inferior llega al
 * borde inferior de la ventana, para que se vea completo antes de taparse.
 */
export function StickyHero({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      el.style.top = `${Math.min(0, window.innerHeight - el.offsetHeight)}px`;
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={ref} className="sticky top-0 z-0">
      {children}
    </div>
  );
}
