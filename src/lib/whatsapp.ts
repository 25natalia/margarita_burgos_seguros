import { contact } from "@/config/contact";

/**
 * Arma un enlace https://wa.me/NUMERO?text=MENSAJE con el mensaje codificado,
 * usando el número de src/config/contact.ts. Todos los botones y enlaces de
 * WhatsApp del sitio deben usar esta función (y abrir en nueva pestaña).
 */
export function getWhatsAppLink(message: string = contact.whatsappDefaultMessage): string {
  const base = `https://wa.me/${contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
