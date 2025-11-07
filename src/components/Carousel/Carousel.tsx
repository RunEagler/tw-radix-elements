import { cn } from '@ui/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { useCallback, useContext, useEffect, useId, useRef, useState } from 'react';

// Carousel Context
interface CarouselContextValue {
  currentIndex: number;
  totalSlides: number;
  goToSlide: (index: number) => void;
  goToNext: () => void;
  goToPrev: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  orientation?: 'horizontal' | 'vertical';
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('Carousel components must be used within a Carousel');
  }
  return context;
};

// Variants
const carouselVariants = cva('relative w-full overflow-hidden', {
  variants: {
    size: {
      sm: 'h-48',
      md: 'h-64',
      lg: 'h-96',
      xl: 'h-[32rem]',
      full: 'h-full',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// Main Carousel Component
export interface CarouselProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof carouselVariants> {
  orientation?: 'horizontal' | 'vertical';
  autoPlay?: boolean;
  autoPlayInterval?: number;
  loop?: boolean;
  pauseOnHover?: boolean;
  onSlideChange?: (index: number) => void;
}

const Carousel = React.forwardRef<HTMLElement, CarouselProps>(
  (
    {
      className,
      size,
      children,
      orientation = 'horizontal',
      autoPlay = false,
      autoPlayInterval = 3000,
      loop = true,
      pauseOnHover = true,
      onSlideChange,
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Count slides
    const slides = React.Children.toArray(children);
    const totalSlides = slides.length;

    const goToSlide = useCallback(
      (index: number) => {
        if (isTransitioning || totalSlides <= 1) return;

        let newIndex = index;
        if (loop) {
          newIndex = ((index % totalSlides) + totalSlides) % totalSlides;
        } else {
          newIndex = Math.max(0, Math.min(index, totalSlides - 1));
        }

        if (newIndex === currentIndex) return;

        setIsTransitioning(true);
        setCurrentIndex(newIndex);
        onSlideChange?.(newIndex);

        setTimeout(() => {
          setIsTransitioning(false);
        }, 500);
      },
      [currentIndex, totalSlides, loop, isTransitioning, onSlideChange]
    );

    const goToNext = useCallback(() => {
      goToSlide(currentIndex + 1);
    }, [currentIndex, goToSlide]);

    const goToPrev = useCallback(() => {
      goToSlide(currentIndex - 1);
    }, [currentIndex, goToSlide]);

    // Auto-play
    useEffect(() => {
      if (!autoPlay || isPaused || totalSlides <= 1) {
        return;
      }

      autoPlayRef.current = setInterval(() => {
        goToNext();
      }, autoPlayInterval);

      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
      };
    }, [autoPlay, isPaused, autoPlayInterval, totalSlides, goToNext]);

    // Keyboard navigation
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          goToPrev();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          goToNext();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [goToNext, goToPrev]);

    const handleMouseEnter = () => {
      if (pauseOnHover && autoPlay) {
        setIsPaused(true);
      }
    };

    const handleMouseLeave = () => {
      if (pauseOnHover && autoPlay) {
        setIsPaused(false);
      }
    };

    const canGoPrev = loop || currentIndex > 0;
    const canGoNext = loop || currentIndex < totalSlides - 1;

    if (totalSlides === 0) {
      return null;
    }

    const contextValue: CarouselContextValue = {
      currentIndex,
      totalSlides,
      goToSlide,
      goToNext,
      goToPrev,
      canGoNext,
      canGoPrev,
      orientation,
    };

    return (
      <CarouselContext.Provider value={contextValue}>
        <section
          ref={ref}
          className={cn(carouselVariants({ size, className }))}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          // onTouchStart={handleTouchStart}
          // onTouchMove={handleTouchMove}
          // onTouchEnd={handleTouchEnd}
          aria-label="Carousel"
          aria-live="polite"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </section>
      </CarouselContext.Provider>
    );
  }
);

Carousel.displayName = 'Carousel';

// CarouselContent - Container for slides
export interface CarouselContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CarouselContent = React.forwardRef<HTMLDivElement, CarouselContentProps>(
  ({ className, children, ...props }, ref) => {
    const { currentIndex } = useCarousel();
    const slides = React.Children.toArray(children);

    return (
      <div ref={ref} className={cn('relative h-full w-full', className)} {...props}>
        {slides.map((slide, index) => {
          const slideElement = slide as React.ReactElement;
          const slideKey = slideElement.key ?? `slide-${index}`;

          return (
            <div
              key={slideKey}
              className={cn(
                'absolute inset-0 transition-all duration-500 ease-in-out',
                index === currentIndex
                  ? 'opacity-100 translate-x-0 z-10'
                  : index < currentIndex
                    ? 'opacity-0 -translate-x-full z-0'
                    : 'opacity-0 translate-x-full z-0'
              )}
              aria-hidden={index !== currentIndex}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${slides.length}`}
            >
              {slide}
            </div>
          );
        })}
      </div>
    );
  }
);

CarouselContent.displayName = 'CarouselContent';

// CarouselItem - Individual slide
export interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {}

const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex h-full w-full items-center justify-center', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CarouselItem.displayName = 'CarouselItem';

// CarouselPrevious - Previous button
export interface CarouselPreviousProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CarouselPrevious = React.forwardRef<HTMLButtonElement, CarouselPreviousProps>(
  ({ className, children, ...props }, ref) => {
    const { goToPrev, canGoPrev, totalSlides } = useCarousel();

    if (totalSlides <= 1) return null;

    return (
      <button
        ref={ref}
        type="button"
        onClick={goToPrev}
        disabled={!canGoPrev}
        className={cn(
          'absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground shadow-md transition-all hover:bg-background disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          className
        )}
        aria-label="Previous slide"
        {...props}
      >
        {children || <ChevronLeft className="h-6 w-6" />}
      </button>
    );
  }
);

CarouselPrevious.displayName = 'CarouselPrevious';

// CarouselNext - Next button
export interface CarouselNextProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CarouselNext = React.forwardRef<HTMLButtonElement, CarouselNextProps>(
  ({ className, children, ...props }, ref) => {
    const { goToNext, canGoNext, totalSlides } = useCarousel();

    if (totalSlides <= 1) return null;

    return (
      <button
        ref={ref}
        type="button"
        onClick={goToNext}
        disabled={!canGoNext}
        className={cn(
          'absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground shadow-md transition-all hover:bg-background disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          className
        )}
        aria-label="Next slide"
        {...props}
      >
        {children || <ChevronRight className="h-6 w-6" />}
      </button>
    );
  }
);

CarouselNext.displayName = 'CarouselNext';

// CarouselIndicators - Dot indicators
export interface CarouselIndicatorsProps extends React.HTMLAttributes<HTMLDivElement> {}

const CarouselIndicators = React.forwardRef<HTMLDivElement, CarouselIndicatorsProps>(
  ({ className, ...props }, ref) => {
    const { currentIndex, totalSlides, goToSlide } = useCarousel();
    const baseId = useId();

    if (totalSlides <= 1) return null;

    return (
      <div
        ref={ref}
        className={cn('absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2', className)}
        role="tablist"
        aria-label="Carousel slides"
        {...props}
      >
        {Array.from({ length: totalSlides }, (_, i) => i).map(i => (
          <button
            key={`${baseId}-indicator-${i}`}
            type="button"
            onClick={() => goToSlide(i)}
            className={cn(
              'h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              i === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-primary/50 hover:bg-primary/70'
            )}
            role="tab"
            aria-label={`Go to slide ${i + 1}`}
            aria-selected={i === currentIndex}
            aria-controls={`carousel-slide-${i}`}
          />
        ))}
      </div>
    );
  }
);

CarouselIndicators.displayName = 'CarouselIndicators';

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselIndicators,
  carouselVariants,
  useCarousel,
};
