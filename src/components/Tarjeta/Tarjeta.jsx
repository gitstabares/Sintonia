import "./Tarjeta.css"
import Portada from "../Portada/Portada"
import BotonIcono from '../BotonIcono/BotonIcono'

const Tarjeta = ({ album }) => {
    return (
        <span className="tarjeta-album">
            <div className="portada-album">
                <Portada {...album.portada} />
                <div className="boton-play">
                    <BotonIcono ancho={48} tipo='primario' icono='play' />
                </div>
            </div>
            <div className="texto-album">
                <div className="tarjeta-titulo cuerpo-p-fuerte">{album?.titulo}</div>
                <div className="tarjeta-artista cuerpo-p">{album?.artista?.nombre}</div>
            </div>
        </span>
    )
}

export default Tarjeta