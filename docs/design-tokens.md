# Tokens de diseño: tamaños y su justificación

Cada valor está definido como token en `src/app/globals.css` (`@theme`) o en el
componente indicado. Si cambias un valor, actualiza esta tabla.

## Áreas táctiles e interactivas

| Elemento | Valor | Guía que lo respalda |
|---|---|---|
| Área mínima de cualquier elemento interactivo | **44 × 44 px** (`min-h-11`, `size-11`) | Apple HIG: 44 × 44 pt mínimo. WCAG 2.2 · 2.5.5 *Target Size (Enhanced)*, AAA: 44 × 44 CSS px. |
| Piso legal | 24 × 24 px con espaciado | WCAG 2.2 · 2.5.8 *Target Size (Minimum)*, AA (2023). Lo superamos siempre con 44px. |
| Referencia Material | 48 × 48 dp | Material Design 3: objetivo táctil de 48 dp. M3 dibuja algunos botones a 40 dp, pero con un área táctil de 48 dp. Aquí el botón visible ya mide 48px. |

## Botones (`src/components/Button.tsx`)

| Tamaño | Alto | Padding horizontal | Uso |
|---|---|---|---|
| `sm` | 40px | 24px | Solo acciones secundarias compactas en escritorio. |
| `md` | **48px** (estándar) | 24px | Navbar y CTAs normales. Coincide con el objetivo de 48 dp de Material. |
| `lg` | 56px | 32px | CTA principal de una sección y envío del formulario. |

- Texto de 16px, peso 600, sin mayúsculas forzadas y con tracking normal.
- Íconos de 20px con 8px de separación.
- Entre botones, 8–12px de separación (`gap-2`/`gap-3`).
- Estados: hover (colores de marca), active (`scale 0.98`), foco con anillo de 2px y 2px de separación, disabled con 50% de opacidad y sin hover.
- Excepción: en móvil, "Cotiza gratis" del navbar oculta su ícono para caber a 375px sin bajar de 48px de alto ni de 24px de padding.

## Texto

| Elemento | Valor | Guía |
|---|---|---|
| Párrafos | 16px en móvil, 16–18px en escritorio (`text-lead`) | Mínimo de 16px recomendado por Apple HIG y Material para lectura en pantalla. |
| Interlineado de párrafos | 1.6 | WCAG 2.2 · 1.4.12 *Text Spacing*: el contenido debe soportar un interlineado de al menos 1.5. |
| Largo de línea | Máximo 65ch (`max-w-prose`) | Rango clásico de 45–75 caracteres (Bringhurst, Baymard Institute). |
| Leyendas (etiquetas de cifras, ciudades, notas, frases de las píldoras) | 14px | Solo texto secundario breve, nunca párrafos. |
| Campos de formulario | 16px | Por debajo de 16px, Safari en iOS hace zoom automático al enfocar el campo. |

### Escala de títulos (modular, fluida con `clamp()` entre 375 y 1440px)

Base de 16px. La razón de la escala es **1.25** (tercera mayor) en móvil y **1.333** (cuarta justa) en escritorio, siguiendo el método de escala modular de Tim Brown. El tamaño se interpola de forma continua entre los dos anchos.

| Token | Paso | Móvil (1.25ⁿ) | Escritorio (1.333ⁿ) | Uso |
|---|---|---|---|---|
| `text-display-xl` | 5 | 49px | 67px | Título de "Seguros pensados para ti" |
| `text-display` | 4 | 39px | 51px | h1 de cada página |
| `text-h2` | 3 | 31px | 38px | Títulos de sección |
| `text-h3` | 1 | 20px | 21px | Títulos de cards, pasos y preguntas |
| `text-lead` | — | 16px | 18px | Párrafos destacados |

Interlineado de títulos: 1.05–1.15 (display y h2) y 1.3 (h3).

## Formularios

| Elemento | Valor | Guía |
|---|---|---|
| Alto de campo | 56px (`h-14`), estilo relleno con label flotante | Rango de 48–56px (Material: campos de 56 dp; Apple: mínimo de 44 pt). |
| Labels | Label real flotante: 16px en reposo dentro del campo, ~13px al enfocar o con contenido. No se usa el atributo placeholder como label. | WCAG 3.3.2 *Labels or Instructions*. |
| Mensajes de error | 16px, con ícono y asociados con `aria-describedby` | WCAG 3.3.1 *Error Identification*. |

## Íconos

| Contexto | Tamaño |
|---|---|
| Junto a texto (botones, enlaces, listas) | 20px (`size-5`) |
| Ícono que es en sí el control (hamburguesa, redes sociales) | 24px (`size-6`) dentro de un área de 44px |
| Decorativos en tarjetas o círculos | 28–40px |

Todos son Heroicons outline con trazo de 1.5.

## Espaciado

- Escala de 8pt (múltiplos de 8px). Se usan medios pasos de 4px solo para ajustes finos dentro de componentes (ej. `gap-1`, `gap-3`, `py-1` en chips).
- Única excepción: 2px (`mt-0.5`) para la alineación óptica de íconos con la primera línea de texto.
- Padding vertical de secciones (`section-y`): 80px en móvil y 128px en escritorio.
