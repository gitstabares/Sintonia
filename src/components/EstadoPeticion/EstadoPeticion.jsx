import './EstadoPeticion.css';
import Boton from '../Boton/Boton.jsx';
import { obtenerTextoPeticion, interpolarTexto } from '../../utils/textosInterfaz.js';

/**
 * Presentación genérica: solo se muestran frases de /textos recibidas por props.
 * El statusCode (o error.status) selecciona el mensaje HTTP correspondiente.
 */
export default function EstadoPeticion({
  cargando = false, error = null, recargar, statusCode = 0,
  vacio = false, textos, recurso = '', nombre = '',
}) {
  if (!cargando && !error && !vacio) return null;
  const mensaje = obtenerTextoPeticion(textos, { cargando, error, vacio, statusCode, recurso });
  const sustituir = valor => interpolarTexto(valor, {
    nombre: textos?.recursos?.[recurso] ?? nombre,
    recurso: textos?.recursos?.[recurso] ?? nombre,
    codigo: Number(statusCode || error?.status || 0) || '',
  });

  return (
    <div className="estado-peticion cuerpo-m"
      role={error ? 'alert' : 'status'}
      aria-live={error ? 'assertive' : 'polite'}>
      {mensaje.titulo && <h2 className="titular-h2">{sustituir(mensaje.titulo)}</h2>}
      {mensaje.texto && <p className="cuerpo-m">{sustituir(mensaje.texto)}</p>}
      {error && recargar && mensaje.boton &&
        <Boton className="cuerpo-p-fuerte" onClick={recargar}>{mensaje.boton}</Boton>}
    </div>
  );
}
