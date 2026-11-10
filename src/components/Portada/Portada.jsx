import './Portada.css';

export default function Portada({ patron, fondo = 'var(--portada-1)', figura = 'var(--fijo-blanco)', detalle = 'var(--portada-4)' }) {
  function renderizar() {
    switch (patron) {
      case 0:
        return <><rect width="176" height="176" fill={fondo} />
          <circle cx="176" cy="176" r="130" fill="none" stroke={figura} strokeWidth="40" />
          <circle cx="176" cy="176" r="50" fill="none" stroke={figura} strokeWidth="40" /></>;
      case 1:
        return <><rect width="176" height="176" fill={fondo} />
          <g transform="rotate(-35 88 88)">
            {Array.from({ length: 6 }, (_, index) =>
              <rect key={index} x="-90" y={index * 45 - 75} width="360" height="20" fill={figura} />)}
          </g></>;
      case 2:
        return <><rect width="176" height="176" fill={fondo} />
          <circle cx="88" cy="152" r="60" fill={figura} />
          <circle cx="135" cy="41" r="19" fill={detalle} /></>;
      case 3:
        return <><rect width="176" height="176" fill={fondo} />
          {Array.from({ length: 9 }, (_, i) => {
            const fila = Math.floor(i / 3), col = i % 3;
            return <circle key={i} cx={40 + col * 48} cy={40 + fila * 48} r="16"
              fill={(fila + col) % 2 ? figura : detalle} />;
          })}</>;
      default:
        return <rect width="176" height="176" fill={fondo} />;
    }
  }
  return <svg viewBox="0 0 176 176" className="portada" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">{renderizar()}</svg>;
}
