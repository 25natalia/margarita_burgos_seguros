import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { contact } from "@/config/contact";
import { site } from "@/data/site";

// Términos y condiciones de uso del sitio: Ley 1480 de 2011 (Estatuto del
// Consumidor), Ley 1328 de 2009 (consumidor financiero) y Código de Comercio.
// Revisar con un abogado antes de publicar.

export const metadata: Metadata = {
  title: `Términos y condiciones · ${site.name}`,
  description: `Condiciones de uso del sitio de ${site.name} y alcance de la asesoría en seguros.`,
};

export default function Terminos() {
  const { legal } = site;

  return (
    <LegalPage
      title="Términos y condiciones"
      intro="Las reglas para usar este sitio y lo que puedes esperar de mi asesoría. Al navegarlo o escribirme, las aceptas."
      current={site.termsUrl}
    >
      <h2>1. Quién soy</h2>
      <p>
        Este sitio pertenece a {legal.fullName}, identificada con {legal.idNumber}, quien actúa
        como {legal.intermediaryType} con domicilio en {site.city}. Contacto:{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a> y{" "}
        <a href={`tel:${contact.phone}`}>{contact.phoneDisplay}</a>.
      </p>

      <h2>2. Para qué sirve este sitio</h2>
      <p>
        Es un sitio informativo: presenta mi asesoría y los seguros con los que trabajo, y te
        permite contactarme por WhatsApp o por el formulario. En el sitio no se compran pólizas ni
        se hacen pagos.
      </p>

      <h2>3. Alcance de la asesoría</h2>
      <ul>
        <li>
          No soy una aseguradora. Las pólizas las expiden las compañías de seguros vigiladas por la
          Superintendencia Financiera de Colombia, que son las responsables de las coberturas y de
          pagar los siniestros.
        </li>
        <li>La asesoría y la cotización no tienen costo para ti.</li>
        <li>
          Las cotizaciones son informativas y no obligan a ninguna de las partes. El precio y las
          condiciones definitivas dependen del estudio de la aseguradora y quedan en la póliza que
          esta expida.
        </li>
        <li>
          La decisión de contratar siempre es tuya. Te explico las opciones para que elijas con
          información clara, como lo exige el régimen de protección al consumidor financiero (Ley
          1328 de 2009).
        </li>
      </ul>

      <h2>4. Información de los seguros</h2>
      <p>
        Las descripciones de coberturas, montos mínimos, plazos y beneficios que aparecen en el
        sitio son generales y pueden cambiar según la aseguradora y el plan. Las condiciones que
        aplican son las del clausulado y la póliza de cada compañía. Las rentabilidades de los
        planes de ahorro no están garantizadas salvo que la póliza lo diga expresamente.
      </p>

      <h2>5. Tu deber de informar con exactitud</h2>
      <p>
        Al solicitar un seguro debes declarar con sinceridad tu estado de salud y las
        circunstancias del riesgo. Según el artículo 1058 del Código de Comercio, la información
        falsa o incompleta puede hacer que el contrato sea anulado o que se reduzca el pago de un
        siniestro.
      </p>

      <h2>6. Quejas y reclamos</h2>
      <p>Si no estás conforme con un servicio puedes acudir, en este orden:</p>
      <ol>
        <li>
          A mí, por <a href={`mailto:${contact.email}`}>{contact.email}</a> o WhatsApp.
        </li>
        <li>A la aseguradora que expidió tu póliza, por sus canales de atención.</li>
        <li>Al Defensor del Consumidor Financiero de esa aseguradora.</li>
        <li>
          A la Superintendencia Financiera de Colombia, en{" "}
          <a href="https://www.superfinanciera.gov.co" target="_blank" rel="noopener noreferrer">
            superfinanciera.gov.co
          </a>
          .
        </li>
      </ol>

      <h2>7. Marcas y contenido</h2>
      <p>
        Los textos, fotos y diseño del sitio son de {site.name} y no se pueden copiar sin
        autorización. Las marcas {site.insurers.join(", ")} y las demás que aparecen pertenecen a
        sus titulares; se mencionan solo para informar con qué compañías trabajo y en qué eventos
        he sido reconocida. Este no es un sitio oficial de ninguna aseguradora.
      </p>

      <h2>8. Enlaces a otros sitios</h2>
      <p>
        Los botones de WhatsApp e Instagram te llevan a servicios de terceros, que tienen sus
        propios términos y políticas de privacidad.
      </p>

      <h2>9. Uso del sitio</h2>
      <p>
        Te comprometes a usar el sitio de buena fe, a dar datos verdaderos en el formulario y a no
        intentar afectar su funcionamiento. Procuro que el sitio esté disponible y actualizado, pero
        puede tener interrupciones o información desactualizada.
      </p>

      <h2>10. Datos personales</h2>
      <p>
        El tratamiento de tus datos se rige por la{" "}
        <Link href={site.privacyPolicyUrl}>política de tratamiento de datos personales</Link> y la{" "}
        <Link href={site.cookiesUrl}>política de cookies</Link>.
      </p>

      <h2>11. Ley aplicable y cambios</h2>
      <p>
        Estos términos se rigen por las leyes de la República de Colombia. Puedo actualizarlos en
        cualquier momento; la versión vigente es la publicada en esta página.
      </p>
    </LegalPage>
  );
}
