import { Link } from 'react-router-dom';
import './NoEncontrada.css';

export default function NoEncontrada({ en }) {
  return (
    <section className="pagina-no-disponible">
      <h1 className="titular-h2">{en ? 'Page not available' : 'Página no disponible'}</h1>
      <p className="cuerpo-m">{en
        ? 'This section is not implemented in the current sprint.'
        : 'Esta sección todavía no está implementada en el sprint actual.'}</p>
      <Link className="cuerpo-p-fuerte" to="/">{en ? 'Back to home' : 'Volver al inicio'}</Link>
    </section>
  );
}
