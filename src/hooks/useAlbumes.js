import useRecurso from './useRecurso';

export default function useAlbumes(limite = 6, orden = 'populares', filtros = {}) {
  const { datos, ...estado } = useRecurso('/albumes', { orden, limite, ...filtros });
  return { albumes: datos, ...estado };
}
