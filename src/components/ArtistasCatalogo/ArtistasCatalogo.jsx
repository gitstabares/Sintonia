import useMediaQuery from '../../hooks/useMediaQuery';
import Portada from '../Portada/Portada';
import EstadoPeticion from '../EstadoPeticion/EstadoPeticion';
import './ArtistasCatalogo.css';

export default function ArtistasCatalogo({ textos, en, generoActual, estadoGenero }) {
  const artistasTextos = textos?.paginas?.catalogo?.genero?.artistas;
  const isMobile = useMediaQuery('(max-width: 1023px)');
  if (estadoGenero.cargando || estadoGenero.error) {
    return <EstadoPeticion {...estadoGenero} en={en} nombre={en ? 'artists' : 'artistas'} />;
  }

  return (
    <section className="artistas-catalogo">
      <h2 className={isMobile ? 'titular-h3' : 'titular-h2'}>{artistasTextos?.titulo}</h2>
      <div className="lista-artistas">
        {generoActual?.artistas?.length ? generoActual.artistas.map(artista => (
          <div key={artista.id} className="artista-item">
            <div className="artista-portada"><Portada {...artista.portada} /></div>
            <div className="cuerpo-m-fuerte">{artista.nombre}</div>
            <div className="cuerpo-p">{artistasTextos?.etiqueta}</div>
          </div>
        )) : <EstadoPeticion vacio en={en} nombre={en ? 'artists' : 'artistas'} />}
      </div>
    </section>
  );
}
