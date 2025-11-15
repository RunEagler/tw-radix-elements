import type { Story } from '@ladle/react';
import { useEffect, useState } from 'react';
import { Progress, type ProgressProps } from './Progress';

export const Default: Story = () => (
  <div className="w-full max-w-md space-y-4 p-8">
    <Progress value={0} />
    <Progress value={25} />
    <Progress value={50} />
    <Progress value={75} />
    <Progress value={100} />
  </div>
);

export const WithLabel: Story = () => (
  <div className="w-full max-w-md space-y-4 p-8">
    <Progress value={0} label="Progress" />
    <Progress value={25} label="Loading..." />
    <Progress value={50} label="Processing" />
    <Progress value={75} label="Almost there" />
    <Progress value={100} label="Complete" />
  </div>
);

export const Variants: Story = () => (
  <div className="w-full max-w-md space-y-6 p-8">
    <div className="space-y-2">
      <p className="text-sm font-medium">Default</p>
      <Progress value={60} variant="default" />
    </div>
    <div className="space-y-2">
      <p className="text-sm font-medium">Success</p>
      <Progress value={60} variant="success" />
    </div>
    <div className="space-y-2">
      <p className="text-sm font-medium">Warning</p>
      <Progress value={60} variant="warning" />
    </div>
    <div className="space-y-2">
      <p className="text-sm font-medium">Error</p>
      <Progress value={60} variant="error" />
    </div>
  </div>
);

export const Sizes: Story = () => (
  <div className="w-full max-w-md space-y-6 p-8">
    <div className="space-y-2">
      <p className="text-sm font-medium">Small</p>
      <Progress value={60} size="sm" />
    </div>
    <div className="space-y-2">
      <p className="text-sm font-medium">Default</p>
      <Progress value={60} size="default" />
    </div>
    <div className="space-y-2">
      <p className="text-sm font-medium">Large</p>
      <Progress value={60} size="lg" />
    </div>
  </div>
);

export const Striped: Story = () => (
  <div className="w-full max-w-md space-y-6 p-8">
    <div className="space-y-2">
      <p className="text-sm font-medium">Striped</p>
      <Progress value={60} striped label="Downloading..." />
    </div>
    <div className="space-y-2">
      <p className="text-sm font-medium">Striped + Success</p>
      <Progress value={75} variant="success" striped label="Uploading" />
    </div>
    <div className="space-y-2">
      <p className="text-sm font-medium">Striped + Warning</p>
      <Progress value={45} variant="warning" striped label="Warning state" />
    </div>
  </div>
);

export const AutoIncrementing: Story = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-md space-y-6 p-8">
      <div className="space-y-2">
        <p className="text-sm font-medium">Auto-incrementing Progress</p>
        <Progress value={progress} label="Loading..." />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Auto-incrementing with Striped</p>
        <Progress value={progress} variant="success" striped label="Processing..." />
      </div>
    </div>
  );
};

export const RealWorldExample: Story = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [processingProgress, setProcessingProgress] = useState(0);

  useEffect(() => {
    // Simulate upload
    const uploadTimer = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 5;
      });
    }, 200);

    // Simulate download (starts after 1 second)
    const downloadTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 100) return 100;
          return prev + 3;
        });
      }, 150);
      return () => clearInterval(interval);
    }, 1000);

    // Simulate processing (starts after 2 seconds)
    const processingTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setProcessingProgress(prev => {
          if (prev >= 100) return 100;
          return prev + 2;
        });
      }, 250);
      return () => clearInterval(interval);
    }, 2000);

    return () => {
      clearInterval(uploadTimer);
      clearTimeout(downloadTimer);
      clearTimeout(processingTimer);
    };
  }, []);

  return (
    <div className="w-full max-w-md space-y-4 p-8">
      <Progress
        value={uploadProgress}
        variant={uploadProgress === 100 ? 'success' : 'default'}
        label="Upload"
        striped={uploadProgress < 100}
      />
      <Progress
        value={downloadProgress}
        variant={downloadProgress === 100 ? 'success' : 'default'}
        label="Download"
        striped={downloadProgress < 100}
      />
      <Progress
        value={processingProgress}
        variant={processingProgress === 100 ? 'success' : 'warning'}
        label="Processing"
        striped={processingProgress < 100}
      />
    </div>
  );
};

export const EdgeCases: Story = () => (
  <div className="w-full max-w-md space-y-6 p-8">
    <div className="space-y-2">
      <p className="text-sm font-medium">Zero Progress</p>
      <Progress value={0} />
    </div>
    <div className="space-y-2">
      <p className="text-sm font-medium">Full Progress</p>
      <Progress value={100} variant="success" />
    </div>
    <div className="space-y-2">
      <p className="text-sm font-medium">Over Maximum (clamped to 100%)</p>
      <Progress value={150} max={100} />
    </div>
    <div className="space-y-2">
      <p className="text-sm font-medium">Custom Maximum</p>
      <Progress value={50} max={200} label="50/200 items" />
    </div>
    <div className="space-y-2">
      <p className="text-sm font-medium">Negative Value (clamped to 0%)</p>
      <Progress value={-20} />
    </div>
  </div>
);

export const Playground: Story<ProgressProps> = props => (
  <div className="w-full max-w-md p-8">
    <Progress {...props} />
  </div>
);

Playground.args = {
  value: 60,
  max: 100,
  size: 'default',
  variant: 'default',
  label: 'Progress',
  striped: false,
};

Playground.argTypes = {
  size: {
    options: ['sm', 'default', 'lg'],
    control: { type: 'select' },
    defaultValue: 'default',
  },
  variant: {
    options: ['default', 'success', 'warning', 'error'],
    control: { type: 'select' },
    defaultValue: 'default',
  },
  value: {
    control: { type: 'range', min: 0, max: 100, step: 1 },
    defaultValue: 60,
  },
  max: {
    control: { type: 'number', min: 1, max: 200, step: 1 },
    defaultValue: 100,
  },
  label: {
    control: { type: 'text' },
    defaultValue: 'Progress',
  },
  striped: {
    control: { type: 'boolean' },
    defaultValue: false,
  },
};
