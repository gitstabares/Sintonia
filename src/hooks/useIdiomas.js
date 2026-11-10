import useRecurso from './useRecurso';

export default function useIdiomas() {
  const { datos, ...estado } = useRecurso('/idiomas');
  return { idiomas: datos, ...estado };
}
