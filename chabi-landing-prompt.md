# PROMPT: Sitio Web Completo para Chabi (chabito.dev)

## Contexto del Proyecto

Chabi (chabito.dev) es un software **open source** para crear chatbots inteligentes y agentes de WhatsApp. Permite gestionar múltiples sesiones simultáneas, conectar modelos de IA (OpenAI, Anthropic, Gemini, Groq, xAI, OpenRouter) y crear asistentes personales o grupales directamente en WhatsApp mediante un simple escaneo de código QR. El repositorio es `https://github.com/juriel/chabito2`.

---

## Objetivo

Crear un **sitio web estático multi-página** para Chabi con tres secciones principales:

1. **Landing page informativa** (`index.html`)
2. **Tutorial de instalación** (`install.html`)
3. **Documentación técnica** (`docs.html`)

---

## Referencia Visual de Diseño (IMPORTANTE — Leer antes de implementar)

El sitio debe tener la estética y el nivel de calidad de las **documentaciones de herramientas developer-first** modernas, como Nextra, Docusaurus v3 o la documentación de Vercel/Tailwind. La imagen de referencia adjunta muestra exactamente este estilo. Los principios son:

### Modo Oscuro como Modo Principal (Dark-first)
- El **hero de la landing** y el **header** usan fondo oscuro: `#0F1117` (casi negro, no negro puro)
- El resto del contenido (cards, docs, instalación) usa fondo claro: `#FFFFFF` / `#F8F8FC`
- El sitio debe soportar **toggle dark/light mode** (botón en el header con ícono ☀/🌙)
- En dark mode: `--color-bg-dark: #0F1117`, superficies de cards: `#1A1B2E`, bordes: `rgba(255,255,255,0.08)`

