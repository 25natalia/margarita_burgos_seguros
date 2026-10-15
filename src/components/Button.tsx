import Link from "next/link";
import type { ComponentType, ReactNode, SVGProps } from "react";
import { RollingText } from "@/components/RollingText";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

/** Alturas y padding según docs/design-tokens.md (Apple HIG / Material / WCAG 2.2). */
const sizes = {
  sm: { box: "h-10 gap-2 px-6 text-base", icon: "size-5" }, // 40px: acciones secundarias compactas (solo escritorio)
  md: { box: "h-12 gap-2 px-6 text-base", icon: "size-5" }, // 48px: estándar (navbar y CTAs)
  lg: { box: "h-14 gap-2 px-8 text-base", icon: "size-5" }, // 56px: CTA principal de una sección y envío de formulario
};

const variants = {
  /** Relleno violeta; único con sombra. Hover: violeta más profundo. */
  primary:
    "bg-accent text-white shadow-soft hover:bg-accent-hover hover:shadow-raised focus-visible:outline-primary",
  /** Sin borde: fondo lavanda y texto violeta. Hover: lila más intenso. Sin sombra. */
  secondary: "bg-secondary text-primary hover:bg-secondary-hover focus-visible:outline-primary",
  /** Solo texto. Hover: lavanda. */
  ghost: "text-primary hover:bg-tint focus-visible:outline-primary",
  /** Sobre fondos violeta: blanco con texto violeta. Hover: lila suave. */
  inverse: "bg-white text-primary hover:bg-secondary-hover focus-visible:outline-white",
};

const base =
  "group inline-flex shrink-0 items-center justify-center rounded-full font-semibold tracking-normal whitespace-nowrap " +
  "transition-[background-color,border-color,color,box-shadow,scale] duration-150 ease-brand " +
  "active:scale-[0.98] motion-reduce:active:scale-100 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50";

type ButtonProps = {
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** Ícono antes del texto. */
  icon?: Icon;
  /** Oculta el ícono en móvil (< 640px) para que el botón quepa en espacios angostos. */
  iconHiddenOnMobile?: boolean;
  /** Ícono después del texto (ej. flecha). */
  iconRight?: Icon;
  /** Enlace interno (Link) o externo (http/wa.me: nueva pestaña). Sin href: <button>. */
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  /** Texto sin efecto 3D (ej. "Enviando…"). */
  plain?: boolean;
  "aria-busy"?: boolean;
};

/** Botón único del sitio: variantes primary/secondary/ghost/inverse y tamaños sm/md/lg. */
export function Button({
  children,
  variant = "primary",
  size = "md",
  icon: IconLeft,
  iconRight: IconRight,
  href,
  type = "button",
  className = "",
  plain = false,
  iconHiddenOnMobile = false,
  onClick,
  ...rest
}: ButtonProps) {
  const s = sizes[size];
  const classes = `${base} ${s.box} ${variants[variant]} ${className}`;
  const iconClass = `${s.icon} shrink-0`;
  const content = (
    <>
      {IconLeft && (
        <IconLeft
          aria-hidden="true"
          className={`${iconClass} ${iconHiddenOnMobile ? "hidden sm:block" : ""}`}
          strokeWidth={1.5}
        />
      )}
      {plain ? children : <RollingText>{children}</RollingText>}
      {IconRight && <IconRight aria-hidden="true" className={iconClass} strokeWidth={1.5} />}
    </>
  );

  if (href) {
    const external = /^https?:\/\//.test(href);
    // Anclas ("/#seccion"): <a> normal; SmoothScroll las desplaza con el offset del navbar.
    if (!external && href.includes("#")) {
      return (
        <a href={href} className={classes} onClick={onClick}>
          {content}
        </a>
      );
    }
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick}>
        {content}
      </a>
    ) : (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...rest}>
      {content}
    </button>
  );
}
