import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  describe('Rendering', () => {
    it('renders badge with default props', () => {
      render(<Badge>Default Badge</Badge>);
      const badge = screen.getByText('Default Badge');
      expect(badge).toBeInTheDocument();
    });

    it('renders with icon', () => {
      render(<Badge icon={<span data-testid="icon">★</span>}>Badge with Icon</Badge>);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('Badge with Icon')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Badge variant="default">Default</Badge>);
      const badge = screen.getByText('Default');
      expect(badge).toHaveClass('bg-primary', 'text-primary-foreground');
    });

    it('renders secondary variant', () => {
      render(<Badge variant="secondary">Secondary</Badge>);
      const badge = screen.getByText('Secondary');
      expect(badge).toHaveClass('bg-secondary', 'text-secondary-foreground');
    });

    it('renders destructive variant', () => {
      render(<Badge variant="destructive">Destructive</Badge>);
      const badge = screen.getByText('Destructive');
      expect(badge).toHaveClass('bg-destructive', 'text-destructive-foreground');
    });

    it('renders success variant', () => {
      render(<Badge variant="success">Success</Badge>);
      const badge = screen.getByText('Success');
      expect(badge).toHaveClass('bg-green-600', 'text-white');
    });

    it('renders warning variant', () => {
      render(<Badge variant="warning">Warning</Badge>);
      const badge = screen.getByText('Warning');
      expect(badge).toHaveClass('bg-yellow-500', 'text-white');
    });

    it('renders outline variant', () => {
      render(<Badge variant="outline">Outline</Badge>);
      const badge = screen.getByText('Outline');
      expect(badge).toHaveClass('text-foreground');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Badge size="sm">Small</Badge>);
      const badge = screen.getByText('Small');
      expect(badge).toHaveClass('px-2', 'py-0.5', 'text-xs');
    });

    it('renders default size', () => {
      render(<Badge size="default">Default</Badge>);
      const badge = screen.getByText('Default');
      expect(badge).toHaveClass('px-2.5', 'py-0.5', 'text-xs');
    });

    it('renders large size', () => {
      render(<Badge size="lg">Large</Badge>);
      const badge = screen.getByText('Large');
      expect(badge).toHaveClass('px-3', 'py-1', 'text-sm');
    });
  });

  describe('Rounded', () => {
    it('renders with default rounded', () => {
      render(<Badge rounded="default">Rounded</Badge>);
      const badge = screen.getByText('Rounded');
      expect(badge).toHaveClass('rounded-full');
    });

    it('renders with square rounded', () => {
      render(<Badge rounded="square">Square</Badge>);
      const badge = screen.getByText('Square');
      expect(badge).toHaveClass('rounded-md');
    });

    it('renders with no rounded', () => {
      render(<Badge rounded="none">No Round</Badge>);
      const badge = screen.getByText('No Round');
      expect(badge).toHaveClass('rounded-none');
    });
  });

  describe('Removable Badge', () => {
    it('renders remove button when removable is true', () => {
      const handleRemove = vi.fn();
      render(
        <Badge removable onRemove={handleRemove}>
          Removable
        </Badge>
      );

      const removeButton = screen.getByRole('button', { name: /remove badge/i });
      expect(removeButton).toBeInTheDocument();
    });

    it('does not render remove button when removable is false', () => {
      render(<Badge removable={false}>Not Removable</Badge>);

      const removeButton = screen.queryByRole('button', { name: /remove badge/i });
      expect(removeButton).not.toBeInTheDocument();
    });

    it('calls onRemove when remove button is clicked', async () => {
      const user = userEvent.setup();
      const handleRemove = vi.fn();
      render(
        <Badge removable onRemove={handleRemove}>
          Removable
        </Badge>
      );

      const removeButton = screen.getByRole('button', { name: /remove badge/i });
      await user.click(removeButton);

      expect(handleRemove).toHaveBeenCalledTimes(1);
    });

    it('does not crash when removable is true but onRemove is not provided', () => {
      render(<Badge removable>No Handler</Badge>);

      const removeButton = screen.queryByRole('button', { name: /remove badge/i });
      expect(removeButton).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper remove button aria-label', () => {
      const handleRemove = vi.fn();
      render(
        <Badge removable onRemove={handleRemove}>
          Badge
        </Badge>
      );

      const removeButton = screen.getByRole('button', { name: /remove badge/i });
      expect(removeButton).toHaveAttribute('aria-label', 'Remove badge');
    });

    it('remove button is keyboard accessible', async () => {
      const user = userEvent.setup();
      const handleRemove = vi.fn();
      render(
        <Badge removable onRemove={handleRemove}>
          Badge
        </Badge>
      );

      const removeButton = screen.getByRole('button', { name: /remove badge/i });
      removeButton.focus();
      await user.keyboard('{Enter}');

      expect(handleRemove).toHaveBeenCalledTimes(1);
    });
  });

  describe('Edge Cases', () => {
    it('applies custom className', () => {
      render(<Badge className="custom-class">Custom</Badge>);
      const badge = screen.getByText('Custom');
      expect(badge).toHaveClass('custom-class');
    });

    it('renders with combined variants', () => {
      render(
        <Badge variant="success" size="lg" rounded="square">
          Combined
        </Badge>
      );
      const badge = screen.getByText('Combined');
      expect(badge).toHaveClass('bg-green-600', 'px-3', 'py-1', 'rounded-md');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Badge ref={ref}>Badge</Badge>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('renders with icon and removable', async () => {
      const user = userEvent.setup();
      const handleRemove = vi.fn();
      render(
        <Badge icon={<span data-testid="icon">★</span>} removable onRemove={handleRemove}>
          Complete Badge
        </Badge>
      );

      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('Complete Badge')).toBeInTheDocument();

      const removeButton = screen.getByRole('button', { name: /remove badge/i });
      await user.click(removeButton);
      expect(handleRemove).toHaveBeenCalledTimes(1);
    });
  });
});
