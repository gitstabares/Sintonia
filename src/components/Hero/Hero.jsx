import Etiqueta from "../Etiqueta/Etiqueta"
import Boton from "../Boton/Boton";
import CollagePortadas from "../../assets/portadas/collage.svg?react";
import useMediaQuery from "../../hooks/useMediaQuery.js"
import "./Hero.css";

export default function Hero({ textos, totalGeneros = 0 }) {
  const hero = textos?.paginas?.inicioPublico?.hero;
  const cifras = textos?.paginas?.inicioPublico?.cifras;
  const isMobile = useMediaQuery("(max-width: 1023px)");

  return (
    <section className="hero">
      <div className="texto-hero">
        {!isMobile && <Etiqueta tono="marca">{hero?.etiquetas?.temporada}</Etiqueta>}
        <div className={isMobile ? "titular-h1" : "titular-gigante"}>
          {hero?.titulo}
        </div>
        <div className={isMobile ? "cuerpo-m" : "cuerpo-g"} style={{ color: "var(--texto-secundario)" }}>
          {hero?.subtitulo}
        </div>
        <div className="grupo-botones">
          <Boton tipo="primario" href="#crearCuenta" className="cuerpo-m-fuerte">{hero?.botones?.crearCuentaGratis}</Boton>
          <Boton tipo="secundario" href="#catalogo" className="cuerpo-m-fuerte">{hero?.botones?.explorarCatalogo}</Boton>
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
      {!isMobile && <CollagePortadas style={{ width: "100%" }} />}
    </section>
  );
}
