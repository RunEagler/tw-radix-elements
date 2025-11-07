import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Calendar } from './Calendar';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

describe('Calendar', () => {
  describe('Single Selection Mode', () => {
    it('renders the current month by default', () => {
      render(<Calendar />);
      const today = new Date();
      const monthYear = `${MONTHS[today.getMonth()]} ${today.getFullYear()}`;
      expect(screen.getByText(monthYear)).toBeInTheDocument();
    });

    it('renders all days of the week', () => {
      render(<Calendar />);
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      daysOfWeek.forEach(day => {
        expect(screen.getByText(day)).toBeInTheDocument();
      });
    });

    it('calls onSelect when a date is clicked', () => {
      const handleSelect = vi.fn();
      const defaultMonth = new Date(2024, 0, 1);
      render(<Calendar onSelect={handleSelect} defaultMonth={defaultMonth} />);

      // Find a date button for January 15
      const dateButton = screen.getByLabelText('January 15, 2024');
      fireEvent.click(dateButton);

      expect(handleSelect).toHaveBeenCalledTimes(1);
      expect(handleSelect).toHaveBeenCalledWith(expect.any(Date));

      const calledDate = handleSelect.mock.calls[0][0] as Date;
      expect(calledDate.getDate()).toBe(15);
    });

    it('highlights the selected date', () => {
      const selectedDate = new Date(2024, 0, 15);
      render(<Calendar selected={selectedDate} defaultMonth={selectedDate} />);

      const dateButton = screen.getByLabelText('January 15, 2024');
      expect(dateButton).toHaveAttribute('aria-pressed', 'true');
    });

    it('disables dates based on disabled prop', () => {
      const defaultMonth = new Date(2024, 0, 1);

      const disableWeekends = (date: Date): boolean => {
        const day = date.getDay();
        return day === 0 || day === 6;
      };

      render(<Calendar disabled={disableWeekends} defaultMonth={defaultMonth} />);

      // January 6, 2024 is a Saturday
      const saturdayButton = screen.getByLabelText('January 6, 2024');
      expect(saturdayButton).toBeDisabled();

      // January 7, 2024 is a Sunday
      const sundayButton = screen.getByLabelText('January 7, 2024');
      expect(sundayButton).toBeDisabled();

      // January 8, 2024 is a Monday (should not be disabled)
      const mondayButton = screen.getByLabelText('January 8, 2024');
      expect(mondayButton).not.toBeDisabled();
    });

    it('disables dates before minDate', () => {
      const minDate = new Date(2024, 0, 15);
      render(<Calendar minDate={minDate} defaultMonth={minDate} />);

      const beforeMinButton = screen.getByLabelText('January 10, 2024');
      expect(beforeMinButton).toBeDisabled();

      const afterMinButton = screen.getByLabelText('January 20, 2024');
      expect(afterMinButton).not.toBeDisabled();
    });

    it('disables dates after maxDate', () => {
      const maxDate = new Date(2024, 0, 15);
      render(<Calendar maxDate={maxDate} defaultMonth={maxDate} />);

      const afterMaxButton = screen.getByLabelText('January 20, 2024');
      expect(afterMaxButton).toBeDisabled();

      const beforeMaxButton = screen.getByLabelText('January 10, 2024');
      expect(beforeMaxButton).not.toBeDisabled();
    });
  });

  describe('Range Selection Mode', () => {
    it('calls onRangeSelect with from date on first click', () => {
      const handleRangeSelect = vi.fn();
      const defaultMonth = new Date(2024, 0, 1);
      render(
        <Calendar mode="range" onRangeSelect={handleRangeSelect} defaultMonth={defaultMonth} />
      );

      const dateButton = screen.getByLabelText('January 15, 2024');
      fireEvent.click(dateButton);

      expect(handleRangeSelect).toHaveBeenCalledWith({
        from: expect.any(Date),
        to: null,
      });
    });

    it('calls onRangeSelect with complete range on second click', () => {
      const handleRangeSelect = vi.fn();
      const selectedRange = {
        from: new Date(2024, 0, 10),
        to: null,
      };

      render(
        <Calendar
          mode="range"
          selectedRange={selectedRange}
          onRangeSelect={handleRangeSelect}
          defaultMonth={new Date(2024, 0, 1)}
        />
      );

      const dateButton = screen.getByLabelText('January 15, 2024');
      fireEvent.click(dateButton);

      expect(handleRangeSelect).toHaveBeenCalledWith({
        from: selectedRange.from,
        to: expect.any(Date),
      });
    });

    it('reverses range if end date is before start date', () => {
      const handleRangeSelect = vi.fn();
      const selectedRange = {
        from: new Date(2024, 0, 20),
        to: null,
      };

      render(
        <Calendar
          mode="range"
          selectedRange={selectedRange}
          onRangeSelect={handleRangeSelect}
          defaultMonth={new Date(2024, 0, 1)}
        />
      );

      const dateButton = screen.getByLabelText('January 10, 2024');
      fireEvent.click(dateButton);

      expect(handleRangeSelect).toHaveBeenCalledWith({
        from: expect.any(Date),
        to: selectedRange.from,
      });
    });
  });

  describe('Navigation', () => {
    it('navigates to previous month', () => {
      render(<Calendar defaultMonth={new Date(2024, 1, 1)} />);

      expect(screen.getByText('February 2024')).toBeInTheDocument();

      const prevButton = screen.getByLabelText('Previous month');
      fireEvent.click(prevButton);

      expect(screen.getByText('January 2024')).toBeInTheDocument();
    });

    it('navigates to next month', () => {
      render(<Calendar defaultMonth={new Date(2024, 0, 1)} />);

      expect(screen.getByText('January 2024')).toBeInTheDocument();

      const nextButton = screen.getByLabelText('Next month');
      fireEvent.click(nextButton);

      expect(screen.getByText('February 2024')).toBeInTheDocument();
    });
  });

  describe('Outside Days', () => {
    it('shows outside days by default', () => {
      render(<Calendar defaultMonth={new Date(2024, 0, 1)} />);

      const allButtons = screen.getAllByRole('button');
      const dateButtons = allButtons.filter((btn: HTMLElement): boolean => {
        const label = btn.getAttribute('aria-label');
        return label?.includes('January')!;
      });

      // Should have more than 31 buttons (includes prev/next month days)
      expect(dateButtons.length).toBeGreaterThan(31);
    });

    it('hides outside days when showOutsideDays is false', () => {
      render(<Calendar showOutsideDays={false} defaultMonth={new Date(2024, 0, 1)} />);

      const allButtons = screen.getAllByRole('button');
      const januaryButtons = allButtons.filter((btn: HTMLElement): boolean => {
        const label = btn.getAttribute('aria-label');
        // return label !== null && label.includes('January');
        return label?.includes('January')!;
      });

      // Should have exactly 31 buttons for January
      expect(januaryButtons.length).toBe(31);
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels for navigation buttons', () => {
      render(<Calendar />);

      expect(screen.getByLabelText('Previous month')).toBeInTheDocument();
      expect(screen.getByLabelText('Next month')).toBeInTheDocument();
    });

    it('has proper ARIA labels for date buttons', () => {
      render(<Calendar defaultMonth={new Date(2024, 0, 1)} />);

      const dateButton = screen.getByLabelText('January 15, 2024');
      expect(dateButton).toBeInTheDocument();
    });

    it('has role=grid for calendar grid', () => {
      const { container } = render(<Calendar />);

      const grid = container.querySelector('[role="grid"]');
      expect(grid).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('applies size variant classes', () => {
      const { container: smallContainer } = render(<Calendar size="sm" />);
      const smallChild = smallContainer.firstChild as HTMLElement;
      expect(smallChild.className).toContain('max-w-sm');

      const { container: defaultContainer } = render(<Calendar />);
      const defaultChild = defaultContainer.firstChild as HTMLElement;
      expect(defaultChild.className).toContain('max-w-md');

      const { container: largeContainer } = render(<Calendar size="lg" />);
      const largeChild = largeContainer.firstChild as HTMLElement;
      expect(largeChild.className).toContain('max-w-lg');
    });
  });

  describe('Custom Default Month', () => {
    it('displays the custom default month', () => {
      const defaultMonth = new Date(2025, 11, 1); // December 2025
      render(<Calendar defaultMonth={defaultMonth} />);

      expect(screen.getByText('December 2025')).toBeInTheDocument();
    });
  });
});
