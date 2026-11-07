import { Link } from 'react-router-dom';
import Icono from '../Icono'
import TarjetaGenero from '../TarjetaGenero/TarjetaGenero'
import './GenerosCatalogo.css'
import useMediaQuery from '../../hooks/useMediaQuery';
import useGeneros from '../../hooks/useGeneros';

const GenerosCatalogo = ({ textos, enlaces }) => {
    const catalogo = textos?.paginas?.catalogo;
    const isMobile = useMediaQuery("(max-width: 1023px)");
    const generos = useGeneros().generos;

    return (
        <section className="generos-catalogo">
            <div className="encabezado-catalogo">
                <div className='titular-h1' style={{ color: 'var(--texto-principal)' }}>
                    {catalogo?.encabezado?.titulo}
                </div>
                <div className='cuerpo-m' style={{ color: 'var(--texto-secundario)' }}>
                    {!isMobile && catalogo?.encabezado?.subtitulo}
                </div>
            </div>
            <div className="explorar-por-genero">
                <div className={isMobile ? 'titular-h3' : "titular-h2"} style={{ color: "var(--texto-principal)" }}>
                    {catalogo?.generos?.titulo}
                </div>
                <div className="grid-generos-catalogo">
                    {generos?.map((genero) => <TarjetaGenero key={genero.id} genero={genero} enlaces={enlaces} />)}
                </div>
            </div>

        </section>
    )
}

export default GenerosCatalogo