export const CLAVE_ACCESIBILIDAD = 'sintonia-accesibilidad';

export const PREFERENCIAS_ACCESIBILIDAD = Object.freeze({
  textoGrande: false,
  altoContraste: false,
  reducirMovimiento: false,
  subrayarEnlaces: false,
  espaciadoLectura: false,
});

export function normalizarAccesibilidad(valor) {
  const entrada = valor && typeof valor === 'object' && !Array.isArray(valor) ? valor : {};
  return Object.fromEntries(
    Object.keys(PREFERENCIAS_ACCESIBILIDAD).map(clave => [clave, entrada[clave] === true]),
  );
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
  espaciadoLectura: 'data-accesibilidad-lectura',
};

export function aplicarAccesibilidad(raiz, preferencias) {
  if (!raiz) return;
  const valores = normalizarAccesibilidad(preferencias);
  raiz.style.fontSize = valores.textoGrande ? '112.5%' : '';
  for (const [clave, atributo] of Object.entries(ATRIBUTOS)) {
    raiz.toggleAttribute(atributo, valores[clave]);
  }
}
