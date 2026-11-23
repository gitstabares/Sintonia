import Portada from '../Portada/Portada.jsx';
import './FilaPista.css';

export default function FilaPista({ pista, posicion, en }) {
  const reproducciones = pista?.reproducciones;
  const reproduccionesTexto = reproducciones != null && Number.isFinite(Number(reproducciones))
    ? new Intl.NumberFormat(en ? 'en-US' : 'es-CO').format(Number(reproducciones))
    : '—';

  return (
    <li className="fila-pista">
      <span className="fila-pista__posicion cuerpo-p" aria-hidden="true">{posicion}</span>
      <div className="fila-pista__portada"><Portada {...pista?.portada} /></div>
      <div className="fila-pista__informacion">
        <span className="fila-pista__titulo cuerpo-m-fuerte">{pista?.titulo}</span>
        <span className="fila-pista__artista cuerpo-p">{pista?.artista?.nombre}</span>
      </div>
      <span className="fila-pista__reproducciones cuerpo-p">{reproduccionesTexto}</span>
      <span className="fila-pista__duracion cuerpo-p">{`${Math.floor((pista?.duracionSeg || 0) / 60)}:${String((pista?.duracionSeg || 0) % 60).padStart(2, '0')}`}</span>
    </li>
  );
}
