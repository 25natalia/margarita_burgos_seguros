# Margarita Burgos · Landing de seguros

Wireframe de alta fidelidad de una landing page de una sola página para Margarita Burgos, asesora de seguros en Colombia.

## Contexto

La gente no compra "un seguro", compra confianza en la persona. La página debe responder rápido:

1. ¿Quién es ella?
2. ¿Puedo confiar?
3. ¿Cómo la contacto?

Todo está orientado a que el visitante escriba por WhatsApp o deje sus datos.

## Stack

- Next.js (App Router) + React + TypeScript + Tailwind CSS v4.
- Código en `src/` (`src/app`, `src/components`, `src/data`, `src/lib`). Alias `@/*` → `src/*`.
- Solo Tailwind, `@heroicons/react` (24/outline, `strokeWidth={1.5}`), `lenis` (scroll suave) y `motion` (Framer Motion, import desde `motion/react`). No agregar otras librerías de UI, animación o íconos. Excepciones: estrellas de testimonios (24/solid) y logos de redes (SVG propio).

## Reglas

- **Wireframe de alta fidelidad**: layout, tipografía, espaciados y estilos reales con Tailwind; textos reales en español (Colombia).
- **Imágenes**: usar `ImagePlaceholder` (bloque gris suave con la proporción correcta, ícono de imagen y etiqueta que dice qué foto va). Debe ser fácil reemplazarlo luego por `next/image` con las mismas dimensiones.
- **Paleta de marca**: violeta primario `#3A22B2` (`primary`, con `primary-dark` y `primary-soft` derivados), neutro `#2C2C2C` (`ink`), complemento `#5E5DF6` (`complement`) y verde menta `#48E596` (`mint`, único acento).
- **Cero fondos grises**: los fondos son blanco (`surface`) o lavanda (`tint` `#F6F4FF`); bordes y separadores en `line` (`#E6E1FF`). El gris (`ink-muted`) solo se usa en texto secundario.
  - Los botones de acción (CTA) usan `accent`, que es el violeta primario con texto blanco. Sobre fondos violeta, el CTA va en blanco con texto violeta.
  - `mint` es solo decorativo o con texto oscuro: con texto blanco no cumple contraste.
- **Tipografía**: títulos (`h1`–`h3`) en Questrial (`font-heading`, next/font), equivalente libre de Champagne & Limousines Bold. Texto en Helvetica Neue Light del sistema (`font-sans`, peso 300), que cae a Arial donde no está instalada.
- Usar siempre los tokens definidos en `src/app/globals.css` (`@theme`); no escribir colores hex sueltos en los componentes.
- **Sistema visual** (tokens en globals.css):
  - Tamaños justificados en `docs/design-tokens.md` (actualizarlo si cambian). Áreas interactivas ≥ 44px; botones 40/48/56px; campos 52px; párrafos ≥ 16px.
  - Tipografía (escala modular): `text-display-xl`, `text-display` (h1), `text-h2`, `text-h3`, `text-lead`; párrafos con `max-w-prose`.
  - Espaciado: secciones con `section-y` (80px móvil / 128px escritorio); escala en múltiplos de 8.
  - Sombras: `shadow-soft`, `shadow-raised`, `shadow-float` (tinte violeta, nunca negras).
  - Radios: `rounded-control` (12px), `rounded-card` (20px) y `rounded-full`.
  - Movimiento: `duration-150/300/600`, `ease-brand` (y `ease-swap` solo para RollingText); en JS, `src/lib/motion.ts` (`duration`, `ease`, `spring.snappy`/`spring.soft`). No usar duraciones ni easings sueltos.
