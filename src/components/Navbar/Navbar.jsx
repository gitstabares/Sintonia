import { useState } from 'react';
import './Navbar.css';
import Marca from '../../assets/logos/logo.svg?react'
import Boton from '../Boton/Boton';
import BotonIcono from '../BotonIcono/BotonIcono';
import SelectorIdioma from '../SelectorIdioma/SelectorIdioma'
import useMediaQuery from '../../hooks/useMediaQuery';
import { Link } from 'react-router-dom';

const Navbar = ({
  textos,
  cargando,
  error,
  recargar,
  en,
  alternarIdioma,
  alternarTexto
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const nav = textos?.navbar;
  const menuMovil = textos?.menuMovil;
  const isMobile = useMediaQuery("(max-width: 1023px)");

  return (
    <header className={`header-container ${isOpen ? 'open' : ''}`}>
      <nav className="header">
        <div className="header-top">
          <Marca />
          <div className="header-top-botones">
            {!isOpen && <Boton className='cuerpo-p-fuerte' tipo='fantasma' href='#ingresar'>{menuMovil?.botones?.invitado?.ingresar}</Boton>}
            <BotonIcono ancho={44} tipo='fantasma' icono={isOpen ? 'x' : 'menu'} onClick={() => setIsOpen(!isOpen)} />
          </div>
        </div>
        <div className={`header-contenido ${isOpen ? 'open' : ''}`}>
          <div className="cuerpo-p-fuerte header-enlaces">
            <Link className='header-enlace' to='/'>{nav?.enlaces?.inicio}</Link>
            <Link className='header-enlace' to='#catalogo'>{nav?.enlaces?.catalogo}</Link>
          </div>
          <span style={{ flexGrow: 1 }} />
          <div className="header-utilidades cuerpo-m-fuerte">
            <div className='seccion-utilidades'>
              {isMobile && menuMovil?.secciones?.accesibilidad}
              <BotonIcono ancho={40} tipo='secundario' icono='person' />
            </div>
            <div className='seccion-utilidades'>
              {isMobile && menuMovil?.secciones?.idioma}
              <SelectorIdioma en={en} alternarIdioma={alternarIdioma} />
            </div>
          </div>
          <div className="header-botones">
            <Boton className='cuerpo-p-fuerte' tipo={isMobile ? 'secundario' : 'fantasma'} href='#ingresar'>{nav?.botones?.invitado?.ingresar}</Boton>
            <Boton className='cuerpo-p-fuerte' tipo='primario' href='#crearCuenta'>{nav?.botones?.invitado?.crearCuenta}</Boton>
          </div>
        </div>
      </nav>
    </header>
  )
};

export default Navbar;