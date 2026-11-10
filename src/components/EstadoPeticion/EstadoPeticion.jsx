import './EstadoPeticion.css';

export default function EstadoPeticion({ cargando, error, recargar, en, nombre = '', vacio = false }) {
  if (cargando) return <p className="estado-peticion cuerpo-m" role="status" aria-live="polite">{en ? `Loading ${nombre}...` : `Cargando ${nombre}...`}</p>;
  if (error) return (
    <div className="estado-peticion cuerpo-m" role="alert">
      <p>{en ? `We couldn't load ${nombre}. Please try again.` : `No pudimos cargar ${nombre}. Inténtalo de nuevo.`}</p>
      {recargar && <button type="button" className="cuerpo-p-fuerte" onClick={recargar}>{en ? 'Retry' : 'Reintentar'}</button>}
    </div>
  );
  if (vacio) return <p className="estado-peticion cuerpo-m" role="status">{en ? `No ${nombre} available yet.` : `No hay ${nombre} disponibles por ahora.`}</p>;
  return null;
}
