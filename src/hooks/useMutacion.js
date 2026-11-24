import { useCallback, useEffect, useRef, useState } from 'react';
import { solicitarPost } from '../utils/peticionPost.js';

const API_BASE = import.meta.env.VITE_API_URL;

/** POST bajo demanda, sin ejecutar la mutación al montar el componente. */
export default function useMutacion(ruta) {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const controlador = useRef(null);
  const vigente = useRef(true);

  useEffect(() => {
    vigente.current = true;
    return () => {
      vigente.current = false;
      controlador.current?.abort();
    };
  }, []);

  const ejecutar = useCallback(async cuerpo => {
    controlador.current?.abort();
    const actual = new AbortController();
    controlador.current = actual;
    const espera = setTimeout(() => actual.abort(), 12000);

    setCargando(true);
    setDatos(null);
    setError(null);

    try {
      const resultado = await solicitarPost(API_BASE, ruta, cuerpo, { signal: actual.signal });
      if (vigente.current && controlador.current === actual) setDatos(resultado);
      return resultado;
    } catch (fallo) {
      const normalizado = fallo?.name === 'AbortError'
        ? new Error('Tiempo de espera agotado') : fallo;
      if (vigente.current && controlador.current === actual) setError(normalizado);
      throw normalizado;
    } finally {
      clearTimeout(espera);
      if (controlador.current === actual) {
        controlador.current = null;
        if (vigente.current) setCargando(false);
      }
    }
  }, [ruta]);

  return { datos, cargando, error, ejecutar };
}
