import { useEffect, useRef } from 'react';

export function useAbortController() {
  const controller = useRef(new AbortController());

  useEffect(
    () => () => {
      controller.current.abort();
    },
    []
  );

  return controller.current;
}
