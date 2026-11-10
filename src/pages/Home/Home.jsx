import './Home.css';
import Hero from '../../components/Hero/Hero';
import SuenaAhora from '../../components/SuenaAhora/SuenaAhora';
import Generos from '../../components/Generos/Generos';
import BannerInvitado from '../../components/BannerInvitado/BannerInvitado';
import EstadoPeticion from '../../components/EstadoPeticion/EstadoPeticion';

export default function Home({ datos, en, enlaces }) {
  if (datos.cargando || datos.error) return <EstadoPeticion {...datos} en={en} nombre={en ? 'home' : 'inicio'} />;
  return (
    <div className="inicio-publico">
      <Hero {...datos} enlaces={enlaces} en={en} />
      <SuenaAhora {...datos} enlaces={enlaces} en={en} />
      <Generos {...datos} enlaces={enlaces} en={en} />
      <BannerInvitado {...datos} enlaces={enlaces} en={en} />
    </div>
  );
}
