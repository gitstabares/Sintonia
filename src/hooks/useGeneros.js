import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL + '/generos';

function useGeneros(gen_id='') {
  const [generos, setGeneros] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const controlador = new AbortController();
    const temporizador = setTimeout(() => controlador.abort(), 12000); 
    
    let vigente = true;
    setCargando(true);
    setError(false);
    setGeneros(null);

    async function cargarGeneros() { 
      try {
        const respuesta = await fetch(`${API}/${gen_id}`, {
          signal: controlador.signal,
        });
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
        
        const datos = await respuesta.json();
        if (vigente) setGeneros(datos?.datos ?? datos);
      } catch (error) {
        if (vigente) {
          console.error("Error al cargar los genero(s):", error);
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
  }, [intento, gen_id]); 

  return {
    generos,
    cargando,
    error,
    recargar: () => setIntento((valor) => valor + 1),
  };
}

export default useGeneros;