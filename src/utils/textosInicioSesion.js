/**
 * Adapta únicamente las cadenas que llegan desde GET /textos.
 * En caso de respuesta válida pero incompleta, NO crea textos de sustitución.
 * El respaldo de fallos de /textos vive exclusivamente en textosRespaldo().
 */
export function textosInicioSesion(textos) {
  const p = textos?.paginas?.iniciarSesion ?? textos?.paginas?.inicioSesion
    ?? textos?.paginas?.sesion ?? textos?.paginas?.ingreso;

  return {
    titulo: p?.titulo ?? p?.encabezado?.titulo,
    descripcion: p?.descripcion ?? p?.encabezado?.descripcion,
    correo: p?.formulario?.correo?.etiqueta ?? p?.campos?.correo?.etiqueta,
    correoPlaceholder: p?.formulario?.correo?.placeholder ?? p?.campos?.correo?.placeholder,
    contrasenaPlaceholder: p?.formulario?.contrasena?.placeholder ?? p?.campos?.contrasena?.placeholder,
    contrasena: p?.formulario?.contrasena?.etiqueta ?? p?.campos?.contrasena?.etiqueta,
    mostrar: p?.formulario?.contrasena?.mostrar ?? p?.botones?.mostrarContrasena,
    ocultar: p?.formulario?.contrasena?.ocultar ?? p?.botones?.ocultarContrasena,
    recordar: p?.formulario?.recordar ?? p?.opciones?.mantenerSesion,
    recuperar: p?.enlaces?.recuperarContrasena,
    ingresar: p?.botones?.ingresar ?? p?.formulario?.botones?.ingresar,
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
