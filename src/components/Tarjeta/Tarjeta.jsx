import './Tarjeta.css';
import Portada from '../Portada/Portada';
import { Link } from 'react-router-dom';
import Icono from '../Icono'

export default function Tarjeta({ album, meta }) {
  return (
    <Link className="tarjeta-album" to={"/albumes/" + encodeURIComponent(String(album.id))}>
      <div className="portada-album">
        <Portada {...album.portada} />
        <span className="boton-play" aria-hidden="true"><Icono nombre="play" /></span>
      </div>
      <div className="texto-album">
        <div className="tarjeta-titulo cuerpo-p-fuerte">{album?.titulo}</div>
        <div className="tarjeta-artista cuerpo-p">{meta ?? album?.artista?.nombre}</div>
      </div>
    </Link>
  );
}
