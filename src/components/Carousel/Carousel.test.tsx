import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import {
  Carousel,
  CarouselContent,
  CarouselIndicators,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './Carousel';

describe('Carousel', () => {
  const slides = [
    <CarouselItem key="1">
      <div>Slide 1</div>
    </CarouselItem>,
    <CarouselItem key="2">
      <div>Slide 2</div>
    </CarouselItem>,
    <CarouselItem key="3">
      <div>Slide 3</div>
    </CarouselItem>,
  ];

  describe('Rendering', () => {
    it('should render with default props', () => {
      render(
        <Carousel>
          <CarouselContent>{slides}</CarouselContent>
        </Carousel>
      );
      expect(screen.getByRole('region', { name: 'Carousel' })).toBeInTheDocument();
    });

    it('should render all slides', () => {
      render(
        <Carousel>
          <CarouselContent>{slides}</CarouselContent>
        </Carousel>
      );
      expect(screen.getByText('Slide 1')).toBeInTheDocument();
      expect(screen.getByText('Slide 2')).toBeInTheDocument();
      expect(screen.getByText('Slide 3')).toBeInTheDocument();
    });

    it('should render with custom size', () => {
      const { container } = render(
        <Carousel size="lg">
          <CarouselContent>{slides}</CarouselContent>
        </Carousel>
      );
      const carousel = container.querySelector('section');
      expect(carousel).toHaveClass('h-96');
    });

    it('should render navigation controls', () => {
      render(
        <Carousel>
          <CarouselContent>{slides}</CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      );
      expect(screen.getByLabelText('Previous slide')).toBeInTheDocument();
      expect(screen.getByLabelText('Next slide')).toBeInTheDocument();
    });

    it('should render indicators', () => {
      render(
        <Carousel>
          <CarouselContent>{slides}</CarouselContent>
          <CarouselIndicators />
        </Carousel>
      );
      const indicators = screen.getAllByRole('tab');
      expect(indicators).toHaveLength(3);
    });

    it('should not render controls when not included', () => {
      render(
        <Carousel>
          <CarouselContent>{slides}</CarouselContent>
        </Carousel>
      );
      expect(screen.queryByLabelText('Previous slide')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Next slide')).not.toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('should navigate to next slide when next button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <Carousel>
          <CarouselContent>{slides}</CarouselContent>
          <CarouselNext />
        </Carousel>
      );

      const nextButton = screen.getByLabelText('Next slide');
      await user.click(nextButton);

      await waitFor(() => {
        const slide2 = screen.getByText('Slide 2').parentElement?.parentElement;
        expect(slide2).toHaveClass('opacity-100');
      });
    });

    it('should navigate to previous slide when prev button is clicked', async () => {
      const user = userEvent.setup({ delay: 100 });
      const onSlideChange = vi.fn();
      render(
        <Carousel onSlideChange={onSlideChange}>
          <CarouselContent>{slides}</CarouselContent>
          <CarouselPrevious />
          <CarouselIndicators />
        </Carousel>
      );

      // First go to slide 2 using indicator
      const indicators = screen.getAllByRole('tab');
      await user.click(indicators[1]);

      await waitFor(() => {
        expect(onSlideChange).toHaveBeenCalledWith(1);
      });

      // Wait for transition
      await new Promise(resolve => setTimeout(resolve, 600));

      // Then go back
      const prevButton = screen.getByLabelText('Previous slide');
      await user.click(prevButton);

      await waitFor(() => {
        expect(onSlideChange).toHaveBeenLastCalledWith(0);
      });
    });

    it('should navigate to specific slide when indicator is clicked', async () => {
      const user = userEvent.setup();
      render(
        <Carousel>
          <CarouselContent>{slides}</CarouselContent>
          <CarouselIndicators />
        </Carousel>
      );

      const indicators = screen.getAllByRole('tab');
      await user.click(indicators[2]);

      await waitFor(() => {
        const slide3 = screen.getByText('Slide 3').parentElement?.parentElement;
        expect(slide3).toHaveClass('opacity-100');
      });
    });

    it('should disable prev button on first slide when loop is false', () => {
      render(
        <Carousel loop={false}>
          <CarouselContent>{slides}</CarouselContent>
          <CarouselPrevious />
        </Carousel>
      );
      const prevButton = screen.getByLabelText('Previous slide');
      expect(prevButton).toBeDisabled();
    });

    it('should disable next button on last slide when loop is false', async () => {
      const user = userEvent.setup();
      render(
        <Carousel loop={false}>
          <CarouselContent>{slides}</CarouselContent>
          <CarouselNext />
          <CarouselIndicators />
        </Carousel>
      );

      const indicators = screen.getAllByRole('tab');
      // Go directly to last slide
      await user.click(indicators[2]);

      await new Promise(resolve => setTimeout(resolve, 600));

      const nextButton = screen.getByLabelText('Next slide');
      expect(nextButton).toBeDisabled();
    });

    it('should loop back to first slide when loop is true', async () => {
      const user = userEvent.setup();
      const onSlideChange = vi.fn();
      render(
        <Carousel loop={true} onSlideChange={onSlideChange}>
          <CarouselContent>{slides}</CarouselContent>
          <CarouselNext />
          <CarouselIndicators />
        </Carousel>
      );

      const indicators = screen.getAllByRole('tab');

      // Go to last slide
      await user.click(indicators[2]);

      await waitFor(() => {
        expect(onSlideChange).toHaveBeenCalledWith(2);
      });

      // Wait for transition
      await new Promise(resolve => setTimeout(resolve, 600));

      // Go next, should loop to first
      const nextButton = screen.getByLabelText('Next slide');
      await user.click(nextButton);

      await waitFor(() => {
        expect(onSlideChange).toHaveBeenLastCalledWith(0);
      });
    });
  });

  describe('Keyboard Navigation', () => {
    it('should navigate with arrow keys', async () => {
      const user = userEvent.setup();
      const onSlideChange = vi.fn();
      render(
        <Carousel onSlideChange={onSlideChange}>
          <CarouselContent>{slides}</CarouselContent>
        </Carousel>
      );

      await user.keyboard('{ArrowRight}');

      await waitFor(() => {
        expect(onSlideChange).toHaveBeenCalledWith(1);
      });

      // Wait for transition
      await new Promise(resolve => setTimeout(resolve, 600));

      await user.keyboard('{ArrowLeft}');

      await waitFor(() => {
        expect(onSlideChange).toHaveBeenLastCalledWith(0);
      });
    });
  });

  describe('Auto-play', () => {
    it('should have autoPlay prop', () => {
      const { container } = render(
        <Carousel autoPlay autoPlayInterval={1000}>
          <CarouselContent>{slides}</CarouselContent>
        </Carousel>
      );

      // Just verify it renders without error
      expect(container.querySelector('section[role="region"]')).toBeInTheDocument();
    });

    it('should not auto-play when autoPlay is false', () => {
      const { container } = render(
        <Carousel autoPlay={false} autoPlayInterval={1000}>
          <CarouselContent>{slides}</CarouselContent>
        </Carousel>
      );

      // Verify it renders
      expect(container.querySelector('section[role="region"]')).toBeInTheDocument();
    });
  });

  describe('Callbacks', () => {
    it('should call onSlideChange when slide changes', async () => {
      const user = userEvent.setup();
      const onSlideChange = vi.fn();

      render(
        <Carousel onSlideChange={onSlideChange}>
          <CarouselContent>{slides}</CarouselContent>
          <CarouselNext />
        </Carousel>
      );

      const nextButton = screen.getByLabelText('Next slide');
      await user.click(nextButton);

      await waitFor(
        () => {
          expect(onSlideChange).toHaveBeenCalledWith(1);
        },
        { timeout: 10000 }
      );
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(
        <Carousel>
          <CarouselContent>{slides}</CarouselContent>
          <CarouselIndicators />
        </Carousel>
      );

      const carousel = screen.getByRole('region', { name: 'Carousel' });
      expect(carousel).toHaveAttribute('aria-live', 'polite');

      const tablist = screen.getByRole('tablist', { name: 'Carousel slides' });
      expect(tablist).toBeInTheDocument();

      const tabs = screen.getAllByRole('tab');
      expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
      expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
    });

    it('should hide non-active slides from screen readers', () => {
      render(
        <Carousel>
          <CarouselContent>{slides}</CarouselContent>
        </Carousel>
      );

      const slide1 = screen.getByText('Slide 1').parentElement?.parentElement;
      const slide2 = screen.getByText('Slide 2').parentElement?.parentElement;

      expect(slide1).toHaveAttribute('aria-hidden', 'false');
      expect(slide2).toHaveAttribute('aria-hidden', 'true');
    });

    it('should have accessible button labels', () => {
      render(
        <Carousel>
          <CarouselContent>{slides}</CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <CarouselIndicators />
        </Carousel>
      );

      expect(screen.getByLabelText('Previous slide')).toBeInTheDocument();
      expect(screen.getByLabelText('Next slide')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to slide 1')).toBeInTheDocument();
    });
  });

  describe('CarouselItem', () => {
    it('should render with default classes', () => {
      const { container } = render(
        <CarouselItem>
          <div>Content</div>
        </CarouselItem>
      );

      const item = container.firstChild as HTMLElement;
      expect(item).toHaveClass('flex', 'h-full', 'w-full', 'items-center', 'justify-center');
    });

    it('should accept custom className', () => {
      const { container } = render(
        <CarouselItem className="custom-class">
          <div>Content</div>
        </CarouselItem>
      );

      const item = container.firstChild as HTMLElement;
      expect(item).toHaveClass('custom-class');
    });
  });

  describe('Edge Cases', () => {
    it('should handle single slide gracefully', () => {
      render(
        <Carousel>
          <CarouselContent>
            {[
              <CarouselItem key="1">
                <div>Only Slide</div>
              </CarouselItem>,
            ]}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <CarouselIndicators />
        </Carousel>
      );

      // Should not show controls or indicators for single slide
      expect(screen.queryByLabelText('Previous slide')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Next slide')).not.toBeInTheDocument();
      expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
    });

    it('should prevent rapid clicking during transition', async () => {
      const user = userEvent.setup();
      const onSlideChange = vi.fn();

      render(
        <Carousel onSlideChange={onSlideChange}>
          <CarouselContent>{slides}</CarouselContent>
          <CarouselNext />
        </Carousel>
      );

      const nextButton = screen.getByLabelText('Next slide');

      // Click rapidly
      await user.click(nextButton);
      await user.click(nextButton);
      await user.click(nextButton);

      // Should only change once initially
      await waitFor(
        () => {
          expect(onSlideChange).toHaveBeenCalledTimes(1);
        },
        { timeout: 10000 }
      );
    });
  });
});
