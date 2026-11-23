/**
 * Las claves de /textos se consultan primero. Los valores alternativos son el
 * texto visible de la vista 4 de Figma, no contenido de cuentas de prueba.
 */
export function textosInicioSesion(textos, en = false) {
  const p = textos?.paginas?.iniciarSesion ?? textos?.paginas?.inicioSesion
    ?? textos?.paginas?.sesion ?? textos?.paginas?.ingreso;
  const defecto = en ? {
    titulo: 'Sign in to your account',
    descripcion: 'Sign in with the email and password for your account.',
    correo: 'Email address',
    contrasena: 'Password',
    mostrar: 'Show password',
    ocultar: 'Hide password',
    recordar: 'Keep me signed in',
    recuperar: 'Forgot your password?',
    ingresar: 'Sign in',
    ingresando: 'Signing in...',
    sinCuenta: "Don't have an account?",
    crear: 'Create an account',
    obligatorio: 'This field is required.',
    formato: 'Enter a valid email address.',
    credenciales: 'Incorrect email or password.',
    servidor: 'We could not sign you in. Please try again.',
    marcaTitulo: 'Your music, always within reach',
    marcaDescripcion: 'Explore albums and artists from every genre.',
  } : {
    titulo: 'Ingresa a tu cuenta',
    descripcion: 'Ingresa con el correo y la contraseña de tu cuenta.',
    correo: 'Correo electrónico',
    contrasena: 'Contraseña',
    mostrar: 'Mostrar contraseña',
    ocultar: 'Ocultar contraseña',
    recordar: 'Mantener la sesión iniciada',
    recuperar: '¿Olvidaste tu contraseña?',
    ingresar: 'Ingresar',
    ingresando: 'Ingresando...',
    sinCuenta: '¿No tienes cuenta?',
    crear: 'Crea una cuenta',
    obligatorio: 'Este campo es obligatorio.',
    formato: 'Ingresa un correo electrónico válido.',
    credenciales: 'Correo o contraseña incorrectos.',
    servidor: 'No pudimos iniciar sesión. Inténtalo de nuevo.',
    marcaTitulo: 'Tu música, siempre a mano',
    marcaDescripcion: 'Explora álbumes y artistas de todos los géneros.',
  };

  return {
    titulo: p?.titulo ?? p?.encabezado?.titulo ?? defecto.titulo,
    descripcion: p?.descripcion ?? p?.encabezado?.descripcion ?? defecto.descripcion,
    correo: p?.formulario?.correo?.etiqueta ?? p?.campos?.correo?.etiqueta ?? defecto.correo,
    contrasena: p?.formulario?.contrasena?.etiqueta ?? p?.campos?.contrasena?.etiqueta ?? defecto.contrasena,
    mostrar: p?.formulario?.contrasena?.mostrar ?? p?.botones?.mostrarContrasena ?? defecto.mostrar,
    ocultar: p?.formulario?.contrasena?.ocultar ?? p?.botones?.ocultarContrasena ?? defecto.ocultar,
    recordar: p?.formulario?.recordar ?? p?.opciones?.mantenerSesion ?? defecto.recordar,
    recuperar: p?.enlaces?.recuperarContrasena ?? defecto.recuperar,
    ingresar: p?.botones?.ingresar ?? p?.formulario?.botones?.ingresar ?? defecto.ingresar,
    ingresando: p?.mensajes?.ingresando ?? defecto.ingresando,
    sinCuenta: p?.enlaces?.sinCuenta ?? defecto.sinCuenta,
    crear: p?.enlaces?.crearCuenta ?? defecto.crear,
    obligatorio: p?.errores?.obligatorio ?? defecto.obligatorio,
    formato: p?.errores?.correoInvalido ?? defecto.formato,
    credenciales: p?.errores?.credenciales ?? defecto.credenciales,
    servidor: p?.errores?.servidor ?? defecto.servidor,
    marcaTitulo: p?.marca?.titulo ?? defecto.marcaTitulo,
    marcaDescripcion: p?.marca?.descripcion ?? defecto.marcaDescripcion,
  };
}
