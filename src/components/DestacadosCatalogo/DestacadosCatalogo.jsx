import { Link } from 'react-router-dom';
import Icono from '../Icono';
import Tarjeta from '../Tarjeta/Tarjeta';
import EstadoPeticion from '../EstadoPeticion/EstadoPeticion';
import './DestacadosCatalogo.css';
import useMediaQuery from '../../hooks/useMediaQuery';

export default function DestacadosCatalogo({ textos, enlaces, en, gen_id, generoActual, estadoGenero, albumes, estadoAlbumes }) {
  const catalogo = textos?.paginas?.catalogo;
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const estado = gen_id ? estadoGenero : estadoAlbumes;
  if (estado.cargando || estado.error) {
    return <EstadoPeticion {...estado} en={en} nombre={en ? 'albums' : 'álbumes'} />;
  }
  const destacados = gen_id ? generoActual?.albumes : albumes;
  const titulo = gen_id
    ? catalogo?.genero?.albumes?.titulo?.replace('{genero}', generoActual?.nombre || '')
    : catalogo?.destacados?.titulo;

  return (
    <section className="destacados-catalogo">
      <div className="titulo">
        <h2 className={isMobile ? 'titular-h3' : 'titular-h2'}>{titulo}</h2>
        {!isMobile && !gen_id && <Link className="enlace cuerpo-p-fuerte" to={enlaces.catalogo}>
          {catalogo?.destacados?.enlaces?.descubrirMas}<Icono nombre="arrowr" />
        </Link>}
      </div>
      <div className="albumes-destacados">
        {destacados?.length ? destacados.map(album => <Tarjeta key={album.id} album={album} />) : <EstadoPeticion vacio en={en} nombre={en ? 'albums' : 'álbumes'} />}
      </div>
    </section>
  );
}
