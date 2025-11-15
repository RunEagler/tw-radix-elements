import type { Story } from '@ladle/react';
import * as React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow,
} from './Table';

export const Default: Story = () => (
  <Table>
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Invoice</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Method</TableHead>
        <TableHead className="text-right">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell className="font-medium">INV001</TableCell>
        <TableCell>Paid</TableCell>
        <TableCell>Credit Card</TableCell>
        <TableCell className="text-right">$250.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">INV002</TableCell>
        <TableCell>Pending</TableCell>
        <TableCell>PayPal</TableCell>
        <TableCell className="text-right">$150.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">INV003</TableCell>
        <TableCell>Unpaid</TableCell>
        <TableCell>Bank Transfer</TableCell>
        <TableCell className="text-right">$350.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">INV004</TableCell>
        <TableCell>Paid</TableCell>
        <TableCell>Credit Card</TableCell>
        <TableCell className="text-right">$450.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">INV005</TableCell>
        <TableCell>Paid</TableCell>
        <TableCell>PayPal</TableCell>
        <TableCell className="text-right">$550.00</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export const WithFooter: Story = () => (
  <Table>
    <TableCaption>A list of your recent transactions.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Date</TableHead>
        <TableHead>Description</TableHead>
        <TableHead>Category</TableHead>
        <TableHead className="text-right">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>2024-01-15</TableCell>
        <TableCell>Office Supplies</TableCell>
        <TableCell>Business</TableCell>
        <TableCell className="text-right">$125.50</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>2024-01-14</TableCell>
        <TableCell>Client Lunch</TableCell>
        <TableCell>Meals</TableCell>
        <TableCell className="text-right">$85.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>2024-01-13</TableCell>
        <TableCell>Software License</TableCell>
        <TableCell>Technology</TableCell>
        <TableCell className="text-right">$299.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>2024-01-12</TableCell>
        <TableCell>Travel Expenses</TableCell>
        <TableCell>Travel</TableCell>
        <TableCell className="text-right">$750.00</TableCell>
      </TableRow>
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colSpan={3}>Total</TableCell>
        <TableCell className="text-right">$1,259.50</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
);

export const UserTable: Story = () => (
  <Table>
    <TableCaption>Team members and their roles.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Role</TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell className="font-medium">John Doe</TableCell>
        <TableCell>john@example.com</TableCell>
        <TableCell>Admin</TableCell>
        <TableCell>
          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
            Active
          </span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">Jane Smith</TableCell>
        <TableCell>jane@example.com</TableCell>
        <TableCell>Editor</TableCell>
        <TableCell>
          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
            Active
          </span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">Bob Johnson</TableCell>
        <TableCell>bob@example.com</TableCell>
        <TableCell>Viewer</TableCell>
        <TableCell>
          <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            Pending
          </span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">Alice Williams</TableCell>
        <TableCell>alice@example.com</TableCell>
        <TableCell>Editor</TableCell>
        <TableCell>
          <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
            Inactive
          </span>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export const SelectableRows: Story = () => (
  <Table>
    <TableCaption>Select items to perform bulk actions.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-12">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300"
            aria-label="Select all"
          />
        </TableHead>
        <TableHead>Product</TableHead>
        <TableHead>Category</TableHead>
        <TableHead>Stock</TableHead>
        <TableHead className="text-right">Price</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>
          <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
        </TableCell>
        <TableCell className="font-medium">Laptop Pro</TableCell>
        <TableCell>Electronics</TableCell>
        <TableCell>45</TableCell>
        <TableCell className="text-right">$1,299.00</TableCell>
      </TableRow>
      <TableRow data-state="selected">
        <TableCell>
          <input type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked />
        </TableCell>
        <TableCell className="font-medium">Wireless Mouse</TableCell>
        <TableCell>Accessories</TableCell>
        <TableCell>120</TableCell>
        <TableCell className="text-right">$29.99</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
        </TableCell>
        <TableCell className="font-medium">USB-C Cable</TableCell>
        <TableCell>Accessories</TableCell>
        <TableCell>200</TableCell>
        <TableCell className="text-right">$12.99</TableCell>
      </TableRow>
      <TableRow data-state="selected">
        <TableCell>
          <input type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked />
        </TableCell>
        <TableCell className="font-medium">Monitor 27"</TableCell>
        <TableCell>Electronics</TableCell>
        <TableCell>30</TableCell>
        <TableCell className="text-right">$449.00</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export const CompactTable: Story = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell className="py-2">1</TableCell>
        <TableCell className="py-2">Item One</TableCell>
        <TableCell className="py-2">Active</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="py-2">2</TableCell>
        <TableCell className="py-2">Item Two</TableCell>
        <TableCell className="py-2">Inactive</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="py-2">3</TableCell>
        <TableCell className="py-2">Item Three</TableCell>
        <TableCell className="py-2">Active</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export const LargeDataset: Story = () => (
  <Table>
    <TableCaption>Sample dataset with many rows.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Order ID</TableHead>
        <TableHead>Customer</TableHead>
        <TableHead>Product</TableHead>
        <TableHead>Quantity</TableHead>
        <TableHead className="text-right">Total</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {Array.from({ length: 20 }, (_, i) => (
        <TableRow key={i}>
          <TableCell className="font-medium">ORD{String(i + 1).padStart(4, '0')}</TableCell>
          <TableCell>Customer {i + 1}</TableCell>
          <TableCell>Product {String.fromCharCode(65 + (i % 26))}</TableCell>
          <TableCell>{Math.floor(Math.random() * 10) + 1}</TableCell>
          <TableCell className="text-right">${(Math.random() * 1000 + 100).toFixed(2)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export const ResponsiveTable: Story = () => (
  <div className="space-y-4">
    <p className="text-sm text-muted-foreground">
      This table will scroll horizontally on small screens.
    </p>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead className="text-right">Salary</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell className="font-medium">John Doe</TableCell>
          <TableCell>john.doe@company.com</TableCell>
          <TableCell>Engineering</TableCell>
          <TableCell>Senior Developer</TableCell>
          <TableCell>San Francisco</TableCell>
          <TableCell>2020-01-15</TableCell>
          <TableCell className="text-right">$120,000</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2</TableCell>
          <TableCell className="font-medium">Jane Smith</TableCell>
          <TableCell>jane.smith@company.com</TableCell>
          <TableCell>Design</TableCell>
          <TableCell>Lead Designer</TableCell>
          <TableCell>New York</TableCell>
          <TableCell>2019-06-01</TableCell>
          <TableCell className="text-right">$110,000</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>3</TableCell>
          <TableCell className="font-medium">Bob Johnson</TableCell>
          <TableCell>bob.johnson@company.com</TableCell>
          <TableCell>Marketing</TableCell>
          <TableCell>Marketing Manager</TableCell>
          <TableCell>Los Angeles</TableCell>
          <TableCell>2021-03-20</TableCell>
          <TableCell className="text-right">$95,000</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
);

export const EmptyState: Story = () => (
  <Table>
    <TableCaption>No data available.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell colSpan={3} className="h-24 text-center">
          No results found.
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

// Generate mock data for pagination examples
const generateMockOrders = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `ORD${String(i + 1).padStart(4, '0')}`,
    customer: `Customer ${i + 1}`,
    product: `Product ${String.fromCharCode(65 + (i % 26))}`,
    quantity: Math.floor(Math.random() * 10) + 1,
    total: (Math.random() * 1000 + 100).toFixed(2),
  }));
};

export const WithPagination: Story = () => {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const allData = React.useMemo(() => generateMockOrders(100), []);
  const pageCount = Math.ceil(allData.length / pageSize);

  // Get current page data
  const currentData = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return allData.slice(start, end);
  }, [allData, page, pageSize]);

  // Reset to page 1 when page size changes
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map(order => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.product}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell className="text-right">${order.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        page={page}
        pageCount={pageCount}
        pageSize={pageSize}
        totalItems={allData.length}
        onPageChange={setPage}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export const PaginationWithoutPageSizeSelector: Story = () => {
  const [page, setPage] = React.useState(1);
  const pageSize = 10;

  const allData = React.useMemo(() => generateMockOrders(50), []);
  const pageCount = Math.ceil(allData.length / pageSize);

  const currentData = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return allData.slice(start, end);
  }, [allData, page]);

  return (
    <div className="space-y-4">
      <Table>
        <TableCaption>Pagination without page size selector.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map(order => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.product}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell className="text-right">${order.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        page={page}
        pageCount={pageCount}
        pageSize={pageSize}
        totalItems={allData.length}
        onPageChange={setPage}
        showPageSizeSelector={false}
      />
    </div>
  );
};

export const PaginationCustomLabels: Story = () => {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const allData = React.useMemo(() => generateMockOrders(75), []);
  const pageCount = Math.ceil(allData.length / pageSize);

  const currentData = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return allData.slice(start, end);
  }, [allData, page, pageSize]);

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableCaption>Pagination with custom labels (Japanese).</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>注文ID</TableHead>
            <TableHead>顧客名</TableHead>
            <TableHead>商品</TableHead>
            <TableHead>数量</TableHead>
            <TableHead className="text-right">合計</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map(order => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.product}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell className="text-right">${order.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        page={page}
        pageCount={pageCount}
        pageSize={pageSize}
        totalItems={allData.length}
        onPageChange={setPage}
        onPageSizeChange={handlePageSizeChange}
        labels={{
          previous: '前へ',
          next: '次へ',
          itemsPerPage: '表示件数',
          showing: '表示中',
          of: '/',
          items: '件',
        }}
      />
    </div>
  );
};
