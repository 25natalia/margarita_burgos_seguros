import { ImageIcon } from "lucide-react";

type ImagePlaceholderProps = {
  /** Qué foto va aquí (ej. "Retrato de Margarita sonriendo"). */
  label: string;
  /** Proporción ancho/alto, ej. "4/5", "16/9", "1/1". */
  ratio?: string;
  className?: string;
};

/**
 * Bloque gris que reserva el espacio de una foto. Para reemplazarlo usar
 * next/image con la misma proporción (ej. className="aspect-[4/5] object-cover").
 */
export function ImagePlaceholder({
  label,
  ratio = "4/3",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Espacio para foto: ${label}`}
      style={{ aspectRatio: ratio }}
      className={`flex w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-line bg-surface-muted p-6 text-center text-ink-muted ${className}`}
    >
      <ImageIcon aria-hidden="true" className="size-10 opacity-60" strokeWidth={1.5} />
      <span className="max-w-[24ch] text-sm font-medium leading-snug">{label}</span>
      <span className="text-xs opacity-70">{ratio.replace("/", ":")}</span>
    </div>
  );
}
