import { Link } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery';
import Portada from '../Portada/Portada';
import './TarjetaGenero.css';

export default function TarjetaGenero({ genero, enlaces }) {
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const destino = `${enlaces.catalogo}?genero=${encodeURIComponent(genero.id)}`;
  return (
    <Link to={destino} className="tarjeta-genero" style={{ background: genero?.portada?.fondo }}>
      <div className={`titulo-genero ${isMobile ? 'titular-h4' : 'titular-h3'}`}>{genero.nombre}</div>
      <div className="portada-genero"><Portada {...genero.portada} /></div>
    </Link>
  );
}
