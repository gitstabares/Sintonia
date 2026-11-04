import './Boton.css'

const Boton = ({ className, tipo, icono = false, href, onClick, children }) => {
    return (
        <a className={`boton-enlace ${icono ? 'icono' : ''}`} href={href}>
            <button className={`boton ${className} ${tipo}`} onClick={onClick}>
                {children}
            </button>
        </a>
    )
}

export default Boton