- **Encabezados de sección**: siempre con `SectionHeading` (h2 + subtítulo), sin etiquetas/eyebrows. Títulos h1/h2 sobre fondo claro con `text-gradient` (degradado sutil de marca); sobre violeta, en blanco. Un solo h1 por página.
- **Acento menta**: solo para estados (nodos activos del proceso, check de enviado, checks de coberturas, indicador del seguro activo). Nunca subrayados, botones ni superficies grandes.
- **Degradado de títulos**: un único token (`--gradient-title`) vía `text-gradient` en el bloque del título. Si las palabras se animan por separado (HeroTitle), cada una usa el degradado con el tamaño del título y desplazado a su posición.
- **Aparición**: bloques con `<Reveal>`; grupos con `<RevealGroup>` + `<RevealItem>` (stagger 70 ms). Son componentes de servidor que marcan `data-appear`; un único `RevealObserver` (cliente, en el layout) agrega `data-visible` y CSS anima (fade + 14px + blur 4px). Nunca alrededor de secciones con sticky (Seguros, Proceso).
- **Scroll suave**: `SmoothScroll` (Lenis) en el layout; se desactiva con movimiento reducido. Los enlaces `/#seccion` los intercepta y desplaza con `ANCHOR_OFFSET` (navbar flotante). Para bloquear el scroll usar `setScrollLocked`.
- **Navbar**: pill flotante con vidrio; máximo 5 enlaces de texto (Sobre mí, Seguros ▾, Proceso, Preguntas, Contacto) y un solo botón (Cotiza gratis). El dropdown de Seguros es hermano de la pill (un backdrop-filter anidado no difumina).
- **Header** fijo (`Header.tsx`) con navegación por anclas; `scroll-padding-top` en globals.css evita que tape los títulos.
- **Mobile first**: estilos base para móvil y luego `sm:`, `md:`, `lg:`.
- **CTA repetido** cada 2–3 secciones (WhatsApp o formulario).
- **Accesibilidad**: HTML semántico (`header`, `main`, `section` con encabezado, `footer`), buen contraste (WCAG AA), foco visible en todos los elementos interactivos, `aria-label` en botones solo-ícono.
- **Transiciones rectas**: todas las secciones se separan con bordes horizontales. Nada de diagonales, clip-path ni formas inclinadas.
- **Botones**: siempre `<Button>` (`src/components/Button.tsx`): variantes `primary` (única con sombra), `secondary` (sin borde: fondo `secondary` lavanda, hover `secondary-hover`), `ghost` e `inverse` (sobre violeta); tamaños `sm` 40px (secundario compacto, solo escritorio), `md` 48px (estándar, navbar), `lg` 56px (CTA principal y envío de formulario). Ya incluye el texto 3D. No escribir estilos de botón sueltos.
- **Layout**: ancho máximo de contenido ~1200px (`max-w-content`), espaciado generoso entre secciones.
- **Componentes de servidor por defecto**; `"use client"` solo donde haga falta (acordeón del FAQ, formulario, etc.).
- **Datos editables** (nombre, contacto, redes, textos que la clienta cambiará) en `src/data/site.ts`. No hardcodear números ni correos en los componentes.
- **Formulario de contacto**: al enviar abre WhatsApp (en el mismo clic, para que el navegador no lo bloquee) con nombre, celular y seguro en el mensaje, y luego muestra el estado de enviado. Campos con estilo relleno y label flotante (`FloatingField` en ContactForm.tsx). El sitio no publica teléfono ni correo.
- **Contacto real** en `src/config/contact.ts` (número de WhatsApp, Instagram). Enlaces de WhatsApp siempre con `getWhatsAppLink(mensaje)` de `src/lib/whatsapp.ts` (wa.me con mensaje prellenado según el contexto) y en nueva pestaña.
- **Cards con hover**: utilidad `card-lift` (sube 5px, borde lavanda más intenso, sombra en capas en `::after`). No usar sombras de hover sueltas.
- **No hacer commits ni push**: el usuario maneja las ramas.

## Orden de secciones

1. Hero
2. TrustBar
3. About
4. Services ("Seguros que ofrezco", `#servicios`)
5. HowItWorks
6. Testimonials
7. FAQ
8. ContactCTA
9. Footer

Más `WhatsAppButton` flotante visible en toda la página.

Cada sección vive en `src/components/<Nombre>.tsx` y se compone en `src/app/page.tsx`.

## Páginas de seguros

- Datos en `src/data/seguros.ts` (fuente única para la sección Services y para `/seguros/[slug]`). Pasos del proceso en `src/data/proceso.ts`.
- `/seguros/[slug]` se genera estáticamente (`generateStaticParams`, `dynamicParams = false`); slugs desconocidos van a `src/app/not-found.tsx`.
- No inventar aseguradoras ni cifras de coberturas: dejar placeholders con TODO.
- El contenido después del Hero de cada página lleva `data-fab-trigger` para que aparezca el botón flotante de WhatsApp.

## Animación

- Componentes de animación (cliente) en `src/components/motion/`: `HeroTitle`, `FadeIn`, `CountUp`, `StickyHero`, `Reveal`.
- El botón flotante de WhatsApp se oculta sobre todo lo marcado con `data-fab-hide` (contacto y footer).
- Secciones fijadas por scroll: Seguros (≥1024px, 450vh) y Proceso (≥768px, 300vh). Ningún ancestro puede tener transform, overflow, filter o contain.
- Colores de las píldoras: `colorRamp` en `src/data/seguros.ts` (la píldora i va de colorRamp[i] a colorRamp[i+1]).
- `RollingText`: texto que gira en 3D al hover/foco; solo CSS (`.roll-*` en globals.css). El botón que lo contiene necesita la clase `group`.
- El Hero queda fijo (`StickyHero`) y el resto del contenido va dentro de `#cortina` en page.tsx, que sube por encima. No sacar secciones de la cortina.
- Elementos que entran con animación llevan `data-reveal`: con movimiento reducido, globals.css los fuerza a su estado final. No ramificar el render según `useReducedMotion` (rompe la hidratación).
- Animar solo `transform` y `opacity`. Respetar `prefers-reduced-motion` siempre (`useReducedMotion`, `motion-safe:`/`motion-reduce:`).

## Componentes base

- `src/components/InsurerLogos.tsx`: fila de logos de aseguradoras (placeholders).
- `src/components/SeguroPill.tsx`: píldora con degradado que enlaza a un seguro.
- `src/components/ImagePlaceholder.tsx`: placeholder de imagen con etiqueta y proporción.

## Verificación

Antes de dar un cambio por terminado: `npm run lint` y `npm run build` sin errores.
