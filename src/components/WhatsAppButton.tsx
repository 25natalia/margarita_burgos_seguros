"use client";

import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getSeguro } from "@/data/seguros";
import { site } from "@/data/site";
import { getWhatsAppLink } from "@/lib/whatsapp";

/**
 * Botón flotante de WhatsApp, fijo abajo a la derecha.
 * - Se oculta mientras se ve el Hero de cada página (ahí ya hay un CTA de
 *   WhatsApp): aparece cuando el contenido marcado con [data-fab-trigger] cubre
 *   ~40% de la pantalla.
 * - Se oculta mientras se ve algo marcado con [data-fab-hide] (formulario de
 *   contacto y footer), para no taparlo en móvil.
 * - En /seguros/[slug] el mensaje menciona ese seguro.
 */
export function WhatsAppButton() {
  const [afterHero, setAfterHero] = useState(false);
  const [hidingCount, setHidingCount] = useState(0);
  // El layout no se remonta al navegar: se vuelve a buscar el trigger en cada página.
  const pathname = usePathname();

  useEffect(() => {
    // Sin [data-fab-trigger] (ej. página 404) el botón no aparece.
    const trigger = document.querySelector("[data-fab-trigger]");
    const hiders = document.querySelectorAll("[data-fab-hide]");
    if (!trigger) return () => setAfterHero(false);

    const heroObserver = new IntersectionObserver(([entry]) => setAfterHero(entry.isIntersecting), {
      rootMargin: "0px 0px -40% 0px",
    });
    // Cuántos [data-fab-hide] están en pantalla (el botón se oculta si hay al menos uno).
    const visibleHiders = new Set<Element>();
    const hideObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visibleHiders.add(e.target);
          else visibleHiders.delete(e.target);
        }
        setHidingCount(visibleHiders.size);
      },
      { threshold: 0.1 },
    );
    heroObserver.observe(trigger);
    hiders.forEach((el) => hideObserver.observe(el));
    return () => {
      heroObserver.disconnect();
      hideObserver.disconnect();
      setAfterHero(false);
      setHidingCount(0);
    };
  }, [pathname]);

  const seguro = pathname.startsWith("/seguros/") ? getSeguro(pathname.split("/")[2] ?? "") : undefined;
  const message = seguro
    ? `Hola Margarita, quiero cotizar ${seguro.quoteLabel}`
    : "Hola Margarita, vi tu página y quiero información sobre un seguro.";
  const visible = afterHero && hidingCount === 0;

  return (
    <a
      href={getWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Escribir a ${site.name} por WhatsApp (se abre en una nueva pestaña)`}
      aria-hidden={!visible || undefined}
      tabIndex={visible ? undefined : -1}
      className={`fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-float ring-4 ring-white/70 transition-[opacity,translate,scale,background-color] duration-300 ease-brand hover:scale-110 hover:bg-whatsapp-dark focus-visible:scale-110 active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:focus-visible:scale-100 sm:right-6 sm:bottom-6 sm:size-16 ${
        visible ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ChatBubbleOvalLeftIcon aria-hidden="true" className="size-7 sm:size-8" strokeWidth={1.5} />
    </a>
  );
}
