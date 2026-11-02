import "./Tarjeta.css"
import GeneradorPortada from "../GeneradorPortada/GeneradorPortada"

const Tarjeta = ({ titulo, artista }) => {
    return (
        <div className="tarjeta">
            <GeneradorPortada semilla={titulo} />
            <div className="texto">
                <div className="cuerpo-p-fuerte titulo">{titulo}</div>
                <div className="cuerpo-p artista">{artista}</div>
            </div>
        </div>
    )
}

export default Tarjeta