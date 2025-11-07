import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { Progress } from './Progress';

describe('Progress', () => {
  describe('Rendering', () => {
    it('renders progress with default props', () => {
      render(<Progress />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toBeInTheDocument();
      expect(progress).toHaveAttribute('aria-valuenow', '0');
      expect(progress).toHaveAttribute('aria-valuemax', '100');
    });

    it('renders with custom value', () => {
      render(<Progress value={50} />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveAttribute('aria-valuenow', '50');
    });

    it('renders with custom max value', () => {
      render(<Progress value={25} max={50} />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveAttribute('aria-valuenow', '25');
      expect(progress).toHaveAttribute('aria-valuemax', '50');
    });

    it('renders with label', () => {
      render(<Progress value={30} label="Loading" showLabel />);
      expect(screen.getByText('Loading')).toBeInTheDocument();
      expect(screen.getByText('30%')).toBeInTheDocument();
    });

    it('shows percentage when showLabel is true', () => {
      render(<Progress value={75} showLabel />);
      expect(screen.getByText('75%')).toBeInTheDocument();
      expect(screen.getByText('Progress')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Progress variant="default" value={50} />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toBeInTheDocument();
    });

    it('renders success variant', () => {
      render(<Progress variant="success" value={50} />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toBeInTheDocument();
    });

    it('renders warning variant', () => {
      render(<Progress variant="warning" value={50} />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toBeInTheDocument();
    });

    it('renders error variant', () => {
      render(<Progress variant="error" value={50} />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Progress size="sm" value={50} />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveClass('h-2');
    });

    it('renders default size', () => {
      render(<Progress size="default" value={50} />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveClass('h-4');
    });

    it('renders large size', () => {
      render(<Progress size="lg" value={50} />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveClass('h-6');
    });
  });

  describe('Value Boundaries', () => {
    it('caps value at 100%', () => {
      render(<Progress value={150} max={100} />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveAttribute('aria-valuenow', '150');
    });

    it('handles negative values', () => {
      render(<Progress value={-10} />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveAttribute('aria-valuenow', '-10');
    });

    it('handles zero value', () => {
      render(<Progress value={0} />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveAttribute('aria-valuenow', '0');
    });

    it('handles full value', () => {
      render(<Progress value={100} />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveAttribute('aria-valuenow', '100');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Progress value={50} label="File upload" />);
      const progress = screen.getByRole('progressbar');

      expect(progress).toHaveAttribute('aria-valuemin', '0');
      expect(progress).toHaveAttribute('aria-valuemax', '100');
      expect(progress).toHaveAttribute('aria-valuenow', '50');
      expect(progress).toHaveAttribute('aria-label', 'File upload');
    });

    it('has default aria-label when no label provided', () => {
      render(<Progress value={50} />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveAttribute('aria-label', 'Progress');
    });
  });

  describe('Visual States', () => {
    it('renders with animated prop', () => {
      render(<Progress value={50} animated />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toBeInTheDocument();
    });

    it('renders with striped prop', () => {
      render(<Progress value={50} striped />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toBeInTheDocument();
    });

    it('renders with both animated and striped', () => {
      render(<Progress value={50} animated striped />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('applies custom className', () => {
      render(<Progress className="custom-class" value={50} />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Progress ref={ref} value={50} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('renders with combined variants', () => {
      render(
        <Progress
          variant="success"
          size="lg"
          value={75}
          label="Upload"
          showLabel
          animated
          striped
        />
      );
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveClass('h-6');
      expect(screen.getByText('Upload')).toBeInTheDocument();
      expect(screen.getByText('75%')).toBeInTheDocument();
    });

    it('calculates percentage correctly with custom max', () => {
      render(<Progress value={25} max={50} showLabel />);
      expect(screen.getByText('50%')).toBeInTheDocument();
    });
  });
});
