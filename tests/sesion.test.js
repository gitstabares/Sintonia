import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validarCredenciales, cuerpoInicioSesion } from '../src/utils/sesion.js';
import { solicitarPost } from '../src/utils/peticionPost.js';
import {
  cuentaPublica, obtenerSesion, eliminarSesion,
  habiaSesionConfirmada, marcarSesionConfirmada,
  limpiarIdentidadObsoleta, CLAVE_SESION_CONFIRMADA,
} from '../src/utils/peticionesSesion.js';

function almacenamientoFalso() {
  const mapa = new Map();
  return {
    getItem: k => mapa.get(k) ?? null,
    setItem: (k, v) => mapa.set(k, v),
    removeItem: k => mapa.delete(k),
    todos: () => [...mapa.entries()],
  };
}
const respuesta = (status, datos = null) => ({
  ok: status >= 200 && status < 300,
  status,
  text: async () => datos === null ? '' : JSON.stringify(datos),
});

test('los campos de ingreso siguen validándose antes de POST', () => {
  assert.deepEqual(validarCredenciales({ correo: '', contrasena: '' }),
    { correo: 'obligatorio', contrasena: 'obligatorio' });
  assert.deepEqual(validarCredenciales({ correo: 'sin-arroba', contrasena: '123' }),
    { correo: 'formato' });
  assert.deepEqual(validarCredenciales({
    correo: 'sara.quintero@correo.co', contrasena: 'sintonia123',
  }), {});
});

test('POST /sesion incluye cookies pero no registra token del resultado', async () => {
  let url, opciones;
  const resultado = await solicitarPost('https://ejemplo.test/api/v1/', '/sesion',
    cuerpoInicioSesion({ correo: ' sara.quintero@correo.co ', contrasena: 'sintonia123' }), {
      fetchImpl: async (urlRecibida, opts) => {
        url = urlRecibida;
        opciones = opts;
        return respuesta(200, { usuario: { nombre: 'Sara Quintero', correo: 'sara.quintero@correo.co' },
          token: 'NO_GUARDAR' });
      },
    });
  assert.equal(url, 'https://ejemplo.test/api/v1/sesion');
  assert.equal(opciones.method, 'POST');
  assert.equal(opciones.credentials, 'include');
  assert.deepEqual(JSON.parse(opciones.body),
    { correo: 'sara.quintero@correo.co', clave: 'sintonia123' });
  assert.equal(resultado.token, 'NO_GUARDAR'); // Solo el backend lo conserva en cookie.
});

test('POST con 401 o 200/ok=false jamás inicia sesión', async () => {
  await assert.rejects(solicitarPost('https://ejemplo.test/api/v1', '/sesion', {},
    { fetchImpl: async () => respuesta(401, { error: { codigo: 'credenciales_invalidas' } }) }),
  e => e.status === 401 && e.codigo === 'credenciales_invalidas');
  await assert.rejects(solicitarPost('https://ejemplo.test/api/v1', '/sesion', {},
    { fetchImpl: async () => respuesta(200, { ok: false }) }));
});

test('GET /sesion utiliza cookie HttpOnly mediante credentials include y respuesta plana', async () => {
  let url, opciones;
  const cuenta = await obtenerSesion('https://ejemplo.test/api/v1', {
    fetchImpl: async (u, opts) => {
      url = u;
      opciones = opts;
      return respuesta(200, {
        id: 's1', nombre: 'Sara Quintero', correo: 'sara.quintero@correo.co',
        iniciales: 'SQ', colorHex: '#8E7BFF', plan: 'gratis',
        token: 'CONFIDENCIAL', permisos: { descargas: true },
      });
    },
  });
  assert.equal(url, 'https://ejemplo.test/api/v1/sesion');
  assert.equal(opciones.method, 'GET');
  assert.equal(opciones.credentials, 'include');
  assert.deepEqual(cuenta, {
    id: 's1', nombre: 'Sara Quintero', correo: 'sara.quintero@correo.co',
    iniciales: 'SQ', colorHex: '#8E7BFF',
  });
  assert.ok(!JSON.stringify(cuenta).includes('CONFIDENCIAL'));
});

test('solo se acepta identidad procedente de GET /sesion y se valida su estructura', () => {
  assert.deepEqual(cuentaPublica({ usuario: {
    nombre: 'Sara', correo: 'sara@correo.co', iniciales: 'S', colorHex: 'red',
  }}), {
    id: null, nombre: 'Sara', correo: 'sara@correo.co', iniciales: 'S', colorHex: null,
  });
  assert.throws(() => cuentaPublica({ usuario: { correo: 'sara@correo.co' } }));
  assert.throws(() => cuentaPublica({ token: 'esto-no-es-identidad' }));
  assert.throws(() => cuentaPublica(null));
});

test('401 no_autenticado de GET se propaga y permite detectar sesión vencida', async () => {
  await assert.rejects(obtenerSesion('https://ejemplo.test/api/v1', {
    fetchImpl: async () => respuesta(401,
      { error: { codigo: 'no_autenticado', mensaje: 'Inicia sesión para continuar.' } }),
  }), fallo => fallo.status === 401 && fallo.codigo === 'no_autenticado');
});

