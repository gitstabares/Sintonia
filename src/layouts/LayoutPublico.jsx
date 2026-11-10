import Navbar from '../components/Navbar/Navbar.jsx';
import Footer from '../components/Footer/Footer.jsx';
import BannerCookies from '../components/BannerCookies/BannerCookies.jsx';
import { Outlet } from 'react-router-dom';

export default function LayoutPublico({
  datos, textosAccesibilidad, en, alternarIdioma,
  preferenciasAccesibilidad, alternarAccesibilidad, cambiarTamanoTexto, restablecerAccesibilidad,
  consentimiento, guardarConsentimiento, cambiarCookies, enlaces,
}) {
  return (
    <div className="sitio">
      <Navbar
        {...datos}
        textosAccesibilidad={textosAccesibilidad}
        en={en}
        alternarIdioma={alternarIdioma}
        preferenciasAccesibilidad={preferenciasAccesibilidad}
        alternarAccesibilidad={alternarAccesibilidad}
        cambiarTamanoTexto={cambiarTamanoTexto}
        restablecerAccesibilidad={restablecerAccesibilidad}
        enlaces={enlaces}
      />
      <main><Outlet /></main>
      <Footer {...datos} en={en} enlaces={enlaces} cambiarCookies={cambiarCookies} />
      {consentimiento === null && !datos.cargando && !datos.error && (
        <BannerCookies
          textos={datos.textos}
          onAceptar={() => guardarConsentimiento(true)}
          onRechazar={() => guardarConsentimiento(false)}
        />
      )}
    </div>
  );
}
