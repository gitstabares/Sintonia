import { Link } from 'react-router-dom';
import Icono from '../Icono'
import TarjetaGenero from '../TarjetaGenero/TarjetaGenero'
import './Generos.css'
import useMediaQuery from '../../hooks/useMediaQuery';
import useGeneros from '../../hooks/useGeneros';

const Generos = ({ textos, enlaces }) => {
    const texGeneros = textos?.paginas?.inicioPublico?.generos;
    const isMobile = useMediaQuery("(max-width: 1023px)");
    const generos = useGeneros().generos;

    return (
        <section className="generos">
            <div className="titulo">
                <div className={isMobile ? 'titular-h3' : "titular-h2"} style={{ color: "var(--texto-principal)" }}>
                    {texGeneros?.titulo}
                </div>
                <Link className='enlace cuerpo-p-fuerte' to={enlaces['catalogo']}>
                    {texGeneros?.enlaces?.verCatalogo}
                    {!isMobile && <Icono nombre='arrowr' />}
                </Link>
            </div>
            <div className="grid-generos">
                {generos?.map((genero) => <TarjetaGenero key={genero.id} genero={genero} enlaces={enlaces} />)}
            </div>
        </section>
    )
}

export default Generos