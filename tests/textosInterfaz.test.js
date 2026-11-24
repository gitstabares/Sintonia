import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import {
  obtenerTextoPeticion,
  obtenerTextoNoEncontrada,
  interpolarTexto,
} from '../src/utils/textosInterfaz.js';
import { textosInicioSesion } from '../src/utils/textosInicioSesion.js';
import { validarTextos } from '../src/utils/validarTextos.js';
import { obtenerTextoErrorCodigo } from '../src/utils/textosInterfaz.js';

const textos = {
  estados: {
    cargando: { titulo: 'API: cargando', texto: 'API: solicitando contenido' },
    error: { titulo: 'API: error general', texto: 'API: error de comunicación', botones: { reintentar: 'API: Repetir' } },
    errores: {
      404: { titulo: 'API: 404', texto: 'API: recurso no encontrado' },
      401: { titulo: 'API: sin acceso', texto: 'API: sesión necesaria' },
      500: { titulo: 'API: servidor', texto: 'API: servicio indisponible' },
    },
    vacio: { texto: 'API: sin resultados' },
  },
  paginas: {
    noEncontrada: {
      titulo: 'API: página ausente', texto: 'API: esta ruta no existe',
      botones: { volver: 'API: inicio' },
    },
    album: {
      noEncontrado: {
        titulo: 'API: álbum ausente', texto: 'API: no existe ese álbum',
        botones: { volver: 'API: catálogo' },
      },
    },
  },
};

test('los textos de carga se obtienen de /textos, no de frases fijas', () => {
  assert.deepEqual(obtenerTextoPeticion(textos, { cargando: true }), {
    titulo: 'API: cargando', texto: 'API: solicitando contenido', boton: '',
  });
});
test('cada HTTP de error selecciona sus propios textos y el reintento de API', () => {
  assert.deepEqual(obtenerTextoPeticion(textos, { error: new Error('X'), statusCode: 500 }), {
    titulo: 'API: servidor', texto: 'API: servicio indisponible', boton: 'API: Repetir',
  });
  assert.equal(obtenerTextoPeticion(textos, { error: { status: 401 } }).titulo, 'API: sin acceso');
  assert.equal(obtenerTextoPeticion(textos, { error: new Error('X'), statusCode: 0 }).texto,
    'API: error de comunicación');
});
test('un HTTP 404 y la página no encontrada usan el texto correspondiente', () => {
  assert.equal(obtenerTextoPeticion(textos, { error: { status: 404 } }).titulo, 'API: 404');
  assert.deepEqual(obtenerTextoNoEncontrada(textos), {
    titulo: 'API: página ausente', texto: 'API: esta ruta no existe', boton: 'API: inicio',
  });
  assert.equal(obtenerTextoNoEncontrada(textos, { recurso: 'album' }).titulo, 'API: álbum ausente');
});
test('los estados sin resultados y plantillas también proceden de API', () => {
  assert.equal(obtenerTextoPeticion(textos, { vacio: true, recurso: 'albumes' }).texto,
    'API: sin resultados');
  assert.equal(interpolarTexto('API: {nombre} (HTTP {codigo})', {
    nombre: 'álbumes', codigo: 500,
  }), 'API: álbumes (HTTP 500)');
});
test('se admiten claves alternativas de estados y errores', () => {
  const otros = { mensajes: {
    estados: { cargando: 'API: esperando', error: { texto: 'API: fallo' } },
    errores: { 403: { titulo: 'API: denegado' } },
  }};
  assert.equal(obtenerTextoPeticion(otros, { cargando: true }).texto, 'API: esperando');
  assert.equal(obtenerTextoPeticion(otros, { error: { status: 403 } }).titulo, 'API: denegado');
});
test('sin claves de texto, una respuesta válida no genera mensajes inventados', () => {
  assert.deepEqual(obtenerTextoPeticion({}, { error: { status: 503 } }),
    { titulo: '', texto: '', boton: '' });
  assert.deepEqual(obtenerTextoNoEncontrada({}),
    { titulo: '', texto: '', boton: '' });
});

test('la sección ausente en una respuesta válida no genera textos predeterminados', () => {
  const normal = { paginas: { iniciarSesion: {
    titulo: 'API: entrar',
    formulario: { correo: { etiqueta: 'API: correo' } },
  } } };
  const ingreso = textosInicioSesion(normal);
  assert.equal(ingreso.titulo, 'API: entrar');
  assert.equal(ingreso.correo, 'API: correo');
  assert.equal(ingreso.contrasena, undefined);
  assert.equal(ingreso.mostrar, undefined);
  assert.equal(ingreso.recuperar, undefined);
  assert.equal(ingreso.obligatorio, undefined);

  const inexistente = textosInicioSesion({ paginas: {} });
  assert.ok(Object.values(inexistente).every(valor => valor === undefined));
});

test('si falta la sección de sesión, los textos quedan vacíos', () => {
  const ingreso = textosInicioSesion({ paginas: {} });
  assert.ok(Object.values(ingreso).every(valor => valor === undefined));
});