### Layout de Documentación (docs.html) — Split View
Replicar el layout de la imagen de referencia:
```
┌─────────────────────────────────────────────────────┐
│  HEADER (sticky, logo + nav + toggle dark + GitHub) │
├──────────────┬──────────────────────────────────────┤
│   SIDEBAR    │   CONTENT AREA                       │
│  (240px fija)│                                      │
│              │  # Breadcrumb > Sección > Título     │
│  Getting     │                                      │
│  started     │  ## Título de página                 │
│  ● Intro     │                                      │
│    Quick     │  Contenido con prosa + code blocks   │
│  ─────────   │                                      │
│  Core        │  ┌──────────┐  ┌──────────┐          │
│  concepts    │  │  Card    │  │  Card    │          │
│  ...         │  └──────────┘  └──────────┘          │
└──────────────┴──────────────────────────────────────┘
```
- Sidebar con secciones colapsables tipo `Getting started`, `Core concepts`, `Advanced guides`
- El ítem activo tiene indicador izquierdo con `--color-accent` (#81C3D7) y texto en color de acento
- Sidebar sticky, scroll independiente del contenido

### Hero Layout — Split Horizontal
Replicar el layout de la imagen:
```
┌───────────────────────────────────────────────────────┐
│  (fondo oscuro #0F1117)                               │
│                                                       │
│  Headline grande        │  Code editor mockup         │
│  con palabra clave      │  (ventana dark con tabs     │
│  en --color-accent      │  de archivo, números de     │
│                         │  línea y syntax highlight)  │
│  Subtexto muted         │                             │
│                         │  Encima: mockup de la UI    │
│  [CTA primario]         │  del panel admin flotando   │
│  [Ver en GitHub]        │                             │
└───────────────────────────────────────────────────────┘
```
- La **palabra clave** del headline (ej: "inteligente" o "WhatsApp") va en `--color-accent` (#81C3D7)
- El **mockup de código** muestra el `.env` de configuración real del proyecto con syntax coloring
- El mockup de UI muestra el panel de chatbots con un QR code simulado

### Tipografía — Estilo Developer Docs
- **Headlines**: `font-size: clamp(2rem, 5vw, 3.5rem)`, `font-weight: 800`, line-height estrecho (~1.1)
- Las palabras clave del headline cambian de color: `color: var(--color-accent)` (azul claro)
- **Body text en hero**: `color: rgba(255,255,255,0.65)` (muted sobre fondo oscuro)
- **Code blocks**: fondo `#1A1B2E`, borde sutil `rgba(255,255,255,0.08)`, fuente mono, tabs de archivo clickeables
- **Sidebar links**: `font-size: 14px`, `color: rgba(0,0,0,0.55)` en light mode, activo en `--color-accent`

### Botones — Estilo de la Referencia
Dos estilos de botón exactos como en la imagen:
```css
/* Botón primario (CTA principal) */
.btn-primary {
  background: var(--color-accent);    /* #81C3D7 azul claro */
  color: var(--color-primary-dark);   /* #1A005A texto oscuro sobre azul */
  border: none;
  border-radius: 9999px;              /* Pill shape */
  padding: 10px 24px;
  font-weight: 600;
  font-size: 15px;
}

/* Botón secundario (outline) */
.btn-outline {
  background: transparent;
  color: rgba(255,255,255,0.85);      /* En hero oscuro */
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 9999px;
  padding: 10px 24px;
  font-weight: 500;
  font-size: 15px;
}
```

### Code Editor Mockup (componente `chabi-code-mockup.js`)
El elemento visual más importante del hero. Crear un componente LIT que simule un editor de código:
- Barra superior con tres círculos (rojo, amarillo, verde: `#FF5F56`, `#FFBD2E`, `#27C93F`)
- Tabs de archivo: `cache-advance.config.js` | `package.json` (exactamente como la referencia, pero adaptado a `.env` | `package.json` de Chabi)
- Numeración de líneas a la izquierda en color `rgba(255,255,255,0.2)`
- Syntax highlighting: keywords en `--color-accent` (#81C3D7), strings en `#A8FF78`, valores en blanco
- Animación sutil: el cursor parpadea en la última línea

```
┌─────────────────────────────────────────────┐
│ ● ● ●   .env   package.json                 │
│─────────────────────────────────────────────│
│ 01  # Proveedor de IA                       │
│ 02  PI_PROVIDER=openai                      │
│ 03  PI_MODEL=gpt-4o-mini                    │
│ 04  OPENAI_API_KEY=sk-...                   │
│ 05                                          │
│ 06  # Prompt del sistema                    │
│ 07  AGENT_SYSTEM_PROMPT=Eres Chabito...     │
│ 08  █                                       │
└─────────────────────────────────────────────┘
```

### Sección de Documentación — Cards de Acceso Rápido
Como en la imagen de referencia (las cards de "Installation" y "Presets" con ícono grande):
- Grid 2-3 columnas
- Cada card: ícono SVG o emoji grande (32px), título bold, descripción muted
- Borde `1px solid var(--color-border)`, hover eleva con `box-shadow` sutil y borde más oscuro
- Links a secciones específicas de docs

### Componentes adicionales a crear
Añadir a la lista de componentes:
- `chabi-code-mockup.js` — El editor de código del hero con tabs y syntax highlight
- `chabi-theme-toggle.js` — Botón toggle dark/light mode (persistir en localStorage)
- `chabi-sidebar.js` — Sidebar de documentación con navegación anidada y scroll spy
- `chabi-breadcrumb.js` — Breadcrumb de navegación para docs
- `chabi-version-badge.js` — Badge de versión tipo `v2.0` en el header (como en la referencia)

### Header — Exactamente como la Referencia
```
┌─────────────────────────────────────────────────────────────┐
│  ≡  [Logo Chabi]    Inicio  Instalación  Docs   v2.0 ▼  ☀  │ ← GitHub icon
└─────────────────────────────────────────────────────────────┘
```
- Hamburger a la izquierda del logo (para abrir sidebar en mobile)
- Logo con ícono del bubble de chat
- Links de navegación centrados
- Badge de versión clickeable con dropdown (v2.0)
- Toggle dark/light mode
- Ícono de GitHub (enlace al repo)
- Fondo: `rgba(15, 17, 23, 0.85)` con `backdrop-filter: blur(12px)` (efecto glassmorphism sutil)

---

## Stack Tecnológico Obligatorio

- **LIT.dev** (Web Components con JavaScript puro, NO TypeScript para el sitio web)
- **Tailwind CSS v4** (vía CDN: `https://cdn.tailwindcss.com`)
- **Un solo archivo CSS centralizado** (`styles/chabi-theme.css`) con todas las variables de diseño: colores, tipografía, sombras, radios, espaciado
- Componentes reutilizables LIT en `components/`:
  - `chabi-header.js` — Header sticky con logo, nav, versión badge, dark toggle y GitHub icon
  - `chabi-footer.js` — Pie de página con links y créditos
  - `chabi-hero.js` — Sección hero split: headline izquierda + code mockup derecha
  - `chabi-code-block.js` — Bloque de código con tabs de archivo y botón de copiar
  - `chabi-code-mockup.js` — Editor de código estilo IDE para el hero (con cursor parpadeante)
  - `chabi-step-card.js` — Tarjeta de paso de instalación con número grande
  - `chabi-feature-card.js` — Tarjeta de característica/feature con ícono
  - `chabi-theme-toggle.js` — Botón toggle dark/light mode con persistencia en localStorage
  - `chabi-sidebar.js` — Sidebar de docs con navegación anidada, scroll spy y secciones colapsables
  - `chabi-breadcrumb.js` — Breadcrumb de navegación para páginas de docs
  - `chabi-version-badge.js` — Badge de versión con dropdown en el header

---

## Paleta de Colores Corporativos (OBLIGATORIO)

Definir en `styles/chabi-theme.css` como CSS custom properties:

```css
:root {
  /* Colores primarios */
  --color-primary: #270088;        /* Dark Whimberry – morado profundo (color principal del logo) */
  --color-secondary: #3A7CA5;      /* Tableaux – azul medio */
  --color-accent: #81C3D7;         /* Sky Blue Light – azul claro */
  --color-neutral: #D9DCD6;        /* Antique Hay – gris cálido */
  --color-dark: #2D2D2D;           /* Casi negro del botón (paleta) */

  /* Derivados */
  --color-primary-light: #3D00CC;
  --color-primary-dark: #1A005A;
  --color-secondary-light: #5A9EC0;
  --color-white: #FFFFFF;
  --color-bg: #F8F8F6;             /* Fondo general basado en Antique Hay */
  --color-text: #1A1A2E;
  --color-text-muted: #5A5A7A;

  /* Tipografía */
  --font-display: 'Nunito', 'Poppins', sans-serif;   /* Para el logo y títulos (redondeada como el logo) */
  --font-body: 'Inter', 'Roboto', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Radios */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-xl: 40px;
  --radius-bubble: 50% 50% 50% 10%; /* Forma del logo chat bubble */
  --radius-pill: 9999px;             /* Para botones pill como en la referencia */

  /* Sombras */
  --shadow-card: 0 4px 24px rgba(39, 0, 136, 0.10);
  --shadow-btn: 0 2px 12px rgba(39, 0, 136, 0.25);
  --shadow-hero: 0 8px 48px rgba(39, 0, 136, 0.18);
  --shadow-card-hover: 0 8px 32px rgba(39, 0, 136, 0.18);

  /* Gradientes */
  --gradient-hero: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  --gradient-card: linear-gradient(145deg, var(--color-primary-light) 0%, var(--color-secondary) 100%);
  --gradient-subtle: linear-gradient(180deg, var(--color-bg) 0%, #EAF4F8 100%);

  /* ─── DARK MODE (Hero y header) ─── */
  --color-bg-dark: #0F1117;          /* Fondo principal hero/header */
  --color-surface-dark: #1A1B2E;     /* Superficies de cards en dark */
  --color-surface-dark-2: #222340;   /* Cards elevadas en dark */
  --color-border-dark: rgba(255, 255, 255, 0.08);
  --color-border-dark-hover: rgba(255, 255, 255, 0.18);
  --color-text-dark: rgba(255, 255, 255, 0.92);
  --color-text-dark-muted: rgba(255, 255, 255, 0.55);
  --color-text-dark-subtle: rgba(255, 255, 255, 0.30);

  /* ─── CODE EDITOR (Code mockup del hero) ─── */
  --color-code-bg: #1A1B2E;
  --color-code-line-number: rgba(255, 255, 255, 0.20);
  --color-code-keyword: #81C3D7;     /* Igual que --color-accent */
  --color-code-string: #A8FF78;      /* Verde para strings */
  --color-code-comment: rgba(255, 255, 255, 0.35);
  --color-code-value: rgba(255, 255, 255, 0.90);
  --color-code-tab-active: rgba(255, 255, 255, 0.10);

  /* ─── SIDEBAR DOCUMENTACIÓN ─── */
  --sidebar-width: 240px;
  --color-sidebar-link: rgba(0, 0, 0, 0.55);
  --color-sidebar-link-active: var(--color-secondary);   /* #3A7CA5 */
  --color-sidebar-indicator: var(--color-accent);        /* #81C3D7 */
  --color-sidebar-section: rgba(0, 0, 0, 0.85);

  /* ─── VERSIÓN BADGE ─── */
  --color-version-bg: rgba(129, 195, 215, 0.12);     /* accent con opacidad */
  --color-version-text: var(--color-accent);
  --color-version-border: rgba(129, 195, 215, 0.30);
}
```

---

## Estructura de Archivos

```
/
├── index.html              # Landing page
├── install.html            # Tutorial de instalación
├── docs.html               # Documentación técnica
├── styles/
│   └── chabi-theme.css     # ÚNICA fuente de verdad de estilos/variables
├── components/
│   ├── chabi-header.js         # Header sticky con dark mode toggle + versión
│   ├── chabi-footer.js         # Footer con columnas de links
│   ├── chabi-hero.js           # Hero split (headline + code mockup)
│   ├── chabi-code-block.js     # Code block con tabs y copy button
│   ├── chabi-code-mockup.js    # Editor IDE simulado para el hero
│   ├── chabi-step-card.js      # Paso de instalación numerado
│   ├── chabi-feature-card.js   # Card de feature con ícono
│   ├── chabi-theme-toggle.js   # Toggle dark/light con localStorage
│   ├── chabi-sidebar.js        # Sidebar docs con scroll spy
│   ├── chabi-breadcrumb.js     # Breadcrumb de navegación
│   └── chabi-version-badge.js  # Badge versión con dropdown
└── assets/
    └── logo.svg            # Logo Chabi (SVG del bubble de chat morado con texto blanco)
```

---

## Componente: `chabi-header.js`

Web Component LIT con:
- Logo SVG de Chabi a la izquierda (bubble de chat morado `#270088` con texto "Chabi" blanco, fuente redondeada)
- Navegación: `Inicio | Instalación | Documentación | GitHub ↗`
- El link activo se resalta con subrayado en `--color-accent`
- Menú hamburger responsive para mobile
- Fondo blanco con sombra sutil al hacer scroll (`position: sticky; top: 0`)
- Prop `active-page` para marcar la página actual

```js
// Ejemplo de uso en cada HTML:
<chabi-header active-page="home"></chabi-header>
<chabi-header active-page="install"></chabi-header>
<chabi-header active-page="docs"></chabi-header>
```

---

## Componente: `chabi-footer.js`

Web Component LIT con:
- Logo pequeño + tagline: *"Open source. Sin límites. Tu chatbot, tu control."*
- Columnas: Producto | Recursos | Comunidad
- Links: GitHub, Documentación, Instalación, Issues
- Copyright `© 2025 Chabi · MIT License`
- Fondo `--color-primary` (#270088), texto blanco

---

## Componente: `chabi-code-block.js`

- Props: `language`, `code` (string), `filename` (opcional)
- Botón "Copiar" en la esquina superior derecha
- Fondo oscuro `#1A1A2E`, texto monospace, scroll horizontal
- Syntax highlighting básico por colores (strings en verde, keywords en morado claro)
- Al copiar: cambia ícono a checkmark ✓ por 2 segundos

---

## Página 1: `index.html` — Landing Informativa

### Sección Hero
- Fondo con `--gradient-hero` (morado a azul)
- Logo grande de Chabi centrado (SVG animado: sutil efecto de "pulse" en el bubble)
- Headline: **"Tu asistente inteligente en WhatsApp, listo en minutos"**
- Subheadline: *"Chabi es software open source para crear chatbots agénticos con IA. Conecta GPT-4, Claude, Gemini o cualquier LLM a WhatsApp con un simple escaneo de QR."*
- Dos botones CTA:
  - `[Comenzar ahora →]` (fondo blanco, texto `--color-primary`) → enlaza a `install.html`
  - `[Ver en GitHub ↗]` (borde blanco, texto blanco) → enlaza al repo
- Badge: `★ Open Source · MIT License`

### Sección: ¿Qué es Chabi?
- Dos columnas: texto izquierda + mockup/ilustración derecha
- Explicación: Bot WhatsApp multi-sesión con IA, gestión por QR, múltiples cuentas simultáneas
- Destacar: *"Basado en Baileys, Node.js y el framework pi-agent-core"*

### Sección: Características Principales (6 cards con `chabi-feature-card`)
Usar íconos emoji o SVG inline:

| Ícono | Título | Descripción |
|-------|--------|-------------|
| 🤖 | Multi-LLM | Conecta OpenAI, Anthropic Claude, Gemini, Groq, xAI o cualquier endpoint OpenAI-compatible vía OpenRouter |
| 📱 | Multi-sesión | Gestiona múltiples cuentas de WhatsApp simultáneamente desde una sola instancia |
| ⚡ | QR en segundos | Vincula tu WhatsApp escaneando un QR desde la interfaz web. Sin configuraciones complejas |
| 🔒 | Privado y local | Corre en tu servidor. Tus conversaciones nunca salen de tu infraestructura |
| 🧠 | Memoria por conversación | Cada chat tiene su propio historial y agente con contexto persistente en disco |
| 🛠️ | API REST + WebSocket | Integra Chabi en cualquier sistema con endpoints HTTP y WebSocket documentados |

### Sección: Proveedores de IA Soportados
- Logos/badges en fila: OpenAI · Anthropic · Google Gemini · Groq · xAI (Grok) · OpenRouter
- Estilo: pills con fondo `--color-neutral`, borde `--color-secondary`

### Sección: ¿Cómo funciona? (Timeline/pasos visuales)
3 pasos con iconos grandes y línea conectora:
1. **Configura tu LLM** → Elige tu proveedor de IA y agrega tu API Key en `.env`
2. **Escanea el QR** → Abre la interfaz web en `localhost:3000` y vincula tu WhatsApp
3. **¡Listo!** → Tu bot responde automáticamente con IA en cada conversación

### Sección CTA Final
- Fondo `--color-primary`
- Texto blanco: *"Empieza gratis hoy mismo"*
- Botón hacia `install.html`

---

## Página 2: `install.html` — Tutorial de Instalación

### Hero reducido
- Fondo `--gradient-hero`, altura menor
- Título: **"Instala Chabi en minutos"**
- Subtítulo: *"Sigue estos pasos y tendrás tu primer chatbot de WhatsApp con IA funcionando"*

### Requisitos previos (card con lista)
- Node.js 18 o superior (o Bun)
- npm, yarn o bun
- Una cuenta de WhatsApp
- API Key de algún proveedor de IA (OpenAI, Anthropic, Gemini, etc.)

### Pasos de instalación (usar `chabi-step-card` con numeración grande)

**Paso 1: Clonar el repositorio**
```bash
git clone https://github.com/juriel/chabito2.git
cd chabito2
```

**Paso 2: Instalar dependencias**
Mostrar tabs: `npm` / `yarn` / `bun` (interactivo con LIT)
```bash
# Con npm
npm install

# Con yarn
yarn install

# Con bun (recomendado)
bun install
```

**Paso 3: Configurar variables de entorno**
```bash
cp .env.example .env
```
Luego editar `.env`. Mostrar ejemplos para cada proveedor en tabs (OpenAI, Claude, Gemini, Groq, OpenRouter):

```env
# OpenAI
PI_PROVIDER=openai
PI_MODEL=gpt-4o-mini
OPENAI_API_KEY=sk-...

# Anthropic Claude
PI_PROVIDER=anthropic
PI_MODEL=claude-3-5-sonnet-latest
ANTHROPIC_API_KEY=sk-ant-...

# Google Gemini
PI_PROVIDER=gemini
PI_MODEL=gemini-2.5-flash
GEMINI_API_KEY=AIza...
```

Tabla de todas las variables de entorno soportadas.

**Paso 4: Iniciar el servidor**
```bash
# Con npm
npm run start

# Con bun (recomendado)
bun run start:bun
```
Indicar que levanta:
- API HTTP en `http://localhost:3000`
- WebSocket del agente en `ws://localhost:8081`

**Paso 5: Crear tu primer chatbot**
- Abrir `http://localhost:3000`
- Ir a "Administrar Chatbots"
- Ingresar un UUID (ej: `ventas-bot`)
- Clic en "Crear chatbot"
- Escanear el QR desde WhatsApp → "Dispositivos vinculados"

**Paso 6: ¡Funcionando!**
- Card de éxito verde con confetti emoji 🎉
- Nota sobre restauración automática de sesiones

### Sección: Solución de problemas comunes
- Puerto 8081 ocupado → cambiar con variables de entorno
- QR expirado → esperar o reiniciar sesión
- Bot no responde → verificar API Key y logs

---

## Página 3: `docs.html` — Documentación Técnica

### Layout de dos columnas
- Sidebar izquierda fija con índice de navegación (sticky)
- Contenido principal a la derecha
- En mobile: sidebar colapsable como drawer

### Sidebar índice
```
📐 Arquitectura
🗂️ Estructura de archivos
🔌 API REST
   ├── POST /api/sessions/:uuid
   ├── GET /api/sessions
   ├── GET /api/sessions/:uuid/qr/png
   ├── GET /api/sessions/:uuid/status
   └── POST /api/sessions/:uuid/send
🔗 WebSocket
⚙️ Variables de entorno
🧩 Clases principales
   ├── WhatsappSocketEnvelope
   ├── AiAgent / AiAgentBuilder
   ├── AgentsMap
   ├── ConversationStore
   └── ChatbotInitialSetup
💾 Capa de persistencia
🔄 Estados de conexión
```

### Sección: Arquitectura
Diagrama ASCII del flujo (usar `<pre>` estilizado):
```
WhatsApp Mobile → WhatsappSocketEnvelope → AgentWebSocketServer (8081) → AiAgent
                        ↓                                ↓
                 ChatbotInitialSetup           ConversationStore
                   (data/{bot}/)                 (data/{bot}/)
```

### Sección: API REST
Tabla de endpoints + ejemplos con `chabi-code-block`:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/sessions/:uuid` | Crear nueva sesión |
| GET | `/api/sessions` | Listar sesiones activas |
| GET | `/api/sessions/:uuid/qr` | Estado + QR en texto |
| GET | `/api/sessions/:uuid/qr/png` | QR como imagen PNG |
| GET | `/api/sessions/:uuid/status` | Estado de la sesión |
| POST | `/api/sessions/:uuid/send` | Enviar mensaje |

Ejemplo curl para cada endpoint.

### Sección: Variables de entorno (tabla completa)

| Variable | Default | Descripción |
|----------|---------|-------------|
| `PORT` | `3000` | Puerto API HTTP |
| `AGENT_WS_PORT` | `8081` | Puerto WebSocket agente |
| `AGENT_WS_HOST` | `127.0.0.1` | Host WebSocket |
| `PI_PROVIDER` | `openai` | Proveedor IA |
| `PI_MODEL` | `gpt-5-mini` | Modelo IA |
| `AGENT_SYSTEM_PROMPT` | — | Prompt del sistema |

### Sección: Clases principales
Una subsección por clase con descripción, propiedades y métodos clave.

### Sección: Capa de persistencia
Explicar TextStore y JsonStore con ejemplos de código.

### Sección: Estados de conexión
Badge visual para cada estado: `undefined` (gris) · `connecting` (amarillo parpadeante) · `open` (verde) · `close` (rojo)

---

## Reglas de Implementación

### LIT.dev
- Usar `import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js'`
- Cada componente en su propio archivo `.js`
- Estilos del componente en su `static styles = css\`...\`` usando `var(--color-*)` del CSS global
- Usar `adoptedStyleSheets` o `@import` para que los componentes accedan a las CSS vars globales
- Propiedades reactivas con `@property()` decorator

### Tailwind CSS
- Usar clases utilitarias de Tailwind para layout, spacing y responsive
- Para colores corporativos, usar CSS vars directamente: `style="color: var(--color-primary)"`
- Configurar Tailwind CDN con colores custom del tema en `<script>` antes de cargar Tailwind

```html
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          'chabi-primary': '#270088',
          'chabi-secondary': '#3A7CA5',
          'chabi-accent': '#81C3D7',
          'chabi-neutral': '#D9DCD6',
        }
      }
    }
  }
</script>
<script src="https://cdn.tailwindcss.com"></script>
```

### CSS Global (`styles/chabi-theme.css`)
- Contiene TODAS las custom properties (ver paleta arriba)
- Reset básico + tipografía base
- Importar Google Fonts: Nunito (700, 800) + Inter (400, 500, 600) + JetBrains Mono (400)
- Clases de utilidad globales: `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.card`, `.badge`
- Animaciones globales: `@keyframes pulse-bubble` para el logo hero
- Dark mode preparado con `@media (prefers-color-scheme: dark)`

### Logo SVG
Crear `assets/logo.svg` que represente el logo de Chabi: un bubble de chat (forma redondeada con punta inferior izquierda) en color `#270088` (Dark Whimberry) con el texto "Chabi" en blanco, fuente redondeada (Nunito Bold). Asemejarse al logo de referencia donde:
- El bubble es aproximadamente circular con la punta de chat en la parte inferior izquierda
- El texto "Chabi" está centrado en el bubble, en color blanco `#FFFFFF`
- Sin bordes ni sombras en el SVG base

### Responsive Design
- Mobile-first
- Breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`
- Header: hamburger menu en mobile con drawer lateral
- Cards: 1 col mobile / 2 col tablet / 3 col desktop
- Sidebar docs: oculta en mobile, visible en desktop

### Accesibilidad
- `aria-label` en todos los iconos sin texto
- Contraste mínimo AA en todos los textos
- Focus visible con `outline: 2px solid var(--color-accent)`
- `lang="es"` en `<html>`

---

## Contenido en Español
Todo el contenido debe estar en **español** (el proyecto es de habla hispana y latinoamericana).

---

## Entregables esperados

```
index.html
install.html
docs.html
styles/chabi-theme.css
components/chabi-header.js
components/chabi-footer.js
components/chabi-hero.js
components/chabi-code-block.js
components/chabi-code-mockup.js
components/chabi-step-card.js
components/chabi-feature-card.js
components/chabi-theme-toggle.js
components/chabi-sidebar.js
components/chabi-breadcrumb.js
components/chabi-version-badge.js
assets/logo.svg
```

Cada archivo HTML debe ser auto-contenido en cuanto a imports (cargar LIT, Tailwind y componentes propios), pero compartir el mismo `chabi-theme.css` y los mismos componentes LIT.

El resultado final debe verse y sentirse como la documentación oficial de una herramienta developer-first de primer nivel (similar a Nextra, Docusaurus v3 o Vitepress), adaptada con la identidad visual corporativa de Chabi (#270088, #81C3D7).

---

## Referencias
- Repositorio: https://github.com/juriel/chabito2
- Sitio actual: https://chabito.dev
- Paleta: `#270088` (Dark Whimberry), `#3A7CA5` (Tableaux), `#D9DCD6` (Antique Hay), `#81C3D7` (Sky Blue Light), `#2D2D2D` (dark)
- Referencia de diseño visual: Nextra / Docusaurus v3 / Vitepress (hero split oscuro + docs con sidebar)
- LIT docs: https://lit.dev
- Tailwind v4 CDN: https://cdn.tailwindcss.com



##Mandatory

No uses shadow DOM en los elementos LIT. usa siempre estilos globales. 