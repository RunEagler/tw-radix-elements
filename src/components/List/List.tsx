import { cn } from '@ui/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const listVariants = cva('space-y-0', {
  variants: {
    variant: {
      default: '',
      bordered: 'border border-border rounded-lg divide-y divide-border',
      separated: 'space-y-2',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const listItemVariants = cva('flex items-start gap-3 p-3 transition-colors', {
  variants: {
    variant: {
      default: '',
      bordered: '',
      separated: 'rounded-lg border border-border',
    },
    hoverable: {
      true: 'hover:bg-accent cursor-pointer',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    hoverable: false,
  },
});

export interface ListProps
  extends React.HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof listVariants> {}

export interface ListItemProps
  extends React.HTMLAttributes<HTMLLIElement>,
    VariantProps<typeof listItemVariants> {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
}

const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <ul ref={ref} className={cn(listVariants({ variant }), className)} {...props}>
        {children}
      </ul>
    );
  }
);
List.displayName = 'List';

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, variant, hoverable, icon, title, description, children, ...props }, ref) => {
    return (
      <li ref={ref} className={cn(listItemVariants({ variant, hoverable }), className)} {...props}>
        {icon && <div className="flex-shrink-0 mt-0.5">{icon}</div>}
        <div className="flex-1 min-w-0">
          {title && <div className="font-medium text-foreground">{title}</div>}
          {description && <div className="text-sm text-muted-foreground mt-0.5">{description}</div>}
          {children}
        </div>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';

export { List, ListItem, listItemVariants, listVariants };
