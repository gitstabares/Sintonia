import "./Tarjeta.css"
import GeneradorPortada from "../GeneradorPortada/GeneradorPortada"

const Tarjeta = ({ titulo, artista }) => {
    return (
        <span className="tarjeta">
            <GeneradorPortada semilla={titulo + artista} />
            <div className="tarjeta-texto">
                <div className="tarjeta-titulo cuerpo-p-fuerte">{titulo}</div>
                <div className="tarjeta-artista cuerpo-p">{artista}</div>
            </div>
        </span>
    )
}

export default Tarjeta