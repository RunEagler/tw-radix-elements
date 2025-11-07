import type { Story } from '@ladle/react';
import { Input, type InputProps } from './Input';

export const Default: Story = () => <Input placeholder="Enter text..." />;

export const Types: Story = () => (
  <div className="flex flex-col gap-4 max-w-md">
    <div>
      <label className="block text-sm font-medium mb-1">Text</label>
      <Input type="text" placeholder="Text input" />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Email</label>
      <Input type="email" placeholder="email@example.com" />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Password</label>
      <Input type="password" placeholder="Enter password" />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Number</label>
      <Input type="number" placeholder="0" />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Date</label>
      <Input type="date" />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">File</label>
      <Input type="file" />
    </div>
  </div>
);

export const States: Story = () => (
  <div className="flex flex-col gap-4 max-w-md">
    <div>
      <label className="block text-sm font-medium mb-1">Default</label>
      <Input placeholder="Normal input" />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Error</label>
      <Input error placeholder="Input with error" />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Disabled</label>
      <Input disabled placeholder="Disabled input" />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Read Only</label>
      <Input readOnly value="Read only value" />
    </div>
  </div>
);

export const WithValue: Story = () => (
  <div className="flex flex-col gap-4 max-w-md">
    <Input defaultValue="Default value" />
    <Input value="Controlled value" onChange={() => {}} />
  </div>
);

export const Playground: Story<InputProps> = props => (
  <div className="max-w-md">
    <Input {...props} />
  </div>
);

Playground.args = {
  type: 'text',
  placeholder: 'Enter text...',
  error: false,
  disabled: false,
  readOnly: false,
};

Playground.argTypes = {
  type: {
    options: ['text', 'email', 'password', 'number', 'date', 'time', 'file', 'url', 'tel'],
    control: { type: 'select' },
    defaultValue: 'text',
  },
  error: {
    control: { type: 'boolean' },
    defaultValue: false,
  },
  disabled: {
    control: { type: 'boolean' },
    defaultValue: false,
  },
  readOnly: {
    control: { type: 'boolean' },
    defaultValue: false,
  },
};
