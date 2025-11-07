import type { Story } from '@ladle/react';
import { Button, type ButtonProps } from './Button';

export const Default: Story = () => <Button>Button</Button>;

export const Variants: Story = () => (
  <div className="flex flex-wrap gap-4">
    <Button variant="default">Default</Button>
    <Button variant="destructive">Destructive</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
    <Button
      ripple
      variant="default"
      onClick={() => {
        console.log('area');
      }}
    >
      ripple
    </Button>
  </div>
);

export const Sizes: Story = () => (
  <div className="flex items-center gap-4">
    <Button size="sm">Small</Button>
    <Button size="default">Default</Button>
    <Button size="lg">Large</Button>
    <Button size="icon">⚙</Button>
  </div>
);

export const Loading: Story = () => (
  <div className="flex gap-4">
    <Button loading>Loading</Button>
    <Button loading variant="outline">
      Loading Outline
    </Button>
  </div>
);

export const Disabled: Story = () => (
  <div className="flex gap-4">
    <Button disabled>Disabled</Button>
    <Button disabled variant="outline">
      Disabled Outline
    </Button>
  </div>
);

export const Playground: Story<ButtonProps> = props => <Button {...props}>Button</Button>;

Playground.args = {
  variant: 'default',
  size: 'default',
  loading: false,
  disabled: false,
};

Playground.argTypes = {
  variant: {
    options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    control: { type: 'select' },
    defaultValue: 'default',
  },
  size: {
    options: ['sm', 'default', 'lg', 'icon'],
    control: { type: 'select' },
    defaultValue: 'default',
  },
  loading: {
    control: { type: 'boolean' },
    defaultValue: false,
  },
  disabled: {
    control: { type: 'boolean' },
    defaultValue: false,
  },
};
