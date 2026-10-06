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
- Solo Tailwind y `lucide-react`. No agregar otras librerías de UI, animación o íconos.

## Reglas

- **Wireframe de alta fidelidad**: layout, tipografía, espaciados y estilos reales con Tailwind; textos reales en español (Colombia).
- **Imágenes**: usar `ImagePlaceholder` (bloque gris suave con la proporción correcta, ícono de imagen y etiqueta que dice qué foto va). Debe ser fácil reemplazarlo luego por `next/image` con las mismas dimensiones.
- **Paleta de marca**: violeta primario `#3A22B2` (`primary`, con `primary-dark` y `primary-soft` derivados), secundario `#E7ECF2` (`surface-muted`), neutro `#2C2C2C` (`ink`) y complementos `#5E5DF6` (`complement`) y verde menta `#48E596` (`mint`).
  - Los botones de acción (CTA) usan `accent`, que es el violeta primario con texto blanco. Sobre fondos violeta, el CTA va en blanco con texto violeta.
  - `mint` es solo decorativo o con texto oscuro: con texto blanco no cumple contraste.
- **Tipografía**: títulos (`h1`–`h3`) en Questrial (`font-heading`, next/font), equivalente libre de Champagne & Limousines Bold. Texto en Helvetica Neue Light del sistema (`font-sans`, peso 300), que cae a Arial donde no está instalada.
- Usar siempre los tokens definidos en `src/app/globals.css` (`@theme`); no escribir colores hex sueltos en los componentes.
- **Mobile first**: estilos base para móvil y luego `sm:`, `md:`, `lg:`.
- **CTA repetido** cada 2–3 secciones (WhatsApp o formulario).
- **Accesibilidad**: HTML semántico (`header`, `main`, `section` con encabezado, `footer`), buen contraste (WCAG AA), foco visible en todos los elementos interactivos, `aria-label` en botones solo-ícono.
- **Bordes diagonales**: varias secciones se separan con `SectionDivider`.
- **Layout**: ancho máximo de contenido ~1200px (`max-w-content`), espaciado generoso entre secciones.
- **Componentes de servidor por defecto**; `"use client"` solo donde haga falta (acordeón del FAQ, formulario, etc.).
- **Datos editables** (nombre, contacto, redes, textos que la clienta cambiará) en `src/data/site.ts`. No hardcodear números ni correos en los componentes.
- Enlaces de WhatsApp siempre con `whatsappLink()` de `src/lib/whatsapp.ts`.
- **No hacer commits ni push**: el usuario maneja las ramas.

## Orden de secciones

1. Hero
2. TrustBar
3. Services
4. About
5. HowItWorks
6. Testimonials
7. FAQ
8. ContactCTA
9. Footer

Más `WhatsAppButton` flotante visible en toda la página.

Cada sección vive en `src/components/<Nombre>.tsx` y se compone en `src/app/page.tsx`.

## Componentes base

- `src/components/SectionDivider.tsx`: borde diagonal entre secciones.
- `src/components/ImagePlaceholder.tsx`: placeholder de imagen con etiqueta y proporción.

## Verificación

Antes de dar un cambio por terminado: `npm run lint` y `npm run build` sin errores.
