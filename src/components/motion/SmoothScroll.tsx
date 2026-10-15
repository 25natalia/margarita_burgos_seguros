"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/** Distancia que deja el navbar flotante al ir a una sección (igual que scroll-padding-top). */
export const ANCHOR_OFFSET = 96;

let lenis: Lenis | null = null;

/** Instancia de Lenis (null con movimiento reducido o antes de montar). */
export function getLenis() {
  return lenis;
}

/** Bloquea o libera el scroll de la página (menú móvil abierto). */
export function setScrollLocked(locked: boolean) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
  if (locked) lenis?.stop();
  else lenis?.start();
}

/** Desplaza a una sección de la página actual respetando el offset del navbar. */
export function scrollToHash(hash: string) {
  const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
  if (!target) return false;
  if (lenis) {
    // force: desplaza aunque el scroll esté bloqueado (al cerrar el menú móvil con un enlace).
    lenis.scrollTo(target, { offset: -ANCHOR_OFFSET, force: true });
  } else {
    // Sin Lenis: scroll nativo (usa scroll-padding-top; con movimiento reducido es instantáneo).
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }
  history.pushState(null, "", hash);
  return true;
}

/**
 * Scroll suave global con Lenis.
 * - Con prefers-reduced-motion no se activa (scroll nativo).
 * - En pantallas táctiles el scroll sigue siendo nativo (syncTouch: false).
 * - Lenis mueve el scroll real de la ventana, así que position: sticky y
 *   useScroll de motion siguen funcionando igual (hero, seguros, proceso).
 * - Intercepta los enlaces a anclas de la página actual (ej. "/#contacto")
 *   para desplazarse con el offset del navbar.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      lenis = new Lenis({ autoRaf: true, lerp: 0.12, smoothWheel: true, syncTouch: false });
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element).closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!link || link.target === "_blank") return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;
      if (scrollToHash(url.hash)) e.preventDefault();
    };
    // Captura en window: corre antes que React. Next <Link> respeta defaultPrevented,
    // así que también los Link a anclas se desplazan con Lenis.
    window.addEventListener("click", onClick, { capture: true });

    return () => {
      window.removeEventListener("click", onClick, { capture: true });
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return null;
}
