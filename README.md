# Sintonía — Sprint 1

Frontend responsive en React 19 y Vite para explorar música mediante la API de Sintonía.

## Requisitos

- Node.js 22 o superior
- npm
- Conexión de red para los datos y las fuentes del catálogo

## Ejecución

```bash
npm install
npm run dev
```

La dirección de la API se configura en `.env` con `VITE_API_URL`. Valor predeterminado: `https://yanethm-sintonia-api.fly.dev/api/v1`.

## Verificaciones

```bash
npm test
npm run build
npm run preview
```

Los tests unitarios verifican la construcción de URLs, los parámetros de consulta y el consentimiento de cookies. GitHub Actions ejecuta pruebas y compilación al actualizar `S1-05`, `S1-06` o una rama `fix/`.

## Funciones implementadas

- Inicio público y catálogo musical con diseño responsive.
- Filtro de género en `/catalogo?genero=<id>` y compatibilidad con `/catalogo/<id>`.
- Hooks `useAlbumes`, `useGeneros`, `useTextos`, `useIdiomas` y `useRecurso`.
- Estados de carga y error, con botón para reintentar solicitudes.
- Selector ES/EN y panel de accesibilidad con Floating UI: tamaño del texto, alto contraste, movimiento reducido, enlaces subrayados y espaciado de lectura.
- Banner de cookies que diferencia pendiente, aceptado y rechazado, con opción de revisar la elección desde el pie de página.
- Tokens de diseño en `src/styles/tokens.css`; medidas tipográficas y de espaciado en `rem`.

## Referencias

- [Documentación de la API](https://yanethm-sintonia-api.fly.dev/docs)
- [Contrato](https://yanethm-sintonia-api.fly.dev/docs/contrato)
- [Recursos de diseño](https://yanethm-sintonia-api.fly.dev/docs/diseno/)
- [Figma](https://www.figma.com/design/RIiR1LL7PQZMqjr28qeVTM/Sinton%C3%ADa-%C2%B7-Proyecto-frontend-React---Next--copia-?node-id=673-31942&p=f&m=draw)

Para el alcance, pendientes y límites de validación, consulta `docs/REVISION_S1.md`.


## Panel de accesibilidad — S1-06

En escritorio, el botón de accesibilidad abre un panel anclado justo debajo de él, alineado a la derecha (`bottom-end`) y reposicionado automáticamente si no cabe. En pantallas de hasta 1023px, el panel se muestra encima del menú como una hoja inferior fija, de ancho completo y con fondo atenuado.

El panel permite modificar el tamaño del texto del 80% al 140% en pasos del 10% y activar cuatro ajustes independientes, restablecerlos, cerrarse con Escape o con una pulsación fuera, y acceder a un enlace de declaración de accesibilidad intencionalmente deshabilitado hasta que exista la página. La interfaz está disponible en español e inglés.

Las opciones se reflejan inmediatamente en el documento. Para respetar el consentimiento de cookies del sprint anterior, se guardan en `localStorage` únicamente si se han aceptado las preferencias; en caso contrario funcionan durante la sesión sin persistencia. El ajuste de movimiento reducido también respeta `prefers-reduced-motion` del sistema operativo.

**Limitación del diseño:** el nodo de Figma proporcionado no fue accesible para contrastar medidas de forma visual. Se respetaron las dimensiones del componente preexistente, los tokens del proyecto y las posiciones desktop/móvil especificadas.

Consulta `docs/ACCESIBILIDAD_S1-06.md` para la implementación y pruebas.

### Correcciones de la rama `fix/panel-accesibilidad`

- El control de tamaño de texto muestra el porcentaje formateado por la API, con botones − y + y valor inicial del 100 %.
- El panel consulta `/textos?seccion=accesibilidad&idioma=...` mediante `useTextosAccesibilidad`. Todos los nombres, ayudas, textos del pie y etiquetas accesibles provienen de la respuesta: no se usan cadenas locales alternativas en el panel.
- Las filas de los cuatro interruptores son transparentes, sin iconos; su título y descripción están asociados mediante `aria-labelledby` y `aria-describedby`.
- El enlace de declaración sigue sin ruta activa. Si la API no entrega la sección, no se presenta un panel con textos inventados.
