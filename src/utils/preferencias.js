export const CLAVE_CONSENTIMIENTO = 'sintonia-consentimiento';
export const CLAVE_IDIOMA = 'sintonia-idioma';

export function leerConsentimiento(storage) {
  try {
    const valor = storage?.getItem(CLAVE_CONSENTIMIENTO);
    return valor === 'aceptado' || valor === 'rechazado' ? valor : null;
  } catch {
    return null;
  }
}

export function leerIdioma(storage) {
  try {
    return leerConsentimiento(storage) === 'aceptado' && storage?.getItem(CLAVE_IDIOMA) === 'en' ? 'en' : 'es';
  } catch {
    return 'es';
  }
}

export function guardarIdioma(storage, idioma, consentimiento) {
  try {
    if (consentimiento === 'aceptado') storage?.setItem(CLAVE_IDIOMA, idioma);
    else storage?.removeItem(CLAVE_IDIOMA);
    return true;
  } catch {
    return false;
  }
}

export function guardarConsentimiento(storage, acepta) {
  const valor = acepta ? 'aceptado' : 'rechazado';
  try {
    storage?.setItem(CLAVE_CONSENTIMIENTO, valor);
    if (!acepta) storage?.removeItem(CLAVE_IDIOMA);
  } catch {
    // El consentimiento actual sigue disponible en memoria.
  }
  return valor;
}

export function reiniciarConsentimiento(storage) {
  try { storage?.removeItem(CLAVE_CONSENTIMIENTO); } catch { /* almacenamiento bloqueado */ }
}
