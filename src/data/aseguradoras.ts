// Logos de las aseguradoras (en /public/logos, fondo transparente). InsurerLogos
// los busca por nombre; si un nombre no está aquí, muestra el texto.
// "className" fija la altura de cada logo para igualar su peso visual (cada
// uno tiene proporciones y márgenes distintos).

export const insurerLogos: Record<string, { src: string; width: number; height: number; className: string }> = {
  SURA: { src: "/logos/sura.svg", width: 1000, height: 352, className: "h-9 sm:h-12" },
  Skandia: { src: "/logos/skandia-transparente.png", width: 565, height: 97, className: "h-5 sm:h-7" },
  Dominion: { src: "/logos/dominion_corporativo_rgb_azul.png", width: 1280, height: 705, className: "h-11 sm:h-14" },
};
