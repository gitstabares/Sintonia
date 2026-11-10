export default function EstadoPeticion({ cargando, error, recargar, en, nombre = '' }) {
  if (cargando) return <p role="status" aria-live="polite">{en ? `Loading ${nombre}...` : `Cargando ${nombre}...`}</p>;
  if (error) return (
    <div role="alert">
      <p>{en ? `We couldn't load ${nombre}. Please try again.` : `No pudimos cargar ${nombre}. Inténtalo de nuevo.`}</p>
      {recargar && <button type="button" onClick={recargar}>{en ? 'Retry' : 'Reintentar'}</button>}
    </div>
  );
  return null;
}
