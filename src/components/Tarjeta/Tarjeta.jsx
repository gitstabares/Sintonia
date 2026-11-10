import './Tarjeta.css';
import Portada from '../Portada/Portada';
import Icono from '../Icono';

export default function Tarjeta({ album }) {
  return (
    <article className="tarjeta-album">
      <div className="portada-album">
        <Portada {...album.portada} />
        <span className="boton-play" aria-hidden="true"><Icono nombre="play" /></span>
      </div>
      <div className="texto-album">
        <div className="tarjeta-titulo cuerpo-p-fuerte">{album?.titulo}</div>
        <div className="tarjeta-artista cuerpo-p">{album?.artista?.nombre}</div>
      </div>
    </article>
  );
}
