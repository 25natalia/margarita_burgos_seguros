// Fotos de reconocimientos (sección Reconocimientos de la home). Archivos en
// /public/imagenes. Los textos salen de lo que se ve en cada foto.
// TODO (Margarita): confirmar títulos y años.

export type Reconocimiento = {
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  detail: string;
  /** Encuadre de la foto dentro de la tarjeta (object-position). */
  position: string;
  /** feature: 2×2; wide: 2 columnas; normal: 1 celda. */
  size: "feature" | "wide" | "normal";
};

export const reconocimientos: Reconocimiento[] = [
  {
    src: "/imagenes/margarita-premio-sura.jpeg",
    width: 1280,
    height: 960,
    alt: "Margarita Burgos recibiendo un premio en un evento de SURA",
    title: "Premio SURA",
    detail: "Reconocimiento a su gestión como asesora",
    position: "object-[50%_40%]",
    size: "feature",
  },
  {
    src: "/imagenes/ranking-skandia-2024.jpeg",
    width: 960,
    height: 1280,
    alt: "Reconocimiento Ranking Skandia 2024 a nombre de Margarita Rosa Burgos, puesto 3",
    title: "Ranking Skandia 2024",
    detail: "Tercer puesto",
    position: "object-[50%_25%]",
    size: "normal",
  },
  {
    src: "/imagenes/sura-reto-curazao-2024.jpeg",
    width: 720,
    height: 1280,
    alt: "Pantalla del plan de reconocimiento SURA 2024 con el nombre de Margarita Rosa Burgos Nañez, Reto Curazao",
    title: "SURA · Reto Curazao",
    detail: "Plan de reconocimiento 2024",
    position: "object-[50%_42%]",
    size: "normal",
  },
  {
    src: "/imagenes/top-10-asesores-2020.jpeg",
    width: 1280,
    height: 960,
    alt: "Tarjeta Top 10 asesores 2020 a nombre de Margarita Burgos, junto a un obsequio de Skandia",
    title: "Top 10 asesores 2020",
    detail: "Equipo Pronoia · Skandia",
    position: "object-[50%_40%]",
    size: "wide",
  },
  {
    src: "/imagenes/reconocimiento-sura-2024.jpeg",
    width: 960,
    height: 1280,
    alt: "Margarita Burgos sosteniendo un diploma de reconocimiento de SURA",
    title: "Reconocimiento SURA 2024",
    detail: "Por su contribución y desempeño",
    position: "object-[50%_50%]",
    size: "normal",
  },
  {
    src: "/imagenes/convencion-sura-estambul.jpeg",
    width: 960,
    height: 1280,
    alt: "Margarita Burgos con dos colegas sosteniendo cajas de la Convención SURA Estambul",
    title: "Convención SURA Estambul",
    detail: "80 años de SURA",
    position: "object-[50%_62%]",
    size: "normal",
  },
  {
    src: "/imagenes/evento-sura-equipo.jpeg",
    width: 960,
    height: 1280,
    alt: "Margarita Burgos con el gerente de la regional Occidente de SURA y otros asesores en un evento",
    title: "Con el gerente de SURA",
    detail: "Regional Occidente",
    position: "object-[50%_55%]",
    size: "normal",
  },
  {
    src: "/imagenes/gorra-suramericana.jpeg",
    width: 960,
    height: 1280,
    alt: "Gorra antigua bordada con el logo de Suramericana",
    title: "El legado de Suramericana",
    detail: "Donde empezó la historia de mi familia",
    position: "object-[50%_45%]",
    size: "normal",
  },
];
