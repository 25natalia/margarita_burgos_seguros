"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SELECTOR = "[data-appear-group], [data-appear]:not([data-appear-item])";

/**
 * Un único IntersectionObserver para todas las apariciones del sitio
 * (<Reveal>, <RevealGroup>). Marca data-visible (CSS anima) y deja de observar.
 *
 * Seguridad: el contenido es visible por defecto. Solo se oculta lo pendiente
 * cuando este observer ya está funcionando (data-reveal-ready en <html>); si el
 * JS falla, todo queda visible. Lo que ya está en pantalla al montar se marca
 * visible antes, para que no parpadee.
 *
 * El registro de lo observado vive en memoria (no en el DOM): en desarrollo
 * React monta los efectos dos veces y una marca en el DOM hacía que en el
 * segundo montaje no se observara nada.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const watched = new WeakSet<Element>();
    const pending = new Set<HTMLElement>();
    const show = (el: HTMLElement) => el.setAttribute("data-visible", "");

    const reveal = (el: HTMLElement) => {
      pending.delete(el);
      io.unobserve(el);
      if (el.hasAttribute("data-appear-group")) {
        const step = Number(el.getAttribute("data-appear-group")) || 70;
        const items = [...el.querySelectorAll<HTMLElement>("[data-appear-item]")].filter(
          (item) => item.closest("[data-appear-group]") === el,
        );
        items.forEach((item, i) => {
          item.style.setProperty("--appear-delay", `${i * step}ms`);
          show(item);
        });
      } else {
        show(el);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) reveal(entry.target as HTMLElement);
      },
      // Se activa cuando el borde superior entra al 90% de la ventana (sirve para bloques altos).
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );

    const scan = (node: ParentNode) => {
      const found: Element[] = [];
      if (node instanceof Element && node.matches(SELECTOR)) found.push(node);
      found.push(...node.querySelectorAll(SELECTOR));
      for (const el of found) {
        if (el.hasAttribute("data-visible") || watched.has(el)) continue;
        watched.add(el);
        pending.add(el as HTMLElement);
        io.observe(el);
      }
    };

    // Respaldo: con un scroll muy rápido un elemento chico puede saltar de "abajo"
    // a "arriba" sin que el observer lo vea dentro. Se revisa solo lo pendiente,
    // una vez por frame: todo lo que ya quedó por encima del 90% se muestra.
    let frame = 0;
    const revealPassed = (limit: number) => {
      [...pending].filter((el) => el.getBoundingClientRect().top < limit).forEach(reveal);
    };
    const onScroll = () => {
      if (frame || pending.size === 0) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        revealPassed(window.innerHeight * 0.9);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    scan(document);
    // Lo que ya se ve al montar queda visible sin animar (ya se veía antes de hidratar).
    revealPassed(window.innerHeight);
    // Recién ahora se permite ocultar lo pendiente (ver globals.css).
    root.setAttribute("data-reveal-ready", "");

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) m.addedNodes.forEach((n) => n instanceof Element && scan(n));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      root.removeAttribute("data-reveal-ready");
    };
  }, [pathname]);

  return null;
}
