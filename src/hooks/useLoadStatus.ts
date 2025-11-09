import * as React from 'react';

type MediaStatus = 'loading' | 'loaded' | 'error';

const useLoadStatus = () => {
  const [status, setStatus] = React.useState<MediaStatus>('loading');

  const handleLoad = () => {
    setStatus('loaded');
  };

  const handleError = () => {
    setStatus('error');
  };

  return {
    handlers: {
      onLoad: handleLoad,
      onError: handleError,
    },
    isLoading: status === 'loading',
    isLoaded: status === 'loaded',
    isError: status === 'error',
  };
};

export { useLoadStatus };
