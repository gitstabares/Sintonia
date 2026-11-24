/**
 * Adaptadores de textos de interfaz. Nunca interpolan mensajes inventados
 * cuando /textos proporcionó un objeto válido.
 */
function primerObjeto(...valores) {
  return valores.find(valor => valor && typeof valor === 'object' && !Array.isArray(valor)) ?? null;
}

function texto(valor) {
  return typeof valor === 'string' ? valor : '';
}

function mensaje(nodo) {
  if (typeof nodo === 'string') return { titulo: '', texto: nodo, boton: '' };
  if (!nodo || typeof nodo !== 'object') return { titulo: '', texto: '', boton: '' };
  return {
    titulo: texto(nodo.titulo ?? nodo.encabezado?.titulo ?? nodo.title),
    texto: texto(nodo.texto ?? nodo.descripcion ?? nodo.generico ?? nodo.mensaje ?? nodo.detalle ?? nodo.description ?? nodo.aria),
    boton: texto(nodo.botones?.reintentar ?? nodo.botones?.volver ?? nodo.botones?.irAlInicio
      ?? nodo.acciones?.reintentar ?? nodo.acciones?.volver
      ?? nodo.reintentar ?? nodo.volver ?? nodo.boton),
  };
}

function estadoGlobal(textos) {
  return primerObjeto(
    textos?.estados,
    textos?.mensajes?.estados,
    textos?.paginas?.estados,
    textos?.peticiones?.estados,
    textos?.mensajes?.peticiones,
  );
}

function nodoError(textos, statusCode, codigo) {
  const estados = estadoGlobal(textos);
  const fuentes = [textos?.errores, estados?.errores, textos?.mensajes?.errores];
  const buscar = clave => {
    if (clave === undefined || clave === null || typeof clave === 'object') return null;
    return fuentes.find(fuente =>
      fuente && typeof fuente === 'object' && Object.hasOwn(fuente, clave))?.[clave] ?? null;
  };
  // La API documenta errores[error.codigo]. El HTTP queda como alternativa.
  const codigoExacto = buscar(codigo);
  if (codigoExacto) return codigoExacto;
  const http = Number(statusCode);
  if (!Number.isInteger(http) || http <= 0) return null;
  for (const clave of [String(http), 'http' + http, 'error' + http, 'HTTP_' + http]) {
    const encontrado = buscar(clave);
    if (encontrado) return encontrado;
  }
  return null;
}

/** Mensaje para errores del backend: {error:{codigo,mensaje,campos}}. */
export function obtenerTextoErrorCodigo(textos, codigo) {
  const nodo = nodoError(textos, 0, codigo);
  const normalizado = mensaje(nodo);
  return normalizado.texto || normalizado.titulo;
}

export function obtenerTextoNoEncontrada(textos, { recurso = '' } = {}) {
  const pagina = textos?.paginas ?? {};
  const especifico = recurso === 'album'
    ? primerObjeto(pagina.album?.noEncontrado, pagina.detalleAlbum?.noEncontrado)
    : null;
  const global = primerObjeto(
    pagina.noEncontrada,
    pagina.noEncontrado,
    pagina.paginaNoEncontrada,
    pagina.error404,
    textos?.noEncontrada,
  );
  const estados = estadoGlobal(textos);
  const elegido = especifico ?? global ?? estados?.noEncontrado
    ?? nodoError(textos, 404, 'ruta_no_encontrada')
    ?? nodoError(textos, 404, 'no_encontrado');
  const base = mensaje(elegido);
  return {
    ...base,
    boton: base.boton || texto(elegido?.botones?.inicio ?? elegido?.enlaces?.inicio
      ?? estados?.noEncontrado?.botones?.volver ?? textos?.navbar?.enlaces?.inicio),
  };
}

export function obtenerTextoPeticion(textos, {
  cargando = false, error = null, vacio = false, statusCode = 0, recurso = '',
} = {}) {
  const estados = estadoGlobal(textos);
  const estadoHTTP = Number(statusCode || error?.status || 0);
  const codigo = error?.codigo ?? error?.code;
  let nodo;
  if (cargando) {
    nodo = estados?.cargando ?? estados?.carga ?? textos?.mensajes?.cargando;
  } else if (error) {
    if (estadoHTTP === 404) {
      nodo = recurso === 'album'
        ? textos?.paginas?.album?.noEncontrado ?? textos?.paginas?.detalleAlbum?.noEncontrado
        : null;
      nodo ??= nodoError(textos, estadoHTTP, codigo) ?? obtenerTextoNoEncontrada(textos);
    } else {
      nodo = nodoError(textos, estadoHTTP, codigo);
    }
    nodo ??= estados?.error ?? estados?.fallo ?? textos?.mensajes?.error;
  } else if (vacio) {
    const vacios = estados?.vacios ?? estados?.sinResultados ?? {};
    nodo = vacios?.[recurso] ?? estados?.vacio?.[recurso] ?? estados?.vacio?.generico
      ?? estados?.vacio ?? estados?.sinDatos
      ?? textos?.mensajes?.vacio;
  }
  const resultado = mensaje(nodo);
  if (error && !resultado.boton) {
    resultado.boton = texto(estados?.error?.botones?.reintentar
      ?? estados?.reintentar ?? textos?.botones?.reintentar);
  }
  return resultado;
}

export function interpolarTexto(plantilla, variables = {}) {
  return texto(plantilla).replace(/\{(\w+)\}/g, (coincidencia, clave) =>
    Object.hasOwn(variables, clave) && variables[clave] !== undefined
      ? String(variables[clave]) : coincidencia
  );
}

