import * as React from 'react';
import { useState } from 'react';

export interface RippleState {
  x: number;
  y: number;
  size: number;
  key: number;
}

export interface UseRippleOptions {
  duration?: number;
}

export interface UseRippleReturn {
  ripples: RippleState[];
  createRipple: (event: React.MouseEvent<HTMLElement>) => void;
}

export function useRipple(options: UseRippleOptions = {}): UseRippleReturn {
  const { duration = 600 } = options;
  const [ripples, setRipples] = useState<RippleState[]>([]);

  const createRipple = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const element = event.currentTarget;
      const rect = element.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      const newRipple: RippleState = { x, y, size, key: Date.now() };
      setRipples(prevRipples => [...prevRipples, newRipple]);

      // Remove this ripple after animation completes
      setTimeout(() => {
        setRipples(prevRipples => prevRipples.filter(ripple => ripple.key !== newRipple.key));
      }, duration);
    },
    [duration]
  );

  return { ripples, createRipple };
}
