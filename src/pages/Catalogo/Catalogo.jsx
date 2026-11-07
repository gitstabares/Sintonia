import './Catalogo.css'
import Hero from '../../components/Hero/Hero'
import SuenaAhora from '../../components/SuenaAhora/SuenaAhora';
import Generos from '../../components/Generos/Generos';
import BannerInvitado from '../../components/BannerInvitado/BannerInvitado';

const Catalogo = ({ datos, enlaces }) => {
    return (
        <div className='inicio-publico'>
            <Generos {...datos} enlaces={enlaces} />
            <SuenaAhora {...datos} enlaces={enlaces} />
            <BannerInvitado {...datos} enlaces={enlaces} />
        </div>
    )
}

export default Catalogo