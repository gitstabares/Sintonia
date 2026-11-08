import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL + '/albumes';

function useAlbumes(limite = 6, orden = 'populares') {
  const [albumes, setAlbumes] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const controlador = new AbortController();
    const temporizador = setTimeout(() => controlador.abort(), 12000); 
    
    let vigente = true;
    setCargando(true);
    setError(false);
    setAlbumes(null);

    async function cargarAlbumes() { 
      try {
        const respuesta = await fetch(`${API}?orden=${orden}&limite=${limite}`, {
          signal: controlador.signal,
        });
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
        
        const datos = await respuesta.json();
        if (vigente) setAlbumes(datos?.datos ?? datos);
      } catch (error) {
        if (vigente) {
          console.error("Error al cargar los albumes:", error);
          setError(true);
        }
      } finally {
        clearTimeout(temporizador);
        if (vigente) setCargando(false);
      }
    }

    cargarAlbumes();
    return () => {
      vigente = false;
      clearTimeout(temporizador);
      controlador.abort();
    };
  }, [intento, limite, orden]); 

  return {
    albumes,
    cargando,
    error,
    recargar: () => setIntento((valor) => valor + 1),
  };
}

export default useAlbumes;