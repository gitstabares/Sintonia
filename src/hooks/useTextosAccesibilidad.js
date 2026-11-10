import useRecurso from './useRecurso.js';
import { extraerTextosAccesibilidad } from '../utils/textosAccesibilidad.js';

export default function useTextosAccesibilidad(idioma) {
  const { datos, cargando, error, recargar } = useRecurso('/textos', {
    seccion: 'accesibilidad',
    idioma,
  });
  return {
    textos: { accesibilidad: extraerTextosAccesibilidad(datos) },
    cargando,
    error,
    recargar,
  };
}
