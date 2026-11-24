# Sintonía

**Sintonía** es un frontend de catálogo musical desarrollado con **React 19 y Vite**. La versión actual de la rama `main` ofrece vistas públicas para descubrir contenido musical, navegación adaptable a dispositivos móviles, textos en español e inglés, gestión del consentimiento de cookies y un panel de accesibilidad.

> **Estado del proyecto:** implementación del Sprint 1. Las vistas de autenticación y algunas páginas informativas todavía no tienen funcionalidad propia.

## Tecnologías

| Tecnología | Uso |
| --- | --- |
| React 19 | Componentes, estado e interfaz |
| Vite 8 | Servidor de desarrollo y compilación |
| React Router 7 | Navegación y rutas |
| Floating UI | Posicionamiento del panel de accesibilidad |
| CSS | Estilos por componente y tokens de diseño |
| SVG / SVGR | Iconos y logotipo como componentes React |
| Node.js Test Runner | Pruebas automatizadas |
| GitHub Actions | Validación de pruebas y compilación |

## Requisitos

- Node.js **22 o superior**.
- npm.
- Conexión a internet para consultar la API.

## Instalación y ejecución

```bash
git clone https://github.com/gitstabares/Sintonia.git
cd Sintonia
git checkout main
npm install
npm run dev
```

Abre la dirección local indicada por Vite en la terminal.

### Configuración de la API

La aplicación utiliza la variable de entorno `VITE_API_URL`. Puedes crear o ajustar tu archivo `.env` con:

```dotenv
VITE_API_URL=https://yanethm-sintonia-api.fly.dev/api/v1
```

No incluyas credenciales ni secretos en variables con el prefijo `VITE_`, ya que se incorporan al código del navegador.

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la compilación de producción |
| `npm run preview` | Previsualiza la compilación |
| `npm test` | Ejecuta las pruebas con `node --test` |

## Funcionalidades implementadas

### Inicio y catálogo público

- Página de inicio con secciones de descubrimiento musical.
- Catálogo con secciones de géneros, artistas, álbumes y canciones.
- Filtrado por género mediante `/catalogo?genero=<id>`, con compatibilidad para `/catalogo/<id>`.
- Estados de carga, error, reintento y ausencia de resultados.
- Diseño adaptable a escritorio y móvil.

### Internacionalización

- Selector de idioma **español / inglés**.
- Textos obtenidos de la API mediante `useTextos` y `useIdiomas`.
- Actualización del atributo `lang` del documento.
- Persistencia del idioma condicionada al consentimiento.

### Accesibilidad

El panel de accesibilidad se abre desde la barra de navegación. En escritorio aparece como una ventana flotante bajo su botón; en móvil ocupa el ancho de la pantalla y se ancla a la parte inferior.

Incluye las siguientes preferencias:

- **Tamaño de texto:** valor inicial del 100 %, ajustable del 80 % al 140 % en incrementos del 10 %.
- **Alto contraste.**
- **Reducción de movimiento.**
- **Subrayado de enlaces.**
- **Espaciado de lectura.**

Las opciones pueden restablecerse. Los textos del panel se consultan mediante `useTextosAccesibilidad`, que solicita la sección `accesibilidad` de la API. El enlace a la declaración de accesibilidad está presente, pero todavía no dispone de una página de destino funcional.

### Cookies y preferencias

- Consentimiento con estados pendiente, aceptado y rechazado.
- Posibilidad de revisar la elección desde el pie de página.
- Persistencia del idioma y de las opciones de accesibilidad únicamente cuando se acepta el almacenamiento de preferencias.
- Tratamiento de errores cuando `localStorage` no está disponible.

## Rutas

| Ruta | Estado |
| --- | --- |
| `/` | Página de inicio |
| `/catalogo` | Catálogo musical |
| `/catalogo/:gen_id` | Catálogo filtrado por género |
| Otras rutas | Vista informativa de página no encontrada |

**Nota:** el código define enlaces hacia `/iniciarSesion`, `/crearCuenta`, `/terminos` y `/accesibilidad`, pero la rama `main` no implementa esas páginas como rutas funcionales independientes.

## Organización del código

```text
.
├── .github/workflows/       # Validación automática
├── docs/                    # Informes técnicos
├── public/                  # Recursos públicos
├── src/
│   ├── assets/              # Iconos, logotipos y portadas SVG
│   ├── components/          # Componentes reutilizables y sus CSS
│   ├── hooks/               # Consultas y lógica compartida
│   ├── layouts/             # Estructura de las vistas públicas
│   ├── pages/               # Home, Catalogo y NoEncontrada
│   ├── styles/              # Tokens, estilos globales y accesibilidad
│   ├── utils/               # API, consentimiento y preferencias
│   ├── App.jsx              # Estado global y definición de rutas
│   └── main.jsx             # Punto de entrada
├── tests/                   # Pruebas automatizadas
├── index.html
├── package.json
└── vite.config.js
```

### Hooks principales

| Hook | Responsabilidad |
| --- | --- |
| `useRecurso` | Peticiones HTTP, carga, error, cancelación y reintento |
| `useAlbumes` | Consulta de álbumes |
| `useGeneros` | Consulta de géneros |
| `useTextos` | Textos generales por idioma |
| `useTextosAccesibilidad` | Textos de la sección de accesibilidad |
| `useIdiomas` | Consulta de idiomas |
| `useMediaQuery` | Adaptación a consultas de medios CSS |

