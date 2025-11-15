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

const progressBarVariants = cva('h-full w-full flex-1 transition-all duration-300 ease-out', {
  variants: {
    variant: {
      default: 'bg-primary',
      success: 'bg-green-600',
      warning: 'bg-yellow-500',
      error: 'bg-destructive',
    },
    striped: {
      true:
        'bg-gradient-to-r from-transparent to-transparent bg-[linear-gradient(135deg,rgba(255,255,255,0.4)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.4)_50%,rgba(255,255,255,0.4)_75%,transparent_75%,transparent)] ' +
        'bg-[length:16px_16px] animate-[shimmer_10s_linear_infinite]',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    striped: false,
  },
});

export interface ProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'value'>,
    VariantProps<typeof progressVariants> {
  value?: number;
  max?: number;
  label?: string;
  striped?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, size, variant, label, striped = false, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    return (
      <div className="w-full space-y-2">
        {label && (
          <div className="flex justify-between text-sm">
            <span className="font-medium text-foreground">{label}</span>
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
                striped: striped || undefined,
              })
            )}
            style={{ width: mounted ? `${percentage}%` : '0%' }}
          />
        </div>
      </div>
    );
  }
);
Progress.displayName = 'Progress';

export { Progress, progressBarVariants, progressVariants };
