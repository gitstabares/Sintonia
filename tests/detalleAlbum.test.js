import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatearDuracion, obtenerAnioPublicacion, formatearFechaPublicacion,
  obtenerCanciones, obtenerGenero, obtenerOtrosAlbumes,
  normalizarDetalleAlbum, duracionTotalMinutos, obtenerMetadatosAlbum,
} from '../src/utils/detalleAlbum.js';

test('presenta los segundos como m:ss, incluidos minutos y segundos iniciales', () => {
  assert.equal(formatearDuracion(70), '1:10');
  assert.equal(formatearDuracion(0), '0:00');
  assert.equal(formatearDuracion(225), '3:45');
  assert.equal(formatearDuracion(3601), '60:01');
  assert.equal(formatearDuracion(null), '—');
  assert.equal(formatearDuracion(-1), '—');
});

test('fechaPublicacion se presenta como día sin conversión horaria', () => {
  assert.equal(obtenerAnioPublicacion('2026-03-12'), '2026');
  assert.equal(formatearFechaPublicacion('2026-03-12'), '12 de marzo de 2026');
  assert.equal(formatearFechaPublicacion('2026-03-12', 'en'), 'March 12, 2026');
  assert.equal(formatearFechaPublicacion('2026-13-12'), '2026-13-12');
});

test('admite canciones o pistas sin introducir controles de reproducción', () => {
  assert.deepEqual(obtenerCanciones({ canciones: [{ id: 1 }] }), [{ id: 1 }]);
  assert.deepEqual(obtenerCanciones({ pistas: [{ id: 2 }] }), [{ id: 2 }]);
  assert.deepEqual(obtenerCanciones({}), []);
});

test('extrae el género, calcula minutos y filtra otros álbumes del artista', () => {
  const album = {
    id: 1,
    artista: { id: 5, nombre: 'Marea Baja' },
    genero: { nombre: 'Indie' },
    pistas: [{ duracionSeg: 70 }, { duracionSeg: 80 }],
  };
  assert.equal(obtenerGenero(album), 'Indie');
  assert.equal(duracionTotalMinutos(album), 3);
  const otros = obtenerOtrosAlbumes({
    otrosAlbumes: [
      { id: 1, artista: { id: 5 } },
      { id: 2, artista: { id: 5 } },
      { id: 3, artista: { id: 10 } },
    ],
  }, album);
  assert.deepEqual(otros.map(otro => otro.id), [2]);
});

test('normaliza el álbum de GET /albumes/:id con sus relacionados', () => {
  const entrada = {
    album: { id: 'a', titulo: 'Luz', artista: { nombre: 'Marea Baja' } },
    otrosAlbumes: [{ id: 'b', titulo: 'Marea viva' }],
  };
  const resultado = normalizarDetalleAlbum(entrada);
  assert.equal(resultado.album.titulo, 'Luz');
  assert.deepEqual(resultado.otrosAlbumes.map(x => x.id), ['b']);
  assert.equal(normalizarDetalleAlbum(null).album, null);
});

test('título y descripción son propios del álbum y de su artista', () => {
  const resultado = obtenerMetadatosAlbum({
    titulo: 'Luz de páramo',
    artista: { nombre: 'Marea Baja' },
  });
  assert.equal(resultado.title, 'Luz de páramo — Marea Baja | Sintonía');
  assert.match(resultado.description, /Luz de páramo/);
  assert.match(resultado.description, /Marea Baja/);
  assert.equal(obtenerMetadatosAlbum({}), null);
});
