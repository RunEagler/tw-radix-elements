import type { Story } from '@ladle/react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip';

const triggerClass =
  'rounded-md border border-input bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

export const Default: Story = () => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" className={triggerClass}>
          Hover me
        </button>
      </TooltipTrigger>
      <TooltipContent>Save your changes</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export const Placements: Story = () => {
  const sides: Array<'top' | 'right' | 'bottom' | 'left'> = ['top', 'right', 'bottom', 'left'];

  return (
    <TooltipProvider delayDuration={100}>
      <div className="grid grid-cols-2 gap-6 p-6">
        {sides.map(side => (
          <Tooltip key={side}>
            <TooltipTrigger asChild>
              <button type="button" className={triggerClass}>
                {side.charAt(0).toUpperCase() + side.slice(1)}
              </button>
            </TooltipTrigger>
            <TooltipContent side={side}>{`Appears on the ${side}`}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export const RichContent: Story = () => (
  <TooltipProvider delayDuration={200}>
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" className={triggerClass}>
          Keyboard Shortcuts
        </button>
      </TooltipTrigger>
      <TooltipContent className="space-y-1">
        <p className="text-sm font-semibold">Command palette</p>
        <p className="text-xs text-muted-foreground">Press ⌘K (or Ctrl+K) to open</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export const DelayExamples: Story = () => (
  <div className="flex gap-6 p-6">
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <button type="button" className={triggerClass}>
            Instant
          </button>
        </TooltipTrigger>
        <TooltipContent>Shows immediately</TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <TooltipProvider>
      <Tooltip delayDuration={700}>
        <TooltipTrigger asChild>
          <button type="button" className={triggerClass}>
            Delayed
          </button>
        </TooltipTrigger>
        <TooltipContent>Appears after 700ms</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
);

type PlaygroundProps = {
  side: 'top' | 'right' | 'bottom' | 'left';
  align: 'start' | 'center' | 'end';
  delayDuration: number;
  text: string;
};

export const Playground: Story<PlaygroundProps> = ({
  side,
  align,
  delayDuration,
  text,
}: PlaygroundProps) => (
  <TooltipProvider>
    <Tooltip delayDuration={delayDuration}>
      <TooltipTrigger asChild>
        <button type="button" className={triggerClass}>
          Trigger
        </button>
      </TooltipTrigger>
      <TooltipContent side={side} align={align}>
        {text}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

Playground.args = {
  side: 'top',
  align: 'center',
  delayDuration: 150,
  text: 'Customizable tooltip content',
};

Playground.argTypes = {
  side: {
    options: ['top', 'right', 'bottom', 'left'],
    control: { type: 'select' },
    defaultValue: 'top',
  },
  align: {
    options: ['start', 'center', 'end'],
    control: { type: 'select' },
    defaultValue: 'center',
  },
  delayDuration: {
    control: { type: 'number', min: 0, max: 1000, step: 50 },
    defaultValue: 150,
  },
  text: {
    control: { type: 'text' },
  },
};
