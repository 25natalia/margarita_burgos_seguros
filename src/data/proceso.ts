// Pasos del proceso: línea de tiempo de la home (HowItWorks) y resumen en
// las páginas de cada seguro.

import {
  ChatBubbleLeftRightIcon,
  ScaleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";

export type ProcessStep = {
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const processSteps: ProcessStep[] = [
  {
    title: "Me escribes y me cuentas qué necesitas",
    description: "Por WhatsApp, sin formularios largos ni compromiso.",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    title: "Te comparo opciones de varias aseguradoras",
    description: "Revisamos coberturas y precios, en palabras claras.",
    icon: ScaleIcon,
  },
  {
    title: "Eliges y yo te acompaño, también si tienes un siniestro",
    description: "Si algo pasa, hago la reclamación contigo de principio a fin.",
    icon: ShieldCheckIcon,
  },
];
