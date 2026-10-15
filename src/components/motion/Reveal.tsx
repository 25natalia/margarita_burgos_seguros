import type { CSSProperties, ReactNode } from "react";

/**
 * Aparición al entrar en pantalla (una sola vez): fade + subida de 14px + blur
 * de 4px → 0, en 600 ms. Componentes de servidor: solo marcan el HTML con
 * data-appear; <RevealObserver> (un único IntersectionObserver en el layout)
 * agrega data-visible y CSS anima (ver globals.css).
 * - <Reveal>: un bloque.
 * - <RevealGroup> + <RevealItem>: grupo con stagger (70 ms por defecto).
 * No usar sobre secciones con sticky (Seguros, Proceso): el transform lo rompe.
 */

type Tag = "div" | "ul" | "ol" | "dl" | "li" | "p";

export function Reveal({
  children,
  as: Comp = "div",
  delay = 0,
  className,
}: {
  children: ReactNode;
  as?: Tag;
  /** Retraso en segundos. */
  delay?: number;
  className?: string;
}) {
  const style = delay ? ({ "--appear-delay": `${Math.round(delay * 1000)}ms` } as CSSProperties) : undefined;
  return (
    <Comp data-appear="" className={className} style={style}>
      {children}
    </Comp>
  );
}

export function RevealGroup({
  children,
  as: Comp = "div",
  stagger = 0.07,
  className,
}: {
  children: ReactNode;
  as?: Tag;
  /** Pausa entre elementos, en segundos. */
  stagger?: number;
  className?: string;
}) {
  return (
    <Comp data-appear-group={Math.round(stagger * 1000)} className={className}>
      {children}
    </Comp>
  );
}

export function RevealItem({ children, as: Comp = "div", className }: { children: ReactNode; as?: Tag; className?: string }) {
  return (
    <Comp data-appear="" data-appear-item="" className={className}>
      {children}
    </Comp>
  );
}
