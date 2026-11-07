import './Home.css'
import Hero from '../../components/Hero/Hero'
import SuenaAhora from '../../components/SuenaAhora/SuenaAhora';
import Generos from '../../components/Generos/Generos';
import BannerInvitado from '../../components/BannerInvitado/BannerInvitado';

const Home = ({ datos }) => {
    return (
        <div className='inicio-publico'>
            <Hero {...datos} />
            <SuenaAhora {...datos} />
            <Generos {...datos} />
            <BannerInvitado {...datos} />
        </div>
    )
}

export default Home