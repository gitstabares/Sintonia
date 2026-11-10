import TarjetaGenero from '../TarjetaGenero/TarjetaGenero';
import EstadoPeticion from '../EstadoPeticion/EstadoPeticion';
import './GenerosCatalogo.css';
import useMediaQuery from '../../hooks/useMediaQuery';

export default function GenerosCatalogo({ textos, enlaces, en, gen_id, listaGeneros, estadoLista, generoActual, estadoGenero }) {
  const catalogo = textos?.paginas?.catalogo;
  const isMobile = useMediaQuery('(max-width: 1023px)');
  if (estadoLista.cargando || estadoLista.error) {
    return <EstadoPeticion {...estadoLista} en={en} nombre={en ? 'genres' : 'géneros musicales'} />;
  }
  if (gen_id && (estadoGenero.cargando || estadoGenero.error)) {
    return <EstadoPeticion {...estadoGenero} en={en} nombre={en ? 'genre' : 'género'} />;
  }

  return (
    <section className="generos-catalogo">
      <div className="encabezado-catalogo">
        <h1 className="titular-h1">{gen_id ? generoActual?.nombre : catalogo?.encabezado?.titulo}</h1>
        {!isMobile && <p className="cuerpo-m">{gen_id ? generoActual?.descripcion : catalogo?.encabezado?.subtitulo}</p>}
      </div>
      <div className="explorar-por-genero">
        <h2 className={isMobile ? 'titular-h3' : 'titular-h2'}>{catalogo?.generos?.titulo}</h2>
        <div className="grid-generos-catalogo">
          {listaGeneros?.map(genero => <TarjetaGenero key={genero.id} genero={genero} enlaces={enlaces} />)}
        </div>
      </div>
    </section>
  );
}
