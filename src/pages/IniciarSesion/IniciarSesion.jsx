import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Marca from '../../assets/logos/logo.svg?react';
import ArteSesion from '../../components/ArteSesion/ArteSesion.jsx';
import FormularioSesion from '../../components/FormularioSesion/FormularioSesion.jsx';
import useMutacion from '../../hooks/useMutacion.js';
import { cuerpoInicioSesion } from '../../utils/sesion.js';
import { textosInicioSesion } from '../../utils/textosInicioSesion.js';
import './IniciarSesion.css';

export default function IniciarSesion({ configuracion }) {
  const { enlaces, iniciarSesion, datos } = configuracion;
  const textosApi = datos.textos;
  const t = textosInicioSesion(textosApi);
  const { ejecutar, cargando, error, bloqueado, segundosRestantes } = useMutacion('/sesion');
  const navegar = useNavigate();
  const [errorConfirmacion, setErrorConfirmacion] = useState(null);

  useEffect(() => {
    const anterior = document.title;
    if (textosApi?.paginas?.ingresar?.seo?.titulo ?? t.titulo) {
      document.title = textosApi?.paginas?.ingresar?.seo?.titulo ?? t.titulo;
    }
    return () => { document.title = anterior; };
  }, [t.titulo, textosApi?.paginas?.ingresar?.seo?.titulo]);

  const enviarCredenciales = async credenciales => {
    setErrorConfirmacion(null);
    let postExitoso = false;
    try {
      // POST establece la cookie HttpOnly. GET confirma que sigue siendo válida.
      await ejecutar(cuerpoInicioSesion(credenciales));
      postExitoso = true;
      await iniciarSesion(); // GET /sesion, nunca el token del POST.
      navegar(enlaces.inicio, { replace: true });
    } catch (fallo) {
      // Los errores de POST ya están en useMutacion. Si falló GET, se presenta
      // el mensaje correspondiente desde la API sin registrar identidad falsa.
      if (postExitoso) setErrorConfirmacion(fallo);
    }
  };

  const legal = textosApi?.paginas?.iniciarSesion?.pie
    ?? textosApi?.footer?.legal?.derechos?.replace('{anio}', new Date().getFullYear());

  return (
    <main className="pagina-sesion">
      <section className="pagina-sesion__panel-formulario" aria-labelledby="pagina-sesion-titulo">
        <Link className="pagina-sesion__logo" to={enlaces.inicio} aria-label={textosApi?.navbar?.logo?.aria}>
          <Marca />
        </Link>
        <div className="pagina-sesion__contenido">
          <header className="pagina-sesion__encabezado">
            <h1 id="pagina-sesion-titulo">{t.titulo}</h1>
            <p className="cuerpo-m">{t.descripcion}</p>
          </header>
          <FormularioSesion
            textos={t}
            textosApi={textosApi}
            enviando={cargando}
            error={errorConfirmacion ?? error}
            bloqueado={bloqueado}
            segundosRestantes={segundosRestantes}
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
