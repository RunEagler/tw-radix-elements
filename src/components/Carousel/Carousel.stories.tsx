import type { Story } from '@ladle/react';
import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselIndicators,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselProps,
} from './Carousel';

// Sample slide content
const DemoSlide = ({ color, title }: { color: string; title: string }) => (
  <div className={`${color} flex h-full w-full items-center justify-center rounded-lg`}>
    <div className="text-center text-white">
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="mt-2 text-lg opacity-90">Beautiful carousel slide</p>
    </div>
  </div>
);

const demoSlides = [
  { id: 1, color: 'bg-gradient-to-br from-blue-500 to-blue-700', title: 'Slide 1' },
  { id: 2, color: 'bg-gradient-to-br from-purple-500 to-purple-700', title: 'Slide 2' },
  { id: 3, color: 'bg-gradient-to-br from-pink-500 to-pink-700', title: 'Slide 3' },
  { id: 4, color: 'bg-gradient-to-br from-orange-500 to-orange-700', title: 'Slide 4' },
];

export const Default: Story = () => (
  <Carousel>
    <CarouselContent>
      {demoSlides.map(slide => (
        <CarouselItem key={slide.id}>
          <DemoSlide color={slide.color} title={slide.title} />
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
    <CarouselIndicators />
  </Carousel>
);

export const Sizes: Story = () => (
  <div className="space-y-8">
    <div className="space-y-2">
      <h3 className="text-sm font-semibold">Small (h-48)</h3>
      <Carousel size="sm">
        <CarouselContent>
          {demoSlides.slice(0, 3).map(slide => (
            <CarouselItem key={slide.id}>
              <DemoSlide color={slide.color} title={slide.title} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselIndicators />
      </Carousel>
    </div>

    <div className="space-y-2">
      <h3 className="text-sm font-semibold">Medium (h-64) - Default</h3>
      <Carousel size="md">
        <CarouselContent>
          {demoSlides.slice(0, 3).map(slide => (
            <CarouselItem key={slide.id}>
              <DemoSlide color={slide.color} title={slide.title} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselIndicators />
      </Carousel>
    </div>

    <div className="space-y-2">
      <h3 className="text-sm font-semibold">Large (h-96)</h3>
      <Carousel size="lg">
        <CarouselContent>
          {demoSlides.slice(0, 3).map(slide => (
            <CarouselItem key={slide.id}>
              <DemoSlide color={slide.color} title={slide.title} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselIndicators />
      </Carousel>
    </div>
  </div>
);

export const AutoPlay: Story = () => (
  <div className="space-y-4">
    <p className="text-sm text-gray-600">Auto-advances every 3 seconds. Hover to pause.</p>
    <Carousel autoPlay autoPlayInterval={3000} pauseOnHover>
      <CarouselContent>
        {demoSlides.map(slide => (
          <CarouselItem key={slide.id}>
            <DemoSlide color={slide.color} title={slide.title} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselIndicators />
    </Carousel>
  </div>
);

export const OnlyIndicators: Story = () => (
  <div className="space-y-4">
    <p className="text-sm text-gray-600">Navigation with indicators only</p>
    <Carousel>
      <CarouselContent>
        {demoSlides.slice(0, 3).map(slide => (
          <CarouselItem key={slide.id}>
            <DemoSlide color={slide.color} title={slide.title} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselIndicators />
    </Carousel>
  </div>
);

export const OnlyButtons: Story = () => (
  <Carousel>
    <CarouselContent>
      {demoSlides.slice(0, 3).map(slide => (
        <CarouselItem key={slide.id}>
          <DemoSlide color={slide.color} title={slide.title} />
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
);

export const NoLoop: Story = () => (
  <div className="space-y-4">
    <p className="text-sm text-gray-600">Navigation stops at first and last slides</p>
    <Carousel loop={false}>
      <CarouselContent>
        {demoSlides.slice(0, 3).map(slide => (
          <CarouselItem key={slide.id}>
            <DemoSlide color={slide.color} title={slide.title} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselIndicators />
    </Carousel>
  </div>
);

export const ContentCarousel: Story = () => (
  <Carousel size="lg" autoPlay autoPlayInterval={4000}>
    <CarouselContent>
      {[
        {
          title: 'Welcome to Our Platform',
          description: 'Discover amazing features and capabilities',
          color: 'bg-gradient-to-br from-indigo-500 to-indigo-700',
        },
        {
          title: 'Build Something Great',
          description: 'Create powerful applications with ease',
          color: 'bg-gradient-to-br from-cyan-500 to-cyan-700',
        },
        {
          title: 'Join Our Community',
          description: 'Connect with developers worldwide',
          color: 'bg-gradient-to-br from-teal-500 to-teal-700',
        },
      ].map((slide, index) => (
        <CarouselItem key={index.toString()}>
          <div
            className={`${slide.color} flex h-full w-full flex-col items-center justify-center rounded-lg px-8 text-center`}
          >
            <h2 className="text-4xl font-bold text-white">{slide.title}</h2>
            <p className="mt-4 text-xl text-white/90">{slide.description}</p>
            <button
              type="button"
              className="mt-8 rounded-lg bg-white px-6 py-3 font-semibold text-gray-900 transition-transform hover:scale-105"
            >
              Learn More
            </button>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
    <CarouselIndicators />
  </Carousel>
);

export const CardBased: Story = () => (
  <Carousel size="md">
    <CarouselContent>
      {[
        { title: 'Product 1', price: '$99', description: 'Amazing product description' },
        { title: 'Product 2', price: '$149', description: 'Another great product' },
        { title: 'Product 3', price: '$199', description: 'Premium quality item' },
      ].map((product, index) => (
        <CarouselItem key={index.toString()}>
          <div className="flex h-full w-full items-center justify-center p-8">
            <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-4 h-32 rounded-md bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{product.title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{product.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                <button
                  type="button"
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
    <CarouselIndicators />
  </Carousel>
);

export const WithCallback: Story = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          Current slide: <span className="text-blue-600">{currentSlide + 1}</span> of{' '}
          {demoSlides.length}
        </p>
      </div>
      <Carousel onSlideChange={setCurrentSlide}>
        <CarouselContent>
          {demoSlides.map((slide, index) => (
            <CarouselItem key={slide.id}>
              <div
                className={`${slide.color} flex h-full w-full items-center justify-center rounded-lg`}
              >
                <div className="text-center text-white">
                  <h2 className="text-3xl font-bold">{slide.title}</h2>
                  <p className="mt-2 text-sm opacity-80">
                    Slide {index + 1} of {demoSlides.length}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselIndicators />
      </Carousel>
    </div>
  );
};

export const Minimal: Story = () => (
  <Carousel>
    <CarouselContent>
      {demoSlides.slice(0, 3).map(slide => (
        <CarouselItem key={slide.id}>
          <DemoSlide color={slide.color} title={slide.title} />
        </CarouselItem>
      ))}
    </CarouselContent>
  </Carousel>
);

export const Playground: Story<CarouselProps> = props => (
  <Carousel {...props}>
    <CarouselContent>
      {demoSlides.map(slide => (
        <CarouselItem key={slide.id}>
          <DemoSlide color={slide.color} title={slide.title} />
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
    <CarouselIndicators />
  </Carousel>
);

Playground.args = {
  size: 'md',
  autoPlay: false,
  autoPlayInterval: 3000,
  loop: true,
  pauseOnHover: true,
};

Playground.argTypes = {
  size: {
    options: ['sm', 'md', 'lg', 'xl', 'full'],
    control: { type: 'select' },
    defaultValue: 'md',
  },
  autoPlay: {
    control: { type: 'boolean' },
    defaultValue: false,
  },
  autoPlayInterval: {
    control: { type: 'number', min: 1000, max: 10000, step: 500 },
    defaultValue: 3000,
  },
  loop: {
    control: { type: 'boolean' },
    defaultValue: true,
  },
  pauseOnHover: {
    control: { type: 'boolean' },
    defaultValue: true,
  },
};
