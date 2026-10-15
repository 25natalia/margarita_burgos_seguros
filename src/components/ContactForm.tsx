"use client";

import {
  ArrowPathIcon,
  ChatBubbleOvalLeftIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { useId, useRef, useState, type FocusEvent, type FormEvent } from "react";
import { Button } from "@/components/Button";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { site } from "@/data/site";
import { getWhatsAppLink } from "@/lib/whatsapp";

type Field = "name" | "phone" | "insurance" | "consent";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const fields: Field[] = ["name", "phone", "insurance", "consent"];

/** Mensajes en tono amable: dicen qué hacer, no qué salió mal. */
function validateField(field: Field, data: FormData): string | undefined {
  const value = data.get(field);
  switch (field) {
    case "name":
      return String(value ?? "").trim().length < 2 ? "Escribe tu nombre para saber cómo llamarte." : undefined;
    case "phone": {
      const digits = String(value ?? "").replace(/\D/g, "");
      const ok = digits.length === 10 || (digits.length === 12 && digits.startsWith("57"));
      return ok ? undefined : "Revisa tu celular: debe tener 10 dígitos, por ejemplo 300 123 4567.";
    }
    case "insurance":
      return value ? undefined : "Elige el seguro que te interesa.";
    case "consent":
      return value ? undefined : "Para continuar, acepta la política de tratamiento de datos.";
  }
}

/** Sin backend: se simula el envío. Reemplazar por la llamada real. */
function sendLead(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 800));
}

const inputClass =
  "mt-2 block min-h-13 w-full rounded-control border border-line bg-white px-4 py-3 text-base text-ink " +
  "placeholder:text-ink-muted transition-colors duration-150 ease-brand hover:border-primary/40 " +
  "focus:border-primary aria-[invalid=true]:border-danger";

export function ContactForm() {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [lead, setLead] = useState({ name: "", insurance: "" });

  function validateOne(field: Field) {
    if (!formRef.current) return;
    const message = validateField(field, new FormData(formRef.current));
    setErrors((prev) => ({ ...prev, [field]: message }));
  }

  // Validación en línea: al salir del campo, y mientras se corrige un error.
  const liveValidation = (field: Field) => ({
    onBlur: (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (field === "consent" || e.currentTarget.value) validateOne(field);
    },
    onChange: () => {
      if (errors[field]) validateOne(field);
    },
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors: Errors = {};
    for (const field of fields) nextErrors[field] = validateField(field, data);
    setErrors(nextErrors);

    const firstInvalid = fields.find((f) => nextErrors[f]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setLead({ name: String(data.get("name")).trim(), insurance: String(data.get("insurance")) });
    setStatus("sending");
    try {
      await sendLead();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    const firstName = lead.name.split(" ")[0];
    return (
      <div role="status" className="flex flex-col items-center py-6 text-center">
        {/* Acento: check de enviado en menta */}
        <span className="flex size-16 items-center justify-center rounded-full bg-mint/25">
          <CheckCircleIcon aria-hidden="true" className="size-9 text-mint-deep" strokeWidth={1.5} />
        </span>
        <p className="mt-5 font-heading text-h3 font-extrabold text-primary-dark">¡Gracias, {firstName}!</p>
        <p className="mt-2 max-w-prose text-ink-muted">
          Recibí tus datos. Te escribo muy pronto para preparar tu cotización.
        </p>
        <p className="mt-6 text-ink-muted">¿Prefieres adelantar la conversación?</p>
        <Button
          href={getWhatsAppLink(
            `Hola Margarita, soy ${lead.name}. Te dejé mis datos en tu página para cotizar: ${lead.insurance}.`,
          )}
          variant="secondary"
          size="md"
          icon={ChatBubbleOvalLeftIcon}
          className="mt-3"
        >
          Escríbeme por WhatsApp
        </Button>
        <Button variant="ghost" size="md" onClick={() => setStatus("idle")} className="mt-3">
          Enviar otra solicitud
        </Button>
      </div>
    );
  }

  const errorId = (field: Field) => `${id}-${field}-error`;
  const fieldProps = (field: Field) => ({
    id: `${id}-${field}`,
    name: field,
    required: true,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? errorId(field) : undefined,
    ...liveValidation(field),
  });
  const errorText = (field: Field) =>
    errors[field] && (
      <p id={errorId(field)} className="mt-2 flex items-start gap-2 font-medium text-danger">
        <ExclamationCircleIcon aria-hidden="true" className="mt-0.5 size-5 shrink-0" strokeWidth={1.5} />
        {errors[field]}
      </p>
    );

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit}>
      <RevealGroup className="space-y-5">
        <RevealItem as="p" className="text-sm text-ink-muted">Todos los campos son obligatorios.</RevealItem>

        <RevealItem>
          <label htmlFor={`${id}-name`} className="font-semibold text-ink">
            Nombre
          </label>
          <input {...fieldProps("name")} type="text" autoComplete="name" placeholder="Tu nombre" className={inputClass} />
          {errorText("name")}
        </RevealItem>

        <RevealItem>
          <label htmlFor={`${id}-phone`} className="font-semibold text-ink">
            Celular
          </label>
          <input
            {...fieldProps("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="300 123 4567"
            className={inputClass}
          />
          {errorText("phone")}
        </RevealItem>

        <RevealItem>
          <label htmlFor={`${id}-insurance`} className="font-semibold text-ink">
            Tipo de seguro
          </label>
          <select {...fieldProps("insurance")} defaultValue="" className={inputClass}>
            <option value="" disabled>
              Selecciona una opción
            </option>
            {site.insuranceTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errorText("insurance")}
        </RevealItem>

        <RevealItem>
          <div className="flex min-h-11 items-start gap-3">
            <input {...fieldProps("consent")} type="checkbox" className="mt-0.5 size-5 shrink-0 accent-primary" />
            <label htmlFor={`${id}-consent`} className="leading-snug text-ink-muted">
              Acepto la{" "}
              <a
                href={site.privacyPolicyUrl}
                className="font-semibold text-primary underline underline-offset-2 hover:text-primary-dark"
              >
                política de tratamiento de datos personales
              </a>
            </label>
          </div>
          {errorText("consent")}
        </RevealItem>

        {status === "error" && (
          <p role="alert" className="flex items-start gap-2 rounded-control bg-tint p-4 text-ink">
            <ExclamationCircleIcon aria-hidden="true" className="size-5 shrink-0 text-danger" strokeWidth={1.5} />
            No pude recibir tus datos en este momento. Inténtalo de nuevo o escríbeme por WhatsApp.
          </p>
        )}

        <RevealItem>
          {status === "sending" ? (
            <Button type="submit" size="lg" disabled aria-busy icon={ArrowPathIcon} plain className="w-full [&_svg]:animate-spin">
              Enviando…
            </Button>
          ) : (
            <Button type="submit" size="lg" className="w-full">
              Quiero mi cotización
            </Button>
          )}
        </RevealItem>
      </RevealGroup>
    </form>
  );
}