test('un error 500 o JSON inválido de GET no se interpreta como visitante confirmado', async () => {
  await assert.rejects(obtenerSesion('https://ejemplo.test', {
    fetchImpl: async () => respuesta(500, { error: { codigo: 'error_interno' } }),
  }), fallo => fallo.status === 500 && fallo.codigo === 'error_interno');
  await assert.rejects(obtenerSesion('https://ejemplo.test', {
    fetchImpl: async () => ({
      ok: true, status: 200, text: async () => 'esto no es json',
    }),
  }));
});

test('DELETE /sesion acepta HTTP 204 sin cuerpo y envía cookie al servidor', async () => {
  let url, opciones;
  const resultado = await eliminarSesion('https://ejemplo.test/api/v1/', {
    fetchImpl: async (u, opts) => {
      url = u; opciones = opts;
      return { ok: true, status: 204 };
    },
  });
  assert.equal(resultado, undefined);
  assert.equal(url, 'https://ejemplo.test/api/v1/sesion');
  assert.equal(opciones.method, 'DELETE');
  assert.equal(opciones.credentials, 'include');
  assert.equal(opciones.body, undefined);
});

test('un fallo en DELETE /sesion no permite afirmar que se cerró', async () => {
  await assert.rejects(eliminarSesion('https://ejemplo.test', {
    fetchImpl: async () => respuesta(503, { error: { codigo: 'error_interno' } }),
  }), fallo => fallo.status === 503);
  await assert.rejects(eliminarSesion('https://ejemplo.test', {
    fetchImpl: async () => { throw new TypeError('sin red'); },
  }), TypeError);
});

test('solo se guarda una marca no sensible en sessionStorage, nunca identidad ni token', () => {
  const almacenamiento = almacenamientoFalso();
  assert.equal(habiaSesionConfirmada(almacenamiento), false);
  marcarSesionConfirmada(almacenamiento, true);
  assert.equal(habiaSesionConfirmada(almacenamiento), true);
  assert.deepEqual(almacenamiento.todos(), [[CLAVE_SESION_CONFIRMADA, '1']]);
  marcarSesionConfirmada(almacenamiento, false);
  assert.equal(habiaSesionConfirmada(almacenamiento), false);
});

test('se eliminan identidades persistidas por la implementación anterior', () => {
  const temporal = almacenamientoFalso();
  const permanente = almacenamientoFalso();
  temporal.setItem('sintonia-sesion', '{"nombre":"Sara"}');
  permanente.setItem('sintonia-sesion', '{"nombre":"Sara"}');
  permanente.setItem('idioma', 'es');
  limpiarIdentidadObsoleta(temporal, permanente);
  assert.equal(temporal.getItem('sintonia-sesion'), null);
  assert.equal(permanente.getItem('sintonia-sesion'), null);
  assert.equal(permanente.getItem('idioma'), 'es');
});

test('App valida GET antes de mostrar cuenta y confirma cookie tras POST', () => {
  const app = readFileSync('src/App.jsx', 'utf8');
  const hook = readFileSync('src/hooks/useSesion.js', 'utf8');
  const ingreso = readFileSync('src/pages/IniciarSesion/IniciarSesion.jsx', 'utf8');
  assert.match(app, /const estadoSesion = useSesion\(onExpirada\)/);
  assert.match(app, /if \(estadoSesion.cargando\)/);
  assert.match(app, /if \(estadoSesion.error/);
  assert.match(app, /onExpirada = useCallback\(\(\) => navegar\('\/iniciarSesion'/);
  assert.match(hook, /await obtenerSesion\(API_BASE\)/);
  assert.match(hook, /return verificar\(\{ silencioso: true, exigirSesion: true \}\)/);
  assert.match(hook, /const expiro = fallo.status === 401/);
  assert.match(hook, /if \(huboSesion && !exigirSesion\) expiradaRef\.current/);
  assert.match(ingreso, /await ejecutar\(cuerpoInicioSesion\(credenciales\)\)/);
  assert.match(ingreso, /await iniciarSesion\(\)/);
  assert.doesNotMatch(app, /guardarSesion|leerSesion|limpiarSesion/);
  assert.doesNotMatch(hook, /setItem\([^,]+,\s*JSON\.stringify\(/);
});

test('logout depende de DELETE y no borra identidad si el backend falla', () => {
  const hook = readFileSync('src/hooks/useSesion.js', 'utf8');
  const app = readFileSync('src/App.jsx', 'utf8');
  assert.match(hook, /await eliminarSesion\(API_BASE\)/);
  assert.match(hook, /setErrorCierre\(fallo\)/);
  assert.match(hook, /return false/);
  assert.match(hook, /ultimoIntento\.current\+\+/);
  assert.match(app, /if \(cerrada\) navegar\(enlaces\.inicio/);
});

test('navegación muestra menú de cuenta web, bloque móvil y botones visitante', () => {
  const nav = readFileSync('src/components/Navbar/Navbar.jsx', 'utf8');
  assert.match(nav, /aria-haspopup="menu"/);
  assert.match(nav, /aria-expanded=\{cuentaAbierta\}/);
  assert.match(nav, /className="header-cuenta__menu" role="menu"/);
  assert.match(nav, /sesion\.correo/);
  assert.match(nav, /className="header-cuenta-movil"/);
  assert.match(nav, /nav\?\.botones\?\.invitado\?\.ingresar/);
  assert.match(nav, /nav\?\.botones\?\.invitado\?\.crearCuenta/);
  assert.match(nav, /const cerrado = await onCerrarSesion\?\.\(\)/);
});
