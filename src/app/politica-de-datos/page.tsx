import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { contact } from "@/config/contact";
import { site } from "@/data/site";

// Política de tratamiento de datos personales: Ley 1581 de 2012 y Decreto 1377
// de 2013 (compilado en el Decreto 1074 de 2015). Revisar con un abogado antes
// de publicar y completar los datos pendientes en site.legal.

export const metadata: Metadata = {
  title: `Política de tratamiento de datos personales · ${site.name}`,
  description: `Cómo ${site.name} recolecta, usa y protege tus datos personales según la Ley 1581 de 2012.`,
};

export default function PoliticaDeDatos() {
  const { legal } = site;

  return (
    <LegalPage
      title="Política de tratamiento de datos personales"
      intro="Aquí te cuento qué datos te pido, para qué los uso, con quién los comparto y cómo puedes consultarlos, corregirlos o pedir que los borre."
      current={site.privacyPolicyUrl}
    >
      <h2>Aviso de privacidad</h2>
      <p>
        {legal.fullName}, como responsable del tratamiento, recolecta tus datos personales para
        responder tus solicitudes, cotizar y gestionar seguros a tu nombre ante las aseguradoras.
        Tienes derecho a conocer, actualizar, rectificar y suprimir tus datos, y a revocar la
        autorización. Puedes ejercerlos escribiendo a{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>. Esta política explica todo en
        detalle.
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <ul>
        <li>
          <strong>Nombre:</strong> {legal.fullName}
        </li>
        <li>
          <strong>Identificación:</strong> {legal.idNumber}
        </li>
        <li>
          <strong>Actividad:</strong> asesoría e intermediación de seguros ({legal.intermediaryType})
        </li>
        <li>
          <strong>Dirección:</strong> {legal.address}, {site.city}
        </li>
        <li>
          <strong>Correo:</strong> <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </li>
        <li>
          <strong>Teléfono y WhatsApp:</strong>{" "}
          <a href={`tel:${contact.phone}`}>{contact.phoneDisplay}</a>
        </li>
      </ul>

      <h2>2. Marco legal</h2>
      <p>
        Esta política cumple el artículo 15 de la Constitución Política, la Ley Estatutaria 1581
        de 2012, el Decreto 1377 de 2013 (compilado en el Decreto Único Reglamentario 1074 de
        2015) y las instrucciones de la Superintendencia de Industria y Comercio.
      </p>

      <h2>3. Datos que recolecto</h2>
      <ul>
        <li>
          <strong>Formulario del sitio:</strong> nombre, número de celular y tipo de seguro que te
          interesa.
        </li>
        <li>
          <strong>Para cotizar y tramitar tu póliza:</strong> documento de identidad, fecha de
          nacimiento, datos de contacto, información de tus beneficiarios y del bien o riesgo que
          quieres asegurar, según el producto.
        </li>
        <li>
          <strong>Datos sensibles:</strong> para seguros de vida y salud las aseguradoras pueden
          pedir información sobre tu estado de salud. Es un dato sensible: no estás obligado a
          entregarlo, pero sin él la aseguradora puede no estudiar la solicitud.
        </li>
        <li>
          <strong>Datos de menores de edad:</strong> solo cuando son beneficiarios o asegurados,
          entregados por su representante legal y respetando el interés superior del menor.
        </li>
      </ul>
      <p>
        El sitio no usa cookies de analítica ni de publicidad. Más detalles en la{" "}
        <Link href={site.cookiesUrl}>política de cookies</Link>.
      </p>

      <h2>4. Para qué uso tus datos</h2>
      <ol>
        <li>Responder tu mensaje o solicitud de cotización.</li>
        <li>Cotizar y comparar opciones entre las aseguradoras con las que trabajo.</li>
        <li>Tramitar la solicitud, la expedición, la renovación y los cambios de tu póliza.</li>
        <li>Acompañarte en reclamaciones y gestiones ante la aseguradora.</li>
        <li>
          Cumplir obligaciones legales, incluidas las de conocimiento del cliente y prevención del
          lavado de activos (SARLAFT) que exigen las aseguradoras.
        </li>
        <li>
          Enviarte información sobre renovaciones, novedades y productos de seguros, solo si me lo
          autorizas. Puedes pedir que deje de hacerlo en cualquier momento.
        </li>
      </ol>

      <h2>5. Autorización</h2>
      <p>
        Trato tus datos con tu autorización previa, expresa e informada. La das al marcar la casilla
        de aceptación del formulario o al escribirme por WhatsApp, correo o teléfono para pedir
        asesoría. Guardo la prueba de esa autorización.
      </p>

      <h2>6. Con quién comparto tus datos</h2>
      <ul>
        <li>
          <strong>Aseguradoras</strong> ({site.insurers.join(", ")}) a las que solicites cotización
          o póliza. Cada una trata los datos también según su propia política.
        </li>
        <li>
          <strong>Proveedores de comunicación</strong> como WhatsApp (Meta) o el correo
          electrónico, que pueden almacenar la información fuera de Colombia con niveles adecuados
          de protección.
        </li>
        <li>
          <strong>Autoridades</strong> que lo soliciten en ejercicio de sus funciones legales.
        </li>
      </ul>
      <p>No vendo ni cedo tus datos a terceros para fines comerciales.</p>

      <h2>7. Tus derechos</h2>
      <p>Como titular de los datos tienes derecho a:</p>
      <ul>
        <li>Conocer, actualizar y rectificar tus datos.</li>
        <li>Pedir prueba de la autorización que diste.</li>
        <li>Saber, si lo pides, qué uso le he dado a tus datos.</li>
        <li>
          Presentar quejas ante la Superintendencia de Industria y Comercio, después de hacer la
          consulta o el reclamo conmigo.
        </li>
        <li>
          Revocar la autorización o pedir que borre tus datos, salvo cuando exista un deber legal o
          contractual de conservarlos (por ejemplo, mientras tengas una póliza vigente).
        </li>
        <li>Acceder gratis a tus datos.</li>
      </ul>

      <h2>8. Cómo hacer consultas y reclamos</h2>
      <p>
        Escribe a <a href={`mailto:${contact.email}`}>{contact.email}</a> con tu nombre, número de
        documento, lo que pides y un dato de contacto para responderte.
      </p>
      <h3>Consultas</h3>
      <p>
        Respondo en máximo 10 días hábiles desde que la recibo. Si no es posible en ese plazo, te
        explico el motivo y te respondo en máximo 5 días hábiles más.
      </p>
      <h3>Reclamos (corrección, actualización, supresión o revocatoria)</h3>
      <p>
        Respondo en máximo 15 días hábiles desde que lo recibo; si no es posible, te informo el
        motivo y te respondo en máximo 8 días hábiles más. Si al reclamo le falta información, te
        la pido en los 5 días siguientes; si pasan 2 meses sin que la envíes, se entiende que
        desististe.
      </p>

      <h2>9. Seguridad y conservación</h2>
      <p>
        Uso medidas técnicas y administrativas razonables para proteger tus datos contra pérdida,
        consulta o uso no autorizado. Conservo los datos mientras sean necesarios para las
        finalidades descritas y durante los plazos que exigen las normas comerciales, tributarias
        y del sector asegurador.
      </p>

      <h2>10. Vigencia y cambios</h2>
      <p>
        Esta política rige desde el {legal.lastUpdated}. Si cambia de forma sustancial, lo
        publicaré en esta página antes de aplicar los cambios.
      </p>
    </LegalPage>
  );
}
