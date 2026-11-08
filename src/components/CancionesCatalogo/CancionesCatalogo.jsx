import useGeneros from '../../hooks/useGeneros';
import useMediaQuery from '../../hooks/useMediaQuery';
import './CancionesCatalogo.css'

const CancionesCatalogo = ({ textos, en, gen_id }) => {
    const canciones_textos = textos?.paginas?.catalogo?.genero?.canciones;
    const isMobile = useMediaQuery("(max-width: 1023px)");
    const { generos, cargando } = useGeneros(gen_id);

    return (
        cargando ? <div className={isMobile ? 'titular-h3' : "titular-h2"}>{en ? 'Loading songs...' : 'Cargando canciones...'}</div> :
            <section className="canciones-catalogo">
                <div className={isMobile ? 'titular-h3' : "titular-h2"}>{canciones_textos?.titulo}</div>
                <div className="lista-canciones">
                    {generos?.pistas?.map((cancion, index) => <div key={cancion?.id} className='cancion-item'>
                        <div className='cuerpo-m'>{index + 1}</div>
                        <div className='cancion-contenido'>
                            <div className='cuerpo-m-fuerte'>{cancion?.titulo}</div>
                            <div className='cuerpo-p'>{cancion?.artista?.nombre}</div>
                        </div>
                        <div className='cuerpo-p'>{
                            `${Math.floor(cancion?.duracionSeg / 60)}:${String(cancion?.duracionSeg % 60).padStart(2, '0')}`
                        }</div>
                    </div>)}
                </div>
            </section>
    )
}

export default CancionesCatalogo