"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/Button";
import { site } from "@/data/site";
import {
  openConsentPreferences,
  readConsent,
  saveConsent,
  subscribeConsent,
  subscribeConsentOpen,
  type Consent,
} from "@/lib/consent";
import { duration, ease } from "@/lib/motion";

/**
 * Aviso de cookies abajo a la izquierda (no bloquea la página). Aparece hasta
 * que el visitante elige; "Preferencias de cookies" (footer) lo vuelve a abrir.
 * En el servidor no se muestra: así el HTML no cambia al hidratar.
 */
export function CookieBanner() {
  const consent = useSyncExternalStore<Consent | null | "server">(
    subscribeConsent,
    readConsent,
    () => "server",
  );
  const [reopened, setReopened] = useState(false);
  // Solo se renderiza en el cliente, así que puede depender del movimiento reducido.
  const offset = useReducedMotion() ? 0 : 16;

  useEffect(() => subscribeConsentOpen(() => setReopened(true)), []);

  const visible = consent === null || reopened;

  function choose(value: Consent) {
    saveConsent(value);
    setReopened(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="region"
          aria-labelledby="cookies-titulo"
          initial={{ opacity: 0, y: offset }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: offset }}
          transition={{ duration: duration.base, ease }}
          className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[60] rounded-card border border-line bg-white p-5 text-ink shadow-float sm:right-auto sm:left-6 sm:bottom-6 sm:max-w-md sm:p-6"
        >
          <p id="cookies-titulo" className="font-heading text-lg font-extrabold text-primary-dark">
            Tu privacidad
          </p>
          <p className="mt-2 text-ink-muted">
            Uso cookies necesarias para que el sitio funcione. Con tu permiso, también podré usar
            cookies de analítica para mejorarlo.{" "}
            <Link
              href={site.cookiesUrl}
              className="text-primary underline underline-offset-2 hover:text-primary-dark"
            >
              Ver política de cookies
            </Link>
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button onClick={() => choose("all")} plain>
              Aceptar
            </Button>
            <Button variant="secondary" onClick={() => choose("necessary")} plain>
              Solo necesarias
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Botón de texto que reabre el aviso (footer y política de cookies). */
export function CookiePreferencesButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={openConsentPreferences}
      className={className}
    >
      Preferencias de cookies
    </button>
  );
}
