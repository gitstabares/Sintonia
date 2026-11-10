import './Catalogo.css';
import GenerosCatalogo from '../../components/GenerosCatalogo/GenerosCatalogo';
import DestacadosCatalogo from '../../components/DestacadosCatalogo/DestacadosCatalogo';
import ArtistasCatalogo from '../../components/ArtistasCatalogo/ArtistasCatalogo';
import CancionesCatalogo from '../../components/CancionesCatalogo/CancionesCatalogo';
import EstadoPeticion from '../../components/EstadoPeticion/EstadoPeticion';
import { useParams } from 'react-router-dom';

export default function Catalogo({ datos, en, enlaces }) {
  const { gen_id } = useParams();
  if (datos.cargando || datos.error) return <EstadoPeticion {...datos} en={en} nombre={en ? 'catalog' : 'catálogo'} />;
  return (
    <div className="catalogo">
      <GenerosCatalogo {...datos} enlaces={enlaces} en={en} gen_id={gen_id} />
      {gen_id && <ArtistasCatalogo {...datos} en={en} gen_id={gen_id} />}
      <DestacadosCatalogo {...datos} enlaces={enlaces} en={en} gen_id={gen_id} />
      {gen_id && <CancionesCatalogo {...datos} en={en} gen_id={gen_id} />}
    </div>
  );
}
