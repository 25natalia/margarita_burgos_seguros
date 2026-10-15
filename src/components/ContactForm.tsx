"use client";

import {
  ArrowPathIcon,
  ChatBubbleOvalLeftIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolid } from "@heroicons/react/20/solid";
import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/Button";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { site } from "@/data/site";
import { getWhatsAppLink } from "@/lib/whatsapp";

type Field = "name" | "phone" | "insurance" | "consent";
type Values = { name: string; phone: string; insurance: string; consent: boolean };
type Status = "idle" | "sending" | "sent";

const fields: Field[] = ["name", "phone", "insurance", "consent"];
const emptyValues: Values = { name: "", phone: "", insurance: "", consent: false };

/** Mensajes en tono amable: dicen qué hacer, no qué salió mal. */
function validate(field: Field, v: Values): string | undefined {
  switch (field) {
    case "name":
      return v.name.trim().length < 2 ? "Escribe tu nombre para saber cómo llamarte." : undefined;
    case "phone":
      return v.phone.replace(/\D/g, "").length === 10
        ? undefined
        : "Revisa tu WhatsApp: debe tener 10 dígitos, por ejemplo 300 123 4567.";
    case "insurance":
      return v.insurance ? undefined : "Elige el seguro que te interesa.";
    case "consent":
      return v.consent ? undefined : "Para continuar, acepta la política de tratamiento de datos.";
  }
}

/** 3001234567 → "300 123 4567" (máximo 10 dígitos). */
function formatPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 10);
  return [d.slice(0, 3), d.slice(3, 6), d.slice(6)].filter(Boolean).join(" ");
}

/* Campo "filled": fondo lavanda sin borde visible (borde transparente de 1.5px
   para que no salte el layout). Foco: fondo blanco, borde violeta y anillo lavanda. */
const controlClass =
  "peer block h-14 w-full appearance-none rounded-field border-[1.5px] border-transparent bg-tint pt-[1.375rem] pb-1 " +
  "text-base leading-6 text-ink transition-[background-color,border-color,box-shadow] duration-150 ease-brand " +
  "hover:bg-secondary/60 focus:border-primary focus:bg-white focus:shadow-[0_0_0_4px_var(--color-secondary-hover)] " +
  "focus-visible:outline-none aria-[invalid=true]:border-danger/50 aria-[invalid=true]:bg-white";

/**
 * Contenedor de un campo con label flotante real (asociado con htmlFor). En
 * reposo el label se ve como placeholder centrado; al enfocar o con contenido
 * sube y se achica (solo transform, 200 ms).
 */
