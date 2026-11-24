/** Secciones válidas del contrato GET /textos documentado en Postman. */
const SECCIONES = [
  'sitio', 'navbar', 'menuMovil', 'footer', 'panel', 'paginas',
  'componentes', 'formularios', 'estados', 'errores', 'cookies',
  'accesibilidad', 'idioma', 'general',
];

/**
 * La API acepta ?seccion y puede responder con una sola sección.
 * Una respuesta parcial pero válida NO debe activar textos hardcodeados.
 */
export function validarTextos(respuesta) {
  const textos = respuesta?.textos ?? respuesta;
  if (!textos || typeof textos !== 'object' || Array.isArray(textos)
    || !SECCIONES.some(clave =>
      textos[clave] !== null && typeof textos[clave] === 'object'
        && !Array.isArray(textos[clave]))) {
    throw new Error('La API no devolvió un objeto de textos válido.');
  }
  return textos;
}
