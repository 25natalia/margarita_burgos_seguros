import { ShieldCheck } from "lucide-react";
import { SectionDivider } from "@/components/SectionDivider";
import { site } from "@/data/site";

const stats = [
  { value: site.yearsExperience, label: "años de experiencia" },
  { value: site.clientsAdvised, label: "clientes asesorados" },
  { value: site.activePolicies, label: "pólizas activas" },
];

export function TrustBar() {
  return (
    <>
      <section aria-labelledby="confianza-titulo" className="bg-surface">
        <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <h2 id="confianza-titulo" className="sr-only">
            Experiencia y respaldo
          </h2>

          <dl className="grid grid-cols-3 divide-x divide-line text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse gap-1 px-2 sm:px-6">
                <dt className="text-sm leading-snug text-ink-muted sm:text-base">
                  {stat.label}
                </dt>
                <dd className="text-3xl font-extrabold tracking-tight text-primary sm:text-5xl">
                  +{stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 border-t border-line pt-8">
            <p className="text-center text-sm text-ink-muted">
              Trabajo con las principales aseguradoras del país
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {site.insurers.map((insurer, i) => (
                <li
                  key={insurer}
                  className={`flex h-14 items-center justify-center gap-2 rounded-lg border border-dashed border-line bg-surface-muted px-3 text-xs font-semibold text-ink-muted grayscale ${
                    i === site.insurers.length - 1 ? "col-span-2 sm:col-span-1" : ""
                  }`}
                >
                  <ShieldCheck aria-hidden="true" className="size-5 shrink-0 opacity-60" />
                  <span>
                    Logo aseguradora
                    <span className="sr-only">: {insurer}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <SectionDivider
        fromClassName="text-surface"
        toClassName="bg-surface-muted"
        direction="left"
      />
    </>
  );
}
