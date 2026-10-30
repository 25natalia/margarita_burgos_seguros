import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { site } from "@/data/site";

const legalLinks = [
  { href: site.privacyPolicyUrl, label: "Tratamiento de datos personales" },
  { href: site.termsUrl, label: "Términos y condiciones" },
  { href: site.cookiesUrl, label: "Política de cookies" },
];

/**
 * Plantilla de las páginas legales: encabezado lavanda con el h1 y la fecha de
 * actualización, texto a ancho de lectura y enlaces a las demás políticas.
 */
export function LegalPage({
  title,
  intro,
  current,
  children,
}: {
  title: string;
  intro: ReactNode;
  current: string;
  children: ReactNode;
}) {
  return (
    <>
      <main id="contenido" className="flex-1 bg-surface">
        <header className="border-b border-line bg-primary-soft">
          <div className="mx-auto max-w-content px-4 pt-32 pb-12 sm:px-6 lg:px-8 lg:pt-40 lg:pb-16">
            <h1 className="text-gradient max-w-3xl text-display font-extrabold">{title}</h1>
            <p className="mt-4 max-w-prose text-lead text-ink-muted">{intro}</p>
            <p className="mt-6 text-sm text-ink-muted">Última actualización: {site.legal.lastUpdated}</p>
          </div>
        </header>

        <div className="mx-auto grid max-w-content gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-20">
          <article
            className="max-w-prose text-ink lg:col-span-8 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-primary-dark [&_h2]:mt-12 [&_h2]:font-heading [&_h2]:text-h2-compact [&_h2]:font-extrabold [&_h2]:text-primary-dark [&_h2:first-child]:mt-0 [&_h3]:mt-8 [&_h3]:font-heading [&_h3]:text-h3 [&_h3]:font-extrabold [&_h3]:text-primary-dark [&_li]:mt-2 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mt-4 [&_strong]:font-semibold [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6"
          >
            {children}
          </article>

          <nav aria-label="Políticas del sitio" className="lg:col-span-4">
            <div className="rounded-card border border-line bg-tint p-6 lg:sticky lg:top-28">
              <p className="font-heading font-extrabold text-primary-dark">Políticas del sitio</p>
              <ul className="mt-3">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={link.href === current ? "page" : undefined}
                      className="flex min-h-11 items-center rounded-control text-ink-muted transition-colors duration-150 ease-brand hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-[current=page]:font-semibold aria-[current=page]:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}
