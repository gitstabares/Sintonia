export function crearUrlRecurso(base, ruta, parametros = {}) {
  const origen = String(base || '').replace(/\/+$/, '');
  const destino = ruta.startsWith('/') ? ruta : `/${ruta}`;
  const consulta = new URLSearchParams();
  for (const [clave, valor] of Object.entries(parametros)) {
    if (valor !== null && valor !== undefined && valor !== '') consulta.set(clave, String(valor));
  }
  const query = consulta.toString();
  return `${origen}${destino}${query ? `?${query}` : ''}`;
}
