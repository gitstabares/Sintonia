import './Home.css'
import Hero from '../../components/Hero/Hero'
import SuenaAhora from '../../components/SuenaAhora/SuenaAhora';
import Generos from '../../components/Generos/Generos';
import BannerInvitado from '../../components/BannerInvitado/BannerInvitado';

const Home = ({ datos, en, enlaces }) => {
    const { cargando } = datos;
    return (
        cargando ? <div className="titular-h1 cargando">{en ? 'Loading home...' : 'Cargando inicio...'}</div> :
            <div className='inicio-publico'>
                <>
                    <Hero {...datos} enlaces={enlaces} en={en} />
                    <SuenaAhora {...datos} enlaces={enlaces} en={en} />
                    <Generos {...datos} enlaces={enlaces} en={en} />
                    <BannerInvitado {...datos} enlaces={enlaces} en={en} />
                </>
            </div>
    )
}

export default Home