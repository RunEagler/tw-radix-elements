import { cn } from '@ui/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const toggleVariants = cva(
  'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
        success: 'data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-input',
        destructive: 'data-[state=checked]:bg-destructive data-[state=unchecked]:bg-input',
      },
      size: {
        sm: 'h-5 w-9',
        default: 'h-6 w-11',
        lg: 'h-7 w-14',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const toggleThumbVariants = cva(
  'pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform',
  {
    variants: {
      size: {
        sm: 'h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
        default: 'h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
        lg: 'h-6 w-6 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface ToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>,
    VariantProps<typeof toggleVariants> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      variant,
      size,
      checked = false,
      onCheckedChange,
      disabled,
      label,
      description,
      id,
      ...props
    },
    ref
  ) => {
    const toggleId = id;
    const descriptionId = `${toggleId}-description`;
    const [isChecked, setIsChecked] = React.useState(checked);

    React.useEffect(() => {
      setIsChecked(checked);
    }, [checked]);

    const handleClick = () => {
      if (disabled) return;
      const newChecked = !isChecked;
      setIsChecked(newChecked);
      onCheckedChange?.(newChecked);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleClick();
      }
    };

    if (label) {
      return (
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 space-y-0.5">
            <label htmlFor={toggleId} className="text-sm font-medium leading-none cursor-pointer">
              {label}
            </label>
            {description && (
              <p id={descriptionId} className="text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          <button
            ref={ref}
            id={toggleId}
            type="button"
            role="switch"
            aria-checked={isChecked}
            aria-describedby={description ? descriptionId : undefined}
            data-state={isChecked ? 'checked' : 'unchecked'}
            disabled={disabled}
            className={cn(toggleVariants({ variant, size }), className)}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            {...props}
          >
            <span
              data-state={isChecked ? 'checked' : 'unchecked'}
              className={cn(toggleThumbVariants({ size }))}
            />
          </button>
        </div>
      );
    }

    return (
      <button
        ref={ref}
        id={toggleId}
        type="button"
        role="switch"
        aria-checked={isChecked}
        data-state={isChecked ? 'checked' : 'unchecked'}
        disabled={disabled}
        className={cn(toggleVariants({ variant, size }), className)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        <span
          data-state={isChecked ? 'checked' : 'unchecked'}
          className={cn(toggleThumbVariants({ size }))}
        />
      </button>
    );
  }
);
Toggle.displayName = 'Toggle';

export { Toggle, toggleThumbVariants, toggleVariants };
