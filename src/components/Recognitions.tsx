import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { reconocimientos } from "@/data/reconocimientos";

// Celdas del mosaico: la foto destacada ocupa 2×2 y la horizontal 2 columnas.
const cellSize = {
  feature: "col-span-2 row-span-2",
  wide: "col-span-2",
  normal: "",
};

const sizes = {
  feature: "(min-width: 1024px) 600px, (min-width: 768px) 66vw, 100vw",
  wide: "(min-width: 1024px) 600px, (min-width: 768px) 66vw, 100vw",
  normal: "(min-width: 1024px) 300px, (min-width: 768px) 33vw, 50vw",
};

/**
 * Reconocimientos de las aseguradoras (fotos reales). Mosaico con la foto
 * destacada en 2×2; cada foto lleva título y detalle en una etiqueta de vidrio.
 */
export function Recognitions() {
  return (
    <section
      id="reconocimientos"
      aria-labelledby="reconocimientos-titulo"
      className="section-y border-y border-line bg-tint"
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            id="reconocimientos-titulo"
            title="Reconocida por las aseguradoras"
            subtitle="Cada reconocimiento es el resultado de familias bien acompañadas."
          />
        </Reveal>

        <RevealGroup
          as="ul"
          className="mt-12 grid auto-rows-[11rem] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[14rem] md:grid-cols-3 lg:mt-16 lg:auto-rows-[16rem] lg:grid-cols-4 lg:gap-4"
        >
          {reconocimientos.map((item) => (
            <RevealItem
              as="li"
              key={item.src}
              className={`group/rec relative overflow-hidden rounded-card bg-secondary shadow-soft ${cellSize[item.size]}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes={sizes[item.size]}
                className={`object-cover ${item.position} transition-transform duration-600 ease-brand group-hover/rec:scale-105 motion-reduce:transition-none motion-reduce:group-hover/rec:scale-100`}
              />
              {/* Etiqueta de vidrio: la foto se ve completa, sin degradado encima */}
              <div className="absolute inset-x-2 bottom-2 rounded-control bg-white/80 px-3 py-2 shadow-soft ring-1 ring-white/70 backdrop-blur-md sm:inset-x-auto sm:bottom-3 sm:left-3 sm:max-w-[calc(100%-1.5rem)] sm:px-4 sm:py-2.5">
                <p className="font-heading text-sm leading-tight font-extrabold text-primary-dark sm:text-base">{item.title}</p>
                {/* En móvil solo el título, para no tapar la foto */}
                <p className="mt-0.5 hidden text-sm leading-snug text-ink-muted sm:block">{item.detail}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
