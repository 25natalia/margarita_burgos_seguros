import { Mail, MessageCircle, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";

// lucide-react ya no incluye logos de marcas: estos SVG siguen su mismo estilo de trazo.
function SocialIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
    >
      {children}
    </svg>
  );
}

const socialLinks = [
  {
    name: "Instagram",
    href: site.social.instagram,
    icon: (
      <SocialIcon>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </SocialIcon>
    ),
  },
  {
    name: "Facebook",
    href: site.social.facebook,
    icon: (
      <SocialIcon>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </SocialIcon>
    ),
  },
  {
    name: "LinkedIn",
    href: site.social.linkedin,
    icon: (
      <SocialIcon>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </SocialIcon>
    ),
  },
];

const linkClass = "inline-flex items-center gap-2 transition-colors hover:text-white focus-visible:outline-white";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-sm text-white/75">
      <div className="mx-auto max-w-content px-4 pt-8 pb-24 sm:px-6 sm:pb-8 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
          <p className="text-base font-bold text-white">
            {site.name} · Asesora de Seguros
          </p>

          <ul className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
            <li>
              <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} className={linkClass}>
                <Phone aria-hidden="true" className="size-4" />
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className={linkClass}>
                <Mail aria-hidden="true" className="size-4" />
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <MessageCircle aria-hidden="true" className="size-4" />
                WhatsApp
              </a>
            </li>
          </ul>

          <ul className="flex gap-2">
            {socialLinks.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.name} de ${site.name}`}
                  className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-white"
                >
                  {social.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-col items-center gap-2 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:justify-between sm:pr-20">
          <p>
            © {year} {site.name}. Todos los derechos reservados.
          </p>
          <a
            href={site.privacyPolicyUrl}
            className="underline underline-offset-2 transition-colors hover:text-white focus-visible:outline-white"
          >
            Política de tratamiento de datos personales
          </a>
        </div>
      </div>
    </footer>
  );
}
