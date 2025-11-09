import type { Story } from '@ladle/react';
import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardTitle,
} from './Card';

export const Default: Story = () => (
  <Card ripple>
    <div className="p-6">Card Content</div>
  </Card>
);

export const Variants: Story = () => (
  <div className="flex flex-wrap gap-4">
    <Card variant="default" className="w-48">
      <div className="p-6">Default</div>
    </Card>
    <Card variant="elevated" className="w-48">
      <div className="p-6">Elevated</div>
    </Card>
    <Card variant="outlined" className="w-48">
      <div className="p-6">Outlined</div>
    </Card>
    <Card variant="ghost" className="w-48">
      <div className="p-6">Ghost</div>
    </Card>
  </div>
);

export const Padding: Story = () => (
  <div className="flex flex-wrap gap-4">
    <Card padding="none" className="w-48">
      <div className="bg-gray-100 dark:bg-gray-800">None</div>
    </Card>
    <Card padding="sm" className="w-48">
      <div className="bg-gray-100 dark:bg-gray-800">Small</div>
    </Card>
    <Card padding="default" className="w-48">
      <div className="bg-gray-100 dark:bg-gray-800">Default</div>
    </Card>
    <Card padding="lg" className="w-48">
      <div className="bg-gray-100 dark:bg-gray-800">Large</div>
    </Card>
  </div>
);

export const Hover: Story = () => (
  <div className="flex flex-wrap gap-4">
    <Card hover="none" className="w-48">
      <div className="p-6">None</div>
    </Card>
    <Card hover="lift" className="w-48">
      <div className="p-6">Lift</div>
    </Card>
    <Card hover="glow" className="w-48">
      <div className="p-6">Glow</div>
    </Card>
    <Card hover="border" className="w-48">
      <div className="p-6">Border</div>
    </Card>
  </div>
);

export const WithContent: Story = () => (
  <div className="flex flex-wrap gap-4">
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a card description that explains the content.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content area of the card. You can put any content here.</p>
      </CardContent>
      <CardFooter>
        <button type="button" className="rounded bg-primary px-4 py-2 text-white hover:opacity-90">
          Action
        </button>
      </CardFooter>
    </Card>

    <Card variant="elevated" hover="lift" className="w-80">
      <CardHeader>
        <CardTitle>Elevated Card</CardTitle>
        <CardDescription>This card has elevation and lift hover effect.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Hover over this card to see the lift effect in action.</p>
      </CardContent>
    </Card>

    <Card variant="outlined" hover="glow" className="w-80">
      <CardHeader>
        <CardTitle>Outlined Card</CardTitle>
        <CardDescription>This card has an outlined style with glow hover.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>The glow effect is applied on hover.</p>
      </CardContent>
    </Card>
  </div>
);

export const WithMedia: Story = () => (
  <div className="flex flex-wrap gap-4">
    <Card className="w-80" variant="elevated" hover="lift" padding="none">
      <CardMedia
        src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80"
        alt="Nature landscape"
        aspectRatio="video"
      />
      <CardHeader>
        <CardTitle>Beautiful Landscape</CardTitle>
        <CardDescription>A stunning view of nature at its finest.</CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <p className="text-sm text-muted-foreground">
          This card demonstrates how CardMedia can be used to display images with proper aspect
          ratios and loading states.
        </p>
      </CardContent>
      <CardFooter>
        <button type="button" className="rounded bg-primary px-4 py-2 text-white hover:opacity-90">
          View Details
        </button>
      </CardFooter>
    </Card>

    <Card className="w-80" variant="outlined" hover="glow" padding="none">
      <CardMedia
        src="https://images.unsplash.com/photo-1682687221038-404cb8830901?w=800&q=80"
        alt="City skyline"
        aspectRatio="square"
      />
      <CardHeader>
        <CardTitle>City Skyline</CardTitle>
        <CardDescription>Modern architecture meets urban design.</CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <p className="text-sm text-muted-foreground">Square aspect ratio with outlined variant.</p>
      </CardContent>
    </Card>

    <Card className="w-80" variant="default" padding="none">
      <CardMedia
        src="https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&q=80"
        alt="Ocean waves"
        aspectRatio="wide"
      />
      <CardHeader>
        <CardTitle>Ocean Waves</CardTitle>
        <CardDescription>Wide aspect ratio for panoramic views.</CardDescription>
      </CardHeader>
    </Card>
  </div>
);

