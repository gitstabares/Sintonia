import { Link } from 'react-router-dom';
import Icono from '../Icono'
import Tarjeta from '../Tarjeta/Tarjeta'
import './DestacadosCatalogo.css'
import useMediaQuery from '../../hooks/useMediaQuery';
import useAlbumes from '../../hooks/useAlbumes';

const DestacadosCatalogo = ({ textos, enlaces }) => {
    const catalogo = textos?.paginas?.catalogo;
    const isMobile = useMediaQuery("(max-width: 1023px)");
    const populares = useAlbumes(6, 'populares').albumes;

    return (
        <section className="destacados-catalogo">
            <div className="titulo">
                <div className={isMobile ? 'titular-h3' : "titular-h2"} style={{ color: "var(--texto-principal)" }}>
                    {catalogo?.destacados?.titulo}
                </div>
                {!isMobile && <Link className='enlace cuerpo-p-fuerte' to={enlaces['catalogo']}>
                    {catalogo?.destacados?.enlaces?.descubrirMas}
                    <Icono nombre='arrowr' />
                </Link>}
            </div>
            <div className="albumes-destacados">
                {populares?.map((album) => <Tarjeta key={album.id} album={album} />)}
            </div>
        </section>
    )
}

export default DestacadosCatalogo