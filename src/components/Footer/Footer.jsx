import { Link } from 'react-router-dom';
import Marca from '../../assets/logos/logo.svg?react'
import "./Footer.css";

export default function Footer({
  textos
}) {
  const footer = textos?.footer;
  const anio = new Date().getFullYear();
  const enlaces = {
    inicio: '/',
    catalogo: '#catalogo',
    iniciarSesion: '#iniciarSesion',
    crearCuenta: '#crearCuenta',
    terminos: '#terminos',
    accesibilidad: '#accesibilidad'
  }

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="cuerpo-p brand">
          <Marca />
          {footer?.lema}
        </div>
        <div className="enlaces-footer">
          {Object.entries(footer?.columnas || {}).map(([claveCol, columna]) => (
            <div key={claveCol} className="cuerpo-p columna-enlaces">
              <div className="detalle-etiqueta" style={{ color: 'var(--texto-terciario' }}>{columna?.titulo}</div>
              {Object.entries(columna?.enlaces || {}).map(([claveEnlace, texto]) => (
                <Link className='cuerpo-p enlace' to={enlaces[claveEnlace]} key={claveEnlace}>{texto}</Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="footer-bottom detalle-nota">
        <div>{footer?.legal?.derechos?.replace("{anio}", anio)}</div>
        <div>{footer?.legal?.nota}</div>
      </div>
    </footer >
  );
}
