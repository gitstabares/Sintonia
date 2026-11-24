import useRecurso from './useRecurso.js';
import { validarTextos } from '../utils/validarTextos.js';

export default function useTextos(idioma = 'es') {
  const { datos, cargando, error, recargar, statusCode } = useRecurso('/textos', { idioma });
  let textos = null;
  let errorValidacion = null;
  if (datos !== null) {
    try {
      textos = validarTextos(datos);
    } catch (fallo) {
      errorValidacion = fallo;
    }
  }
  return { textos, cargando, error: error || errorValidacion, statusCode, recargar };
}
