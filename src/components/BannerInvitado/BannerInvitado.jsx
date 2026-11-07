import './BannerInvitado.css'
import { Link } from 'react-router-dom';

const BannerInvitado = ({ textos }) => {
    const cta = textos?.paginas?.inicioPublico?.cta;
    return (
        <div className="banner-invitado">
            <div className='textos-banner-invitado'>
                <div className="titular-h1">
                    {cta?.titulo}
                </div>
                <div className="cuerpo-m">
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