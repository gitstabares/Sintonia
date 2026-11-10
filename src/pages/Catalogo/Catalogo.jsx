import './Catalogo.css';
import GenerosCatalogo from '../../components/GenerosCatalogo/GenerosCatalogo';
import DestacadosCatalogo from '../../components/DestacadosCatalogo/DestacadosCatalogo';
import ArtistasCatalogo from '../../components/ArtistasCatalogo/ArtistasCatalogo';
import CancionesCatalogo from '../../components/CancionesCatalogo/CancionesCatalogo';
import EstadoPeticion from '../../components/EstadoPeticion/EstadoPeticion';
import useGeneros from '../../hooks/useGeneros';
import useAlbumes from '../../hooks/useAlbumes';
import { useParams, useSearchParams } from 'react-router-dom';

export default function Catalogo({ datos, en, enlaces }) {
  const { gen_id: idRuta } = useParams();
  const [parametros] = useSearchParams();
  const gen_id = parametros.get('genero') || idRuta || '';
  const { generos: listaGeneros, ...estadoLista } = useGeneros();
  const { generos: generoActual, ...estadoGenero } = useGeneros(gen_id, {}, Boolean(gen_id));
  const { albumes, ...estadoAlbumes } = useAlbumes(6, 'populares', {}, !gen_id);
  if (datos.cargando || datos.error) return <EstadoPeticion {...datos} en={en} nombre={en ? 'catalog' : 'catálogo'} />;

  return (
    <div className="catalogo">
      <GenerosCatalogo textos={datos.textos} enlaces={enlaces} en={en} gen_id={gen_id}
        listaGeneros={listaGeneros} estadoLista={estadoLista} generoActual={generoActual} estadoGenero={estadoGenero} />
      {gen_id && <ArtistasCatalogo textos={datos.textos} en={en} generoActual={generoActual} estadoGenero={estadoGenero} />}
      <DestacadosCatalogo textos={datos.textos} enlaces={enlaces} en={en} gen_id={gen_id}
        generoActual={generoActual} estadoGenero={estadoGenero} albumes={albumes} estadoAlbumes={estadoAlbumes} />
      {gen_id && <CancionesCatalogo textos={datos.textos} en={en} generoActual={generoActual} estadoGenero={estadoGenero} />}
    </div>
  );
}
