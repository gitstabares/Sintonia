export const CLAVE_SESION = 'sintonia-sesion';

/** Valida campos, sin incluir credenciales de prueba ni simulaciones de acceso. */
export function validarCredenciales({ correo = '', contrasena = '' }) {
  const errores = {};
  if (!correo.trim()) errores.correo = 'obligatorio';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) errores.correo = 'formato';
  if (!contrasena) errores.contrasena = 'obligatorio';
  return errores;
}

/**
 * El backend recibe el correo y la clave. El nombre del campo "clave" se
 * centraliza aquí para que pueda adaptarse al contrato real si cambia.
 */
export function cuerpoInicioSesion({ correo, contrasena }) {
  return { correo: correo.trim(), clave: contrasena };
}

/** Únicamente se usa después de una respuesta HTTP exitosa de POST /sesion. */
export function identidadDeSesion(respuesta, correo) {
  const datos = respuesta?.datos ?? respuesta ?? {};
  const persona = datos?.usuario ?? datos?.cuenta ?? datos?.persona ?? datos?.perfil ?? datos;
  const nombre = persona?.nombre ?? persona?.nombreCompleto ?? persona?.nombres
    ?? datos?.nombre ?? correo;
  return { correo: String(persona?.correo ?? correo), nombre: String(nombre) };
}

/** Solo se conservan nombre y correo; nunca contraseñas ni tokens de acceso. */
export function leerSesion(almacenamientoSesion, almacenamientoPermanente) {
  for (const storage of [almacenamientoSesion, almacenamientoPermanente]) {
    try {
      const datos = JSON.parse(storage?.getItem(CLAVE_SESION) ?? 'null');
      if (datos && typeof datos.correo === 'string' && typeof datos.nombre === 'string') {
        return { correo: datos.correo, nombre: datos.nombre };
      }
    } catch { /* almacenamiento no disponible o contenido inválido */ }
  }
  return null;
}

export function limpiarSesion(almacenamientoSesion, almacenamientoPermanente) {
  for (const storage of [almacenamientoSesion, almacenamientoPermanente]) {
    try { storage?.removeItem(CLAVE_SESION); } catch { /* almacenamiento bloqueado */ }
  }
}

export function guardarSesion(usuario, recordar, almacenamientoSesion, almacenamientoPermanente) {
  limpiarSesion(almacenamientoSesion, almacenamientoPermanente);
  const storage = recordar ? almacenamientoPermanente : almacenamientoSesion;
  try { storage?.setItem(CLAVE_SESION, JSON.stringify({ correo: usuario.correo, nombre: usuario.nombre })); }
  catch { /* se mantiene la sesión en el estado React */ }
}
