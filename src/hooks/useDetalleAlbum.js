import useRecurso from './useRecurso.js';
import { normalizarDetalleAlbum } from '../utils/detalleAlbum.js';

/** El detalle se consulta por id de ruta; no envía filtros no admitidos por la API. */
export default function useDetalleAlbum(id) {
  const { datos, ...estado } = useRecurso(
    '/albumes/' + encodeURIComponent(String(id ?? '')),
    {},
    Boolean(id),
  );

  return { ...normalizarDetalleAlbum(datos), ...estado };
}
