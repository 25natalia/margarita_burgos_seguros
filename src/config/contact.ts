// Datos de contacto reales de Margarita. Fuente única para WhatsApp e Instagram.

export const contact = {
  /**
   * Número de WhatsApp (formato internacional, sin "+" ni espacios).
   * Se obtuvo resolviendo el enlace corto de abajo: redirige a
   * api.whatsapp.com/send?phone=573176751328.
   */
  whatsappNumber: "573176751328",
  /** Enlace corto original (wa.link). No admite mensajes prellenados: usar getWhatsAppLink(). */
  whatsappShortLink: "https://wa.link/kgwlmn",
  /** Mensaje por defecto cuando no hay uno específico del contexto. */
  whatsappDefaultMessage: "Hola Margarita, vi tu página y quiero información sobre un seguro.",
  instagram: "https://www.instagram.com/margarita_burgos_seguros/",
} as const;
