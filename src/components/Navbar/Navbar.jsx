import { useEffect, useId, useState } from 'react';
import './Navbar.css';
import Marca from '../../assets/logos/logo.svg?react';
import Boton from '../Boton/Boton';
import BotonIcono from '../BotonIcono/BotonIcono';
import SelectorIdioma from '../SelectorIdioma/SelectorIdioma';
import EstadoPeticion from '../EstadoPeticion/EstadoPeticion';
import useMediaQuery from '../../hooks/useMediaQuery';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ textos, cargando, error, recargar, en, alternarIdioma, alternarTexto, textoGrande, enlaces }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const ubicacion = useLocation();
  const nav = textos?.navbar;
  const menuMovil = textos?.menuMovil;
  const isMobile = useMediaQuery('(max-width: 1023px)');

  useEffect(() => setIsOpen(false), [ubicacion.pathname, ubicacion.search]);
  useEffect(() => {
    if (!isOpen) return undefined;
    const cerrar = evento => { if (evento.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', cerrar);
    return () => window.removeEventListener('keydown', cerrar);
  }, [isOpen]);

  return (
    <header className={`header-container ${isOpen ? 'open' : ''}`}>
      <nav className="header" aria-label={nav?.aria?.navegacion || (en ? 'Navigation' : 'Navegación principal')}>
        <div className="header-top">
          <Link to={enlaces.inicio} aria-label={nav?.logo?.aria || 'Sintonía'} onClick={() => setIsOpen(false)}><Marca /></Link>
          <div className="header-top-botones">
            {!isOpen && <Boton className="cuerpo-p-fuerte" tipo="fantasma" href={enlaces.ingresar}>
              {menuMovil?.botones?.invitado?.ingresar}
            </Boton>}
            <BotonIcono ancho={44} tipo="fantasma" icono={isOpen ? 'x' : 'menu'}
              aria-label={isOpen ? (menuMovil?.cerrar || 'Cerrar menú') : (menuMovil?.abrir || 'Abrir menú')}
              aria-expanded={isOpen} aria-controls={menuId}
              onClick={() => setIsOpen(valor => !valor)} />
          </div>
        </div>
        {cargando || error ? (
          <EstadoPeticion cargando={cargando} error={error} recargar={recargar}
            en={en} nombre={en ? 'navigation' : 'navegación'} />
        ) : (
          <div id={menuId} className={`header-contenido ${isOpen ? 'open' : ''}`}>
            <div className="cuerpo-p-fuerte header-enlaces">
              <Link className="header-enlace" to={enlaces.inicio}>{nav?.enlaces?.inicio}</Link>
              <Link className="header-enlace" to={enlaces.catalogo}>{nav?.enlaces?.catalogo}</Link>
            </div>
            <span style={{ flexGrow: 1 }} />
            <div className="header-utilidades cuerpo-m-fuerte">
              <div className="seccion-utilidades">
                {isMobile && menuMovil?.secciones?.accesibilidad}
                <BotonIcono ancho={40} tipo="secundario" icono="person"
                  aria-label={en ? 'Change text size' : 'Cambiar tamaño del texto'}
                  aria-pressed={textoGrande} onClick={alternarTexto} />
              </div>
              <div className="seccion-utilidades">
                {isMobile && menuMovil?.secciones?.idioma}
                <SelectorIdioma en={en} alternarIdioma={alternarIdioma}
                  aria-label={nav?.aria?.idioma || (en ? 'Change language' : 'Cambiar idioma')} />
              </div>
            </div>
            <div className="header-botones">
              <Boton className="cuerpo-p-fuerte" tipo={isMobile ? 'secundario' : 'fantasma'} href={enlaces.ingresar}>{nav?.botones?.invitado?.ingresar}</Boton>
              <Boton className="cuerpo-p-fuerte" tipo="primario" href={enlaces.crearCuenta}>{nav?.botones?.invitado?.crearCuenta}</Boton>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
