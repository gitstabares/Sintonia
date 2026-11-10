import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CLAVE_ACCESIBILIDAD,
  PREFERENCIAS_ACCESIBILIDAD,
  normalizarAccesibilidad,
  leerAccesibilidad,
  guardarAccesibilidad,
  aplicarAccesibilidad,
} from '../src/utils/accesibilidad.js';

function almacenamientoPrueba() {
  const valores = new Map();
  return {
    getItem: clave => valores.get(clave) ?? null,
    setItem: (clave, valor) => valores.set(clave, String(valor)),
    removeItem: clave => valores.delete(clave),
  };
}

function raizPrueba() {
  const activos = new Set();
  return {
    style: { fontSize: '' },
    toggleAttribute(nombre, activo) {
      if (activo) activos.add(nombre);
      else activos.delete(nombre);
    },
    hasAttribute: nombre => activos.has(nombre),
  };
}

test('las cinco preferencias están desactivadas inicialmente', () => {
  assert.deepEqual(Object.keys(PREFERENCIAS_ACCESIBILIDAD), [
    'textoGrande', 'altoContraste', 'reducirMovimiento', 'subrayarEnlaces', 'espaciadoLectura',
  ]);
  assert.deepEqual(leerAccesibilidad(almacenamientoPrueba(), null), { ...PREFERENCIAS_ACCESIBILIDAD });
});

test('normaliza valores externos para aceptar solo booleanos verdaderos', () => {
  assert.deepEqual(normalizarAccesibilidad({ altoContraste: true, reducirMovimiento: 'true', datoDesconocido: true }), {
    ...PREFERENCIAS_ACCESIBILIDAD, altoContraste: true,
  });
});

test('persiste los ajustes solamente tras aceptar el consentimiento', () => {
  const storage = almacenamientoPrueba();
  guardarAccesibilidad(storage, { textoGrande: true }, 'rechazado');
  assert.equal(storage.getItem(CLAVE_ACCESIBILIDAD), null);
  guardarAccesibilidad(storage, { textoGrande: true, altoContraste: true }, 'aceptado');
  assert.equal(leerAccesibilidad(storage, 'aceptado').textoGrande, true);
  assert.equal(leerAccesibilidad(storage, 'aceptado').altoContraste, true);
  guardarAccesibilidad(storage, { textoGrande: true }, null);
  assert.equal(storage.getItem(CLAVE_ACCESIBILIDAD), null);
});

test('rechaza datos dañados sin romper la interfaz', () => {
  const storage = almacenamientoPrueba();
  storage.setItem(CLAVE_ACCESIBILIDAD, '{');
  assert.deepEqual(leerAccesibilidad(storage, 'aceptado'), { ...PREFERENCIAS_ACCESIBILIDAD });
});

test('activa y revierte las cinco opciones en el documento', () => {
  const raiz = raizPrueba();
  aplicarAccesibilidad(raiz, {
    textoGrande: true,
    altoContraste: true,
    reducirMovimiento: true,
    subrayarEnlaces: true,
    espaciadoLectura: true,
  });
  assert.equal(raiz.style.fontSize, '112.5%');
  for (const nombre of [
    'data-accesibilidad-contraste',
    'data-accesibilidad-movimiento',
    'data-accesibilidad-enlaces',
    'data-accesibilidad-lectura',
  ]) assert.equal(raiz.hasAttribute(nombre), true);

  aplicarAccesibilidad(raiz, PREFERENCIAS_ACCESIBILIDAD);
  assert.equal(raiz.style.fontSize, '');
  assert.equal(raiz.hasAttribute('data-accesibilidad-contraste'), false);
  assert.equal(raiz.hasAttribute('data-accesibilidad-movimiento'), false);
  assert.equal(raiz.hasAttribute('data-accesibilidad-enlaces'), false);
  assert.equal(raiz.hasAttribute('data-accesibilidad-lectura'), false);
});

test('tolera el bloqueo de almacenamiento local', () => {
  const bloqueado = {
    getItem() { throw new Error('denegado'); },
    setItem() { throw new Error('denegado'); },
  };
  assert.deepEqual(leerAccesibilidad(bloqueado, 'aceptado'), { ...PREFERENCIAS_ACCESIBILIDAD });
  assert.equal(guardarAccesibilidad(bloqueado, { textoGrande: true }, 'aceptado'), false);
});
