import './BannerCookies.css';
import Boton from '../Boton/Boton';

export default function BannerCookies({ textos, onAceptar, onRechazar }) {
  const banner = textos?.cookies?.banner;
  return (
    <section className="banner-cookies" aria-label={banner?.titulo || 'Cookies'}>
      <div className="texto">
        <div className="titulo cuerpo-m-fuerte">{banner?.titulo}</div>
        <div className="descripcion cuerpo-p">{banner?.texto}</div>
      </div>
      <div className="botones">
        <Boton className="cuerpo-p-fuerte" tipo="secundario" onClick={onRechazar}>{banner?.botones?.rechazar}</Boton>
        <Boton className="cuerpo-p-fuerte" tipo="primario" onClick={onAceptar}>{banner?.botones?.aceptar}</Boton>
      </div>
    </section>
  );
}
