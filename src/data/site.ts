// Datos editables del sitio. Reemplazar los placeholders con la información real.

/** Año en que Margarita empezó a asesorar. Los años de experiencia se calculan solos. */
const startYear = 2008;
const yearsExperience = new Date().getFullYear() - startYear;

export const site = {
  name: "Margarita Burgos",
  role: "Asesora de seguros",
  city: "Colombia", // TODO (Margarita): ciudad donde atiende (se muestra en el footer)
  startYear,
  yearsExperience,
  /** Cifras de la barra de confianza (cuentan desde 0 al entrar en pantalla). */
  stats: [
    { value: yearsExperience, prefix: "+", label: "años de experiencia" },
    { value: 750, prefix: "+", label: "pólizas activas" },
    { value: 45, prefix: "+", label: "certificaciones" },
  ],
  /**
   * Foto del Hero (se recorta con object-cover). Mejor horizontal, con
   * Margarita cerca del centro y al menos 1600 px de ancho.
   */
  heroPhoto: "/imagenes/margarita-premio-sura.jpeg",
  /** Aseguradoras aliadas (fila de logos de la TrustBar). TODO: logos reales en /public. */
  insurers: ["SURA", "Skandia", "Dominion"],
  /**
   * Certificaciones y credenciales (lista con check en la sección About).
   * Las fotos de los reconocimientos están en src/data/reconocimientos.ts.
   */
  achievements: [
    "Certificación de la Circular 050 de la Superintendencia Financiera, actualizada cada 4 años",
    "Más de 45 certificaciones",
    "Reconocimientos de SURA y Skandia",
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
  /**
   * Preguntas frecuentes, agrupadas (acordeón + schema FAQPage para SEO).
   * "bullets" agrega una lista debajo de la respuesta.
   */
  faqGroups: [
    {
      title: "Planeación financiera y ahorro",
      items: [
        {
          question: "¿Cuánto es el ahorro mínimo para empezar?",
          answer:
            "Depende de la moneda en la que decidas estructurar tu plan: en pesos colombianos, el aporte mínimo es de $357.000 COP mensuales; si prefieres en dólares, el ahorro mínimo es de 150 USD mensuales.",
        },
        {
          question: "¿Cuál es el tiempo mínimo de permanencia o ahorro?",
          answer:
            "En los planes en pesos (enfocados en el beneficio tributario), el tiempo mínimo recomendado es de 10 años. Para los planes en dólares, el plazo mínimo de ahorro es de 5 años.",
        },
        {
          question:
            "¿Qué pasa si me quedo sin trabajo o tengo una emergencia y no puedo seguir aportando temporalmente?",
          answer:
            "No te preocupes por perder tu cobertura. Si ya llevas más de 24 meses ahorrando, puedes pausar o atrasarte hasta un máximo de 12 cuotas sin perder los beneficios de tu plan. Además, el ahorro es flexible: puedes aumentar, disminuir o pausar tus aportes según tus necesidades en el tiempo.",
        },
        {
          question: "¿Qué beneficios reales obtengo al ahorrar con estos planes?",
          answer: "Cuentas con múltiples ventajas financieras y de protección:",
          bullets: [
            "Beneficio tributario (en los planes a 10 años en pesos).",
            "Seguro de vida e ITP (Incapacidad Total y Permanente) sin costo adicional, además de ser un ahorro inembargable.",
            "Crecimiento de tu capital con un ahorro 100% más rentabilidad.",
            "Opción de recibir un descuento si decides pagar la anualidad por anticipado.",
          ],
        },
        {
          question:
            "¿Qué pasa si me retiro antes de cumplir el tiempo mínimo (por ejemplo, antes de los 10 años en pesos)?",
          answer:
            "Desde el primer día te entregamos una tabla de proyección transparente donde puedes visualizar en cada año exacto cuánto dinero se te entregaría en caso de un retiro anticipado.",
        },
        {
          question: "¿En qué momento se nivela o madura el producto financieramente?",
          answer:
            "El punto de nivelación del producto por lo general se alcanza en el año 8, momento en el cual el comportamiento del capital acumulado y su rentabilidad toman un impulso óptimo frente al total aportado.",
        },
      ],
    },
    {
      title: "Seguros de salud, vida y patrimoniales",
      items: [
        {
          question: "¿Los seguros tienen cláusula de permanencia o penalización por cancelar?",
          answer:
            "No hay cláusula de permanencia. Eres totalmente libre de cancelar el seguro cuando lo necesites, sin multas ni penalizaciones por parte de la aseguradora.",
        },
        {
          question:
            "Si cancelo un seguro porque no puedo seguir pagándolo, ¿me reportan a centrales de riesgo (Datacrédito)?",
          answer:
            "De ninguna manera. Los seguros son contratos de amparo temporal y no generan ningún tipo de reporte negativo en centrales de riesgo si decides suspenderlos por falta de pago.",
        },
        {
          question: "¿Puedo adquirir un seguro si ya tengo una condición médica o enfermedad preexistente?",
          answer:
            "Dependerá estrictamente de tu diagnóstico y estará sujeto a un estudio médico por parte de la compañía. Según el caso, la aseguradora puede tomar tres caminos: aceptar la vinculación normalmente, aplicar una extraprima (un costo adicional por el riesgo) o aceptar el seguro excluyendo la condición médica declarada.",
        },
        {
          question: "¿Qué son los periodos de carencia y cuándo se activan los servicios de salud?",
          answer:
            "Los periodos de carencia son los tiempos de espera establecidos por la póliza para poder hacer uso de ciertas coberturas específicas (como maternidad o cirugías programadas). El tiempo de activación y los valores de copagos varían y dependen enteramente del plan de salud y la aseguradora que elijas.",
        },
        {
          question: "¿Cómo sé qué seguro o opción me conviene elegir?",
          answer:
            "Mi labor como asesora es presentarte la alternativa que te ofrezca el mayor nivel de protección y explicarte detalladamente los beneficios personales de cada una. Sin embargo, la decisión final siempre será tuya, basándote en tus necesidades reales de protección y tu capacidad de pago.",
        },
        {
          question:
            "¿Pierdo la antigüedad que ya tengo con mi compañía actual si me cambio o me asesoro contigo?",
          answer:
            "¡No la pierdes! Una de las grandes ventajas cuando nos organizamos bien es que la antigüedad se puede trasladar de una compañía a otra. No tienes que empezar desde cero ni perder el tiempo acumulado: evaluamos tu caso para hacer el cambio de manera estratégica y conservar todos tus derechos y amparos previos.",
        },
      ],
    },
  ] as { title: string; items: { question: string; answer: string; bullets?: string[] }[] }[],
  /** Tipos de seguro que ofrece (select del formulario; reutilizar en Services). */
  insuranceTypes: [
    "Seguro de vida",
    "Seguro de salud",
    "Plan de ahorro en pesos",
    "Plan de ahorro en dólares",
    "Seguro de hogar",
    "Seguro de autos",
    "Seguro para mi negocio",
    "Aún no lo sé, quiero asesoría",
  ],
  /** Páginas legales (Ley 1581 de 2012, Ley 1480 de 2011, Ley 1328 de 2009). */
  privacyPolicyUrl: "/politica-de-datos",
  termsUrl: "/terminos",
  cookiesUrl: "/cookies",
  /**
   * Datos del responsable del tratamiento que exigen la política de datos y los
   * términos. Lo que está entre corchetes se muestra tal cual hasta completarlo.
   */
  legal: {
    fullName: "Margarita Rosa Burgos Nañez", // TODO (Margarita): confirmar nombre completo
    idNumber: "[pendiente: C.C. o NIT]", // TODO (Margarita)
    address: "[pendiente: dirección de notificación]", // TODO (Margarita)
    /** Cómo actúa ante las aseguradoras (agente, agencia, corredor). */
    intermediaryType: "[pendiente: agente o agencia de seguros]", // TODO (Margarita)
    lastUpdated: "30 de octubre de 2026",
  },
  // WhatsApp, teléfono, correo e Instagram: src/config/contact.ts.
  /**
   * Foto pequeña de Margarita para la firma de "Hablemos sin compromiso"
   * (avatar circular). Recomendado: 128×128 px, cuadrada. Mientras sea null se
   * muestran sus iniciales.
   */
  avatar: "/imagenes/margarita-avatar.jpeg" as string | null,
  /** Foto de "Hola, soy Margarita" (se recorta a 4:5). */
  aboutPhoto: "/imagenes/margarita-sobre-mi.jpeg",
} as const;
