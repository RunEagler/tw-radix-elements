import { cn } from '@ui/lib/utils';
import * as React from 'react';

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} />
    </div>
  )
);
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
));
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
      className
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn('mt-4 text-sm text-muted-foreground', className)} {...props} />
));
TableCaption.displayName = 'TableCaption';

export interface TablePaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current page (1-indexed) */
  page: number;
  /** Total number of pages */
  pageCount: number;
  /** Items per page */
  pageSize: number;
  /** Available page size options */
  pageSizeOptions?: number[];
  /** Total number of items */
  totalItems: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Callback when page size changes */
  onPageSizeChange?: (pageSize: number) => void;
  /** Show page size selector */
  showPageSizeSelector?: boolean;
  /** Labels for customization */
  labels?: {
    previous?: string;
    next?: string;
    itemsPerPage?: string;
    showing?: string;
    of?: string;
    items?: string;
  };
}

const TablePagination = React.forwardRef<HTMLDivElement, TablePaginationProps>(
  (
    {
      className,
      page,
      pageCount,
      pageSize,
      pageSizeOptions = [10, 20, 50, 100],
      totalItems,
      onPageChange,
      onPageSizeChange,
      showPageSizeSelector = true,
      labels = {},
      ...props
    },
    ref
  ) => {
    const pageSizeId = React.useId();

    const {
      previous = 'Previous',
      next = 'Next',
      itemsPerPage = 'Items per page',
      showing = 'Showing',
      of = 'of',
      items = 'items',
    } = labels;

    const startItem = (page - 1) * pageSize + 1;
    const endItem = Math.min(page * pageSize, totalItems);
    const hasPreviousPage = page > 1;
    const hasNextPage = page < pageCount;

    const handlePreviousPage = () => {
      if (hasPreviousPage) {
        onPageChange(page - 1);
      }
    };

    const handleNextPage = () => {
      if (hasNextPage) {
        onPageChange(page + 1);
      }
    };

    const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newPageSize = Number(event.target.value);
      if (onPageSizeChange) {
        onPageSizeChange(newPageSize);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-4 px-2 py-4 sm:flex-row sm:items-center sm:justify-between',
          className
        )}
        {...props}
      >
        {/* Page size selector */}
        {showPageSizeSelector && onPageSizeChange && (
          <div className="flex items-center gap-2">
            <label htmlFor={pageSizeId} className="text-sm font-medium">
              {itemsPerPage}:
            </label>
            <select
              id={pageSizeId}
              value={pageSize}
              onChange={handlePageSizeChange}
              className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {pageSizeOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Pagination info and controls */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          {/* Pagination info */}
          <div className="text-sm text-muted-foreground">
            {showing} {startItem}-{endItem} {of} {totalItems} {items}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePreviousPage}
              disabled={!hasPreviousPage}
              className={cn(
                'inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
              )}
              aria-label={previous}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              {previous}
            </button>
            <button
              type="button"
              onClick={handleNextPage}
              disabled={!hasNextPage}
              className={cn(
                'inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
              )}
              aria-label={next}
            >
              {next}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }
);
TablePagination.displayName = 'TablePagination';

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow,
};
