import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <>
      <main id="contenido" className="flex flex-1 items-center bg-primary-soft">
        <div className="mx-auto max-w-narrow px-4 pt-32 pb-24 text-center sm:px-6">
          <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-white shadow-raised">
            <MagnifyingGlassIcon aria-hidden="true" className="size-9 text-primary" strokeWidth={1.5} />
          </span>
          <h1 className="text-gradient mt-8 text-h2 font-extrabold">
            No encontré esta página
          </h1>
          <p className="mx-auto mt-4 max-w-prose text-lead text-ink-muted">
            Puede que el enlace haya cambiado. No te preocupes: desde aquí te llevo a lo que buscas.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/#servicios" size="lg">
              Ver los seguros
            </Button>
            <Button href="/" variant="secondary" size="lg">
              Volver al inicio
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
