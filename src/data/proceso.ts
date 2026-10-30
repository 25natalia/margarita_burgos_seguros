// Pasos del proceso: línea de tiempo de la home (HowItWorks) y resumen en
// las páginas de cada seguro. Textos de Margarita.

import {
  ChatBubbleLeftRightIcon,
  CheckBadgeIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";

export type ProcessStep = {
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const processSteps: ProcessStep[] = [
  {
    title: "Contacto y diagnóstico inicial",
    description:
      "Recopilamos los datos básicos, conversamos sobre tus objetivos o enfoque (según el ramo) y definimos el presupuesto ideal para diseñar una solución a tu medida.",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    title: "Análisis, cotización y comparativa",
    description:
      "Evaluamos las mejores opciones del mercado entre nuestras aseguradoras aliadas (SURA, Skandia y Dominion) y te presento una propuesta clara y comparada.",
    icon: ScaleIcon,
  },
  {
    title: "Selección de requisitos y trámite",
    description:
      "Una vez eliges la alternativa ideal, te informo los documentos necesarios y gestionamos el ingreso de la solicitud mediante firma electrónica o física, según el requerimiento.",
    icon: DocumentTextIcon,
  },
  {
    title: "Seguimiento de la solicitud",
    description:
      "Monitoreo de cerca el proceso de evaluación y aceptación de la póliza directamente con la compañía aseguradora hasta su aprobación final.",
    icon: MagnifyingGlassIcon,
  },
  {
    title: "Entrega y acompañamiento",
    description:
      "Te hago entrega oficial de tu póliza expedida, detallando sus beneficios y formas de pago, y quedo siempre disponible para cualquier gestión futura.",
    icon: CheckBadgeIcon,
  },
];
