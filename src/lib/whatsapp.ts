import { site } from "@/data/site";

/**
 * Arma un enlace https://wa.me/NUMERO?text=MENSAJE con el mensaje codificado.
 * Por defecto usa el número y el mensaje de src/data/site.ts.
 */
export function whatsappLink(
  message: string = site.whatsappMessage,
  phone: string = site.whatsapp,
): string {
  const number = phone.replace(/\D/g, "");
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
