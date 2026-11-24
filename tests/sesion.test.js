import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validarCredenciales, cuerpoInicioSesion, identidadDeSesion,
  leerSesion, guardarSesion, limpiarSesion, CLAVE_SESION,
} from '../src/utils/sesion.js';
import { solicitarPost } from '../src/utils/peticionPost.js';

function almacenamientoFalso() {
  const valores = new Map();
  return {
    getItem: k => valores.has(k) ? valores.get(k) : null,
    setItem: (k, v) => valores.set(k, v),
    removeItem: k => valores.delete(k),
  };
}

test('campos vacíos generan errores asociados a correo y contraseña', () => {
  assert.deepEqual(validarCredenciales({ correo: '', contrasena: '' }), {
    correo: 'obligatorio',
    contrasena: 'obligatorio',
  });
  assert.deepEqual(validarCredenciales({ correo: 'sin-arroba', contrasena: '123' }), {
    correo: 'formato',
  });
  assert.deepEqual(validarCredenciales({
    correo: 'sara.quintero@correo.co', contrasena: 'sintonia123',
  }), {});
});

test('el cuerpo de la petición envía correo y clave sin registrar contraseñas', () => {
  const cuerpo = cuerpoInicioSesion({
    correo: '  sara.quintero@correo.co  ',
    contrasena: 'sintonia123',
  });
  assert.deepEqual(cuerpo, { correo: 'sara.quintero@correo.co', clave: 'sintonia123' });
});

test('solicitarPost envía POST /sesion con JSON, sin simular el acceso', async () => {
  let urlRecibida;
  let opcionesRecibidas;
  const respuesta = await solicitarPost(
    'https://ejemplo.test/api/v1/', '/sesion', { correo: 'test@correo.co', clave: '123' },
    {
      fetchImpl: async (url, opts) => {
        urlRecibida = url;
        opcionesRecibidas = opts;
        return { ok: true, status: 200, text: async () => JSON.stringify({
          datos: { usuario: { nombre: 'Sara', correo: 'test@correo.co' } },
        }) };
      },
    },
  );
  assert.equal(urlRecibida, 'https://ejemplo.test/api/v1/sesion');
  assert.equal(opcionesRecibidas.method, 'POST');
  assert.equal(opcionesRecibidas.headers['Content-Type'], 'application/json');
  assert.equal(opcionesRecibidas.credentials, 'include');
  assert.deepEqual(JSON.parse(opcionesRecibidas.body), { correo: 'test@correo.co', clave: '123' });
  assert.equal(respuesta.usuario.nombre, 'Sara');
});

test('un error 401 no produce éxito en la petición', async () => {
  await assert.rejects(
    solicitarPost('https://ejemplo.test/api/v1', '/sesion', {},
      { fetchImpl: async () => ({
        ok: false, status: 401,
        text: async () => JSON.stringify({ codigo: 'credenciales_invalidas' }),
      }) }),
    fallo => fallo.status === 401 && fallo.codigo === 'credenciales_invalidas',
  );
});

test('un 200 con ok=false no produce una sesión', async () => {
  await assert.rejects(
    solicitarPost('https://ejemplo.test/api/v1', '/sesion', {},
      { fetchImpl: async () => ({
        ok: true, status: 200,
        text: async () => JSON.stringify({ ok: false }),
      }) }),
  );
});

test('la identidad se deriva de la respuesta del servidor, no de claves locales', () => {
  assert.deepEqual(
    identidadDeSesion({ usuario: { nombre: 'Sara Quintero', correo: 'sara.quintero@correo.co' } }, 'otro@correo.co'),
    { correo: 'sara.quintero@correo.co', nombre: 'Sara Quintero' },
  );
});

test('mantener sesión solo guarda identidad pública, nunca claves o tokens', () => {
  const sesion = almacenamientoFalso();
  const permanente = almacenamientoFalso();
  const usuario = { correo: 'sara.quintero@correo.co', nombre: 'Sara', token: 'NO_GUARDAR' };
  guardarSesion(usuario, true, sesion, permanente);
  assert.equal(sesion.getItem(CLAVE_SESION), null);
  assert.ok(permanente.getItem(CLAVE_SESION));
  assert.equal(permanente.getItem(CLAVE_SESION).includes('NO_GUARDAR'), false);
  assert.deepEqual(leerSesion(sesion, permanente),
    { correo: usuario.correo, nombre: usuario.nombre });
  limpiarSesion(sesion, permanente);
  assert.equal(leerSesion(sesion, permanente), null);
});

test('sin recordar se emplea sessionStorage', () => {
  const temporal = almacenamientoFalso();
  const permanente = almacenamientoFalso();
  guardarSesion({ correo: 'x@correo.co', nombre: 'X' }, false, temporal, permanente);
  assert.ok(temporal.getItem(CLAVE_SESION));
  assert.equal(permanente.getItem(CLAVE_SESION), null);
});