## API

**Base de referencia:** `https://yanethm-sintonia-api.fly.dev/api/v1`

El frontend consume recursos del backend, entre ellos textos, idiomas, géneros y álbumes. La construcción de las URLs de consulta se centraliza en `src/utils/api.js`.

Documentación y recursos:

- [Documentación de la API](https://yanethm-sintonia-api.fly.dev/docs)
- [Contrato de la API](https://yanethm-sintonia-api.fly.dev/docs/contrato)
- [Recursos de diseño](https://yanethm-sintonia-api.fly.dev/docs/diseno/)
- [Diseño en Figma](https://www.figma.com/design/RIiR1LL7PQZMqjr28qeVTM/Sinton%C3%ADa-%C2%B7-Proyecto-frontend-React---Next--copia-?node-id=673-31942)

## Pruebas y validación

```bash
npm test
npm run build
```

Las pruebas del repositorio se encuentran en:

- `tests/api.test.js`
- `tests/preferencias.test.js`
- `tests/accesibilidad.test.js`
- `tests/estructura.test.js`

El flujo `.github/workflows/s1-validation.yml` ejecuta las pruebas y la compilación al publicar cambios en las ramas configuradas.

## Alcance y pendientes

La rama `main` contiene una base pública funcional, pero **no constituye todavía una aplicación musical completa**. Entre los límites identificados en el repositorio se encuentran:

- Autenticación y registro aún sin páginas funcionales.
- Páginas legales y declaración de accesibilidad pendientes.
- Necesidad de validar visualmente la fidelidad al diseño de Figma en distintos dispositivos.
- Necesidad de comprobar en un entorno real todos los casos de integración con la API.

Consulta los documentos `docs/REVISION_S1.md` y `docs/ACCESIBILIDAD_S1-06.md` para conocer el alcance y las limitaciones registradas.

## Repositorio

[gitstabares/Sintonia — rama main](https://github.com/gitstabares/Sintonia/tree/main)

---

*Este README se elaboró a partir de los archivos presentes en la rama `main` del repositorio, consultados el 11 de noviembre de 2026. No implica que se hayan ejecutado las pruebas localmente ni que se haya auditado visualmente Figma.*


## Sprint 2 — S2-03 Inicio de sesión

La rama `S2-03` añade la ruta /iniciarSesion` (React + Vite + React Router)
con la vista 4 web/móvil de Figma. El formulario solicita correo y contraseña,
valida y enfoca el primer campo con error, anuncia la visibilidad de la contraseña,
y envía `POST /sesion` mediante `useMutacion`.

Solo al obtener una respuesta exitosa de la API se actualiza la identidad visible
en la navegación y se regresa al inicio. Los enlaces a /crearCuenta` y
/recuperarContrasena` están presentes, pero esas páginas aún no se desarrollan.

**Contrato por validar:** el cuerpo actual del POST es `{correo, clave}`.
La API no estuvo accesible para verificar el nombre real del campo de contraseña
ni el mecanismo de sesión del backend. El cliente conserva solo nombre y correo,
no contraseñas ni tokens. El almacenamiento por sí solo no autentica al usuario
ante la API. Revisar el PR antes de integrar en producción.

Validación: `npm test` y `npm run build`.


### Actualización del refactor de textos y API

En `refactor/textos-unificados-S2-03`, los componentes utilizan solo textos procedentes
de `GET /textos` cuando este responde correctamente. Las cadenas locales de respaldo se
agrupan en `textosRespaldo()` y únicamente se usan cuando el hook `useTextos`
reporta un error HTTP o una respuesta global inválida. Una sección parcial en una respuesta
global válida no activa respaldo.

`GET /albumes` se consume sin parámetros `orden` ni `limite` (no admitidos
por el endpoint, según la restricción indicada para el proyecto); el recorte de resultados
se realiza en la página. `GET /generos` y `GET /generos/:id` se invocan sin
filtros inventados.

**Verificación pendiente:** la documentación web [Contrato completo](https://yanethm-sintonia-api.fly.dev/docs/contrato)
enlaza a un Markdown que no pudo recuperarse desde el entorno de consulta; se requiere
validar contra ese contrato las estructuras JSON de sesión y mensajes HTTP.


### Contrato comprobado en Postman (24 de noviembre de 2026)

La colección [Sintonía API](https://go.postman.co/collection/58842877-a5dad643-4a2e-43d9-ba42-b73b66dae76b)
documenta que **GET /albumes** sí admite `?orden=populares&limite=6` y
que **GET /textos** permite `?idioma=es|en&seccion=...`. Esta fuente
corrige la nota anterior sobre la ausencia de parámetros en `/albumes`.
El proyecto conserva los textos existentes si la API responde con una sección
parcial válida; el respaldo local solo se activa ante error de solicitud o JSON inválido.

Los JSON almacenados en `tests/fixtures/postman-textos-*.json` son
**ejemplos guardados en la colección**, no respuestas nuevas de una ejecución live.
