import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CLAVE_ACCESIBILIDAD,
  PREFERENCIAS_ACCESIBILIDAD,
  TAMANO_TEXTO_MIN,
  TAMANO_TEXTO_MAX,
  normalizarAccesibilidad,
  ajustarTamanoTexto,
  leerAccesibilidad,
  guardarAccesibilidad,
  aplicarAccesibilidad,
} from '../src/utils/accesibilidad.js';
import { extraerTextosAccesibilidad } from '../src/utils/textosAccesibilidad.js';

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

test('tamaño inicial 100%, con otros cuatro ajustes booleanos', () => {
  assert.deepEqual(PREFERENCIAS_ACCESIBILIDAD, {
    tamanoTexto: 100,
    altoContraste: false,
    reducirMovimiento: false,
    subrayarEnlaces: false,
    espaciado: false,
  });
});

test('los controles modifican el tamaño en pasos de 10% entre 80 y 140', () => {
  assert.equal(ajustarTamanoTexto(100, 1), 110);
  assert.equal(ajustarTamanoTexto(100, -1), 90);
  assert.equal(ajustarTamanoTexto(TAMANO_TEXTO_MIN, -1), TAMANO_TEXTO_MIN);
  assert.equal(ajustarTamanoTexto(TAMANO_TEXTO_MAX, 1), TAMANO_TEXTO_MAX);
  assert.equal(ajustarTamanoTexto(101, 1), 110);
});

test('normaliza los porcentajes guardados y los booleanos', () => {
  assert.deepEqual(normalizarAccesibilidad({
    tamanoTexto: 999, altoContraste: true, reducirMovimiento: 'true',
  }), { ...PREFERENCIAS_ACCESIBILIDAD, tamanoTexto: 140, altoContraste: true });
  assert.equal(normalizarAccesibilidad({ tamanoTexto: -100 }).tamanoTexto, 80);
  assert.equal(normalizarAccesibilidad({ tamanoTexto: '130' }).tamanoTexto, 100);
});

test('migra los booleanos antiguos sin perder preferencias', () => {
  assert.equal(normalizarAccesibilidad({ textoGrande: true }).tamanoTexto, 110);
  assert.equal(normalizarAccesibilidad({ espaciadoLectura: true }).espaciado, true);
});

test('persiste ajustes únicamente con consentimiento aceptado', () => {
  const storage = almacenamientoPrueba();
  guardarAccesibilidad(storage, { tamanoTexto: 120 }, 'rechazado');
  assert.equal(storage.getItem(CLAVE_ACCESIBILIDAD), null);
  guardarAccesibilidad(storage, { tamanoTexto: 120, altoContraste: true }, 'aceptado');
  assert.equal(leerAccesibilidad(storage, 'aceptado').tamanoTexto, 120);
  assert.equal(leerAccesibilidad(storage, 'aceptado').altoContraste, true);
  guardarAccesibilidad(storage, { tamanoTexto: 120 }, null);
  assert.equal(storage.getItem(CLAVE_ACCESIBILIDAD), null);
});

test('datos dañados y almacenamiento bloqueado no rompen el panel', () => {
  const storage = almacenamientoPrueba();
  storage.setItem(CLAVE_ACCESIBILIDAD, '{');
  assert.deepEqual(leerAccesibilidad(storage, 'aceptado'), { ...PREFERENCIAS_ACCESIBILIDAD });
  const bloqueado = {
    getItem() { throw new Error('denegado'); },
    setItem() { throw new Error('denegado'); },
  };
  assert.deepEqual(leerAccesibilidad(bloqueado, 'aceptado'), { ...PREFERENCIAS_ACCESIBILIDAD });
  assert.equal(guardarAccesibilidad(bloqueado, PREFERENCIAS_ACCESIBILIDAD, 'aceptado'), false);
});

test('la tipografía escala con el porcentaje y las otras opciones cambian atributos', () => {
  const raiz = raizPrueba();
  aplicarAccesibilidad(raiz, {
    tamanoTexto: 130,
    altoContraste: true,
    reducirMovimiento: true,
    subrayarEnlaces: true,
    espaciado: true,
  });
  assert.equal(raiz.style.fontSize, '130%');
  for (const atributo of [
    'data-accesibilidad-contraste', 'data-accesibilidad-movimiento',
    'data-accesibilidad-enlaces', 'data-accesibilidad-lectura',
  ]) assert.equal(raiz.hasAttribute(atributo), true);

  aplicarAccesibilidad(raiz, PREFERENCIAS_ACCESIBILIDAD);
  assert.equal(raiz.style.fontSize, '100%');
  assert.equal(raiz.hasAttribute('data-accesibilidad-contraste'), false);
  assert.equal(raiz.hasAttribute('data-accesibilidad-movimiento'), false);
  assert.equal(raiz.hasAttribute('data-accesibilidad-enlaces'), false);
  assert.equal(raiz.hasAttribute('data-accesibilidad-lectura'), false);
});

test('extrae solamente textos de accesibilidad del contrato de la API', () => {
  const acc = {
    titulo: 'Accesibilidad',
    tamanoTexto: { etiqueta: 'Tamaño del texto', reducir: 'Disminuir', aumentar: 'Aumentar', valor: '{valor} %' },
    altoContraste: { etiqueta: 'Alto contraste', ayuda: 'Ayuda' },
  };
  assert.deepEqual(extraerTextosAccesibilidad({ textos: { accesibilidad: acc } }), acc);
  assert.deepEqual(extraerTextosAccesibilidad({ accesibilidad: acc }), acc);
  assert.deepEqual(extraerTextosAccesibilidad(acc), acc);
  assert.equal(extraerTextosAccesibilidad({ textos: {} }), null);
  assert.equal(extraerTextosAccesibilidad(null), null);
});
