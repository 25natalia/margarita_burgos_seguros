import { PhotoIcon } from "@heroicons/react/24/outline";

type ImagePlaceholderProps = {
  /** Qué foto va aquí (ej. "Retrato de Margarita sonriendo"). */
  label: string;
  /** Proporción ancho/alto, ej. "4/5", "16/9", "1/1". */
  ratio?: string;
  /** Radio de las esquinas (token de radio). */
  radius?: "rounded-card" | "rounded-feature";
  className?: string;
};

/**
 * Bloque lavanda que reserva el espacio de una foto. Para reemplazarlo usar
 * next/image con la misma proporción (ej. className="aspect-[4/5] object-cover").
 */
export function ImagePlaceholder({
  label,
  ratio = "4/3",
  radius = "rounded-card",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Espacio para foto: ${label}`}
      style={{ aspectRatio: ratio }}
      className={`flex w-full flex-col items-center justify-center gap-3 ${radius} border border-dashed border-line bg-tint p-6 text-center text-ink-muted ${className}`}
    >
      <PhotoIcon aria-hidden="true" className="size-10 text-primary/50" strokeWidth={1.5} />
      <span className="max-w-[24ch] text-sm font-medium leading-snug">{label}</span>
      <span className="text-xs">{ratio.replace("/", ":")}</span>
    </div>
  );
}
