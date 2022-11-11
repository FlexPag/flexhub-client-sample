import { useLayoutEffect, useMemo, useRef, useState } from 'react';

export function useIsStuck(edge: 'top' | 'bottom') {
  const [isStuck, setIsStuck] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([event]) => {
        const stuck = event.intersectionRatio < 1;
        setIsStuck(stuck);
      },
      { threshold: [1] }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, setIsStuck]);

  return useMemo(() => [isStuck, ref] as const, [isStuck, ref]);
}
