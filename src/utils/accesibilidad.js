export const CLAVE_ACCESIBILIDAD = 'sintonia-accesibilidad';

export const TAMANO_TEXTO_MIN = 80;
export const TAMANO_TEXTO_MAX = 140;
export const PASO_TAMANO_TEXTO = 10;

export const PREFERENCIAS_ACCESIBILIDAD = Object.freeze({
  tamanoTexto: 100,
  altoContraste: false,
  reducirMovimiento: false,
  subrayarEnlaces: false,
  espaciado: false,
});

export function ajustarTamanoTexto(valor, incremento) {
  const base = normalizarTamano(valor);
  const proximo = base + incremento * PASO_TAMANO_TEXTO;
  return Math.min(TAMANO_TEXTO_MAX, Math.max(TAMANO_TEXTO_MIN, proximo));
}

function normalizarTamano(valor) {
  if (typeof valor !== 'number' || !Number.isFinite(valor)) return 100;
  const ajustado = Math.round(valor / PASO_TAMANO_TEXTO) * PASO_TAMANO_TEXTO;
  return Math.min(TAMANO_TEXTO_MAX, Math.max(TAMANO_TEXTO_MIN, ajustado));
}

export function normalizarAccesibilidad(valor) {
  const entrada = valor && typeof valor === 'object' && !Array.isArray(valor) ? valor : {};
  // Compatibilidad con las preferencias guardadas por la versión anterior del panel.
  const tamano = entrada.tamanoTexto === undefined && entrada.textoGrande === true
    ? 110
    : entrada.tamanoTexto;
  return {
    tamanoTexto: normalizarTamano(tamano),
    altoContraste: entrada.altoContraste === true,
    reducirMovimiento: entrada.reducirMovimiento === true,
    subrayarEnlaces: entrada.subrayarEnlaces === true,
    espaciado: entrada.espaciado === true || entrada.espaciadoLectura === true,
  };
}

export function leerAccesibilidad(storage, consentimiento) {
  if (consentimiento !== 'aceptado') return { ...PREFERENCIAS_ACCESIBILIDAD };
  try {
    const guardado = storage?.getItem(CLAVE_ACCESIBILIDAD);
    return normalizarAccesibilidad(guardado ? JSON.parse(guardado) : null);
  } catch {
    return { ...PREFERENCIAS_ACCESIBILIDAD };
  }
}

export function guardarAccesibilidad(storage, preferencias, consentimiento) {
  try {
    if (consentimiento === 'aceptado') {
      storage?.setItem(CLAVE_ACCESIBILIDAD, JSON.stringify(normalizarAccesibilidad(preferencias)));
    } else {
      storage?.removeItem(CLAVE_ACCESIBILIDAD);
    }
    return true;
  } catch {
    return false;
  }
}

const ATRIBUTOS = {
  altoContraste: 'data-accesibilidad-contraste',
  reducirMovimiento: 'data-accesibilidad-movimiento',
  subrayarEnlaces: 'data-accesibilidad-enlaces',
  espaciado: 'data-accesibilidad-lectura',
};

export function aplicarAccesibilidad(raiz, preferencias) {
  if (!raiz) return;
  const valores = normalizarAccesibilidad(preferencias);
  raiz.style.fontSize = valores.tamanoTexto + '%';
  for (const [clave, atributo] of Object.entries(ATRIBUTOS)) {
    raiz.toggleAttribute(atributo, valores[clave]);
  }
}
