import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL + '/textos';

function validarTextos(datos) {
  const textos = datos?.textos;

  const nav = textos?.navbar;
  const etiquetas_navbar = [
    nav?.logo?.texto,
    nav?.logo?.aria,
    nav?.buscador?.placeholder,
    nav?.buscador?.borrar,
    nav?.botones?.invitado?.ingresar,
    nav?.botones?.invitado?.crearCuenta,
    nav?.botones?.conSesion?.idiomaYAccesibilidad,
    nav?.aria?.navegacion,
    nav?.aria?.idioma,
    nav?.aria?.accesibilidad,
    textos?.menuMovil?.abrir,
    textos?.menuMovil?.cerrar,
  ];

  if (!etiquetas_navbar.every((valor) => typeof valor === "string" && valor.trim())) {
    throw new Error("La respuesta no contiene los textos del navbar.");
  }

  const banner = textos?.cookies?.banner;
  const etiquetas_aviso_cookies = [
    banner?.titulo,
    banner?.texto,
    banner?.botones?.rechazar,
    banner?.botones?.aceptar,
  ]

  if (!etiquetas_aviso_cookies.every((valor) => typeof valor === "string" && valor.trim())) {
    throw new Error("La respuesta no contiene los textos del aviso de cookies.");
  }  
  return textos;
}

function useTextos(idioma) {
  const [textos, setTextos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const controlador = new AbortController();
    const limite = setTimeout(() => controlador.abort(), 12000);
    let vigente = true;
    setCargando(true);
    setError(false);
    setTextos(null);

    async function cargarTextosNavbar() {
      try {
        const respuesta = await fetch(`${API}?idioma=${idioma}`, {
          signal: controlador.signal,
        });
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
        //Si si respondio los datos correctamente
        const datos = await respuesta.json();
        const nuevosTextos = validarTextos(datos);
        if (vigente) setTextos(nuevosTextos);
      } catch (error) {
        if (vigente) {
          console.error("Error al cargar los textos:", error);
          setError(true);
        }
      } finally {
        clearTimeout(limite);
        if (vigente) setCargando(false);
      }
    }

    cargarTextosNavbar();
    return () => {
      vigente = false;
      clearTimeout(limite);
      controlador.abort();
    };
  }, [idioma, intento]);

  return {
    textos,
    cargando,
    error,
    recargar: () => setIntento((valor) => valor + 1),
  };
}

export default useTextos;