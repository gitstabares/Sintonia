import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import './BotonIcono.css';
import Icono from '../Icono';

const BotonIcono = forwardRef(function BotonIcono(
  { ancho = 40, tipo = 'secundario', href, onClick, icono, children, ...props },
  ref,
) {
  const className = 'boton-icono ' + tipo;
  const style = { width: (ancho / 16) + 'rem' };
  const contenido = children || <Icono nombre={icono} aria-hidden="true" />;
  return href
    ? <Link ref={ref} to={href} className={className} style={style} onClick={onClick} {...props}>{contenido}</Link>
    : <button ref={ref} type="button" className={className} style={style} onClick={onClick} {...props}>{contenido}</button>;
});

export default BotonIcono;
