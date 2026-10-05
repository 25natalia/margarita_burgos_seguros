"use client";

import { CircleCheck, LoaderCircle } from "lucide-react";
import { useId, useRef, useState, type FormEvent } from "react";
import { site } from "@/data/site";

type Field = "name" | "phone" | "insurance" | "consent";
type Errors = Partial<Record<Field, string>>;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const name = String(data.get("name") ?? "").trim();
  const phone = String(data.get("phone") ?? "").replace(/\D/g, "");

  if (name.length < 2) errors.name = "Escribe tu nombre.";
  if (!(phone.length === 10 || (phone.length === 12 && phone.startsWith("57")))) {
    errors.phone = "Escribe un celular de 10 dígitos, por ejemplo 300 123 4567.";
  }
  if (!data.get("insurance")) errors.insurance = "Elige el tipo de seguro que te interesa.";
  if (!data.get("consent")) {
    errors.consent = "Debes aceptar la política de tratamiento de datos para continuar.";
  }
  return errors;
}

const inputClass =
  "mt-1.5 block w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-ink-muted/70 aria-[invalid=true]:border-danger";

export function ContactForm() {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [firstName, setFirstName] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors = validate(data);
    setErrors(nextErrors);

    const firstInvalid = (Object.keys(nextErrors) as Field[])[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    // Sin backend: se simula el envío.
    setStatus("sending");
    setFirstName(String(data.get("name")).trim().split(" ")[0]);
    setTimeout(() => setStatus("sent"), 800);
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col items-center py-8 text-center">
        <CircleCheck aria-hidden="true" className="size-14 text-primary" strokeWidth={1.5} />
        <p className="mt-4 text-2xl font-extrabold text-primary-dark">
          ¡Gracias, {firstName}!
        </p>
        <p className="mt-2 text-ink-muted">
          Recibí tus datos. Te escribo muy pronto para preparar tu cotización.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-primary underline underline-offset-4"
        >
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  const errorId = (field: Field) => `${id}-${field}-error`;
  const fieldProps = (field: Field) => ({
    id: `${id}-${field}`,
    name: field,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? errorId(field) : undefined,
  });
  const errorText = (field: Field) =>
    errors[field] && (
      <p id={errorId(field)} className="mt-1.5 text-sm font-medium text-danger">
        {errors[field]}
      </p>
    );

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor={`${id}-name`} className="font-semibold text-ink">
          Nombre
        </label>
        <input
          {...fieldProps("name")}
          type="text"
          autoComplete="name"
          required
          placeholder="Tu nombre"
          className={inputClass}
        />
        {errorText("name")}
      </div>

      <div>
        <label htmlFor={`${id}-phone`} className="font-semibold text-ink">
          Celular
        </label>
        <input
          {...fieldProps("phone")}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          placeholder="300 123 4567"
          className={inputClass}
        />
        {errorText("phone")}
      </div>

      <div>
        <label htmlFor={`${id}-insurance`} className="font-semibold text-ink">
          Tipo de seguro
        </label>
        <select {...fieldProps("insurance")} required defaultValue="" className={inputClass}>
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
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            {...fieldProps("consent")}
            type="checkbox"
            required
            className="mt-0.5 size-5 shrink-0 accent-primary"
          />
          <label htmlFor={`${id}-consent`} className="text-sm leading-snug text-ink-muted">
            Acepto la{" "}
            <a
              href={site.privacyPolicyUrl}
              className="font-semibold text-primary underline underline-offset-2"
            >
              política de tratamiento de datos personales
            </a>
          </label>
        </div>
        {errorText("consent")}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-bold text-white shadow-lg shadow-accent/25 transition-colors hover:bg-accent-dark disabled:cursor-wait disabled:opacity-80"
      >
        {status === "sending" && (
          <LoaderCircle aria-hidden="true" className="size-5 animate-spin" />
        )}
        {status === "sending" ? "Enviando…" : "Quiero mi cotización"}
      </button>
    </form>
  );
}
