# Revisión Sprint 1 — Sintonía

## Alcance de esta entrega
- Hooks de álbumes y géneros unificados mediante `useRecurso`, con cancelación, timeout, errores y reintento.
- Parámetros de consulta opcionales en `useAlbumes` y `useGeneros`.
- Hook `useIdiomas` para el endpoint de idiomas.
- Mensajes de carga, error y reintento en las páginas principales.
- Consentimiento de cookies con estados diferenciados: pendiente, aceptado y rechazado.
- Persistencia del idioma solo tras aceptar el consentimiento.
- Corrección del atributo `lang` del documento y de la ruta de catálogo.
- Corrección del token CSS del pie de página.

## Pendientes de validación
- Ejecutar `npm install`, `npm run build` y pruebas de integración en un entorno con Node.
- Contrastar visualmente todos los puntos de ruptura contra Figma.
- Revisar los componentes secundarios del catálogo y retirar código muerto tras comprobar sus dependencias.

La revisión no debe interpretarse como una validación visual o funcional completa.
