import useRecurso from './useRecurso.js';

// El endpoint de sección utiliza el mismo contrato de idioma que /textos.
export function extraerTextosAccesibilidad(respuesta) {
  if (respuesta?.textos?.accesibilidad) return respuesta.textos.accesibilidad;
  if (respuesta?.accesibilidad) return respuesta.accesibilidad;
  if (respuesta?.tamanoTexto) return respuesta;
  return null;
}

export default function useTextosAccesibilidad(idioma) {
  const { datos, cargando, error, recargar } = useRecurso('/textos', {
    idioma,
    seccion: 'accesibilidad',
  });
  return {
    textos: { accesibilidad: extraerTextosAccesibilidad(datos) },
    cargando,
    error,
    recargar,
  };
}
