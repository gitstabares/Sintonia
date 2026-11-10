import useRecurso from './useRecurso';

export default function useGeneros(gen_id = '', filtros = {}) {
  const ruta = gen_id ? `/generos/${encodeURIComponent(gen_id)}` : '/generos';
  const { datos, ...estado } = useRecurso(ruta, filtros);
  return { generos: datos, ...estado };
}
