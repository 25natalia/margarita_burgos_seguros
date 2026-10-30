import Image from "next/image";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { insurerLogos } from "@/data/aseguradoras";

/**
 * Logos de las aseguradoras directamente sobre el fondo, separados por líneas
 * finas (igual que las cifras de la TrustBar). Si un nombre no tiene logo en
 * src/data/aseguradoras.ts, se muestra el texto. Se usa en la TrustBar y en
 * las páginas de cada seguro.
 */
export function InsurerLogos({ insurers }: { insurers: readonly string[] }) {
  return (
    // 3 columnas: SURA, Skandia y Dominion (site.insurers).
    <RevealGroup as="ul" className="mx-auto grid max-w-4xl grid-cols-3 divide-x divide-line">
      {insurers.map((insurer) => {
        const logo = insurerLogos[insurer];
        return (
          <RevealItem as="li" key={insurer} className="flex h-16 items-center justify-center px-3 sm:h-20 sm:px-8">
            {logo ? (
              <Image
                src={logo.src}
                alt={insurer}
                width={logo.width}
                height={logo.height}
                sizes="200px"
                className={`${logo.className} w-auto max-w-full object-contain transition-transform duration-300 ease-brand hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100`}
              />
            ) : (
              <span className="font-heading text-lg font-extrabold text-ink-muted">{insurer}</span>
            )}
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
