import { cn } from '@ui/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const progressVariants = cva('relative h-4 w-full overflow-hidden rounded-full bg-secondary', {
  variants: {
    size: {
      sm: 'h-2',
      default: 'h-4',
      lg: 'h-6',
    },
    variant: {
      default: '',
      success: '',
      warning: '',
      error: '',
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
});

const progressBarVariants = cva('h-full w-full flex-1 transition-all duration-300 ease-in-out', {
  variants: {
    variant: {
      default: 'bg-primary',
      success: 'bg-green-600',
      warning: 'bg-yellow-500',
      error: 'bg-destructive',
    },
    animated: {
      true: 'animate-pulse',
      false: '',
    },
    striped: {
      true: 'bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] animate-[shimmer_2s_infinite]',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    animated: false,
    striped: false,
  },
});

export interface ProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'value'>,
    VariantProps<typeof progressVariants> {
  value?: number;
  max?: number;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  striped?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      size,
      variant,
      showLabel = false,
      label,
      animated = false,
      striped = false,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div className="w-full space-y-2">
        {(showLabel || label) && (
          <div className="flex justify-between text-sm">
            <span className="text-foreground font-medium">{label || 'Progress'}</span>
            <span className="text-muted-foreground">{percentage.toFixed(0)}%</span>
          </div>
        )}
        <div
          ref={ref}
          className={cn(progressVariants({ size, variant }), className)}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-label={label || 'Progress'}
          {...props}
        >
          <div
            className={cn(
              progressBarVariants({
                variant,
                animated: animated || undefined,
                striped: striped || undefined,
              })
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);
Progress.displayName = 'Progress';

export { Progress, progressBarVariants, progressVariants };
