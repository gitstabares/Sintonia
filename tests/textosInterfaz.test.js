import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import {
  obtenerTextoPeticion,
  obtenerTextoNoEncontrada,
  interpolarTexto,
  textosRespaldo,
} from '../src/utils/textosInterfaz.js';
import { textosInicioSesion } from '../src/utils/textosInicioSesion.js';

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
test('el respaldo está definido separadamente y no reemplaza respuestas válidas', () => {
  assert.equal(textosRespaldo('es').estados.error.titulo, 'Algo salió mal');
  assert.equal(textosRespaldo('en').paginas.noEncontrada.titulo, 'Page not found');
  assert.equal(obtenerTextoPeticion(textos, { error: { status: 500 } }).titulo, 'API: servidor');
});
test('los textos de formulario de la API prevalecen sobre el respaldo de Figma', () => {
  const entrada = { paginas: { iniciarSesion: {
    titulo: 'API: Entrar',
    descripcion: 'API: Descripción',
    formulario: { correo: { etiqueta: 'API: Correo' } },
    botones: { ingresar: 'API: Continuar' },
  }}};
  const resultado = textosInicioSesion(entrada, false);
  assert.equal(resultado.titulo, 'API: Entrar');
  assert.equal(resultado.correo, 'API: Correo');
  assert.equal(resultado.ingresar, 'API: Continuar');
  assert.equal(resultado.contrasena, undefined);
  assert.equal(resultado.correoPlaceholder, undefined);
});
test('useTextos se invoca exactamente una vez, solo en src/App.jsx', () => {
  const src = path.resolve('src');
  function modulos(carpeta) {
    return readdirSync(carpeta, { withFileTypes: true }).flatMap(e => {
      const p = path.join(carpeta, e.name);
      return e.isDirectory() ? modulos(p) : p.endsWith('.jsx') ? [p] : [];
    });
  }
  const usos = modulos(src).flatMap(nombre => {
    const contenido = readFileSync(nombre, 'utf8');
    const coincidencias = [...contenido.matchAll(/\buseTextos\s*\(/g)];
    return coincidencias.map(() => path.relative(src, nombre).replaceAll('\\', '/'));
  });
  assert.deepEqual(usos, ['App.jsx']);
});
test('cada uso de EstadoPeticion recibe textos o el objeto datos completo', () => {
  const nombres = [
    'src/pages/Home/Home.jsx',
    'src/pages/Catalogo/Catalogo.jsx',
    'src/pages/DetalleAlbum/DetalleAlbum.jsx',
    'src/components/SuenaAhora/SuenaAhora.jsx',
    'src/components/Generos/Generos.jsx',
    'src/components/GenerosCatalogo/GenerosCatalogo.jsx',
    'src/components/DestacadosCatalogo/DestacadosCatalogo.jsx',
    'src/components/ArtistasCatalogo/ArtistasCatalogo.jsx',
    'src/components/CancionesCatalogo/CancionesCatalogo.jsx',
  ];
  for (const nombre of nombres) {
    const contenido = readFileSync(nombre, 'utf8');
    const usos = [...contenido.matchAll(/<EstadoPeticion\b[^>]*\/>/g)];
    assert.ok(usos.length, nombre);
    for (const [uso] of usos) assert.match(uso, /\btextos=\{/,
      nombre + ' tiene EstadoPeticion sin textos');
  }
});
