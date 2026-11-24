import { crearUrlRecurso } from './api.js';

/**
 * La cookie "sesion" pertenece al backend (HttpOnly). El cliente NO necesita
 * acceder al token de POST /sesion ni persistirlo en storage.
 */
async function solicitarSesion(base, metodo, { signal, fetchImpl = fetch } = {}) {
  const respuesta = await fetchImpl(crearUrlRecurso(base, '/sesion'), {
    method: metodo,
    headers: { Accept: 'application/json' },
    credentials: 'include',
    signal,
  });

  let contenido = null;
  if (respuesta.status !== 204) {
    const cuerpo = await respuesta.text();
    if (cuerpo) {
      try { contenido = JSON.parse(cuerpo); }
      catch {
        if (respuesta.ok) throw new Error('JSON de sesión no válido');
      }
    }
  }

  if (!respuesta.ok) {
    const error = new Error('HTTP ' + respuesta.status);
    error.status = respuesta.status;
    error.codigo = contenido?.error?.codigo ?? contenido?.codigo;
    throw error;
  }

  return contenido;
}

/** Devuelve únicamente los datos públicos de GET /sesion, sin token. */
export function cuentaPublica(respuesta) {
  const origen = respuesta?.datos ?? respuesta;
  const persona = origen?.usuario ?? origen;
  if (!persona || typeof persona.nombre !== 'string' ||
      !persona.nombre.trim() || typeof persona.correo !== 'string' ||
      !persona.correo.trim()) {
    throw new Error('La cuenta de sesión no tiene nombre o correo');
  }

  return {
    id: persona.id ?? null,
    nombre: persona.nombre,
    correo: persona.correo,
    iniciales: typeof persona.iniciales === 'string' ? persona.iniciales : '',
    colorHex: /^#[0-9a-fA-F]{6}$/.test(persona.colorHex ?? '')
      ? persona.colorHex : null,
  };
}

export async function obtenerSesion(base, opciones) {
  return cuentaPublica(await solicitarSesion(base, 'GET', opciones));
}

/** DELETE /sesion responde 204, sin cuerpo. Un error NO equivale a logout. */
export async function eliminarSesion(base, opciones) {
  await solicitarSesion(base, 'DELETE', opciones);
}

/**
 * Indicio no sensible para distinguir una sesión vencida tras recargar
 * de una visita que nunca ingresó. No contiene identidad ni credenciales.
 */
export const CLAVE_SESION_CONFIRMADA = 'sintonia-sesion-confirmada';

export function habiaSesionConfirmada(almacenamiento) {
  try { return almacenamiento?.getItem(CLAVE_SESION_CONFIRMADA) === '1'; }
  catch { return false; }
}

export function marcarSesionConfirmada(almacenamiento, confirmada) {
  try {
    if (confirmada) almacenamiento?.setItem(CLAVE_SESION_CONFIRMADA, '1');
    else almacenamiento?.removeItem(CLAVE_SESION_CONFIRMADA);
  } catch { /* Navegadores con storage bloqueado siguen usando la cookie. */ }
}

/** Borra el rastro de la persistencia obsoleta de S2-03. */
export function limpiarIdentidadObsoleta(sessionStorage, localStorage) {
  for (const storage of [sessionStorage, localStorage]) {
    try { storage?.removeItem('sintonia-sesion'); }
    catch { /* No es necesario para usar la cookie. */ }
  }
}
