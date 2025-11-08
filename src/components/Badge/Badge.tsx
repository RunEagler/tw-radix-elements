import { cn } from '@ui/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const badgeVariants = cva(
  'absolute -top-2.5 -right-2.5 flex items-center justify-center rounded-full border-2 border-white text-xs font-semibold transition-colors origin-top-right',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        success: 'bg-green-600 text-white',
        warning: 'bg-yellow-500 text-white',
        info: 'bg-blue-500 text-white',
      },
      size: {
        sm: 'h-4 min-w-4 text-[10px] px-1',
        default: 'h-5 min-w-5 text-xs px-1.5',
        lg: 'h-6 min-w-6 text-sm px-2',
      },
      dot: {
        true: 'w-4 h-4 p-0 min-w-0 -top-1.5 -right-1.5',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      dot: false,
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  count?: number;
  /** Show only a dot without content */
  dot?: boolean;
  /** Maximum number to display before showing "99+" */
  max?: number;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, dot, count, max = 99, children, ...props }, ref) => {
    const showBadge = dot || (count !== undefined && count !== null);
    const displayContent = dot ? null : count && count > max ? `${max}+` : count;

    return (
      <div ref={ref} className="relative inline-flex">
        {children}
        {showBadge && (
          <span className={cn(badgeVariants({ variant, size, dot }), className)} {...props}>
            {displayContent}
          </span>
        )}
      </div>
    );
  }
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
