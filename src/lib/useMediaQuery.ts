"use client";

import { useSyncExternalStore } from "react";

/**
 * true si el media query coincide. En el servidor (y al hidratar) devuelve
 * false, así que el primer render coincide con el HTML del servidor.
 */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
