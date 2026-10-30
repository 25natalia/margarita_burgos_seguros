# Margarita Burgos · Asesora de Seguros

Landing page profesional de **Margarita Burgos**, asesora de seguros. El objetivo del sitio es generar confianza, mostrar su experiencia y convertir visitantes en clientes a través de WhatsApp y un formulario de cotización.

## Características

- Diseño moderno y responsive (móvil, tablet y escritorio)
- Página única con secciones: inicio, confianza, seguros, sobre Margarita, cómo funciona, testimonios, preguntas frecuentes y contacto
- Botón flotante de WhatsApp y botones de cotización con mensaje prellenado
- Formulario corto para solicitar cotización
- Optimizada para SEO y carga rápida

## Tecnologías

- [Next.js](https://nextjs.org/) – framework de React
- [React](https://react.dev/) – librería de interfaces
- [Tailwind CSS](https://tailwindcss.com/) – estilos
- [TypeScript](https://www.typescriptlang.org/) – tipado estático

## Cómo correr el proyecto

### Requisitos

- [Node.js](https://nodejs.org/) (versión LTS)
- npm (incluido con Node.js)

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/margarita-burgos-seguros.git

# 2. Entrar a la carpeta
cd margarita-burgos-seguros

# 3. Instalar dependencias
npm install

# 4. Iniciar el servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

### Scripts disponibles

| Comando         | Descripción                                  |
| --------------- | -------------------------------------------- |
| `npm run dev`   | Inicia el servidor de desarrollo             |
| `npm run build` | Genera la versión optimizada para producción |
| `npm run start` | Corre la versión de producción               |
| `npm run lint`  | Revisa el código con ESLint                  |

## Estructura del proyecto

```
margarita-burgos-seguros/
├── public/                  # Fotos, logo, logos de aseguradoras e íconos
├── src/
│   ├── app/                 # Layout principal, página y estilos globales
│   └── components/
│       ├── Hero.tsx
│       ├── TrustBar.tsx
│       ├── Services.tsx
│       ├── About.tsx
│       ├── HowItWorks.tsx
│       ├── Testimonials.tsx
│       ├── FAQ.tsx
│       ├── ContactCTA.tsx
│       ├── Footer.tsx
│       └── WhatsAppButton.tsx
├── package.json
└── README.md
```

## Secciones de la página

| Orden | Sección              | Propósito                                                                 |
| ----- | -------------------- | ------------------------------------------------------------------------- |
| 1     | Hero                 | Mensaje principal y botón de cotizar por WhatsApp                         |
| 2     | Barra de confianza   | Años de experiencia, pólizas activas, certificaciones y aseguradoras      |
| 3     | Sobre Margarita      | Historia familiar, foto, pilares y certificaciones                        |
| 4     | Reconocimientos      | Fotos de premios y reconocimientos de SURA y Skandia                      |
| 5     | Seguros              | Tipos de seguros ofrecidos, cada uno con su página                        |
| 6     | Cómo funciona        | Proceso en cinco pasos, de la primera charla a la entrega de la póliza    |
| 7     | Testimonios          | Opiniones de clientes                                                     |
| 8     | Preguntas frecuentes | Ahorro, salud, vida y seguros patrimoniales                               |
| 9     | Contacto / CTA       | Llamado final y formulario que abre WhatsApp                              |
| 10    | Footer               | Contacto, redes y enlaces legales                                         |

Páginas legales: `/politica-de-datos`, `/terminos` y `/cookies`.

## Manejo de ramas

El proyecto usa un flujo simple: `main` contiene siempre la versión publicada y cada cambio se trabaja en una rama corta que vuelve a `main` mediante Pull Request.

### Ramas del proyecto

| Rama                         | Para qué sirve                                                                                 |
| ---------------------------- | ---------------------------------------------------------------------------------------------- |
| `main`                       | Versión estable y publicada. No se trabaja directamente sobre ella.                            |
| `chore/setup-inicial`        | Configuración base: colores, fuentes, metadatos SEO y limpieza de la plantilla de Next.js.     |
| `feat/hero`                  | Sección principal con foto, titular, subtítulo y botones de acción.                            |
| `feat/barra-confianza`       | Franja con cifras de experiencia y logos de las aseguradoras.                                  |
| `feat/servicios`             | Tarjetas de los tipos de seguros con botón de cotización por WhatsApp.                         |
| `feat/sobre-margarita`       | Presentación personal, trayectoria, certificaciones y fotografía.                              |
| `feat/como-funciona`         | Explicación del proceso de asesoría en tres pasos.                                             |
| `feat/testimonios`           | Opiniones de clientes con nombre, foto o ciudad.                                               |
| `feat/preguntas-frecuentes`  | Sección de preguntas y respuestas (acordeón).                                                  |
| `feat/contacto-cta`          | Llamado a la acción final, formulario de cotización y datos de contacto.                       |
| `feat/footer`                | Pie de página con contacto, redes y aviso de tratamiento de datos personales.                  |
| `feat/boton-whatsapp`        | Botón flotante de WhatsApp visible en toda la página.                                          |

### Convención de nombres

- `feat/` – nueva funcionalidad o sección
- `fix/` – corrección de errores
- `style/` – cambios visuales o de textos
- `chore/` – mantenimiento, configuración o dependencias

### Flujo de trabajo

```bash
# 1. Cambiar a la rama de la sección
git checkout feat/hero

# 2. Traer los últimos cambios de main
git pull origin main

# 3. Trabajar y guardar cambios
git add .
git commit -m "Agrega sección Hero con foto y botón de WhatsApp"

# 4. Subir la rama
git push
```

Después se abre un Pull Request hacia `main` en GitHub, se revisa y se hace merge. Cada rama tiene su propio enlace de vista previa en Vercel, útil para que la clienta apruebe cambios antes de publicarlos.

### Orden sugerido

1. `chore/setup-inicial`
2. `feat/hero`
3. `feat/boton-whatsapp`
4. `feat/servicios`
5. `feat/sobre-margarita`
6. `feat/barra-confianza`
7. `feat/como-funciona`
8. `feat/testimonios`
9. `feat/preguntas-frecuentes`
10. `feat/contacto-cta`
11. `feat/footer`

### Buenas prácticas

- Una rama por sección o cambio.
- Ramas de corta duración: horas o pocos días.
- Antes de empezar en una rama, actualizarla con `git pull origin main`.
- Mensajes de commit claros y en presente: "Agrega…", "Corrige…", "Actualiza…".
- No subir cambios directamente a `main`.

## Despliegue

El sitio se despliega en [Vercel](https://vercel.com/). Al conectar el repositorio, cada merge a `main` se publica automáticamente y cada rama genera una vista previa.

## Contacto

**Margarita Burgos** – Asesora de Seguros

- WhatsApp y teléfono: 317 675 1328
- Correo: mbseguros.gerencia@gmail.com
- Instagram: [@margarita_burgos_seguros](https://www.instagram.com/margarita_burgos_seguros/)

Los datos de contacto se editan en `src/config/contact.ts`.

---

Desarrollado por [Tu Nombre](https://github.com/TU_USUARIO)
