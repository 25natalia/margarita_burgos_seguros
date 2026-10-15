import { PhotoIcon } from "@heroicons/react/24/outline";
import { FadeImage } from "@/components/FadeImage";
import { FadeIn } from "@/components/motion/FadeIn";
import { HeroTitle } from "@/components/motion/HeroTitle";
import { StickyHero } from "@/components/motion/StickyHero";
import { site } from "@/data/site";

const title = "Protege a tu familia y tu patrimonio con un seguro hecho a tu medida";

/**
 * Retrato recortado (PNG con fondo transparente) apoyado en el borde inferior
 * del Hero. Tamaño recomendado: 1000×1250 px (4:5), ver site.heroPortrait.
 */
function HeroPortrait() {
  if (site.heroPortrait) {
    return (
      <FadeImage
        src={site.heroPortrait}
        alt={`${site.name}, ${site.role.toLowerCase()}`}
        width={1000}
        height={1250}
        priority
        sizes="(min-width: 1024px) 480px, (min-width: 640px) 384px, 272px"
        className="block h-auto w-full"
      />
    );
  }

  // Placeholder: silueta sobre el fondo del Hero, sin card.
  return (
    <div
      role="img"
      aria-label="Espacio para el retrato recortado de Margarita"
      className="relative aspect-[4/5] w-full"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMax meet"
        className="absolute inset-0 h-full w-full text-primary/15"
      >
        <circle cx="200" cy="175" r="88" fill="currentColor" />
        <path d="M30 500C30 365 105 300 200 300S370 365 370 500Z" fill="currentColor" />
      </svg>
      <div className="absolute inset-x-0 bottom-[18%] flex flex-col items-center gap-1 px-8 text-center text-xs font-medium text-primary-dark/75">
        <PhotoIcon aria-hidden="true" className="size-6" strokeWidth={1.5} />
        Retrato recortado de Margarita (PNG sin fondo)
        <span>1000 × 1250 px</span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <StickyHero>
      <section
        id="inicio"
        aria-labelledby="hero-titulo"
        className="relative overflow-hidden bg-primary-soft"
      >
        <div className="mx-auto grid max-w-content gap-12 px-4 pt-28 sm:px-6 sm:pt-32 lg:min-h-svh lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pt-20">
          <div className="text-center lg:self-center lg:py-24 lg:text-left">
            <HeroTitle
              id="hero-titulo"
              text={title}
              className="text-display font-extrabold text-balance"
            />

            <FadeIn delay={0.7}>
              <p className="mt-6 text-lead text-ink-muted">
                <span className="font-semibold text-primary">{site.name}</span>
                {" · "}+{site.yearsExperience} años asesorando familias y empresas
              </p>
            </FadeIn>

          </div>

          {/* Foto apoyada en el borde inferior: sin padding abajo */}
          <div className="mx-auto w-full max-w-[17rem] self-end sm:max-w-sm lg:mr-0 lg:max-w-[30rem]">
            <HeroPortrait />
          </div>
        </div>
      </section>
    </StickyHero>
  );
}
