import type { Story } from '@ladle/react';
import { Badge, type BadgeProps } from './Badge';

const IconButton = ({ children }: { children: React.ReactNode }) => (
  <button
    type="button"
    className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
  >
    {children}
  </button>
);

export const Default: Story = () => (
  <Badge count={5}>
    <IconButton>
      <span className="text-2xl">🔔</span>
    </IconButton>
  </Badge>
);

export const Variants: Story = () => (
  <div className="flex flex-wrap gap-8">
    <Badge count={5} variant="default">
      <IconButton>
        <span className="text-2xl">🔔</span>
      </IconButton>
    </Badge>
    <Badge count={3} variant="secondary">
      <IconButton>
        <span className="text-2xl">📧</span>
      </IconButton>
    </Badge>
    <Badge count={99} variant="destructive">
      <IconButton>
        <span className="text-2xl">⚠️</span>
      </IconButton>
    </Badge>
    <Badge count={7} variant="success">
      <IconButton>
        <span className="text-2xl">✅</span>
      </IconButton>
    </Badge>
    <Badge count={2} variant="warning">
      <IconButton>
        <span className="text-2xl">⭐</span>
      </IconButton>
    </Badge>
    <Badge count={12} variant="info">
      <IconButton>
        <span className="text-2xl">ℹ️</span>
      </IconButton>
    </Badge>
  </div>
);

export const Sizes: Story = () => (
  <div className="flex items-center gap-8">
    <Badge count={5} size="sm">
      <IconButton>
        <span className="text-2xl">🔔</span>
      </IconButton>
    </Badge>
    <Badge count={5} size="default">
      <IconButton>
        <span className="text-2xl">🔔</span>
      </IconButton>
    </Badge>
    <Badge count={5} size="lg">
      <IconButton>
        <span className="text-2xl">🔔</span>
      </IconButton>
    </Badge>
  </div>
);

export const NumberBadge: Story = () => (
  <div className="flex gap-8">
    <Badge count={3}>
      <IconButton>
        <span className="text-2xl">💬</span>
      </IconButton>
    </Badge>
    <Badge count={99}>
      <IconButton>
        <span className="text-2xl">📬</span>
      </IconButton>
    </Badge>
    <Badge count={150} max={99}>
      <IconButton>
        <span className="text-2xl">🔔</span>
      </IconButton>
    </Badge>
    <Badge count={1000} max={999}>
      <IconButton>
        <span className="text-2xl">👥</span>
      </IconButton>
    </Badge>
  </div>
);

export const DotBadge: Story = () => (
  <div className="flex gap-8">
    <Badge dot variant="default">
      <IconButton>
        <span className="text-2xl">🔔</span>
      </IconButton>
    </Badge>
    <Badge dot variant="destructive">
      <IconButton>
        <span className="text-2xl">📧</span>
      </IconButton>
    </Badge>
    <Badge dot variant="success">
      <IconButton>
        <span className="text-2xl">✅</span>
      </IconButton>
    </Badge>
  </div>
);

export const WithAvatar: Story = () => (
  <div className="flex gap-8">
    <Badge count={5}>
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
    </Badge>
    <Badge dot variant="success">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400" />
    </Badge>
  </div>
);

export const Playground: Story<BadgeProps> = props => (
  <Badge {...props}>
    <IconButton>
      <span className="text-2xl">🔔</span>
    </IconButton>
  </Badge>
);

Playground.args = {
  variant: 'default',
  size: 'default',
  dot: false,
  count: 5,
  max: 99,
};

Playground.argTypes = {
  variant: {
    options: ['default', 'secondary', 'destructive', 'success', 'warning', 'info'],
    control: { type: 'select' },
    defaultValue: 'default',
  },
  size: {
    options: ['sm', 'default', 'lg'],
    control: { type: 'select' },
    defaultValue: 'default',
  },
  dot: {
    control: { type: 'boolean' },
    defaultValue: false,
  },
  count: {
    control: { type: 'number' },
    defaultValue: 5,
  },
  max: {
    control: { type: 'number' },
    defaultValue: 99,
  },
};
