import useTextos from "./hooks/useTextos.js";
import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LayoutPublico from "./layouts/LayoutPublico.jsx";
import Home from "./pages/Home/Home.jsx";
import Catalogo from "./pages/Catalogo/Catalogo.jsx";

const CLAVE_CONSENTIMIENTO = 'sintonia-consentimiento';
const CLAVE_IDIOMA = 'sintonia-idioma';

function leerConsentimiento() {
  try {
    const valor = localStorage.getItem(CLAVE_CONSENTIMIENTO);
    return valor === 'aceptado' || valor === 'rechazado' ? valor : null;
  } catch {
    return null;
  }
}

function leerIdioma() {
  try {
    return localStorage.getItem(CLAVE_CONSENTIMIENTO) === 'aceptado' && localStorage.getItem(CLAVE_IDIOMA) === 'en' ? 'en' : 'es';
  } catch {
    return 'es';
  }
}

function App() {
  const [consentimiento, setConsentimiento] = useState(leerConsentimiento);
  const [idioma, setIdioma] = useState(leerIdioma);
  const [textoGrande, setTextoGrande] = useState(false);
  const datos = useTextos(idioma);
  const en = idioma === 'en';
  const enlaces = {
    inicio: '/',
    catalogo: '/catalogo',
    ingresar: '/iniciarSesion',
    crearCuenta: '/crearCuenta',
    terminos: '/terminos',
    accesibilidad: '/accesibilidad'
  };

  useEffect(() => {
    document.documentElement.lang = idioma;
    try {
      if (consentimiento === 'aceptado') localStorage.setItem(CLAVE_IDIOMA, idioma);
      else localStorage.removeItem(CLAVE_IDIOMA);
    } catch {
      // La interfaz sigue funcionando aunque el almacenamiento esté bloqueado.
    }
  }, [idioma, consentimiento]);

  useEffect(() => {
    document.documentElement.style.fontSize = textoGrande ? '112%' : '';
    return () => { document.documentElement.style.fontSize = ''; };
  }, [textoGrande]);

  function guardarConsentimiento(aceptar) {
    const nuevo = aceptar ? 'aceptado' : 'rechazado';
    setConsentimiento(nuevo);
    try {
      localStorage.setItem(CLAVE_CONSENTIMIENTO, nuevo);
      if (!aceptar) localStorage.removeItem(CLAVE_IDIOMA);
    } catch {
      // Se mantiene la decisión durante la sesión actual.
    }
  }

  return (
    <div className="sitio">
      <Routes>
        <Route path="/" element={<LayoutPublico
          datos={datos}
          en={en}
          alternarIdioma={() => setIdioma(actual => actual === 'en' ? 'es' : 'en')}
          alternarTexto={() => setTextoGrande(actual => !actual)}
          consentimiento={consentimiento}
          guardarConsentimiento={guardarConsentimiento}
          enlaces={enlaces}
        />}>
          <Route index element={<Home datos={datos} en={en} enlaces={enlaces} />} />
          <Route path="catalogo/:gen_id?" element={<Catalogo datos={datos} en={en} enlaces={enlaces} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
