import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Step, Steps } from './Steps';

describe('Steps', () => {
  it('renders steps with titles', () => {
    render(
      <Steps currentStep={1}>
        <Step title="Step 1" />
        <Step title="Step 2" />
        <Step title="Step 3" />
      </Steps>
    );

    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('shows current step correctly', () => {
    render(
      <Steps currentStep={2}>
        <Step title="Completed" description="This is done" />
        <Step title="Current" description="Working on this" />
        <Step title="Upcoming" description="Not started" />
      </Steps>
    );

    expect(screen.getByText('Current')).toBeInTheDocument();
  });

  it('renders vertical orientation', () => {
    render(
      <Steps orientation="vertical" currentStep={1} data-testid="steps">
        <Step title="Step 1" />
      </Steps>
    );

    const steps = screen.getByTestId('steps');
    expect(steps).toHaveClass('flex-col');
  });
});
