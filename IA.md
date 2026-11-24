# IA.md — Historial de prompts y respuestas sobre el desarrollo React de Sintonía

> **Proyecto:** [gitstabares/Sintonia](https://github.com/gitstabares/Sintonia)  
> **Tecnologías y alcance:** React, Vite, componentes JSX, CSS, diseño Figma, API, hooks, accesibilidad, pruebas y ramas Git.  
> **Fecha de elaboración:** 11 de noviembre de 2026.

## Criterio de recopilación

Este archivo reúne las solicitudes relacionadas con el desarrollo de Sintonía en React realizadas en las conversaciones **disponibles en el contexto de este proyecto** y las respuestas que puedo recuperar.

- **[Literal]:** texto del mensaje del usuario disponible en la conversación, con cambios de formato mínimos.
- **[Resumen documentado]:** la intervención original completa no está disponible; se registra lo que consta en el resumen de la conversación, **sin presentarlo como una cita textual**. Algunas respuestas largas se ofrecen como extractos o síntesis expresamente señalados.
- **[Respuesta de esta solicitud]:** la generación del presente `IA.md`.

**Límite de exhaustividad:** no tengo acceso a un archivo íntegro de todas las conversaciones históricas de la cuenta. En particular, los mensajes exactos de varias iteraciones iniciales del Sprint 1 no están disponibles. En esas entradas distingo explícitamente la información recuperable de la transcripción literal. El archivo `Repositorio.txt` asociado al proyecto únicamente contiene `https://github.com/gitstabares/Sintonia`; no incluye un historial de mensajes. Los enlaces y resultados de GitHub recogidos abajo son **los comunicados en sus respectivas respuestas**, no una nueva certificación del estado actual de cada rama.

---

## 1. Inferencia de componentes a partir de Figma — Sprint 1

**Origen:** conversación del proyecto iniciada el 2 de noviembre de 2026.  
**Estado de recuperación:** prompt disponible parcialmente; respuesta inicial no disponible de forma literal.

### Prompt del usuario [literal, fragmento disponible]

> El siguiente repositorio tiene algunas importaciones de scripts js y componentes react que no están en los archivos, por ejemplo: un componente marca, un interfaz.js, un componente preferenciascontext, un componente collagePortadas, un componente SaltarContenido, etc.  
> Puedes deducir que hace cada componente o cual es su sintaxis a partir del mockup en figma?  
> El objetivo es el sprint 1 en el figma, por tanto basate en el para determinar que es cada elemento.
>
> https://github.com/gitstabares/Sintonia/tree/develop  
> https://www.figma.com/design/qsguQrnPi3MQ8djA7jEEQO/Sinton%C3%ADa-%C2%B7-Proyecto-frontend-React---Next?node-id=695-3092

### Respuesta del asistente [resumen documentado]

No dispongo del texto exacto de la respuesta a este primer mensaje. Consta que la tarea se enfocó en deducir o reconstruir los elementos ausentes del repositorio a partir del Sprint 1 del diseño: `Marca`, `interfaz.js`, `PreferenciasContext`, `CollagePortadas`, `SaltarContenido` y otras importaciones. Posteriormente se solicitaron los archivos del proyecto y la especificación del sprint para comparar la implementación con el material original.

### Prompt posterior del usuario [literal]

> Aqui están los archivos que me solicitaste  
> `Sprint 1 · Base, vistas públicas, idioma y cookies.pdf`  
> `Sintonia-develop.zip`

### Respuesta posterior del asistente [resumen documentado]

No está disponible la respuesta textual inmediatamente posterior a los adjuntos. El trabajo pasó a revisar la implementación del Sprint 1, el contrato de la API y los recursos de diseño del proyecto.

---

## 2. Revisión y refactorización integral del Sprint 1

**Estado de recuperación:** varios prompts y respuestas históricos constan únicamente en el resumen disponible del proyecto.

### Solicitud del usuario [resumen documentado; no es cita literal]

Revisar el repositorio React contra Figma y el contrato de la API, completar el Sprint 1, mejorar hooks, corregir rutas y parámetros, centralizar peticiones, gestionar carga y errores, implementar idioma y consentimiento de cookies, normalizar CSS con tokens y `rem`, eliminar componentes muertos y preparar una rama de trabajo con commits y validaciones.

### Respuesta del asistente [resumen documentado]

Se informó que en una copia local del repositorio se preparó una rama `S1-05` a partir de `main` y se generaron dos commits **locales**:

- `819dfd4` — `feat(s1): ajustar hooks, catálogo, estilos y consentimiento`.
- `aab3577` — `docs(s1): registrar alcance y validaciones del sprint`.

El informe de aquella sesión describió: hooks de álbumes y géneros con parámetros opcionales y ruta de detalle; lógica compartida `useRecurso`; hook `useIdiomas`; filtro `?genero=...`; componente `EstadoPeticion` para carga, error y reintento; persistencia del idioma condicionada a aceptar cookies; tokens CSS y conversión a `rem`; retirada de archivos sin uso; cambios en SVG; documentación en `docs/REVISION_S1.md`. También se informó de pruebas y compilación satisfactorias en esa copia, pero **sin comparación visual píxel a píxel** con Figma.

Los commits locales no llegaron a publicarse en esa sesión y la copia temporal se perdió. Esos hashes se incluyen como **antecedente comunicado**, no como commits publicados recuperados.

### Prompt sobre la publicación [literal, recuperado del contexto]

> Si, publica S1-05 en gitstabares/Sintonia. Taquilla fue un typo de mi parte.

### Respuesta del asistente [resumen documentado]

El asistente confirmó que el repositorio correcto era `gitstabares/Sintonia`, comprobó que `S1-05` no figuraba inicialmente en GitHub y explicó que los archivos y commits preparados antes no estaban disponibles en el nuevo entorno. Solicitó una copia con los cambios para poder publicarlos y señaló que `main` permanecería intacta.

---

## 3. Verificación de la rama S1-05 publicada por el usuario

### Prompt del usuario [literal]

> Ya publiqué la rama, vuelve a intentarlo

### Respuesta del asistente [literal]

> He vuelto a comprobar GitHub y confirmo que **la rama `S1-05` ya está publicada** en `gitstabares/Sintonia`.
>
> Puedes verla aquí: [Rama S1-05](https://github.com/gitstabares/Sintonia/tree/S1-05).
>
> La comparación con `main` muestra que tiene **2 commits propios**, pero también que `main` ha avanzado 8 commits desde el punto en que ambas ramas se separaron.
>
> Hay un detalle importante: GitHub muestra cambios únicamente en `src/components/Boton/Boton.jsx` y `src/main.jsx`. Esto no corresponde al conjunto completo de refactorizaciones del Sprint 1 que habíamos preparado anteriormente.
>
> **Resultado:** la rama existe y es accesible, pero **los cambios completos del Sprint 1 aún no están publicados**.
>
> No he sobrescrito los dos commits que ya subiste ni he modificado `main`.
>
> Para completar la publicación de nuestro trabajo anterior, necesito recuperar los archivos locales de aquella sesión. Si me compartes el proyecto actualizado en un ZIP, podré incorporar los cambios faltantes a `S1-05` sin reemplazar lo que ya publicaste.

---

## 4. Autorización para reemplazar el contenido de S1-05

### Prompt del usuario [literal]

> Reemplaza lo publicado, no hay problema, es simplemente lo que ya llevaba en S1-04

### Respuesta del asistente [literal]

> Entendido. Autorizas reemplazar el contenido actual de `S1-05` en [gitstabares/Sintonia](https://github.com/gitstabares/Sintonia/tree/S1-05), aunque eso implique reescribir el historial de esa rama.
>
> He comprobado el entorno de trabajo y **la copia local que contenía los cambios completos del Sprint 1 ya no está disponible**. Por eso todavía no puedo realizar el reemplazo: hacerlo ahora supondría publicar una versión incompleta.
>
> Necesito que me adjuntes el ZIP del proyecto con los cambios que preparamos anteriormente. Con ese archivo podré:
>
> 1. Recuperar las refactorizaciones y correcciones del Sprint 1.
> 2. Verificar la compilación y las pruebas.
> 3. Reemplazar `S1-05` con la versión completa, conservando `main` y `S1-04` intactas.
>
> **No necesitas volver a autorizar la sobrescritura**; tu confirmación ya es explícita.

---

## 5. Aclaración sobre la necesidad de un archivo ZIP

### Prompt del usuario [literal]

> Pero no entiendo, que zip, el zip de main?

### Respuesta del asistente [literal]

> No, **no necesitas enviarme un ZIP de `main`**. Disculpa la confusión.
>
> El código de `main` y de `S1-05` ya está disponible en tu GitHub. Puedo acceder a él directamente.
>
> El problema es que, en la sesión anterior, preparé los cambios del Sprint 1 en una copia temporal del proyecto y generé dos commits (`819dfd4` y `aab3577`), pero no llegué a publicarlos. Esa copia temporal ya no está disponible.
>
> Por tanto, tenemos dos opciones:
>
> 1. **Rehacer los cambios directamente sobre `S1-05`**, utilizando el código de GitHub, el contrato de la API y las referencias de Figma. No necesitas subir ningún archivo.
> 2. Recuperar la copia anterior, si la tienes guardada, para evitar repetir el trabajo.
>
> **Te recomiendo la primera opción.** Ya tengo tu autorización para reemplazar lo publicado en `S1-05`, así que podemos rehacer las correcciones del Sprint 1 y subirlas allí, sin modificar `main` ni `S1-04`.
>
> ¿Quieres que proceda de esa manera?

---

## 6. Aprobación para rehacer el trabajo directamente en GitHub

### Prompt del usuario [literal]

> Si

### Respuesta del asistente [literal, registrada al terminar esa etapa]

> He publicado una nueva actualización en la rama **`S1-05`** del repositorio `gitstabares/Sintonia`.
>
> **Publicación confirmada en GitHub**
>
> - **Rama:** [S1-05](https://github.com/gitstabares/Sintonia/tree/S1-05)
> - **Commit:** [566dc95 — feat(s1): rehacer hooks, estados y consentimiento](https://github.com/gitstabares/Sintonia/commit/566dc95641934f59d649153af050239869423ca3)
> - **Archivos incorporados o actualizados:** 12
> - **`main` y `S1-04`:** sin modificaciones.
>
> Se incorporaron la refactorización de los hooks de álbumes y géneros, el hook de idiomas, los estados de carga y error con reintento, y la gestión del consentimiento de cookies con persistencia condicionada del idioma. También se corrigieron la ruta del catálogo, el atributo `lang` y un token CSS del pie de página.
>
> **Importante:** esta es una recuperación parcial del trabajo anterior, no una reproducción completa de los dos commits que se perdieron. Todavía faltan la revisión de componentes secundarios, la limpieza integral de CSS y código muerto, y la validación visual contra Figma.
>
> Tampoco he podido ejecutar la compilación y las pruebas en esta sesión. Dejé estas limitaciones documentadas en `docs/REVISION_S1.md`.
>
> La rama ya está actualizada y lista para continuar con esas verificaciones.

---

## 7. Finalización del Sprint 1 y publicación sin pull request

### Prompt del usuario [literal]

> Realiza todo lo faltante de las instrucciones del prompt inicial, publicalo en la misma rama sin hacer pull request.

### Respuesta del asistente [extractos de las respuestas publicadas, con edición de formato]

> Ya publiqué un primer bloque de correcciones directamente en **`S1-05`**, sin abrir un pull request.
>
> El commit [0b683bd](https://github.com/gitstabares/Sintonia/commit/0b683bd2f540096ac237a76d8cf86d4ddd95e8a6) centraliza las peticiones del catálogo, incorpora los estados de carga y error en sus secciones y permite seleccionar géneros mediante `?genero=...`, conservando compatibilidad con las rutas anteriores.
>
> Estoy continuando con los componentes compartidos, la accesibilidad, la limpieza de CSS y las pruebas antes de cerrar la entrega.
>
> También quedó publicada la limpieza de componentes obsoletos y la normalización de medidas CSS a `rem`. La auditoría de estilos no encontró referencias a tokens inexistentes.
>
> La primera ejecución de **GitHub Actions terminó correctamente**: las pruebas unitarias y la compilación pasaron en el commit `e4b31b9`.
>
> [Ver ejecución exitosa](https://github.com/gitstabares/Sintonia/actions/runs/42741491898)
>
> **Sprint 1 publicado y validado**
>
> He terminado la revisión y publicado los cambios directamente en **`gitstabares/Sintonia`, rama `S1-05`**, sin crear ningún pull request.
>
> **Validación final exitosa: 11/11 pruebas aprobadas, 0 fallos y compilación de producción con Vite exitosa.**
>
> Además de los cambios ya publicados, quedaron completados los siguientes puntos:
>
> - **API y hooks:** peticiones centralizadas, eliminación de consultas duplicadas, filtros de género y manejo de errores.
> - **Interfaz:** estados vacíos, navegación móvil, accesibilidad, selector de idioma y consentimiento de cookies.
> - **CSS y diseño:** medidas en `rem`, correcciones responsive, eliminación de tarjetas recortadas y revisión de los 54 iconos.
> - **Limpieza:** eliminación de componentes obsoletos y corrección de imports y tokens.
> - **Calidad:** pruebas automatizadas, compilación en GitHub Actions y documentación técnica.
>
> [Ver rama S1-05](https://github.com/gitstabares/Sintonia/tree/S1-05)  
> [Último commit: 5f3c81a](https://github.com/gitstabares/Sintonia/commit/5f3c81add389faaa7dcf0a44aebd356e00f6f719)  
> [Ver validación exitosa](https://github.com/gitstabares/Sintonia/actions/runs/42742398023)  
> [Informe completo del Sprint 1](https://github.com/gitstabares/Sintonia/blob/S1-05/docs/REVISION_S1.md)
>
> **Limitación pendiente:** no pude certificar una comparación visual píxel a píxel con Figma ni probar todas las respuestas de la API en vivo. Esto quedó documentado; la compilación y las 11 pruebas automatizadas sí están confirmadas.
>
> `main` y `S1-04` permanecen intactas. **No se abrió ningún pull request.**

---

## 8. Implementación inicial del panel de accesibilidad en S1-06

### Prompt del usuario [literal]

> Diseña en la rama S1-06 el panel de accesibilidad. En el figma dicho panel es: https://www.figma.com/design/RIiR1LL7PQZMqjr28qeVTM/Sinton%C3%ADa-%C2%B7-Proyecto-frontend-React---Next--copia-?node-id=1233-4309&t=4Jx6gfLWnkbEow3s-0. La rama ya tiene un componente PanelAccesibilidad con su respectivo css para que trabajes sobre el. La idea es utilizar el paquete Floating UI para que dicho panel de accesibilidad aparezca como ventana flotante en desktop. Fijate en la ubicación del panel de acuerdo al figma. En desktop se ubica por debajo del boton que lo abre, alineados a la derecha. En mobile se sobrepone al menu que contiene el boton, se alinea al borde inferior de la ventana y cubre todo el ancho del dispositivo. Implementa también las funcionalidades que deben ir en dicho panel (aumentar tamaño de texto, alto contraste, reducir movimiento, subrayar enlaces y espaciado de lectura) y un enlace a la declaración de accesibilidad (que inicialmente no apunta hacia ninguna ruta).

### Respuesta del asistente [síntesis de los mensajes finales con extractos literales]

> **Panel de accesibilidad implementado en `S1-06`.**
>
> El panel ya está conectado al botón de accesibilidad de la barra de navegación y publicado en GitHub.
>
> **Compilación y 17 pruebas automatizadas aprobadas.**
>
> La implementación utiliza **Floating UI** con dos comportamientos:
>
> - **Escritorio:** ventana flotante debajo del botón que la abre, alineada por el borde derecho mediante `bottom-end`.
> - **Móvil:** panel superpuesto al menú, anclado al borde inferior de la pantalla y ocupando todo el ancho del dispositivo.
>
> También están implementadas las cinco funciones solicitadas: aumentar el texto, activar alto contraste, reducir movimiento, subrayar enlaces y ampliar el espaciado de lectura.
>
> Las preferencias se aplican inmediatamente a toda la aplicación. Se conservan entre visitas cuando el usuario ha aceptado el almacenamiento de preferencias.
>
> La última publicación también superó las verificaciones. Quedaron añadidos el restablecimiento de ajustes, los controles accesibles mediante teclado, el cierre con `Escape` y la documentación técnica.
>
> [Ver rama S1-06](https://github.com/gitstabares/Sintonia/tree/S1-06)  
> [Último commit: 8e2b4a5](https://github.com/gitstabares/Sintonia/commit/8e2b4a583271c9c04bf5276a002c0401086ece8a)  
> [GitHub Actions: validación exitosa](https://github.com/gitstabares/Sintonia/actions/runs/42902439686)  
> [Documentación del panel](https://github.com/gitstabares/Sintonia/blob/S1-06/docs/ACCESIBILIDAD_S1-06.md)
>
> **Nota sobre Figma:** no pude obtener una representación visual del nodo para comprobar la fidelidad píxel a píxel. Respeté la ubicación que especificaste y las dimensiones y los tokens del componente preexistente.
>
> **`main` y `S1-05` permanecen intactas. No se creó ningún pull request.**

---

## 9. Corrección del panel en una rama fix/

### Prompt del usuario [literal]

> Trabaja en una rama adicional con el prefijo fix/. Revisa que los estilos del panel no corresponden:
>
> - ninguna opcion tiene iconos
> - La opcion del tamaño del texto lo varia en un porcentaje definido. Por defecto es 100% y a ambos lados de la opción están los botones para disminuir y aumentar tamaño. Por tanto modifica el hook correspondiente para la modificación de tamaño para que no sea booleano sino que cambie el tamaño en un porcentaje determinado según la preferencia del usuario.
> - Revisa la jerarquia de las etiquetas y componentes dentro de panel
> - Todos los textos vienen de la API. Para ello el componente debe recibir dicho parametro, como lo hacen los demás componentes.
> - Los contenidos de la API estan dados por: https://yanethm-sintonia-api.fly.dev/api/v1/textos?seccion=accesibilidad. Para verificar la disponibilidad de los textos utiliza unicamente el operador ?.
> - No utilices el operador || para poner textos en caso de que la api no esté disponible. Todo debe venir de la API y nada debe estar hardcodeado.
> - Verifica los estilos, las opciones tienen el color de fondo inadecuado.

### Respuesta del asistente [síntesis del mensaje final con extractos literales]

> **Correcciones publicadas en `fix/panel-accesibilidad`.**
>
> **19 pruebas aprobadas y compilación exitosa.**
>
> Creé una rama nueva a partir de `S1-06` y corregí el panel de accesibilidad.
>
> **Cambios realizados**
>
> - **Sin iconos en las opciones:** eliminé los iconos decorativos y los fondos individuales. Las opciones ahora utilizan filas transparentes con texto e interruptores.
> - **Tamaño de texto porcentual:** comienza en **100 %**, con botones **−** y **+** que modifican el valor en pasos del 10 %, entre 80 % y 140 %.
> - **Jerarquía semántica:** título `h2`, etiquetas de opciones `h3`, descripciones `p` y controles asociados mediante atributos ARIA.
> - **Textos de la API:** añadí una consulta específica a `/textos?seccion=accesibilidad&idioma=...`. El componente recibe los textos por propiedades y utiliza encadenamiento opcional (`?.`), sin traducciones hardcodeadas ni textos alternativos con `||`.
> - **Preferencias:** adapté la persistencia y las pruebas para utilizar el porcentaje numérico en lugar del booleano anterior.
>
> Se conserva el posicionamiento con Floating UI: debajo del botón y alineado a la derecha en escritorio; panel inferior de ancho completo en móvil.
>
> [Ver rama fix/panel-accesibilidad](https://github.com/gitstabares/Sintonia/tree/fix/panel-accesibilidad)  
> [Último commit: 16103f2](https://github.com/gitstabares/Sintonia/commit/16103f27128e76dd7e609e5677e2d045921af108)  
> [GitHub Actions: 19/19 pruebas y build correctos](https://github.com/gitstabares/Sintonia/actions/runs/42911496885)
>
> **Limitación:** el endpoint de textos no fue accesible en vivo desde este entorno. Contrasté las claves con otro frontend que consume la misma API y añadí soporte para distintas estructuras de respuesta, pero la integración aún necesita comprobarse con una respuesta JSON real. Tampoco pude verificar la correspondencia visual exacta con Figma.
>
> `S1-06` y `main` no fueron modificadas. **No se creó ningún pull request.**

---

## 10. Recopilación de los prompts de desarrollo React (esta solicitud)

### Prompt del usuario [literal]

> Recopila todos los prompts que he realizado contigo relacionados con el desarrollo en React y contruye un archivo IA.md con dichos prompts y tus respuestas

### Respuesta del asistente [respuesta de esta solicitud]

Se elaboró el presente documento `IA.md` con las solicitudes de React/Sintonía y las respuestas disponibles, organizadas cronológicamente. Se separaron las citas recuperadas de los resúmenes de conversaciones anteriores cuyo texto exacto no estaba accesible. El archivo se entrega como documento Markdown independiente; **su creación no implica una publicación automática en GitHub**.

---


---

## 11. Sprint 2 · S2-01 · Detalle de un álbum con React y Vite

**Fecha:** 23 de noviembre de 2026.  
**Rama:** `S2-01`, creada de nuevo a partir de `main`.  
**Diseño:** archivo Figma «Sintonía copia», «Sprint 2», columna «3 · Detalle de un álbum», web (nodo `8:1911`) y móvil (nodo `14:505`).

### Prompt del usuario [literal]

> Acabo de borrar la rama S2-01, vas a repetir solo los siguientes cambios:
>
> Como visitante de Sintonía, quiero ver el detalle de un álbum para conocer las canciones de un álbum. Alcance: vista 3 en web y móvil, en la ruta dinámica /albumes/[id]`.
>
> 1. La vista muestra la portada, el artista, el año, el género y la lista de canciones con su duración, y otros álbumes del mismo artista. No hay reproducción, con datos de `GET /albumes/:id`.
> 2. La página tiene título y descripción propios (`generateMetadata`) a partir de `titulo` y `artista.nombre` del álbum.
> 3. `duracionSeg` se muestra como minutos y segundos (`1:10`). `fechaPublicacion` es un día sin hora: no se pasa por `new Date()`.
> 4. Referencia de diseño: Figma, bloque «Sprint 2», columna «3 · Detalle de un álbum» (web y móvil).
>
> Nuevamente crea S2-01 a partir de main, y crea las paginas correspondientes. Si necesitas modificar algun script o funcion hazlo pero realiza los cambios correspondientes en los demas componentes que los utilicen. Añade una nueva entrada al archivo IA.md con los cambios realizados y al finalizar indicame por aqui que archivos nuevos creaste y o modificaste.

### Resultado de la implementación [respuesta técnica]

- Se verificó que la rama anterior `S2-01` ya no existía y se creó **desde `main`**, sin incorporar la implementación previa de Next.js.
- Se conservó la arquitectura **React 19 + Vite + React Router**. Se agregó la ruta de React Router /albumes/:id`, equivalente en Vite a la intención dinámica /albumes/[id]` de la historia.
- Se implementó una página adaptable a escritorio y móvil, siguiendo la estructura visual real de Figma, con cabecera, portada, artista, género, año, lista de pistas y duración, fecha de publicación y otros álbumes del mismo artista.
- Se crearon `useDetalleAlbum`, `useMetadatosAlbum`, el componente de fila de pista y utilidades para extraer los datos de `GET /albumes/:id`, formatear las duraciones y tratar las fechas como días del calendario.
- **Metadatos:** `generateMetadata()` es una función exclusiva de Next.js y no existe en Vite. Se implementó el comportamiento requerido usando un hook que actualiza `document.title` y `meta[name="description"]` con el título y nombre del artista obtenidos de la API, restaurándolos al abandonar la página. Este mecanismo funciona del lado cliente y no proporciona metadatos SSR.
- **Formato:** `duracionSeg = 70` se representa como `1:10`. `fechaPublicacion` se procesa como texto ISO de día (`YYYY-MM-DD`), sin `new Date()` y sin riesgo de desplazarla por zona horaria.
- Se modificó el componente compartido `Tarjeta` para navegar con `<Link>` a cada detalle y permitir mostrar la información de año/tipo en las tarjetas relacionadas; se retiró su botón ficticio de reproducción. Las secciones que ya consumen `Tarjeta` siguen utilizando sus mismas propiedades existentes.
- Se conservaron los hooks de catálogo y el mecanismo global de textos de `main`. La petición del usuario fue limitada exclusivamente a la historia 1; no se aplicó ninguna migración ni refactorización general de otras páginas.

### Verificaciones y límite de acceso

Se añadieron pruebas de las funciones de duración, fechas, normalización de álbumes, pistas y metadatos, y un workflow de GitHub Actions para ejecutar `npm test` y `npm run build` en `S2-01`. La API externa no fue accesible desde la herramienta de consulta en esta sesión: se contemplan las formas `canciones` y `pistas`, y varios nombres plausibles para las colecciones de otros álbumes, pero **la forma real del JSON sigue pendiente de comprobarse contra el servidor**. No se abrió un pull request.




---

## 12. Sprint 2 · Historia S2-03 — Iniciar sesión

**Fecha:** 23 de noviembre de 2026  
**Rama:** `S2-03` creada desde `main`  
**Diseño Figma:** Vista 4 «Iniciar sesión» web (`6:523`) y móvil (`14:1329`).

### Solicitud del usuario [literal]

> Bien, ahora vamos a relizar la historia de usuario 3. Crea una rama desde main llamada S2-03 y desarrolla las siguientes caracteristicas:
>
> Como persona con una cuenta en Sintonía, quiero ingresar con mi correo y mi contraseña para usar el sitio con mi sesión. Alcance: vista 4 en web y móvil, con `POST /sesion`.
>
> 1. El formulario pide correo y contraseña, con etiquetas visibles asociadas a cada campo.
> 2. El botón con el ojo muestra y oculta la contraseña, y dice su estado a los lectores de pantalla.
> 3. Si falta un dato, el mensaje aparece junto al campo y el foco va al primer campo con error.
> 4. Con datos correctos (`sara.quintero@correo.co`, clave `sintonia123`) la persona entra y vuelve al inicio con la sesión iniciada.
> 5. Hay enlaces a Crear cuenta y a «¿Olvidaste tu contraseña?». Referencia de diseño: Figma, bloque «Sprint 2», columna «4 · Iniciar sesión».
>
> Ten en cuenta que:
>
> - No existe un hook que haga solicitudes POST aun, se debe crear.
> - La página que se debe crear es la de Iniciar Sesión, la de crear Cuenta debe quedar pendiente todavia, esta vez, deja un PR pendiente para main

### Implementación realizada

- Ruta de React Router /iniciarSesion` y nueva página responsive `src/pages/IniciarSesion`; sin crear las páginas de registro y recuperación.
- Diseño adaptado de Figma: formulario en la parte izquierda y mosaico de portadas reutilizadas del kit en escritorio; composición compacta en móvil. Logotipo y tokens existentes.
- Componente `FormularioSesion`: campos con etiquetas e identificadores asociados, errores específicos junto a cada entrada, foco en el primero con error, accesibilidad con `aria-invalid`, `aria-describedby` y `role=alert`, botón ocular con estado anunciado por `aria-pressed` y nombre accesible variable.
- Nuevo hook `useMutacion` para POST bajo demanda, estado de petición, errores, tiempo límite y cancelación. La función común `solicitarPost` envía JSON a la API y distingue respuestas exitosas y errores HTTP.
- El formulario envía `{correo, clave}` a `POST /sesion`; no concede acceso por comparación local con las credenciales demostrativas. Solo después de una respuesta 2xx exitosa actualiza el estado de sesión y navega a la portada.
- Se añadió una identidad de sesión para la navegación del sitio; el encabezado reemplaza botones de visitante por nombre y opción de cerrar sesión. El almacenamiento temporal o permanente depende de la opción «Mantener la sesión iniciada», y solo incluye nombre/correo, **nunca contraseñas ni tokens**.
- Se mantiene la consulta de textos por página (`useTextos`). La vista usa claves propuestas de la API con el texto de Figma como respaldo cuando las claves no están presentes.
- Se agregaron pruebas unitarias y workflow de GitHub Actions y se abrió un pull request **sin fusionar**, apuntando de `S2-03` a `main`.

**Limitaciones de integración:** el servidor de API no respondió durante esta sesión; no se pudo verificar si el campo JSON exigido es `clave` ni si el backend mantiene la autenticación mediante cookies o tokens. El frontend no guarda tokens y una identidad recordada no implica verificación de vigencia de la sesión por el servidor. Hasta comprobar el contrato real no se puede afirmar que el acceso con las credenciales de ejemplo esté validado de extremo a extremo. Los enlaces a Crear cuenta y Recuperar contraseña llevan a rutas pendientes cuya vista es «No encontrada».

## Referencias del proyecto

- **Repositorio:** https://github.com/gitstabares/Sintonia
- **Rama de Sprint 1:** https://github.com/gitstabares/Sintonia/tree/S1-05
- **Rama del panel:** https://github.com/gitstabares/Sintonia/tree/S1-06
- **Rama de corrección:** https://github.com/gitstabares/Sintonia/tree/fix/panel-accesibilidad
- **API principal:** https://yanethm-sintonia-api.fly.dev/api/v1
- **Textos de accesibilidad:** https://yanethm-sintonia-api.fly.dev/api/v1/textos?seccion=accesibilidad
- **Documentación de diseño:** https://yanethm-sintonia-api.fly.dev/docs/diseno/
- **Diseño del panel en Figma:** https://www.figma.com/design/RIiR1LL7PQZMqjr28qeVTM/Sinton%C3%ADa-%C2%B7-Proyecto-frontend-React---Next--copia-?node-id=1233-4309

## Observaciones sobre el registro

1. Las entradas 1 y 2 contienen **reconstrucciones explícitamente rotuladas** porque no se dispone del histórico literal completo.
2. Las demás entradas registran prompts literales y las respuestas finales recuperables; las respuestas de mayor extensión se presentan como extractos o síntesis identificadas para facilitar su lectura.
3. No se incluyen llamadas internas a herramientas, razonamientos privados ni archivos adjuntos como contenido transcrito; solo las solicitudes del usuario y los resultados comunicados por el asistente.
4. Para convertir este registro en una transcripción **íntegra palabra por palabra de todas las conversaciones**, sería necesario disponer de una exportación del historial que contenga los mensajes ausentes.


---

## 13. Refactor desde S2-03 — Textos globales y estados HTTP

**Fecha:** 24 de noviembre de 2026.  
**Rama:** `refactor/textos-unificados-S2-03`, creada directamente desde `S2-03` sin modificar la rama original ni fusionar el PR de la historia.

### Prompt del usuario [literal]

> Listo, los cambios están perfectos, a partir de S2-03 crea una rama nueva para hacer un refactor:
>
> - El hook useTextos debe usarse unicamente una vez en el archivo App y pasarse como prop a sus componentes hijos.
> - El componente EstadoPeticion debe tomar los textos de cargando y error que pases por el useTextos de App, para ello sería bueno que EstadoPeticion accederia al statuscode del fetch que lo ocasionó, para de esta manera mostrar en pantalla el error correspondiente desde los textos de la API. Lo mismo para la pagina No Encontrado la cual debería mostrar sus textos según la API. Los unicos textos que deberian estar hardcodeados es si el fetch de useTextos no devuelve los textos correctamente.
> - Recuerda que la API de textos es la siguiente: [https://yanethm-sintonia-api.fly.dev/api/v1/textos](https://yanethm-sintonia-api.fly.dev/api/v1/textos)
> - Finalmente, no olvides adicionar prompt y respuesta/resumen al documento IA.md

### Respuesta y resumen técnico

- `App.jsx` es el **único componente que ejecuta `useTextos(idioma)`**. Asimismo se centralizó `useTextosAccesibilidad(idioma)`, para evitar repetir la consulta accesible en cada ruta.
- `App` envía `datos` (textos, carga, error, recarga y estado HTTP) y `textosAccesibilidad` a las páginas a través de `configuracion`. Las páginas propagan el objeto de textos a las secciones, layout, navbar, footer y a todos los `EstadoPeticion`.
- `useRecurso` restablece `statusCode` al cambiar el recurso o reintentar, conserva el valor del HTTP exitoso y añade `error.status` en respuestas fallidas; conserva si existe el código de error del backend (`error.codigo`). Esto impide reutilizar accidentalmente un estado 404 anterior.
- `EstadoPeticion` utiliza exclusivamente los mensajes de `/textos` provistos por props. La utilidad pura `textosInterfaz.js` selecciona los textos de cargando, sin resultados, error general o error asociado al código HTTP/código del backend. El botón de reintento usa la traducción de la API.
- Tanto la ruta desconocida (`NoEncontrada.jsx`) como la situación 404 del detalle del álbum se presentan utilizando los mensajes de la API (priorizando la sección de álbum cuando exista).
- Se retiraron frases de carga, idioma, preferencias de cookies y salida que estaban hardcodeadas en navbar/footer/selector de idioma, y se eliminaron textos fijos del formulario cuando la API proporciona la sección de inicio de sesión.
- Solo si `GET /textos` falla o su contenido no cumple la validación de `useTextos` se usa `textosRespaldo(idioma)`; el formulario conserva un respaldo propio cuando la sección de login venga incompleta o no exista.
- No se crearon páginas nuevas ni se modificaron las consultas de álbumes, géneros o el POST de sesión; no se fusionaron ramas ni se abrió un PR nuevo.

### Límites de validación

La API en `https://yanethm-sintonia-api.fly.dev/api/v1/textos` no pudo consultarse desde este entorno (error de conectividad/resolución DNS). **No se confirmó el esquema exacto de los mensajes de errores del endpoint.** Los adaptadores admiten los contenedores `estados`, `mensajes.estados`, `errores` y claves de páginas habituales; queda pendiente verificar que coincidan con el JSON real. En caso de una sección ausente dentro de una respuesta global válida, no se inventa un mensaje de error: se mostrará únicamente el contenido disponible. Se incorporaron pruebas unitarias y validación de build para esta rama.


---

## 14. Corrección de endpoints y de textos de respaldo

**Fecha:** 24 de noviembre de 2026.  
**Rama:** `refactor/textos-unificados-S2-03` (continúa la rama del refactor anterior).

### Prompt del usuario [literal]

> Esta es la documentación de la API, mira los endpoints y compara con los cambios que hiciste, si alguna endpoint no coincide corrigela: [https://yanethm-sintonia-api.fly.dev/docs](https://yanethm-sintonia-api.fly.dev/docs)
> No deberian haber textos hardcodeados ni siquiera en caso de que los textos no existan. Los unicos textos hardcodeados deberian estar en caso de que useTextos no responda adecuadamente

### Respuesta y cambios realizados

- Se visitó el portal público de documentación y se identificó la ruta «Contrato completo» (`/docs/contrato`) y el archivo descargable (`/docs/contrato.md`). **El navegador de consulta solo pudo leer el contenedor HTML**: el contenido Markdown no pudo descargarse ni se pudo consultar el JSON de los endpoints. Por ello, **no se declara verificado el contrato completo**; las comprobaciones se basan en el código y en las restricciones ya especificadas por el usuario.
- Se revisaron los hooks HTTP existentes: `GET /textos` (idioma), `GET /textos?seccion=accesibilidad`, `GET /idiomas`, `GET /generos`, `GET /generos/:id`, `GET /albumes`, `GET /albumes/:id` y `POST /sesion`.
- **Corrección confirmada por el requisito anterior del usuario:** `GET /albumes` no admite filtros. `useAlbumes` dejó de enviar `orden`, `limite` y cualquier propiedad de `filtros`. En la página principal, la cantidad de álbumes se limita sobre los datos ya recibidos; el catálogo sigue solicitando todos sin parámetros de consulta.
- Se simplificó `useGeneros` para enviar únicamente el path de lista o detalle, sin filtros ni parámetros de consulta arbitrarios. Se actualizaron las llamadas de `Home` y `Catalogo` de acuerdo con las nuevas firmas.
- **Regla de respaldo estricto:** `src/utils/textosInicioSesion.js` ya no contiene cadenas predeterminadas ni crea textos cuando la API responde satisfactoriamente pero omite la sección `iniciarSesion` o alguna clave. En esos casos la etiqueta se deja sin contenido, en lugar de inventar una frase.
- El respaldo en español e inglés del formulario se trasladó a `textosRespaldo()` en `src/utils/textosInterfaz.js`. `App.jsx` es el único lugar que lo activa y **solo cuando `useTextos` devuelve un error de petición o de validación**. No se mezclan textos de fallback en respuestas válidas pero incompletas.
- Se eliminó el texto fijo del título de la pestaña y del nombre accesible del enlace del logo en la página de ingreso: provienen de los textos recibidos.
- Se incorporaron pruebas para documentar y verificar esta restricción y las rutas de catálogo, preservando la arquitectura React/Vite y el PR original de `S2-03`.

**Pendiente técnico:** revisar el cuerpo real de `/docs/contrato.md` o el JSON real de los endpoints cuando el servidor sea accesible para confirmar los nombres de los campos de POST y la estructura de las claves de mensajes HTTP. Ningún esquema que no estuviese accesible se trató como hecho verificado.


**Revisión adicional de etiquetas de idioma:** se eliminaron los literales visuales `ES` y `EN` de `SelectorIdioma.jsx`; el selector recibe etiquetas desde la sección de textos vía `Navbar`. Únicamente `textosRespaldo()` define estos códigos para el caso de error de `useTextos`.


**Corrección final de metadatos:** los títulos y descripciones del detalle del álbum ya no contienen prosa literal. Cuando la API ofrece `paginas.album.metadatos.titulo` y `paginas.album.metadatos.descripcion`, se interpolan `{titulo}` y `{artista}`. Si la respuesta global de textos es válida, pero falta esa sección, el navegador recibe únicamente los datos dinámicos del álbum unidos sin frase de sustitución. También se actualizaron las pruebas de metadata y se mantuvo la documentación original de la historia.


---

## 15. Verificación con Postman conectado

**Fecha:** 24 de noviembre de 2026. **Rama:** `refactor/textos-unificados-S2-03`.

### Solicitud literal

> Te he conectado con Postman y allí hay entradas para cada endpoint, puedes acceder a ellos ahora y recuperar las respuestas JSON reales para verificar las rutas de los textos en el proyecto real?

### Hallazgos y correcciones

Se accedió mediante el conector Postman a la colección «Sintonía API», UID `58842877-a5dad643-4a2e-43d9-ba42-b73b66dae76b`, workspace «Sintonia» (`57bf3e09-9328-404d-b74b-60e4164d1265`). Se consultaron los requests y **ejemplos JSON guardados** de `GET /textos`, `GET /albumes`, `GET /albumes/:id`, `GET /generos`, `GET /generos/:id` y `POST /sesion`.

**Distinción de evidencia:** las respuestas guardadas en Postman son ejemplos de contrato, **no son nuevas respuestas de una ejecución HTTP en vivo**. La red de este entorno siguió sin resolver el servidor Fly.io y el conector de Postman disponible es para consultar colecciones, solicitudes y respuestas guardadas, no para ejecutar esos requests. Se almacenaron copias de los dos ejemplos de `GET /textos` bajo `tests/fixtures/` y se agregaron pruebas.

Hallazgos verificados en la colección:
- `GET /textos?idioma=en&seccion=navbar,footer` responde con la envoltura `{idioma,version,textos}`. La API soporta secciones parciales; la lista documentada de claves raíz comprende `sitio,navbar,menuMovil,footer,panel,paginas,componentes,formularios,estados,errores,cookies,accesibilidad,idioma,general`. `errores` se indexa por código de error, no necesariamente por estado HTTP.
- El ejemplo guardado de textos muestra `textos.navbar.botones.invitado.ingresar`, `textos.navbar.enlaces.conSesion.inicio` y `textos.paginas.inicio.seo.titulo`. **No demuestra que existan** `paginas.inicioPublico` u otras claves de vistas no incluidas en el ejemplo. Por eso esas rutas no se presentan como verificadas.
- `GET /albumes` **sí admite** `orden=populares|recientes` y `limite` de 1 a 24. Esto corrige expresamente la conclusión de la sección 14: se restauraron únicamente esos dos parámetros soportados en `useAlbumes` y se ajustaron Home y Catalogo; no se reintrodujo ningún objeto genérico `filtros`.
- `GET /albumes/:id` devuelve el álbum sin envoltura de `datos`, con `pistas`, `masDelArtista` y fecha `YYYY-MM-DD`; `GET /generos` devuelve `{datos:[...]}`, mientras que el detalle es objeto plano. El código actual ya cubre esas formas.
- `POST /sesion` requiere `{correo,clave}`, responde con `{usuario,token,...}` y devuelve errores `{error:{codigo,mensaje,campos}}`. La solicitud y el parseo existentes son compatibles; el formulario ahora puede buscar el mensaje traducido por `textos.errores[error.codigo]`.
- `GET /textos` no debe activar respaldo local simplemente porque falta `cookies.banner` en una respuesta válida parcial. Se reemplazó la validación rígida por una que valida la estructura y las secciones documentadas, manteniendo el respaldo únicamente para una solicitud fallida o respuesta inválida.
- Se amplió la búsqueda de títulos del formulario a la sección raíz `formularios`, sin añadir cadenas cuando falta una clave. El menú puede usar el texto documentado `navbar.enlaces.conSesion.inicio` para la sesión activa.

**Limitación:** como el ejemplo de `GET /textos` es parcial y la API no pudo ejecutarse en vivo, **no se verificaron los valores completos de las vistas** `inicioPublico`, `catalogo`, `album` e `iniciarSesion`. No se agregan frases inventadas si esos textos faltan en una respuesta válida.


---

## 16. Contraste de respuestas HTTP reales de la API

**Fecha:** 24 de noviembre de 2026. **Rama:** `refactor/textos-unificados-S2-03`.

**Método de verificación:** se ejecutaron cuatro `GET` reales desde GitHub Actions [ejecución #45473101883](https://github.com/gitstabares/Sintonia/actions/runs/45473101883) porque el servidor no resolvía DNS en la herramienta de navegación. Los cuatro endpoints respondieron **HTTP 200** y se guardaron como artefacto ZIP descargable `respuestas-publicas-api`: `textos-es.json`, `textos-en.json`, `textos-accesibilidad.json` y `albumes.json`. Estos datos sí proceden de respuestas vivas, a diferencia de los ejemplos guardados en Postman que se analizaron en la sección 15.

### Rutas verificadas y ajustes

- `GET /textos?idioma=es` y `GET /textos?idioma=en` devuelven el objeto `{idioma,version,textos}` completo. Se confirmaron las secciones raíz `sitio,navbar,menuMovil,footer,panel,paginas,componentes,formularios,estados,errores,cookies,accesibilidad,idioma,general`. La respuesta real confirma `paginas.inicioPublico`, `paginas.catalogo`, `paginas.album` y `paginas.ingresar`; el ejemplo parcial de Postman enseñaba `paginas.inicio` pero no abarcaba la estructura de las vistas Sintonía.
- **Ingreso**: todos los textos visibles provienen de `paginas.ingresar.formulario`, `paginas.ingresar.presentacion`, `paginas.ingresar.errores`, `formularios.campos.clave` y `formularios.validacion`. El adaptador `textosInicioSesion` fue actualizado con esas rutas. La búsqueda por `textos.errores[codigo]` para errores HTTP se mantiene.
- **Estados de petición**: la respuesta viva emplea `estados.cargando.titulo` y `estados.cargando.aria`, `estados.error.descripcion`, `estados.vacio.generico`, `estados.noEncontrado.descripcion` y `estados.noEncontrado.botones.irAlInicio`. Se corrigió el adaptador genérico, evitando plantillas inventadas cuando falta la sección.
- **Navegación, idioma, cookies**: las rutas reales son `navbar.usuario.cerrarSesion`, `idioma.codigos.es/en` y `cookies.preferencias.titulo`. Se actualizaron Navbar, SelectorIdioma (a través de Navbar) y Footer. La antigua lectura de `cookies.preferencias` como cadena era incorrecta porque es un objeto.
- **SEO álbum**: la API utiliza `paginas.album.seo.titulo` y `paginas.album.seo.descripcion` (no `metadatos`). El hook y la utilidad para metadatos fueron corregidos.
- **Accesibilidad**: `GET /textos?idioma=es&seccion=accesibilidad` responde con `textos.accesibilidad`, que coincide con `useTextosAccesibilidad`.
- **Álbumes**: `GET /albumes?orden=populares&limite=6` devolvió `{datos:[...]}` con seis álbumes. Queda confirmado que ambos parámetros se aceptan, pese a lo indicado anteriormente en otras entradas del proyecto.
- El respaldo hardcodeado permanece centralizado en `textosRespaldo()` y solo se activa ante fallo o JSON inválido de `useTextos`. Respuestas válidas que omiten textos no se rellenan con frases fijas.

Se añadió una prueba de regresión con un recorte fiel de los campos y valores obtenidos en vivo, sin integrar el contenido completo de 120 KB a los archivos fuente. **Los JSON completos siguen disponibles mediante el artefacto de GitHub Actions**.


---

## 17. Textos exclusivos de la API: sin mensajes de respaldo

**Fecha:** 24 de noviembre de 2026.
**Rama:** refactor/textos-unificados-S2-03.
**PR propuesto hacia:** S2-03.

### Prompt del usuario (literal)

> Me di cuenta que textos interfaz tiene una funcion de textos respaldo. Eliminala, todos los textos deben venir de la API y si el fetch da un error entonces en pantalla se debe mostrar un mensaje de error (Con el componente EstadoPeticion) en el que se indiqué que no se cargaron los textos, dicho mensaje es lo unico que puede estar hardcodeado en todo el proyecto. Realiza estos cambios sobre la ultima rama en la que hemos trabajado y empieza un PR hacia S2-03 al finalizar

### Respuesta / resumen técnico

- Se eliminó la función textosRespaldo de src/utils/textosInterfaz.js y sus importaciones. La aplicación nunca genera textos predeterminados cuando el servidor omite claves de una respuesta válida.
- App.jsx ejecuta useTextos una sola vez y bloquea el montaje de rutas y demás componentes cuando los textos están pendientes, fallan o no llegan en formato válido.
- EstadoPeticion recibe la prop falloTextos: durante la espera renderiza un indicador gráfico sin leyenda y ante un fallo muestra, con role=alert, **la única frase literal visible**: «No se pudieron cargar los textos de la interfaz.».
- Se aprovecha la sección accesibilidad de la respuesta de texto global: App deja de hacer una segunda llamada mediante useTextosAccesibilidad.
- Se retiran el título y la descripción SEO literales de index.html. Los metadatos de navegación utilizan las secciones de texto de la API; el álbum conserva sus metadatos dinámicos.
- Se reemplazaron las pruebas que validaban el fallback y se añadieron pruebas de regresión que comprueban la ausencia de dicho mecanismo, la condición de bloqueo y el mensaje especial.
- La rama S2-03 no se modifica directamente. Se abre un pull request hacia S2-03 y se deja pendiente de revisión.

---

## 18. Sprint 2 · Historia S2-04 — Errores y carga del inicio de sesión

**Fecha:** 24 de noviembre de 2026. **Rama:** `S2-04` creada directamente desde `main` (`51daa45234ad470d2337acc76a0db5b1b38ef060`).
**Arquitectura:** React 19 + Vite + React Router; se mantiene el formulario existente de la historia S2-03.

### Prompt del usuario (literal)

> Perfecto, continuamos con la historia de usuario 4 que construiras en una rama creada desde main llamada S2-04. La HU contiene lo siguiente:
>
> Como persona con una cuenta en Sintonía, quiero entender qué falló al ingresar para saber cómo corregirlo. Alcance: estados de error y de carga del formulario de ingreso.
>
> 1. Mientras se envía el formulario, el botón muestra «Ingresando…» y no se puede enviar dos veces.
> 2. 401 `credenciales_invalidas` muestra un solo mensaje, sin decir si falló el correo o la contraseña.
> 3. 429 `demasiadas_peticiones` bloquea el formulario durante los segundos de la cabecera `Retry-After`.
> 4. Si no hay red, se muestra el error de conexión con botón para reintentar.
> 5. Referencia de diseño: Figma, bloque «Sprint 2», «Errores, carga y contraseña visible» (web y móvil).
>
> Recuerda:
>
> - No hardcodees el contenido agregado, todo debe venir de la API
> - Agrega la entrada con prompts y cambios a IA.md
> - Si el mensaje de error que se debe agregar está relacionado con problemas de conexión con la API (Bad Response, No network, etc), evidentemente no se puede acceder a la API, por tanto puedes hardcodear ese mensaje de error
> - La estructura de la API está en la colección de Postman, la estructura visual de la Pagina en Figma y el proyecto en Github

### Respuesta y resumen de cambios

- Se confirmó en `main` la existencia de `IniciarSesion`, `FormularioSesion`, `useMutacion`, `solicitarPost` y textos recibidos desde `useTextos` en `App`. Se modificaron únicamente los módulos necesarios para esta historia.
- **Postman:** colección «Sintonía API» (UID `58842877-a5dad643-4a2e-43d9-ba42-b73b66dae76b`), solicitud `POST /sesion`. Un 401 responde con `error.codigo=credenciales_invalidas`, idéntico si falló correo o clave. Un 429 devuelve `error.codigo=demasiadas_peticiones` y `Retry-After`. El ejemplo guardado muestra 1447 segundos en la cabecera y 287 en `error.detalles.reintentarEnSegundos`: **la cabecera tiene prioridad**. Se admite fecha HTTP en la cabecera y, solo cuando falta, segundos del cuerpo.
- **Figma:** Sprint 2, «Errores, carga y contraseña visible». Referencias web: `676:1931` (cargando), `676:2190` (credenciales incorrectas), `676:2452` (error de conexión). Móvil: `678:2626`, `678:2770`, `678:2918`, respectivamente. Se respetan panel, aviso de error antes de los campos, spinner del botón y composición responsive.
- **Textos de API:** se consultan únicamente las props recibidas desde `App/useTextos`: `paginas.ingresar.formulario.mensajes.ingresando`, `paginas.ingresar.errores.credenciales`, `paginas.ingresar.errores.demasiadosIntentos`, `paginas.ingresar.errores.conexion` y su `botones.reintentar`. El contador interpolado usa `{segundos}`. La utilidad pura `src/utils/erroresIngreso.js` no inventa textos.
- **Transporte:** `src/utils/peticionPost.js` adjunta `status`, `codigo`, `retryAfterSegundos` a los errores HTTP. Los fallos de conexión tienen `tipo='conexion'`. Se conserva la petición JSON `{correo,clave}` y las cookies `credentials:include`.
- **Hook:** `useMutacion` impide solicitudes POST simultáneas, activa contador basado en `Date.now()` tras un 429 y desbloquea automáticamente al finalizar los segundos de espera. El bloqueo se aplica también a campos, ojo, casilla y botón; las credenciales no se borran.
- **Formulario:** el botón muestra el texto API «Ingresando…» y spinner mientras se envía. En 401 se presenta un único bloque `role=alert` general, sin identificar correo o clave. En 429 el bloque utiliza `role=status` para anunciar la cuenta regresiva. Si falla la red se presenta el aviso de conexión API y el botón de envío se convierte en «Reintentar», conservando correo y clave.
- Las validaciones de campos obligatorios y el retorno al inicio tras una respuesta exitosa de sesión se mantienen. No se agregaron rutas ni textos de registro/recuperación de contraseña.
- **Verificación:** `tests/erroresIngreso.test.js` cubre parsing de cabecera, HTTP 401/429, prioridad sobre el cuerpo, fecha HTTP, sin red, mensajes de API, interacción de envío y estilos. `.github/workflows/s2-04-validation.yml` ejecuta `npm test` y `npm run build` sobre `S2-04`.

### Límites y evidencia

Los JSON de 401 y 429 se verificaron en las **respuestas guardadas de Postman** (contrato, no petición de inicio de sesión en vivo). Los textos visibles de la sección de ingreso se cotejaron con los JSON públicos de `/textos` obtenidos previamente en una ejecución HTTP real de GitHub Actions, sin utilizar credenciales reales para probar errores en producción.
