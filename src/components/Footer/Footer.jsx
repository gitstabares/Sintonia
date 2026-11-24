import { Link } from 'react-router-dom';
import Marca from '../../assets/logos/logo.svg?react';
import './Footer.css';
import EstadoPeticion from '../EstadoPeticion/EstadoPeticion.jsx';

export default function Footer({ textos, cargando, enlaces, en, cambiarCookies }) {
  const footer = textos?.footer;
  const anio = new Date().getFullYear();
  return (
    <footer className="footer">
      {cargando ? <EstadoPeticion cargando textos={textos} recurso="pie" /> : (
        <>
          <div className="footer-top">
            <div className="cuerpo-p brand"><Marca />{footer?.lema}</div>
            <div className="enlaces-footer">
              {Object.entries(footer?.columnas || {}).map(([claveCol, columna]) => (
                <div key={claveCol} className="cuerpo-p columna-enlaces">
                  <div className="detalle-etiqueta" style={{ color: 'var(--texto-terciario)' }}>{columna?.titulo}</div>
                  {Object.entries(columna?.enlaces || {}).map(([claveEnlace, texto]) => (
                    <Link className="cuerpo-p enlace" to={enlaces[claveEnlace] || '/'} key={claveEnlace}>{texto}</Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="footer-bottom detalle-nota">
            <div>{footer?.legal?.derechos?.replace('{anio}', anio)}</div>
            <button type="button" className="footer-cookies" onClick={cambiarCookies}>
              {footer?.botones?.preferenciasCookies ?? footer?.cookies?.preferencias
                ?? textos?.cookies?.preferencias?.titulo ?? textos?.cookies?.botones?.preferencias}
            </button>
            <div>{footer?.legal?.nota}</div>
          </div>
        </>
      )}
    </footer>
  );
}
