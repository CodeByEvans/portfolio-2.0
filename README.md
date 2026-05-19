# CodeByEvans — Portfolio 2.0 ⚡

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com/)

Rediseño completo del portfolio personal de **Evans Lituma** — ingeniero de software full-stack. Una experiencia interactiva tipo escritorio con animaciones fluidas, transiciones tipo IDE y un enfoque narrativo que va más allá del típico layout de tarjetas.

**🌐 [codebyevans.com](https://codebyevans.com)**

---

## 🚀 Stack

| Categoría       | Tecnologías                                                                                                                                                                                                                                                                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | --------------------------------------------------------------------------------- |
| **Frontend**    | ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white) |
| **Animaciones** | ![GSAP](https://img.shields.io/badge/GSAP-88CE02?logo=greensock&logoColor=white)                                                                                                                                                                                                                                                                              | **Lint / Formato** | ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white) |
| **Despliegue**  | ![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)                                                                                                                                                                                                                                                                             |

### Dependencias principales

| Paquete                | Versión | Uso                                                                  |
| ---------------------- | ------- | -------------------------------------------------------------------- |
| `react` / `react-dom`  | ^19.2.5 | UI y renderizado                                                     |
| `gsap`                 | ^3.15.0 | Animaciones de alta performance (intro, transiciones, efectos hover) |
| `react-icons`          | ^5.6.0  | Iconos del stack tecnológico (Si* y Hi*)                             |
| `react-type-animation` | ^3.2.0  | Efecto de typing en terminal                                         |

---

## 📁 Estructura del proyecto

```
portfolio-2.0/
├── public/                         # Assets estáticos
│   ├── Cathub.mp4                  # Demo del proyecto Cathub
│   ├── tualergiahoy.mp4            # Demo de tuAlergiaHoy
│   ├── avatar.jpg                  # Foto de perfil
│   ├── favicon.svg                 # Favicon personalizado
│   ├── icons.svg                   # Sprite de iconos
│   ├── cathub - logo.svg           # Logo proyecto Cathub
│   ├── clover studio - logo.svg    # Logo Clover Studio
│   ├── clover-studio.png           # Captura Clover Studio
│   ├── codebyevans-logo.png        # Logo marca personal
│   └── tualergiahoy.png            # Logo tuAlergiaHoy
│
├── src/
│   ├── main.tsx                    # Entry point
│   ├── App.tsx                     # Router de secciones + pantalla intro
│   ├── index.css                   # Estilos globales (Tailwind v4)
│   ├── components/                 # Componentes reutilizables
│   │   ├── CodeByEvansLogo.tsx     # Logo vectorizado
│   │   ├── Header.tsx              # Nav fija con links sociales
│   │   ├── IntroScreen.tsx         # Animación de entrada (GSAP)
│   │   ├── aboutMe/                # Componentes del escritorio "Sobre mí"
│   │   ├── home/                   # Componentes del home
│   │   ├── projects/               # Simulación de escritorio macOS
│   │   └── stack/                  # IDE interactivo + terminal
│   │
│   ├── pages/                      # Páginas / secciones principales
│   │   ├── HomePage.tsx            # Landing con logo + call to action
│   │   ├── AboutMePage.tsx         # Escritorio con monitor, papel, móvil
│   │   ├── ProjectsPage.tsx        # Simulación de escritorio macOS
│   │   ├── StackPage.tsx           # Mini IDE + terminal + tech grid
│   │   └── ContactPage.tsx         # Formulario de contacto + enlaces
│   │
│   ├── data/                       # Datos estáticos
│   │   ├── projects.ts             # Proyectos del portfolio
│   │   └── stack.ts                # Tecnologías, categorías y lenguajes
│   │
│   └── hooks/                      # Custom hooks
│       └── useExitZoom.ts          # Animación de zoom-out a proyectos
│
├── index.html                      # HTML base
├── vite.config.ts                  # Configuración de Vite
├── tsconfig.json                   # TypeScript config raíz
├── tsconfig.app.json               # Config para la app
├── tsconfig.node.json              # Config para Node/Vite
├── eslint.config.js                # Reglas ESLint
└── package.json                    # Dependencias y scripts
```

---

## 🖥️ Secciones / Páginas

### 1. Intro Screen (`IntroScreen.tsx`)

Animación de entrada con GSAP: el logo `CodeByEvans` aparece con un efecto "back.out", escala y desaparece en zoom. Marca el inicio de la experiencia.

### 2. Inicio (`HomePage.tsx`)

Página principal con:

- Logo grande con efecto de entrada escalonado (línea decorativa → logo → subtítulo → descripción → CTA)
- Puntos flotantes animados con GSAP
- WorkerBadge lateral
- Transición de salida deslizando el contenido hacia la izquierda

### 3. Sobre mí (`AboutMePage.tsx`)

Escritorio interactivo con:

- **Monitor** con luz ambiental — al hacer clic hace zoom y navega a Proyectos
- **Papel manuscrito** con frases sobre el enfoque de trabajo
- **Escritorio físico** con textura de madera y perspectiva
- **Modal de papel** con las secciones expandidas (AI & Full-Stack, Stack, Enfoque)
- Vista adaptada para móvil con teléfono + papel

### 4. Proyectos (`ProjectsPage.tsx`)

Simulación de escritorio macOS:

- **Boot screen** (primera visita) → animación de arranque
- **Fondo de escritorio** con gradientes y luces
- **Iconos de proyecto** → doble clic abre ventanas
- **Ventanas de proyecto** con video/demo, tech stack, enlaces a GitHub
- **WeatherWidget** en la barra superior (clima + reloj)
- **Dock** inferior con acceso rápido
- **Patrones de diseño** como ventana adicional
- **Transición IDE** animada (terminal escribiendo comandos → navega a Stack)
- Vista móvil: lista tipo iPhone

### 5. Stack (`StackPage.tsx`)

Mini-IDE interactivo:

- **Selector de lenguaje** (TypeScript, JavaScript, Python, Java) con efecto de typing
- **Mini IDE** con sintaxis coloreada y nombre de archivo
- **Terminal** que muestra el output real de cada comando
- **Categorías tecnológicas**: Frontend, Backend, Cloud + Tools, Databases
- **Tech Grid** con iconos de cada tecnología
- Botón "Continuar" para ir a Contacto
- Vista móvil con dashboard de tarjetas

### 6. Contacto (`ContactPage.tsx`)

- Card con CTA y dos botones principales (Email, LinkedIn)
- Iconos sociales en el footer
- Animación de entrada secuencial con GSAP

---

## 🛠️ Scripts disponibles

| Script            | Descripción                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Inicia servidor de desarrollo (Vite) |
| `npm run build`   | Compila TypeScript + build de Vite   |
| `npm run preview` | Vista previa del build de producción |
| `npm run lint`    | Ejecuta ESLint sobre el proyecto     |

---

## 🔧 Arquitectura y decisiones técnicas

### Routing

**Sin router externo.** Las secciones se manejan con un estado `activeSection` en `App.tsx` que renderiza condicionalmente cada página. Esto evita dependencias extra y permite transiciones más controladas.

### Animaciones

**GSAP** es el motor de animación principal. Se usa `gsap.context()` para limpiar tweens al desmontar componentes, evitando memory leaks. Cada página tiene su propia timeline de entrada.

### Hook `useExitZoom`

Hook reutilizable que implementa una animación de zoom-out: calcula la posición y escala de un elemento en pantalla, lo centra y escala hasta cubrir la vista, luego navega a otra sección. Usado en AboutMePage → ProjectsPage.

### Responsive

Cada página tiene su propia lógica de detección móvil (`useIsMobile()`) y renderiza componentes específicos:

- Desktop: escritorios, ventanas, docks
- Mobile: tarjetas, listas, navegación táctil

### Almacenamiento local

- `desktop-booted`: evita la pantalla de arranque en visitas repetidas
- `stack-lang`: persiste el lenguaje seleccionado en el Stack

### Tailwind CSS v4

Se usa la sintaxis `@import "tailwindcss"` (sin archivo de configuración). Los estilos se personalizan con clases utilitarias y selectores CSS nativos para animaciones clave.

---

## 🚦 Cómo empezar

```bash
# Clonar
git clone https://github.com/CodeByEvans/portfolio-2.0.git
cd portfolio-2.0

# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build producción
npm run build
npm run preview
```

---

## 📄 Licencia

Este proyecto es personal y de código abierto. Si te sirve de inspiración para tu propio portfolio, adelante — pero por favor, no lo clones tal cual.

---

<p align="center">
  Hecho con ⚡ por <a href="https://github.com/CodeByEvans">CodeByEvans</a>
</p>
