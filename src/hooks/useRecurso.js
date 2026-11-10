import { useCallback, useEffect, useState } from 'react';

const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export default function useRecurso(ruta, parametros = {}) {
  const consulta = new URLSearchParams(
    Object.entries(parametros).filter(([, valor]) => valor !== undefined && valor !== null && valor !== '')
  ).toString();
  const url = `${API_BASE}${ruta}${consulta ? `?${consulta}` : ''}`;
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [intento, setIntento] = useState(0);
  const recargar = useCallback(() => setIntento(valor => valor + 1), []);

  useEffect(() => {
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
        if (vigente) setError(fallo);
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
  }, [url, intento]);

  return { datos, cargando, error, recargar };
}