export const MediaAspectRatios: Story = () => (
  <div className="flex flex-row gap-4">
    <Card className="w-80" padding="none">
      <CardMedia
        src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80"
        alt="Video aspect ratio"
        aspectRatio="video"
      />
      <CardContent className="p-4">
        <p className="text-sm font-medium">Video (16:9)</p>
      </CardContent>
    </Card>

    <Card className="w-80" padding="none">
      <CardMedia
        src="https://images.unsplash.com/photo-1682687221038-404cb8830901?w=800&q=80"
        alt="Square aspect ratio"
        aspectRatio="square"
      />
      <CardContent className="p-4">
        <p className="text-sm font-medium">Square (1:1)</p>
      </CardContent>
    </Card>

    <Card className="w-80" padding="none">
      <CardMedia
        src="https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&q=80"
        alt="Portrait aspect ratio"
        aspectRatio="portrait"
      />
      <CardContent className="p-4">
        <p className="text-sm font-medium">Portrait (3:4)</p>
      </CardContent>
    </Card>

    <Card className="w-80" padding="none">
      <CardMedia
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
        alt="Wide aspect ratio"
        aspectRatio="wide"
      />
      <CardContent className="p-4">
        <p className="text-sm font-medium">Wide (21:9)</p>
      </CardContent>
    </Card>
  </div>
);

export const MediaObjectFit: Story = () => (
  <div className="flex flex-wrap gap-4">
    <Card className="w-80" padding="none">
      <CardMedia
        src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80"
        alt="Cover fit"
        aspectRatio="square"
        objectFit="cover"
      />
      <CardContent className="p-4">
        <p className="text-sm font-medium">Cover (default)</p>
      </CardContent>
    </Card>

    <Card className="w-80" padding="none">
      <CardMedia
        src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80"
        alt="Contain fit"
        aspectRatio="square"
        objectFit="contain"
      />
      <CardContent className="p-4">
        <p className="text-sm font-medium">Contain</p>
      </CardContent>
    </Card>
  </div>
);

export const MediaWithFallback: Story = () => (
  <div className="flex flex-wrap gap-4">
    <Card className="w-80" padding="none">
      <CardMedia src="https://invalid-url.example.com/image.jpg" alt="Error fallback example" />
      <CardHeader>
        <CardTitle>Fallback Example</CardTitle>
        <CardDescription>
          This demonstrates the fallback UI when an image fails to load.
        </CardDescription>
      </CardHeader>
    </Card>
  </div>
);

