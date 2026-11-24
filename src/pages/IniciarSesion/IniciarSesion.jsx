import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Marca from '../../assets/logos/logo.svg?react';
import ArteSesion from '../../components/ArteSesion/ArteSesion.jsx';
import FormularioSesion from '../../components/FormularioSesion/FormularioSesion.jsx';
import useMutacion from '../../hooks/useMutacion.js';
import { cuerpoInicioSesion, identidadDeSesion } from '../../utils/sesion.js';
import { textosInicioSesion } from '../../utils/textosInicioSesion.js';
import './IniciarSesion.css';

export default function IniciarSesion({ configuracion }) {
  const { en, enlaces, iniciarSesion, datos } = configuracion;
  const textosApi = datos.textos;
  const t = textosInicioSesion(textosApi, en);
  const { ejecutar, cargando, error } = useMutacion('/sesion');
  const navegar = useNavigate();

  useEffect(() => {
    const anterior = document.title;
    document.title = t.titulo + ' | Sintonía';
    return () => { document.title = anterior; };
  }, [t.titulo]);

  const enviarCredenciales = async (credenciales, recordar) => {
    try {
      // Nunca se concede acceso por comparar datos locales: solo por respuesta 2xx.
      const respuesta = await ejecutar(cuerpoInicioSesion(credenciales));
      const identidad = identidadDeSesion(respuesta, credenciales.correo);
      iniciarSesion(identidad, recordar);
      navegar(enlaces.inicio, { replace: true });
    } catch {
      // useMutacion ya expone el fallo; el formulario lo presenta con role="alert".
    }
  };

  const legal = textosApi?.paginas?.iniciarSesion?.pie
    ?? textosApi?.footer?.legal?.derechos?.replace('{anio}', new Date().getFullYear());

  return (
    <main className="pagina-sesion">
      <section className="pagina-sesion__panel-formulario" aria-labelledby="pagina-sesion-titulo">
        <Link className="pagina-sesion__logo" to={enlaces.inicio} aria-label="Sintonía">
          <Marca />
        </Link>
        <div className="pagina-sesion__contenido">
          <header className="pagina-sesion__encabezado">
            <h1 id="pagina-sesion-titulo">{t.titulo}</h1>
            <p className="cuerpo-m">{t.descripcion}</p>
          </header>
          <FormularioSesion
            textos={t}
            enviando={cargando}
            error={error}
            alEnviar={enviarCredenciales}
            enlaceCrearCuenta={enlaces.crearCuenta}
            enlaceRecuperar="/recuperarContrasena"
          />
        </div>
        <p className="pagina-sesion__legal detalle-nota">{legal}</p>
      </section>

      <aside className="pagina-sesion__panel-marca">
        <ArteSesion />
        <div className="pagina-sesion__marca-texto">
          <h2 className="titular-h1">{t.marcaTitulo}</h2>
          <p className="cuerpo-g">{t.marcaDescripcion}</p>
        </div>
      </aside>
    </main>
  );
}
