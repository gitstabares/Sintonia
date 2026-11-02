import './Campo.css'

const Campo = ({ etiqueta, placeholder, ayuda }) => {
    return (
        <div className="campo">
            <div className="cuerpo-p-fuerte">{etiqueta}</div>
            <input className='cuerpo-m' type="text" placeholder={placeholder} />
            <div className='ayuda detalle-nota'>{ayuda}</div>
        </div>
    )
}

export default Campo