import Boton from '../components/Boton/Boton.jsx';
import LayoutPublico from '../layouts/LayoutPublico.jsx';
import { obtenerTextoNoEncontrada } from '../utils/textosInterfaz.js';

export default function NoEncontrada({ configuracion }) {
  const { enlaces, datos } = configuracion;
  const mensaje = obtenerTextoNoEncontrada(datos.textos);
  return (
    <LayoutPublico {...configuracion}>
      <section className="estado-peticion" aria-labelledby="titulo-no-encontrada">
        {mensaje.titulo && <h1 id="titulo-no-encontrada" className="titular-h2">{mensaje.titulo}</h1>}
        {mensaje.texto && <p className="cuerpo-m">{mensaje.texto}</p>}
        {mensaje.boton && <Boton className="cuerpo-p-fuerte" href={enlaces.inicio}>{mensaje.boton}</Boton>}
      </section>
    </LayoutPublico>
  );
}
