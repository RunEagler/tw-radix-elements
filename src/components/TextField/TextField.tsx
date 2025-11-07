import { cn } from '@ui/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const textFieldVariants = cva(
  'flex w-full rounded-md border bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
  {
    variants: {
      variant: {
        default: 'border-input',
        filled: 'border-transparent bg-muted',
        ghost: 'border-transparent bg-transparent hover:bg-accent',
      },
      size: {
        sm: 'h-8 px-2 py-1 text-xs',
        default: 'h-10 px-3 py-2',
        lg: 'h-12 px-4 py-3 text-base',
      },
      state: {
        default: '',
        error: 'border-destructive focus-visible:ring-destructive',
        success: 'border-green-600 focus-visible:ring-green-600',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      state: 'default',
    },
  }
);

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof textFieldVariants> {
  label?: string;
  description?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      variant,
      size,
      state,
      label,
      description,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      required,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const fieldId = id || generatedId;
    const computedState = error ? 'error' : state;
    const descriptionId = `${fieldId}-description`;
    const hasDescription = description || error || helperText;

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={fieldId}
            className={cn(
              'block text-sm font-medium leading-none',
              error ? 'text-destructive' : 'text-foreground',
              props.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {label}
            {required && <span className="ml-1 text-destructive">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={fieldId}
            className={cn(
              textFieldVariants({ variant, size, state: computedState }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={hasDescription ? descriptionId : undefined}
            aria-required={required}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>

        {hasDescription && (
          <p
            id={descriptionId}
            className={cn('text-sm', error ? 'text-destructive' : 'text-muted-foreground')}
          >
            {error || helperText || description}
          </p>
        )}
      </div>
    );
  }
);
TextField.displayName = 'TextField';

export { TextField, textFieldVariants };
