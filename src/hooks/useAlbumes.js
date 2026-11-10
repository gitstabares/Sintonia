import useRecurso from './useRecurso.js';

export default function useAlbumes(limite = 6, orden = 'populares', filtros = {}, activo = true) {
  const { datos, ...estado } = useRecurso('/albumes', { orden, limite, ...filtros }, activo);
  return { albumes: datos, ...estado };
}
