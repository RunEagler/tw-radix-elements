import type { Story } from '@ladle/react';
import { Badge, type BadgeProps } from './Badge';

export const Default: Story = () => <Badge>Badge</Badge>;

export const Variants: Story = () => (
  <div className="flex flex-wrap gap-4">
    <Badge variant="default">Default</Badge>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="destructive">Destructive</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="warning">Warning</Badge>
    <Badge variant="outline">Outline</Badge>
  </div>
);

export const Sizes: Story = () => (
  <div className="flex items-center gap-4">
    <Badge size="sm">Small</Badge>
    <Badge size="default">Default</Badge>
    <Badge size="lg">Large</Badge>
  </div>
);

export const Rounded: Story = () => (
  <div className="flex gap-4">
    <Badge rounded="default">Default (Full)</Badge>
    <Badge rounded="square">Square</Badge>
    <Badge rounded="none">None</Badge>
  </div>
);

export const WithIcon: Story = () => (
  <div className="flex gap-4">
    <Badge icon={<span>⭐</span>}>With Icon</Badge>
    <Badge variant="success" icon={<span>✓</span>}>
      Success
    </Badge>
    <Badge variant="warning" icon={<span>⚠</span>}>
      Warning
    </Badge>
  </div>
);

export const Removable: Story = () => (
  <div className="flex gap-4">
    <Badge
      removable
      onRemove={() => {
        console.log('Badge removed');
      }}
    >
      Removable
    </Badge>
    <Badge
      variant="success"
      removable
      onRemove={() => {
        console.log('Success badge removed');
      }}
    >
      Click X to remove
    </Badge>
  </div>
);

export const Playground: Story<BadgeProps> = props => <Badge {...props}>Badge</Badge>;

Playground.args = {
  variant: 'default',
  size: 'default',
  rounded: 'default',
  removable: false,
};

Playground.argTypes = {
  variant: {
    options: ['default', 'secondary', 'destructive', 'success', 'warning', 'outline'],
    control: { type: 'select' },
    defaultValue: 'default',
  },
  size: {
    options: ['sm', 'default', 'lg'],
    control: { type: 'select' },
    defaultValue: 'default',
  },
  rounded: {
    options: ['default', 'square', 'none'],
    control: { type: 'select' },
    defaultValue: 'default',
  },
  removable: {
    control: { type: 'boolean' },
    defaultValue: false,
  },
};
