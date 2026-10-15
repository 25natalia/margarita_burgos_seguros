import type { ReactNode } from "react";

/**
 * Encabezado de sección único para todo el sitio: título h2 (con degradado
 * sutil de marca sobre fondo claro; blanco sobre violeta) y subtítulo opcional.
 */
export function SectionHeading({
  id,
  title,
  subtitle,
  align = "center",
  onDark = false,
  className = "",
}: {
  id: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** responsive: centrado en móvil, a la izquierda desde lg (secciones de dos columnas). */
  align?: "center" | "left" | "responsive";
  onDark?: boolean;
  className?: string;
}) {
  const wrapAlign = {
    center: "mx-auto text-center",
    left: "",
    responsive: "mx-auto text-center lg:mx-0 lg:text-left",
  }[align];
  const subtitleAlign = { center: "mx-auto", left: "", responsive: "mx-auto lg:mx-0" }[align];

  return (
    <div className={`${wrapAlign} max-w-3xl ${className}`}>
      <h2 id={id} className={`text-h2 font-extrabold ${onDark ? "text-white" : "text-gradient"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 max-w-prose text-lead ${subtitleAlign} ${onDark ? "text-white/85" : "text-ink-muted"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
