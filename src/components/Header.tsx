"use client";

import { ArrowRightIcon, ChatBubbleOvalLeftIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useVelocity,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { InstagramIcon } from "@/components/InstagramIcon";
import { setScrollLocked } from "@/components/motion/SmoothScroll";
import { contact } from "@/config/contact";
import { seguros } from "@/data/seguros";
import { site } from "@/data/site";
import { duration, ease, spring } from "@/lib/motion";
import { getWhatsAppLink } from "@/lib/whatsapp";

/*
 * Navbar flotante tipo "pill": máximo 5 enlaces de texto y un solo botón.
 * - "Seguros" abre un dropdown con los 8 seguros y "Ver todos los seguros →"
 *   (reemplaza al botón secundario "Ver seguros").
 * - "Testimonios" no va en el navbar (sigue en el menú móvil y en el footer).
 * Los enlaces a secciones ("/#seccion") los intercepta SmoothScroll en la home
 * y desplaza con el offset del navbar.
 */
const links = [
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "servicios", label: "Seguros", dropdown: true },
  { id: "como-funciona", label: "Proceso" },
  { id: "preguntas-frecuentes", label: "Preguntas" },
  { id: "contacto", label: "Contacto" },
];

const mobileLinks = [
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "servicios", label: "Seguros" },
  { id: "como-funciona", label: "Proceso" },
  { id: "testimonios", label: "Testimonios" },
  { id: "preguntas-frecuentes", label: "Preguntas" },
  { id: "contacto", label: "Contacto" },
];

const quoteHref = getWhatsAppLink("Hola Margarita, quiero cotizar un seguro");

/** Sección visible bajo la franja central de la pantalla. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["inicio", ...links.map((l) => l.id), "testimonios"]
      .map((id) => document.getElementById(id))
      .forEach((el) => el && observer.observe(el));
    return () => {
      observer.disconnect();
      setActive(null);
    };
  }, [enabled]);
  return active;
}

/**
 * Estado del navbar según el scroll: compacto al bajar, oculto al bajar rápido
 * (más allá del Hero) y visible otra vez al subir.
 */
function useNavScrollState() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - last.current;
    last.current = y;
    setCompact(y > 24);
    if (delta < 0) setHidden(false);
    else if (y > 600 && velocity.get() > 1800) setHidden(true);
  });
  return { compact, hidden };
}

