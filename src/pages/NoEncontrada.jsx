import Boton from '../components/Boton/Boton';
import LayoutPublico from '../layouts/LayoutPublico.jsx';
import useTextos from '../hooks/useTextos.js';
import useTextosAccesibilidad from '../hooks/useTextosAccesibilidad.js';

export default function NoEncontrada({ configuracion }) {
  const { idioma, en } = configuracion;
  const datos = useTextos(idioma);
  const datosAccesibilidad = useTextosAccesibilidad(idioma);
  return (
    <LayoutPublico {...configuracion} datos={datos} textosAccesibilidad={datosAccesibilidad.textos}>
      <section className="estado-peticion">
      <h2 className="titular-h2">{en ? 'Page not available' : 'Página no disponible'}</h2>
      <p className="cuerpo-m">{en
        ? 'This section is not implemented in the current sprint.'
        : 'Esta sección todavía no está implementada en el sprint actual.'}</p>
      <Boton className="cuerpo-p-fuerte" href="/">{en ? 'Back to home' : 'Volver al inicio'}</Boton>
      </section>
    </LayoutPublico>
  );
}
