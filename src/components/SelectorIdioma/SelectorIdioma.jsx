import './SelectorIdioma.css'

function SelectorIdioma({ idioma, cambiarIdioma }) {
    return (
        <button className={`cuerpo-p-fuerte selector-idioma ${idioma === "en" ? "en" : ""}`} onClick={() => cambiarIdioma(idioma === "en" ? "es" : "en")}>

            <span className='selector-idioma-indicador'></span>

            <div className={`cuerpo-p-fuerte ${idioma === "es" ? "selected" : ""}`}>
                ES
            </div>
            <div className={`cuerpo-p-fuerte ${idioma === "en" ? "selected" : ""}`}>
                EN
            </div>

        </button>
    );
}

export default SelectorIdioma;
