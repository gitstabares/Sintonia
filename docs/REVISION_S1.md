# Informe de revisión — Sprint 1 (S1-05)

## Alcance revisado

Se revisó el frontend React/Vite de Sintonía contra la documentación pública de la API y los recursos de diseño de Sintonía. La rama de entrega es `S1-05`, con publicación directa y sin pull request. No se modificaron `main` ni `S1-04`.

### API y hooks

- `useRecurso` centraliza peticiones HTTP, carga, abortos, timeout de 12 segundos y reintento.
- `useAlbumes` acepta límite, orden, filtros opcionales y opción de desactivar la consulta.
- `useGeneros` permite consultar la lista o el detalle, enviar filtros y desactivar solicitudes.
- `useTextos` y `useIdiomas` usan el mecanismo compartido.
- El catálogo comparte las consultas de géneros entre artistas, álbumes y canciones, evitando peticiones redundantes.
- El filtro admite `/catalogo?genero=id` y la ruta anterior `/catalogo/id`.
- Se muestran estados de carga, error con reintento y resultados vacíos.

### Preferencias y accesibilidad

- Consentimiento de cookies: pendiente, aceptado o rechazado.
- El idioma se almacena solamente si se aceptaron las cookies opcionales y se recupera tras recargar.
- En el footer se puede volver a abrir el banner y cambiar la decisión.
- Se actualiza `html.lang` con ES/EN.
- El menú móvil admite Escape, se cierra al navegar y declara `aria-expanded`.
- El control de accesibilidad modifica el tamaño de texto. Existen estilos `:focus-visible` y respeto a `prefers-reduced-motion`.
- Las rutas aún no implementadas muestran una página informativa en lugar de una vista vacía.

### Diseño y CSS

- Los tokens de color, tipografía, espaciado, radios y sombras se contrastaron con los recursos oficiales de diseño.
- Las medidas CSS se expresan en `rem`, excepto las líneas finas de 1px y los breakpoints de media queries.
- Se unificaron selectores para que no afecten componentes ajenos y se corrigió una variable de color inexistente.
- Las cuadrículas de géneros ya no ocultan tarjetas en móviles, y las tarjetas se ajustan a dos columnas.
- Se confirmaron los 54 iconos SVG esperados en el kit oficial.
- Se eliminaron módulos huérfanos: `Campo`, `GestorCookies`, `MenuMovil` y `PreferenciasCookies` (JSX y CSS).

### Pruebas automatizadas

Ejecutar:

```bash
npm install
npm test
npm run build
```

Los tests cubren construcción de URLs, consentimiento y persistencia, importaciones locales, referencias a tokens y el inventario de iconos. GitHub Actions ejecuta `npm test` y `npm run build` en cada push a `S1-05`.

## Límites de validación

- Los recursos de diseño oficiales se pudieron consultar, pero Figma no ofreció una vista gráfica utilizable para comparar píxel a píxel en este entorno. **No se certifica paridad visual exacta.**
- La prueba automatizada del build no sustituye una inspección manual en navegadores y tamaños de pantalla reales.
- Las rutas de inicio de sesión, registro, legal y accesibilidad que no están implementadas en el sprint muestran una pantalla informativa. No se inventó funcionalidad de autenticación.
- El contrato web dinámico de la API no permitió comprobar directamente todas las respuestas en vivo; validar los casos funcionales de integración con los endpoints sigue siendo recomendable.

## Fuentes

- API: https://yanethm-sintonia-api.fly.dev/docs
- Contrato: https://yanethm-sintonia-api.fly.dev/docs/contrato
- Tokens: https://yanethm-sintonia-api.fly.dev/docs/diseno/
- Figma: https://www.figma.com/design/RIiR1LL7PQZMqjr28qeVTM/Sinton%C3%ADa-%C2%B7-Proyecto-frontend-React---Next--copia-?node-id=673-31942&p=f&m=draw
