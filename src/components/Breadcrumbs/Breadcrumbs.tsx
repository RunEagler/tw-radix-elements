import { cn } from '@ui/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const breadcrumbsVariants = cva('flex items-center flex-wrap text-sm', {
  variants: {
    size: {
      sm: 'text-xs gap-1',
      default: 'text-sm gap-2',
      lg: 'text-base gap-3',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const breadcrumbItemVariants = cva('inline-flex items-center gap-2', {
  variants: {
    active: {
      true: 'text-foreground font-medium',
      false: 'text-muted-foreground hover:text-foreground transition-colors',
    },
  },
  defaultVariants: {
    active: false,
  },
});

const breadcrumbSeparatorVariants = cva('text-muted-foreground select-none', {
  variants: {
    size: {
      sm: 'text-xs',
      default: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbsProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof breadcrumbsVariants> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  itemsBeforeCollapse?: number;
  itemsAfterCollapse?: number;
}

const BreadcrumbSeparator = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof breadcrumbSeparatorVariants>
>(({ className, size, children, ...props }, ref) => (
  <span
    ref={ref}
    role="presentation"
    aria-hidden="true"
    className={cn(breadcrumbSeparatorVariants({ size, className }))}
    {...props}
  >
    {children || '/'}
  </span>
));
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      className,
      size,
      items,
      separator,
      maxItems,
      itemsBeforeCollapse = 1,
      itemsAfterCollapse = 1,
      ...props
    },
    ref
  ) => {
    const renderItems = React.useMemo(() => {
      if (!maxItems || items.length <= maxItems) {
        return items;
      }

      const collapsedItems: (BreadcrumbItem | { collapsed: true })[] = [
        ...items.slice(0, itemsBeforeCollapse),
        { collapsed: true },
        ...items.slice(items.length - itemsAfterCollapse),
      ];

      return collapsedItems;
    }, [items, maxItems, itemsBeforeCollapse, itemsAfterCollapse]);

    return (
      <nav
        ref={ref}
        aria-label="パンくずリスト"
        className={cn(breadcrumbsVariants({ size, className }))}
        {...props}
      >
        <ol className="flex items-center flex-wrap gap-2">
          {renderItems.map((item, index) => {
            const isLast = index === renderItems.length - 1;

            if ('collapsed' in item) {
              return (
                <React.Fragment key="breadcrumb-collapsed">
                  <li className={cn(breadcrumbItemVariants({ active: false }))}>
                    <span className="cursor-default">...</span>
                  </li>
                  {!isLast && <BreadcrumbSeparator size={size}>{separator}</BreadcrumbSeparator>}
                </React.Fragment>
              );
            }

            const isActive = isLast;
            const itemKey = item.href ? `${item.label}-${item.href}` : item.label;

            return (
              <React.Fragment key={itemKey}>
                <li>
                  {item.href && !isActive ? (
                    <a
                      href={item.href}
                      className={cn(breadcrumbItemVariants({ active: false }))}
                      onClick={e => {
                        if (item.onClick) {
                          e.preventDefault();
                          item.onClick();
                        }
                      }}
                    >
                      {item.label}
                    </a>
                  ) : item.onClick && !isActive ? (
                    <button
                      type="button"
                      className={cn(breadcrumbItemVariants({ active: false }))}
                      onClick={item.onClick}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <span className={cn(breadcrumbItemVariants({ active: isActive }))}>
                      {item.label}
                    </span>
                  )}
                </li>
                {!isLast && <BreadcrumbSeparator size={size}>{separator}</BreadcrumbSeparator>}
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    );
  }
);
Breadcrumbs.displayName = 'Breadcrumbs';

export { Breadcrumbs, BreadcrumbSeparator };
