import './Catalogo.css';
import LayoutPublico from '../../layouts/LayoutPublico.jsx';
import GenerosCatalogo from '../../components/GenerosCatalogo/GenerosCatalogo.jsx';
import DestacadosCatalogo from '../../components/DestacadosCatalogo/DestacadosCatalogo.jsx';
import ArtistasCatalogo from '../../components/ArtistasCatalogo/ArtistasCatalogo.jsx';
import CancionesCatalogo from '../../components/CancionesCatalogo/CancionesCatalogo.jsx';
import EstadoPeticion from '../../components/EstadoPeticion/EstadoPeticion.jsx';
import useGeneros from '../../hooks/useGeneros.js';
import useAlbumes from '../../hooks/useAlbumes.js';
import { useParams } from 'react-router-dom';

export default function Catalogo({ configuracion }) {
  const { en, enlaces, datos } = configuracion;
  const { gen_id = '' } = useParams();
  const { generos: listaGeneros, ...estadoLista } = useGeneros();
  const { generos: generoActual, ...estadoGenero } = useGeneros(gen_id, Boolean(gen_id));
  const { albumes, ...estadoAlbumes } = useAlbumes(!gen_id);

  return (
    <LayoutPublico {...configuracion}>
      {datos.cargando || datos.error ? (
        <EstadoPeticion {...datos} textos={datos.textos} recurso="catalogo" />
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
