// Seguros que ofrece Margarita. Alimenta la sección "Seguros que ofrezco" de la
// home y las páginas /seguros/[slug].
//
// TODO (Margarita): validar las coberturas de cada seguro y reemplazar
// "Aseguradora 1/2/3" por las aseguradoras reales con las que trabaja cada uno.
// No hay cifras ni montos a propósito: cada póliza tiene los suyos.

import {
  BuildingOffice2Icon,
  DocumentCheckIcon,
  GlobeAmericasIcon,
  HeartIcon,
  HomeIcon,
  ScaleIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

/**
 * Recorrido de color de las píldoras (en orden): la píldora i va de
 * colorRamp[i] a colorRamp[i + 1], así el final de una es el inicio de la
 * siguiente. Morado profundo → violeta → orquídea → rosa lavanda → índigo →
 * azul → verde azulado → menta (acento). Todos, menos el menta final, tienen
 * contraste AA con texto blanco (≥ 6.9:1). Debe tener seguros.length + 1 colores.
 */
export const colorRamp = [
  "#2a1886",
  "#4527c4",
  "#6230bd",
  "#8a2fa3",
  "#6b2c9e",
  "#3a35b0",
  "#1f4f9e",
  "#0e6560",
  "#48e596",
];

export type Seguro = {
  slug: string;
  name: string;
  /** Frase corta bajo el nombre en la píldora. */
  tagline: string;
  /** Completa "Hola Margarita, quiero cotizar …" en el mensaje de WhatsApp. */
  quoteLabel: string;
  icon: Icon;
  /** "¿Qué es?" en lenguaje sencillo. */
  description: string;
  /** "¿Qué cubre?" (TODO: validar con Margarita). */
  coverages: string[];
  /** "¿Para quién es ideal?" (2–3 perfiles). */
  idealFor: { title: string; text: string }[];
  /** TODO: aseguradoras reales con las que se puede tener este seguro. */
  insurers: string[];
};

// TODO: reemplazar por las aseguradoras reales de cada seguro.
const placeholderInsurers = ["Aseguradora 1", "Aseguradora 2", "Aseguradora 3"];

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
    insurers: placeholderInsurers,
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
    insurers: placeholderInsurers,
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
      "Pérdida parcial o total por daños",
      "Hurto del vehículo",
      "Asistencia en carretera (según el plan)",
    ],
    idealFor: [
      { title: "Si usas tu carro a diario", text: "Para manejar con tranquilidad todos los días." },
      { title: "Si tu carro es nuevo o lo estás pagando", text: "Para proteger una inversión importante." },
    ],
    insurers: placeholderInsurers,
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
      "Incendio y daños por agua",
      "Terremoto y fenómenos naturales",
      "Hurto de bienes dentro de la vivienda",
      "Daños a vecinos o terceros (según el plan)",
    ],
    idealFor: [
      { title: "Si acabas de comprar vivienda", text: "Para cuidar lo que te costó tanto esfuerzo." },
      { title: "Si vives en arriendo", text: "Para proteger tus cosas, aunque la casa no sea tuya." },
    ],
    insurers: placeholderInsurers,
  },
  {
    slug: "empresas",
    name: "Empresas / PYME",
    tagline: "Respaldo para tu negocio",
    quoteLabel: "un seguro para mi empresa",
    icon: BuildingOffice2Icon,
    description:
      "Protege tu negocio, tus equipos y tu equipo de trabajo. Revisamos juntos qué riesgos tiene tu actividad y armamos lo que de verdad necesitas.",
    coverages: [
      "Daños a la sede, equipos y mercancía",
      "Responsabilidad civil frente a clientes y terceros",
      "Seguros para empleados (según el plan)",
      "Interrupción del negocio (según el plan)",
    ],
    idealFor: [
      { title: "Si tienes un local u oficina", text: "Para que un imprevisto no frene tu negocio." },
      { title: "Si tienes empleados", text: "Para cuidarlos a ellos y a tu empresa." },
    ],
    insurers: placeholderInsurers,
  },
  {
    slug: "soat",
    name: "SOAT",
    tagline: "Al día y sin enredos",
    quoteLabel: "el SOAT",
    icon: DocumentCheckIcon,
    description:
      "Es el seguro obligatorio para todo vehículo en Colombia. Cubre la atención de las personas heridas en un accidente de tránsito. Te ayudo a tenerlo al día y sin vueltas.",
    coverages: [
      "Gastos médicos de las víctimas",
      "Incapacidad permanente",
      "Muerte y gastos funerarios",
      "Transporte de las víctimas al centro médico",
    ],
    idealFor: [
      { title: "Todo vehículo", text: "Carro o moto: es obligatorio para circular." },
      { title: "Si se te olvida renovarlo", text: "Te ayudo a tenerlo al día." },
    ],
    insurers: placeholderInsurers,
  },
  {
    slug: "viajes",
    name: "Viajes",
    tagline: "Viaja sin preocupaciones",
    quoteLabel: "un seguro de viaje",
    icon: GlobeAmericasIcon,
    description:
      "Te respalda si te enfermas, tienes un accidente o pierdes tu equipaje mientras viajas. Algunos destinos lo piden para dejarte entrar.",
    coverages: [
      "Atención médica de urgencia en el exterior",
      "Pérdida o demora del equipaje",
      "Cancelación o interrupción del viaje (según el plan)",
      "Asistencia 24 horas",
    ],
    idealFor: [
      { title: "Si viajas fuera del país", text: "Para que una urgencia no arruine el viaje." },
      { title: "Si el destino lo exige", text: "Como en la zona Schengen de Europa." },
    ],
    insurers: placeholderInsurers,
  },
  {
    slug: "responsabilidad-civil",
    name: "Responsabilidad civil",
    tagline: "Respaldo ante un error",
    quoteLabel: "un seguro de responsabilidad civil",
    icon: ScaleIcon,
    description:
      "Responde por los daños que, sin querer, puedas causarle a otra persona o a sus cosas. Así un error no se convierte en un problema económico grande.",
    coverages: [
      "Daños a otras personas",
      "Daños a bienes de terceros",
      "Gastos de defensa (según el plan)",
    ],
    idealFor: [
      { title: "Si ejerces una profesión", text: "Médicos, ingenieros, abogados y más." },
      { title: "Si tienes un negocio abierto al público", text: "Para cubrir lo que pase con clientes y visitantes." },
    ],
    insurers: placeholderInsurers,
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
