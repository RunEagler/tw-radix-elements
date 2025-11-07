import { cn } from '@ui/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const stepsVariants = cva('flex', {
  variants: {
    orientation: {
      horizontal: 'flex-row items-center',
      vertical: 'flex-col',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

const stepVariants = cva('flex items-center', {
  variants: {
    orientation: {
      horizontal: 'flex-1',
      vertical: 'w-full',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export interface StepsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepsVariants> {
  currentStep?: number;
}

export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  status?: 'completed' | 'current' | 'upcoming';
  stepNumber?: number;
  isLast?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  ({ className, orientation = 'horizontal', currentStep = 1, children, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);

    return (
      <nav
        ref={ref}
        className={cn(stepsVariants({ orientation }), className)}
        aria-label="Progress"
        {...props}
      >
        {React.Children.map(childrenArray, (child, index) => {
          if (React.isValidElement(child)) {
            const stepNumber = index + 1;
            const status =
              stepNumber < currentStep
                ? 'completed'
                : stepNumber === currentStep
                  ? 'current'
                  : 'upcoming';

            return React.cloneElement(child as React.ReactElement<StepProps>, {
              stepNumber,
              status,
              isLast: index === childrenArray.length - 1,
              orientation: orientation || undefined,
            });
          }
          return child;
        })}
      </nav>
    );
  }
);
Steps.displayName = 'Steps';

const Step = React.forwardRef<HTMLDivElement, StepProps>(
  (
    {
      className,
      title,
      description,
      icon,
      status = 'upcoming',
      stepNumber,
      isLast,
      orientation = 'horizontal',
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn(stepVariants({ orientation }), className)} {...props}>
        <div className={cn('flex', orientation === 'vertical' ? 'gap-3' : 'items-center gap-3')}>
          {/* Step indicator */}
          <div
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
              status === 'completed' && 'border-primary bg-primary text-primary-foreground',
              status === 'current' && 'border-primary bg-background text-primary',
              status === 'upcoming' && 'border-muted bg-background text-muted-foreground'
            )}
          >
            {icon ? (
              icon
            ) : status === 'completed' ? (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <span className="text-sm font-semibold">{stepNumber}</span>
            )}
          </div>

          {/* Step content */}
          <div className={cn('flex-1', orientation === 'vertical' && 'pb-8')}>
            <div
              className={cn(
                'text-sm font-medium',
                status === 'current' ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {title}
            </div>
            {description && (
              <div className="text-sm text-muted-foreground mt-0.5">{description}</div>
            )}
          </div>
        </div>

        {/* Connector line */}
        {!isLast && (
          <div
            className={cn(
              orientation === 'horizontal' ? 'mx-2 h-0.5 flex-1' : 'ml-5 mt-2 h-full w-0.5',
              status === 'completed' ? 'bg-primary' : 'bg-muted'
            )}
          />
        )}
      </div>
    );
  }
);
Step.displayName = 'Step';

export { Step, Steps, stepVariants, stepsVariants };
