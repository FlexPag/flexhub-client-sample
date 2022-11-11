import { useLayoutEffect, useRef, useState } from 'react';

export function useHeight<T extends Element>() {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new ResizeObserver((rezize) => {
      setHeight(rezize[0].contentRect.height);
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref.current]);

  return [ref, height] as const;
}
