import { Link } from 'react-router-dom';
import Icono from '../Icono';
import TarjetaGenero from '../TarjetaGenero/TarjetaGenero';
import EstadoPeticion from '../EstadoPeticion/EstadoPeticion';
import './Generos.css';
import useMediaQuery from '../../hooks/useMediaQuery';

export default function Generos({ textos, enlaces, en, generos, estado }) {
  const texGeneros = textos?.paginas?.inicioPublico?.generos;
  const isMobile = useMediaQuery('(max-width: 1023px)');
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
        {generos?.length ? generos.map(genero => <TarjetaGenero key={genero.id} genero={genero} enlaces={enlaces} />) : <EstadoPeticion vacio en={en} nombre={en ? 'genres' : 'géneros'} />}
      </div>
    </section>
  );
}
