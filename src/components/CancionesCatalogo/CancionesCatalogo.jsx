import useMediaQuery from '../../hooks/useMediaQuery';
import EstadoPeticion from '../EstadoPeticion/EstadoPeticion';
import './CancionesCatalogo.css';

export default function CancionesCatalogo({ textos, en, generoActual, estadoGenero }) {
  const cancionesTextos = textos?.paginas?.catalogo?.genero?.canciones;
  const isMobile = useMediaQuery('(max-width: 1023px)');
  if (estadoGenero.cargando || estadoGenero.error) {
    return <EstadoPeticion {...estadoGenero} en={en} nombre={en ? 'songs' : 'canciones'} />;
  }

  return (
    <section className="canciones-catalogo">
      <h2 className={isMobile ? 'titular-h3' : 'titular-h2'}>{cancionesTextos?.titulo}</h2>
      <div className="lista-canciones">
        {generoActual?.pistas?.map((cancion, index) => (
          <div key={cancion.id} className="cancion-item">
            <div className="cuerpo-m">{index + 1}</div>
            <div className="cancion-contenido">
              <div className="cuerpo-m-fuerte">{cancion.titulo}</div>
              <div className="cuerpo-p">{cancion.artista?.nombre}</div>
            </div>
            <div className="cuerpo-p">{`${Math.floor((cancion.duracionSeg || 0) / 60)}:${String((cancion.duracionSeg || 0) % 60).padStart(2, '0')}`}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
