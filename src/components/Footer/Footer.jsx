import Marca from '../../assets/logos/logo.svg?react'
import "./Footer.css";
export default function Footer({
  textos
}) {
  const footer = textos?.footer;
  const anio = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="cuerpo-p brand">
          <Marca />
          {footer?.lema}
        </div>
        <div className="enlaces-footer">
          {Object.entries(footer?.columnas || {}).map(([claveCol, columna]) => (
            <div key={claveCol} className="cuerpo-p seccion-enlaces">
              <h6 className="detalle-etiqueta">{columna?.titulo}</h6>
              {Object.entries(columna?.enlaces || {}).map(([claveEnlace, texto]) => (
                <p key={claveEnlace}>{texto}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="footer-bottom detalle-nota">
        <div>{footer?.legal?.derechos?.replace("{anio}", anio)}</div>
        <div>{footer?.legal?.nota}</div>
      </div>
    </footer>
  );
}
