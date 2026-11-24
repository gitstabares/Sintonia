/**
 * Adapta únicamente las cadenas que llegan desde GET /textos.
 * En caso de respuesta válida pero incompleta, NO crea textos de sustitución.
 * El respaldo de fallos de /textos vive exclusivamente en textosRespaldo().
 */
export function textosInicioSesion(textos) {
  // Contrato real GET /textos (24-11-2026): paginas.ingresar y formularios.
  const ingresar = textos?.paginas?.ingresar;
  const formularioIngreso = ingresar?.formulario;
  const general = textos?.formularios;
  const p = textos?.paginas?.iniciarSesion ?? textos?.paginas?.inicioSesion
    ?? textos?.paginas?.sesion ?? textos?.paginas?.ingreso;
  const f = textos?.formularios?.iniciarSesion ?? textos?.formularios?.inicioSesion
    ?? textos?.formularios?.sesion ?? p?.formulario;

  return {
    titulo: formularioIngreso?.titulo ?? p?.titulo ?? p?.encabezado?.titulo ?? f?.titulo,
    descripcion: formularioIngreso?.subtitulo ?? p?.descripcion ?? p?.encabezado?.descripcion ?? f?.descripcion,
    correo: formularioIngreso?.etiquetas?.correo ?? general?.campos?.correo?.label ?? f?.correo?.etiqueta ?? p?.campos?.correo?.etiqueta,
    correoPlaceholder: formularioIngreso?.placeholders?.correo ?? general?.campos?.correo?.placeholder ?? f?.correo?.placeholder ?? p?.campos?.correo?.placeholder,
    contrasenaPlaceholder: formularioIngreso?.placeholders?.clave ?? general?.campos?.clave?.placeholder ?? f?.contrasena?.placeholder ?? p?.campos?.contrasena?.placeholder,
    contrasena: formularioIngreso?.etiquetas?.clave ?? general?.campos?.clave?.label ?? f?.contrasena?.etiqueta ?? p?.campos?.contrasena?.etiqueta,
    mostrar: formularioIngreso?.botones?.mostrarClave ?? general?.campos?.clave?.mostrar ?? f?.contrasena?.mostrar ?? p?.botones?.mostrarContrasena,
    ocultar: formularioIngreso?.botones?.ocultarClave ?? general?.campos?.clave?.ocultar ?? f?.contrasena?.ocultar ?? p?.botones?.ocultarContrasena,
    recordar: formularioIngreso?.etiquetas?.mantenerSesion ?? f?.recordar ?? p?.opciones?.mantenerSesion,
    recuperar: formularioIngreso?.enlaces?.olvidasteClave ?? p?.enlaces?.recuperarContrasena,
    ingresar: formularioIngreso?.botones?.ingresar ?? p?.botones?.ingresar ?? f?.botones?.ingresar,
    ingresando: formularioIngreso?.mensajes?.ingresando ?? p?.mensajes?.ingresando,
    sinCuenta: formularioIngreso?.mensajes?.sinCuenta ?? p?.enlaces?.sinCuenta,
    crear: formularioIngreso?.enlaces?.crearCuenta ?? p?.enlaces?.crearCuenta,
    obligatorio: general?.validacion?.requerido ?? p?.errores?.obligatorio,
    correoObligatorio: ingresar?.errores?.correoObligatorio ?? general?.validacion?.requerido,
    claveObligatoria: ingresar?.errores?.claveObligatoria ?? general?.validacion?.requerido,
    formato: general?.validacion?.correo ?? p?.errores?.correoInvalido,
    credenciales: ingresar?.errores?.credenciales?.texto ?? p?.errores?.credenciales,
    servidor: ingresar?.errores?.conexion?.texto ?? p?.errores?.servidor,
    marcaTitulo: ingresar?.presentacion?.titulo ?? p?.marca?.titulo,
    marcaDescripcion: ingresar?.presentacion?.texto ?? p?.marca?.descripcion,
  };
}
