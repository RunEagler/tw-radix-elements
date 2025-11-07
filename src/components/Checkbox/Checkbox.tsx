import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from '@ui/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check } from 'lucide-react';
import * as React from 'react';

const checkboxVariants = cva(
  'peer inline-flex shrink-0 rounded border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground transition-colors',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        default: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
      variant: {
        default: 'border-primary',
        destructive: 'border-destructive data-[state=checked]:bg-destructive',
        success: 'border-green-600 data-[state=checked]:bg-green-600',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
);

export interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, 'className'>,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  description?: string;
  className?: string;
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, size = 'default', variant, label, description, id, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;

    const checkbox = (
      <CheckboxPrimitive.Root
        ref={ref}
        id={checkboxId}
        className={cn(checkboxVariants({ size, variant, className }))}
        aria-describedby={description ? `${checkboxId}-description` : undefined}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn('grid place-items-center text-current transition-none')}
        >
          <Check
            className={cn(
              size === 'sm' && 'h-4 w-4',
              size === 'default' && 'h-5 w-5',
              size === 'lg' && 'h-6 w-6'
            )}
          />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );

    if (!label && !description) {
      return checkbox;
    }

    return (
      <div className="flex items-center space-x-3">
        {checkbox}
        <div className="grid gap-1.5 leading-none">
          {label && (
            <label
              htmlFor={checkboxId}
              className={cn(
                'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer'
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <p id={`${checkboxId}-description`} className={cn('text-sm', 'text-muted-foreground')}>
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';

export { Checkbox, checkboxVariants };
