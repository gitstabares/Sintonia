import './Boton.css'

const Boton = ({ className, tipo, href, onClick, children }) => {
    return (
        <a href={href}>
            <button className={`boton ${className} ${tipo}`} onClick={onClick}>
                {children}
            </button>
        </a>
    )
}

export default Boton