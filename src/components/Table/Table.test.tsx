import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow,
} from './Table';

describe('Table', () => {
  it('renders table with headers and rows', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});

describe('TablePagination', () => {
  it('renders pagination info correctly', () => {
    const onPageChange = vi.fn();

    render(
      <TablePagination
        page={1}
        pageCount={10}
        pageSize={10}
        totalItems={100}
        onPageChange={onPageChange}
      />
    );

    expect(screen.getByText(/Showing 1-10 of 100 items/i)).toBeInTheDocument();
  });

  it('renders previous and next buttons', () => {
    const onPageChange = vi.fn();

    render(
      <TablePagination
        page={2}
        pageCount={10}
        pageSize={10}
        totalItems={100}
        onPageChange={onPageChange}
      />
    );

    expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    const onPageChange = vi.fn();

    render(
      <TablePagination
        page={1}
        pageCount={10}
        pageSize={10}
        totalItems={100}
        onPageChange={onPageChange}
      />
    );

    const previousButton = screen.getByRole('button', { name: /previous/i });
    expect(previousButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    const onPageChange = vi.fn();

    render(
      <TablePagination
        page={10}
        pageCount={10}
        pageSize={10}
        totalItems={100}
        onPageChange={onPageChange}
      />
    );

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange when clicking previous button', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <TablePagination
        page={2}
        pageCount={10}
        pageSize={10}
        totalItems={100}
        onPageChange={onPageChange}
      />
    );

    const previousButton = screen.getByRole('button', { name: /previous/i });
    await user.click(previousButton);

    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('calls onPageChange when clicking next button', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <TablePagination
        page={1}
        pageCount={10}
        pageSize={10}
        totalItems={100}
        onPageChange={onPageChange}
      />
    );

    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('renders page size selector when showPageSizeSelector is true', () => {
    const onPageChange = vi.fn();
    const onPageSizeChange = vi.fn();

    render(
      <TablePagination
        page={1}
        pageCount={10}
        pageSize={10}
        totalItems={100}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        showPageSizeSelector={true}
      />
    );

    expect(screen.getByLabelText(/items per page/i)).toBeInTheDocument();
  });

  it('does not render page size selector when showPageSizeSelector is false', () => {
    const onPageChange = vi.fn();

    render(
      <TablePagination
        page={1}
        pageCount={10}
        pageSize={10}
        totalItems={100}
        onPageChange={onPageChange}
        showPageSizeSelector={false}
      />
    );

    expect(screen.queryByLabelText(/items per page/i)).not.toBeInTheDocument();
  });

  it('calls onPageSizeChange when changing page size', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    const onPageSizeChange = vi.fn();

    render(
      <TablePagination
        page={1}
        pageCount={10}
        pageSize={10}
        totalItems={100}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    );

    const pageSizeSelect = screen.getByLabelText(/items per page/i);
    await user.selectOptions(pageSizeSelect, '20');

    expect(onPageSizeChange).toHaveBeenCalledWith(20);
  });

  it('renders custom labels', () => {
    const onPageChange = vi.fn();
    const onPageSizeChange = vi.fn();

    render(
      <TablePagination
        page={1}
        pageCount={10}
        pageSize={10}
        totalItems={100}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        labels={{
          previous: '前へ',
          next: '次へ',
          itemsPerPage: '表示件数',
          showing: '表示中',
          of: '/',
          items: '件',
        }}
      />
    );

    expect(screen.getByRole('button', { name: '前へ' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '次へ' })).toBeInTheDocument();
    expect(screen.getByLabelText('表示件数:')).toBeInTheDocument();
    expect(screen.getByText(/表示中 1-10 \/ 100 件/i)).toBeInTheDocument();
  });

  it('calculates correct end item when on last page with partial data', () => {
    const onPageChange = vi.fn();

    render(
      <TablePagination
        page={3}
        pageCount={3}
        pageSize={10}
        totalItems={25}
        onPageChange={onPageChange}
      />
    );

    expect(screen.getByText(/Showing 21-25 of 25 items/i)).toBeInTheDocument();
  });

  it('renders with custom page size options', () => {
    const onPageChange = vi.fn();
    const onPageSizeChange = vi.fn();

    render(
      <TablePagination
        page={1}
        pageCount={10}
        pageSize={5}
        pageSizeOptions={[5, 15, 25]}
        totalItems={100}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    );

    const pageSizeSelect = screen.getByLabelText(/items per page/i);
    expect(pageSizeSelect).toHaveValue('5');

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent('5');
    expect(options[1]).toHaveTextContent('15');
    expect(options[2]).toHaveTextContent('25');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    const onPageChange = vi.fn();

    render(
      <TablePagination
        ref={ref}
        page={1}
        pageCount={10}
        pageSize={10}
        totalItems={100}
        onPageChange={onPageChange}
      />
    );

    expect(ref).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const onPageChange = vi.fn();

    const { container } = render(
      <TablePagination
        className="custom-pagination"
        page={1}
        pageCount={10}
        pageSize={10}
        totalItems={100}
        onPageChange={onPageChange}
      />
    );

    expect(container.querySelector('.custom-pagination')).toBeInTheDocument();
  });
});
