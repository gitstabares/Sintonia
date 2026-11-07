import Portada from '../Portada/Portada'
import './TarjetaGenero.css'

const TarjetaGenero = ({ genero }) => {
    return (
        <div className='tarjeta-genero' style={{ background: genero?.portada?.fondo }}>
            <div className="titulo-genero titular-h3">
                {genero?.nombre}
            </div>
            <div className="portada-genero">
                <Portada {...genero.portada} />
            </div>
        </div>
    )
}

export default TarjetaGenero