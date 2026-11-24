import './SelectorIdioma.css';

function etiquetaIdioma(opcion) {
  return typeof opcion === 'string' ? opcion : opcion?.etiqueta ?? opcion?.codigo;
}

export default function SelectorIdioma({ en, alternarIdioma, idiomas, 'aria-label': ariaLabel }) {
  return (
    <button type="button" className={`cuerpo-p-fuerte selector-idioma ${en ? 'en' : ''}`}
      onClick={alternarIdioma} aria-pressed={en} aria-label={ariaLabel}>
      <span className="selector-idioma-indicador" aria-hidden="true" />
      <span className={!en ? 'selected' : ''} lang="es" aria-hidden="true">{etiquetaIdioma(idiomas?.es)}</span>
      <span className={en ? 'selected' : ''} lang="en" aria-hidden="true">{etiquetaIdioma(idiomas?.en)}</span>
    </button>
  );
}
