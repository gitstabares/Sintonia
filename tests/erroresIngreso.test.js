import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { segundosRetryAfter, solicitarPost } from '../src/utils/peticionPost.js';
import { obtenerAvisoIngreso } from '../src/utils/erroresIngreso.js';

const textosApi = {
  paginas: { ingresar: { errores: {
    credenciales: {
      titulo: 'Correo o contraseña incorrectos',
      texto: 'Revisa los datos e inténtalo de nuevo.',
    },
    demasiadosIntentos: {
      titulo: 'Demasiados intentos',
      texto: 'Espera {segundos} segundos antes de volver a intentarlo.',
    },
    conexion: {
      titulo: 'No pudimos conectarnos',
      texto: 'Revisa tu conexión a internet e inténtalo de nuevo. Lo que escribiste se conserva.',
      botones: { reintentar: 'Reintentar' },
    },
  }}},
  errores: {
    credenciales_invalidas: 'El correo o la contraseña no coinciden.',
    demasiadas_peticiones: 'Demasiados intentos. Espera {segundos} s.',
    error_interno: 'Algo falló de nuestro lado.',
  },
  estados: { error: { titulo: 'Algo salió mal' } },
};

const mockRespuesta = (status, contenido, headers = {}) => ({
  ok: status >= 200 && status < 300,
  status,
  headers: {
    get: nombre => Object.entries(headers).find(([clave]) =>
      clave.toLowerCase() === nombre.toLowerCase())?.[1] ?? null,
  },
  text: async () => JSON.stringify(contenido),
});

test('Retry-After soporta segundos y fecha HTTP', () => {
  const base = Date.UTC(2026, 10, 24, 20, 0, 0);
  assert.equal(segundosRetryAfter('1447', base), 1447);
  assert.equal(segundosRetryAfter('2.4', base), 3);
  assert.equal(segundosRetryAfter('Tue, 24 Nov 2026 20:00:30 GMT', base), 30);
  assert.equal(segundosRetryAfter('Tue, 24 Nov 2026 19:59:59 GMT', base), 0);
  assert.equal(segundosRetryAfter(null, base), 0);
  assert.equal(segundosRetryAfter('', base), 0);
  assert.equal(segundosRetryAfter('no-es-fecha', base), 0);
  assert.equal(segundosRetryAfter('-10', base), 0);
});

test('401 credenciales_invalidas conserva código sin identificar campo errado', async () => {
  await assert.rejects(
    solicitarPost('https://ejemplo.test/api/v1', '/sesion',
      { correo: 'sara.quintero@correo.co', clave: 'incorrecta' }, {
        fetchImpl: async () => mockRespuesta(401, {
          error: { codigo: 'credenciales_invalidas',
            mensaje: 'El correo o la clave no coinciden.' },
        }),
      }),
    fallo => fallo.status === 401 && fallo.codigo === 'credenciales_invalidas',
  );
  const aviso = obtenerAvisoIngreso(textosApi,
    { status: 401, codigo: 'credenciales_invalidas',
      campos: { correo: 'dato interno que NO debe mostrarse' } });
  assert.equal(aviso.titulo, textosApi.paginas.ingresar.errores.credenciales.titulo);
  assert.equal(aviso.texto, textosApi.paginas.ingresar.errores.credenciales.texto);
  assert.ok(!JSON.stringify(aviso).includes('dato interno'));
});

test('429 prioriza cabecera Retry-After incluso si el cuerpo dice otra cosa', async () => {
  await assert.rejects(
    solicitarPost('https://ejemplo.test/api/v1', '/sesion', {}, {
      fetchImpl: async () => mockRespuesta(429, {
        error: {
          codigo: 'demasiadas_peticiones',
          detalles: { reintentarEnSegundos: 287 },
        },
      }, { 'Retry-After': '1447' }),
    }),
    fallo => fallo.status === 429 &&
      fallo.codigo === 'demasiadas_peticiones' &&
      fallo.retryAfterSegundos === 1447,
  );
});

test('429 sin cabecera aprovecha el contador documentado en el cuerpo', async () => {
  await assert.rejects(solicitarPost('https://ejemplo.test', '/sesion', {}, {
    fetchImpl: async () => mockRespuesta(429, {
      error: { codigo: 'demasiadas_peticiones',
        detalles: { reintentarEnSegundos: 287 } },
    }),
  }), fallo => fallo.retryAfterSegundos === 287);
});

test('429 interpola los segundos de Retry-After usando texto de la API', () => {
  const aviso = obtenerAvisoIngreso(textosApi,
    { status: 429, codigo: 'demasiadas_peticiones' }, 1447);
  assert.equal(aviso.titulo, 'Demasiados intentos');
  assert.equal(aviso.texto, 'Espera 1447 segundos antes de volver a intentarlo.');
  assert.equal(aviso.tipo, 'limite');
  assert.equal(aviso.reintentar, undefined);
});

test('sin red se clasifica como conexión y ofrece reintentar', async () => {
  await assert.rejects(solicitarPost('https://ejemplo.test', '/sesion', {}, {
    fetchImpl: async () => { throw new TypeError('Failed to fetch'); },
  }), fallo => fallo.status === 0 && fallo.tipo === 'conexion');

  const aviso = obtenerAvisoIngreso(textosApi, { tipo: 'conexion', status: 0 });
  assert.equal(aviso.tipo, 'conexion');
  assert.equal(aviso.titulo, textosApi.paginas.ingresar.errores.conexion.titulo);
  assert.equal(aviso.texto, textosApi.paginas.ingresar.errores.conexion.texto);
  assert.equal(aviso.reintentar, 'Reintentar');
});

test('otros errores respetan los mensajes de API sin inventar textos', () => {
  assert.equal(obtenerAvisoIngreso(textosApi,
    { status: 500, codigo: 'error_interno' }).texto, textosApi.errores.error_interno);
  assert.equal(obtenerAvisoIngreso({}, { status: 429 }).texto, undefined);
  assert.equal(obtenerAvisoIngreso(textosApi, null), null);
});

test('el formulario y el hook evitan envíos duplicados y bloqueo prematuro', () => {
  const formulario = readFileSync('src/components/FormularioSesion/FormularioSesion.jsx', 'utf8');
  const mutacion = readFileSync('src/hooks/useMutacion.js', 'utf8');
  const pagina = readFileSync('src/pages/IniciarSesion/IniciarSesion.jsx', 'utf8');
  assert.match(formulario, /envioPendiente\.current \|\| deshabilitado/);
  assert.match(formulario, /disabled=\{deshabilitado\}/);
  assert.match(formulario, /enviando \? textos\.ingresando/);
  assert.match(formulario, /aviso\?\.tipo === 'conexion'/);
  assert.match(formulario, /role=\{aviso\.tipo === 'limite' \? 'status' : 'alert'\}/);
  assert.match(mutacion, /if \(enCurso\.current\) return enCurso\.current/);
  assert.match(mutacion, /Date\.now\(\) < limiteRef\.current/);
  assert.match(mutacion, /setInterval\(actualizar, 250\)/);
  assert.match(pagina, /segundosRestantes=\{segundosRestantes\}/);
});

test('los estilos de aviso, carga y móvil usan tokens de Figma', () => {
  const css = readFileSync('src/components/FormularioSesion/FormularioSesion.css', 'utf8');
  assert.match(css, /--estado-error-suave/);
  assert.match(css, /--estado-error/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /max-width: 767px/);
});
