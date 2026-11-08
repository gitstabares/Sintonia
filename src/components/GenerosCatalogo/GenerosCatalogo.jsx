import TarjetaGenero from '../TarjetaGenero/TarjetaGenero'
import './GenerosCatalogo.css'
import useMediaQuery from '../../hooks/useMediaQuery';
import useGeneros from '../../hooks/useGeneros.js';

const GenerosCatalogo = ({ textos, enlaces, en, gen_id }) => {
    const catalogo = textos?.paginas?.catalogo;
    const isMobile = useMediaQuery("(max-width: 1023px)");
    const { generos: lista_generos, cargando: cargandoGeneros } = useGeneros();
    const { generos: genero_actual, cargando: cargandoGenero } = useGeneros(gen_id);

    return (
        (cargandoGeneros || cargandoGenero) ? <div className={isMobile ? 'titular-h3' : "titular-h2"}>{en ? 'Loading genres...' : 'Cargando géneros musicales...'}</div> :
            <section className="generos-catalogo">
                <div className="encabezado-catalogo">
                    <div className='titular-h1' style={{ color: 'var(--texto-principal)' }}>
                        {gen_id ? genero_actual?.nombre : catalogo?.encabezado?.titulo}
                    </div>
                    <div className='cuerpo-m' style={{ color: 'var(--texto-secundario)' }}>
                        {!isMobile && (gen_id ? genero_actual?.descripcion : catalogo?.encabezado?.subtitulo)}
                    </div>
                </div>
                <div className="explorar-por-genero">
                    <div className={isMobile ? 'titular-h3' : "titular-h2"} style={{ color: "var(--texto-principal)" }}>
                        {catalogo?.generos?.titulo}
                    </div>
                    <div className="grid-generos-catalogo">
                        {lista_generos?.map((genero) => <TarjetaGenero key={genero.id} genero={genero} enlaces={enlaces} />)}
                    </div>
                </div>

            </section>
    )
}

export default GenerosCatalogo