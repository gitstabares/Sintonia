import { useState } from 'react';
import './Navbar.css';
import Marca from '../../assets/logos/logo.svg?react'
import Boton from '../Boton/Boton';
import Icono from '../Icono'
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
    <header className='header'>
      <div className='header-left'>
        <Marca />
        <div className="menu-movil">
          <Boton className={`cuerpo-p-fuerte ingresar ${isOpen ? 'open' : ''}`} tipo='fantasma'>
            {menuMovil?.botones?.invitado?.ingresar}
          </Boton>
          <Boton className='boton-menu' tipo='fantasma' onClick={() => setIsOpen(!isOpen)}>
            <Icono nombre={isOpen ? 'x' : 'menu'}></Icono>
          </Boton>
        </div>
      </div>
      <nav className={`navbar ${isOpen ? 'open' : ''}`}>
        <div className="navbar-enlaces">
          <a className='cuerpo-p-fuerte' href="/">{nav?.enlaces?.inicio}</a>
          <a className='cuerpo-p-fuerte' href="#catalogo">{nav?.enlaces?.catalogo}</a>
        </div>
        <div style={{ flexGrow: 1 }}></div>
        <div className="navbar-utilidades">
          <p>Accesibilidad</p>
          <Boton className='boton-accesibilidad' icono={true} tipo='secundario'><Icono nombre='person'></Icono></Boton>
        </div>
        <div className="navbar-utilidades">
          <p>Idioma</p>
          <SelectorIdioma en={en} cambiarIdioma={cambiarIdioma} />
        </div>
        <div className="navbar-sesion">
          <Boton className='cuerpo-p-fuerte' tipo='fantasma' href='#ingresar'>{nav?.botones?.invitado?.ingresar}</Boton>
          <Boton className='cuerpo-p-fuerte' tipo='primario' href='#crearCuenta'>{nav?.botones?.invitado?.crearCuenta}</Boton>
        </div>
      </nav>
    </header>
  )
};

export default Navbar;