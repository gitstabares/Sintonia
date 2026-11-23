import { Link, useParams } from 'react-router-dom';
import Portada from '../../components/Portada/Portada.jsx';
import Tarjeta from '../../components/Tarjeta/Tarjeta.jsx';
import Etiqueta from '../../components/Etiqueta/Etiqueta.jsx';
import Icono from '../../components/Icono.jsx';
import FilaPista from '../../components/FilaPista/FilaPista.jsx';
import EstadoPeticion from '../../components/EstadoPeticion/EstadoPeticion.jsx';
import useDetalleAlbum from '../../hooks/useDetalleAlbum.js';
import useMetadatosAlbum from '../../hooks/useMetadatosAlbum.js';
import {
  obtenerCanciones,
  obtenerGenero,
  obtenerAnioPublicacion,
  formatearFechaPublicacion,
  duracionTotalMinutos,
} from '../../utils/detalleAlbum.js';
import './DetalleAlbum.css';

export default function DetalleAlbum({ en, textos }) {
  const { id } = useParams();
  const { album, otrosAlbumes, cargando, error, recargar } = useDetalleAlbum(id);
  useMetadatosAlbum(album);

  if (cargando || error) {
    return (
      <div className="detalle-album detalle-album--estado">
        <EstadoPeticion cargando={cargando} error={error} recargar={recargar}
          nombre={en ? 'album' : 'álbum'} en={en} />
      </div>
    );
  }

  if (!album?.titulo) {
    return (
      <div className="detalle-album detalle-album--estado">
        <EstadoPeticion vacio nombre={en ? 'album' : 'álbum'} en={en} />
      </div>
    );
  }

  const etiquetas = textos?.paginas?.detalleAlbum;
  const canciones = obtenerCanciones(album);
  const artista = album.artista?.nombre ?? '';
  const genero = obtenerGenero(album);
  const anio = obtenerAnioPublicacion(album.fechaPublicacion) || album.anio;
  const tipo = etiquetas?.etiquetaAlbum ?? (en ? 'Album' : 'Álbum');
  const cantidad = etiquetas?.etiquetas?.canciones ?? (en ? 'tracks' : 'canciones');
  const minutos = etiquetas?.etiquetas?.minutos ?? 'min';
  const fecha = formatearFechaPublicacion(album.fechaPublicacion, en ? 'en' : 'es');

  return (
    <article className="detalle-album" aria-labelledby="detalle-album-titulo">
      <Link to="/catalogo" className="detalle-album__volver"
        aria-label={etiquetas?.acciones?.volverCatalogo ?? (en ? 'Back to catalog' : 'Volver al catálogo')}>
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
            {genero && <Etiqueta tono="violeta">{genero}</Etiqueta>}
          </div>
          <h1 id="detalle-album-titulo" className="detalle-album__titulo">{album.titulo}</h1>
          <div className="detalle-album__resumen cuerpo-p">
            <span className="detalle-album__avatar" aria-hidden="true">
              <Portada {...(album.artista?.portada ?? album.portada ?? {})} />
            </span>
            <span className="detalle-album__artista">{artista}</span>
            {anio && <><span aria-hidden="true">·</span><span>{anio}</span></>}
            <span aria-hidden="true">·</span>
            <span>{canciones.length} {cantidad}</span>
            <span aria-hidden="true">·</span>
            <span>{duracionTotalMinutos(album)} {minutos}</span>
          </div>
        </div>
      </header>

      <section className="detalle-album__pistas" aria-label={etiquetas?.tabla?.tituloSeccion ?? (en ? 'Track list' : 'Lista de canciones')}>
        <div className="detalle-album__encabezado-pistas detalle-etiqueta" aria-hidden="true">
          <span>#</span>
          <span className="detalle-album__nombre-columna">{etiquetas?.tabla?.titulo ?? (en ? 'Title' : 'Título')}</span>
          <span>{etiquetas?.tabla?.reproducciones ?? (en ? 'Plays' : 'Reproducciones')}</span>
          <span className="detalle-album__reloj"><Icono nombre="clock" /></span>
        </div>
        {canciones.length ? (
          <ol className="detalle-album__lista">
            {canciones.map((pista, indice) => (
              <FilaPista key={pista.id ?? indice} pista={pista} posicion={indice + 1} album={album} en={en} />
            ))}
          </ol>
        ) : (
          <EstadoPeticion vacio nombre={en ? 'tracks' : 'canciones'} en={en} />
        )}
      </section>

      {(fecha || album.copyright) && (
        <div className="detalle-album__creditos">
          {fecha && <p className="cuerpo-p">{fecha}</p>}
          {album.copyright && <p className="detalle-nota">{album.copyright}</p>}
        </div>
      )}

      <section className="detalle-album__relacionados" aria-labelledby="detalle-album-relacionados">
        <h2 id="detalle-album-relacionados" className="titular-h2">
          {(etiquetas?.relacionados?.titulo ?? (en ? 'More from {artista}' : 'Más de {artista}'))
            .replace('{artista}', artista)}
        </h2>
        {otrosAlbumes.length ? (
          <div className="detalle-album__tarjetas">
            {otrosAlbumes.map(otro => (
              <Tarjeta key={otro.id} album={otro} meta={[
                obtenerAnioPublicacion(otro.fechaPublicacion) || otro.anio,
                otro.tipo ?? tipo,
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
