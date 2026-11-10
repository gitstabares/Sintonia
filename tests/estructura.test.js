import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const src = path.resolve('src');

function recorrer(directorio) {
  return readdirSync(directorio, { withFileTypes: true }).flatMap(item => {
    const ruta = path.join(directorio, item.name);
    return item.isDirectory() ? recorrer(ruta) : [ruta];
  });
}

test('los módulos JS/JSX no importan archivos inexistentes', () => {
  const modulos = recorrer(src).filter(archivo => /\.jsx?$/.test(archivo));
  const faltantes = [];
  for (const archivo of modulos) {
    const codigo = readFileSync(archivo, 'utf8');
    for (const coincidencia of codigo.matchAll(/(?:\bfrom\s*|\bimport\s*)['"]([.][^'"]+)['"]/g)) {
      const ruta = path.resolve(path.dirname(archivo), coincidencia[1].split('?')[0]);
      if (![ruta, ruta + '.js', ruta + '.jsx', ruta + '.css', ruta + '.svg'].some(existsSync)) {
        faltantes.push(`${path.relative(src, archivo)}: ${coincidencia[1]}`);
      }
    }
  }
  assert.deepEqual(faltantes, []);
});

test('todos los tokens CSS utilizados están declarados', () => {
  const tokens = readFileSync(path.join(src, 'styles/tokens.css'), 'utf8');
  const definidos = new Set([...tokens.matchAll(/--([\w-]+)\s*:/g)].map(m => m[1]));
  const sinDefinir = [];
  for (const archivo of recorrer(src).filter(ruta => ruta.endsWith('.css'))) {
    const css = readFileSync(archivo, 'utf8');
    for (const m of css.matchAll(/var\(--([\w-]+)/g)) {
      if (!definidos.has(m[1])) sinDefinir.push(`${path.relative(src, archivo)}: ${m[1]}`);
    }
  }
  assert.deepEqual(sinDefinir, []);
});

test('están disponibles los 54 iconos SVG del kit de diseño', () => {
  const iconos = readdirSync(path.join(src, 'assets/iconos')).filter(nombre => nombre.endsWith('.svg'));
  assert.equal(iconos.length, 54);
});
