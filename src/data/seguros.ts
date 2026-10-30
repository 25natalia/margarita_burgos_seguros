// Seguros que ofrece Margarita. Alimenta la sección "Seguros que ofrezco" de la
// home, el menú, el footer y las páginas /seguros/[slug].
//
// Ramos que Margarita mencionó: vida, salud, ahorro y patrimoniales. Ahorro se
// divide en pesos y dólares (datos de sus preguntas frecuentes) y patrimoniales
// en hogar, autos y negocio (contenido PROVISIONAL).
// TODO (Margarita): validar coberturas y perfiles de cada seguro y confirmar
// qué seguros patrimoniales maneja. No hay cifras de coberturas a propósito.

import {
  BanknotesIcon,
  BuildingStorefrontIcon,
  CurrencyDollarIcon,
  HeartIcon,
  HomeIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

/**
 * Recorrido de color de las píldoras (en orden): la píldora i va de
 * colorRamp[i] a colorRamp[i + 1], así el final de una es el inicio de la
 * siguiente. Morado profundo → violeta → complemento → orquídea → rosa lavanda
 * → índigo → azul → verde azulado. Todos tienen contraste AA con texto blanco
 * (≥ 4.8:1). Debe tener seguros.length + 1 colores.
 */
export const colorRamp = [
  "#2a1886",
  "#4527c4",
  "#5e5df6",
  "#6230bd",
  "#8a2fa3",
  "#3a35b0",
  "#1f4f9e",
  "#0e6560",
];

export type Seguro = {
  slug: string;
  name: string;
  /** Frase corta bajo el nombre en la píldora. */
  tagline: string;
  /** Completa "… Quiero cotizar …" en el mensaje de WhatsApp. */
  quoteLabel: string;
  icon: Icon;
  /** "¿Qué es?" en lenguaje sencillo. */
  description: string;
  /** "¿Qué cubre?" (TODO: validar con Margarita). */
  coverages: string[];
  /** "¿Para quién es ideal?" (2–3 perfiles). */
  idealFor: { title: string; text: string }[];
};

const list: Seguro[] = [
  {
    slug: "vida",
    name: "Vida",
    tagline: "Protege a los tuyos",
    quoteLabel: "un seguro de vida",
    icon: HeartIcon,
    description:
      "Es un respaldo económico para tu familia si a ti te llega a pasar algo. Tú decides a quién proteger y con qué valor, y yo te ayudo a elegir uno que puedas pagar con tranquilidad.",
    coverages: [
      "Fallecimiento por enfermedad o accidente",
      "Incapacidad total y permanente",
      "Enfermedades graves (según el plan)",
      "Auxilio para gastos funerarios (según el plan)",
    ],
    idealFor: [
      { title: "Si tienes personas a cargo", text: "Hijos, pareja o padres que dependen de tus ingresos." },
      { title: "Si tienes deudas", text: "Para que un crédito no quede en manos de tu familia." },
      { title: "Si eres independiente", text: "Para tener un respaldo que no depende de un empleador." },
    ],
  },
  {
    slug: "salud",
    name: "Salud",
    tagline: "Atención médica a tiempo",
    quoteLabel: "un seguro de salud",
    icon: ShieldCheckIcon,
    description:
      "Te da acceso a médicos, clínicas y especialistas con más agilidad. Es un complemento a tu EPS: no la reemplaza, la mejora.",
    coverages: [
      "Consultas con médicos generales y especialistas",
      "Hospitalización y cirugías",
      "Exámenes de laboratorio e imágenes diagnósticas",
      "Urgencias",
    ],
    idealFor: [
      { title: "Si quieres más agilidad", text: "Citas y especialistas en menos tiempo." },
      { title: "Si piensas en tu familia", text: "Hay planes para incluir a los tuyos." },
    ],
  },
  {
    slug: "ahorro-pesos",
    name: "Ahorro en pesos",
    tagline: "Ahorra con beneficio tributario",
    quoteLabel: "un plan de ahorro en pesos",
    icon: BanknotesIcon,
    description:
      "Es un plan para ahorrar a largo plazo en pesos colombianos, pensado para aprovechar el beneficio tributario. Además te protege: incluye seguro de vida e incapacidad total y permanente sin costo adicional. Empiezas desde $357.000 COP al mes, con un plazo recomendado de 10 años.",
    coverages: [
      "Beneficio tributario (en el plan a 10 años)",
      "Seguro de vida e ITP sin costo adicional",
      "Ahorro inembargable que crece con rentabilidad",
      "Aportes flexibles: puedes aumentarlos, disminuirlos o pausarlos",
      "Tabla de proyección para saber cuánto recibirías si te retiras antes",
    ],
    idealFor: [
      { title: "Si quieres beneficio tributario", text: "El plan en pesos a 10 años lo incluye." },
      { title: "Si piensas a largo plazo", text: "El producto suele madurar hacia el año 8." },
      { title: "Si quieres proteger a tu familia mientras ahorras", text: "El seguro de vida viene incluido." },
    ],
  },
  {
    slug: "ahorro-dolares",
    name: "Ahorro en dólares",
    tagline: "Tu ahorro en otra moneda",
    quoteLabel: "un plan de ahorro en dólares",
    icon: CurrencyDollarIcon,
    description:
      "Es un plan para ahorrar en dólares desde 150 USD al mes, con un plazo mínimo de 5 años. Igual que el plan en pesos, incluye seguro de vida e incapacidad total y permanente sin costo adicional.",
    coverages: [
      "Seguro de vida e ITP sin costo adicional",
      "Ahorro inembargable que crece con rentabilidad",
      "Descuento si pagas la anualidad por anticipado",
      "Después de 24 meses, puedes atrasarte hasta 12 cuotas sin perder beneficios",
    ],
    idealFor: [
      { title: "Si quieres ahorrar en dólares", text: "Desde 150 USD al mes." },
      { title: "Si buscas un plazo más corto", text: "El mínimo es de 5 años." },
      { title: "Si quieres flexibilidad", text: "Puedes aumentar, disminuir o pausar tus aportes." },
    ],
  },
  {
    slug: "hogar",
    name: "Hogar",
    tagline: "Tu casa, protegida",
    quoteLabel: "un seguro de hogar",
    icon: HomeIcon,
    description:
      "Protege tu casa o apartamento y lo que tienes dentro. Sirve tanto si la vivienda es tuya como si vives en arriendo.",
    coverages: [
      "Incendio y daños por agua (según el plan)",
      "Terremoto y fenómenos naturales (según el plan)",
      "Hurto de bienes dentro de la vivienda (según el plan)",
      "Daños a vecinos o terceros (según el plan)",
    ],
    idealFor: [
      { title: "Si acabas de comprar vivienda", text: "Para cuidar lo que te costó tanto esfuerzo." },
      { title: "Si vives en arriendo", text: "Para proteger tus cosas, aunque la casa no sea tuya." },
    ],
  },
  {
    slug: "autos",
    name: "Autos",
    tagline: "Maneja con tranquilidad",
    quoteLabel: "un seguro para mi carro",
    icon: TruckIcon,
    description:
      "Cubre tu carro y los daños que puedas causar a otros al manejar. Y si tienes un choque, no te quedas solo: lo resolvemos juntos.",
    coverages: [
      "Daños a terceros (responsabilidad civil)",
      "Pérdida parcial o total por daños (según el plan)",
      "Hurto del vehículo (según el plan)",
      "Asistencia en carretera (según el plan)",
    ],
    idealFor: [
      { title: "Si usas tu carro a diario", text: "Para manejar con tranquilidad todos los días." },
      { title: "Si tu carro es nuevo o lo estás pagando", text: "Para proteger una inversión importante." },
    ],
  },
  {
    slug: "negocio",
    name: "Negocio",
    tagline: "Respaldo para tu empresa",
    quoteLabel: "un seguro para mi negocio",
    icon: BuildingStorefrontIcon,
    description:
      "Protege tu negocio, tus equipos y tu equipo de trabajo. Revisamos juntos qué riesgos tiene tu actividad y armamos lo que de verdad necesitas.",
    coverages: [
      "Daños a la sede, equipos y mercancía (según el plan)",
      "Responsabilidad civil frente a clientes y terceros (según el plan)",
      "Seguros para empleados (según el plan)",
      "Interrupción del negocio (según el plan)",
    ],
    idealFor: [
      { title: "Si tienes un local u oficina", text: "Para que un imprevisto no frene tu negocio." },
      { title: "Si tienes empleados", text: "Para cuidarlos a ellos y a tu empresa." },
    ],
  },
];

/** Seguros con su par de colores del recorrido (colorRamp). */
export const seguros = list.map((seguro, i) => ({
  ...seguro,
  colors: { from: colorRamp[i], to: colorRamp[i + 1] },
}));

export type SeguroConColor = (typeof seguros)[number];

export function getSeguro(slug: string) {
  return seguros.find((s) => s.slug === slug);
}
