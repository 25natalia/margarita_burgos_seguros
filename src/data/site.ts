// Datos editables del sitio. Reemplazar los placeholders con la información real.

const yearsExperience = 15;

export const site = {
  name: "Margarita Burgos",
  role: "Asesora de seguros",
  city: "Colombia", // TODO (Margarita): ciudad donde atiende (se muestra en el footer)
  yearsExperience,
  /** Cifras de la barra de confianza (cuentan desde 0 al entrar en pantalla). */
  stats: [
    { value: yearsExperience, prefix: "+", label: "años de experiencia" },
    { value: 500, prefix: "+", label: "clientes asesorados" },
    { value: 300, prefix: "+", label: "pólizas activas" },
  ],
  /**
   * Retrato recortado del Hero: PNG con fondo transparente en /public.
   * Recomendado: 1000×1250 px (4:5), recortado a la altura del pecho y con el
   * borde inferior recto, porque se apoya en el borde inferior del Hero.
   * Ej.: "/margarita-retrato.png". Mientras sea null se muestra una silueta.
   */
  heroPortrait: null as string | null,
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
  /** Testimonios (placeholders: reemplazar por opiniones reales con autorización). */
  testimonials: [
    {
      quote: "Cuando choqué, Margarita me resolvió todo.",
      name: "Andrés R.",
      city: "Bogotá",
      rating: 5,
    },
    {
      quote:
        "Me explicó cada cobertura con paciencia. Por fin entiendo qué estoy pagando en mi seguro de salud.",
      name: "Carolina M.",
      city: "Medellín",
      rating: 5,
    },
    {
      quote:
        "Comparó varias opciones y terminé pagando menos por un seguro de vida mejor que el que tenía.",
      name: "Jorge L.",
      city: "Cali",
      rating: 5,
    },
    {
      quote:
        "Aseguramos los vehículos de la empresa con ella. Siempre responde rápido, incluso los fines de semana.",
      name: "Paola G.",
      city: "Barranquilla",
      rating: 5,
    },
    {
      quote:
        "Cuando mi papá se enfermó, estuvo pendiente de cada trámite con la aseguradora. Eso no tiene precio.",
      name: "Luisa F.",
      city: "Bucaramanga",
      rating: 5,
    },
    {
      quote:
        "Nos ayudó a asegurar la casa nueva. Todo fue claro, rápido y sin letra pequeña.",
      name: "Camilo T.",
      city: "Pereira",
      rating: 5,
    },
  ],
  /** Preguntas frecuentes (acordeón + schema FAQPage para SEO). */
  faqs: [
    {
      question: "¿Cobras por asesorar?",
      answer:
        "No. La asesoría es gratis para ti: mi comisión la paga la aseguradora, así que no pagas más por tener a alguien de tu lado.",
    },
    {
      question: "¿Qué pasa si tengo un siniestro?",
      answer:
        "Me escribes a mí primero. Te digo qué documentos reunir, radico la reclamación contigo y hago seguimiento con la aseguradora hasta que se resuelva.",
    },
    {
      question: "¿Cuánto cuesta un seguro de vida?",
      answer:
        "Depende de tu edad, tu salud y el valor que quieras asegurar. Hay planes desde [valor] al mes. Escríbeme y te doy una cotización exacta, sin compromiso.",
    },
    {
      question: "¿Con qué aseguradoras trabajas?",
      answer:
        "Con varias de las principales aseguradoras del país. Por eso puedo comparar opciones y recomendarte la que mejor se ajusta a ti, no a mí.",
    },
    {
      question: "¿Puedo cambiar mi seguro actual?",
      answer:
        "Sí. Reviso tu póliza actual sin costo, la comparo con otras opciones y, si vale la pena cambiar, te ayudo a hacerlo sin quedar desprotegido ni un día.",
    },
  ],
  /** Tipos de seguro que ofrece (select del formulario; reutilizar en Services). */
  insuranceTypes: [
    "Seguro de vida",
    "Seguro de salud",
    "Seguro de auto",
    "Seguro de hogar",
    "Seguro para empresas",
    "Seguro de viaje",
  ],
  /** Enlace a la política de tratamiento de datos personales (Ley 1581 de 2012). */
  privacyPolicyUrl: "#politica-de-datos",
  // WhatsApp e Instagram: src/config/contact.ts.
  /**
   * Foto pequeña de Margarita para la firma de "Hablemos sin compromiso"
   * (avatar circular). Recomendado: 128×128 px, cuadrada. Mientras sea null se
   * muestran sus iniciales.
   */
  avatar: null as string | null,
} as const;
