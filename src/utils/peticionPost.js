import { crearUrlRecurso } from './api.js';

/**
 * Retry-After puede ser un número de segundos o una fecha HTTP.
 * La cabecera es la autoridad; un valor del cuerpo solo se usa si falta.
 */
export function segundosRetryAfter(valor, ahora = Date.now()) {
  if (valor == null) return 0;
  const cadena = String(valor).trim();
  if (!cadena) return 0;
  if (/^\d+(?:\.\d+)?$/.test(cadena)) {
    const segundos = Number(cadena);
    return Number.isFinite(segundos) ? Math.max(0, Math.ceil(segundos)) : 0;
  }
  const fecha = Date.parse(cadena);
  return Number.isFinite(fecha) ? Math.max(0, Math.ceil((fecha - ahora) / 1000)) : 0;
}

/**
 * El backend recibe correo y clave; los errores HTTP conservan status, codigo
 * y, cuando hay limitación, los segundos declarados en Retry-After.
 */
export async function solicitarPost(base, ruta, cuerpo, opciones = {}) {
  const { signal, fetchImpl = fetch } = opciones;
  let respuesta;
  try {
    respuesta = await fetchImpl(crearUrlRecurso(base, ruta), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      credentials: 'include',
      body: JSON.stringify(cuerpo),
      signal,
    });
  } catch (fallo) {
    // TypeError de fetch (sin red, DNS/CORS) y AbortError (timeout).
    // El contenido visible se toma de paginas.ingresar.errores.conexion.
    if (fallo?.name === 'AbortError') throw fallo;
    const conexion = new Error(fallo?.message ?? '');
    conexion.tipo = 'conexion';
    conexion.status = 0;
    throw conexion;
  }

  const texto = await respuesta.text();
  let contenido = null;
  if (texto) {
    try { contenido = JSON.parse(texto); }
    catch { contenido = null; }
  }
  if (!respuesta.ok) {
    const fallo = new Error('HTTP ' + respuesta.status);
    fallo.status = respuesta.status;
    fallo.codigo = contenido?.error?.codigo ?? contenido?.codigo ?? contenido?.error;
    fallo.mensaje = contenido?.error?.mensaje ?? contenido?.mensaje;

    if (respuesta.status === 429) {
      const cabecera = respuesta.headers?.get?.('Retry-After');
      fallo.retryAfterSegundos = cabecera != null && String(cabecera).trim() !== ''
        ? segundosRetryAfter(cabecera)
        : segundosRetryAfter(contenido?.error?.detalles?.reintentarEnSegundos);
    }
    throw fallo;
  }

  if (contenido?.ok === false || contenido?.exito === false) {
    const fallo = new Error('La API rechazó la solicitud');
    fallo.codigo = contenido?.error?.codigo ?? contenido?.codigo ?? contenido?.error;
    throw fallo;
  }
  return contenido?.datos ?? contenido ?? {};
}