/** Respaldo solo cuando el GET /textos falla o devuelve JSON inválido. */
export function textosRespaldo(idioma = 'es') {
  const en = idioma === 'en';
  const paginas = en
    ? {
      noEncontrada: { titulo: 'Page not found', texto: 'The requested page is not available.', botones: { volver: 'Back to home' } },
      album: { noEncontrado: { titulo: 'Album not found', texto: 'The album is unavailable.', botones: { volver: 'Back to catalog' } } },
      iniciarSesion: {
        titulo: 'Sign in to your account',
        descripcion: 'Sign in with the email and password for your account.',
        formulario: {
          correo: { etiqueta: 'Email address', placeholder: 'sara.quintero@correo.co' },
          contrasena: {
            etiqueta: 'Password', placeholder: '••••••••••',
            mostrar: 'Show password', ocultar: 'Hide password',
          },
          recordar: 'Keep me signed in',
        },
        enlaces: {
          recuperarContrasena: 'Forgot your password?',
          sinCuenta: "Don't have an account?",
          crearCuenta: 'Create an account',
        },
        botones: { ingresar: 'Sign in' },
        mensajes: { ingresando: 'Signing in...' },
        errores: {
          obligatorio: 'This field is required.',
          correoInvalido: 'Enter a valid email address.',
          credenciales: 'Incorrect email or password.',
          servidor: 'We could not sign you in. Please try again.',
        },
        marca: {
          titulo: 'Your music, always within reach',
          descripcion: 'Explore albums and artists from every genre.',
        },
      },
    } : {
      noEncontrada: { titulo: 'Página no encontrada', texto: 'No encontramos la página solicitada.', botones: { volver: 'Volver al inicio' } },
      album: { noEncontrado: { titulo: 'Álbum no encontrado', texto: 'No encontramos el álbum solicitado.', botones: { volver: 'Volver al catálogo' } } },
      iniciarSesion: {
        titulo: 'Ingresa a tu cuenta',
        descripcion: 'Ingresa con el correo y la contraseña de tu cuenta.',
        formulario: {
          correo: { etiqueta: 'Correo electrónico', placeholder: 'sara.quintero@correo.co' },
          contrasena: {
            etiqueta: 'Contraseña', placeholder: '••••••••••',
            mostrar: 'Mostrar contraseña', ocultar: 'Ocultar contraseña',
          },
          recordar: 'Mantener la sesión iniciada',
        },
        enlaces: {
          recuperarContrasena: '¿Olvidaste tu contraseña?',
          sinCuenta: '¿No tienes cuenta?',
          crearCuenta: 'Crea una cuenta',
        },
        botones: { ingresar: 'Ingresar' },
        mensajes: { ingresando: 'Ingresando...' },
        errores: {
          obligatorio: 'Este campo es obligatorio.',
          correoInvalido: 'Ingresa un correo electrónico válido.',
          credenciales: 'Correo o contraseña incorrectos.',
          servidor: 'No pudimos iniciar sesión. Inténtalo de nuevo.',
        },
        marca: {
          titulo: 'Tu música, siempre a mano',
          descripcion: 'Explora álbumes y artistas de todos los géneros.',
        },
      },
    };
  return {
    navbar: {
      aria: {
        navegacion: en ? 'Main navigation' : 'Navegación principal',
        idioma: en ? 'Change language' : 'Cambiar idioma',
        accesibilidad: en ? 'Accessibility' : 'Accesibilidad',
      },
      logo: { aria: 'Sintonía' },
      idiomas: { es: 'ES', en: 'EN' },
      enlaces: { inicio: en ? 'Home' : 'Inicio', catalogo: en ? 'Catalog' : 'Catálogo' },
      botones: { invitado: { ingresar: en ? 'Sign in' : 'Ingresar', crearCuenta: en ? 'Create account' : 'Crear cuenta' } },
      sesion: { cerrar: en ? 'Sign out' : 'Cerrar sesión' },
    },
    menuMovil: {
      abrir: en ? 'Open menu' : 'Abrir menú',
      cerrar: en ? 'Close menu' : 'Cerrar menú',
      botones: { invitado: { ingresar: en ? 'Sign in' : 'Ingresar' } },
      secciones: { accesibilidad: en ? 'Accessibility' : 'Accesibilidad', idioma: en ? 'Language' : 'Idioma' },
    },
    cookies: { banner: {
      titulo: 'Cookies', texto: en ? 'Choose whether to save your preferences.' : 'Elige si quieres guardar tus preferencias.',
      botones: { aceptar: en ? 'Accept' : 'Aceptar', rechazar: en ? 'Reject' : 'Rechazar' },
    }, preferencias: en ? 'Cookie preferences' : 'Preferencias de cookies' },
    footer: {
      lema: '', columnas: {}, legal: { derechos: '© {anio} Sintonía', nota: '' },
    },
    paginas,
    estados: {
      cargando: { titulo: en ? 'Loading…' : 'Cargando…', texto: en ? 'Loading content' : 'Cargando contenido' },
      error: {
        titulo: en ? 'Something went wrong' : 'Algo salió mal',
        texto: en ? 'We could not load the information.' : 'No pudimos cargar la información.',
        botones: { reintentar: en ? 'Retry' : 'Reintentar' },
      },
      errores: {
        404: { titulo: paginas.noEncontrada.titulo, texto: paginas.noEncontrada.texto,
          botones: { reintentar: en ? 'Retry' : 'Reintentar' } },
      },
      vacio: { texto: en ? 'No results yet.' : 'No hay resultados por ahora.' },
    },
  };
}
