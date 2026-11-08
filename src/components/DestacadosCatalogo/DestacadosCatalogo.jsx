import { Link } from 'react-router-dom';
import Icono from '../Icono'
import Tarjeta from '../Tarjeta/Tarjeta'
import './DestacadosCatalogo.css'
import useMediaQuery from '../../hooks/useMediaQuery';
import useAlbumes from '../../hooks/useAlbumes.js';
import useGeneros from '../../hooks/useGeneros.js';

const DestacadosCatalogo = ({ textos, enlaces, en, gen_id }) => {
    const catalogo = textos?.paginas?.catalogo;
    const isMobile = useMediaQuery("(max-width: 1023px)");
    const { generos, cargando: cargandoGeneros } = useGeneros(gen_id);
    const { albumes, cargando: cargandoAlbumes } = useAlbumes();
    const destacados = gen_id ? generos?.albumes : albumes;

    return (
        (cargandoGeneros || cargandoAlbumes) ? <div className={isMobile ? 'titular-h3' : "titular-h2"}>{en ? 'Loading albums...' : 'Cargando álbumes...'}</div> :
            <section className="destacados-catalogo">
                <div className="titulo">
                    <div className={isMobile ? 'titular-h3' : "titular-h2"} style={{ color: "var(--texto-principal)" }}>
                        {gen_id ? catalogo?.genero?.albumes?.titulo.replace('{genero}', generos?.nombre) : catalogo?.destacados?.titulo}
                    </div>
                    {!isMobile && !gen_id && <Link className='enlace cuerpo-p-fuerte' to={enlaces['catalogo']}>
                        {catalogo?.destacados?.enlaces?.descubrirMas}
                        <Icono nombre='arrowr' />
                    </Link>}
                </div>
                <div className="albumes-destacados">
                    {destacados?.map((album) => <Tarjeta key={album.id} album={album} />)}
                </div>
            </section>
    )
}

export default DestacadosCatalogo