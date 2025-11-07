import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FileInput } from './FileInput';

describe('FileInput', () => {
  it('renders file input', () => {
    const { container } = render(<FileInput />);
    const input = container.querySelector('input[type="file"]');
    expect(input).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<FileInput label="Upload file" />);
    expect(screen.getByText('Upload file')).toBeInTheDocument();
  });

  it('renders with error', () => {
    render(<FileInput error="File is required" />);
    expect(screen.getByText('File is required')).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(<FileInput helperText="Max file size: 10MB" />);
    expect(screen.getByText('Max file size: 10MB')).toBeInTheDocument();
  });
});
