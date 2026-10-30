// Consentimiento de cookies (Ley 1581 de 2012). La elección se guarda en una
// cookie propia y necesaria. Antes de cargar cualquier script de analítica o
// publicidad, comprobar que readConsent() === "all".

export type Consent = "necessary" | "all";

export const CONSENT_COOKIE = "mb_consent";
/** 180 días: luego se vuelve a preguntar. */
const MAX_AGE = 60 * 60 * 24 * 180;
const CHANGE_EVENT = "mb-consent-change";
const OPEN_EVENT = "mb-consent-open";

export function readConsent(): Consent | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=(necessary|all)`));
  return (match?.[1] as Consent | undefined) ?? null;
}

export function saveConsent(value: Consent) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeConsent(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}

/** Vuelve a mostrar el aviso de cookies (enlace "Preferencias de cookies"). */
export function openConsentPreferences() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function subscribeConsentOpen(onOpen: () => void) {
  window.addEventListener(OPEN_EVENT, onOpen);
  return () => window.removeEventListener(OPEN_EVENT, onOpen);
}
