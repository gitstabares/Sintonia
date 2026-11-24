import './App.css';
import useTextos from './hooks/useTextos.js';
import useTextosAccesibilidad from './hooks/useTextosAccesibilidad.js';
import { textosRespaldo } from './utils/textosInterfaz.js';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Catalogo from './pages/Catalogo/Catalogo.jsx';
import NoEncontrada from './pages/NoEncontrada.jsx';
import DetalleAlbum from './pages/DetalleAlbum/DetalleAlbum.jsx';
import IniciarSesion from './pages/IniciarSesion/IniciarSesion.jsx';
import { leerSesion, guardarSesion, limpiarSesion } from './utils/sesion.js';
import { leerConsentimiento, leerIdioma, guardarIdioma, guardarConsentimiento, reiniciarConsentimiento } from './utils/preferencias.js';
import { PREFERENCIAS_ACCESIBILIDAD, leerAccesibilidad, guardarAccesibilidad, aplicarAccesibilidad, ajustarTamanoTexto } from './utils/accesibilidad.js';

const almacenamiento = () => {
  try { return window.localStorage; } catch { return null; }
};

const almacenamientoSesion = () => {
  try { return window.sessionStorage; } catch { return null; }
};

export default function App() {
  const [consentimiento, setConsentimiento] = useState(() => leerConsentimiento(almacenamiento()));
  const [idioma, setIdioma] = useState(() => leerIdioma(almacenamiento()));
  const [sesion, setSesion] = useState(() => leerSesion(almacenamientoSesion(), almacenamiento()));
  const [preferenciasAccesibilidad, setPreferenciasAccesibilidad] = useState(
    () => leerAccesibilidad(almacenamiento(), leerConsentimiento(almacenamiento())),
  );
  const en = idioma === 'en';
  // Único punto de lectura de /textos: compartido entre todas las rutas.
  const resultadoTextos = useTextos(idioma);
  const accesibilidad = useTextosAccesibilidad(idioma);
  const datos = {
    ...resultadoTextos,
    textos: resultadoTextos.error
      ? textosRespaldo(idioma)
      : resultadoTextos.textos,
  };
  const enlaces = {
    inicio: '/', catalogo: '/catalogo', ingresar: '/iniciarSesion',
    crearCuenta: '/crearCuenta', terminos: '/terminos', accesibilidad: '/accesibilidad'
  };

  useEffect(() => {
    document.documentElement.lang = idioma;
    guardarIdioma(almacenamiento(), idioma, consentimiento);
  }, [idioma, consentimiento]);

  useEffect(() => {
    aplicarAccesibilidad(document.documentElement, preferenciasAccesibilidad);
    guardarAccesibilidad(almacenamiento(), preferenciasAccesibilidad, consentimiento);
  }, [preferenciasAccesibilidad, consentimiento]);

  useEffect(() => () => {
    aplicarAccesibilidad(document.documentElement, PREFERENCIAS_ACCESIBILIDAD);
  }, []);

  const decidirCookies = acepta => setConsentimiento(guardarConsentimiento(almacenamiento(), acepta));
  const cambiarCookies = () => {
    reiniciarConsentimiento(almacenamiento());
    setConsentimiento(null);
  };

  const alternarAccesibilidad = clave => {
    if (!Object.hasOwn(PREFERENCIAS_ACCESIBILIDAD, clave)) return;
    setPreferenciasAccesibilidad(actual => ({ ...actual, [clave]: !actual[clave] }));
  };

  const cambiarTamanoTexto = direccion => {
    setPreferenciasAccesibilidad(actual => ({
      ...actual,
      tamanoTexto: ajustarTamanoTexto(actual.tamanoTexto, direccion),
    }));
  };

  const restablecerAccesibilidad = () => setPreferenciasAccesibilidad({ ...PREFERENCIAS_ACCESIBILIDAD });

  const iniciarSesion = (identidad, recordar) => {
    guardarSesion(identidad, recordar, almacenamientoSesion(), almacenamiento());
    setSesion(identidad);
  };

  const cerrarSesion = () => {
    limpiarSesion(almacenamientoSesion(), almacenamiento());
    setSesion(null);
  };

  // Los textos y las preferencias son globales; las demás consultas siguen en cada página.
  const configuracion = {
    idioma, en, enlaces, datos,
    textosAccesibilidad: accesibilidad.textos,
    alternarIdioma: () => setIdioma(actual => actual === 'en' ? 'es' : 'en'),
    preferenciasAccesibilidad,
    alternarAccesibilidad, cambiarTamanoTexto, restablecerAccesibilidad,
    consentimiento, guardarConsentimiento: decidirCookies, cambiarCookies,
    sesion, iniciarSesion, cerrarSesion,
  };

  return (
    <Routes>
      <Route path="/" element={<Home configuracion={configuracion} />} />
      <Route path="/catalogo" element={<Catalogo configuracion={configuracion} />} />
      <Route path="/catalogo/:gen_id" element={<Catalogo configuracion={configuracion} />} />
      <Route path="/albumes/:id" element={<DetalleAlbum configuracion={configuracion} />} />
      <Route path="/iniciarSesion" element={<IniciarSesion configuracion={configuracion} />} />
      <Route path="*" element={<NoEncontrada configuracion={configuracion} />} />
    </Routes>
  );
}
