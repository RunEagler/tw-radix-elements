import type { Story } from '@ladle/react';
import { useState } from 'react';
import { Toggle, type ToggleProps } from './Toggle';

export const Default: Story = () => {
  const [enabled, setEnabled] = useState(false);
  return <Toggle checked={enabled} onCheckedChange={setEnabled} aria-label="Default toggle" />;
};

export const WithLabel: Story = () => {
  const [marketing, setMarketing] = useState(true);
  return (
    <Toggle
      checked={marketing}
      onCheckedChange={setMarketing}
      label="Marketing emails"
      description="Receive updates about new launches and offers."
    />
  );
};

export const Variants: Story = () => {
  const [states, setStates] = useState({
    default: true,
    success: true,
    destructive: false,
  });

  return (
    <div className="space-y-4">
      <Toggle
        checked={states.default}
        onCheckedChange={checked => setStates(prev => ({ ...prev, default: checked }))}
        label="Default variant"
      />
      <Toggle
        checked={states.success}
        onCheckedChange={checked => setStates(prev => ({ ...prev, success: checked }))}
        label="Success variant"
        variant="success"
      />
      <Toggle
        checked={states.destructive}
        onCheckedChange={checked => setStates(prev => ({ ...prev, destructive: checked }))}
        label="Destructive variant"
        variant="destructive"
      />
    </div>
  );
};

export const Sizes: Story = () => {
  const [sm, setSm] = useState(false);
  const [md, setMd] = useState(true);
  const [lg, setLg] = useState(false);

  return (
    <div className="space-y-4">
      <Toggle size="sm" label="Small toggle" checked={sm} onCheckedChange={setSm} />
      <Toggle size="default" label="Default toggle" checked={md} onCheckedChange={setMd} />
      <Toggle size="lg" label="Large toggle" checked={lg} onCheckedChange={setLg} />
    </div>
  );
};

export const Disabled: Story = () => (
  <div className="space-y-4">
    <Toggle disabled aria-label="Disabled off" />
    <Toggle disabled checked aria-label="Disabled on" />
    <Toggle
      disabled
      checked
      label="Disabled with label"
      description="Labels remain visible but interaction is blocked."
    />
  </div>
);

export const PreferencesExample: Story = () => {
  const [preferences, setPreferences] = useState({
    notifications: true,
    darkMode: false,
    autoUpdates: true,
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">App preferences</h3>
      <Toggle
        label="Push notifications"
        description="Stay informed about important account activity."
        checked={preferences.notifications}
        onCheckedChange={checked => setPreferences(prev => ({ ...prev, notifications: checked }))}
      />
      <Toggle
        label="Dark mode"
        description="Automatic switch will follow system settings."
        checked={preferences.darkMode}
        onCheckedChange={checked => setPreferences(prev => ({ ...prev, darkMode: checked }))}
      />
      <Toggle
        label="Auto updates"
        description="Download updates in the background."
        checked={preferences.autoUpdates}
        onCheckedChange={checked => setPreferences(prev => ({ ...prev, autoUpdates: checked }))}
      />
    </div>
  );
};

export const Playground: Story<ToggleProps> = props => {
  const [isChecked, setIsChecked] = useState(false);
  return <Toggle {...props} checked={isChecked} onCheckedChange={setIsChecked} />;
};

Playground.args = {
  variant: 'default',
  size: 'default',
  disabled: false,
  label: 'Notifications',
  description: '',
};

Playground.argTypes = {
  variant: {
    options: ['default', 'success', 'destructive'],
    control: { type: 'select' },
    defaultValue: 'default',
  },
  size: {
    options: ['sm', 'default', 'lg'],
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
