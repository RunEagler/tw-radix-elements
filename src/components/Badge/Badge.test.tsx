import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(
        <Badge count={5}>
          <button type="button">Button</button>
        </Badge>
      );
      expect(screen.getByRole('button', { name: 'Button' })).toBeInTheDocument();
    });

    it('renders badge with count', () => {
      const { container } = render(
        <Badge count={5}>
          <button type="button">Button</button>
        </Badge>
      );
      const badge = container.querySelector('span');
      expect(badge).toHaveTextContent('5');
    });

    it('does not render badge when count is undefined', () => {
      const { container } = render(
        <Badge>
          <button type="button">Button</button>
        </Badge>
      );
      const badge = container.querySelector('span');
      expect(badge).not.toBeInTheDocument();
    });

    it('does not render badge when count is null', () => {
      const { container } = render(
        <Badge count={null as any}>
          <button type="button">Button</button>
        </Badge>
      );
      const badge = container.querySelector('span');
      expect(badge).not.toBeInTheDocument();
    });
  });

  describe('Count Display', () => {
    it('displays exact count when below max', () => {
      const { container } = render(
        <Badge count={50} max={99}>
          <button type="button">Button</button>
        </Badge>
      );
      const badge = container.querySelector('span');
      expect(badge).toHaveTextContent('50');
    });

    it('displays max+ when count exceeds max', () => {
      const { container } = render(
        <Badge count={150} max={99}>
          <button type="button">Button</button>
        </Badge>
      );
      const badge = container.querySelector('span');
      expect(badge).toHaveTextContent('99+');
    });

    it('uses default max of 99', () => {
      const { container } = render(
        <Badge count={150}>
          <button type="button">Button</button>
        </Badge>
      );
      const badge = container.querySelector('span');
      expect(badge).toHaveTextContent('99+');
    });

    it('displays zero count', () => {
      const { container } = render(
        <Badge count={0}>
          <button type="button">Button</button>
        </Badge>
      );
      const badge = container.querySelector('span');
      expect(badge).toHaveTextContent('0');
    });
  });

  describe('Dot Mode', () => {
    it('renders dot badge without content', () => {
      const { container } = render(
        <Badge dot>
          <button type="button">Button</button>
        </Badge>
      );
      const badge = container.querySelector('span');
      expect(badge).toBeInTheDocument();
      expect(badge).toBeEmptyDOMElement();
    });

    it('ignores count when dot is true', () => {
      const { container } = render(
        <Badge dot count={5}>
          <button type="button">Button</button>
        </Badge>
      );
      const badge = container.querySelector('span');
      expect(badge).toBeEmptyDOMElement();
    });

    it('applies dot-specific classes', () => {
      const { container } = render(
        <Badge dot>
          <button type="button">Button</button>
        </Badge>
      );
      const badge = container.querySelector('span');
      expect(badge).toHaveClass('w-4', 'h-4', 'p-0', 'min-w-0');
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      const { container } = render(
        <Badge count={5} variant="default">
          <button type="button">Button</button>
        </Badge>
      );
      const badge = container.querySelector('span');
      expect(badge).toHaveClass('bg-primary', 'text-primary-foreground');
    });

    it('renders secondary variant', () => {
      const { container } = render(
        <Badge count={5} variant="secondary">
          <button type="button">Button</button>
        </Badge>
      );
      const badge = container.querySelector('span');
      expect(badge).toHaveClass('bg-secondary', 'text-secondary-foreground');
    });

    it('renders destructive variant', () => {
      const { container } = render(
        <Badge count={5} variant="destructive">
          <button type="button">Button</button>
        </Badge>
      );
      const badge = container.querySelector('span');
      expect(badge).toHaveClass('bg-destructive', 'text-destructive-foreground');
    });

    it('renders success variant', () => {
      const { container } = render(
        <Badge count={5} variant="success">
          <button type="button">Button</button>
        </Badge>
      );
      const badge = container.querySelector('span');
      expect(badge).toHaveClass('bg-green-600', 'text-white');
    });

    it('renders warning variant', () => {
      const { container } = render(
        <Badge count={5} variant="warning">
          <button type="button">Button</button>
        </Badge>
      );
      const badge = container.querySelector('span');
      expect(badge).toHaveClass('bg-yellow-500', 'text-white');
    });

    it('renders info variant', () => {
      const { container } = render(
        <Badge count={5} variant="info">
          <button type="button">Button</button>
        </Badge>
      );
      const badge = container.querySelector('span');
      expect(badge).toHaveClass('bg-blue-500', 'text-white');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      const { container } = render(
        <Badge count={5} size="sm">
          <button type="button">Button</button>
        </Badge>
      );
      const badge = container.querySelector('span');
      expect(badge).toHaveClass('h-4', 'min-w-4', 'text-[10px]', 'px-1');
    });

    it('renders default size', () => {
      const { container } = render(
        <Badge count={5} size="default">
          <button type="button">Button</button>
        </Badge>
      );
      const badge = container.querySelector('span');
      expect(badge).toHaveClass('h-5', 'min-w-5', 'text-xs', 'px-1.5');
    });

    it('renders large size', () => {
      const { container } = render(
        <Badge count={5} size="lg">
          <button type="button">Button</button>
        </Badge>
      );
      const badge = container.querySelector('span');
      expect(badge).toHaveClass('h-6', 'min-w-6', 'text-sm', 'px-2');
    });
  });

  describe('Styling', () => {
    it('applies base classes', () => {
      const { container } = render(
        <Badge count={5}>
          <button type="button">Button</button>
        </Badge>
      );
      const badge = container.querySelector('span');
      expect(badge).toHaveClass(
        'absolute',
        'flex',
        'items-center',
        'justify-center',
        'rounded-full',
        'border-2',
        'border-white'
      );
    });

    it('applies custom className', () => {
      const { container } = render(
        <Badge count={5} className="custom-class">
          <button type="button">Button</button>
        </Badge>
      );
      const badge = container.querySelector('span');
      expect(badge).toHaveClass('custom-class');
    });

    it('wrapper has relative positioning', () => {
      const { container } = render(
        <Badge count={5}>
          <button type="button">Button</button>
        </Badge>
      );
      const wrapper = container.querySelector('div');
      expect(wrapper).toHaveClass('relative', 'inline-flex');
    });
  });

  describe('Edge Cases', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Badge ref={ref} count={5}>
          <button type="button">Button</button>
        </Badge>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('relative', 'inline-flex');
    });

    it('spreads additional props to badge span', () => {
      const { container } = render(
        <Badge count={5} data-testid="custom-badge">
          <button type="button">Button</button>
        </Badge>
      );
      const badge = container.querySelector('span');
      expect(badge).toHaveAttribute('data-testid', 'custom-badge');
    });

    it('renders with combined variants and sizes', () => {
      const { container } = render(
        <Badge count={5} variant="success" size="lg">
          <button type="button">Button</button>
        </Badge>
      );
      const badge = container.querySelector('span');
      expect(badge).toHaveClass('bg-green-600', 'h-6', 'min-w-6', 'text-sm', 'px-2');
    });
  });

  describe('Complex Scenarios', () => {
    it('handles count updates', () => {
      const { container, rerender } = render(
        <Badge count={5}>
          <button type="button">Button</button>
        </Badge>
      );
      let badge = container.querySelector('span');
      expect(badge).toHaveTextContent('5');

      rerender(
        <Badge count={150}>
          <button type="button">Button</button>
        </Badge>
      );
      badge = container.querySelector('span');
      expect(badge).toHaveTextContent('99+');
    });

    it('handles switching between dot and count mode', () => {
      const { container, rerender } = render(
        <Badge count={5}>
          <button type="button">Button</button>
        </Badge>
      );
      let badge = container.querySelector('span');
      expect(badge).toHaveTextContent('5');

      rerender(
        <Badge dot>
          <button type="button">Button</button>
        </Badge>
      );
      badge = container.querySelector('span');
      expect(badge).toBeEmptyDOMElement();
    });

    it('handles removal of count', () => {
      const { container, rerender } = render(
        <Badge count={5}>
          <button type="button">Button</button>
        </Badge>
      );
      expect(container.querySelector('span')).toBeInTheDocument();

      rerender(
        <Badge>
          <button type="button">Button</button>
        </Badge>
      );
      expect(container.querySelector('span')).not.toBeInTheDocument();
    });
  });
});
