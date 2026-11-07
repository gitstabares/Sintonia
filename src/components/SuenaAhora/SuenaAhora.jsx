import { Link } from 'react-router-dom';
import Icono from '../Icono'
import Tarjeta from '../Tarjeta/Tarjeta'
import './SuenaAhora.css'
import useMediaQuery from '../../hooks/useMediaQuery';
import useAlbumes from '../../hooks/useAlbumes';

const SuenaAhora = ({ textos }) => {
    const destacados = textos?.paginas?.inicioPublico?.destacados;
    const isMobile = useMediaQuery("(max-width: 1023px)");
    const populares = useAlbumes(6, 'populares').albumes;

    return (
        <section className="suena-ahora">
            <div className="titulo">
                <div className={isMobile ? 'titular-h3' : "titular-h2"} style={{ color: "var(--texto-principal)" }}>
                    {destacados?.titulo}
                </div>
                <Link className='enlace cuerpo-p-fuerte' to=''>
                    {destacados?.enlaces?.descubrirMas}
                    {!isMobile && <Icono nombre='arrowr' />}
                </Link>
            </div>
            <div className="top-canciones">
                {populares?.map((album) => <Tarjeta key={album.id} album={album} />)}
            </div>
        </section>
    )
}

export default SuenaAhora