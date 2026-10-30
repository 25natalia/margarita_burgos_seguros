import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { HeroTitle } from "@/components/motion/HeroTitle";
import { StickyHero } from "@/components/motion/StickyHero";
import { site } from "@/data/site";

const title = "Protege a tu familia y tu patrimonio con un seguro hecho a tu medida";

/**
 * Hero sobre violeta oscuro: texto blanco a la izquierda (contraste 13:1) y
 * la foto de Margarita a la derecha (debajo en móvil). El borde de la foto se
 * funde con el fondo con una máscara, sin velo encima: el texto nunca queda
 * sobre la foto.
 */
export function Hero() {
  return (
    <StickyHero>
      <section
        id="inicio"
        aria-labelledby="hero-titulo"
        className="relative overflow-hidden bg-primary-dark lg:min-h-svh"
      >
        <div className="relative z-10 mx-auto max-w-content px-4 pt-28 pb-8 sm:px-6 sm:pt-32 lg:flex lg:min-h-svh lg:items-center lg:px-8 lg:py-24">
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:max-w-[34rem] lg:text-left">
            <HeroTitle
              id="hero-titulo"
              text={title}
              onDark
              className="text-display font-extrabold text-balance"
            />

            <FadeIn delay={0.7}>
              <p className="mt-6 text-lead text-white/80">
                <span className="font-semibold text-white">{site.name}</span>
                {" · "}+{site.yearsExperience} años asesorando familias y empresas
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Foto: debajo del texto en móvil (acercada, para que ella se vea grande);
            mitad derecha a pantalla completa en escritorio. La máscara va en el
            contenedor para que no se escale con la imagen. */}
        <div className="relative h-[30rem] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%)] sm:h-[34rem] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[58%] lg:[mask-image:linear-gradient(to_right,transparent,black_38%)]">
          <Image
            src={site.heroPhoto}
            alt={`${site.name} recibiendo un reconocimiento de SURA`}
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="origin-[49%_52%] scale-[1.35] object-cover lg:scale-100 lg:object-[45%_35%]"
          />
        </div>
      </section>
    </StickyHero>
  );
}
