import useTextos from './hooks/useTextos.js';
import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import LayoutPublico from './layouts/LayoutPublico.jsx';
import Home from './pages/Home/Home.jsx';
import Catalogo from './pages/Catalogo/Catalogo.jsx';
import NoEncontrada from './pages/NoEncontrada.jsx';
import { leerConsentimiento, leerIdioma, guardarIdioma, guardarConsentimiento, reiniciarConsentimiento } from './utils/preferencias.js';
import { PREFERENCIAS_ACCESIBILIDAD, leerAccesibilidad, guardarAccesibilidad, aplicarAccesibilidad } from './utils/accesibilidad.js';

const almacenamiento = () => {
  try { return window.localStorage; } catch { return null; }
};

export default function App() {
  const [consentimiento, setConsentimiento] = useState(() => leerConsentimiento(almacenamiento()));
  const [idioma, setIdioma] = useState(() => leerIdioma(almacenamiento()));
  const [preferenciasAccesibilidad, setPreferenciasAccesibilidad] = useState(
    () => leerAccesibilidad(almacenamiento(), leerConsentimiento(almacenamiento())),
  );
  const datos = useTextos(idioma);
  const en = idioma === 'en';
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

  const restablecerAccesibilidad = () => setPreferenciasAccesibilidad({ ...PREFERENCIAS_ACCESIBILIDAD });

  return (
    <Routes>
      <Route path="/" element={
        <LayoutPublico
          datos={datos}
          en={en}
          alternarIdioma={() => setIdioma(actual => actual === 'en' ? 'es' : 'en')}
          preferenciasAccesibilidad={preferenciasAccesibilidad}
          alternarAccesibilidad={alternarAccesibilidad}
          restablecerAccesibilidad={restablecerAccesibilidad}
          consentimiento={consentimiento}
          guardarConsentimiento={decidirCookies}
          cambiarCookies={cambiarCookies}
          enlaces={enlaces}
        />
      }>
        <Route index element={<Home datos={datos} en={en} enlaces={enlaces} />} />
        <Route path="catalogo/:gen_id?" element={<Catalogo datos={datos} en={en} enlaces={enlaces} />} />
        <Route path="*" element={<NoEncontrada en={en} />} />
      </Route>
    </Routes>
  );
}
