import { useLoadStatus } from '@ui/hooks/useLoadStatus.ts';
import { cn } from '@ui/lib/utils';
import * as React from 'react';

export type MediaSkeletonVariant = 'pulse' | 'wave';
export type MediaType = 'img' | 'video' | 'audio' | 'iframe';

interface MediaSkeletonProps {
  variant: MediaSkeletonVariant;
  className?: string;
}

const MediaSkeleton = ({ variant, className }: MediaSkeletonProps) => {
  if (variant === 'pulse') {
    return (
      <div
        role="presentation"
        aria-hidden="true"
        className={cn('absolute inset-0 animate-pulse bg-muted/70', className)}
      />
    );
  }

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={cn(
        'absolute inset-0 bg-gradient-to-r from-muted via-muted-foreground/20 to-muted animate-[media-wave_1.4s_ease-in-out_infinite]',
        className
      )}
      style={{ backgroundSize: '200% 200%' }}
    />
  );
};

export interface WithMediaPlaceholderProps {
  fallback?: React.ReactNode;
  skeleton?: boolean;
  skeletonVariant?: MediaSkeletonVariant;
  skeletonClassName?: string;
  wrapperClassName?: string;
}

type MediaElementMap = {
  img: HTMLImageElement;
  video: HTMLVideoElement;
  audio: HTMLAudioElement;
  iframe: HTMLIFrameElement;
};

type MediaPropsMap = {
  img: React.ImgHTMLAttributes<HTMLImageElement>;
  video: React.VideoHTMLAttributes<HTMLVideoElement>;
  audio: React.AudioHTMLAttributes<HTMLAudioElement>;
  iframe: React.IframeHTMLAttributes<HTMLIFrameElement>;
};

export function withMediaPlaceholder<T extends MediaType>(mediaType: T) {
  const WrappedComponent = React.forwardRef<
    MediaElementMap[T],
    MediaPropsMap[T] & WithMediaPlaceholderProps
  >((props, ref) => {
    const {
      fallback,
      skeleton = true,
      skeletonVariant = 'wave',
      skeletonClassName,
      wrapperClassName,
      className,
      ...restProps
    } = props;
    const { handlers, isLoading, isError } = useLoadStatus();

    const handleLoad = React.useCallback<React.ReactEventHandler>(
      _event => {
        handlers.onLoad();
      },
      [handlers]
    );

    const handleError = React.useCallback<React.ReactEventHandler>(
      _event => {
        handlers.onError();
      },
      [handlers]
    );

    if (isError && fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className={cn('relative', wrapperClassName)}>
        {isLoading && skeleton && (
          <MediaSkeleton variant={skeletonVariant} className={skeletonClassName} />
        )}
        <div
          className={cn('transition-opacity duration-300', isLoading ? 'opacity-0' : 'opacity-100')}
        >
          {React.createElement(mediaType, {
            ...restProps,
            className,
            ref,
            onLoad: handleLoad,
            onError: handleError,
          })}
        </div>
      </div>
    );
  });

  WrappedComponent.displayName = `withMediaPlaceholder(${mediaType})`;

  return WrappedComponent as React.ForwardRefExoticComponent<
    React.PropsWithoutRef<MediaPropsMap[T] & WithMediaPlaceholderProps> &
      React.RefAttributes<MediaElementMap[T]>
  >;
}
