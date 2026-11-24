import { useEffect, useId, useRef, useState } from 'react';
import './Navbar.css';
import Marca from '../../assets/logos/logo.svg?react';
import Boton from '../Boton/Boton';
import BotonIcono from '../BotonIcono/BotonIcono';
import SelectorIdioma from '../SelectorIdioma/SelectorIdioma';
import PanelAccesibilidad from '../PanelAccesibilidad/PanelAccesibilidad';
import useMediaQuery from '../../hooks/useMediaQuery';
import EstadoPeticion from '../EstadoPeticion/EstadoPeticion.jsx';
import { obtenerTextoErrorCodigo } from '../../utils/textosInterfaz.js';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({
  textos, textosAccesibilidad, cargando, en, alternarIdioma,
  preferenciasAccesibilidad, alternarAccesibilidad, cambiarTamanoTexto, restablecerAccesibilidad,
  enlaces, sesion, onCerrarSesion, saliendo = false, errorCierre = null,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [cuentaAbierta, setCuentaAbierta] = useState(false);
  const menuId = useId();
  const cuentaId = useId();
  const contenedorCuenta = useRef(null);
  const disparadorCuenta = useRef(null);
  const opcionSalir = useRef(null);
  const ubicacion = useLocation();
  const nav = textos?.navbar;
  const menuMovil = textos?.menuMovil;
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const etiquetaSalir = nav?.usuario?.cerrarSesion ?? nav?.sesion?.cerrar;
  const etiquetaEstado = menuMovil?.usuario?.sesionIniciada
    ?? menuMovil?.sesion?.estado ?? nav?.usuario?.sesionIniciada;
  const etiquetaCuenta = nav?.usuario?.menuCuenta ?? nav?.usuario?.cuenta ?? sesion?.nombre;
  const iniciales = sesion?.iniciales ||
    sesion?.nombre?.split(/\s+/).filter(Boolean).slice(0, 2).map(p => p[0]?.toUpperCase()).join('');
  const colorAvatar = sesion?.colorHex ?? 'var(--marca-primario)';
  const errorSalir = errorCierre
    ? (obtenerTextoErrorCodigo(textos, errorCierre.codigo)
      || textos?.estados?.error?.descripcion
      || textos?.estados?.error?.texto) : null;

  useEffect(() => {
    setIsOpen(false);
    setCuentaAbierta(false);
  }, [ubicacion.pathname, ubicacion.search]);

  useEffect(() => {
    if (!cuentaAbierta) return undefined;
    opcionSalir.current?.focus();
    const cerrar = evento => {
      if (evento.key === 'Escape') {
        setCuentaAbierta(false);
        disparadorCuenta.current?.focus();
      }
    };
    const cerrarFuera = evento => {
      if (!contenedorCuenta.current?.contains(evento.target)) {
        setCuentaAbierta(false);
      }
    };
    document.addEventListener('keydown', cerrar);
    document.addEventListener('pointerdown', cerrarFuera);
    return () => {
      document.removeEventListener('keydown', cerrar);
      document.removeEventListener('pointerdown', cerrarFuera);
    };
  }, [cuentaAbierta]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const cerrar = evento => { if (evento.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', cerrar);
    return () => window.removeEventListener('keydown', cerrar);
  }, [isOpen]);

  const salir = async () => {
    if (saliendo) return;
    const cerrado = await onCerrarSesion?.();
    if (cerrado) {
      setIsOpen(false);
      setCuentaAbierta(false);
    }
  };

  return (
    <header className={'header-container' + (isOpen ? ' open' : '')}>
      <nav className="header" aria-label={nav?.aria?.navegacion}>
        <div className="header-top">
          <Link to={enlaces.inicio} aria-label={nav?.logo?.aria}
            onClick={() => setIsOpen(false)}><Marca /></Link>
          <div className="header-top-botones">
            {!isOpen && !sesion &&
              <Boton className="cuerpo-p-fuerte" tipo="fantasma" href={enlaces.ingresar}>
                {menuMovil?.botones?.invitado?.ingresar}
              </Boton>}
            <BotonIcono ancho={44} tipo="fantasma" icono={isOpen ? 'x' : 'menu'}
              aria-label={isOpen ? menuMovil?.cerrar : menuMovil?.abrir}
              aria-expanded={isOpen} aria-controls={menuId}
              onClick={() => setIsOpen(valor => !valor)} />
          </div>
        </div>
        {cargando ? <EstadoPeticion cargando textos={textos} recurso="navegacion" /> : (
          <div id={menuId} className={'header-contenido' + (isOpen ? ' open' : '')}>
            <div className="cuerpo-p-fuerte header-enlaces">
              <Link className="header-enlace" to={enlaces.inicio}>
                {sesion
                  ? nav?.enlaces?.conSesion?.inicio ?? nav?.enlaces?.inicio
                  : nav?.enlaces?.inicio}
              </Link>
              <Link className="header-enlace" to={enlaces.catalogo}>
                {nav?.enlaces?.catalogo}
              </Link>
            </div>
            <span className="header-flexible" aria-hidden="true" />
            <div className="header-utilidades cuerpo-m-fuerte">
              <div className="seccion-utilidades">
                {isMobile && menuMovil?.secciones?.accesibilidad}
                <PanelAccesibilidad
                  textos={textosAccesibilidad}
                  etiquetaBoton={textos?.navbar?.aria?.accesibilidad}
                  preferencias={preferenciasAccesibilidad}
                  onAlternar={alternarAccesibilidad}
                  onCambiarTamanoTexto={cambiarTamanoTexto}
                  onRestablecer={restablecerAccesibilidad}
                />
              </div>
              <div className="seccion-utilidades">
                {isMobile && menuMovil?.secciones?.idioma}
                <SelectorIdioma en={en} alternarIdioma={alternarIdioma}
                  idiomas={textos?.idioma?.codigos ?? nav?.idiomas ?? textos?.idiomas}
                  aria-label={nav?.aria?.idioma} />
              </div>
            </div>
            <div className="header-botones">
              {sesion ? (
                <>
                  <div className="header-cuenta" ref={contenedorCuenta}>
                    <button ref={disparadorCuenta} type="button"
                      className="header-cuenta__disparador"
                      aria-label={etiquetaCuenta}
                      aria-haspopup="menu" aria-expanded={cuentaAbierta}
                      aria-controls={cuentaId}
                      onClick={() => setCuentaAbierta(estado => !estado)}>
                      <span className="header-cuenta__avatar" style={{ background: colorAvatar }}
                        aria-hidden="true">{iniciales}</span>
                    </button>
                    {cuentaAbierta && (
                      <div id={cuentaId} className="header-cuenta__menu" role="menu"
                        aria-label={etiquetaCuenta}>
                        <div className="header-cuenta__identidad" role="presentation">
                          <span className="header-cuenta__avatar" style={{ background: colorAvatar }}
                            aria-hidden="true">{iniciales}</span>
                          <span className="header-cuenta__datos">
                            <strong className="cuerpo-p-fuerte">{sesion.nombre}</strong>
                            <span className="detalle-nota">{sesion.correo}</span>
                          </span>
                        </div>
                        <button ref={opcionSalir} className="header-cuenta__salir cuerpo-p-fuerte"
                          role="menuitem" type="button" onClick={salir} disabled={saliendo}>
                          {etiquetaSalir}
                        </button>
                        {errorSalir && <p role="alert" className="header-cuenta__error cuerpo-p">
                          {errorSalir}
                        </p>}
                      </div>
                    )}
                  </div>
                  <div className="header-cuenta-movil">
                    <span className="header-cuenta__avatar" style={{ background: colorAvatar }}
                      aria-hidden="true">{iniciales}</span>
                    <span className="header-cuenta-movil__datos">
                      <strong className="cuerpo-p-fuerte">{sesion.nombre.split(/\s+/)[0]}</strong>
                      {etiquetaEstado && <span className="detalle-nota">{etiquetaEstado}</span>}
                    </span>
                    <button className="header-cuenta-movil__salir cuerpo-p-fuerte"
                      type="button" onClick={salir} disabled={saliendo}>
                      {etiquetaSalir}
                    </button>
                    {errorSalir && <p role="alert" className="header-cuenta__error cuerpo-p">
                      {errorSalir}
                    </p>}
                  </div>
                </>
              ) : (
                <>
                  <Boton className="cuerpo-p-fuerte" tipo={isMobile ? 'secundario' : 'fantasma'}
                    href={enlaces.ingresar}>{nav?.botones?.invitado?.ingresar}</Boton>
                  <Boton className="cuerpo-p-fuerte" tipo="primario"
                    href={enlaces.crearCuenta}>{nav?.botones?.invitado?.crearCuenta}</Boton>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
