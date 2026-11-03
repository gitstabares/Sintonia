import "./Tarjeta.css"
import GeneradorPortada from "../GeneradorPortada/GeneradorPortada"

const Tarjeta = ({ titulo, artista }) => {
    return (
        <span className="tarjeta">
            <GeneradorPortada semilla={titulo + artista} />
            <div className="texto">
                <div className="cuerpo-p-fuerte titulo">{titulo}</div>
                <div className="cuerpo-p artista">{artista}</div>
            </div>
        </span>
    )
}

export default Tarjeta