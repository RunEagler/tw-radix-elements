import type { Story } from '@ladle/react';
import * as React from 'react';
import { withMediaPlaceholder } from './withMediaPlaceholder';

const FALLBACK = (
  <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
    Media unavailable
  </div>
);

const demoImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80';

const PlaceholderImage = withMediaPlaceholder('img');
const PlaceholderVideo = withMediaPlaceholder('video');
const PlaceholderAudio = withMediaPlaceholder('audio');

export const WaveSkeleton: Story = () => {
  return (
    <div className="w-80">
      <div className="relative h-48 overflow-hidden rounded-lg border bg-card shadow-sm">
        <PlaceholderImage
          src={`${demoImage}&wave`}
          alt="Wave placeholder demo"
          className="h-full w-full object-cover"
          skeletonVariant="wave"
        />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Uses the default wave skeleton and fades in once the image has loaded.
      </p>
    </div>
  );
};

export const PulseSkeleton: Story = () => {
  return (
    <div className="w-80">
      <div className="relative h-48 overflow-hidden rounded-lg border bg-card shadow-sm">
        <PlaceholderImage
          src={`${demoImage}&pulse`}
          alt="Pulse placeholder demo"
          className="h-full w-full object-cover"
          skeletonVariant="pulse"
        />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Switch `skeletonVariant` to `pulse` for a more subtle loading state.
      </p>
    </div>
  );
};

export const CustomFallback: Story = () => {
  return (
    <div className="w-80">
      <div className="relative h-48 overflow-hidden rounded-lg border bg-card shadow-sm">
        <PlaceholderImage
          src="https://invalid-domain.example.com/image.jpg"
          alt="Broken source"
          className="h-full w-full object-cover"
          fallback={FALLBACK}
        />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        When the media fails to load, the provided fallback replaces the content.
      </p>
    </div>
  );
};

export const Reloadable: Story = () => {
  const [seed, setSeed] = React.useState(0);
  const url = `${demoImage}&seed=${seed}`;

  return (
    <div className="w-80">
      <div className="relative h-48 overflow-hidden rounded-lg border bg-card shadow-sm">
        <PlaceholderImage
          key={seed}
          src={url}
          alt="Reloadable media"
          className="h-full w-full object-cover"
        />
      </div>
      <button
        type="button"
        className="mt-4 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        onClick={() => setSeed(prev => prev + 1)}
      >
        Reload image
      </button>
      <p className="mt-2 text-sm text-muted-foreground">
        Each reload forces the image to refetch, re-triggering the skeleton overlay.
      </p>
    </div>
  );
};

export const VideoExample: Story = () => {
  return (
    <div className="w-80">
      <div className="relative h-48 overflow-hidden rounded-lg border bg-card shadow-sm">
        <PlaceholderVideo
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          controls
          className="h-full w-full object-cover"
          skeletonVariant="pulse"
        />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Works with video elements too. Shows skeleton until video metadata is loaded.
      </p>
    </div>
  );
};

export const MultipleMediaTypes: Story = () => {
  return (
    <div className="space-y-6">
      <div className="w-80">
        <h3 className="mb-2 text-sm font-semibold">Image</h3>
        <div className="relative h-48 overflow-hidden rounded-lg border bg-card shadow-sm">
          <PlaceholderImage
            src={demoImage}
            alt="Image example"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="w-80">
        <h3 className="mb-2 text-sm font-semibold">Video</h3>
        <div className="relative h-48 overflow-hidden rounded-lg border bg-card shadow-sm">
          <PlaceholderVideo
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            controls
            className="h-full w-full"
          />
        </div>
      </div>

      <div className="w-80">
        <h3 className="mb-2 text-sm font-semibold">Audio</h3>
        <div className="relative overflow-hidden rounded-lg border bg-card p-4 shadow-sm">
          <PlaceholderAudio
            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            controls
            className="w-full"
          />
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        The withMediaPlaceholder HOC works with img, video, audio, and iframe elements.
      </p>
    </div>
  );
};