test('GET /albumes usa orden y limite admitidos, sin filtros arbitrarios', () => {
  const albumes = readFileSync('src/hooks/useAlbumes.js', 'utf8');
  const generos = readFileSync('src/hooks/useGeneros.js', 'utf8');
  assert.match(albumes, /useRecurso\('\/albumes', \{ orden, limite \}, activo\)/);
  assert.doesNotMatch(albumes, /\bfiltros\s*=/);
  assert.match(generos, /useRecurso\(ruta, \{\}, activo\)/);
  assert.doesNotMatch(generos, /\bfiltros\s*=/);
  const home = readFileSync('src/pages/Home/Home.jsx', 'utf8');
  const catalogo = readFileSync('src/pages/Catalogo/Catalogo.jsx', 'utf8');
  assert.match(home, /useAlbumes\(6, 'populares'\)/);
  assert.match(catalogo, /useAlbumes\(6, 'populares', !gen_id\)/);
  assert.match(catalogo, /useGeneros\(gen_id, Boolean\(gen_id\)\)/);
});

test('el código de inicio de sesión no contiene textos de sustitución', () => {
  const codigo = readFileSync('src/utils/textosInicioSesion.js', 'utf8');
  assert.doesNotMatch(codigo, /const defecto\s*=/);
  assert.doesNotMatch(codigo, /seccionIncompleta/);
  assert.doesNotMatch(codigo, /'Ingresa a tu cuenta'|'Sign in to your account'/);
  const app = readFileSync('src/App.jsx', 'utf8');
  assert.match(app, /<EstadoPeticion falloTextos/);
  assert.doesNotMatch(app, /textosRespaldo|useTextosAccesibilidad/);
});


test('las etiquetas ES/EN del selector no son cadenas locales al recibir textos válidos', () => {
  const fuente = readFileSync('src/components/SelectorIdioma/SelectorIdioma.jsx', 'utf8');
  assert.doesNotMatch(fuente, />ES<\/span>|>EN<\/span>/);
  assert.match(fuente, /etiquetaIdioma\(idiomas\?\.es\)/);
  assert.match(fuente, /etiquetaIdioma\(idiomas\?\.en\)/);
  const navbar = readFileSync('src/components/Navbar/Navbar.jsx', 'utf8');
  assert.match(navbar, /textos\?\.idioma\?\.codigos/);
});


test('acepta JSON parcial de GET /textos guardado en Postman sin activar textos de respaldo', () => {
  const ejemplo = JSON.parse(readFileSync('tests/fixtures/postman-textos-parcial.json', 'utf8'));
  assert.equal(ejemplo.idioma, 'en');
  assert.equal(ejemplo.textos.navbar.botones.invitado.ingresar, 'Log in');
  assert.equal(ejemplo.textos.navbar.enlaces.conSesion.inicio, 'Home');
  assert.ok(ejemplo.textos.paginas.inicio.seo.titulo);
  const resultado = validarTextos(ejemplo);
  assert.equal(resultado, ejemplo.textos);
  assert.equal(resultado.cookies, undefined);
});

test('rechaza JSON no válido sin completar secciones faltantes', () => {
  assert.throws(() => validarTextos({ textos: {} }));
  assert.throws(() => validarTextos({ textos: [] }));
  assert.deepEqual(validarTextos({ textos: { errores: { no_encontrado: 'Sin resultado' } } }),
    { errores: { no_encontrado: 'Sin resultado' } });
});

test('prioriza textos.errores[codigo] sobre códigos de estado HTTP', () => {
  const apiTextos = {
    errores: {
      credenciales_invalidas: 'API: revisa el correo y la contraseña',
      no_autenticado: { mensaje: 'API: inicia tu sesión' },
      no_encontrado: { titulo: 'API: no encontrado', texto: 'API: el recurso no existe' },
    },
    estados: {
      error: { titulo: 'API: fallo general' },
      errores: { 401: { titulo: 'API: error HTTP 401' } },
    },
  };
  assert.equal(obtenerTextoErrorCodigo(apiTextos, 'credenciales_invalidas'),
    'API: revisa el correo y la contraseña');
  const err = obtenerTextoPeticion(apiTextos, {
    error: { status: 401, codigo: 'no_autenticado' },
  });
  assert.equal(err.texto, 'API: inicia tu sesión');
  assert.equal(err.titulo, '');
  assert.equal(obtenerTextoPeticion(apiTextos, {
    error: { status: 404, codigo: 'no_encontrado' },
  }).titulo, 'API: no encontrado');
});

test('la respuesta 404 guardada en Postman contiene el código del backend', () => {
  const ejemplo = JSON.parse(readFileSync('tests/fixtures/postman-textos-error-404.json', 'utf8'));
  assert.equal(ejemplo.error.codigo, 'seccion_no_encontrada');
  assert.ok(Array.isArray(ejemplo.error.detalles.disponibles));
  assert.ok(ejemplo.error.detalles.disponibles.includes('errores'));
  assert.ok(ejemplo.error.detalles.disponibles.includes('formularios'));
});

test('los textos del formulario también se leen de la sección global formularios', () => {
  const data = textosInicioSesion({ formularios: {
    iniciarSesion: {
      titulo: 'API: acceder',
      correo: { etiqueta: 'API: dirección de correo' },
      contrasena: { etiqueta: 'API: clave' },
    },
  }});
  assert.equal(data.titulo, 'API: acceder');
  assert.equal(data.correo, 'API: dirección de correo');
  assert.equal(data.contrasena, 'API: clave');
  assert.equal(data.recuperar, undefined);
});
