import { ChatBubbleOvalLeftIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType, ReactNode, SVGProps } from "react";
import { InstagramIcon } from "@/components/InstagramIcon";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { contact } from "@/config/contact";
import { seguros } from "@/data/seguros";
import { site } from "@/data/site";
import { getWhatsAppLink } from "@/lib/whatsapp";

const navigation = [
  { href: "/#sobre-mi", label: "Sobre mí" },
  { href: "/#servicios", label: "Seguros" },
  { href: "/#como-funciona", label: "Proceso" },
  { href: "/#testimonios", label: "Testimonios" },
  { href: "/#preguntas-frecuentes", label: "Preguntas frecuentes" },
  { href: "/#contacto", label: "Contacto" },
];

/**
 * Enlace del footer: subrayado blanco que se dibuja de izquierda a derecha.
 * Área táctil de 44px en móvil; en escritorio (puntero fino) la lista se aprieta.
 */
function FooterLink({
  href,
  children,
  icon: Icon,
}: {
  href: string;
  children: ReactNode;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
}) {
  const external = /^https?:/.test(href);
  const className =
    "group/fl inline-flex min-h-11 items-center gap-2 rounded-full text-white/70 transition-colors duration-150 ease-brand hover:text-white focus-visible:outline-white lg:min-h-0";
  const content = (
    <>
      {Icon && <Icon aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.5} />}
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-brand group-hover/fl:scale-x-100 group-focus-visible/fl:scale-x-100 motion-reduce:transition-none"
        />
      </span>
    </>
  );
  // Externos y anclas ("/#seccion", que SmoothScroll desplaza): <a> normal.
  return external || href.includes("#") ? (
    <a href={href} className={className} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {content}
    </a>
  ) : (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

const columnTitle = "font-heading text-base font-extrabold text-white";
const linkList = "mt-3 lg:space-y-2 lg:leading-6";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    // data-fab-hide: el botón flotante de WhatsApp se oculta aquí para no tapar contenido.
    <footer data-fab-hide className="bg-primary-dark text-white">
      <div className="mx-auto max-w-content px-4 pt-12 pb-6 sm:px-6 lg:px-8 lg:pt-16 lg:pb-8">
        {/* Cierre */}
        <Reveal className="border-b border-white/15 pb-8">
          <h2 className="max-w-3xl text-h2-compact font-extrabold text-white">
            Tu tranquilidad empieza con una conversación
          </h2>
        </Reveal>

        {/* Columnas */}
        <RevealGroup className="grid gap-10 pt-10 pb-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <RevealItem className="lg:col-span-3">
            {/* Logo en blanco con filtro (no hay versión blanca del SVG) */}
            <Image
              src="/logo-margarita.svg"
              alt={site.name}
              width={948}
              height={324}
              unoptimized
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="mt-4 max-w-xs text-white/70">
              Te acompaño a elegir tu seguro y a usarlo cuando lo necesites, con calma y sin letra
              pequeña.
            </p>
          </RevealItem>

          <RevealItem className="lg:col-span-2">
            <h3 className={columnTitle}>Navegación</h3>
            <ul className={linkList}>
              {navigation.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </RevealItem>

          <RevealItem className="lg:col-span-4">
            <h3 className={columnTitle}>Seguros</h3>
            {/* En escritorio, 2 subcolumnas para que el footer quede compacto */}
            <ul className={`${linkList} lg:grid lg:grid-cols-2 lg:gap-x-6 lg:gap-y-2 lg:space-y-0`}>
              {seguros.map((seguro) => (
                <li key={seguro.slug}>
                  <FooterLink href={`/seguros/${seguro.slug}`}>{seguro.name}</FooterLink>
                </li>
              ))}
            </ul>
          </RevealItem>

          <RevealItem className="lg:col-span-3">
            <h3 className={columnTitle}>Contacto</h3>
            <ul className={linkList}>
              <li>
                <FooterLink href={getWhatsAppLink()} icon={ChatBubbleOvalLeftIcon}>
                  WhatsApp
                </FooterLink>
              </li>
              <li className="flex min-h-11 items-center gap-2 text-white/70 lg:min-h-0">
                {/* TODO (Margarita): ciudad real en site.city */}
                <MapPinIcon aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.5} />
                {site.city}
              </li>
            </ul>
          </RevealItem>
        </RevealGroup>

        {/* Línea final: copyright a la izquierda; legales e Instagram a la derecha */}
        <div className="flex flex-col gap-4 border-t border-white/15 pt-6 text-sm text-white/70 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {year} {site.name}. Todos los derechos reservados.
          </p>
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-6">
            {/* TODO (Margarita): páginas reales de privacidad y de tratamiento de datos (Ley 1581 de 2012). */}
            <ul className="flex flex-col lg:flex-row lg:gap-6">
              <li>
                <FooterLink href={site.privacyPolicyUrl}>Política de privacidad</FooterLink>
              </li>
              <li>
                <FooterLink href={site.privacyPolicyUrl}>Tratamiento de datos (Ley 1581 de 2012)</FooterLink>
              </li>
            </ul>
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram de ${site.name}`}
              className="-ml-2.5 flex size-11 items-center justify-center rounded-full text-white/70 transition-[color,translate] duration-150 ease-brand hover:-translate-y-0.5 hover:text-white focus-visible:outline-white motion-reduce:hover:translate-y-0 lg:ml-0"
            >
              <InstagramIcon className="size-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
