import type { Story } from '@ladle/react';
import { Step, Steps, type StepsProps } from './Steps';

export const Default: Story = () => (
  <Steps currentStep={2}>
    <Step title="Step 1" description="Complete your profile" />
    <Step title="Step 2" description="Verify your email" />
    <Step title="Step 3" description="Start using the app" />
  </Steps>
);

export const Horizontal: Story = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-sm font-medium mb-4">Step 1 - Completed</h3>
      <Steps orientation="horizontal" currentStep={1}>
        <Step title="Account" description="Create your account" />
        <Step title="Profile" description="Setup your profile" />
        <Step title="Preferences" description="Configure settings" />
      </Steps>
    </div>

    <div>
      <h3 className="text-sm font-medium mb-4">Step 2 - Current</h3>
      <Steps orientation="horizontal" currentStep={2}>
        <Step title="Account" description="Create your account" />
        <Step title="Profile" description="Setup your profile" />
        <Step title="Preferences" description="Configure settings" />
      </Steps>
    </div>

    <div>
      <h3 className="text-sm font-medium mb-4">Step 3 - All Steps</h3>
      <Steps orientation="horizontal" currentStep={3}>
        <Step title="Account" description="Create your account" />
        <Step title="Profile" description="Setup your profile" />
        <Step title="Preferences" description="Configure settings" />
      </Steps>
    </div>

    <div>
      <h3 className="text-sm font-medium mb-4">All Completed</h3>
      <Steps orientation="horizontal" currentStep={4}>
        <Step title="Account" description="Create your account" />
        <Step title="Profile" description="Setup your profile" />
        <Step title="Preferences" description="Configure settings" />
      </Steps>
    </div>
  </div>
);

export const Vertical: Story = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div>
      <h3 className="text-sm font-medium mb-4">Step 1 - Completed</h3>
      <Steps orientation="vertical" currentStep={1}>
        <Step title="Account" description="Create your account" />
        <Step title="Profile" description="Setup your profile" />
        <Step title="Preferences" description="Configure settings" />
        <Step title="Complete" description="Start using the app" />
      </Steps>
    </div>

    <div>
      <h3 className="text-sm font-medium mb-4">Step 2 - Current</h3>
      <Steps orientation="vertical" currentStep={2}>
        <Step title="Account" description="Create your account" />
        <Step title="Profile" description="Setup your profile" />
        <Step title="Preferences" description="Configure settings" />
        <Step title="Complete" description="Start using the app" />
      </Steps>
    </div>

    <div>
      <h3 className="text-sm font-medium mb-4">Step 3</h3>
      <Steps orientation="vertical" currentStep={3}>
        <Step title="Account" description="Create your account" />
        <Step title="Profile" description="Setup your profile" />
        <Step title="Preferences" description="Configure settings" />
        <Step title="Complete" description="Start using the app" />
      </Steps>
    </div>

    <div>
      <h3 className="text-sm font-medium mb-4">All Completed</h3>
      <Steps orientation="vertical" currentStep={5}>
        <Step title="Account" description="Create your account" />
        <Step title="Profile" description="Setup your profile" />
        <Step title="Preferences" description="Configure settings" />
        <Step title="Complete" description="Start using the app" />
      </Steps>
    </div>
  </div>
);

export const WithCustomIcons: Story = () => (
  <div className="space-y-8">
    <Steps orientation="horizontal" currentStep={2}>
      <Step
        title="Cart"
        description="Review items"
        icon={
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        }
      />
      <Step
        title="Shipping"
        description="Enter address"
        icon={
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
            />
          </svg>
        }
      />
      <Step
        title="Payment"
        description="Complete purchase"
        icon={
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        }
      />
    </Steps>
  </div>
);

export const WithoutDescription: Story = () => (
  <div className="space-y-8">
    <Steps orientation="horizontal" currentStep={2}>
      <Step title="Choose Plan" />
      <Step title="Create Account" />
      <Step title="Confirmation" />
    </Steps>

    <Steps orientation="vertical" currentStep={3}>
      <Step title="Choose Plan" />
      <Step title="Create Account" />
      <Step title="Confirmation" />
    </Steps>
  </div>
);

export const ManySteps: Story = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-sm font-medium mb-4">Horizontal - Many Steps</h3>
      <Steps orientation="horizontal" currentStep={4}>
        <Step title="Step 1" />
        <Step title="Step 2" />
        <Step title="Step 3" />
        <Step title="Step 4" />
        <Step title="Step 5" />
        <Step title="Step 6" />
      </Steps>
    </div>

    <div>
      <h3 className="text-sm font-medium mb-4">Vertical - Many Steps</h3>
      <Steps orientation="vertical" currentStep={4}>
        <Step title="Step 1" description="First step description" />
        <Step title="Step 2" description="Second step description" />
        <Step title="Step 3" description="Third step description" />
        <Step title="Step 4" description="Fourth step description" />
        <Step title="Step 5" description="Fifth step description" />
        <Step title="Step 6" description="Sixth step description" />
      </Steps>
    </div>
  </div>
);

export const Playground: Story<StepsProps> = ({ currentStep = 2, orientation = 'horizontal' }) => (
  <Steps currentStep={currentStep} orientation={orientation}>
    <Step title="Step 1" description="Complete your profile" />
    <Step title="Step 2" description="Verify your email" />
    <Step title="Step 3" description="Configure settings" />
    <Step title="Step 4" description="Start using the app" />
  </Steps>
);

Playground.args = {
  currentStep: 2,
  orientation: 'horizontal',
};

Playground.argTypes = {
  currentStep: {
    control: { type: 'number', min: 1, max: 5 },
    defaultValue: 2,
  },
  orientation: {
    options: ['horizontal', 'vertical'],
    control: { type: 'select' },
    defaultValue: 'horizontal',
  },
};
