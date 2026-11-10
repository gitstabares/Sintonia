import useTextos from './hooks/useTextos.js';
import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import LayoutPublico from './layouts/LayoutPublico.jsx';
import Home from './pages/Home/Home.jsx';
import Catalogo from './pages/Catalogo/Catalogo.jsx';
import { leerConsentimiento, leerIdioma, guardarIdioma, guardarConsentimiento, reiniciarConsentimiento } from './utils/preferencias.js';

const almacenamiento = () => {
  try { return window.localStorage; } catch { return null; }
};

export default function App() {
  const [consentimiento, setConsentimiento] = useState(() => leerConsentimiento(almacenamiento()));
  const [idioma, setIdioma] = useState(() => leerIdioma(almacenamiento()));
  const [textoGrande, setTextoGrande] = useState(false);
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
    document.documentElement.style.fontSize = textoGrande ? '112%' : '';
    return () => { document.documentElement.style.fontSize = ''; };
  }, [textoGrande]);

  const decidirCookies = acepta => setConsentimiento(guardarConsentimiento(almacenamiento(), acepta));
  const cambiarCookies = () => {
    reiniciarConsentimiento(almacenamiento());
    setConsentimiento(null);
  };

  return (
    <div className="sitio">
      <Routes>
        <Route path="/" element={
          <LayoutPublico datos={datos} en={en} textoGrande={textoGrande}
            alternarIdioma={() => setIdioma(actual => actual === 'en' ? 'es' : 'en')}
            alternarTexto={() => setTextoGrande(actual => !actual)}
            consentimiento={consentimiento} guardarConsentimiento={decidirCookies}
            cambiarCookies={cambiarCookies} enlaces={enlaces} />
        }>
          <Route index element={<Home datos={datos} en={en} enlaces={enlaces} />} />
          <Route path="catalogo/:gen_id?" element={<Catalogo datos={datos} en={en} enlaces={enlaces} />} />
        </Route>
      </Routes>
    </div>
  );
}
