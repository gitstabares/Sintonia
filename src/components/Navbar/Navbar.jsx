import { useState } from 'react';
import './Navbar.css';
import Marca from '../../assets/logos/logo.svg?react'
import Boton from '../Boton/Boton';
import BotonIcono from '../BotonIcono/BotonIcono';
import SelectorIdioma from '../SelectorIdioma/SelectorIdioma'

const Navbar = ({
  textos,
  cargando,
  error,
  recargar,
  en,
  cambiarIdioma,
  activo,
  onBuscar,
  textoGrande,
  alternarTexto,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const nav = textos?.navbar;
  const menuMovil = textos?.menuMovil;

  return (
    <div className='header'>
      {/* Navbar para escritorio */}
      <header className='cuerpo-p-fuerte header-escritorio'>
        <Marca />
        <nav className='navbar'>
          <a href="/">{nav?.enlaces?.inicio}</a>
          <a href="#catalogo">{nav?.enlaces?.catalogo}</a>
        </nav>
        <div style={{ flexGrow: 1 }}></div>
        <BotonIcono ancho={40} tipo='secundario' icono='person' />
        <SelectorIdioma en={en} cambiarIdioma={cambiarIdioma} />
        <Boton className='cuerpo-p-fuerte' tipo='fantasma' href='#ingresar'>{nav?.botones?.invitado?.ingresar}</Boton>
        <Boton className='cuerpo-p-fuerte' tipo='primario' href='#crearCuenta'>{nav?.botones?.invitado?.crearCuenta}</Boton>
      </header>
      {/* Navbar mobile */}
      <header className="cuerpo-m-fuerte header-mobile">
        <div className="top">
          <Marca />
          <div style={{ flexGrow: 1 }}></div>
          <Boton className={`cuerpo-p-fuerte boton-ingresar ${isOpen ? 'open' : ''}`} tipo='fantasma' href='#ingresar'>{nav?.botones?.invitado?.ingresar}</Boton>
          <BotonIcono ancho={44} tipo='fantasma' icono={isOpen ? 'x' : 'menu'} onClick={() => setIsOpen(!isOpen)} />
        </div>
        <nav className={`menu-movil ${isOpen ? 'open' : ''}`}>
          <div className="navbar">
            <a href="/">{nav?.enlaces?.inicio}</a>
            <a href="#catalogo">{nav?.enlaces?.catalogo}</a>
          </div>
          <div style={{ flexGrow: 1 }}></div>
          <div className="utilidades">
            <p>{menuMovil?.secciones?.idioma}</p>
            <SelectorIdioma en={en} cambiarIdioma={cambiarIdioma} />
          </div>
          <div className="utilidades">
            <p>{menuMovil?.secciones?.accesibilidad}</p>
            <BotonIcono ancho={40} tipo='secundario' icono='person' />
          </div>
          <div className="botones">
            <Boton className='cuerpo-m-fuerte' tipo='primario' href='#crearCuenta'>{nav?.botones?.invitado?.crearCuenta}</Boton>
            <Boton className='cuerpo-m-fuerte' tipo='secundario' href='#ingresar'>{nav?.botones?.invitado?.ingresar}</Boton>
          </div>
        </nav>
      </header>
    </div>
  )
};

export default Navbar;