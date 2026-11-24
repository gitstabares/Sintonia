import './App.css';
import useTextos from './hooks/useTextos.js';
import EstadoPeticion from './components/EstadoPeticion/EstadoPeticion.jsx';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
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
  const { pathname } = useLocation();
  // Único punto de lectura de /textos: compartido entre todas las rutas.
  const resultadoTextos = useTextos(idioma);
  const datos = resultadoTextos;
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

  useEffect(() => {
    if (!datos.textos) return;
    const textos = datos.textos;
    const seo = pathname === '/'
      ? textos.paginas?.inicioPublico?.seo
      : pathname.startsWith('/catalogo')
        ? textos.paginas?.catalogo?.seo
        : pathname === '/iniciarSesion'
          ? textos.paginas?.ingresar?.seo
          : pathname.startsWith('/albumes/')
            ? null
            : { titulo: textos.estados?.noEncontrado?.titulo };
    if (!seo) return; // Los metadatos del álbum pertenecen a su página.
    if (seo.titulo) document.title = seo.titulo;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', seo.descripcion ?? '');
  }, [pathname, datos.textos]);
  const configuracion = {
    idioma, en, enlaces, datos,
    textosAccesibilidad: { accesibilidad: datos.textos?.accesibilidad },
    alternarIdioma: () => setIdioma(actual => actual === 'en' ? 'es' : 'en'),
    preferenciasAccesibilidad,
    alternarAccesibilidad, cambiarTamanoTexto, restablecerAccesibilidad,
    consentimiento, guardarConsentimiento: decidirCookies, cambiarCookies,
    sesion, iniciarSesion, cerrarSesion,
  };

  // Sin los textos de la API no se montan páginas ni controles de navegación.
  if (datos.cargando || datos.error || !datos.textos) {
    return (
      <main className="sitio">
        <EstadoPeticion falloTextos cargando={datos.cargando && !datos.error} />
      </main>
    );
  }

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
