import type { Metadata } from "next";
import Link from "next/link";
import { CookiePreferencesButton } from "@/components/CookieBanner";
import { LegalPage } from "@/components/LegalPage";
import { contact } from "@/config/contact";
import { site } from "@/data/site";
import { CONSENT_COOKIE } from "@/lib/consent";

// Política de cookies. Si se agrega analítica (ej. Google Analytics), añadir
// sus cookies a la tabla y cargarla solo con readConsent() === "all".

export const metadata: Metadata = {
  title: `Política de cookies · ${site.name}`,
  description: `Qué cookies usa el sitio de ${site.name} y cómo cambiar tus preferencias.`,
};

const cookies = [
  {
    name: CONSENT_COOKIE,
    type: "Necesaria",
    purpose: "Guarda tu elección sobre las cookies para no volver a preguntarte.",
    duration: "180 días",
  },
];

export default function Cookies() {
  return (
    <LegalPage
      title="Política de cookies"
      intro="Qué cookies usa este sitio, para qué sirven y cómo puedes cambiar tu elección."
      current={site.cookiesUrl}
    >
      <h2>Qué son las cookies</h2>
      <p>
        Son pequeños archivos que un sitio guarda en tu navegador para recordar información entre
        visitas. Cuando permiten identificarte, son datos personales y se rigen por la Ley 1581 de
        2012 y la{" "}
        <Link href={site.privacyPolicyUrl}>política de tratamiento de datos personales</Link>.
      </p>

      <h2>Cookies que uso</h2>
      <p>
        Hoy el sitio solo usa una cookie necesaria. No uso cookies de analítica, publicidad ni
        redes sociales.
      </p>
      <div className="mt-6 overflow-x-auto rounded-card border border-line">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <thead className="bg-tint font-heading text-primary-dark">
            <tr>
              <th scope="col" className="px-4 py-3">Cookie</th>
              <th scope="col" className="px-4 py-3">Tipo</th>
              <th scope="col" className="px-4 py-3">Para qué sirve</th>
              <th scope="col" className="px-4 py-3">Duración</th>
            </tr>
          </thead>
          <tbody>
            {cookies.map((cookie) => (
              <tr key={cookie.name} className="border-t border-line">
                <td className="px-4 py-3 font-mono">{cookie.name}</td>
                <td className="px-4 py-3">{cookie.type}</td>
                <td className="px-4 py-3">{cookie.purpose}</td>
                <td className="px-4 py-3">{cookie.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Si más adelante activo cookies de analítica para entender cómo se usa el sitio, las
        agregaré a esta tabla y solo se activarán si eliges “Aceptar” en el aviso de cookies.
      </p>

      <h2>Sitios de terceros</h2>
      <p>
        Al abrir WhatsApp o Instagram desde el sitio sales a servicios de Meta, que usan sus propias
        cookies según sus políticas.
      </p>

      <h2>Cómo cambiar tu elección</h2>
      <p>
        Puedes cambiarla cuando quieras desde aquí:{" "}
        <CookiePreferencesButton className="text-primary underline underline-offset-2 hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" />
        . También puedes borrar o bloquear las cookies desde la configuración de tu navegador.
      </p>

      <h2>Contacto</h2>
      <p>
        Si tienes preguntas sobre esta política, escríbeme a{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>
    </LegalPage>
  );
}
