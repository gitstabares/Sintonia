import useRecurso from './useRecurso.js';

/** GET /generos o GET /generos/:gen_id; sin query parameters inventados. */
export default function useGeneros(gen_id = '', activo = true) {
  const ruta = gen_id ? '/generos/' + encodeURIComponent(gen_id) : '/generos';
  const { datos, ...estado } = useRecurso(ruta, {}, activo);
  return { generos: datos, ...estado };
}
