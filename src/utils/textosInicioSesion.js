/**
 * Adapta únicamente las cadenas que llegan desde GET /textos.
 * En caso de respuesta válida pero incompleta, NO crea textos de sustitución.
 * El respaldo de fallos de /textos vive exclusivamente en textosRespaldo().
 */
export function textosInicioSesion(textos) {
  const p = textos?.paginas?.iniciarSesion ?? textos?.paginas?.inicioSesion
    ?? textos?.paginas?.sesion ?? textos?.paginas?.ingreso;
  const f = textos?.formularios?.iniciarSesion ?? textos?.formularios?.inicioSesion
    ?? textos?.formularios?.sesion ?? p?.formulario;

  return {
    titulo: p?.titulo ?? p?.encabezado?.titulo ?? f?.titulo,
    descripcion: p?.descripcion ?? p?.encabezado?.descripcion ?? f?.descripcion,
    correo: f?.correo?.etiqueta ?? p?.campos?.correo?.etiqueta,
    correoPlaceholder: f?.correo?.placeholder ?? p?.campos?.correo?.placeholder,
    contrasenaPlaceholder: f?.contrasena?.placeholder ?? p?.campos?.contrasena?.placeholder,
    contrasena: f?.contrasena?.etiqueta ?? p?.campos?.contrasena?.etiqueta,
    mostrar: f?.contrasena?.mostrar ?? p?.botones?.mostrarContrasena,
    ocultar: f?.contrasena?.ocultar ?? p?.botones?.ocultarContrasena,
    recordar: f?.recordar ?? p?.opciones?.mantenerSesion,
    recuperar: p?.enlaces?.recuperarContrasena,
    ingresar: p?.botones?.ingresar ?? f?.botones?.ingresar,
    ingresando: p?.mensajes?.ingresando,
    sinCuenta: p?.enlaces?.sinCuenta,
    crear: p?.enlaces?.crearCuenta,
    obligatorio: p?.errores?.obligatorio,
    formato: p?.errores?.correoInvalido,
    credenciales: p?.errores?.credenciales,
    servidor: p?.errores?.servidor,
    marcaTitulo: p?.marca?.titulo,
    marcaDescripcion: p?.marca?.descripcion,
  };
}
