import './Etiqueta.css'

const Etiqueta = ({ tono, children }) => {
    return (
        <div className="etiqueta">
            {children}
        </div>
    )
}

export default Etiqueta