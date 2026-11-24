import { crearUrlRecurso } from './api.js';

/**
 * Contrato HTTP reutilizable por useMutacion.
 * Un HTTP 4xx/5xx nunca se convierte en una sesión iniciada.
 */
export async function solicitarPost(base, ruta, cuerpo, opciones = {}) {
  const { signal, fetchImpl = fetch } = opciones;
  const respuesta = await fetchImpl(crearUrlRecurso(base, ruta), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    credentials: 'include',
    body: JSON.stringify(cuerpo),
    signal,
  });
  const texto = await respuesta.text();
  let contenido = null;
  if (texto) {
    try { contenido = JSON.parse(texto); }
    catch { contenido = null; }
  }
  if (!respuesta.ok) {
    const fallo = new Error('HTTP ' + respuesta.status);
    fallo.status = respuesta.status;
    fallo.codigo = contenido?.codigo ?? contenido?.error?.codigo ?? contenido?.error;
    fallo.mensaje = contenido?.mensaje ?? contenido?.error?.mensaje;
    throw fallo;
  }
  if (contenido?.ok === false || contenido?.exito === false) {
    const fallo = new Error('La API rechazó la solicitud');
    fallo.codigo = contenido?.codigo ?? contenido?.error;
    throw fallo;
  }
  return contenido?.datos ?? contenido ?? {};
}
