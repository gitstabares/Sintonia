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

Los tests unitarios verifican la construcción de URLs, los parámetros de consulta y el consentimiento de cookies. GitHub Actions ejecuta pruebas y compilación al actualizar `S1-05`.

## Funciones implementadas

- Inicio público y catálogo musical con diseño responsive.
- Filtro de género en `/catalogo?genero=<id>` y compatibilidad con `/catalogo/<id>`.
- Hooks `useAlbumes`, `useGeneros`, `useTextos`, `useIdiomas` y `useRecurso`.
- Estados de carga y error, con botón para reintentar solicitudes.
- Selector ES/EN y control de tamaño del texto.
- Banner de cookies que diferencia pendiente, aceptado y rechazado, con opción de revisar la elección desde el pie de página.
- Tokens de diseño en `src/styles/tokens.css`; medidas tipográficas y de espaciado en `rem`.

## Referencias

- [Documentación de la API](https://yanethm-sintonia-api.fly.dev/docs)
- [Contrato](https://yanethm-sintonia-api.fly.dev/docs/contrato)
- [Recursos de diseño](https://yanethm-sintonia-api.fly.dev/docs/diseno/)
- [Figma](https://www.figma.com/design/RIiR1LL7PQZMqjr28qeVTM/Sinton%C3%ADa-%C2%B7-Proyecto-frontend-React---Next--copia-?node-id=673-31942&p=f&m=draw)

Para el alcance, pendientes y límites de validación, consulta `docs/REVISION_S1.md`.
