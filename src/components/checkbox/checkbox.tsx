import { useLottie } from 'lottie-react';
import { cloneElement, useEffect, useMemo } from 'react';
import { CSSProperties } from 'styled-components';

import { useIsFirstRender } from 'app/hooks';

import checkAnimation from './checkbox-animation.json';

export interface CheckboxProps {
  checked?: boolean;
  style?: CSSProperties;
  className?: string;
}

const lottieOptions = {
  animationData: checkAnimation,
  autoplay: false,
  loop: false,
  initialSegment: [0, 18] as [number, number],
};

export function Checkbox({ checked, style, className }: CheckboxProps) {
  const { View, play, goToAndStop, setDirection, setSpeed } = useLottie(lottieOptions, style);

  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    if (isFirstRender) {
      setSpeed(3);
      goToAndStop(checked ? 18 : 0, true);
      return;
    }

    setDirection(checked ? 1 : -1);
    play();
  }, [checked]);

  return useMemo(() => cloneElement(View, { className }), [View, className]);
}
