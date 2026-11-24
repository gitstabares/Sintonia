import { interpolarTexto } from './textosInterfaz.js';

/**
 * La API publica el aviso de acceso en paginas.ingresar.errores y los errores
 * genéricos por código en errores. Nunca se revelan campos de un HTTP 401.
 */
export function obtenerAvisoIngreso(textos, error, segundosRestantes = 0) {
  if (!error) return null;

  const erroresIngreso = textos?.paginas?.ingresar?.errores;
  const esConexion = error.tipo === 'conexion';
  const esLimite = error.status === 429;
  const esCredenciales = error.status === 401 &&
    (error.codigo === 'credenciales_invalidas' || !error.codigo);

  let contenido;
  if (esConexion) contenido = erroresIngreso?.conexion;
  else if (esLimite) contenido = erroresIngreso?.demasiadosIntentos;
  else if (esCredenciales) contenido = erroresIngreso?.credenciales;
  else contenido = textos?.errores?.[error.codigo] ?? textos?.estados?.error;

  const titulo = typeof contenido === 'object' && contenido !== null
    ? contenido.titulo : undefined;
  const texto = typeof contenido === 'string'
    ? contenido
    : contenido?.texto ?? contenido?.descripcion ?? contenido?.mensaje;

  // El tiempo siempre procede de Retry-After procesado por useMutacion.
  const variables = { segundos: segundosRestantes };
  return {
    titulo: titulo ? interpolarTexto(titulo, variables) : undefined,
    texto: texto ? interpolarTexto(texto, variables) : undefined,
    reintentar: esConexion
      ? (erroresIngreso?.conexion?.botones?.reintentar
        ?? textos?.estados?.error?.botones?.reintentar) : undefined,
    tipo: esLimite ? 'limite' : esConexion ? 'conexion' : 'error',
  };
}
