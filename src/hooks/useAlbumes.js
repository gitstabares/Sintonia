import useRecurso from './useRecurso.js';

/**
 * GET /albumes no acepta parámetros de filtro/orden/paginación.
 * El recorte de la lista se realiza en la página, no en el request.
 */
export default function useAlbumes(activo = true) {
  const { datos, ...estado } = useRecurso('/albumes', {}, activo);
  return { albumes: datos, ...estado };
}
