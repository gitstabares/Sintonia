import Navbar from '../components/Navbar/Navbar.jsx';
import Footer from '../components/Footer/Footer.jsx';
import BannerCookies from '../components/BannerCookies/BannerCookies.jsx';

export default function LayoutPublico({
  datos, textosAccesibilidad, children, en, alternarIdioma,
  preferenciasAccesibilidad, alternarAccesibilidad, cambiarTamanoTexto, restablecerAccesibilidad,
  consentimiento, guardarConsentimiento, cambiarCookies, enlaces, sesion, cerrarSesion,
  saliendo, errorCierre,
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
        sesion={sesion}
        onCerrarSesion={cerrarSesion}
        saliendo={saliendo}
        errorCierre={errorCierre}
      />
      <main>{children}</main>
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
