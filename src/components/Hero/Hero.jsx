import Etiqueta from "../Etiqueta/Etiqueta"
import Boton from "../Boton/Boton";
import CollagePortadas from "../../assets/portadas/collage.svg?react";
import "./Hero.css";

export default function Hero({ textos, en, totalGeneros = 0 }) {
  const hero = textos?.paginas?.inicioPublico?.hero;
  const cifras = textos?.paginas?.inicioPublico?.cifras;
  return (
    <section className="ancho-home hero">
      <div className="texto-hero">
        <Etiqueta tono="marca">{hero?.etiquetas?.temporada}</Etiqueta>
        <h1 className="titular-gigante">
          {hero?.titulo}
        </h1>
        <div className="cuerpo-g" style={{ color: "var(--texto-secundario)" }}>
          {hero?.subtitulo}
        </div>
        <div className="grupo-botones">
          <Boton tipo="primario" href="#crearCuenta" className="cuerpo-m-fuerte">{hero?.botones?.crearCuentaGratis}</Boton>
          <Boton tipo="secundario" href="#generos" className="cuerpo-m-fuerte">{hero?.botones?.explorarCatalogo}</Boton>
        </div>
        <dl className="cifras-hero">
          {Object.entries(cifras || {}).map(([clave, item]) => (
            <div key={clave}>
              <dt className="dato-cifra" style={{ color: "var(--texto-marca)" }}>{item?.valor || totalGeneros}</dt>
              <dd className="detalle-nota">{item?.etiqueta}</dd>
            </div>
          ))}
        </dl>
      </div>
      <CollagePortadas />
    </section>
  );
}
