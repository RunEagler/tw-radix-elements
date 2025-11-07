import { cn } from '@ui/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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

const calendarVariants = cva('p-4 bg-background rounded-lg border', {
  variants: {
    size: {
      default: 'w-full max-w-md',
      sm: 'w-full max-w-sm text-sm',
      lg: 'w-full max-w-lg text-base',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const dayVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'hover:bg-accent hover:text-accent-foreground',
        selected: 'bg-primary text-primary-foreground hover:bg-primary/90',
        today: 'border-2 border-primary',
        range: 'bg-accent text-accent-foreground hover:bg-accent/80 rounded-none',
        rangeStart: 'bg-primary text-primary-foreground rounded-r-none',
        rangeEnd: 'bg-primary text-primary-foreground rounded-l-none',
      },
      size: {
        default: 'h-9 w-9',
        sm: 'h-8 w-8 text-xs',
        lg: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

export interface CalendarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>,
    VariantProps<typeof calendarVariants> {
  /** Currently selected date (for single selection mode) */
  selected?: Date;
  /** Currently selected date range (for range selection mode) */
  selectedRange?: DateRange;
  /** Selection mode */
  mode?: 'single' | 'range';
  /** Callback when a date is selected */
  onSelect?: (date: Date) => void;
  /** Callback when a date range is selected */
  onRangeSelect?: (range: DateRange) => void;
  /** Disabled dates */
  disabled?: (date: Date) => boolean;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Initial month to display */
  defaultMonth?: Date;
  /** Show outside days from previous/next months */
  showOutsideDays?: boolean;
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      className,
      size,
      selected,
      selectedRange,
      mode = 'single',
      onSelect,
      onRangeSelect,
      disabled,
      minDate,
      maxDate,
      defaultMonth,
      showOutsideDays = true,
      ...props
    },
    ref
  ) => {
    const [currentMonth, setCurrentMonth] = React.useState(defaultMonth || selected || new Date());

    const today = React.useMemo(() => {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      return now;
    }, []);

    const getDaysInMonth = (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      return new Date(year, month, 1).getDay();
    };

    const isSameDay = (date1: Date, date2: Date) => {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    };

    const isDateDisabled = (date: Date) => {
      if (disabled?.(date)) return true;
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      return false;
    };

    const isInRange = (date: Date, range: DateRange | undefined) => {
      if (!range || !range.from || !range.to) return false;
      return date >= range.from && date <= range.to;
    };

    const isRangeStart = (date: Date, range: DateRange | undefined) => {
      if (!range || !range.from) return false;
      return isSameDay(date, range.from);
    };

    const isRangeEnd = (date: Date, range: DateRange | undefined) => {
      if (!range || !range.to) return false;
      return isSameDay(date, range.to);
    };

    const getDayVariant = (date: Date): VariantProps<typeof dayVariants>['variant'] => {
      if (mode === 'range' && selectedRange) {
        if (isRangeStart(date, selectedRange)) return 'rangeStart';
        if (isRangeEnd(date, selectedRange)) return 'rangeEnd';
        if (isInRange(date, selectedRange)) return 'range';
      }

      if (mode === 'single' && selected && isSameDay(date, selected)) {
        return 'selected';
      }

      if (isSameDay(date, today)) return 'today';

      return 'default';
    };

    const handleDateClick = (date: Date) => {
      if (isDateDisabled(date)) return;

      if (mode === 'single' && onSelect) {
        onSelect(date);
      } else if (mode === 'range' && onRangeSelect) {
        if (!selectedRange?.from || (selectedRange.from && selectedRange.to)) {
          // Start new range
          onRangeSelect({ from: date, to: null });
        } else {
          // Complete range
          if (date < selectedRange.from) {
            onRangeSelect({ from: date, to: selectedRange.from });
          } else {
            onRangeSelect({ from: selectedRange.from, to: date });
          }
        }
      }
    };

    const handlePreviousMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleNextMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const renderCalendarDays = () => {
      const daysInMonth = getDaysInMonth(currentMonth);
      const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
      const days: React.ReactElement[] = [];

      // Previous month's days
      if (showOutsideDays) {
        const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
        const daysInPrevMonth = getDaysInMonth(prevMonth);
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
          const day = daysInPrevMonth - i;
          const date = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), day);
          days.push(
            <button
              key={`prev-${day}`}
              type="button"
              onClick={() => handleDateClick(date)}
              disabled={isDateDisabled(date)}
              className={cn(
                dayVariants({ variant: getDayVariant(date), size }),
                'text-muted-foreground'
              )}
              aria-label={`${MONTHS[prevMonth.getMonth()]} ${day}, ${prevMonth.getFullYear()}`}
            >
              {day}
            </button>
          );
        }
      } else {
        for (let i = 0; i < firstDayOfMonth; i++) {
          days.push(<div key={`empty-${i}`} className="h-9 w-9" />);
        }
      }

      // Current month's days
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        days.push(
          <button
            key={`current-${day}`}
            type="button"
            onClick={() => handleDateClick(date)}
            disabled={isDateDisabled(date)}
            className={cn(dayVariants({ variant: getDayVariant(date), size }))}
            aria-label={`${MONTHS[currentMonth.getMonth()]} ${day}, ${currentMonth.getFullYear()}`}
            aria-pressed={mode === 'single' && selected ? isSameDay(date, selected) : undefined}
          >
            {day}
          </button>
        );
      }

      // Next month's days
      if (showOutsideDays) {
        const remainingDays = 42 - days.length; // 6 weeks * 7 days
        const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
        for (let day = 1; day <= remainingDays; day++) {
          const date = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), day);
          days.push(
            <button
              key={`next-${day}`}
              type="button"
              onClick={() => handleDateClick(date)}
              disabled={isDateDisabled(date)}
              className={cn(
                dayVariants({ variant: getDayVariant(date), size }),
                'text-muted-foreground'
              )}
              aria-label={`${MONTHS[nextMonth.getMonth()]} ${day}, ${nextMonth.getFullYear()}`}
            >
              {day}
            </button>
          );
        }
      }

      return days;
    };

    return (
      <div ref={ref} className={cn(calendarVariants({ size, className }))} {...props}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={handlePreviousMonth}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-9 w-9"
            aria-label="Previous month"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <div className="text-sm font-semibold">
            {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </div>
          <button
            type="button"
            onClick={handleNextMonth}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-9 w-9"
            aria-label="Next month"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS_OF_WEEK.map(day => (
            <div
              key={day}
              className="text-center text-xs font-medium text-muted-foreground h-9 flex items-center justify-center"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
      </div>
    );
  }
);

Calendar.displayName = 'Calendar';

export { Calendar, calendarVariants, dayVariants };
