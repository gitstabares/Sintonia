import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { textosInicioSesion } from '../src/utils/textosInicioSesion.js';
import { obtenerTextoNoEncontrada, obtenerTextoPeticion } from '../src/utils/textosInterfaz.js';
import { obtenerMetadatosAlbum } from '../src/utils/detalleAlbum.js';
import { validarTextos } from '../src/utils/validarTextos.js';

/**
 * Recorte de rutas y cadenas obtenido de GET /textos?idioma=es (HTTP 200) el
 * 24-11-2026. Archivo original: GitHub Actions #45473101883, artifact
 * respuestas-publicas-api, que también incluye inglés y accesibilidad.
 */
const api = {
  textos: {
    paginas: {
      ingresar: {
        seo: { titulo: 'Ingresar · Sintonía', descripcion: 'Ingresa a tu cuenta de Sintonía.' },
        presentacion: { titulo: 'Tu música, siempre a mano', texto: 'Explora álbumes y artistas de todos los géneros.' },
        formulario: {
          titulo: 'Ingresa a tu cuenta',
          subtitulo: 'Ingresa con el correo y la contraseña de tu cuenta.',
          etiquetas: { correo: 'Correo electrónico', clave: 'Contraseña', mantenerSesion: 'Mantener la sesión iniciada' },
          placeholders: { correo: 'nombre@correo.com' },
          enlaces: { olvidasteClave: '¿Olvidaste tu contraseña?', crearCuenta: 'Crea una cuenta' },
          mensajes: { sinCuenta: '¿No tienes cuenta?', ingresando: 'Ingresando…' },
          botones: { ingresar: 'Ingresar', mostrarClave: 'Mostrar contraseña', ocultarClave: 'Ocultar contraseña' },
        },
        errores: {
          correoObligatorio: 'Escribe tu correo electrónico.',
          claveObligatoria: 'Escribe tu contraseña.',
          credenciales: { titulo: 'Correo o contraseña incorrectos', texto: 'Revisa los datos e inténtalo de nuevo. Si no recuerdas tu contraseña, puedes restablecerla.' },
          conexion: { texto: 'Revisa tu conexión a internet e inténtalo de nuevo. Lo que escribiste se conserva.' },
        },
      },
      album: { seo: { titulo: '{titulo} · Sintonía',
        descripcion: 'Consulta el álbum completo, con todas sus canciones y su duración.' } },
    },
    formularios: {
      campos: { clave: { label: 'Contraseña', placeholder: 'Tu contraseña', mostrar: 'Mostrar contraseña', ocultar: 'Ocultar contraseña' } },
      validacion: { requerido: 'Este dato es obligatorio.', correo: 'Escribe un correo válido.' },
    },
    estados: {
      cargando: { titulo: 'Cargando…', aria: 'Cargando contenido' },
      vacio: { generico: 'Aquí no hay nada todavía.' },
      error: { titulo: 'Algo salió mal', descripcion: 'No pudimos cargar esta parte. Intenta de nuevo.', botones: { reintentar: 'Reintentar' } },
      noEncontrado: { titulo: 'No encontramos esta página',
        descripcion: 'Puede que el enlace esté mal escrito o que el contenido ya no exista.',
        botones: { irAlInicio: 'Ir al inicio' } },
    },
    errores: { credenciales_invalidas: 'El correo o la contraseña no coinciden.', no_encontrado: 'No encontramos lo que buscas.' },
    navbar: { usuario: { cerrarSesion: 'Cerrar sesión' }, enlaces: { inicio: 'Inicio', catalogo: 'Catálogo' } },
    idioma: { codigos: { es: 'ES', en: 'EN' } },
    cookies: { preferencias: { titulo: 'Preferencias de cookies' } },
  },
};

test('formulario de ingreso consume todas sus claves reales desde /textos', () => {
  const textos = validarTextos(api);
  const t = textosInicioSesion(textos);
  assert.equal(t.titulo, 'Ingresa a tu cuenta');
  assert.equal(t.descripcion, api.textos.paginas.ingresar.formulario.subtitulo);
  assert.equal(t.correo, 'Correo electrónico');
  assert.equal(t.contrasena, 'Contraseña');
  assert.equal(t.correoPlaceholder, 'nombre@correo.com');
  assert.equal(t.contrasenaPlaceholder, 'Tu contraseña');
  assert.equal(t.recordar, 'Mantener la sesión iniciada');
  assert.equal(t.recuperar, '¿Olvidaste tu contraseña?');
  assert.equal(t.ingresar, 'Ingresar');
  assert.equal(t.ingresando, 'Ingresando…');
  assert.equal(t.sinCuenta, '¿No tienes cuenta?');
  assert.equal(t.crear, 'Crea una cuenta');
  assert.equal(t.mostrar, 'Mostrar contraseña');
  assert.equal(t.ocultar, 'Ocultar contraseña');
  assert.equal(t.correoObligatorio, 'Escribe tu correo electrónico.');
  assert.equal(t.claveObligatoria, 'Escribe tu contraseña.');
  assert.equal(t.obligatorio, 'Este dato es obligatorio.');
  assert.equal(t.formato, 'Escribe un correo válido.');
  assert.equal(t.marcaTitulo, 'Tu música, siempre a mano');
  assert.equal(t.marcaDescripcion, 'Explora álbumes y artistas de todos los géneros.');
});

test('los textos de estado usan las claves reales de la API', () => {
  const textos = api.textos;
  assert.deepEqual(obtenerTextoPeticion(textos, { cargando: true }), {
    titulo: 'Cargando…', texto: 'Cargando contenido', boton: '',
  });
  assert.equal(obtenerTextoPeticion(textos, { vacio: true }).texto, 'Aquí no hay nada todavía.');
  const fallo = obtenerTextoPeticion(textos, { error: new Error('red') });
  assert.equal(fallo.titulo, 'Algo salió mal');
  assert.equal(fallo.texto, 'No pudimos cargar esta parte. Intenta de nuevo.');
  assert.equal(fallo.boton, 'Reintentar');
  assert.deepEqual(obtenerTextoNoEncontrada(textos), {
    titulo: 'No encontramos esta página',
    texto: 'Puede que el enlace esté mal escrito o que el contenido ya no exista.',
    boton: 'Ir al inicio',
  });
});

test('metadatos, idioma, sesión y cookies apuntan a rutas existentes', () => {
  const t = api.textos;
  assert.deepEqual(obtenerMetadatosAlbum({ titulo: 'Luz de páramo', artista: { nombre: 'Marea Baja' } }, t), {
    title: 'Luz de páramo · Sintonía',
    description: 'Consulta el álbum completo, con todas sus canciones y su duración.',
  });
  assert.equal(t.navbar.usuario.cerrarSesion, 'Cerrar sesión');
  assert.equal(t.idioma.codigos.es, 'ES');
  assert.equal(t.cookies.preferencias.titulo, 'Preferencias de cookies');
  const navbar = readFileSync('src/components/Navbar/Navbar.jsx', 'utf8');
  const footer = readFileSync('src/components/Footer/Footer.jsx', 'utf8');
  assert.match(navbar, /nav\?\.usuario\?\.cerrarSesion/);
  assert.match(navbar, /textos\?\.idioma\?\.codigos/);
  assert.match(footer, /textos\?\.cookies\?\.preferencias\?\.titulo/);
});

test('una respuesta válida sin sección de ingreso no crea textos de sustitución', () => {
  const t = textosInicioSesion({ paginas: { catalogo: {} } });
  assert.ok(Object.values(t).every(valor => valor === undefined));
});
