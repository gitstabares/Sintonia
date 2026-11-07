import Hero from '../../components/Hero/Hero'
import SuenaAhora from '../../components/SuenaAhora/SuenaAhora';
import './Home.css'

const Home = ({ datos }) => {
    return (
        <div className='inicio-publico'>
            <Hero {...datos} />
            <SuenaAhora {...datos} />
        </div>
    )
}

export default Home