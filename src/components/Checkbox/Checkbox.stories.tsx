import type { Story } from '@ladle/react';
import type { CheckedState } from '@radix-ui/react-checkbox';
import { useState } from 'react';
import { Checkbox, type CheckboxProps } from './Checkbox';

export const Default: Story = () => {
  const [checked, setChecked] = useState<CheckedState>(false);
  return <Checkbox size={'default'} checked={checked} onCheckedChange={setChecked} />;
};

export const WithLabel: Story = () => {
  const [checked, setChecked] = useState<CheckedState>(false);
  return (
    <Checkbox checked={checked} onCheckedChange={setChecked} label="Accept terms and conditions" />
  );
};

export const WithDescription: Story = () => {
  const [checked, setChecked] = useState<CheckedState>(false);
  return (
    <Checkbox
      checked={checked}
      onCheckedChange={setChecked}
      label="Marketing emails"
      description="Receive emails about new products and special offers."
    />
  );
};

export const WithError: Story = () => {
  const [checked, setChecked] = useState<CheckedState>(false);
  return <Checkbox checked={checked} onCheckedChange={setChecked} label="Accept terms" />;
};

export const Sizes: Story = () => {
  const [checked1, setChecked1] = useState<CheckedState>(false);
  const [checked2, setChecked2] = useState<CheckedState>(true);
  const [checked3, setChecked3] = useState<CheckedState>(false);

  return (
    <div className="flex flex-col gap-4">
      <Checkbox checked={checked1} onCheckedChange={setChecked1} size="sm" label="Small checkbox" />
      <Checkbox
        checked={checked2}
        onCheckedChange={setChecked2}
        size="default"
        label="Default checkbox"
      />
      <Checkbox checked={checked3} onCheckedChange={setChecked3} size="lg" label="Large checkbox" />
    </div>
  );
};

export const Variants: Story = () => {
  const [checked1, setChecked1] = useState<CheckedState>(true);
  const [checked2, setChecked2] = useState<CheckedState>(true);
  const [checked3, setChecked3] = useState<CheckedState>(true);

  return (
    <div className="flex flex-col gap-4">
      <Checkbox
        checked={checked1}
        onCheckedChange={setChecked1}
        variant="default"
        label="Default variant"
      />
      <Checkbox
        checked={checked2}
        onCheckedChange={setChecked2}
        variant="destructive"
        label="Destructive variant"
      />
      <Checkbox
        checked={checked3}
        onCheckedChange={setChecked3}
        variant="success"
        label="Success variant"
      />
    </div>
  );
};

export const Disabled: Story = () => {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox disabled label="Disabled unchecked" />
      <Checkbox disabled checked label="Disabled checked" />
    </div>
  );
};

export const FormExample: Story = () => {
  const [preferences, setPreferences] = useState({
    newsletter: false,
    marketing: false,
    updates: true,
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Email Preferences</h3>
      <div className="flex flex-col gap-3">
        <Checkbox
          checked={preferences.newsletter}
          onCheckedChange={checked =>
            setPreferences(prev => ({ ...prev, newsletter: checked === true }))
          }
          label="Newsletter"
          description="Receive our weekly newsletter with the latest updates."
        />
        <Checkbox
          checked={preferences.marketing}
          onCheckedChange={checked =>
            setPreferences(prev => ({ ...prev, marketing: checked === true }))
          }
          label="Marketing emails"
          description="Get notified about special offers and promotions."
        />
        <Checkbox
          checked={preferences.updates}
          onCheckedChange={checked =>
            setPreferences(prev => ({ ...prev, updates: checked === true }))
          }
          label="Product updates"
          description="Stay informed about new features and improvements."
        />
      </div>
    </div>
  );
};

export const Playground: Story<CheckboxProps> = props => {
  const [checked, setChecked] = useState<CheckedState>(false);
  return <Checkbox {...props} checked={checked} onCheckedChange={setChecked} />;
};

Playground.args = {
  label: 'Checkbox label',
  description: '',
  size: 'default',
  variant: 'default',
  disabled: false,
};

Playground.argTypes = {
  size: {
    options: ['sm', 'default', 'lg'],
    control: { type: 'select' },
    defaultValue: 'default',
  },
  variant: {
    options: ['default', 'destructive', 'success'],
    control: { type: 'select' },
    defaultValue: 'default',
  },
  disabled: {
    control: { type: 'boolean' },
    defaultValue: false,
  },
  label: {
    control: { type: 'text' },
  },
  description: {
    control: { type: 'text' },
  },
};
