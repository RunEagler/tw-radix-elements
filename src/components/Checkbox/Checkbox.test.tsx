import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  describe('Rendering', () => {
    it('renders checkbox with default props', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();
    });

    it('renders with label', () => {
      render(<Checkbox label="Accept terms" />);
      const label = screen.getByText('Accept terms');
      const checkbox = screen.getByRole('checkbox');
      expect(label).toBeInTheDocument();
      expect(checkbox).toBeInTheDocument();
    });

    it('renders with description', () => {
      render(<Checkbox label="Subscribe" description="Get weekly updates" />);
      expect(screen.getByText('Get weekly updates')).toBeInTheDocument();
    });

    it('renders checked state', () => {
      render(<Checkbox checked />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Checkbox variant="default" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('renders destructive variant', () => {
      render(<Checkbox variant="destructive" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass('border-destructive');
    });

    it('renders success variant', () => {
      render(<Checkbox variant="success" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass('border-green-600');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Checkbox size="sm" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass('h-4', 'w-4');
    });

    it('renders default size', () => {
      render(<Checkbox size="default" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass('h-5', 'w-5');
    });

    it('renders large size', () => {
      render(<Checkbox size="lg" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass('h-6', 'w-6');
    });
  });

  describe('Interactions', () => {
    it('handles click events', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox onCheckedChange={handleChange} />);

      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('handles label click', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox label="Click me" onCheckedChange={handleChange} />);

      const label = screen.getByText('Click me');
      await user.click(label);

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard navigation (Space key)', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox onCheckedChange={handleChange} />);

      const checkbox = screen.getByRole('checkbox');
      checkbox.focus();
      await user.keyboard(' ');

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('does not trigger events when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox disabled onCheckedChange={handleChange} />);

      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);

      expect(handleChange).not.toHaveBeenCalled();
      expect(checkbox).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Checkbox label="Test" description="Description text" />);
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).toHaveAccessibleName('Test');
      expect(checkbox).toHaveAttribute('aria-describedby');
    });

    it('has proper disabled state styling', () => {
      render(<Checkbox disabled label="Disabled checkbox" />);
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50');
      expect(checkbox).toBeDisabled();
    });

    it('associates label with checkbox using htmlFor', () => {
      render(<Checkbox label="Associated label" id="test-checkbox" />);
      const label = screen.getByText('Associated label');
      const checkbox = screen.getByRole('checkbox');

      expect(label).toHaveAttribute('for', 'test-checkbox');
      expect(checkbox).toHaveAttribute('id', 'test-checkbox');
    });
  });

  describe('Edge Cases', () => {
    it('renders without label or description', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('handles controlled state', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { rerender } = render(<Checkbox checked={false} onCheckedChange={handleChange} />);

      let checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(handleChange).toHaveBeenCalledWith(true);

      rerender(<Checkbox checked={true} onCheckedChange={handleChange} />);
      checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    it('applies custom className', () => {
      render(<Checkbox className="custom-class" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass('custom-class');
    });

    it('renders indeterminate state', () => {
      render(<Checkbox checked="indeterminate" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('data-state', 'indeterminate');
    });
  });
});
