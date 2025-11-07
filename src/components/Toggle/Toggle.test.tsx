import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  describe('Rendering', () => {
    it('renders toggle with default props', () => {
      render(<Toggle />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toBeInTheDocument();
      expect(toggle).toHaveAttribute('aria-checked', 'false');
    });

    it('renders with label', () => {
      render(<Toggle label="Enable notifications" />);
      expect(screen.getByText('Enable notifications')).toBeInTheDocument();
    });

    it('renders with description', () => {
      render(<Toggle label="Feature" description="Enable this feature" />);
      expect(screen.getByText('Enable this feature')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Toggle variant="default" />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toBeInTheDocument();
    });

    it('renders success variant', () => {
      render(<Toggle variant="success" />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toBeInTheDocument();
    });

    it('renders destructive variant', () => {
      render(<Toggle variant="destructive" />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Toggle size="sm" />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveClass('h-5', 'w-9');
    });

    it('renders default size', () => {
      render(<Toggle size="default" />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveClass('h-6', 'w-11');
    });

    it('renders large size', () => {
      render(<Toggle size="lg" />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveClass('h-7', 'w-14');
    });
  });

  describe('Interactions', () => {
    it('handles click events', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Toggle onCheckedChange={handleChange} />);

      const toggle = screen.getByRole('switch');
      await user.click(toggle);

      expect(handleChange).toHaveBeenCalledWith(true);
      expect(toggle).toHaveAttribute('aria-checked', 'true');
    });

    it('handles keyboard navigation (Space key)', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Toggle onCheckedChange={handleChange} />);

      const toggle = screen.getByRole('switch');
      toggle.focus();
      await user.keyboard(' ');

      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('handles keyboard navigation (Enter key)', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Toggle onCheckedChange={handleChange} />);

      const toggle = screen.getByRole('switch');
      toggle.focus();
      await user.keyboard('{Enter}');

      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('does not trigger events when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Toggle disabled onCheckedChange={handleChange} />);

      const toggle = screen.getByRole('switch');
      await user.click(toggle);

      expect(handleChange).not.toHaveBeenCalled();
      expect(toggle).toBeDisabled();
    });

    it('toggles checked state', async () => {
      const user = userEvent.setup();
      render(<Toggle />);

      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-checked', 'false');

      await user.click(toggle);
      expect(toggle).toHaveAttribute('aria-checked', 'true');

      await user.click(toggle);
      expect(toggle).toHaveAttribute('aria-checked', 'false');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Toggle label="Toggle" description="Description" />);
      const toggle = screen.getByRole('switch');

      expect(toggle).toHaveAttribute('aria-checked');
      expect(toggle).toHaveAttribute('aria-describedby');
    });

    it('associates label with toggle', () => {
      render(<Toggle label="Feature toggle" id="feature" />);
      const label = screen.getByText('Feature toggle');
      const toggle = screen.getByRole('switch');

      expect(label).toHaveAttribute('for', 'feature');
      expect(toggle).toHaveAttribute('id', 'feature');
    });
  });

  describe('Edge Cases', () => {
    it('applies custom className', () => {
      render(<Toggle className="custom-class" />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Toggle ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('handles controlled state', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { rerender } = render(<Toggle checked={false} onCheckedChange={handleChange} />);

      let toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-checked', 'false');

      await user.click(toggle);
      expect(handleChange).toHaveBeenCalledWith(true);

      rerender(<Toggle checked={true} onCheckedChange={handleChange} />);
      toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-checked', 'true');
    });
  });
});
