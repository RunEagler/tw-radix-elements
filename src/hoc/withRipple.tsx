import { useRipple } from '@ui/hooks/useRipple';
import { cn } from '@ui/lib/utils';
import * as React from 'react';

export interface WithRippleProps {
  rippleColor?: string;
  rippleDuration?: number;
}

export const NamedComponent = <T extends HTMLElement, P extends React.HTMLAttributes<T>>(
  displayName: string,
  Component: React.ForwardRefExoticComponent<P & React.RefAttributes<T>>
): React.ForwardRefExoticComponent<P & React.RefAttributes<T>> => {
  Component.displayName = displayName;

  return Component;
};

export const withRipple = <T extends HTMLElement, P extends React.HTMLAttributes<T>>(
  Component: React.ComponentType<P>
) => {
  return NamedComponent(
    `withRipple(${Component.displayName || Component.name || 'Component'})`,
    React.forwardRef<T, P & WithRippleProps>((props, ref) => {
      const { rippleColor = '#ffffff', rippleDuration, ...componentProps } = props;
      const { ripples, createRipple } = useRipple({
        duration: rippleDuration,
      });

      const originalOnClick = componentProps.onClick;
      const handleClick = (event: React.MouseEvent<T>) => {
        createRipple(event);
        originalOnClick?.(event as React.MouseEvent<T>);
      };

      return (
        <Component
          ref={ref}
          {...(props as P)}
          onClick={handleClick}
          className={cn(componentProps.className, 'relative overflow-hidden')}
        >
          {componentProps.children}
          <span className="pointer-events-none absolute inset-0">
            {ripples.map(ripple => (
              <span
                className="animate-rippling absolute rounded-full opacity-30"
                key={ripple.key}
                style={{
                  width: `${ripple.size}px`,
                  height: `${ripple.size}px`,
                  top: `${ripple.y}px`,
                  left: `${ripple.x}px`,
                  backgroundColor: rippleColor,
                  transform: `scale(0)`,
                }}
              />
            ))}
          </span>
        </Component>
      );
    })
  );
};
