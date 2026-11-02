import './Boton.css'

const Boton = ({ tipo, tamano, enlace, children }) => {
    return (
        <a href={enlace}>
            <button className={`boton-${tipo} cuerpo-${tamano}-fuerte`}>
                {children}
            </button>
        </a>
    )
}

export default Boton