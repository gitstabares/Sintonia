import './SelectorIdioma.css';

export default function SelectorIdioma({ en, alternarIdioma, 'aria-label': ariaLabel }) {
  return (
    <button type="button" className={`cuerpo-p-fuerte selector-idioma ${en ? 'en' : ''}`}
      onClick={alternarIdioma} aria-pressed={en} aria-label={ariaLabel || (en ? 'Change language' : 'Cambiar idioma')}>
      <span className="selector-idioma-indicador" aria-hidden="true" />
      <span className={!en ? 'selected' : ''} lang="es" aria-hidden="true">ES</span>
      <span className={en ? 'selected' : ''} lang="en" aria-hidden="true">EN</span>
    </button>
  );
}
