import Hero from '../../components/Hero/Hero'
import SuenaAhora from '../../components/SuenaAhora/SuenaAhora';
import Generos from '../../components/Generos/Generos';
import './Home.css'

const Home = ({ datos }) => {
    return (
        <div className='inicio-publico'>
            <Hero {...datos} />
            <SuenaAhora {...datos} />
            <Generos {...datos} />
        </div>
    )
}

export default Home