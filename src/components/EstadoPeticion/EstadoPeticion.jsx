import './EstadoPeticion.css';
import Boton from '../Boton/Boton';

export default function EstadoPeticion({ cargando, error, recargar, en, nombre = '', vacio = false }) {
  if (cargando) return (
    <div className="estado-peticion cuerpo-m" role="alert">
      <h2 className="titular-h2">{en ? 'Loading...' : 'Cargando...'}</h2>
      <p className="cuerpo-m">{en ? 'Loading content' : 'Cargando contenido'}</p>
    </div>
  );
  if (error) return (
    <div className="estado-peticion cuerpo-m" role="alert">
      <h2 className="titular-h2">{en ? 'Something went wrong' : 'Algo salió mal'}</h2>
      <p>{en ? `We couldn't load ${nombre}. Please try again.` : `No pudimos cargar ${nombre}. Inténtalo de nuevo.`}</p>
      {recargar && <Boton className="cuerpo-p-fuerte" onClick={recargar}>{en ? 'Retry' : 'Reintentar'}</Boton>}
    </div>
  );
  if (vacio) return <p className="estado-peticion cuerpo-m" role="status">{en ? `No ${nombre} available yet.` : `No hay ${nombre} disponibles por ahora.`}</p>;
  return null;
}
