import './Home.css';
import LayoutPublico from '../../layouts/LayoutPublico.jsx';
import Hero from '../../components/Hero/Hero.jsx';
import SuenaAhora from '../../components/SuenaAhora/SuenaAhora.jsx';
import Generos from '../../components/Generos/Generos.jsx';
import BannerInvitado from '../../components/BannerInvitado/BannerInvitado.jsx';
import EstadoPeticion from '../../components/EstadoPeticion/EstadoPeticion.jsx';
import useAlbumes from '../../hooks/useAlbumes.js';
import useGeneros from '../../hooks/useGeneros.js';

export default function Home({ configuracion }) {
  const { en, enlaces, datos } = configuracion;
  const { albumes, ...estadoAlbumes } = useAlbumes();
  const populares = Array.isArray(albumes) ? albumes.slice(0, 6) : albumes;
  const { generos, ...estadoGeneros } = useGeneros();

  return (
    <LayoutPublico {...configuracion}>
      {datos.cargando || datos.error ? (
        <EstadoPeticion {...datos} textos={datos.textos} recurso="inicio" />
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
