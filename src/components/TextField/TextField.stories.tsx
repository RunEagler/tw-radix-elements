import type { Story } from '@ladle/react';
import { Eye, EyeOff, Lock, Mail, Search, User } from 'lucide-react';
import { useState } from 'react';
import { TextField, type TextFieldProps } from './TextField';

export const Default: Story = () => {
  return <TextField placeholder="Enter text..." />;
};

export const WithLabel: Story = () => {
  return <TextField label="Username" placeholder="Enter your username" />;
};

export const WithDescription: Story = () => {
  return (
    <TextField
      label="Email"
      placeholder="you@example.com"
      description="We'll never share your email with anyone else."
    />
  );
};

export const WithError: Story = () => {
  return (
    <TextField label="Email" placeholder="you@example.com" error="This email is already taken." />
  );
};

export const WithHelperText: Story = () => {
  return (
    <TextField
      label="Password"
      type="password"
      placeholder="Enter password"
      helperText="Must be at least 8 characters."
    />
  );
};

export const Required: Story = () => {
  return <TextField label="Full Name" placeholder="John Doe" required />;
};

export const Disabled: Story = () => {
  return (
    <div className="space-y-4">
      <TextField label="Disabled Empty" placeholder="Cannot edit" disabled />
      <TextField label="Disabled With Value" value="Disabled field" disabled />
    </div>
  );
};

export const Sizes: Story = () => {
  return (
    <div className="space-y-4">
      <TextField size="sm" label="Small" placeholder="Small input" />
      <TextField size="default" label="Default" placeholder="Default input" />
      <TextField size="lg" label="Large" placeholder="Large input" />
    </div>
  );
};

export const Variants: Story = () => {
  return (
    <div className="space-y-4">
      <TextField variant="default" label="Default" placeholder="Default variant" />
      <TextField variant="filled" label="Filled" placeholder="Filled variant" />
      <TextField variant="ghost" label="Ghost" placeholder="Ghost variant" />
    </div>
  );
};

export const States: Story = () => {
  return (
    <div className="space-y-4">
      <TextField state="default" label="Default" placeholder="Default state" />
      <TextField state="error" label="Error" placeholder="Error state" />
      <TextField state="success" label="Success" placeholder="Success state" />
    </div>
  );
};

export const WithLeftIcon: Story = () => {
  return (
    <div className="space-y-4">
      <TextField label="Search" placeholder="Search..." leftIcon={<Search className="h-4 w-4" />} />
      <TextField
        label="Email"
        type="email"
        placeholder="you@example.com"
        leftIcon={<Mail className="h-4 w-4" />}
      />
      <TextField
        label="Username"
        placeholder="Enter username"
        leftIcon={<User className="h-4 w-4" />}
      />
    </div>
  );
};

export const WithRightIcon: Story = () => {
  return (
    <div className="space-y-4">
      <TextField
        label="Password"
        type="password"
        placeholder="Enter password"
        rightIcon={<Lock className="h-4 w-4" />}
      />
      <TextField
        label="Verified Email"
        type="email"
        value="verified@example.com"
        rightIcon={<Mail className="h-4 w-4 text-green-600" />}
        state="success"
      />
    </div>
  );
};

export const PasswordToggle: Story = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      label="Password"
      type={showPassword ? 'text' : 'password'}
      placeholder="Enter password"
      leftIcon={<Lock className="h-4 w-4" />}
      rightIcon={
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="pointer-events-auto hover:text-foreground transition-colors"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      }
    />
  );
};

export const InputTypes: Story = () => {
  return (
    <div className="space-y-4">
      <TextField label="Text" type="text" placeholder="Text input" />
      <TextField label="Email" type="email" placeholder="email@example.com" />
      <TextField label="Password" type="password" placeholder="Password" />
      <TextField label="Number" type="number" placeholder="123" />
      <TextField label="Tel" type="tel" placeholder="+1 (555) 123-4567" />
      <TextField label="URL" type="url" placeholder="https://example.com" />
      <TextField label="Date" type="date" />
      <TextField label="Time" type="time" />
    </div>
  );
};

export const ControlledInput: Story = () => {
  const [value, setValue] = useState('');

  return (
    <div className="space-y-4">
      <TextField
        label="Controlled Input"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Type something..."
        helperText={`Character count: ${value.length}`}
      />
      <div className="text-sm text-muted-foreground">Current value: {value || '(empty)'}</div>
    </div>
  );
};

export const FormExample: Story = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert('Form submitted successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <h3 className="text-lg font-semibold">Registration Form</h3>

      <TextField
        label="Username"
        placeholder="Enter username"
        required
        value={formData.username}
        onChange={e => setFormData({ ...formData, username: e.target.value })}
        error={errors.username}
        leftIcon={<User className="h-4 w-4" />}
      />

      <TextField
        label="Email"
        type="email"
        placeholder="you@example.com"
        required
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
        leftIcon={<Mail className="h-4 w-4" />}
      />

      <TextField
        label="Password"
        type="password"
        placeholder="Enter password"
        required
        value={formData.password}
        onChange={e => setFormData({ ...formData, password: e.target.value })}
        error={errors.password}
        helperText={!errors.password ? 'Must be at least 8 characters' : undefined}
        leftIcon={<Lock className="h-4 w-4" />}
      />

      <button
        type="submit"
        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        Submit
      </button>
    </form>
  );
};

export const Playground: Story<TextFieldProps> = props => {
  return <TextField {...props} />;
};

Playground.args = {
  label: 'Label',
  placeholder: 'Enter text...',
  description: '',
  helperText: '',
  error: '',
  size: 'default',
  variant: 'default',
  state: 'default',
  disabled: false,
  required: false,
};

Playground.argTypes = {
  size: {
    options: ['sm', 'default', 'lg'],
    control: { type: 'select' },
    defaultValue: 'default',
  },
  variant: {
    options: ['default', 'filled', 'ghost'],
    control: { type: 'select' },
    defaultValue: 'default',
  },
  state: {
    options: ['default', 'error', 'success'],
    control: { type: 'select' },
    defaultValue: 'default',
  },
  disabled: {
    control: { type: 'boolean' },
    defaultValue: false,
  },
  required: {
    control: { type: 'boolean' },
    defaultValue: false,
  },
  label: {
    control: { type: 'text' },
  },
  placeholder: {
    control: { type: 'text' },
  },
  description: {
    control: { type: 'text' },
  },
  helperText: {
    control: { type: 'text' },
  },
  error: {
    control: { type: 'text' },
  },
};
