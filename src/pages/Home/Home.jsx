import './Home.css';
import LayoutPublico from '../../layouts/LayoutPublico.jsx';
import Hero from '../../components/Hero/Hero.jsx';
import SuenaAhora from '../../components/SuenaAhora/SuenaAhora.jsx';
import Generos from '../../components/Generos/Generos.jsx';
import BannerInvitado from '../../components/BannerInvitado/BannerInvitado.jsx';
import EstadoPeticion from '../../components/EstadoPeticion/EstadoPeticion.jsx';
import useTextos from '../../hooks/useTextos.js';
import useTextosAccesibilidad from '../../hooks/useTextosAccesibilidad.js';
import useAlbumes from '../../hooks/useAlbumes.js';
import useGeneros from '../../hooks/useGeneros.js';

export default function Home({ configuracion }) {
  const { idioma, en, enlaces } = configuracion;
  const datos = useTextos(idioma);
  const datosAccesibilidad = useTextosAccesibilidad(idioma);
  const { albumes: populares, ...estadoAlbumes } = useAlbumes(6, 'populares');
  const { generos, ...estadoGeneros } = useGeneros();

  return (
    <LayoutPublico {...configuracion} datos={datos} textosAccesibilidad={datosAccesibilidad.textos}>
      {datos.cargando || datos.error ? (
        <EstadoPeticion {...datos} en={en} nombre={en ? 'home' : 'inicio'} />
      ) : (
        <div className="inicio-publico">
          <Hero {...datos} enlaces={enlaces} en={en} />
          <SuenaAhora {...datos} enlaces={enlaces} en={en}
            populares={populares} estado={estadoAlbumes} />
          <Generos {...datos} enlaces={enlaces} en={en}
            generos={generos} estado={estadoGeneros} />
          <BannerInvitado {...datos} enlaces={enlaces} en={en} />
        </div>
      )}
    </LayoutPublico>
  );
}
