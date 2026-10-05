// Datos editables del sitio. Reemplazar los placeholders con la información real.

export const site = {
  name: "Margarita Burgos",
  role: "Asesora de seguros",
  city: "Colombia",
  yearsExperience: 15,
  clientsAdvised: 500,
  activePolicies: 300,
  /** Aseguradoras con las que trabaja (logos en escala de grises en la TrustBar). */
  insurers: [
    "Aseguradora 1",
    "Aseguradora 2",
    "Aseguradora 3",
    "Aseguradora 4",
    "Aseguradora 5",
  ],
  /** Certificaciones y logros (lista con check en la sección About). */
  achievements: [
    "Intermediaria de seguros certificada ante [entidad]",
    "Certificación en [nombre de la certificación]",
    "Reconocimiento [aseguradora] como mejor asesora [año]",
    "Miembro de [asociación o gremio]",
  ],
  /** Número en formato internacional, sin "+" ni espacios. */
  whatsapp: "57XXXXXXXXXX",
  whatsappMessage:
    "Hola Margarita, vi tu página y quiero información sobre un seguro.",
  phone: "+57 XXX XXX XXXX",
  email: "correo@ejemplo.com",
  social: {
    instagram: "https://instagram.com/usuario",
    facebook: "https://facebook.com/usuario",
    linkedin: "https://linkedin.com/in/usuario",
  },
} as const;
