import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  describe('Rendering', () => {
    it('renders textarea with default props', () => {
      render(<Textarea />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Textarea label="Description" />);
      expect(screen.getByText('Description')).toBeInTheDocument();
      const textarea = screen.getByRole('textbox');
      expect(textarea).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(<Textarea helperText="Enter your message here" />);
      expect(screen.getByText('Enter your message here')).toBeInTheDocument();
    });

    it('renders with error message', () => {
      render(<Textarea error="This field is required" />);
      const error = screen.getByText('This field is required');
      expect(error).toBeInTheDocument();
      expect(error).toHaveClass('text-destructive');
    });

    it('shows required indicator when required', () => {
      render(<Textarea label="Message" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Textarea variant="default" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('border-input');
    });

    it('renders error variant', () => {
      render(<Textarea variant="error" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('border-destructive');
    });

    it('renders success variant', () => {
      render(<Textarea variant="success" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('border-green-600');
    });

    it('applies error variant when error prop is provided', () => {
      render(<Textarea error="Error message" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('border-destructive');
    });
  });

  describe('Resize Options', () => {
    it('renders with no resize', () => {
      render(<Textarea resize="none" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('resize-none');
    });

    it('renders with vertical resize', () => {
      render(<Textarea resize="vertical" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('resize-y');
    });

    it('renders with horizontal resize', () => {
      render(<Textarea resize="horizontal" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('resize-x');
    });

    it('renders with both resize', () => {
      render(<Textarea resize="both" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('resize');
    });
  });

  describe('Character Count', () => {
    it('shows character count when showCount and maxLength are provided', () => {
      render(<Textarea maxLength={100} showCount />);
      expect(screen.getByText('0/100')).toBeInTheDocument();
    });

    it('updates character count on typing', async () => {
      const user = userEvent.setup();
      render(<Textarea maxLength={100} showCount />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Hello');

      expect(screen.getByText('5/100')).toBeInTheDocument();
    });

    it('does not show count without showCount prop', () => {
      render(<Textarea maxLength={100} />);
      expect(screen.queryByText('0/100')).not.toBeInTheDocument();
    });

    it('does not show count without maxLength prop', () => {
      render(<Textarea showCount />);
      expect(screen.queryByText(/\d+\/\d+/)).not.toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('handles text input', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Textarea onChange={handleChange} />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Hello World');

      expect(handleChange).toHaveBeenCalled();
      expect(textarea).toHaveValue('Hello World');
    });

    it('respects maxLength', async () => {
      const user = userEvent.setup();
      render(<Textarea maxLength={5} />);

      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      await user.type(textarea, 'Hello World');

      expect(textarea.value.length).toBeLessThanOrEqual(5);
    });

    it('handles disabled state', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Textarea disabled onChange={handleChange} />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Test');

      expect(handleChange).not.toHaveBeenCalled();
      expect(textarea).toBeDisabled();
    });

    it('handles placeholder', () => {
      render(<Textarea placeholder="Enter text here..." />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('placeholder', 'Enter text here...');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Textarea label="Message" helperText="Helper text" />);
      const textarea = screen.getByRole('textbox');

      expect(textarea).toHaveAccessibleName('Message');
      expect(textarea).toHaveAttribute('aria-describedby');
    });

    it('sets aria-invalid when error is present', () => {
      render(<Textarea error="Error message" />);
      const textarea = screen.getByRole('textbox');

      expect(textarea).toHaveAttribute('aria-invalid', 'true');
    });

    it('associates label with textarea', () => {
      render(<Textarea label="Comment" id="comment" />);
      const label = screen.getByText('Comment');
      const textarea = screen.getByRole('textbox');

      expect(label).toHaveAttribute('for', 'comment');
      expect(textarea).toHaveAttribute('id', 'comment');
    });

    it('has proper disabled state styling', () => {
      render(<Textarea disabled />);
      const textarea = screen.getByRole('textbox');

      expect(textarea).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50');
      expect(textarea).toBeDisabled();
    });
  });

  describe('Edge Cases', () => {
    it('applies custom className', () => {
      render(<Textarea className="custom-class" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLTextAreaElement>();
      render(<Textarea ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    });

    it('renders with combined props', () => {
      render(
        <Textarea
          variant="success"
          resize="none"
          label="Feedback"
          helperText="Share your thoughts"
          maxLength={200}
          showCount
          required
        />
      );

      expect(screen.getByText('Feedback')).toBeInTheDocument();
      expect(screen.getByText('Share your thoughts')).toBeInTheDocument();
      expect(screen.getByText('0/200')).toBeInTheDocument();
      expect(screen.getByText('*')).toBeInTheDocument();

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('border-green-600', 'resize-none');
    });

    it('displays error instead of helper text when both provided', () => {
      render(<Textarea error="Error occurred" helperText="This should not show" />);

      expect(screen.getByText('Error occurred')).toBeInTheDocument();
      expect(screen.queryByText('This should not show')).not.toBeInTheDocument();
    });

    it('handles controlled value', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { rerender } = render(<Textarea value="" onChange={handleChange} />);

      let textarea = screen.getByRole('textbox');
      expect(textarea).toHaveValue('');

      await user.type(textarea, 'Test');
      expect(handleChange).toHaveBeenCalled();

      rerender(<Textarea value="Test" onChange={handleChange} />);
      textarea = screen.getByRole('textbox');
      expect(textarea).toHaveValue('Test');
    });
  });
});
