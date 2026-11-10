import useRecurso from './useRecurso.js';

function validarTextos(respuesta) {
  const textos = respuesta?.textos ?? respuesta;
  if (!textos?.navbar || !textos?.paginas || !textos?.cookies?.banner) {
    throw new Error('La API no devolvió los textos esperados.');
  }
  return textos;
}

export default function useTextos(idioma = 'es') {
  const { datos, cargando, error, recargar } = useRecurso('/textos', { idioma });
  let textos = null;
  let errorValidacion = null;
  if (datos !== null) {
    try {
      textos = validarTextos(datos);
    } catch (fallo) {
      errorValidacion = fallo;
    }
  }
  return { textos, cargando, error: error || errorValidacion, recargar };
}
