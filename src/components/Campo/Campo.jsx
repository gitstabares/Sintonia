import './Campo.css'

const Campo = ({ etiqueta, placeholder, ayuda }) => {
    return (
        <span className="campo">
            <div className="etiqueta cuerpo-p-fuerte">{etiqueta}</div>
            <input className='cuerpo-m' type="text" placeholder={placeholder} />
            <div className='ayuda detalle-nota'>{ayuda}</div>
        </span>
    )
}

export default Campo