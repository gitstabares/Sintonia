import Portada from '../Portada/Portada.jsx';
import './ArteSesion.css';

// Portadas del mismo kit de diseño utilizado por el catálogo público.
const piezas = [
  { patron: 2, fondo: 'var(--portada-3)', figura: 'var(--fijo-negro)', detalle: 'var(--fijo-blanco)' },
  { patron: 0, fondo: 'var(--portada-5)', figura: 'var(--portada-1)' },
  { patron: 1, fondo: 'var(--portada-2)', figura: 'var(--portada-4)' },
  { patron: 1, fondo: 'var(--portada-6)', figura: 'var(--portada-3)' },
  { patron: 3, fondo: 'var(--portada-4)', figura: 'var(--portada-2)', detalle: 'var(--fijo-blanco)' },
  { patron: 3, fondo: 'var(--fijo-negro)', figura: 'var(--fijo-blanco)', detalle: 'var(--portada-5)' },
  { patron: 0, fondo: 'var(--portada-3)', figura: 'var(--portada-4)' },
  { patron: 2, fondo: 'var(--portada-6)', figura: 'var(--portada-5)', detalle: 'var(--fijo-blanco)' },
];

export default function ArteSesion() {
  return (
    <div className="arte-sesion" aria-hidden="true">
      <div className="arte-sesion__cuadricula">
        {piezas.map((pieza, indice) => (
          <div className="arte-sesion__pieza" key={indice}><Portada {...pieza} /></div>
        ))}
      </div>
      <div className="arte-sesion__movil">
        <div className="arte-sesion__pieza arte-sesion__pieza--izquierda"><Portada {...piezas[1]} /></div>
        <div className="arte-sesion__pieza arte-sesion__pieza--centro"><Portada {...piezas[0]} /></div>
        <div className="arte-sesion__pieza arte-sesion__pieza--derecha"><Portada {...piezas[2]} /></div>
      </div>
    </div>
  );
}
