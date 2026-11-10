import './Boton.css';
import { Link } from 'react-router-dom';

export default function Boton({ className = '', tipo = 'primario', href, onClick, children, ...props }) {
  const clases = `boton ${className} ${tipo}`;
  return href
    ? <Link to={href} className={clases} onClick={onClick} {...props}>{children}</Link>
    : <button type="button" className={clases} onClick={onClick} {...props}>{children}</button>;
}
