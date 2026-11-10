import { useEffect, useState } from 'react';

export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const actualizar = evento => setMatches(evento.matches);
    media.addEventListener('change', actualizar);
    return () => media.removeEventListener('change', actualizar);
  }, [query]);
  return matches;
}
