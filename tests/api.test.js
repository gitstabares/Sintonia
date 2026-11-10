import test from 'node:test';
import assert from 'node:assert/strict';
import { crearUrlRecurso } from '../src/utils/api.js';

test('construye URLs sin barra duplicada', () => {
  assert.equal(crearUrlRecurso('https://ejemplo.com/api/v1/', '/generos'), 'https://ejemplo.com/api/v1/generos');
});

test('incluye parámetros opcionales y codifica sus valores', () => {
  assert.equal(crearUrlRecurso('https://ejemplo.com/api/v1', '/albumes', { orden: 'más vistos', limite: 6 }),
    'https://ejemplo.com/api/v1/albumes?orden=m%C3%A1s+vistos&limite=6');
});

test('omite parámetros vacíos sin perder el valor cero', () => {
  assert.equal(crearUrlRecurso('', '/albumes', { genero: '', limite: 0, orden: null, activo: false }),
    '/albumes?limite=0&activo=false');
});
