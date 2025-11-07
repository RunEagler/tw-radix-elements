# Calendar Component

A fully-featured, accessible calendar component built with React 19 and Tailwind CSS.

## Features

- **Single Date Selection**: Select a single date
- **Range Selection**: Select a date range with start and end dates
- **Keyboard Navigation**: Fully accessible with keyboard support
- **Customizable Styling**: Multiple size variants and CVA-based styling
- **Disabled Dates**: Support for custom disabled date logic, min/max dates
- **Month Navigation**: Navigate between months with arrow buttons
- **Today Highlighting**: Current date is visually highlighted
- **Outside Days**: Show/hide days from adjacent months
- **TypeScript Support**: Full type definitions included

## Installation

The Calendar component is part of the `@sample-ui-gallery/ui-components` package.

```tsx
import { Calendar } from "@sample-ui-gallery/tw-radix-elements";
```

## Usage

### Basic Single Selection

```tsx
import { useState } from "react";
import { Calendar } from "@sample-ui-gallery/tw-radix-elements";

function MyComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return <Calendar selected={date} onSelect={setDate} />;
}
```

### Range Selection

```tsx
import { useState } from "react";
import { Calendar, type DateRange } from "@sample-ui-gallery/tw-radix-elements";

function MyComponent() {
  const [range, setRange] = useState<DateRange>({
    from: null,
    to: null,
  });

  return (
    <Calendar
      mode="range"
      selectedRange={range}
      onRangeSelect={setRange}
    />
  );
}
```

### With Disabled Dates

```tsx
import { Calendar } from "@sample-ui-gallery/tw-radix-elements";

// Disable weekends
function disableWeekends(date: Date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

function MyComponent() {
  return <Calendar disabled={disableWeekends} />;
}
```

### With Min/Max Dates

```tsx
import { Calendar } from "@sample-ui-gallery/tw-radix-elements";

function MyComponent() {
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  return (
    <Calendar
      minDate={minDate}
      maxDate={maxDate}
    />
  );
}
```

### Different Sizes

```tsx
import { Calendar } from "@sample-ui-gallery/tw-radix-elements";

function MyComponent() {
  return (
    <>
      <Calendar size="sm" />
      <Calendar size="default" />
      <Calendar size="lg" />
    </>
  );
}
```

## Props

### CalendarProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selected` | `Date` | `undefined` | Currently selected date (single selection mode) |
| `selectedRange` | `DateRange` | `undefined` | Currently selected date range (range selection mode) |
| `mode` | `"single" \| "range"` | `"single"` | Selection mode |
| `onSelect` | `(date: Date) => void` | `undefined` | Callback when a date is selected (single mode) |
| `onRangeSelect` | `(range: DateRange) => void` | `undefined` | Callback when a date range is selected (range mode) |
| `disabled` | `(date: Date) => boolean` | `undefined` | Function to determine if a date should be disabled |
| `minDate` | `Date` | `undefined` | Minimum selectable date |
| `maxDate` | `Date` | `undefined` | Maximum selectable date |
| `defaultMonth` | `Date` | Current date | Initial month to display |
| `showOutsideDays` | `boolean` | `true` | Show days from previous/next months |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Size variant |
| `className` | `string` | `undefined` | Additional CSS classes |

### DateRange

```tsx
interface DateRange {
  from: Date | null;
  to: Date | null;
}
```

## Accessibility

The Calendar component follows WAI-ARIA best practices:

- Proper ARIA labels for all interactive elements
- `role="grid"` for the calendar grid
- `aria-pressed` for selected dates
- Keyboard navigation support
- Focus management
- Screen reader announcements

## Styling

The component uses Tailwind CSS for styling and `class-variance-authority` (CVA) for variant management. You can customize the appearance by:

1. Passing a `className` prop
2. Modifying the CVA variants in `Calendar.tsx`
3. Overriding Tailwind classes

## Examples

See the Ladle stories for more examples:

```bash
pnpm ladle
```

Then navigate to the Calendar stories in the UI.

## Testing

Tests are written with Vitest and React Testing Library. To run tests:

```bash
pnpm test
```

## License

MIT
