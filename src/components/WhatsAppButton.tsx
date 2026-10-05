"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";

/**
 * Botón flotante de WhatsApp, fijo abajo a la derecha. Se oculta mientras el
 * Hero (#inicio) está a la vista: ahí ya hay un CTA de WhatsApp y en móvil
 * el botón flotante lo taparía.
 */
export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Sin Hero (ej. página 404) el botón no aparece.
    const hero = document.getElementById("inicio");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      rootMargin: "0px 0px -40% 0px",
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={whatsappLink("Hola Margarita, vi tu página y quiero información")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Escribir a ${site.name} por WhatsApp (se abre en una nueva pestaña)`}
      aria-hidden={!visible || undefined}
      tabIndex={visible ? undefined : -1}
      className={`fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-black/25 ring-4 ring-white/70 transition duration-200 ease-out hover:scale-110 hover:bg-whatsapp-dark hover:shadow-xl focus-visible:scale-110 motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:focus-visible:scale-100 sm:right-6 sm:bottom-6 sm:size-16 ${
        visible ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <MessageCircle aria-hidden="true" className="size-7 sm:size-8" strokeWidth={2.25} />
    </a>
  );
}
