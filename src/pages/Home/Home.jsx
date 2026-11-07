import './Home.css'
import Hero from '../../components/Hero/Hero'
import SuenaAhora from '../../components/SuenaAhora/SuenaAhora';
import Generos from '../../components/Generos/Generos';
import BannerInvitado from '../../components/BannerInvitado/BannerInvitado';

const Home = ({ datos, enlaces }) => {
    return (
        <div className='inicio-publico'>
            <Hero {...datos} enlaces={enlaces} />
            <SuenaAhora {...datos} enlaces={enlaces} />
            <Generos {...datos} enlaces={enlaces} />
            <BannerInvitado {...datos} enlaces={enlaces} />
        </div>
    )
}

export default Home