import './BotonIcono.css'
import Icono from '../Icono'

const BotonIcono = ({ ancho, tipo, href, onClick, icono }) => {
    return (
        <a href={href}>
            <button className={`boton-icono ${tipo}`} style={{ width: ancho }} onClick={onClick}>
                <Icono nombre={icono} />
            </button>
        </a >
    )
}

export default BotonIcono