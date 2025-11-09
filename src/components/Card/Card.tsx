import { withMediaPlaceholder } from '@ui/hoc/withMediaPlaceholder';
import { withRipple } from '@ui/hoc/withRipple';
import { cn } from '@ui/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { ImageOff } from 'lucide-react';
import * as React from 'react';

/* ============================================================================
 * Card Variants
 * ========================================================================== */

const cardVariants = cva(
  'border bg-card text-card-foreground transition-[transform,box-shadow,background-color,border-color] duration-200 ease-in-out',
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
      round: true,
    },
  }
);

const cardMediaVariants = cva('relative overflow-hidden bg-muted', {
  variants: {
    aspectRatio: {
      square: 'aspect-square',
      video: 'aspect-video',
      portrait: 'aspect-[3/4]',
      wide: 'aspect-[21/9]',
      auto: '',
    },
    objectFit: {
      cover: '[&_img]:object-cover',
      contain: '[&_img]:object-contain',
      fill: '[&_img]:object-fill',
      none: '[&_img]:object-none',
    },
  },
  defaultVariants: {
    aspectRatio: 'video',
    objectFit: 'cover',
  },
});

/* ============================================================================
 * Type Definitions
 * ========================================================================== */

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  ripple?: boolean;
  round?: boolean;
  onHoverChange?: (isHovered: boolean) => void;
}

export interface CardMediaProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardMediaVariants> {
  src: string;
  alt: string;
  loading?: 'eager' | 'lazy';
  onLoad?: () => void;
  onError?: () => void;
  fallback?: React.ReactNode;
  /** Enable skeleton animation during loading */
  skeleton?: boolean;
  /** Skeleton animation variant */
  skeletonVariant?: 'pulse' | 'wave';
}

/* ============================================================================
 * Card Components
 * ========================================================================== */

const BaseCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hover, interactive, round, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding, hover, interactive, round, className }))}
      {...props}
    />
  )
);
BaseCard.displayName = 'BaseCard';

const RippleCard = withRipple(BaseCard);

const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { ripple = false, ...restProps } = props;

  if (ripple) {
    return <RippleCard ref={ref} {...restProps} rippleColor="black" />;
  }

  return <BaseCard ref={ref} {...restProps} />;
});
Card.displayName = 'Card';

/* ============================================================================
 * Card Slot Components
 * ========================================================================== */

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      data-slot="card-title"
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
  <p
    ref={ref}
    data-slot="card-description"
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="card-content" className={cn(className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn('flex items-center p-6 pt-4', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

/* ============================================================================
 * CardMedia Component
 * ========================================================================== */

const DefaultFallback = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-muted">
    <ImageOff className="h-12 w-12 text-muted-foreground/40" />
  </div>
);

const ImageWithPlaceholder = withMediaPlaceholder('img');

const CardMedia = React.forwardRef<HTMLDivElement, CardMediaProps>(
  (
    {
      className,
      aspectRatio,
      objectFit,
      src,
      alt,
      loading = 'lazy',
      onLoad,
      onError,
      fallback = <DefaultFallback />,
      skeleton = true,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        data-slot="card-media"
        className={cn(cardMediaVariants({ aspectRatio, objectFit, className }))}
        {...props}
      >
        <ImageWithPlaceholder
          src={src}
          alt={alt}
          loading={loading}
          onLoad={onLoad}
          onError={onError}
          fallback={fallback}
          skeleton={skeleton}
          skeletonClassName="absolute inset-0 rounded-t-lg"
          className="h-full w-full"
        />
      </div>
    );
  }
);
CardMedia.displayName = 'CardMedia';

/* ============================================================================
 * Exports
 * ========================================================================== */

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  cardMediaVariants,
  CardTitle,
  cardVariants,
};
