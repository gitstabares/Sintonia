# Panel de accesibilidad — rama S1-06

## Comportamiento

- Activador: icono de persona de la barra de navegación, que ahora despliega un diálogo flotante en lugar de cambiar inmediatamente el tamaño del texto.
- **Escritorio (1024px y superior):** Floating UI, posición `bottom-end`, desplazamiento vertical de 10px, estrategia fija, `autoUpdate`, `flip` y `shift` cuando no cabe en pantalla; panel de hasta 22,5rem de ancho.
- **Móvil (hasta 1023px):** portal sobre el menú, sombra de fondo, diálogo fijo a `bottom: 0`, ancho del 100% y desplazamiento vertical interno cuando la altura disponible es insuficiente. Se respeta el área segura inferior del dispositivo.
- Se puede cerrar con el botón X, Escape y clic fuera. El foco regresa al activador; en móvil se restringe al diálogo mientras está abierto.

## Opciones

| Ajuste | Implementación |
| --- | --- |
| Aumentar tamaño de texto | Raíz HTML a 112,5% de su tamaño base. |
| Alto contraste | Sobrescritura de tokens de fondos, texto, bordes y marca con colores de contraste elevado. |
| Reducir movimiento | Elimina transiciones, animaciones y desplazamiento suave, de forma complementaria a la preferencia del sistema. |
| Subrayar enlaces | Subrayado y grosor visibles para los enlaces de la aplicación. |
| Espaciado de lectura | Aumenta altura de línea, interletrado y espacio entre palabras. |

Todos los controles usan semántica de interruptor `role="switch"`, `aria-checked` y nombres accesibles. Se ofrecen etiquetas en español e inglés. Existe un botón para restablecer los cinco ajustes.

## Persistencia

El estado vive en React dentro de `App.jsx`. Se refleja globalmente en `document.documentElement` usando clases de atributo `data-accesibilidad-*` en `src/styles/accesibilidad.css`.

Las preferencias solo se guardan como `sintonia-accesibilidad` si el consentimiento de almacenamiento está aceptado. Si se rechaza o revoca, se limpia la clave guardada, pero los ajustes actuales siguen funcionando hasta finalizar la sesión.

## Declaración de accesibilidad

La entrada «Declaración de accesibilidad» se muestra como enlace sin navegación efectiva (`href="#"` con cancelación del evento y `aria-disabled="true"`). No se creó una ruta inexistente.

## Verificación

La batería de `node --test` incluye pruebas para los cinco ajustes, normalización, persistencia condicionada, restauración, datos corruptos y almacenamiento bloqueado. El flujo de GitHub Actions ejecuta pruebas y `vite build` tras las publicaciones en `S1-06`.

**Figma:** no fue posible extraer la imagen exacta del nodo `1233:4309` desde el entorno, por lo que no se certifica comparación píxel por píxel. La posición y estructura siguen la descripción del usuario y el CSS inicial del componente.

Referencias:
- https://www.figma.com/design/RIiR1LL7PQZMqjr28qeVTM/Sinton%C3%ADa-%C2%B7-Proyecto-frontend-React---Next--copia-?node-id=1233-4309
- https://floating-ui.com/docs/react
- https://floating-ui.com/docs/usefloating
