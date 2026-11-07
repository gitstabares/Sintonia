import './Etiqueta.css'

const Etiqueta = ({ tono = 'neutral', children }) => {
    return (
        <span className={`detalle-nota-fuerte etiqueta ${tono}`}>
            {children}
        </span>
    )
}

export default Etiqueta