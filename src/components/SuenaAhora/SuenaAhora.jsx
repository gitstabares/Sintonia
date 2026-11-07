import { Link } from 'react-router-dom';
import Icono from '../Icono'
import Tarjeta from '../Tarjeta/Tarjeta'
import './SuenaAhora.css'
import useMediaQuery from '../../hooks/useMediaQuery';

const SuenaAhora = ({ textos }) => {
    const destacados = textos?.paginas?.inicioPublico?.destacados;
    const isMobile = useMediaQuery("(max-width: 1023px)");

    return (
        <section className="suena-ahora">
            <div className="titulo">
                <div className="titular-h2" style={{ color: "var(--texto-principal)" }}>
                    {destacados?.titulo}
                </div>
                <Link className='enlace cuerpo-p-fuerte' to=''>
                    {destacados?.enlaces?.descubrirMas}
                    {!isMobile && <Icono nombre='arrowr' />}
                </Link>
            </div>
            <div className="top-canciones">
                <Tarjeta artista='Luz de páramo' titulo='Marea Baja'></Tarjeta>
                <Tarjeta artista='Todo el ruido' titulo='Niebla club'></Tarjeta>
                <Tarjeta artista='Bajo el guadual' titulo='Los Guaduales'></Tarjeta>
                <Tarjeta artista='Neón y neblina' titulo='Valle Eléctrico'></Tarjeta>
                <Tarjeta artista='Cartas sin enviar' titulo='Lina Arroyave'></Tarjeta>
                <Tarjeta artista='Kilómetro 41' titulo='Kiosko 23'></Tarjeta>
            </div>
        </section>
    )
}

export default SuenaAhora