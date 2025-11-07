import { cn } from '@ui/lib/utils';
import { withRipple } from '@ui/hoc/withRipple';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const cardVariants = cva(
  ' border bg-card text-card-foreground transition-all duration-200 ease-in-out',
  {
    variants: {
      variant: {
        default: 'border-border shadow-sm',
        elevated: 'border-border shadow-md hover:shadow-lg',
        outlined: 'border-2 border-border',
        ghost: 'border-transparent',
      },
      padding: {
        none: '',
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
      },
      hover: {
        none: '',
        lift: 'hover:-translate-y-1 hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800/50',
        glow: 'hover:shadow-xl hover:shadow-primary/20 hover:bg-gray-50 dark:hover:bg-gray-800/30',
        border: 'hover:border-primary hover:bg-gray-100 dark:hover:bg-gray-800/40',
        scale: 'hover:scale-[1.02] hover:bg-gray-100 dark:hover:bg-gray-800/50',
      },
      interactive: {
        true: 'cursor-pointer',
        false: '',
      },
      round: {
        true: 'rounded-lg',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'default',
      hover: 'none',
      interactive: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  ripple?: boolean;
  round?: boolean;
  onHoverChange?: (isHovered: boolean) => void;
}

const BaseCard = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant, padding, hover, interactive, onHoverChange, round = true, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, hover, interactive, className, round }))}
        {...props}
      />
    );
  }
);

const RippleCard = withRipple(BaseCard);

// Main Button component that conditionally uses ripple
const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { ripple = false, ...restProps } = props;

  if (ripple) {
    return <RippleCard ref={ref} {...restProps} rippleColor={'black'} />;
  }

  return <BaseCard ref={ref} {...restProps} />;
});
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn(className)} {...props} />
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, cardVariants };
