import './AvisoCookies.css'
import Boton from '../Boton/Boton'

const AvisoCookies = ({ textos, onAceptar, onRechazar }) => {
    const banner = textos?.cookies?.banner;
    return (
        <span className='aviso-cookies'>
            <div className='texto'>
                <div className="titulo cuerpo-m-fuerte">{banner?.titulo}</div>
                <div className="descripcion cuerpo-p">{banner?.texto}</div>
            </div>
            <div className="botones">
                <Boton className="cuerpo-p-fuerte" tipo="fantasma">{banner?.botones?.rechazar}</Boton>
                <Boton className="cuerpo-p-fuerte" tipo="primario">{banner?.botones?.aceptar}</Boton>
            </div>
        </span>
    )
}

export default AvisoCookies