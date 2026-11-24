import { useCallback, useEffect, useState } from "react";
import { crearUrlRecurso } from "../utils/api.js";

const API_BASE = import.meta.env.VITE_API_URL;

export default function useRecurso(ruta, parametros = {}, activo = true) {
  const url = crearUrlRecurso(API_BASE, ruta, parametros);
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(activo);
  const [error, setError] = useState(null);
  const [statusCode, setStatusCode] = useState(0);
  const [intento, setIntento] = useState(0);
  const recargar = useCallback(() => setIntento((valor) => valor + 1), []);

  useEffect(() => {
    if (!activo) {
      setDatos(null);
      setCargando(false);
      setError(null);
      setStatusCode(0);
      return undefined;
    }
    const controlador = new AbortController();
    const temporizador = setTimeout(() => controlador.abort(), 12000);
    let vigente = true;
    setCargando(true);
    setError(null);
    setStatusCode(0);
    setDatos(null);

    async function cargar() {
      try {
        const respuesta = await fetch(url, { signal: controlador.signal });
        if (!respuesta.ok) {
          const fallo = new Error(`HTTP ${respuesta.status}`);
          fallo.status = respuesta.status;
          // El código del backend (si existe) permite resolver mensajes de /textos.
          try {
            const cuerpo = await respuesta.json();
            fallo.codigo = cuerpo?.codigo ?? cuerpo?.error?.codigo ?? cuerpo?.error;
          } catch { /* Algunos errores no incluyen cuerpo JSON. */ }
          throw fallo;
        }
        const contenido = await respuesta.json();
        if (vigente) {
          setStatusCode(respuesta.status);
          setDatos(contenido?.datos ?? contenido);
        }
      } catch (fallo) {
        if (vigente) {
          setStatusCode(fallo.status ?? 0);
          setError(
            fallo.name === "AbortError"
              ? Object.assign(new Error("Tiempo de espera agotado"), { status: 0 })
              : fallo,
          );
        }
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

  return { datos, cargando, error, statusCode, recargar };
}
