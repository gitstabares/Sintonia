import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CLAVE_CONSENTIMIENTO, CLAVE_IDIOMA, leerConsentimiento, leerIdioma,
  guardarIdioma, guardarConsentimiento, reiniciarConsentimiento
} from '../src/utils/preferencias.js';

function crearAlmacenamiento() {
  const valores = new Map();
  return {
    getItem: clave => valores.get(clave) ?? null,
    setItem: (clave, valor) => valores.set(clave, String(valor)),
    removeItem: clave => valores.delete(clave)
  };
}

test('distingue pendiente de rechazado y aceptado', () => {
  const storage = crearAlmacenamiento();
  assert.equal(leerConsentimiento(storage), null);
  guardarConsentimiento(storage, false);
  assert.equal(leerConsentimiento(storage), 'rechazado');
  guardarConsentimiento(storage, true);
  assert.equal(leerConsentimiento(storage), 'aceptado');
});

test('no persiste el idioma antes de aceptar', () => {
  const storage = crearAlmacenamiento();
  guardarIdioma(storage, 'en', null);
  assert.equal(storage.getItem(CLAVE_IDIOMA), null);
  guardarConsentimiento(storage, false);
  guardarIdioma(storage, 'en', leerConsentimiento(storage));
  assert.equal(storage.getItem(CLAVE_IDIOMA), null);
});

test('permite restaurar idioma con consentimiento aceptado', () => {
  const storage = crearAlmacenamiento();
  guardarConsentimiento(storage, true);
  guardarIdioma(storage, 'en', leerConsentimiento(storage));
  assert.equal(leerIdioma(storage), 'en');
  guardarConsentimiento(storage, false);
  assert.equal(leerIdioma(storage), 'es');
});

test('permite volver a mostrar el banner de preferencias', () => {
  const storage = crearAlmacenamiento();
  guardarConsentimiento(storage, true);
  reiniciarConsentimiento(storage);
  assert.equal(storage.getItem(CLAVE_CONSENTIMIENTO), null);
  assert.equal(leerConsentimiento(storage), null);
});

test('no falla si el navegador bloquea almacenamiento', () => {
  const storage = {
    getItem() { throw new Error('bloqueado'); },
    setItem() { throw new Error('bloqueado'); },
    removeItem() { throw new Error('bloqueado'); }
  };
  assert.equal(leerConsentimiento(storage), null);
  assert.equal(leerIdioma(storage), 'es');
  assert.equal(guardarIdioma(storage, 'en', 'aceptado'), false);
  assert.equal(guardarConsentimiento(storage, true), 'aceptado');
  assert.doesNotThrow(() => reiniciarConsentimiento(storage));
});
