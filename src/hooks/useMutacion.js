import { useCallback, useEffect, useRef, useState } from 'react';
import { solicitarPost } from '../utils/peticionPost.js';

const API_BASE = import.meta.env.VITE_API_URL;
const segundosHasta = limite => Math.max(0, Math.ceil((limite - Date.now()) / 1000));

/**
 * POST bajo demanda: una sola petición simultánea y bloqueo por Retry-After.
 * Un contador por tiempo absoluto funciona incluso tras suspender la pestaña.
 */
export default function useMutacion(ruta) {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [bloqueoHasta, setBloqueoHasta] = useState(0);
  const [segundosRestantes, setSegundosRestantes] = useState(0);
  const controlador = useRef(null);
  const enCurso = useRef(null);
  const limiteRef = useRef(0);
  const vigente = useRef(true);

  useEffect(() => {
    vigente.current = true;
    return () => {
      vigente.current = false;
      controlador.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (!bloqueoHasta) return undefined;
    const actualizar = () => {
      const quedan = segundosHasta(bloqueoHasta);
      setSegundosRestantes(quedan);
      if (quedan === 0) {
        limiteRef.current = 0;
        setBloqueoHasta(0);
        setError(actual => actual?.status === 429 ? null : actual);
      }
    };
    actualizar();
    const intervalo = setInterval(actualizar, 250);
    return () => clearInterval(intervalo);
  }, [bloqueoHasta]);

  const ejecutar = useCallback(cuerpo => {
    // El segundo envío comparte el resultado; nunca crea otro POST.
    if (enCurso.current) return enCurso.current;
    if (Date.now() < limiteRef.current) {
      return Promise.reject(Object.assign(new Error('HTTP 429'), {
        status: 429, codigo: 'demasiadas_peticiones',
        retryAfterSegundos: segundosHasta(limiteRef.current),
      }));
    }
    const actual = new AbortController();
    controlador.current = actual;
    const tiempoEspera = setTimeout(() => actual.abort(), 12000);
    setCargando(true);
    setDatos(null);
    setError(null);

    const solicitud = (async () => {
      try {
        const resultado = await solicitarPost(API_BASE, ruta, cuerpo, { signal: actual.signal });
        if (vigente.current) setDatos(resultado);
        return resultado;
      } catch (fallo) {
        const normalizado = fallo?.name === 'AbortError'
          ? Object.assign(new Error(fallo.message), { tipo: 'conexion', status: 0 })
          : fallo;
        if (vigente.current) {
          if (normalizado?.status === 429 && normalizado.retryAfterSegundos > 0) {
            const hasta = Date.now() + normalizado.retryAfterSegundos * 1000;
            limiteRef.current = hasta;
            setBloqueoHasta(hasta);
            setSegundosRestantes(segundosHasta(hasta));
          }
          setError(normalizado);
        }
        throw normalizado;
      } finally {
        clearTimeout(tiempoEspera);
        if (controlador.current === actual) controlador.current = null;
        enCurso.current = null;
        if (vigente.current) setCargando(false);
      }
    })();

    enCurso.current = solicitud;
    return solicitud;
  }, [ruta]);

  return {
    datos, cargando, error, ejecutar,
    bloqueado: segundosRestantes > 0, segundosRestantes,
  };
}
