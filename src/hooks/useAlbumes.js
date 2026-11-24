import useRecurso from './useRecurso.js';

/**
 * GET /albumes admite "orden" (populares/recientes) y "limite" (1 a 24).
 * No admite el parámetro arbitrario "filtros".
 * Contrato: colección Postman "Sintonía API", GET /albumes.
 */
export default function useAlbumes(limite = 6, orden = 'populares', activo = true) {
  const { datos, ...estado } = useRecurso('/albumes', { orden, limite }, activo);
  return { albumes: datos, ...estado };
}
