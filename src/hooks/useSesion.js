import { useCallback, useEffect, useRef, useState } from 'react';
import {
  eliminarSesion, obtenerSesion, habiaSesionConfirmada,
  marcarSesionConfirmada, limpiarIdentidadObsoleta,
} from '../utils/peticionesSesion.js';

const API_BASE = import.meta.env.VITE_API_URL;
const almacenamiento = () => {
  try { return window.sessionStorage; } catch { return null; }
};

/**
 * La sesión solo es válida después de GET /sesion con credentials:include.
 * POST /sesion es responsable de que el servidor cree la cookie httpOnly.
 */
export default function useSesion(onExpirada) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [saliendo, setSaliendo] = useState(false);
  const [errorCierre, setErrorCierre] = useState(null);
  const activa = useRef(false);
  const usuarioActual = useRef(null);
  const ultimoIntento = useRef(0);
  const cierreEnCurso = useRef(false);
  const expiradaRef = useRef(onExpirada);
  expiradaRef.current = onExpirada;

  const verificar = useCallback(async ({ silencioso = false, exigirSesion = false } = {}) => {
    const intento = ++ultimoIntento.current;
    if (!silencioso && activa.current) setCargando(true);
    try {
      const cuenta = await obtenerSesion(API_BASE);
      if (activa.current && intento === ultimoIntento.current) {
        usuarioActual.current = cuenta;
        setUsuario(cuenta);
        setError(null);
        marcarSesionConfirmada(almacenamiento(), true);
      }
      return cuenta;
    } catch (fallo) {
      if (activa.current && intento === ultimoIntento.current) {
        const expiro = fallo.status === 401 &&
          (fallo.codigo === 'no_autenticado' || !fallo.codigo);
        const huboSesion = Boolean(usuarioActual.current) ||
          habiaSesionConfirmada(almacenamiento());
        usuarioActual.current = null;
        setUsuario(null);
        if (expiro) {
          marcarSesionConfirmada(almacenamiento(), false);
          setError(null); // Un visitante sin cookie no es un fallo del sitio.
          if (huboSesion && !exigirSesion) expiradaRef.current?.();
        } else {
          // Error de conexión o respuesta inesperada: no simular sesión activa.
          setError(fallo);
        }
      }
      if (exigirSesion) throw fallo;
      return null;
    } finally {
      if (activa.current && intento === ultimoIntento.current && !silencioso) {
        setCargando(false);
      }
    }
  }, []);

  useEffect(() => {
    activa.current = true;
    limpiarIdentidadObsoleta(almacenamiento(), (() => {
      try { return window.localStorage; } catch { return null; }
    })());
    verificar().catch(() => {});
    return () => {
      activa.current = false;
      ultimoIntento.current++;
    };
  }, [verificar]);

  // Al volver a la pestaña se comprueba si la cookie sigue siendo válida.
  useEffect(() => {
    const revisar = () => {
      if (usuarioActual.current && !cierreEnCurso.current) {
        verificar({ silencioso: true }).catch(() => {});
      }
    };
    window.addEventListener('focus', revisar);
    const visible = () => { if (document.visibilityState === 'visible') revisar(); };
    document.addEventListener('visibilitychange', visible);
    return () => {
      window.removeEventListener('focus', revisar);
      document.removeEventListener('visibilitychange', visible);
    };
  }, [verificar]);

  const confirmarIngreso = useCallback(async () => {
    // No se confía en el usuario ni en el token del POST para la identidad UI.
    return verificar({ silencioso: true, exigirSesion: true });
  }, [verificar]);

  const cerrar = useCallback(async () => {
    if (cierreEnCurso.current) return false;
    cierreEnCurso.current = true;
    setSaliendo(true);
    setErrorCierre(null);
    try {
      await eliminarSesion(API_BASE);
      ultimoIntento.current++; // Un GET en curso no puede restaurar sesión cerrada.
      usuarioActual.current = null;
      setUsuario(null);
      setError(null);
      marcarSesionConfirmada(almacenamiento(), false);
      return true;
    } catch (fallo) {
      // Mantener la cuenta en pantalla: la cookie podría seguir siendo válida.
      if (activa.current) setErrorCierre(fallo);
      return false;
    } finally {
      cierreEnCurso.current = false;
      if (activa.current) setSaliendo(false);
    }
  }, []);

  return {
    usuario, cargando, error, verificar,
    confirmarIngreso, cerrar, saliendo, errorCierre,
  };
}
