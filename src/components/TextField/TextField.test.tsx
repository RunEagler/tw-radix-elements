import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Mail, Search } from 'lucide-react';
import { useId } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { TextField } from './TextField';

describe('TextField', () => {
  describe('Rendering', () => {
    it('renders text field with default props', () => {
      render(<TextField />);
      const textField = screen.getByRole('textbox');
      expect(textField).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<TextField label="Email address" />);
      const label = screen.getByText('Email address');
      const textField = screen.getByRole('textbox');
      expect(label).toBeInTheDocument();
      expect(textField).toHaveAccessibleName('Email address');
    });

    it('renders with description', () => {
      render(<TextField label="Username" description="Choose a unique username" />);
      expect(screen.getByText('Choose a unique username')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(<TextField label="Password" helperText="Must be at least 8 characters" />);
      expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument();
    });

    it('renders with error message', () => {
      render(<TextField label="Email" error="Invalid email address" />);
      const errorMessage = screen.getByText('Invalid email address');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveClass('text-destructive');
    });

    it('renders with required indicator', () => {
      render(<TextField label="Full name" required />);
      const requiredIndicator = screen.getByText('*');
      expect(requiredIndicator).toBeInTheDocument();
      expect(requiredIndicator).toHaveClass('text-destructive');
    });

    it('renders with left icon', () => {
      render(<TextField leftIcon={<Mail data-testid="mail-icon" />} />);
      expect(screen.getByTestId('mail-icon')).toBeInTheDocument();
    });

    it('renders with right icon', () => {
      render(<TextField rightIcon={<Search data-testid="search-icon" />} />);
      expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    });

    it('renders with both left and right icons', () => {
      render(
        <TextField
          leftIcon={<Mail data-testid="left-icon" />}
          rightIcon={<Search data-testid="right-icon" />}
        />
      );
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<TextField variant="default" />);
      const textField = screen.getByRole('textbox');
      expect(textField).toHaveClass('border-input');
    });

    it('renders filled variant', () => {
      render(<TextField variant="filled" />);
      const textField = screen.getByRole('textbox');
      expect(textField).toHaveClass('bg-muted');
    });

    it('renders ghost variant', () => {
      render(<TextField variant="ghost" />);
      const textField = screen.getByRole('textbox');
      expect(textField).toHaveClass('bg-transparent');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<TextField size="sm" />);
      const textField = screen.getByRole('textbox');
      expect(textField).toHaveClass('h-8');
    });

    it('renders default size', () => {
      render(<TextField size="default" />);
      const textField = screen.getByRole('textbox');
      expect(textField).toHaveClass('h-10');
    });

    it('renders large size', () => {
      render(<TextField size="lg" />);
      const textField = screen.getByRole('textbox');
      expect(textField).toHaveClass('h-12');
    });
  });

  describe('States', () => {
    it('renders error state', () => {
      render(<TextField error="Error message" />);
      const textField = screen.getByRole('textbox');
      expect(textField).toHaveClass('border-destructive');
    });

    it('renders success state', () => {
      render(<TextField state="success" />);
      const textField = screen.getByRole('textbox');
      expect(textField).toHaveClass('border-green-600');
    });

    it('error prop overrides state prop', () => {
      render(<TextField state="success" error="Error message" />);
      const textField = screen.getByRole('textbox');
      expect(textField).toHaveClass('border-destructive');
    });
  });

  describe('Interactions', () => {
    it('handles text input', async () => {
      const user = userEvent.setup();
      render(<TextField />);

      const textField = screen.getByRole('textbox');
      await user.type(textField, 'Hello World');

      expect(textField).toHaveValue('Hello World');
    });

    it('handles onChange event', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TextField onChange={handleChange} />);

      const textField = screen.getByRole('textbox');
      await user.type(textField, 'Test');

      expect(handleChange).toHaveBeenCalledTimes(4); // Once per character
    });

    it('handles focus and blur events', async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      render(<TextField onFocus={handleFocus} onBlur={handleBlur} />);

      const textField = screen.getByRole('textbox');
      await user.click(textField);
      expect(handleFocus).toHaveBeenCalledTimes(1);

      await user.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('does not accept input when disabled', async () => {
      const user = userEvent.setup();
      render(<TextField disabled />);

      const textField = screen.getByRole('textbox');
      await user.type(textField, 'Test');

      expect(textField).toHaveValue('');
      expect(textField).toBeDisabled();
    });

    it('handles different input types', () => {
      const { container, rerender } = render(<TextField type="email" />);
      let textField = screen.getByRole('textbox');
      expect(textField).toHaveAttribute('type', 'email');

      rerender(<TextField type="password" />);
      // Password inputs don't have role="textbox", so we query by type
      textField = container.querySelector('input[type="password"]') as HTMLInputElement;
      expect(textField).toHaveAttribute('type', 'password');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes with description', () => {
      render(<TextField label="Username" description="Enter your username" />);
      const textField = screen.getByRole('textbox');

      expect(textField).toHaveAccessibleName('Username');
      expect(textField).toHaveAttribute('aria-describedby');
    });

    it('sets aria-invalid when error is present', () => {
      render(<TextField error="Error message" />);
      const textField = screen.getByRole('textbox');

      expect(textField).toHaveAttribute('aria-invalid', 'true');
    });

    it('sets aria-required when required', () => {
      render(<TextField required />);
      const textField = screen.getByRole('textbox');

      expect(textField).toHaveAttribute('aria-required', 'true');
    });

    it('associates label with input using htmlFor', () => {
      const id: string = useId();
      render(<TextField label="Email" id={id} />);
      const label = screen.getByText('Email');
      const textField = screen.getByRole('textbox');

      expect(label).toHaveAttribute('for', 'test-email');
      expect(textField).toHaveAttribute('id', id);
    });

    it('has proper disabled state styling', () => {
      render(<TextField disabled label="Disabled field" />);
      const textField = screen.getByRole('textbox');

      expect(textField).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50');
      expect(textField).toBeDisabled();
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <TextField label="First" />
          <TextField label="Second" />
        </div>
      );

      const firstField = screen.getByLabelText('First');
      const secondField = screen.getByLabelText('Second');

      firstField.focus();
      expect(firstField).toHaveFocus();

      await user.tab();
      expect(secondField).toHaveFocus();
    });
  });

  describe('Edge Cases', () => {
    it('renders without label or description', () => {
      render(<TextField placeholder="Enter text" />);
      const textField = screen.getByPlaceholderText('Enter text');
      expect(textField).toBeInTheDocument();
    });

    it('handles controlled input', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { rerender } = render(<TextField value="" onChange={handleChange} />);

      let textField = screen.getByRole('textbox');
      expect(textField).toHaveValue('');

      await user.type(textField, 'Test');
      expect(handleChange).toHaveBeenCalled();

      rerender(<TextField value="New Value" onChange={handleChange} />);
      textField = screen.getByRole('textbox');
      expect(textField).toHaveValue('New Value');
    });

    it('applies custom className', () => {
      render(<TextField className="custom-class" />);
      const textField = screen.getByRole('textbox');
      expect(textField).toHaveClass('custom-class');
    });

    it('handles placeholder text', () => {
      render(<TextField placeholder="Enter your email" />);
      const textField = screen.getByPlaceholderText('Enter your email');
      expect(textField).toBeInTheDocument();
    });

    it('prioritizes error message over helper text', () => {
      render(<TextField helperText="Helper text" error="Error message" />);

      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });

    it('handles maxLength attribute', async () => {
      const user = userEvent.setup();
      render(<TextField maxLength={5} />);

      const textField = screen.getByRole('textbox');
      await user.type(textField, '123456789');

      expect(textField).toHaveValue('12345');
    });
  });
});
