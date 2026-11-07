import './Catalogo.css'
import GenerosCatalogo from '../../components/GenerosCatalogo/GenerosCatalogo';
import DestacadosCatalogo from '../../components/DestacadosCatalogo/DestacadosCatalogo';

const Catalogo = ({ datos, enlaces }) => {
    return (
        <div className='catalogo'>
            <GenerosCatalogo {...datos} enlaces={enlaces} />
            <DestacadosCatalogo {...datos} enlaces={enlaces} />
        </div>
    )
}

export default Catalogo