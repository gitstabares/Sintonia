import useGeneros from '../../hooks/useGeneros';
import useMediaQuery from '../../hooks/useMediaQuery';
import Portada from '../Portada/Portada';
import './ArtistasCatalogo.css'

const ArtistasCatalogo = ({ textos, en, gen_id }) => {
    const artistas_textos = textos?.paginas?.catalogo?.genero?.artistas;
    const isMobile = useMediaQuery("(max-width: 1023px)");
    const { generos, cargando } = useGeneros(gen_id);
    const artistas = generos?.artistas;

    return (
        cargando ? <div className={isMobile ? 'titular-h3' : "titular-h2"}>{en ? 'Loading artists...' : 'Cargando artistas...'}</div> :
            <section className="artistas-catalogo">
                <div className={isMobile ? 'titular-h3' : "titular-h2"}>{artistas_textos?.titulo}</div>
                <div className="lista-artistas">
                    {artistas?.map(artista => <div key={artista?.id} className='artista-item'>
                        <div className='artista-portada'><Portada {...artista?.portada} /></div>
                        <div className='cuerpo-m-fuerte'>{artista?.nombre}</div>
                        <div className='cuerpo-p'>{artistas_textos?.etiqueta}</div>
                    </div>)}
                </div>
            </section>
    )
}

export default ArtistasCatalogo