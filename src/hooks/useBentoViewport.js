import { useState, useEffect } from 'react';
import { getViewport } from '../utils/bentoLayout';

export function useBentoViewport() {
  const [viewport, setViewport] = useState(() =>
    typeof window !== 'undefined' ? getViewport(window.innerWidth) : 'desktop'
  );

  useEffect(() => {
    const onResize = () => setViewport(getViewport(window.innerWidth));
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return viewport;
}
