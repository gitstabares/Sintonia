import { Link } from 'react-router-dom';
import Icono from '../Icono';
import Tarjeta from '../Tarjeta/Tarjeta';
import EstadoPeticion from '../EstadoPeticion/EstadoPeticion';
import './SuenaAhora.css';
import useMediaQuery from '../../hooks/useMediaQuery';
import useAlbumes from '../../hooks/useAlbumes';

export default function SuenaAhora({ textos, enlaces, en }) {
  const destacados = textos?.paginas?.inicioPublico?.destacados;
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const { albumes: populares, ...estado } = useAlbumes(6, 'populares');
  if (estado.cargando || estado.error) return <EstadoPeticion {...estado} en={en} nombre={en ? 'albums' : 'álbumes'} />;
  return (
    <section className="suena-ahora">
      <div className="titulo">
        <h2 className={isMobile ? 'titular-h3' : 'titular-h2'}>{destacados?.titulo}</h2>
        <Link className="enlace cuerpo-p-fuerte" to={enlaces.catalogo}>
          {destacados?.enlaces?.descubrirMas}{!isMobile && <Icono nombre="arrowr" />}
        </Link>
      </div>
      <div className="top-canciones">
        {populares?.map(album => <Tarjeta key={album.id} album={album} />)}
      </div>
    </section>
  );
}