function FloatingField({
  id,
  label,
  filled,
  valid,
  error,
  errorId,
  prefix,
  trailing,
  children,
}: {
  id: string;
  label: string;
  filled: boolean;
  valid: boolean;
  error?: string;
  errorId: string;
  prefix?: string;
  trailing?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="group/field relative" data-filled={filled || undefined}>
        {children}
        {prefix && (
          // Prefijo alineado con el texto del campo; aparece al enfocar o con contenido.
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-[1.4375rem] left-4 border-r border-line pr-3 leading-6 text-ink-muted opacity-0 transition-opacity duration-150 group-focus-within/field:opacity-100 group-data-[filled]/field:opacity-100"
          >
            {prefix}
          </span>
        )}
        <label
          htmlFor={id}
          className="pointer-events-none absolute top-0 left-4 origin-left translate-y-4 text-base text-ink-muted transition-[translate,scale,color] duration-200 ease-brand group-focus-within/field:translate-y-1.5 group-focus-within/field:scale-[0.8] group-focus-within/field:text-primary group-data-[filled]/field:translate-y-1.5 group-data-[filled]/field:scale-[0.8] motion-reduce:transition-none"
        >
          {label}
        </label>
        {trailing}
        {valid && !error && (
          <CheckCircleSolid
            aria-hidden="true"
            className={`pointer-events-none absolute top-1/2 size-5 -translate-y-1/2 text-mint-deep ${trailing ? "right-11" : "right-4"}`}
          />
        )}
      </div>
      {error && (
        <p id={errorId} className="field-msg mt-2 flex items-start gap-2 text-danger">
          <ExclamationCircleIcon aria-hidden="true" className="mt-0.5 size-5 shrink-0" strokeWidth={1.5} />
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [valid, setValid] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [lead, setLead] = useState({ name: "", href: "" });

  const ids = (field: Field) => ({ input: `${id}-${field}`, error: `${id}-${field}-error` });

  function check(field: Field, v: Values) {
    const message = validate(field, v);
    setErrors((prev) => ({ ...prev, [field]: message }));
    setValid((prev) => ({ ...prev, [field]: !message }));
  }

  // Validación en línea: al salir del campo (si tiene algo) y mientras se corrige.
  function update<K extends keyof Values>(field: K, value: Values[K]) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (errors[field] || valid[field] || field === "consent" || field === "insurance") check(field, next);
  }
  const onBlur = (field: Field) => () => {
    if (field === "consent" || values[field]) check(field, values);
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = Object.fromEntries(fields.map((f) => [f, validate(f, values)]));
    setErrors(nextErrors);
    setValid(Object.fromEntries(fields.map((f) => [f, !nextErrors[f]])));
    const firstInvalid = fields.find((f) => nextErrors[f]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    // El formulario lleva a WhatsApp con los datos en el mensaje. Se abre aquí,
    // dentro del mismo clic, para que el navegador no lo bloquee.
    const name = values.name.trim();
    const href = getWhatsAppLink(
      `Hola Margarita, soy ${name}. Quiero cotizar: ${values.insurance}. Mi WhatsApp: +57 ${values.phone}.`,
    );
    window.open(href, "_blank", "noopener,noreferrer");
    setLead({ name, href });
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 700);
  }

  function reset() {
    setValues(emptyValues);
    setErrors({});
    setValid({});
    setStatus("idle");
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col items-center py-6 text-center">
        {/* Acento: check de enviado en menta */}
        <span className="sent-pop flex size-16 items-center justify-center rounded-full bg-mint/25">
          <CheckCircleIcon aria-hidden="true" className="size-9 text-mint-deep" strokeWidth={1.5} />
        </span>
        <p className="mt-5 font-heading text-h3 font-extrabold text-primary-dark">
          ¡Listo, {lead.name.split(" ")[0]}!
        </p>
        <p className="mt-2 max-w-prose text-ink-muted">
          Abrí WhatsApp con tu mensaje listo para enviar. Si no se abrió, usa este botón.
        </p>
        <Button href={lead.href} variant="secondary" size="md" icon={ChatBubbleOvalLeftIcon} className="mt-6">
          Abrir WhatsApp
        </Button>
        <Button variant="ghost" size="md" onClick={reset} className="mt-2">
          Enviar otra solicitud
        </Button>
      </div>
    );
  }

  const aria = (field: Field) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? ids(field).error : undefined,
  });

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit}>
      <RevealGroup className="grid gap-4 sm:grid-cols-2">
        <RevealItem>
          <FloatingField
            id={ids("name").input}
            errorId={ids("name").error}
            label="Nombre"
            filled={!!values.name}
            valid={!!valid.name}
            error={errors.name}
          >
            <input
              id={ids("name").input}
              name="name"
              type="text"
              autoComplete="name"
              required
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              onBlur={onBlur("name")}
              className={`${controlClass} px-4 pr-11`}
              {...aria("name")}
            />
          </FloatingField>
        </RevealItem>

        <RevealItem>
          <FloatingField
            id={ids("phone").input}
            errorId={ids("phone").error}
            label="WhatsApp"
            prefix="+57"
            filled={!!values.phone}
            valid={!!valid.phone}
            error={errors.phone}
          >
            <input
              id={ids("phone").input}
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              required
              value={values.phone}
              onChange={(e) => update("phone", formatPhone(e.target.value))}
              onBlur={onBlur("phone")}
              className={`${controlClass} pr-11 pl-[4.25rem]`}
              {...aria("phone")}
            />
          </FloatingField>
        </RevealItem>

        <RevealItem className="sm:col-span-2">
          <FloatingField
            id={ids("insurance").input}
            errorId={ids("insurance").error}
            label="Tipo de seguro"
            filled={!!values.insurance}
            valid={!!valid.insurance}
            error={errors.insurance}
            trailing={
              <ChevronDownIcon
                aria-hidden="true"
                strokeWidth={1.5}
                className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-ink-muted transition-transform duration-200 ease-brand group-focus-within/field:rotate-180 group-focus-within/field:text-primary motion-reduce:transition-none"
              />
            }
          >
            <select
              id={ids("insurance").input}
              name="insurance"
              required
              value={values.insurance}
              onChange={(e) => update("insurance", e.target.value)}
              onBlur={onBlur("insurance")}
              className={`${controlClass} cursor-pointer px-4 pr-20`}
              {...aria("insurance")}
            >
              <option value="" disabled hidden />
              {site.insuranceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </FloatingField>
        </RevealItem>

        {/* Política de datos: checkbox propio de 20px que se rellena en violeta con check animado */}
        <RevealItem className="sm:col-span-2">
          <label htmlFor={ids("consent").input} className="flex min-h-11 cursor-pointer items-start gap-3">
            <span className="relative mt-0.5 flex size-5 shrink-0">
              <input
                id={ids("consent").input}
                name="consent"
                type="checkbox"
                required
                checked={values.consent}
                onChange={(e) => update("consent", e.target.checked)}
                className="peer size-5 cursor-pointer appearance-none rounded-[6px] border-[1.5px] border-line-strong bg-white transition-colors duration-150 ease-brand checked:border-primary checked:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-[invalid=true]:border-danger"
                {...aria("consent")}
              />
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="pointer-events-none absolute inset-0 m-auto size-3.5 text-white"
              >
                <path
                  className="check-draw"
                  d="M3.5 8.5l3 3 6-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-sm leading-snug text-ink-muted">
              Acepto la{" "}
              <a
                href={site.privacyPolicyUrl}
                className="text-primary underline decoration-1 underline-offset-2 hover:text-primary-dark"
              >
                política de tratamiento de datos personales
              </a>
            </span>
          </label>
          {errors.consent && (
            <p id={ids("consent").error} className="field-msg mt-2 flex items-start gap-2 text-danger">
              <ExclamationCircleIcon aria-hidden="true" className="mt-0.5 size-5 shrink-0" strokeWidth={1.5} />
              {errors.consent}
            </p>
          )}
        </RevealItem>

        <RevealItem className="mt-4 sm:col-span-2">
          {status === "sending" ? (
            <Button type="submit" size="lg" disabled aria-busy icon={ArrowPathIcon} plain className="w-full [&_svg]:animate-spin">
              Abriendo WhatsApp…
            </Button>
          ) : (
            <Button type="submit" size="lg" icon={ChatBubbleOvalLeftIcon} className="w-full">
              Quiero mi cotización
            </Button>
          )}
          <p className="mt-3 text-center text-sm text-ink-muted">Te respondo hoy mismo. Sin compromiso.</p>
        </RevealItem>
      </RevealGroup>
    </form>
  );
}
