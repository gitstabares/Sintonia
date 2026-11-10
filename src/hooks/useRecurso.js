import { useCallback, useEffect, useState } from 'react';
import { crearUrlRecurso } from '../utils/api.js';

const API_BASE = import.meta.env.VITE_API_URL;

export default function useRecurso(ruta, parametros = {}, activo = true) {
  const url = crearUrlRecurso(API_BASE, ruta, parametros);
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(activo);
  const [error, setError] = useState(null);
  const [intento, setIntento] = useState(0);
  const recargar = useCallback(() => setIntento(valor => valor + 1), []);

  useEffect(() => {
    if (!activo) {
      setDatos(null);
      setCargando(false);
      setError(null);
      return undefined;
    }
    const controlador = new AbortController();
    const temporizador = setTimeout(() => controlador.abort(), 12000);
    let vigente = true;
    setCargando(true);
    setError(null);
    setDatos(null);

    async function cargar() {
      try {
        const respuesta = await fetch(url, { signal: controlador.signal });
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
        const contenido = await respuesta.json();
        if (vigente) setDatos(contenido?.datos ?? contenido);
      } catch (fallo) {
        if (vigente) setError(fallo.name === 'AbortError' ? new Error('Tiempo de espera agotado') : fallo);
      } finally {
        clearTimeout(temporizador);
        if (vigente) setCargando(false);
      }
    }

    cargar();
    return () => {
      vigente = false;
      clearTimeout(temporizador);
      controlador.abort();
    };
  }, [url, intento, activo]);

  return { datos, cargando, error, recargar };
}
