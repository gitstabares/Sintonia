import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL + '/generos';

function useGeneros() {
  const [generos, setGeneros] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const controlador = new AbortController();
    
    // CORRECCIÓN 1: Renombramos esto. Antes se llamaba 'limite' y 
    // sobrescribía tu parámetro 'limite=6' con el ID del temporizador.
    const temporizador = setTimeout(() => controlador.abort(), 12000); 
    
    let vigente = true;
    setCargando(true);
    setError(false);
    setGeneros(null);

    async function cargarGeneros() { 
      try {
        const respuesta = await fetch(`${API}`, {
          signal: controlador.signal,
        });
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
        
        const datos = await respuesta.json();
        if (vigente) setGeneros(datos?.datos);
      } catch (error) {
        if (vigente) {
          console.error("Error al cargar los generos:", error);
          setError(true);
        }
      } finally {
        clearTimeout(temporizador);
        if (vigente) setCargando(false);
      }
    }

    cargarGeneros();
    return () => {
      vigente = false;
      clearTimeout(temporizador);
      controlador.abort();
    };
  }, [intento]); 

  return {
    generos,
    cargando,
    error,
    recargar: () => setIntento((valor) => valor + 1),
  };
}

export default useGeneros;