/** Hamburguesa que se transforma en × */
function MenuIcon({ open }: { open: boolean }) {
  const t = { duration: duration.base, ease };
  return (
    <span aria-hidden="true" className="relative block h-3.5 w-5">
      <motion.span
        className="absolute left-0 h-[1.5px] w-5 rounded-full bg-current"
        initial={false}
        animate={open ? { top: 6, rotate: 45 } : { top: 2, rotate: 0 }}
        transition={t}
      />
      <motion.span
        className="absolute left-0 h-[1.5px] w-5 rounded-full bg-current"
        initial={false}
        animate={open ? { top: 6, rotate: -45 } : { top: 10, rotate: 0 }}
        transition={t}
      />
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(isHome);
  const { compact, hidden } = useNavScrollState();
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);

  // Bloquear el scroll con el menú móvil abierto; Escape cierra menú y dropdown.
  useEffect(() => {
    setScrollLocked(menuOpen);
    return () => setScrollLocked(false);
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      setDropdownOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openDropdown = () => {
    window.clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };
  const closeDropdownSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setDropdownOpen(false), 120);
  };

  // La pastilla va bajo el enlace con hover; si no hay hover, bajo la sección activa.
  const pillOn = hovered ?? (links.some((l) => l.id === active) ? active : null);
  const hide = hidden && !menuOpen && !dropdownOpen && !reduceMotion;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-4 sm:pt-4">
      <a
        href="#contenido"
        className="pointer-events-auto sr-only rounded-full bg-primary px-4 py-2 font-semibold text-white focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
      >
        Saltar al contenido
      </a>

      <motion.div
        className="relative mx-auto max-w-content"
        initial={false}
        animate={{ y: hide ? "-140%" : compact ? -4 : 0 }}
        transition={{ duration: duration.base, ease }}
      >
        {/* Pill con vidrio */}
        <div
          className={`pointer-events-auto flex h-16 items-center justify-between gap-4 rounded-full border border-line/70 pr-2 pl-5 backdrop-blur-[16px] backdrop-saturate-[1.8] transition-[background-color,box-shadow] duration-300 ease-brand ${
            compact || menuOpen
              ? "bg-white/90 shadow-[0_1px_2px_rgb(42_24_134/0.04),0_8px_24px_-12px_rgb(42_24_134/0.16)]"
              : "bg-white/72 shadow-[0_1px_2px_rgb(42_24_134/0.03)]"
          }`}
        >
          <Link
            href="/"
            className="flex h-11 shrink-0 items-center rounded-control"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/logo-margarita.svg"
              alt={site.name}
              width={948}
              height={324}
              priority
              unoptimized
              className={`h-9 w-auto origin-left transition-transform duration-300 ease-brand ${compact ? "scale-[0.92]" : ""}`}
            />
          </Link>

          {/* Enlaces (escritorio) con pastilla deslizante */}
          <nav aria-label="Principal" className="hidden lg:block" onPointerLeave={() => setHovered(null)}>
            <LayoutGroup>
              <ul className="flex items-center">
                {links.map((link) => {
                  const isActive = active === link.id;
                  const className = `relative inline-flex h-11 items-center gap-1 rounded-full px-4 text-[0.9375rem] font-medium transition-colors duration-150 ease-brand ${
                    isActive || (link.dropdown && dropdownOpen) ? "text-primary" : "text-ink-muted hover:text-primary-dark"
                  }`;
                  const pill = pillOn === link.id && (
                    <motion.span
                      layoutId="nav-pill"
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-full bg-tint"
                      transition={reduceMotion ? { duration: 0 } : spring.snappy}
                    />
                  );
                  return (
                    <li
                      key={link.id}
                      className="relative isolate"
                      onPointerEnter={() => {
                        setHovered(link.id);
                        if (link.dropdown) openDropdown();
                      }}
                      onPointerLeave={() => link.dropdown && closeDropdownSoon()}
                    >
                      {link.dropdown ? (
                        <button
                          type="button"
                          aria-expanded={dropdownOpen}
                          aria-controls="menu-seguros"
                          onClick={() => setDropdownOpen((v) => !v)}
                          className={className}
                        >
                          {pill}
                          {link.label}
                          <ChevronDownIcon
                            aria-hidden="true"
                            strokeWidth={1.5}
                            className={`size-4 transition-transform duration-300 ease-brand ${dropdownOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                      ) : (
                        <a href={`/#${link.id}`} aria-current={isActive ? "location" : undefined} className={className}>
                          {pill}
                          {link.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </LayoutGroup>
          </nav>

          <div className="flex shrink-0 items-center gap-1">
            <Button href={quoteHref} size="md" icon={ChatBubbleOvalLeftIcon} iconHiddenOnMobile>
              Cotiza gratis
            </Button>
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="menu-movil"
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex size-12 items-center justify-center rounded-full text-primary-dark transition-colors duration-150 hover:bg-tint lg:hidden"
            >
              <span className="sr-only">{menuOpen ? "Cerrar menú" : "Abrir menú"}</span>
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>

        {/* Dropdown de Seguros: hermano de la pill (un backdrop-filter anidado no difumina la página) */}
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              id="menu-seguros"
              className="pointer-events-auto absolute top-full left-1/2 mt-3 hidden w-[32rem] -translate-x-1/2 origin-top rounded-card border border-line/70 bg-white/85 p-3 shadow-[0_1px_2px_rgb(42_24_134/0.04),0_24px_48px_-16px_rgb(42_24_134/0.2)] backdrop-blur-[16px] backdrop-saturate-[1.8] lg:block"
              initial={{ opacity: 0, scale: 0.98, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -6 }}
              transition={{ duration: duration.base, ease }}
              onPointerEnter={openDropdown}
              onPointerLeave={closeDropdownSoon}
            >
              <ul className="grid grid-cols-2 gap-1">
                {seguros.map((seguro) => {
                  const Icon = seguro.icon;
                  return (
                    <li key={seguro.slug}>
                      <Link
                        href={`/seguros/${seguro.slug}`}
                        onClick={() => setDropdownOpen(false)}
                        className="group/item flex h-12 items-center gap-3 rounded-control px-3 font-medium text-ink transition-colors duration-150 ease-brand hover:bg-tint hover:text-primary-dark"
                      >
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-tint transition-colors duration-150 group-hover/item:bg-white">
                          <Icon aria-hidden="true" className="size-4" style={{ color: seguro.colors.from }} strokeWidth={1.5} />
                        </span>
                        {seguro.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link
                href="/#servicios"
                onClick={() => setDropdownOpen(false)}
                className="group/all mt-2 flex h-11 items-center justify-between rounded-control border-t border-line/70 px-3 pt-1 text-[0.9375rem] font-semibold text-primary"
              >
                Ver todos los seguros
                <ArrowRightIcon
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-5 transition-transform duration-150 ease-brand group-hover/all:translate-x-1"
                />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Menú móvil a pantalla completa */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="menu-movil"
            aria-label="Principal"
            data-lenis-prevent
            className="pointer-events-auto fixed inset-0 -z-10 flex flex-col overflow-y-auto bg-white px-6 pt-28 pb-8 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.base, ease }}
          >
            <motion.ul
              className="flex flex-col gap-1"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } }}
            >
              {mobileLinks.map((link) => (
                <motion.li
                  key={link.id}
                  variants={{
                    hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
                    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: duration.slow, ease } },
                  }}
                >
                  <a
                    href={`/#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active === link.id ? "location" : undefined}
                    className={`flex min-h-14 items-center font-heading text-[2rem] leading-tight font-extrabold tracking-tight transition-colors duration-150 ${
                      active === link.id ? "text-primary" : "text-primary-dark"
                    }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="mt-auto flex flex-col gap-4 pt-10"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.slow, ease, delay: 0.35 }}
            >
              <Button href={quoteHref} size="lg" icon={ChatBubbleOvalLeftIcon} className="w-full">
                Cotiza gratis por WhatsApp
              </Button>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram de ${site.name}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full font-semibold text-ink-muted transition-colors duration-150 hover:text-primary"
              >
                <InstagramIcon className="size-6" />
                <span aria-hidden="true">Instagram</span>
              </a>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
