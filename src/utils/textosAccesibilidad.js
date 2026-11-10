// Las tres envolturas son posibles en las respuestas de la API de textos.
// No se fabrica contenido cuando la sección no está disponible.
export function extraerTextosAccesibilidad(respuesta) {
  if (respuesta?.textos?.accesibilidad) return respuesta.textos.accesibilidad;
  if (respuesta?.accesibilidad) return respuesta.accesibilidad;
  if (respuesta?.tamanoTexto) return respuesta;
  return null;
}
