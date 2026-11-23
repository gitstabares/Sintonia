import { useEffect } from 'react';
import { obtenerMetadatosAlbum } from '../utils/detalleAlbum.js';

/**
 * Equivalente SPA a generateMetadata: en Vite se actualiza el <head> al
 * obtener el álbum. Se restaura al salir para no contaminar otras rutas.
 */
export default function useMetadatosAlbum(album) {
  const titulo = album?.titulo;
  const artista = album?.artista?.nombre;

  useEffect(() => {
    const metadatos = obtenerMetadatosAlbum({ titulo, artista: { nombre: artista } });
    if (!metadatos) return undefined;

    const tituloAnterior = document.title;
    let descripcion = document.head.querySelector('meta[name="description"]');
    const creada = !descripcion;
    if (creada) {
      descripcion = document.createElement('meta');
      descripcion.name = 'description';
      document.head.appendChild(descripcion);
    }
    const descripcionAnterior = descripcion.getAttribute('content');

    document.title = metadatos.title;
    descripcion.setAttribute('content', metadatos.description);

    return () => {
      document.title = tituloAnterior;
      if (creada) descripcion.remove();
      else if (descripcionAnterior === null) descripcion.removeAttribute('content');
      else descripcion.setAttribute('content', descripcionAnterior);
    };
  }, [titulo, artista]);
}
