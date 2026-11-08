import './Catalogo.css'
import GenerosCatalogo from '../../components/GenerosCatalogo/GenerosCatalogo';
import DestacadosCatalogo from '../../components/DestacadosCatalogo/DestacadosCatalogo';
import ArtistasCatalogo from '../../components/ArtistasCatalogo/ArtistasCatalogo';
import CancionesCatalogo from '../../components/CancionesCatalogo/CancionesCatalogo';
import { useParams } from 'react-router-dom';

const Catalogo = ({ datos, en, enlaces }) => {
    const { cargando } = datos;
    const { gen_id } = useParams();
    return (
        cargando ? <div className="titular-h1 cargando">{en ? 'Loading catalog...' : 'Cargando catálogo...'}</div> :
            <div className='catalogo'>
                <GenerosCatalogo {...datos} enlaces={enlaces} en={en} gen_id={gen_id} />
                {gen_id && <ArtistasCatalogo {...datos} en={en} gen_id={gen_id} />}
                <DestacadosCatalogo {...datos} enlaces={enlaces} en={en} gen_id={gen_id} />
                {gen_id && <CancionesCatalogo {...datos} en={en} gen_id={gen_id} />}
            </div>
    )
}

export default Catalogo