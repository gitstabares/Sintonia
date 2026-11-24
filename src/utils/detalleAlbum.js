/**
 * Datos y formato de la vista 3. Las fechas de publicación son días de calendario:
 * nunca se interpretan como instantes ni se convierten a Date.
 */
const meses = {
  es: [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ],
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

export function formatearDuracion(duracionSeg) {
  if (duracionSeg === null || duracionSeg === undefined || duracionSeg === "")
    return "—";
  const segundos = Number(duracionSeg);
  if (!Number.isFinite(segundos) || segundos < 0) return "—";
  const total = Math.floor(segundos);
  return Math.floor(total / 60) + ":" + String(total % 60).padStart(2, "0");
}

export function obtenerAnioPublicacion(fechaPublicacion) {
  const coincidencia = /^(\d{4})(?:-\d{2}-\d{2})?$/.exec(
    String(fechaPublicacion ?? ""),
  );
  return coincidencia?.[1] ?? "";
}

export function formatearFechaPublicacion(fechaPublicacion, idioma = "es") {
  const texto = String(fechaPublicacion ?? "");
  const fecha = /^(\d{4})-(\d{2})-(\d{2})$/.exec(texto);
  if (!fecha) return texto;
  const [, anio, mes, dia] = fecha;
  const mesNumero = Number(mes);
  const diaNumero = Number(dia);
  if (mesNumero < 1 || mesNumero > 12 || diaNumero < 1 || diaNumero > 31)
    return texto;
  const nombreMes = meses[idioma === "en" ? "en" : "es"][mesNumero - 1];
  return idioma === "en"
    ? nombreMes + " " + diaNumero + ", " + anio
    : diaNumero + " de " + nombreMes + " de " + anio;
}

export function obtenerCanciones(album) {
  if (Array.isArray(album?.canciones)) return album.canciones;
  if (Array.isArray(album?.pistas)) return album.pistas;
  return [];
}

export function obtenerGenero(album) {
  const genero = album?.genero ?? album?.generos?.[0];
  return typeof genero === "string" ? genero : (genero?.nombre ?? "");
}

export function obtenerOtrosAlbumes(respuesta, album) {
  const candidatos = respuesta?.otrosAlbumes
    ?? respuesta?.albumesRelacionados
    ?? respuesta?.albumesDelArtista
    ?? album?.otrosAlbumes
    ?? album?.albumesRelacionados
    ?? album?.artista?.albumes;
  if (!Array.isArray(candidatos)) return [];
  return candidatos.filter(otro =>
    otro && otro.id != null && String(otro.id) !== String(album?.id) &&
    (!otro.artista?.id || !album?.artista?.id ||
      String(otro.artista.id) === String(album.artista.id))
  );
}

export function normalizarDetalleAlbum(respuesta) {
  const album = respuesta?.album ?? respuesta?.detalle ?? respuesta;
  if (!album || typeof album !== "object" || Array.isArray(album)) {
    return { album: null, otrosAlbumes: [] };
  }
  return { album, otrosAlbumes: obtenerOtrosAlbumes(respuesta, album) };
}

export function duracionTotalMinutos(album) {
  const pistas = obtenerCanciones(album);
  const suma = pistas.reduce(
    (total, pista) =>
      total +
      (Number.isFinite(Number(pista?.duracionSeg))
        ? Number(pista.duracionSeg)
        : 0),
    0,
  );
  const total = album?.duracionSeg != null ? Number(album.duracionSeg) : suma;
  return Number.isFinite(total) && total >= 0 ? Math.round(total / 60) : 0;
}

export function obtenerMetadatosAlbum(album, textos = null) {
  const titulo = album?.titulo;
  const artista = album?.artista?.nombre;
  if (!titulo || !artista) return null;

  const plantilla = textos?.paginas?.album?.seo
    ?? textos?.paginas?.album?.metadatos
    ?? textos?.paginas?.detalleAlbum?.metadatos;
  const valores = { titulo, artista };
  const interpolar = origen => String(origen).replace(/\{(titulo|artista)\}/g,
    (coincidencia, clave) => valores[clave] ?? coincidencia);
  // Cuando los textos son válidos pero falta esta plantilla no se crea
  // contenido lingüístico: se presenta únicamente información del álbum.
  const datosAlbum = titulo + ' — ' + artista;
  return {
    title: plantilla?.titulo ? interpolar(plantilla.titulo) : datosAlbum,
    description: plantilla?.descripcion ? interpolar(plantilla.descripcion) : datosAlbum,
  };
}