export const MediaLoadingStates: Story = () => {
  const [slowImageKey, setSlowImageKey] = React.useState(0);
  const [slowImageUrl, setSlowImageUrl] = React.useState<string | null>(null);

  // 遅延読み込みをシミュレートする関数
  const loadSlowImage = () => {
    setSlowImageUrl(null);
    setSlowImageKey(prev => prev + 1);

    // 2秒後に画像URLを設定
    setTimeout(() => {
      setSlowImageUrl('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80');
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-4">
        <Card className="w-80" padding="none">
          <CardMedia
            src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80"
            alt="Wave skeleton"
            skeleton={true}
            skeletonVariant="wave"
          />
          <CardHeader>
            <CardTitle>Wave Loading</CardTitle>
            <CardDescription>Default wave animation during image load.</CardDescription>
          </CardHeader>
        </Card>

        <Card className="w-80" padding="none">
          <CardMedia
            src="https://images.unsplash.com/photo-1682687221038-404cb8830901?w=800&q=80"
            alt="Pulse skeleton"
            skeleton={true}
            skeletonVariant="pulse"
          />
          <CardHeader>
            <CardTitle>Pulse Loading</CardTitle>
            <CardDescription>Pulse animation variant for loading state.</CardDescription>
          </CardHeader>
        </Card>

        <Card className="w-80" padding="none">
          <CardMedia
            src="https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&q=80"
            alt="No skeleton"
            skeleton={false}
          />
          <CardHeader>
            <CardTitle>No Skeleton</CardTitle>
            <CardDescription>Loading without skeleton animation.</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div>
        <button
          type="button"
          onClick={loadSlowImage}
          className="mb-4 rounded bg-primary px-4 py-2 text-white hover:opacity-90"
        >
          Load Slow Image (2s delay)
        </button>
        {slowImageUrl && (
          <Card key={slowImageKey} className="w-80" padding="none">
            <CardMedia
              src={slowImageUrl}
              alt="Slow loading"
              skeleton={true}
              skeletonVariant="pulse"
            />
            <CardHeader>
              <CardTitle>Simulated Slow Load</CardTitle>
              <CardDescription>Watch the skeleton animation while the image loads.</CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
};

export const MediaPositions: Story = () => (
  <div className="flex flex-col gap-6">
    <Card className="w-full max-w-2xl" variant="elevated" hover="lift" padding="none">
      <CardMedia
        src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80"
        alt="Top position"
        aspectRatio="video"
      />
      <CardHeader>
        <CardTitle>Image on Top</CardTitle>
        <CardDescription>The default position with image at the top of the card.</CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <p className="text-sm text-muted-foreground">
          This is the most common layout for cards with images.
        </p>
      </CardContent>
      <CardFooter>
        <button type="button" className="rounded bg-primary px-4 py-2 text-white hover:opacity-90">
          Learn More
        </button>
      </CardFooter>
    </Card>

    <Card
      className="w-full max-w-2xl flex flex-row overflow-hidden"
      variant="outlined"
      hover="glow"
      padding="none"
    >
      <CardMedia
        src="https://images.unsplash.com/photo-1682687221038-404cb8830901?w=800&q=80"
        alt="Left position"
        aspectRatio="square"
        className="w-1/3 min-w-[200px] shrink-0"
      />
      <div className="flex flex-1 flex-col justify-between">
        <CardHeader>
          <CardTitle>Image on Left</CardTitle>
          <CardDescription>The image is positioned on the left side of the card.</CardDescription>
        </CardHeader>
        <CardContent className="px-6">
          <p className="text-sm text-muted-foreground">
            Great for horizontal layouts and list views.
          </p>
        </CardContent>
        <CardFooter>
          <button
            type="button"
            className="rounded bg-primary px-4 py-2 text-white hover:opacity-90"
          >
            View Details
          </button>
        </CardFooter>
      </div>
    </Card>

    <Card
      className="w-full max-w-2xl flex overflow-hidden"
      variant="default"
      hover="border"
      padding="none"
    >
      <div className="flex flex-1 flex-col justify-between">
        <CardHeader>
          <CardTitle>Image on Right</CardTitle>
          <CardDescription>The image is positioned on the right side of the card.</CardDescription>
        </CardHeader>
        <CardContent className="px-6">
          <p className="text-sm text-muted-foreground">Perfect for alternating layouts in lists.</p>
        </CardContent>
        <CardFooter>
          <button
            type="button"
            className="rounded bg-primary px-4 py-2 text-white hover:opacity-90"
          >
            Explore
          </button>
        </CardFooter>
      </div>
      <CardMedia
        src="https://images.unsplash.com/photo-1682687221038-404cb8830901?w=800&q=80"
        alt="Left position"
        aspectRatio="square"
        className="w-1/3 min-w-[200px] shrink-0"
      />
    </Card>
  </div>
);

export const HorizontalCards: Story = () => (
  <div className="flex flex-col gap-4">
    <Card
      className="w-full max-w-3xl flex flex-row overflow-hidden"
      variant="elevated"
      padding="none"
    >
      <CardMedia
        src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80"
        alt="Product 1"
        aspectRatio="square"
        className="w-1/3 min-w-[200px] shrink-0"
      />
      <div className="flex flex-1 flex-col justify-between">
        <CardHeader>
          <CardTitle>Premium Product</CardTitle>
          <CardDescription>High-quality product with amazing features.</CardDescription>
        </CardHeader>
        <CardContent className="px-6">
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </CardContent>
        <CardFooter>
          <button
            type="button"
            className="rounded bg-primary px-4 py-2 text-white hover:opacity-90"
          >
            Add to Cart
          </button>
        </CardFooter>
      </div>
    </Card>

    <Card
      className="w-full max-w-3xl flex flex-row overflow-hidden"
      variant="outlined"
      padding="none"
    >
      <CardMedia
        src="https://images.unsplash.com/photo-1682687221038-404cb8830901?w=800&q=80"
        alt="Product 2"
        aspectRatio="square"
        className="w-1/3 min-w-[200px] shrink-0"
      />
      <div className="flex flex-1 flex-col justify-between">
        <CardHeader>
          <CardTitle>Modern Design</CardTitle>
          <CardDescription>Sleek and contemporary styling.</CardDescription>
        </CardHeader>
        <CardContent className="px-6">
          <p className="text-sm text-muted-foreground">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        </CardContent>
        <CardFooter>
          <button
            type="button"
            className="rounded bg-primary px-4 py-2 text-white hover:opacity-90"
          >
            View Details
          </button>
        </CardFooter>
      </div>
    </Card>
  </div>
);
