import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import type { FocusEventHandler } from "react";
import type { SeguroConColor } from "@/data/seguros";

/** Nombres que no caben en una línea grande (ej. "Responsabilidad civil"). */
const LONG_NAME = 14;

/*
 * Tamaños relativos al ancho de la propia píldora (container query, cqw), así el
 * nombre más largo siempre cabe: si no entra en una línea pasa a 2, nunca se corta.
 * pr-10/pr-12 reservan el espacio de la flecha (≥ 40px).
 */
const sizes = {
  /** Lista (móvil, tablet, movimiento reducido). */
  md: {
    pill: "h-24 gap-4 pr-10 pl-3",
    circle: "size-[4.5rem]",
    icon: "size-8",
    name: "text-[clamp(1.125rem,6.5cqw,1.5rem)]",
    nameLong: "text-[clamp(1rem,5.4cqw,1.375rem)]",
    tagline: "text-sm",
    arrow: "right-4",
  },
  /** Rueda de escritorio: 128px de alto en lg, 152px desde xl (ver PILL_HEIGHT en Services). */
  lg: {
    pill: "h-32 gap-4 pr-12 pl-4 xl:h-[9.5rem] xl:gap-6 xl:pl-5",
    circle: "size-[min(24cqw,7rem)]",
    icon: "size-9 xl:size-10",
    name: "text-[clamp(1.25rem,11cqw,2.75rem)]",
    nameLong: "text-[clamp(1.125rem,7cqw,2.25rem)]",
    tagline: "text-sm xl:text-base",
    arrow: "right-5",
  },
};

/** Píldora con degradado que enlaza a /seguros/[slug]. */
export function SeguroPill({
  seguro,
  size = "md",
  onFocus,
}: {
  seguro: SeguroConColor;
  size?: keyof typeof sizes;
  onFocus?: FocusEventHandler<HTMLAnchorElement>;
}) {
  const Icon = seguro.icon;
  const s = sizes[size];
  const { from, to } = seguro.colors;

  return (
    <Link
      href={`/seguros/${seguro.slug}`}
      onFocus={onFocus}
      style={{
        // Respaldo: color sólido. Degradado análogo interpolado en oklch.
        backgroundColor: from,
        backgroundImage: `linear-gradient(to right in oklch, ${from} 0%, ${from} 45%, ${to} 100%)`,
      }}
      className={`group/pill @container relative flex items-center rounded-full shadow-raised transition-[scale,box-shadow] duration-300 ease-brand hover:scale-[1.03] hover:shadow-float focus-visible:scale-[1.03] active:scale-[0.99] motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:focus-visible:scale-100 ${s.pill}`}
    >
      <span className={`flex aspect-square shrink-0 items-center justify-center rounded-full bg-white ${s.circle}`}>
        <Icon aria-hidden="true" className={s.icon} style={{ color: from }} strokeWidth={1.5} />
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={`block font-heading leading-[1.05] font-extrabold tracking-tight text-balance text-white ${
            seguro.name.length > LONG_NAME ? s.nameLong : s.name
          }`}
        >
          {seguro.name}
        </span>
        <span className={`mt-1 block truncate text-white/85 ${s.tagline}`}>{seguro.tagline}</span>
      </span>
      <ArrowRightIcon
        aria-hidden="true"
        strokeWidth={1.5}
        className={`absolute top-1/2 size-6 -translate-x-2 -translate-y-1/2 text-white opacity-0 transition duration-150 ease-brand group-hover/pill:translate-x-0 group-hover/pill:opacity-100 group-focus-visible/pill:translate-x-0 group-focus-visible/pill:opacity-100 motion-reduce:transition-none ${s.arrow}`}
      />
    </Link>
  );
}
