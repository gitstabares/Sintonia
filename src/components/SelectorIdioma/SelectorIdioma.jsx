import './SelectorIdioma.css'

function SelectorIdioma({ en, cambiarIdioma, "aria-label": ariaLabel }) {
    return (
        <button className={`cuerpo-p-fuerte selector-idioma ${en ? "en" : ""}`} onClick={() => cambiarIdioma(en ? "es" : "en")} aria-label={ariaLabel}>

            <span className='selector-idioma-indicador'></span>

            <div className={`cuerpo-p-fuerte ${!en ? "selected" : ""}`}>
                ES
            </div>
            <div className={`cuerpo-p-fuerte ${en ? "selected" : ""}`}>
                EN
            </div>

        </button>
    );
}

export default SelectorIdioma;
