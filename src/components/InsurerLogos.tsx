import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

/**
 * Fila de logos de aseguradoras (placeholders en lavanda). Se usa en la TrustBar
 * de la home y en las páginas de detalle de cada seguro.
 */
export function InsurerLogos({ insurers }: { insurers: readonly string[] }) {
  return (
    <RevealGroup as="ul" className="flex flex-wrap justify-center gap-4">
      {insurers.map((insurer) => (
        <RevealItem
          as="li"
          key={insurer}
          className="card-lift flex h-14 basis-[calc(50%-0.5rem)] items-center justify-center gap-2 rounded-control bg-white px-3 text-xs font-semibold text-ink-muted sm:basis-44 lg:flex-1"
        >
          <ShieldCheckIcon aria-hidden="true" className="size-5 shrink-0 text-primary/60" strokeWidth={1.5} />
          <span>
            Logo aseguradora
            <span className="sr-only">: {insurer}</span>
          </span>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
