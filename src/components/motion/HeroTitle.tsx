"use client";

import { useLayoutEffect, useRef, type CSSProperties } from "react";

/**
 * Título que aparece palabra por palabra (fade + subida + blur de 4px), con
 * animación CSS (.hero-word, 70 ms entre palabras): arranca al primer pintado,
 * sin esperar a que cargue JavaScript (mejor LCP).
 * El texto completo va en un span sr-only para lectores de pantalla y SEO;
 * las palabras animadas son solo visuales (aria-hidden).
 * Con movimiento reducido no se anima (globals.css).
 *
 * Degradado: cada palabra necesita su propio background-clip (tiene su propio
 * transform), así que todas usan el mismo degradado del tamaño del título
 * completo, desplazado según la posición de la palabra. Juntas forman un único
 * degradado continuo. Se mide con offsetLeft/offsetTop (no les afecta el transform).
 */
export function HeroTitle({
  text,
  id,
  className = "",
}: {
  text: string;
  id?: string;
  className?: string;
}) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const words = text.split(" ");

  useLayoutEffect(() => {
    const title = titleRef.current;
    if (!title) return;
    const update = () => {
      const size = `${title.clientWidth}px ${title.clientHeight}px`;
      title.querySelectorAll<HTMLElement>("[data-word]").forEach((word) => {
        word.style.backgroundSize = size;
        word.style.backgroundPosition = `${-word.offsetLeft}px ${-word.offsetTop}px`;
      });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(title);
    return () => observer.disconnect();
  }, []);

  return (
    <h1 ref={titleRef} id={id} className={`relative ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={i}>
            <span
              data-word
              className="hero-word text-gradient inline-block bg-no-repeat"
              style={{ "--i": i } as CSSProperties}
            >
              {word}
            </span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </span>
    </h1>
  );
}
