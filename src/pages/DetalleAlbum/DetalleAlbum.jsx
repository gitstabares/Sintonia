import { Link, useParams } from 'react-router-dom';
import Portada from '../../components/Portada/Portada.jsx';
import Tarjeta from '../../components/Tarjeta/Tarjeta.jsx';
import Etiqueta from '../../components/Etiqueta/Etiqueta.jsx';
import Boton from '../../components/Boton/Boton.jsx';
import Icono from '../../components/Icono.jsx';
import FilaPista from '../../components/FilaPista/FilaPista.jsx';
import EstadoPeticion from '../../components/EstadoPeticion/EstadoPeticion.jsx';
import useDetalleAlbum from '../../hooks/useDetalleAlbum.js';
import useMetadatosAlbum from '../../hooks/useMetadatosAlbum.js';
import {duracionTotalMinutos} from '../../utils/detalleAlbum.js';
import './DetalleAlbum.css';

export default function DetalleAlbum({ en, textos }) {
  const { id } = useParams();
  const { album, cargando, error, statusCode, recargar } = useDetalleAlbum(id);
  const textosAlbum = textos?.paginas?.album;
  useMetadatosAlbum(album);

  if (statusCode == 404) {
    return (
      <div className="detalle-album detalle-album--estado">
        <div className="estado-peticion cuerpo-m" role="alert">
          <h2 className='titular-h2'>{textosAlbum?.noEncontrado?.titulo}</h2>
          <p className='cuerpo-m'>{textosAlbum?.noEncontrado?.texto}</p>
          <Boton className='cuerpo-p-fuerte' href='/catalogo'>{textosAlbum?.noEncontrado?.botones?.volver}</Boton>
        </div>
      </div>
    );
  }

  if (cargando || error) {
    return (
      <div className="detalle-album detalle-album--estado">
        <EstadoPeticion cargando={cargando} error={error} recargar={recargar}
          nombre={en ? 'album' : 'álbum'} en={en} />
      </div>
    );
  }

  const etiquetas = textosAlbum?.tabla?.etiquetas;
  const canciones = album?.pistas;
  const artista = album?.artista?.nombre;
  const tipo = album?.tipo?.charAt(0).toUpperCase() + album?.tipo?.slice(1);
  const [anio, mes, dia] = album?.fechaPublicacion
    ?.split('-')
    .map((val, i) => (i === 1 ? Number(val) - 1 : val)) ?? [];
  const fecha = new Date(anio, mes, dia);
  const otrosAlbumes = album?.masDelArtista;

  return (
    <article className="detalle-album" aria-labelledby="detalle-album-titulo">
      <Link to="/catalogo" className="detalle-album__volver">
        <Icono nombre="chevl" aria-hidden="true" />
      </Link>

      <header className="detalle-album__cabecera">
        <div className="detalle-album__portada" role="img"
          aria-label={[album.titulo, artista].filter(Boolean).join(' — ')}>
          <Portada {...(album.portada ?? {})} />
        </div>
        <div className="detalle-album__presentacion">
          <div className="detalle-album__etiquetas">
            <Etiqueta tono="neutral">{tipo}</Etiqueta>
          </div>
          <h1 id="detalle-album-titulo" className="detalle-album__titulo">{album.titulo}</h1>
          <div className="detalle-album__resumen cuerpo-p">
            <span className="detalle-album__avatar" aria-hidden="true">
              <Portada {...album?.portada} />
            </span>
            <span className="detalle-album__artista">{artista}</span>
            {anio && <><span aria-hidden="true">·</span><span>{anio}</span></>}
            <span aria-hidden="true">·</span>
            <span>{(canciones?.length == 1 ? textosAlbum?.encabezado?.canciones?.uno : textosAlbum?.encabezado?.canciones?.otro)?.replace('{cantidad}', canciones?.length)}</span>
            <span aria-hidden="true">·</span>
            <span>{textosAlbum?.encabezado?.duracion?.replace('{minutos}', duracionTotalMinutos(album))}</span>
          </div>
        </div>
      </header>

      <section className="detalle-album__pistas">
        <div className="detalle-album__encabezado-pistas detalle-etiqueta" aria-hidden="true">
          <span>{etiquetas?.numero}</span>
          <span className="detalle-album__nombre-columna">{etiquetas?.titulo}</span>
          <span>{etiquetas?.reproducciones}</span>
          <span aria-label={etiquetas?.duracion} className="detalle-album__reloj"><Icono nombre="clock" /></span>
        </div>
        {canciones.length ? (
          <ol className="detalle-album__lista">
            {canciones.map((pista, indice) => (
              <FilaPista key={pista.id} pista={pista} posicion={indice + 1} album={album} en={en} />
            ))}
          </ol>
        ) : (
          <EstadoPeticion vacio nombre={en ? 'tracks' : 'canciones'} en={en} />
        )}
      </section>

      {(fecha || album.copyright) && (
        <div className="detalle-album__creditos">
          <p className="cuerpo-p">{fecha?.toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</p>
        </div>
      )}

      <section className="detalle-album__relacionados" aria-labelledby="detalle-album-relacionados">
        <h2 id="detalle-album-relacionados" className="titular-h2">
          {textosAlbum?.masDelArtista?.titulo?.replace('{artista}', artista)}
        </h2>
        {otrosAlbumes?.length ? (
          <div className="detalle-album__tarjetas">
            {otrosAlbumes?.map(otro => (
              <Tarjeta key={otro.id} album={otro} meta={[
                otro.fechaPublicacion.split('-')[0],
                otro.tipo.charAt(0).toUpperCase() + otro.tipo.slice(1),
              ].filter(Boolean).join(' · ')} />
            ))}
          </div>
        ) : (
          <EstadoPeticion vacio nombre={en ? 'albums' : 'álbumes'} en={en} />
        )}
      </section>
    </article>
  );
}
