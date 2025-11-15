import type { Story } from '@ladle/react';
import { Breadcrumbs, type BreadcrumbsProps } from './Breadcrumbs';

export const Default: Story = () => (
  <Breadcrumbs
    items={[
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Laptop' },
    ]}
  />
);

export const Sizes: Story = () => (
  <div className="flex flex-col gap-6">
    <div>
      <p className="mb-2 text-sm text-muted-foreground">Small</p>
      <Breadcrumbs
        size="sm"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Electronics' },
        ]}
      />
    </div>
    <div>
      <p className="mb-2 text-sm text-muted-foreground">Default</p>
      <Breadcrumbs
        size="default"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Electronics' },
        ]}
      />
    </div>
    <div>
      <p className="mb-2 text-sm text-muted-foreground">Large</p>
      <Breadcrumbs
        size="lg"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Electronics' },
        ]}
      />
    </div>
  </div>
);

export const CustomSeparators: Story = () => (
  <div className="flex flex-col gap-6">
    <div>
      <p className="mb-2 text-sm text-muted-foreground">Arrow separator</p>
      <Breadcrumbs
        separator="→"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Electronics' },
        ]}
      />
    </div>
    <div>
      <p className="mb-2 text-sm text-muted-foreground">Greater than separator</p>
      <Breadcrumbs
        separator=">"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Electronics' },
        ]}
      />
    </div>
    <div>
      <p className="mb-2 text-sm text-muted-foreground">Bullet separator</p>
      <Breadcrumbs
        separator="•"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Electronics' },
        ]}
      />
    </div>
    <div>
      <p className="mb-2 text-sm text-muted-foreground">Chevron separator</p>
      <Breadcrumbs
        separator="›"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Electronics' },
        ]}
      />
    </div>
  </div>
);

export const WithCollapse: Story = () => (
  <div className="flex flex-col gap-6">
    <div>
      <p className="mb-2 text-sm text-muted-foreground">
        Collapsed (maxItems: 4, showing 1 before and 1 after)
      </p>
      <Breadcrumbs
        maxItems={4}
        itemsBeforeCollapse={1}
        itemsAfterCollapse={1}
        items={[
          { label: 'Home', href: '/' },
          { label: 'Level 1', href: '/level1' },
          { label: 'Level 2', href: '/level2' },
          { label: 'Level 3', href: '/level3' },
          { label: 'Level 4', href: '/level4' },
          { label: 'Current Page' },
        ]}
      />
    </div>
    <div>
      <p className="mb-2 text-sm text-muted-foreground">
        Collapsed (maxItems: 5, showing 2 before and 2 after)
      </p>
      <Breadcrumbs
        maxItems={5}
        itemsBeforeCollapse={3}
        itemsAfterCollapse={2}
        items={[
          { label: 'Home', href: '/' },
          { label: 'Docs', href: '/docs' },
          { label: 'Components', href: '/docs/components' },
          { label: 'Navigation', href: '/docs/components/navigation' },
          { label: 'Breadcrumbs', href: '/docs/components/navigation/breadcrumbs' },
          { label: 'Examples', href: '/docs/components/navigation/breadcrumbs/examples' },
          { label: 'Advanced' },
        ]}
      />
    </div>
  </div>
);

export const WithOnClick: Story = () => {
  const handleClick = (label: string) => {
    console.log(`Breadcrumb clicked: ${label}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">Click on breadcrumb items (check console)</p>
      <Breadcrumbs
        items={[
          { label: 'Home', onClick: () => handleClick('Home') },
          { label: 'Products', onClick: () => handleClick('Products') },
          { label: 'Electronics', onClick: () => handleClick('Electronics') },
          { label: 'Laptop' },
        ]}
      />
    </div>
  );
};

export const WithHrefAndOnClick: Story = () => {
  const handleClick = (label: string) => {
    console.log(`Breadcrumb clicked: ${label}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Items with both href and onClick (onClick prevents default)
      </p>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/', onClick: () => handleClick('Home') },
          { label: 'Products', href: '/products', onClick: () => handleClick('Products') },
          { label: 'Electronics', href: '/products/electronics' },
        ]}
      />
    </div>
  );
};

export const SingleItem: Story = () => <Breadcrumbs items={[{ label: 'Current Page' }]} />;

export const LongLabels: Story = () => (
  <div className="max-w-2xl">
    <Breadcrumbs
      items={[
        { label: 'Home', href: '/' },
        { label: 'Very Long Category Name That Might Wrap', href: '/category' },
        {
          label: 'Another Extremely Long Subcategory Name',
          href: '/category/subcategory',
        },
        { label: 'Current Page with a Very Long Title' },
      ]}
    />
  </div>
);

export const ResponsiveCollapse: Story = () => (
  <div className="flex flex-col gap-6">
    <div className="max-w-md border border-border p-4 rounded-md">
      <p className="mb-4 text-sm text-muted-foreground">Narrow container (max-width: 28rem)</p>
      <Breadcrumbs
        maxItems={3}
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Electronics', href: '/products/electronics' },
          { label: 'Computers', href: '/products/electronics/computers' },
          { label: 'Laptops' },
        ]}
      />
    </div>
    <div className="max-w-xl border border-border p-4 rounded-md">
      <p className="mb-4 text-sm text-muted-foreground">Medium container (max-width: 36rem)</p>
      <Breadcrumbs
        maxItems={4}
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Electronics', href: '/products/electronics' },
          { label: 'Computers', href: '/products/electronics/computers' },
          { label: 'Laptops' },
        ]}
      />
    </div>
  </div>
);

export const Playground: Story<BreadcrumbsProps> = props => <Breadcrumbs {...props} />;

Playground.args = {
  items: [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Laptop' },
  ],
  size: 'default',
  separator: '/',
  maxItems: undefined,
  itemsBeforeCollapse: 1,
  itemsAfterCollapse: 1,
};

Playground.argTypes = {
  size: {
    options: ['sm', 'default', 'lg'],
    control: { type: 'select' },
    defaultValue: 'default',
  },
  separator: {
    control: { type: 'text' },
    defaultValue: '/',
  },
  maxItems: {
    control: { type: 'number' },
  },
  itemsBeforeCollapse: {
    control: { type: 'number' },
    defaultValue: 1,
  },
  itemsAfterCollapse: {
    control: { type: 'number' },
    defaultValue: 1,
  },
};
