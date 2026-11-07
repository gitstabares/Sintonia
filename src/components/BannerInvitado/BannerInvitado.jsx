import './BannerInvitado.css'
import { Link } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery.js'

const BannerInvitado = ({ textos }) => {
    const cta = textos?.paginas?.inicioPublico?.cta;
    const isMobile = useMediaQuery("(max-width: 1023px)");
    return (
        <div className="banner-invitado">
            <div className='textos-banner-invitado'>
                <div className={isMobile ? "titular-h3" : "titular-h1"}>
                    {cta?.titulo}
                </div>
                <div className={isMobile ? "cuerpo-p" : "cuerpo-m"}>
                    {cta?.texto}
                </div>
            </div>
            <Link to='#crearCuenta' className='boton-crear-cuenta cuerpo-m-fuerte'>
                {cta?.botones?.crearCuentaGratis}
            </Link>
        </div>
    )
}

export default BannerInvitado