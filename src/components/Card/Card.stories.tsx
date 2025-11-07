import type { Story } from '@ladle/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  type CardProps,
  CardTitle,
} from './Card';

export const Default: Story = () => (
  <Card ripple>
    <div className="p-6">Card Content</div>
  </Card>
);

export const Variants: Story = () => (
  <div className="flex flex-wrap gap-4">
    <Card variant="default" className="w-48">
      <div className="p-6">Default</div>
    </Card>
    <Card variant="elevated" className="w-48">
      <div className="p-6">Elevated</div>
    </Card>
    <Card variant="outlined" className="w-48">
      <div className="p-6">Outlined</div>
    </Card>
    <Card variant="ghost" className="w-48">
      <div className="p-6">Ghost</div>
    </Card>
  </div>
);

export const Padding: Story = () => (
  <div className="flex flex-wrap gap-4">
    <Card padding="none" className="w-48">
      <div className="bg-gray-100 dark:bg-gray-800">None</div>
    </Card>
    <Card padding="sm" className="w-48">
      <div className="bg-gray-100 dark:bg-gray-800">Small</div>
    </Card>
    <Card padding="default" className="w-48">
      <div className="bg-gray-100 dark:bg-gray-800">Default</div>
    </Card>
    <Card padding="lg" className="w-48">
      <div className="bg-gray-100 dark:bg-gray-800">Large</div>
    </Card>
  </div>
);

export const Hover: Story = () => (
  <div className="flex flex-wrap gap-4">
    <Card hover="none" className="w-48">
      <div className="p-6">None</div>
    </Card>
    <Card hover="lift" className="w-48">
      <div className="p-6">Lift</div>
    </Card>
    <Card hover="glow" className="w-48">
      <div className="p-6">Glow</div>
    </Card>
    <Card hover="border" className="w-48">
      <div className="p-6">Border</div>
    </Card>
  </div>
);

export const WithContent: Story = () => (
  <div className="flex flex-wrap gap-4">
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a card description that explains the content.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content area of the card. You can put any content here.</p>
      </CardContent>
      <CardFooter>
        <button type="button" className="rounded bg-primary px-4 py-2 text-white hover:opacity-90">
          Action
        </button>
      </CardFooter>
    </Card>

    <Card variant="elevated" hover="lift" className="w-80">
      <CardHeader>
        <CardTitle>Elevated Card</CardTitle>
        <CardDescription>This card has elevation and lift hover effect.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Hover over this card to see the lift effect in action.</p>
      </CardContent>
    </Card>

    <Card variant="outlined" hover="glow" className="w-80">
      <CardHeader>
        <CardTitle>Outlined Card</CardTitle>
        <CardDescription>This card has an outlined style with glow hover.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>The glow effect is applied on hover.</p>
      </CardContent>
    </Card>
  </div>
);

export const Playground: Story<CardProps> = props => (
  <Card {...props} className="w-80">
    <CardHeader>
      <CardTitle>Playground Card</CardTitle>
      <CardDescription>Adjust the props using the controls panel.</CardDescription>
    </CardHeader>
    <CardContent>
      <p>This is a playground to test different card configurations.</p>
    </CardContent>
    <CardFooter>
      <button type="button" className="rounded bg-primary px-4 py-2 text-white hover:opacity-90">
        Button
      </button>
    </CardFooter>
  </Card>
);

Playground.args = {
  variant: 'default',
  padding: 'default',
  hover: 'none',
};

Playground.argTypes = {
  variant: {
    options: ['default', 'elevated', 'outlined', 'ghost'],
    control: { type: 'select' },
    defaultValue: 'default',
  },
  padding: {
    options: ['none', 'sm', 'default', 'lg'],
    control: { type: 'select' },
    defaultValue: 'default',
  },
  hover: {
    options: ['none', 'lift', 'glow', 'border'],
    control: { type: 'select' },
    defaultValue: 'none',
  },
};
