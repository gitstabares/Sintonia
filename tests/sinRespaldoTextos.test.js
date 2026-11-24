import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const leer = ruta => readFileSync(ruta, 'utf8');
function modulos(carpeta) {
  return readdirSync(carpeta, { withFileTypes: true }).flatMap(item => {
    const ruta = path.join(carpeta, item.name);
    return item.isDirectory() ? modulos(ruta) : /\.(jsx?|html)$/.test(ruta) ? [ruta] : [];
  });
}

test('el código de la interfaz no incluye textosRespaldo ni respuestas inventadas', () => {
  for (const archivo of modulos('src')) {
    assert.doesNotMatch(leer(archivo), /textosRespaldo/,
      'Referencia a respaldo en ' + archivo);
  }
  const ui = leer('src/utils/textosInterfaz.js');
  assert.doesNotMatch(ui, /Page not found|Sign in to your account|Algo salió mal/);
});

test('App bloquea las rutas si no tiene una respuesta válida de /textos', () => {
  const app = leer('src/App.jsx');
  assert.match(app, /const resultadoTextos = useTextos\(idioma\)/);
  assert.match(app, /datos\.cargando \|\| datos\.error \|\| !datos\.textos/);
  assert.match(app, /<EstadoPeticion falloTextos/);
  assert.doesNotMatch(app, /useTextosAccesibilidad|textosRespaldo/);
});

test('EstadoPeticion posee un único mensaje fijo para el fallo de /textos', () => {
  const fuente = leer('src/components/EstadoPeticion/EstadoPeticion.jsx');
  const mensaje = 'No se pudieron cargar los textos de la interfaz.';
  assert.equal(fuente.split(mensaje).length - 1, 1);
  assert.match(fuente, /if \(falloTextos\)/);
  assert.match(fuente, /aria-busy=\{cargando\}/);
});

test('index.html no define textos SEO iniciales', () => {
  const html = leer('index.html');
  assert.match(html, /<title><\/title>/);
  assert.match(html, /<meta name="description" content="" \/>/);
});
