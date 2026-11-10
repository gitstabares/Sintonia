import { Link } from 'react-router-dom';
import Icono from '../Icono';
import TarjetaGenero from '../TarjetaGenero/TarjetaGenero';
import EstadoPeticion from '../EstadoPeticion/EstadoPeticion';
import './Generos.css';
import useMediaQuery from '../../hooks/useMediaQuery';
import useGeneros from '../../hooks/useGeneros';

export default function Generos({ textos, enlaces, en }) {
  const texGeneros = textos?.paginas?.inicioPublico?.generos;
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const { generos, ...estado } = useGeneros();
  if (estado.cargando || estado.error) {
    return <EstadoPeticion {...estado} en={en} nombre={en ? 'genres' : 'géneros musicales'} />;
  }
  return (
    <section className="generos">
      <div className="titulo">
        <h2 className={isMobile ? 'titular-h3' : 'titular-h2'}>{texGeneros?.titulo}</h2>
        <Link className="enlace cuerpo-p-fuerte" to={enlaces.catalogo}>
          {texGeneros?.enlaces?.verCatalogo}{!isMobile && <Icono nombre="arrowr" />}
        </Link>
      </div>
      <div className="grid-generos">
        {generos?.map(genero => <TarjetaGenero key={genero.id} genero={genero} enlaces={enlaces} />)}
      </div>
    </section>
  );
}
