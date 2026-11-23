import './Catalogo.css';
import LayoutPublico from '../../layouts/LayoutPublico.jsx';
import GenerosCatalogo from '../../components/GenerosCatalogo/GenerosCatalogo.jsx';
import DestacadosCatalogo from '../../components/DestacadosCatalogo/DestacadosCatalogo.jsx';
import ArtistasCatalogo from '../../components/ArtistasCatalogo/ArtistasCatalogo.jsx';
import CancionesCatalogo from '../../components/CancionesCatalogo/CancionesCatalogo.jsx';
import EstadoPeticion from '../../components/EstadoPeticion/EstadoPeticion.jsx';
import useTextos from '../../hooks/useTextos.js';
import useTextosAccesibilidad from '../../hooks/useTextosAccesibilidad.js';
import useGeneros from '../../hooks/useGeneros.js';
import useAlbumes from '../../hooks/useAlbumes.js';
import { useParams, useSearchParams } from 'react-router-dom';

export default function Catalogo({ configuracion }) {
  const { idioma, en, enlaces } = configuracion;
  const datos = useTextos(idioma);
  const datosAccesibilidad = useTextosAccesibilidad(idioma);
  const { gen_id: idRuta } = useParams();
  const [parametros] = useSearchParams();
  const gen_id = parametros.get('genero') || idRuta || '';
  const { generos: listaGeneros, ...estadoLista } = useGeneros();
  const { generos: generoActual, ...estadoGenero } = useGeneros(gen_id, {}, Boolean(gen_id));
  const { albumes, ...estadoAlbumes } = useAlbumes(6, 'populares', {}, !gen_id);

  return (
    <LayoutPublico {...configuracion} datos={datos} textosAccesibilidad={datosAccesibilidad.textos}>
      {datos.cargando || datos.error ? (
        <EstadoPeticion {...datos} en={en} nombre={en ? 'catalog' : 'catálogo'} />
      ) : (
        <div className="catalogo">
          <GenerosCatalogo textos={datos.textos} enlaces={enlaces} en={en} gen_id={gen_id}
            listaGeneros={listaGeneros} estadoLista={estadoLista} generoActual={generoActual} estadoGenero={estadoGenero} />
          {gen_id && <ArtistasCatalogo textos={datos.textos} en={en}
            generoActual={generoActual} estadoGenero={estadoGenero} />}
          <DestacadosCatalogo textos={datos.textos} enlaces={enlaces} en={en} gen_id={gen_id}
            generoActual={generoActual} estadoGenero={estadoGenero}
            albumes={albumes} estadoAlbumes={estadoAlbumes} />
          {gen_id && <CancionesCatalogo textos={datos.textos} en={en}
            generoActual={generoActual} estadoGenero={estadoGenero} />}
        </div>
      )}
    </LayoutPublico>
  );
}
