import useRecurso from './useRecurso.js';

export default function useGeneros(gen_id = '', filtros = {}, activo = true) {
  const ruta = gen_id ? `/generos/${encodeURIComponent(gen_id)}` : '/generos';
  const { datos, ...estado } = useRecurso(ruta, filtros, activo);
  return { generos: datos, ...estado };
}
