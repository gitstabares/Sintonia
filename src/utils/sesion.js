/** Valida campos sin credenciales de demostración ni acceso simulado. */
export function validarCredenciales({ correo = '', contrasena = '' }) {
  const errores = {};
  if (!correo.trim()) errores.correo = 'obligatorio';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) errores.correo = 'formato';
  if (!contrasena) errores.contrasena = 'obligatorio';
  return errores;
}

/** La API POST /sesion recibe correo y clave (no "contrasena"). */
export function cuerpoInicioSesion({ correo, contrasena }) {
  return { correo: correo.trim(), clave: contrasena };
}
